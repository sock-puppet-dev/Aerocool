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

  function setupServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () {
        // Service worker registration should never break the page experience.
      });
    });
  }

  setupMenuScrollMemory();
  setupHashLinks();
  setupTopLink();
  setupThemeToggle();
  setupMobileNavClose();
  setupPhoneSanitizer();
  setupViewTransitions();
  setupCodeCopyButtons();
  setupServiceWorker();
})();
