# Руководство по аудиту одной страницы через Lighthouse

Обновлено: 2026-05-15.

Lighthouse — одиночный аудит конкретной страницы. Unlighthouse — массовый запуск Lighthouse по набору URL. Для этого проекта основной ежедневный инструмент — Unlighthouse, а Lighthouse полезен для точечной диагностики одной страницы.

Для полного Core Web Vitals workflow смотри [12-core-web-vitals-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/12-core-web-vitals-guide-2026.md).
Базовый sync-аудит документации: [37-2026-05-13-documentation-2026-best-practices-sync-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md).

## Что проверяет Lighthouse

```text
Performance      LCP, CLS, TBT, FCP, Speed Index
Accessibility    доступность интерфейса
Best Practices   HTTPS, CSP, console errors, современные API
SEO              title, description, canonical, hreflang, robots, mobile
PWA              базовые требования Progressive Web App
```

## Когда использовать

Lighthouse нужен, когда нужно быстро проверить одну страницу:

- главную после изменения hero;
- карточку товара после изменения изображений;
- статью после изменения `seo-image`;
- `/search/` после изменения search JS;
- `/404.html` после изменения служебных шаблонов;
- любую страницу, где Unlighthouse показал проблему.

## Как запускать

Можно использовать локальный Lighthouse из `unlighthouse/node_modules`, если зависимости уже установлены:

```bash
cd /Users/stadnyk/MEGA/Aerocool
cd unlighthouse
npm install
```

Пример одиночного аудита:

```bash
./node_modules/.bin/lighthouse https://aerocool.ua/ --view
```

JSON + HTML отчет:

```bash
./node_modules/.bin/lighthouse https://aerocool.ua/ \
  --output html \
  --output json \
  --output-path /tmp/aerocool-home \
  --view
```

Глобальную установку `npm install -g lighthouse` можно использовать только как личный инструмент, но не как основной проектный workflow.

## Лабораторные И Полевые Данные

Lighthouse показывает лабораторные данные: тест “здесь и сейчас” в контролируемых условиях.
Для `INP` Lighthouse использует лабораторные подсказки вроде `TBT`; настоящий `INP` нужно подтверждать полевыми данными.

Для SEO и Core Web Vitals нужны также полевые данные:

```text
PageSpeed Insights
Chrome UX Report
Google Search Console
```

Хороший Lighthouse не гарантирует топ-SEO сам по себе. Нужна связка:

- зеленые Core Web Vitals;
- сильная структура контента;
- корректный sitemap;
- schema.org JSON-LD;
- canonical;
- hreflang;
- indexable production-страницы;
- быстрые изображения.

## Что смотреть первым

Performance:

- LCP;
- FCP;
- TBT;
- CLS;
- render-blocking requests;
- image delivery.

Accessibility:

- alt;
- имена ссылок и кнопок;
- contrast;
- heading structure;
- form labels.

Best Practices:

- console errors;
- CSP;
- COOP;
- Trusted Types;
- HTTPS;
- mixed content;
- пустые или битые ресурсы.

SEO:

- `index,follow` только в production;
- `noindex,nofollow` для `404/search/alias`;
- canonical;
- hreflang;
- meta description;
- HTTP status.

## Как это связано с Netlify

Netlify собирает и публикует сайт. Lighthouse проверяет уже опубликованный URL.

Если Netlify сейчас собирает `development`, Lighthouse SEO может показывать проблемы с indexability, потому что страницы намеренно получают `noindex,nofollow`.

Финальный SEO-Lighthouse имеет смысл только после production-сборки и deploy.

## PageSpeed, CSP И Service Worker

PageSpeed может показывать security warnings, которые исправляются не в HTML, а в HTTP headers Netlify.

Текущий проектный baseline в `netlify.toml`:

- `Cross-Origin-Opener-Policy: same-origin`;
- `Content-Security-Policy` с `trusted-types aerocool-service-worker`;
- `require-trusted-types-for 'script'`.

Если после включения Trusted Types в консоли появляется:

```text
This document requires 'TrustedScriptURL' assignment.
```

первое место проверки — регистрация service worker в `assets/js/site.js`. Она должна идти через `getServiceWorkerUrl()`, а не через прямую строку `navigator.serviceWorker.register('/sw.js')`.

Если Lighthouse/PageSpeed пишет:

```text
Does not register a service worker that controls page and start_url
```

проверить три вещи:

- нет console errors по CSP/Trusted Types;
- `manifest.webmanifest` содержит `start_url: "/"` и `scope: "/"`;
- `/sw.js` доступен на опубликованном Deploy Preview и регистрируется без ошибки.

## Как это связано с Unlighthouse

Для одной страницы:

```bash
./node_modules/.bin/lighthouse https://aerocool.ua/products/xtal/racer-black/ --view
```

Для набора страниц:

```bash
cd unlighthouse
npm run audit:ci:urls
```

Unlighthouse удобнее для регулярного контроля, потому что проверяет сразу главную, каталог, товары, статьи, новости, FAQ, contact и technical noindex.
