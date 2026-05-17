# Aerocool Ukraine

Обновлено: 2026-05-17.

`Aerocool Ukraine` — двуязычный маркетинговый и каталоговый сайт на `Hugo` для кресел Aerocool в Украине. Основной язык — украинский (`uk`), второй язык — русский (`ru`). Сайт собирается статически, деплоится через `Netlify`, использует локальные Hugo overrides поверх темы `PaperMod` и отдельный Unlighthouse-набор для технического аудита качества.

Если ты открыл проект впервые, читай так:

1. Этот `README.md` — общая карта проекта.
2. `AGENTS.md` — правила, как безопасно менять проект.
3. `docs/README.md` — оглавление всей документации.
4. `docs/content/front-matter-reference.md` — какие поля писать в `content/**/*.md`.
5. `docs/architecture/hugo-template-helpers.md` — какие шаблоны за что отвечают.
6. `docs/quality/unlighthouse-site-audit.md` — как проверять качество сайта после правок.

Проще говоря: `content/` отвечает за текст и данные страниц, `layouts/` отвечает за HTML/SEO/schema-логику, `assets/` отвечает за CSS/JS, а `unlighthouse/` отвечает за аудит качества.

Вся документация проекта должна быть русскоязычной, понятной новичку и структурированной. Единый стандарт стиля описан в [docs/architecture/documentation-style-guide.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/documentation-style-guide.md).

## 1. Главная идея проекта

Проект должен решать четыре задачи:

1. Быстро и корректно показывать каталог кресел Aerocool.
2. Давать поисковикам чистую структуру: canonical, hreflang, sitemap, schema.org, robots meta.
3. Поддерживать SEO-контент под брендовые и коммерческие запросы: `игровое кресло`, `офисное кресло`, `компьютерное кресло`, `кресло для работы`, `home office`.
4. Готовить контент и structured data к AI Search: сущности, knowledge graph, цитируемые блоки, prompt-аудит и e-commerce rich results без фейковых сигналов доверия.

## 2. Стек

- `Hugo 0.161.0`
- `Node 24`
- `Tailwind CSS 4`
- `themes/PaperMod` как git-подмодуль
- `Netlify` для сборки и публикации
- `Unlighthouse` для массового Lighthouse-аудита

Локальные версии инструментов фиксируются в `mise.toml`. В Netlify версии фиксируются в `netlify.toml`.

## 3. Важное про Netlify и production

Сейчас `netlify.toml` намеренно собирает сайт в `development`:

```toml
command = "git submodule update --init --recursive && hugo --environment development --gc --minify"
HUGO_ENVIRONMENT = "development"
```

Это значит:

- HTML-страницы получают `noindex,nofollow`;
- это безопасный режим для доработки сайта;
- финальный SEO-аудит indexability нельзя считать полным, пока Netlify не переведен на `production`.

Когда сайт готов к индексации, нужно отдельно поменять Netlify на:

```toml
command = "git submodule update --init --recursive && hugo --environment production --gc --minify"
HUGO_ENVIRONMENT = "production"
```

Локально production можно проверить командой:

```bash
npm run build:production
```

## 4. Основной pipeline проекта Netlify

`Netlify` уже умеет:

- забирать код из Git;
- ставить зависимости;
- собирать Hugo;
- публиковать сайт;
- создавать Deploy Preview.

Текущий правильный workflow такой:

1. Локально или в ветке делаешь изменения.
2. Netlify собирает Deploy Preview.
3. Проверяешь сайт вручную или через Unlighthouse из папки `unlighthouse/`.
4. После финального решения переводишь Netlify в `production`, если сайт должен индексироваться.

## 5. Основная структура

