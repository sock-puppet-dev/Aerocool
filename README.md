# Aerocool Ukraine

Обновлено: 2026-05-21.

`Aerocool Ukraine` — двуязычный маркетинговый и каталоговый сайт на `Hugo` для кресел Aerocool в Украине. Основной язык — украинский (`uk`), второй язык — русский (`ru`). Сайт собирается статически, деплоится через `Netlify`, использует локальные Hugo overrides поверх темы `PaperMod` и отдельный Unlighthouse-набор для технического аудита качества.

Если ты открыл проект впервые, читай так:

1. Этот `README.md` — общая карта проекта.
2. `AGENTS.md` — правила, как безопасно менять проект.
3. `docs/01-documentation-map.md` — оглавление всей документации.
4. `docs/content/05-front-matter-reference.md` — какие поля писать в `content/**/*.md`.
5. `docs/architecture/03-hugo-template-helpers.md` — какие шаблоны за что отвечают.
6. `docs/quality/13-unlighthouse-site-audit.md` — как проверять качество сайта после правок.

Проще говоря: `content/` отвечает за текст и данные страниц, `layouts/` отвечает за HTML/SEO/schema-логику, `assets/` отвечает за CSS/JS, а `unlighthouse/` отвечает за аудит качества.

Вся документация проекта должна быть русскоязычной, понятной новичку и структурированной. Единый стандарт стиля описан в [docs/architecture/02-documentation-style-guide.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/02-documentation-style-guide.md).

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
- `Netlify Functions` для будущих API-эндпоинтов отзывов
- `Netlify Database` / `PostgreSQL` для будущей SEO-first review-системы
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

Для будущей системы отзывов подключен `Netlify Database`. Целевая архитектура описана в [docs/deploy/17-netlify-database-reviews.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/17-netlify-database-reviews.md): отзывы хранятся в PostgreSQL, проходят модерацию, выгружаются в `data/generated/reviews.json` на этапе build и только после этого попадают в видимый HTML и `Product` JSON-LD.

Текущий правильный workflow такой:

1. Локально или в ветке делаешь изменения.
2. Netlify собирает Deploy Preview.
3. Проверяешь сайт вручную или через Unlighthouse из папки `unlighthouse/`.
4. После финального решения переводишь Netlify в `production`, если сайт должен индексироваться.

## 5. Основная структура

```text
content/                        контент сайта
content/products/               каталог, серии и варианты товаров
content/articles/               evergreen-статьи
content/news/                   новости и запусковые материалы
data/                           структурированные данные Hugo
data/entities.yaml              реестр сущностей для schema.org-связей
data/generated/                 будущие build-time exports, например approved reviews snapshot
layouts/                        локальные Hugo-шаблоны и overrides
layouts/_partials/              локальные partials
layouts/_shortcodes/            локальные shortcodes
assets/css/main.css             Tailwind CSS и локальный visual layer
assets/js/site.js               общий внешний JS сайта без inline-скриптов
static/                         статические файлы
static/_redirects               root rewrite и forced 404 для scanner/sensitive URL на Netlify
netlify/database/migrations/    будущие SQL-миграции Netlify Database
unlighthouse/                   аудит Lighthouse/Unlighthouse
hugo.yaml                       конфигурация Hugo
netlify.toml                    сборка Netlify и HTTP headers
mise.toml                       локальные версии Hugo и Node для mise
package.json                    npm-команды корневого Hugo-проекта
```

Что не нужно редактировать вручную:

- `public/` — результат сборки Hugo;
- `resources/` — временные Hugo-кэши;
- `node_modules/` — установленные npm-пакеты;
- `unlighthouse/reports/` — временные отчеты аудита.

Если нужно изменить страницу, почти всегда начинай с `content/`, `layouts/`, `assets/` или `data/`, а не с `public/`.

Папки `data/generated/` и `netlify/database/migrations/` относятся к будущей review-системе. Если их еще нет в рабочем дереве, это нормально: они появятся после реализации build-time export approved отзывов и первой SQL-миграции.

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

Видимая meta-строка управляется локальным helper [layouts/_partials/page-meta.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-meta.html), а не прямым выводом PaperMod `post_meta.html`.

Текущая политика:

- статьи показывают дату публикации и время чтения;
- новости показывают только дату публикации;
- `/contact/`, `/faq/`, `/about/`, `/products/`, серии, товары, поиск и служебные страницы не показывают блоговую meta-строку под `H1`;
- количество слов, автор организации и список переводов не выводятся в контентной meta-строке;
- переключатель языка остается в шапке сайта.

`date` и `lastmod` при этом не удаляются из front matter: они нужны для сортировки, RSS, head/schema-слоя и редакционного блока статей/новостей.

Для товарных страниц product facts хранятся в front matter конкретного `content/products/<series>/<model>/index*.md`. Это единый источник правды для цены, наличия, SKU, MPN, GTIN, гарантии, доставки, возврата и способов оплаты. Владелец бизнес-значений — команда Aerocool Украина; `Product` JSON-LD, видимый товарный блок и `/faq/` должны быть синхронизированы с front matter.

