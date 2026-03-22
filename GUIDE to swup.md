ШАГ 1. Подключить Swup (fallback)

📍 Файл: layouts/partials/extend_footer.html 👉 Вставь ПЕРЕД </body>:

<script src="https://unpkg.com/swup@4"></script>
<script src="https://unpkg.com/@swup/head-plugin@2"></script>
<script src="https://unpkg.com/@swup/scripts-plugin@2"></script>

⚙️ ШАГ 2. Вставить основной гибридный скрипт в extend_footer.html, сразу после Swup:

<script>
(function () {

  const supportsViewTransitions = !!document.startViewTransition;

  // 1. Chrome → View Transitions
  if (supportsViewTransitions) {

    document.addEventListener("click", (e) => {

      if (e.defaultPrevented) return;
      if (e.button !== 0) return;

      const link = e.target.closest("a");
      if (!link || !link.href) return;

      const url = new URL(link.href, location.href);

      if (
        link.target === "_blank" ||
        (link.rel && link.rel.split(" ").includes("external")) ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
        link.hasAttribute("download") ||
        url.protocol === "mailto:" ||
        url.protocol === "tel:" ||
        url.protocol === "javascript:" ||
        url.origin !== location.origin ||
        (url.pathname === location.pathname && url.hash)
      ) return;

      e.preventDefault();

      document.startViewTransition(() => {
        window.location.href = url.href;
      });
    });

    return; // ❗ НЕ запускаем Swup
  }

  // 2. Остальные → Swup
  if (typeof Swup !== "undefined") {
    new Swup({
      containers: ['#swup'],
      plugins: [
        new SwupHeadPlugin(),
        new SwupScriptsPlugin()
      ]
    });
  }

})();
</script>

🎨 ШАГ 3. Добавить CSS для анимаций в assets/css/main.css

/* View Transitions (Chrome) */

@layer components {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    @apply duration-300 ease-in-out;
  }
}

/* Swup fallback (Safari/Firefox) */

html.is-animating #swup {
  opacity: 0;
  transition: opacity 0.3s ease;
}

ШАГ 4. вставить id="swup" в layouts/baseof.gohtml 

<main id="swup" class="main">
  {{ block "main" . }}{{ end }}
</main>