```text
content/                 контент сайта
content/products/        каталог, серии и варианты товаров
content/articles/        evergreen-статьи
content/news/            новости и запусковые материалы
layouts/                 локальные Hugo-шаблоны и overrides
layouts/_partials/       локальные partials
layouts/_shortcodes/     локальные shortcodes
assets/css/main.css      Tailwind CSS и локальный visual layer
assets/js/site.js        общий внешний JS сайта без inline-скриптов
static/                  статические файлы
static/_redirects        root rewrite и forced 404 для scanner/sensitive URL на Netlify
unlighthouse/            аудит Lighthouse/Unlighthouse
hugo.yaml                конфигурация Hugo
netlify.toml             сборка Netlify и HTTP headers
mise.toml                локальные версии Hugo и Node для mise
package.json             npm-команды корневого Hugo-проекта
```

Что не нужно редактировать вручную:

- `public/` — результат сборки Hugo;
- `resources/` — временные Hugo-кэши;
- `node_modules/` — установленные npm-пакеты;
- `unlighthouse/reports/` — временные отчеты аудита.

Если нужно изменить страницу, почти всегда начинай с `content/`, `layouts/` или `assets/`, а не с `public/`.

## 6. Контент и языки

Текущий паттерн локализации:

```text
index.md      украинская версия
index.ru.md   русская версия
```

Это относится к статьям, новостям, страницам товаров и статичным страницам. Украинская и русская версии должны оставаться синхронными, если задача явно не ограничена одним языком.

В `content/**/*.md` не добавляем markdown `# H1`. Видимый H1 обычно рендерится шаблоном через `layouts/_partials/page-h1.html`, а тело страницы начинается с вводного абзаца или `##`.

В видимом контенте `content/**/*.md` не используем обратные кавычки для inline-code. Точные технические обозначения, SKU/MPN/GTIN, размеры, рейтинги и значения характеристик выделяются обычным жирным форматом: `**11D**`, `**SYNC5 multi-adjustable**`, `**75 мм**`.

Во front matter использовать `schema_types`.

Для товарных страниц product facts хранятся в front matter конкретного `content/products/<series>/<model>/index*.md`. Это единый источник правды для цены, наличия, SKU, MPN, GTIN, гарантии, доставки, возврата, способов оплаты и rating. Владелец бизнес-значений — команда Aerocool Украина; `Product` JSON-LD, видимый товарный блок и `/faq/` должны быть синхронизированы с front matter.

Редакционные ориентиры объема для SEO-посадочных страниц:

- статьи в `content/articles` — обычно `10000+` знаков основного текста на каждую языковую версию;
- новости в `content/news`, если они поддерживают органическую видимость, — обычно `5000+` знаков тела на каждую языковую версию;
- товарные страницы `content/products/<series>/<model>/` — обычно `6000+` знаков основного текста на каждую языковую версию;
- страницы серий `content/products/<series>/_index.md` и `_index.ru.md` — обычно `6000+` знаков основного текста на каждую языковую версию;
- хабы `/products/`, `/articles/` и `/news/` — обычно `7000+` знаков основного текста на каждую языковую версию;
- страница `/about/` — обычно `10000+` знаков основного текста на каждую языковую версию.

Добор до этих ориентиров должен быть редакционным: сценарии выбора, сравнения, FAQ, доказательства, коммерческая польза и внутренние ссылки, а не абзацы ради объема.

## 7. Шаблоны

Главные локальные шаблоны:

- `layouts/baseof.html` — общий HTML-каркас.
- `layouts/_partials/head.html` — meta, canonical, OG/Twitter, CSS, search JS.
- `layouts/_partials/header.html` — шапка, логотип, меню, переключатель языка.
- `layouts/_partials/footer.html` — footer, JSON-LD внизу body, внешний `site.js`.
- `layouts/single.html` — одиночные страницы.
- `layouts/list.html` — листинги.
- `layouts/404.html`, `layouts/search.html`, `layouts/alias.html` — служебные страницы.
- `layouts/sitemap.xml` и `layouts/sitemapindex.xml` — мультиязычные sitemap-файлы.

Локальные изменения делаем в `layouts/`, а не в `themes/PaperMod`, чтобы тема оставалась обновляемым подмодулем.

## 8. Что делает `layouts/_partials/cover.html`