Для отзывов и рейтингов целевой источник правды другой: `Netlify Database` с approved отзывами и build-time export в Hugo data. Поля `rating.value` и `rating.count` во front matter считаются legacy-риском до переключения `Product` JSON-LD на реальные публичные отзывы.

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
- `layouts/_partials/page-meta.html` — видимая meta-строка для статей и новостей.
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

Подробно смотри [docs/deploy/16-netlify-routing.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/16-netlify-routing.md).

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

Подробно смотри [docs/quality/13-unlighthouse-site-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/13-unlighthouse-site-audit.md).

## 14. Основные команды и helper-скрипты

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

Для ежедневной работы удобнее использовать root helper-скрипты. Они находятся в корне проекта, запускаются из любой текущей папки и содержат комментарии с назначением и инструкцией.

Карта всех скриптов:

```bash
./script_help.sh
```

Основной набор:

| Скрипт | Когда запускать | Что делает |
| --- | --- | --- |
| `./script_setup.sh` | После первого клонирования или переноса проекта | Подтягивает git-подмодули, запускает `mise install`, ставит npm-зависимости корня и `unlighthouse/`. |
| `./script_start.sh` | Для ежедневной разработки | Запускает `hugo server` со встроенным Hugo/Tailwind pipeline. |
| `./script_build.sh` | После правок и перед ручной проверкой | Запускает `npm run build`. |
| `./script_build_production.sh` | Перед финальной SEO/indexability-проверкой | Запускает `npm run build:production`. |
| `./script_check.sh` | Перед коммитом | Собирает сайт и проверяет `_redirects`, `.DS_Store`, markdown `# H1`, inline-code в `content/`, `schema_type` и noindex для служебных страниц. |
| `./script_netlify_dev.sh` | После правок `static/_redirects`, `netlify.toml`, 404, headers или CSP | Собирает `public/` и запускает Netlify Dev на `http://localhost:8899`. |
| `./script_check_routes.sh` | После запуска `script_netlify_dev.sh` | Проверяет ключевые `200` и scanner/sensitive `404` через `curl`. |
| `./script_audit_urls.sh` | После крупных SEO/CSS/layout/image-правок | Запускает Unlighthouse-аудит критических URL. |
| `./script_clean.sh` | Когда нужна безопасная очистка Hugo-кэша | Удаляет только `public`, `resources`, `.hugo_build.lock`, `hugo_stats.json`. |
| `./script_reset_full.sh` | Когда сломались зависимости и мягкой очистки недостаточно | Удаляет Hugo-артефакты, `node_modules` и `.cache`, затем запускает `npm install`, сохраняя `package-lock.json`. |
| `./script_reset_full.sh --with-lockfile` | Только если lock-файл действительно нужно пересоздать | Дополнительно удаляет `package-lock.json` перед `npm install`. |

Обычный короткий цикл:

```bash
./script_start.sh
./script_check.sh
```

После изменений Netlify routing или headers:

```bash
./script_netlify_dev.sh
./script_check_routes.sh
```

## 15. Перед важным deploy

Минимальный чек:

```bash
./script_check.sh
./script_build_production.sh
./script_audit_urls.sh
```

Для строгого Unlighthouse-прогона с budget и exit code:

```bash
cd unlighthouse
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

Документация теперь имеет явную последовательность чтения. Корневые файлы остаются со стандартными именами, а все файлы внутри `docs/` имеют глобальный номер в начале имени.

Базовый маршрут новичка:

1. `README.md` — главный вход в проект.
2. `AGENTS.md` — правила безопасной работы для Codex/агентов.
3. [docs/01-documentation-map.md](/Users/stadnyk/MEGA/Aerocool/docs/01-documentation-map.md) — полная карта документации и порядок чтения `01-53`.
4. [docs/architecture/02-documentation-style-guide.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/02-documentation-style-guide.md) — стандарт русскоязычной, понятной и структурированной документации.
5. [docs/architecture/03-hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/03-hugo-template-helpers.md) — локальные Hugo helpers и partials.
6. [docs/content/05-front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/05-front-matter-reference.md) — поля front matter для страниц.
7. [docs/quality/13-unlighthouse-site-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/13-unlighthouse-site-audit.md) — базовая массовая проверка качества сайта.

Диапазоны нумерации внутри `docs/`:

- `01` — карта документации.
- `02-04` — архитектура и шаблонный слой.
- `05-11` — контент, изображения и шаблоны материалов.
- `12-14` — Core Web Vitals, Lighthouse и Unlighthouse.
- `15-17` — локальные инструменты, Netlify routing и review-инфраструктура.
- `18-28` — SEO, schema.org, Entity Registry и structured data.
- `29-50` — audit-снимки и исторические оценки до UI-карты.
- `51` — прикладная карта UI/UX-внедрения Tailwind Plus.
- `52+` — новые audit-снимки, SEO-базы и последующие проектные документы.

Весь полный список файлов и их порядок чтения поддерживается в [docs/01-documentation-map.md](/Users/stadnyk/MEGA/Aerocool/docs/01-documentation-map.md). Если добавляется новый документ, сначала выбирается следующий свободный номер, затем обновляются `docs/01-documentation-map.md`, `README.md`, `AGENTS.md` и локальные ссылки.
