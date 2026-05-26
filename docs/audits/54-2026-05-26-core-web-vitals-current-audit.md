# Core Web Vitals аудит проекта на 2026-05-26

Дата: 2026-05-26.

Цель: проверить весь текущий Core Web Vitals-контур проекта `Aerocool Ukraine`, синхронизировать связанную документацию с лучшими практиками 2026 года и зафиксировать актуальный lab baseline.

## Проверенные Источники

- Google Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- Google Page Experience: https://developers.google.com/search/docs/appearance/page-experience
- web.dev LCP optimization: https://web.dev/articles/optimize-lcp
- web.dev INP optimization: https://web.dev/articles/optimize-inp
- web.dev CLS optimization: https://web.dev/optimize-cls
- Локальный playbook: [12-core-web-vitals-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/12-core-web-vitals-guide-2026.md)
- Локальный Unlighthouse guide: [13-unlighthouse-site-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/13-unlighthouse-site-audit.md)
- Локальный Lighthouse guide: [14-lighthouse-single-page-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/14-lighthouse-single-page-audit.md)

Актуальные пороги Google на дату проверки:

| Метрика | Хороший уровень |
|---|---:|
| `LCP` | ≤ 2.5 s |
| `INP` | < 200 ms |
| `CLS` | ≤ 0.1 |

`FID` не использовать как текущую основную метрику. Для интерактивности использовать `INP`; в Lighthouse смотреть `TBT` только как лабораторную подсказку.

## Что Проверено

- `docs/quality/12-core-web-vitals-guide-2026.md` — главный CWV playbook.
- `docs/quality/13-unlighthouse-site-audit.md` — массовый audit workflow.
- `docs/quality/14-lighthouse-single-page-audit.md` — одиночный Lighthouse workflow.
- `docs/audits/41-2026-05-17-core-web-vitals-project-audit.md` — предыдущий CWV baseline.
- `layouts/_partials/head.html` — CSS, search JS, preload/prefetch, robots meta.
- `layouts/_partials/_seo/lcp-image-preload.html` — head preload главного article/news/product изображения.
- `layouts/_shortcodes/seo-image.html` — responsive images, `loading`, `fetchpriority`, `preload`.
- `layouts/_shortcodes/home-hero.html` — hero image главной.
- `layouts/products/single.html` — product LCP image и zoom.
- `layouts/_partials/cover.html` — list/cover images.
- `assets/js/site.js` — общие JS-обработчики, product zoom, service worker.
- `themes/PaperMod/assets/js/fastsearch.js` и локальный override `assets/js/fastsearch.js`.
- `netlify.toml`, `hugo.yaml`, `package.json` — режимы сборки и production/indexability.

## Найденные Риски На Старте Проверки

| Риск | Факт | Влияние |
|---|---|---|
| Search index грузился до действия пользователя | Theme `fastsearch.js` запрашивал `index.json` по `window.onload` | `/search/` имел total byte weight около `702 KiB`, хотя пользователь еще не вводил запрос |
| Service worker регистрировался сразу после `load` | `assets/js/site.js` запускал `navigator.serviceWorker.register()` без задержки | Может добавлять работу и network activity в критическое окно первого рендера |
| Главная hero-картинка не responsive | `/images/home-hero85.webp` статический файл `1023x1537` | Lighthouse видит потенциальную экономию около `66 KiB` на mobile |
| Нет field data | Нет подтверждения из Search Console / CrUX | Реальный `INP` подтвердить нельзя |

Не найдено:

- глобального `rel=prefetch` для меню;
- preload `index.json` в `<head>`;
- HTML-изображений без `width` / `height`;
- пустых `img src=""`;
- проблем с production `robots.txt` в локальной production-сборке.

## Исправления В Этом Аудите

1. Добавлен локальный `assets/js/fastsearch.js`.
2. Search index теперь загружается только после первого непустого ввода пользователя.
3. Search input debounce-ится, результаты строятся через DOM API.
4. Регистрация service worker в `assets/js/site.js` перенесена после `load` на задержку и `requestIdleCallback`.
5. `docs/quality/12-core-web-vitals-guide-2026.md` обновлен под эти правила.

## Lighthouse Baseline После Исправлений

Методика:

```bash
npm run build
npm run build:production
python3 -m http.server 1324 --bind 127.0.0.1 --directory public
unlighthouse/node_modules/.bin/lighthouse <url> --output=json --only-categories=performance,accessibility,best-practices,seo
```

Проверенные URL:

| URL | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT | Total byte weight |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | 98 | 100 | 100 | 100 | 2.3 s | 0 | 0 ms | 234 KiB |
| `/products/sky/360/` | 98 | 100 | 100 | 100 | 2.3 s | 0 | 0 ms | 220 KiB |
| `/articles/how-to-choose-aerocool-chair/` | 99 | 100 | 100 | 100 | 2.1 s | 0 | 10 ms | 192 KiB |
| `/search/` | 99 | 98 | 100 | 66 | 1.8 s | 0 | 0 ms | 133 KiB |

Примечания:

- SEO score `66` на `/search/` ожидаем, потому что search остается `noindex,nofollow`.
- До исправления `/search/` загружал `/index.json` при первом рендере; после исправления первый рендер `/search/` не запрашивает `/index.json`.
- Headless Chrome проверка подтвердила: после ввода `sky` загружается `/index.json` и выводятся результаты поиска.
- Индексируемые страницы в локальной production-сборке получают `<meta name=robots content="index,follow">`; `public/robots.txt` не блокирует сайт.
- Повторный запуск главной показал lab LCP в диапазоне `2.3-2.6 s`; это близко к порогу Google и остается главным резервом оптимизации.

## Оценка По 10-Балльной Шкале

Текущая оценка Core Web Vitals lab readiness: `9 / 10`.

Почему не `10 / 10`:

- нет field data из Search Console / CrUX;
- текущий `netlify.toml` намеренно держит published build в `development/noindex`;
- главная hero-картинка остается статическим WebP без responsive variants;
- lab LCP главной в проверке колебался около `2.3-2.6 s`, то есть рядом с порогом Google и выше внутренней строгой цели `≤ 2.0 s`.

## Приоритеты

### P0

Нет открытых P0 для текущего локального lab baseline.

### P1

1. Перед production-переходом проверить Deploy Preview через Unlighthouse.
2. После production-публикации подключить Search Console Core Web Vitals report и ждать field data.
3. Не возвращать загрузку `index.json` по `window.onload`.
4. Не возвращать service worker registration в критическое окно первого рендера.

### P2

1. Подготовить responsive variants для `/images/home-hero85.webp` или перевести home hero image в Hugo image pipeline.
2. При росте сайта контролировать размер `index.json`, поля индекса, лимит результатов и INP search-страницы.

## Итог

Проектный CWV-контур на 2026-05-26 соответствует лучшим практикам 2026 года на уровне лабораторной проверки и локальной документации. Финальная оценка зависит от Deploy Preview / production URL и field data.