`layouts/_partials/cover.html` — это локальный override стандартного PaperMod cover partial.

Он нужен для `cover.image` в front matter:

```yaml
cover:
  image: "01-front.png"
  alt: "Кресло Aerocool SKY 360"
  relative: true
  hiddenInSingle: true
```

Что делает override:

- ищет картинку в page bundle рядом с `index.md` / `index.ru.md`;
- если может обработать изображение, генерирует WebP-версии;
- выводит `srcset` и `sizes` под фактическую ширину cover/listing-блока, без завышенного `100vw` для страниц с внутренними отступами;
- добавляет `width` и `height`, чтобы не было CLS;
- для одиночной страницы ставит `loading="eager"` и `fetchpriority="high"`;
- для карточек в списках ставит `loading="lazy"`;
- предотвращает старую проблему с пустым `src=""` в листингах.

Когда его трогать:

- если меняется логика cover-картинок;
- если меняются размеры карточек в списках;
- если Lighthouse снова показывает `unsized images`, `empty src` или проблемы image delivery.

Когда не трогать:

- при обычном добавлении страницы в `content/`. Там достаточно правильно заполнить `image`, `cover.image`, `cover.alt`, `cover.relative` и `cover.hiddenInSingle`.

## 9. Изображения

Есть три разных сценария:

1. `seo-image` — изображение внутри тела страницы.
2. `cover.image` — обложка для листингов и одиночной страницы.
3. `image` — основная картинка для SEO/OG/Twitter/schema.

Для контентного изображения в markdown использовать shortcode:

```go-html-template
{{</* seo-image
  src="01-front.png"
  width="2000"
  height="2000"
  alt="Кресло Aerocool SKY 360"
  title="Aerocool SKY 360"
  loading="eager"
  preload=true
  fetchpriority=high
  class="w-full rounded-2xl"
  sizes="(min-width: 1198px) 1150px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)"
*/>}}
```

Для карточки/cover использовать front matter:

```yaml
image: "01-front.png"
cover:
  image: "01-front.png"
  alt: "Кресло Aerocool SKY 360"
  relative: true
  hiddenInSingle: true
```

`image` идет в SEO/OG/schema, `cover.image` — в визуальный preview.
`seo-image` для processable-изображений выводит WebP `srcset` через `<picture>`, fallback `<img>`, размеры и приоритет загрузки. Для типовых статей, новостей и товаров главный `preload=true` попадает в `<head>`, если `image` совпадает с `src` shortcode и `cover.hiddenInSingle: true`.
Если первое контентное изображение использует нестандартный `sizes`, такое же значение нужно задать во front matter как `seo_image_sizes`, иначе head preload и `<picture>` могут выбрать разные responsive candidates.
Для всех `content/**/*.md` в проекте нужен служебный `cover`-блок. `cover.alt` должен описывать тему или объект изображения на языке страницы; не оставляйте пустой `alt` и не превращайте его в список ключевых слов.
Для служебных, taxonomy и других страниц без собственного `image` fallback теперь идет в root `cover.webp`, а не в `images/logo.svg`.

## 10. JavaScript и CSP

Inline JS убран из footer и offline-страницы. Общая логика сайта живет в:

```text
assets/js/site.js
static/offline.js
```

`assets/js/site.js` отвечает за:

- scroll memory меню;
- плавные якорные переходы;
- кнопку scroll-to-top;
- закрытие мобильного меню;
- sanitizing телефона в contact-форме;
- view transitions;
- code copy buttons, если они включены;
- service worker registration.

Это сделано, чтобы `Content-Security-Policy` мог быть строже и чтобы Lighthouse Best Practices не ругался на inline scripts.

Дополнительно в `netlify.toml` включены security headers для PageSpeed/Lighthouse:

- `Cross-Origin-Opener-Policy: same-origin`;
- `Content-Security-Policy` с `trusted-types aerocool-service-worker`;
- `require-trusted-types-for 'script'`.

