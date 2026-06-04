(function () {
  'use strict';

  var currentScript = document.currentScript;
  var copyLabel = currentScript && currentScript.dataset.codeCopy
    ? currentScript.dataset.codeCopy
    : 'copy';
  var copiedLabel = currentScript && currentScript.dataset.codeCopied
    ? currentScript.dataset.codeCopied
    : 'copied!';
  var codeCopyEnabled = currentScript && currentScript.dataset.codeCopyEnabled === 'true';

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function getHashTarget(hash) {
    if (!hash || hash === '#') {
      return null;
    }

    try {
      return document.getElementById(decodeURIComponent(hash.slice(1)));
    }
    catch (_) {
      return null;
    }
  }

  function setupMenuScrollMemory() {
    var menu = document.getElementById('menu');

    if (!menu) {
      return;
    }

    var scrollPosition = localStorage.getItem('menu-scroll-position');
    if (scrollPosition) {
      menu.scrollLeft = scrollPosition;
    }

    menu.addEventListener('scroll', function () {
      localStorage.setItem('menu-scroll-position', menu.scrollLeft);
    }, { passive: true });
  }

  function setupHashLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (event) {
        var target = getHashTarget(anchor.getAttribute('href'));

        if (!target) {
          return;
        }

        event.preventDefault();
        target.scrollIntoView(prefersReducedMotion() ? undefined : { behavior: 'smooth' });

        if (target.id === 'top') {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        else {
          history.pushState(null, '', '#' + target.id);
        }
      });
    });
  }

  function setupTopLink() {
    var topLink = document.getElementById('top-link');

    if (!topLink) {
      return;
    }

    function updateTopLink() {
      var isVisible = document.body.scrollTop > 800 || document.documentElement.scrollTop > 800;
      topLink.style.visibility = isVisible ? 'visible' : 'hidden';
      topLink.style.opacity = isVisible ? '1' : '0';
    }

    updateTopLink();
    window.addEventListener('scroll', updateTopLink, { passive: true });
  }

  function setupThemeToggle() {
    var toggle = document.getElementById('theme-toggle');

    if (!toggle) {
      return;
    }

    toggle.addEventListener('click', function () {
      if (document.body.className.indexOf('dark') !== -1) {
        document.body.classList.remove('dark');
        localStorage.setItem('pref-theme', 'light');
      }
      else {
        document.body.classList.add('dark');
        localStorage.setItem('pref-theme', 'dark');
      }
    });
  }

  function setupMobileNavClose() {
    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-nav-close]');

      if (!trigger) {
        return;
      }

      var toggle = document.getElementById('nav-toggle');
      if (toggle) {
        toggle.checked = false;
      }
    });
  }

  function setupPhoneSanitizer() {
    document.addEventListener('input', function (event) {
      if (!event.target.matches('[data-phone-sanitize]')) {
        return;
      }

      event.target.value = event.target.value.replace(/[^0-9+() -]/g, '');
    });
  }

  function setupProductTabs() {
    var tablists = document.querySelectorAll('[role="tablist"]');

    tablists.forEach(function (tablist) {
      var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[data-product-tab-target]'));

      if (!tabs.length) {
        return;
      }

      function getPanel(tab) {
        return document.getElementById(tab.getAttribute('data-product-tab-target'));
      }

      function activateTab(tab, options) {
        if (!tab) {
          return;
        }

        var panel = getPanel(tab);

        if (!panel) {
          return;
        }

        tabs.forEach(function (candidate) {
          var candidatePanel = getPanel(candidate);
          var isActive = candidate === tab;

          candidate.setAttribute('aria-selected', isActive ? 'true' : 'false');
          candidate.tabIndex = isActive ? 0 : -1;

          if (candidatePanel) {
            candidatePanel.hidden = !isActive;
          }
        });

        if (options && options.updateHash) {
          history.pushState(null, '', '#' + panel.id);
        }

        if (options && options.focus) {
          tab.focus();
        }

        if (options && options.scroll) {
          panel.scrollIntoView(prefersReducedMotion() ? undefined : { behavior: 'smooth' });
        }
      }

      function getTabByHash(hash) {
        var hashTarget = getHashTarget(hash);

        if (!hashTarget) {
          return null;
        }

        return tabs.find(function (tab) {
          return getPanel(tab) === hashTarget;
        }) || null;
      }

      function activateHashTab(hash, options) {
        var hashTab = getTabByHash(hash);

        if (!hashTab) {
          return false;
        }

        activateTab(hashTab, options);

        return true;
      }

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          activateTab(tab, { updateHash: true, scroll: false });
        });

        tab.addEventListener('keydown', function (event) {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
            return;
          }

          event.preventDefault();

          var currentIndex = tabs.indexOf(tab);
          var nextIndex = currentIndex;

          if (event.key === 'ArrowLeft') {
            nextIndex = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
          }
          else if (event.key === 'ArrowRight') {
            nextIndex = currentIndex >= tabs.length - 1 ? 0 : currentIndex + 1;
          }
          else if (event.key === 'Home') {
            nextIndex = 0;
          }
          else if (event.key === 'End') {
            nextIndex = tabs.length - 1;
          }

          activateTab(tabs[nextIndex], { updateHash: true, focus: true, scroll: false });
        });
      });

      document.addEventListener('click', function (event) {
        var link = event.target.closest('a[href]');

        if (!link) {
          return;
        }

        var url = new URL(link.href, window.location.href);

        if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
          return;
        }

        if (!getTabByHash(url.hash)) {
          return;
        }

        event.preventDefault();

        if (window.location.hash !== url.hash) {
          history.pushState(null, '', url.hash);
        }

        activateHashTab(url.hash, { scroll: true });
      });

      window.addEventListener('hashchange', function () {
        activateHashTab(window.location.hash, { scroll: true });
      });

      if (!activateHashTab(window.location.hash, { scroll: true })) {
        activateTab(tabs[0]);
      }
    });
  }

  function setupProductGalleries() {
    document.querySelectorAll('[data-product-gallery]').forEach(function (gallery) {
      var thumbs = Array.prototype.slice.call(gallery.querySelectorAll('[data-product-gallery-thumb]'));
      var panels = Array.prototype.slice.call(gallery.querySelectorAll('[data-product-gallery-panel]'));

      if (!thumbs.length || !panels.length) {
        return;
      }

      function getPanel(thumb) {
        return document.getElementById(thumb.getAttribute('aria-controls'));
      }

      function activateThumb(thumb, options) {
        var panel = getPanel(thumb);

        if (!panel) {
          return;
        }

        thumbs.forEach(function (candidate) {
          var candidatePanel = getPanel(candidate);
          var isActive = candidate === thumb;

          candidate.setAttribute('aria-selected', isActive ? 'true' : 'false');
          candidate.tabIndex = isActive ? 0 : -1;

          if (candidatePanel) {
            candidatePanel.hidden = !isActive;
          }
        });

        if (options && options.focus) {
          thumb.focus();
        }
      }

      thumbs.forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          activateThumb(thumb);
        });

        thumb.addEventListener('keydown', function (event) {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
            return;
          }

          event.preventDefault();

          var currentIndex = thumbs.indexOf(thumb);
          var nextIndex = currentIndex;

          if (event.key === 'ArrowLeft') {
            nextIndex = currentIndex <= 0 ? thumbs.length - 1 : currentIndex - 1;
          }
          else if (event.key === 'ArrowRight') {
            nextIndex = currentIndex >= thumbs.length - 1 ? 0 : currentIndex + 1;
          }
          else if (event.key === 'Home') {
            nextIndex = 0;
          }
          else if (event.key === 'End') {
            nextIndex = thumbs.length - 1;
          }

          activateThumb(thumbs[nextIndex], { focus: true });
        });
      });

      activateThumb(thumbs.find(function (thumb) {
        return thumb.getAttribute('aria-selected') === 'true';
      }) || thumbs[0]);
    });
  }

  function setupProductFilters() {
    document.querySelectorAll('[data-product-filter-root]').forEach(function (root) {
      var cards = Array.prototype.slice.call(root.querySelectorAll('[data-product-card]'));
      var inputs = Array.prototype.slice.call(root.querySelectorAll('[data-product-filter-input]'));
      var count = root.querySelector('[data-product-filter-count]');
      var emptyState = root.querySelector('[data-product-filter-empty]');
      var resetButtons = Array.prototype.slice.call(root.querySelectorAll('[data-product-filter-reset]'));

      if (!cards.length || !inputs.length) {
        return;
      }

      function getActiveFilters() {
        return inputs.reduce(function (active, input) {
          if (!input.checked) {
            return active;
          }

          if (!active[input.name]) {
            active[input.name] = [];
          }

          active[input.name].push(input.value);
          return active;
        }, {});
      }

      function cardMatches(card, activeFilters) {
        return Object.keys(activeFilters).every(function (filterName) {
          var activeValues = activeFilters[filterName];

          if (!activeValues.length) {
            return true;
          }

          var cardValues = (card.getAttribute('data-product-' + filterName) || '').split(/\s+/).filter(Boolean);

          return activeValues.some(function (value) {
            return cardValues.indexOf(value) !== -1;
          });
        });
      }

      function applyFilters() {
        var activeFilters = getActiveFilters();
        var visibleCount = 0;

        cards.forEach(function (card) {
          var isVisible = cardMatches(card, activeFilters);

          card.hidden = !isVisible;

          if (isVisible) {
            visibleCount += 1;
          }
        });

        if (count) {
          count.textContent = String(visibleCount);
        }

        if (emptyState) {
          emptyState.hidden = visibleCount > 0;
        }
      }

      inputs.forEach(function (input) {
        input.addEventListener('change', applyFilters);
      });

      resetButtons.forEach(function (button) {
        button.addEventListener('click', function () {
          inputs.forEach(function (input) {
            input.checked = false;
          });

          applyFilters();
        });
      });

      applyFilters();
    });
  }

  function setupViewTransitions() {
    if (typeof document.startViewTransition !== 'function') {
      return;
    }

    var navigating = false;

    document.addEventListener('click', function (event) {
      if (event.defaultPrevented || event.button !== 0 || navigating) {
        return;
      }

      var link = event.target.closest('a[href]');

      if (!link) {
        return;
      }

      var url = new URL(link.href, window.location.href);

      if (
        link.target === '_blank' ||
        url.origin !== window.location.origin ||
        link.hasAttribute('download') ||
        url.protocol.indexOf('mailto') === 0 ||
        url.protocol.indexOf('tel') === 0 ||
        (url.pathname === window.location.pathname && url.hash) ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();
      navigating = true;

      try {
        document.startViewTransition(function () {
          window.location.href = url.href;
        });
      }
      catch (_) {
        window.location.href = url.href;
      }
    });
  }

  function setupCodeCopyButtons() {
    if (!codeCopyEnabled) {
      return;
    }

    document.querySelectorAll('pre > code').forEach(function (codeblock) {
      var container = codeblock.parentNode && codeblock.parentNode.parentNode;

      if (!container) {
        return;
      }

      var copybutton = document.createElement('button');
      copybutton.classList.add('copy-code');
      copybutton.textContent = copyLabel;

      function copyingDone() {
        copybutton.textContent = copiedLabel;
        window.setTimeout(function () {
          copybutton.textContent = copyLabel;
        }, 2000);
      }

      copybutton.addEventListener('click', function () {
        if ('clipboard' in navigator) {
          navigator.clipboard.writeText(codeblock.textContent).then(copyingDone).catch(function () {
            // Clipboard permissions can be denied without indicating a site bug.
          });
          return;
        }

        var range = document.createRange();
        var selection = window.getSelection();

        if (!selection) {
          return;
        }

        range.selectNodeContents(codeblock);
        selection.removeAllRanges();
        selection.addRange(range);

        try {
          document.execCommand('copy');
          copyingDone();
        }
        catch (_) {
          // Legacy clipboard fallback can fail silently in locked-down browsers.
        }

        selection.removeRange(range);
      });

      if (container.classList.contains('highlight')) {
        container.appendChild(copybutton);
      }
      else if (container.parentNode && container.parentNode.firstChild === container) {
        return;
      }
      else if (
        codeblock.parentNode &&
        codeblock.parentNode.parentNode &&
        codeblock.parentNode.parentNode.parentNode &&
        codeblock.parentNode.parentNode.parentNode.parentNode &&
        codeblock.parentNode.parentNode.parentNode.parentNode.parentNode &&
        codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName === 'TABLE'
      ) {
        codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(copybutton);
      }
      else {
        codeblock.parentNode.appendChild(copybutton);
      }
    });
  }

  function getServiceWorkerUrl() {
    var serviceWorkerUrl = '/sw.js';

    if (!window.trustedTypes || typeof window.trustedTypes.createPolicy !== 'function') {
      return serviceWorkerUrl;
    }

    try {
      var policy = window.trustedTypes.createPolicy('aerocool-service-worker', {
        createScriptURL: function (value) {
          var url = new URL(value, window.location.origin);

          if (url.origin !== window.location.origin || url.pathname !== serviceWorkerUrl) {
            throw new TypeError('Unexpected service worker URL');
          }

          return value;
        }
      });

      return policy.createScriptURL(serviceWorkerUrl);
    }
    catch (_) {
      return null;
    }
  }

  function setupServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    function registerServiceWorker() {
      var serviceWorkerUrl = getServiceWorkerUrl();

      if (!serviceWorkerUrl) {
        return;
      }

      navigator.serviceWorker.register(serviceWorkerUrl).catch(function () {
        // Service worker registration should never break the page experience.
      });
    }

    window.addEventListener('load', function () {
      window.setTimeout(function () {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(registerServiceWorker, { timeout: 5000 });
          return;
        }

        registerServiceWorker();
      }, 4000);
    });
  }

  setupMenuScrollMemory();
  setupHashLinks();
  setupTopLink();
  setupThemeToggle();
  setupMobileNavClose();
  setupPhoneSanitizer();
  setupProductTabs();
  setupProductGalleries();
  setupProductFilters();
  setupViewTransitions();
  setupCodeCopyButtons();
  setupServiceWorker();
})();
