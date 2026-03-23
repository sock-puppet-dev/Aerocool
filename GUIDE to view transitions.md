1️⃣ Основной скрипт View Transitions, в Hugo лучше вставлять в layouts/_partials/extend_footer.gohtml


<script>
(function() {
  if (typeof document.startViewTransition !== "function") return;

  const cache = new Map();
  const container = document.querySelector('main.main');

  const navigate = url => {
    const cachedHTML = cache.get(url);
    document.startViewTransition(() => {
      if (cachedHTML && container) {
        const doc = new DOMParser().parseFromString(cachedHTML, 'text/html');
        const newContent = doc.querySelector('main.main');
        if (newContent) container.replaceChildren(...newContent.childNodes);
        else window.location.href = url;
      } else {
        window.location.href = url;
      }
    });
  };

  document.addEventListener("click", e => {
    const link = e.target.closest("a");
    if (!link || link.target === "_blank" || link.origin !== location.origin) return;
    e.preventDefault();
    navigate(link.href);
  });

  ['mouseover','touchstart','focus'].forEach(evt => {
    document.addEventListener(evt, e => {
      const link = e.target.closest("a");
      if (!link || link.origin !== location.origin) return;
      const url = link.href;
      if (cache.has(url)) return;
      fetch(url, { credentials:'include' })
        .then(res => res.text())
        .then(html => cache.set(url, html))
        .catch(()=>{});
    }, {passive:true});
  });

  window.addEventListener('popstate', ()=> window.location.reload());
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
    @apply duration-300 ease-in-out;
  }
}