Из-за `require-trusted-types-for 'script'` регистрацию service worker нельзя возвращать к простому строковому вызову:

```js
navigator.serviceWorker.register('/sw.js')
```

Текущий стандарт — получать URL через `getServiceWorkerUrl()` в `assets/js/site.js`. Эта функция создает Trusted Types policy `aerocool-service-worker` и разрешает только локальный `/sw.js`. Если PageSpeed показывает `This document requires 'TrustedScriptURL' assignment`, сначала проверить именно этот участок.

## 11. SEO и robots

В `development` все HTML-страницы получают:

```html
<meta name="robots" content="noindex,nofollow">
```

В `production` индексируемые страницы получают:

```html
<meta name="robots" content="index,follow">
```

Служебные страницы всегда должны оставаться `noindex,nofollow`:

```text
/404.html
/search/
/ru/search/
alias-страницы
```

JSON-LD генерируется централизованно через `layouts/_partials/_seo/jsonld.html` и выводится ближе к концу `body`, чтобы не задерживать первый экран.

## 12. Netlify routing и 404

`static/_redirects` копируется Hugo в `public/_redirects` и обрабатывается Netlify раньше правил из `netlify.toml`.

В текущем проекте этот файл не используется для SEO-переадресаций. Он явно переписывает корневой `/` на `/index.html` со статусом `200` и принудительно отдает кастомную `404` для типовых bot/scanner URL вроде `/wp-login.php`, `/wp-json/*`, `//blog/wp-includes/*`, `/.env`, `/.git/*`, `/.docker/*`, `/_nuxt/*`, `/.vite/*`, `/filemanager/*`, `/phpinfo.php`, `/test.php`, `/cpanel/*`.

Правила поддержки:

- корневое правило `/ -> /index.html 200` не убирать без проверки через Netlify CLI: оно защищает `/` от ложной `404` в Netlify routing/dev-сценариях;
- для таких scanner/sensitive путей использовать статус `404!`, чтобы правило сработало даже при случайном наличии файла;
- не использовать `*` в середине path, например `/*/wp-login.php`; для одного сегмента использовать placeholder `/:prefix/wp-login.php`;
- для подтвержденных старых пользовательских URL использовать `301` в `netlify.toml` только если есть реальная замена; удаленный без замены контент должен оставаться обычной `404`;
- человекопохожие parser URL из логов без подтвержденной замены (`/aboutus`, `/about-us`, `/company`, `/company-profile`, `/profile`, `/contactus`) не редиректить; они должны оставаться обычной `404`;
- общий fallback `/* -> /404.html 404` не нужен: Netlify автоматически использует `public/404.html` для несуществующих URL;
- после правок проверять, что `public/_redirects` обновился после сборки, `/` отдает `200`, scanner URL отдают `404`, а `/404.html` остается `noindex,nofollow`.

Подробно смотри [docs/deploy/netlify-routing.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/netlify-routing.md).

## 13. Unlighthouse

Папка:

```bash
cd unlighthouse
```

Основные команды:

```bash
npm install
npm run check:types
npm run audit:urls
npm run audit:ci:urls
npm run audit:technical
npm run audit:ci:technical
```

Важно:

- `audit:*` — интерактивные dashboard-прогоны;
- `audit:ci:*` — строгие прогоны с budget и exit code;
- `unlighthouse/reports/` не коммитится;
- старый загрязненный AdGuard-отчет удален;
- если в отчете появляется `local.adguard.org`, отчет бесполезен и его надо удалить.

Технические noindex-страницы проверяются отдельным конфигом `unlighthouse.technical.config.ts`, потому что SEO 100 для них невозможен и не нужен.

Подробно смотри [docs/quality/unlighthouse-site-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/unlighthouse-site-audit.md).

## 14. Основные команды разработки

```bash
mise install
npm install
npm run dev
npm run build
npm run build:production
```

Что они делают:

