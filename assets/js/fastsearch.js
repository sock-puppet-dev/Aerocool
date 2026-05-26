import * as params from '@params';

var fuse;
var indexPromise;
var resList = document.getElementById('searchResults');
var sInput = document.getElementById('searchInput');
var searchBox = document.getElementById('searchbox');
var first;
var last;
var currentElem = null;
var resultsAvailable = false;
var searchTimer = null;
var pendingQuery = '';

function getFuseOptions() {
  if (!params.fuseOpts) {
    return {
      distance: 100,
      threshold: 0.4,
      ignoreLocation: true,
      keys: [
        'title',
        'permalink',
        'summary',
        'content'
      ]
    };
  }

  return {
    isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
    includeScore: params.fuseOpts.includescore ?? false,
    includeMatches: params.fuseOpts.includematches ?? false,
    minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
    shouldSort: params.fuseOpts.shouldsort ?? true,
    findAllMatches: params.fuseOpts.findallmatches ?? false,
    keys: params.fuseOpts.keys ?? ['title', 'permalink', 'summary', 'content'],
    location: params.fuseOpts.location ?? 0,
    threshold: params.fuseOpts.threshold ?? 0.4,
    distance: params.fuseOpts.distance ?? 100,
    ignoreLocation: params.fuseOpts.ignorelocation ?? true
  };
}

function loadIndex() {
  if (fuse) {
    return Promise.resolve(fuse);
  }

  if (indexPromise) {
    return indexPromise;
  }

  indexPromise = fetch('../index.json', { credentials: 'same-origin' })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Search index request failed.');
      }

      return response.json();
    })
    .then(function (data) {
      fuse = new Fuse(data, getFuseOptions());
      return fuse;
    })
    .catch(function () {
      indexPromise = null;
      return null;
    });

  return indexPromise;
}

function clearResults(shouldClearInput) {
  resultsAvailable = false;
  currentElem = null;
  first = null;
  last = null;
  resList.replaceChildren();

  if (shouldClearInput) {
    sInput.value = '';
    sInput.focus();
  }
}

function renderResults(results) {
  clearResults(false);

  if (!results.length) {
    return;
  }

  var fragment = document.createDocumentFragment();

  results.forEach(function (result) {
    var item = result.item;
    var li = document.createElement('li');
    var header = document.createElement('header');
    var link = document.createElement('a');

    li.className = 'post-entry';
    header.className = 'entry-header';
    header.textContent = item.title + '\u00a0\u00bb';
    link.href = item.permalink;
    link.setAttribute('aria-label', item.title);

    li.appendChild(header);
    li.appendChild(link);
    fragment.appendChild(li);
  });

  resList.appendChild(fragment);
  resultsAvailable = true;
  first = resList.firstChild;
  last = resList.lastChild;
}

function runSearch() {
  var query = sInput.value.trim();

  if (!query) {
    clearResults(false);
    return;
  }

  pendingQuery = query;

  loadIndex().then(function (engine) {
    if (!engine || sInput.value.trim() !== pendingQuery) {
      return;
    }

    var searchOptions = params.fuseOpts && params.fuseOpts.limit
      ? { limit: params.fuseOpts.limit }
      : undefined;

    renderResults(engine.search(pendingQuery, searchOptions));
  });
}

function scheduleSearch() {
  window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(runSearch, 120);
}

function activeToggle(element) {
  document.querySelectorAll('.focus').forEach(function (focusedElement) {
    focusedElement.classList.remove('focus');
  });

  if (element) {
    element.focus();
    currentElem = element;
    element.parentElement.classList.add('focus');
  }
  else if (document.activeElement && document.activeElement.parentElement) {
    document.activeElement.parentElement.classList.add('focus');
  }
}

if (sInput && resList && searchBox) {
  sInput.addEventListener('input', scheduleSearch);

  sInput.addEventListener('search', function () {
    if (!sInput.value) {
      clearResults(true);
      return;
    }

    scheduleSearch();
  });

  document.addEventListener('keydown', function (event) {
    var key = event.key;
    var activeElement = document.activeElement;
    var isInSearchBox = searchBox.contains(activeElement);

    if (activeElement === sInput) {
      document.querySelectorAll('.focus').forEach(function (element) {
        element.classList.remove('focus');
      });
    }
    else if (currentElem) {
      activeElement = currentElem;
    }

    if (key === 'Escape') {
      clearResults(true);
    }
    else if (!resultsAvailable || !isInSearchBox) {
      return;
    }
    else if (key === 'ArrowDown') {
      event.preventDefault();

      if (activeElement === sInput) {
        activeToggle(resList.firstChild.lastChild);
      }
      else if (activeElement.parentElement !== last) {
        activeToggle(activeElement.parentElement.nextSibling.lastChild);
      }
    }
    else if (key === 'ArrowUp') {
      event.preventDefault();

      if (activeElement.parentElement === first) {
        activeToggle(sInput);
      }
      else if (activeElement !== sInput) {
        activeToggle(activeElement.parentElement.previousSibling.lastChild);
      }
    }
    else if (key === 'ArrowRight' && activeElement !== sInput) {
      activeElement.click();
    }
  });
}
