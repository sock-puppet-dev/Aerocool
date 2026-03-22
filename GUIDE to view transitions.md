1️⃣ Скрипт View Transitions

<script>
if (document.startViewTransition) {
  document.addEventListener("click", (e) => {

    if (e.defaultPrevented) return;
    if (e.button !== 0) return;

    const link = e.target.closest("a");
    if (!link || !link.href) return;

    const url = new URL(link.href, location.href);

    if (
      link.target === "_blank" ||                                   // новая вкладка
      (link.rel && link.rel.split(" ").includes("external")) ||     // rel="external"
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||           // модификаторы
      link.hasAttribute("download") ||                              // download
      url.protocol === "mailto:" ||                                 // mailto
      url.protocol === "tel:" ||                                    // tel
      url.protocol === "javascript:" ||                             // JS ссылки
      url.origin !== location.origin ||                             // внешний сайт
      (url.pathname === location.pathname && url.hash)              // якорь на этой же странице
    ) return;

    e.preventDefault();

    document.startViewTransition(() => {
      window.location.href = url.href;
    });
  });
}
</script>

2️⃣ Prefetch страниц

{{ range .Site.Menus.main }}
<link rel="prefetch" href="{{ .URL }}">
{{ end }}

3️⃣ Tailwind-анимации для плавности

@layer components {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    @apply duration-300 ease-in-out;
  }
}