- `mise install` — читает `mise.toml` и ставит нужные версии Hugo/Node.
- `npm install` — ставит npm-зависимости проекта.
- `npm run dev` — запускает `hugo server`.
- `npm run build` — development-сборка, безопасная для noindex.
- `npm run build:production` — локальная production-сборка для финальной проверки index/follow.

## 15. Перед важным deploy

Минимальный чек:

```bash
npm run build
npm run build:production
cd unlighthouse
npm run check:types
npm run audit:ci:urls
npm run audit:ci:technical
```

Перед включением production в Netlify дополнительно проверить:

- главную `/`;
- русскую главную `/ru/`;
- каталог `/products/` и `/ru/products/`;
- одну серию;
- одну карточку товара;
- одну статью;
- одну новость;
- `/search/` и `/ru/search/`;
- `/404.html`;
- `public/_redirects`, если менялись `static/_redirects` или 404/routing;
- Netlify CLI routing check, если менялись `static/_redirects`, `netlify.toml` headers или 404/routing;
- sitemap index и языковые sitemap.

## 16. Карта документации

- `README.md` — главный вход в проект.
- `AGENTS.md` — правила работы для Codex/агентов.
- [docs/README.md](/Users/stadnyk/MEGA/Aerocool/docs/README.md) — оглавление всей документации.
- [docs/quality/unlighthouse-site-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/unlighthouse-site-audit.md) — Unlighthouse, бюджеты, отчеты, порядок аудита.
- [docs/quality/lighthouse-single-page-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/lighthouse-single-page-audit.md) — одиночный Lighthouse и PageSpeed-подход.
- [docs/quality/core-web-vitals-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/core-web-vitals-guide-2026.md) — полный Core Web Vitals гайд для Hugo/Netlify/Tailwind сайта.
- [docs/content/seo-image-shortcode.md](/Users/stadnyk/MEGA/Aerocool/docs/content/seo-image-shortcode.md) — shortcode изображений в теле контента.
- [docs/architecture/documentation-style-guide.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/documentation-style-guide.md) — стандарт русскоязычной, понятной и структурированной документации.
- [docs/seo/schema-types-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/schema-types-reference.md) — schema.org типы.
- [docs/seo/schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/schema-markup-quality-checklist-2026.md) — QA schema.org-графа, schema drift, ownership и vertical-specific запреты.
- [docs/seo/ai-search-entity-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/ai-search-entity-map-2026.md) — AI Search-аудит, prompt matrix, entity map и agentic readiness.
- [docs/seo/entity-registry-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entity-registry-2026.md) — реестр сущностей, entity home, `@id`, статусы и управляемые связи.
- [docs/seo/entity-registry-beginner-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entity-registry-beginner-guide-2026.md) — понятный гайд по Entity Registry, `about_entities`, `mentions_entities` и `product_group_id`.
- [docs/seo/entities-knowledge-graph-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entities-knowledge-graph-playbook-2026.md) — entity home, semantic triples, `@id` и knowledge graph.
- [docs/seo/ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/ecommerce-structured-data-playbook-2026.md) — Product/Offer/rating/variant/images policy для каталога.
- [docs/architecture/hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/hugo-template-helpers.md) — локальные helper partials.
- [docs/content/front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/front-matter-reference.md) — front matter полей.
- [docs/architecture/browser-view-transitions.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/browser-view-transitions.md) — view transitions.
- [docs/deploy/local-tooling-mise.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/local-tooling-mise.md) — локальные версии Hugo/Node.
- [docs/deploy/netlify-routing.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/netlify-routing.md) — Netlify redirects, forced 404 и служебная 404.
- [docs/audits/2026-04-29-hugo-0-161-compliance-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-04-29-hugo-0-161-compliance-audit.md) — совместимость проекта с Hugo 0.161.0.
- [docs/seo/json-ld-graph-audit-roadmap-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/json-ld-graph-audit-roadmap-2026.md) — текущее состояние schema.org графа и roadmap.
- [docs/seo/google-seo-audit-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/google-seo-audit-checklist-2026.md) — полный SEO-аудит Google с AI Search/entity visibility слоем.
- [docs/seo/ssg-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/ssg-seo-checklist-2026.md) — общий SSG SEO-чеклист для технического SEO, контента, schema и мониторинга.
- [docs/audits/2026-04-29-google-rich-results-quality-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-04-29-google-rich-results-quality-audit.md) — аудит Google rich results качества.
- [docs/audits/2026-05-06-content-depth-literary-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-06-content-depth-literary-audit.md) — аудит глубины и литературной обработки контента.
- [docs/audits/2026-05-06-schemaapp-pdf-documentation-integration-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-06-schemaapp-pdf-documentation-integration-audit.md) — что добавили внешние SchemaApp PDF в документацию проекта.
- [docs/audits/2026-05-06-project-readiness-assessment.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-06-project-readiness-assessment.md) — итоговая оценка готовности проекта.
- [docs/audits/2026-05-07-documentation-refresh-and-project-action-plan.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-07-documentation-refresh-and-project-action-plan.md) — текущий план действий после обновления документации и SchemaApp/AI Search интеграции.
- [docs/audits/2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md) — выводы из 126 статей SchemaApp за 2016-2026 для текущего проекта.
- [docs/audits/2026-05-13-content-image-cover-alt-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-13-content-image-cover-alt-audit.md) — проверка `image`, `cover`, `cover.alt` и content image consistency.
- [docs/audits/2026-05-13-documentation-2026-best-practices-sync-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-13-documentation-2026-best-practices-sync-audit.md) — базовая синхронизация всей документации с лучшими практиками 2026.
- [docs/audits/2026-05-14-seo-image-documentation-cleanup.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-14-seo-image-documentation-cleanup.md) — очистка image-документации после обновления `seo-image` и LCP preload.
- [docs/audits/2026-05-15-documentation-full-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-15-documentation-full-audit.md) — полный аудит документационного слоя и открытых документационных рисков.
- [docs/audits/2026-05-17-documentation-current-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-17-documentation-current-audit.md) — текущая проверка документации на русский язык, понятность для новичка, структуру, ссылки и актуальность внешних SEO/Hugo/Netlify/Tailwind правил.
- [docs/audits/2026-05-17-core-web-vitals-project-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-17-core-web-vitals-project-audit.md) — текущий Core Web Vitals аудит проекта, Lighthouse baseline и исправления `prefetch`/search preload.
- [docs/audits/2026-05-17-schemaapp-support-knowledge-base-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-17-schemaapp-support-knowledge-base-audit.md) — аудит support-статей Schema App по `sameAs`, primary entity, `additionalType`, `about`, `mentions`, breadcrumbs и image license metadata.
- [docs/audits/2026-05-17-json-ld-entity-full-audit-after-schemaapp-support.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-17-json-ld-entity-full-audit-after-schemaapp-support.md) — контрольный аудит JSON-LD и Entity Registry после новых support-данных Schema App.
- [docs/audits/2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md) — анализ PDF Schema App про connected schema, content knowledge graphs, impact of schema markup и Agentic Web.
- [docs/audits/2026-05-17-json-ld-entity-full-audit-after-schemaapp-pdf-data.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-17-json-ld-entity-full-audit-after-schemaapp-pdf-data.md) — полный аудит rendered JSON-LD, Product graph, Entity Registry и задач после анализа новых PDF Schema App.
- [docs/content/content-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/content/content-seo-checklist-2026.md) — SEO-проверка контента.
- [docs/seo/seo-keyword-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/seo-keyword-map-2026.md) — карта ключей.
- `docs/content/templates/` — шаблоны статей, новостей, товаров и серий.

Если нужно быстро понять проект без глубокого SEO-контекста, достаточно прочитать `README.md`, `AGENTS.md`, `docs/README.md`, `docs/content/front-matter-reference.md`, `docs/architecture/hugo-template-helpers.md` и `docs/quality/unlighthouse-site-audit.md`. Остальные документы нужны для более точной работы с контентом, schema.org, SEO и аудитом качества.
