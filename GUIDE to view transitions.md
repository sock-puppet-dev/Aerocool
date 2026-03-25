1️⃣ Основной скрипт View Transitions, в Hugo лучше вставлять в layouts/_partials/extend_footer.gohtml

<script>
(function() {
  if (typeof document.startViewTransition !== "function") return;

  let navigating = false;

  document.addEventListener("click", e => {
    if (e.defaultPrevented || e.button !== 0 || navigating) return;

    const link = e.target.closest("a[href]");
    if (!link) return;

    const url = new URL(link.href, location.href);

    if (
      link.target === "_blank" ||
      url.origin !== location.origin ||
      link.hasAttribute('download') ||
      url.protocol.startsWith('mailto') ||
      url.protocol.startsWith('tel') ||
      (url.pathname === location.pathname && url.hash) ||
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
    ) return;

    e.preventDefault();
    navigating = true;

    try {
      document.startViewTransition(() => {
        location.href = url.href;
      });
    } catch (_) {
      location.href = url.href;
    }
  });
})();
</script>

2️⃣ Основной контейнер страницы, в layouts/_default/baseof.gohtml

<main class="main">
  {{ block "main" . }}{{ end }}
</main>

3️⃣ Prefetch страниц, в layouts/_partials/head.gohtml

{{ range .Site.Menus.main }}
<link rel="prefetch" href="{{ .URL }}">
{{ end }}

4️⃣ Tailwind-анимации для плавности View Transitions

@layer components {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 300ms;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
  }
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}