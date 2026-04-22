# Руководство По API View Transitions

## 1. Где находится основной скрипт

Основной скрипт API View Transitions в текущем проекте лежит в `layouts/_partials/extend_footer.html`.

```html
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
```

## 2. Где находится основной контейнер страницы

Основной контейнер страницы находится в `layouts/baseof.html`.

```html
<main class="main">
  {{ block "main" . }}{{ end }}
</main>
```

## 3. Где подключен prefetch

Prefetch основных страниц меню уже подключается в `layouts/_partials/head.html`.

```html
{{ range .Site.Menus.main }}
  {{- if not (findRE "://" .URL) }}
<link rel="prefetch" href="{{ .URL | relLangURL }}">
  {{- end }}
{{ end }}
```

## 4. Куда добавлять CSS для анимаций

Если нужно усилить анимации, CSS добавлять в `assets/css/main.css`.

```css
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
```

## Важно

1. В этом проекте не использовать путь `layouts/_default/baseof.html` для локальной правки; актуальная точка входа — `layouts/baseof.html`.
2. Локальные partial-шаблоны и шаблоны в проекте держим в формате `.html`, поэтому любые новые переопределения для View Transitions тоже нужно создавать как `.html`.
3. Скрипт должен игнорировать внешние ссылки, `mailto:`, `tel:`, ссылки на скачивание и модифицированные клики.
4. Любые изменения View Transitions нужно проверять на обычной навигации и при `prefers-reduced-motion`.
