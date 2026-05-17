# AGENTS.md

## Обзор Проекта

- `Aerocool Ukraine` — маркетинговый и каталоговый сайт на `Hugo`.
- Основной язык сайта — украинский (`uk`), второй язык — русский (`ru`).
- Активная тема — `themes/PaperMod`, подключенная как git-подмодуль.
- Развертывание настроено через `Netlify`.

## Стек

- В `Netlify` зафиксирована версия `Hugo 0.161.0`.
- В `Netlify` зафиксирована версия `Node 24`.
- Локальные версии инструментов зафиксированы в `mise.toml`.
- Для стилизации используется `Tailwind CSS 4`.
- В Hugo 0.161.0 Node-инструменты запускаются через Node permission model; Tailwind должен оставаться npm-зависимостью проекта, standalone Tailwind CLI не использовать.
- Локальные SEO-шаблоны и шаблоны schema.org-разметки находятся в `layouts/_partials/_seo` и `layouts/_partials/_schema`.

## Структура Репозитория

- `content/` — весь контент сайта.
- `content/_index.md` и `content/_index.ru.md` — локализованные главные страницы.
- `content/about`, `content/contact`, `content/faq` — локализованные статичные страницы.
- `content/articles`, `content/news` — материалы в формате папок страниц Hugo (`page bundle`) со структурами `index.md` и `index.ru.md`.
- `content/products` — каталог товаров. Для серий используются `_index.md` / `_index.ru.md`, а варианты товаров лежат во вложенных папках как самостоятельные папки страниц.
- `data/entities.yaml` — структурированный реестр entity IDs для safe resolver schema.org-связей.
- `layouts/` — локальные Hugo-переопределения. По умолчанию правки вносятся сюда, а не в тему.
- `layouts/single.html` и `layouts/list.html` — общие базовые шаблоны для большинства типов страниц.
- `layouts/404.html`, `layouts/alias.html` и `layouts/search.html` — служебные шаблоны страниц, которые не должны попадать в SEO-индекс.
- `layouts/rss.xml` — локальный RSS-шаблон.
- `layouts/sitemap.xml` — шаблон языковых sitemap-файлов.
- `layouts/sitemapindex.xml` — шаблон корневого мультиязычного sitemap index.
- Папки `layouts/_default` в локальном слое больше нет; не возвращать туда новые overrides без отдельной причины.
- Partial списка переводов — `layouts/_partials/translation-list.html`; старое имя `translation_list.html` не использовать.
- `assets/css/main.css` — главный источник Tailwind и кастомного CSS; здесь же живут локальные design tokens, белый page canvas, базовый текстовый слой и component-layer проекта.
- `static/` — статические файлы, которые копируются как есть.
- `static/_redirects` — Netlify `_redirects` для явного root rewrite `/ -> /index.html 200` и forced `404!` по bot/scanner и sensitive URL: WordPress, `.env`, `.git`, framework manifests, filemanager, PHP/debug probes вроде `/phpinfo.php`, `/test.php` и `/:prefix/phpinfo.php`. SEO-переадресации сюда не добавлять; общий fallback `/* -> /404.html 404` не использовать, потому что Netlify автоматически берет `public/404.html`.
- `hugo.yaml` — основная конфигурация сайта: языки, постоянные ссылки, меню и настройки сборки.
- `netlify.toml` — сборка и заголовки ответа; временно используется `HUGO_ENVIRONMENT = "development"`, production включать только после финальной проверки.
- `mise.toml` — локальные версии `Hugo 0.161.0` и `Node 24` для `mise`.
- `unlighthouse/` — локальный набор конфигов для массового Lighthouse-аудита. Он не деплоит сайт, а проверяет уже опубликованный URL или Netlify Deploy Preview.

## Локальные Гайды

Перед тем как придумывать новые метаданные страницы, SEO-паттерн или контентную структуру, сначала сверяйтесь с локальными документами:

- `README.md`
- `docs/README.md`
- `docs/architecture/documentation-style-guide.md`
- `docs/seo/seo-keyword-map-2026.md`
- `docs/content/content-seo-checklist-2026.md`
- `docs/content/front-matter-reference.md`
- `docs/architecture/hugo-template-helpers.md`
- `docs/content/seo-image-shortcode.md`
- `docs/seo/schema-types-reference.md`
- `docs/seo/entity-registry-2026.md`
- `docs/seo/entity-registry-beginner-guide-2026.md`
- `docs/seo/schema-markup-quality-checklist-2026.md`
- `docs/seo/ai-search-entity-map-2026.md`
- `docs/seo/entities-knowledge-graph-playbook-2026.md`
- `docs/seo/ecommerce-structured-data-playbook-2026.md`
- `docs/seo/json-ld-graph-audit-roadmap-2026.md`
- `docs/seo/google-seo-audit-checklist-2026.md`
- `docs/seo/ssg-seo-checklist-2026.md`
- `docs/audits/2026-04-29-hugo-0-161-compliance-audit.md`
- `docs/audits/2026-04-29-google-rich-results-quality-audit.md`
- `docs/audits/2026-05-06-content-depth-literary-audit.md`
- `docs/audits/2026-05-06-schemaapp-pdf-documentation-integration-audit.md`
- `docs/audits/2026-05-06-project-readiness-assessment.md`
- `docs/audits/2026-05-07-documentation-refresh-and-project-action-plan.md`
- `docs/audits/2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md`
- `docs/audits/2026-05-13-content-image-cover-alt-audit.md`
- `docs/audits/2026-05-13-documentation-2026-best-practices-sync-audit.md`
- `docs/audits/2026-05-14-seo-image-documentation-cleanup.md`
- `docs/audits/2026-05-15-documentation-full-audit.md`
- `docs/audits/2026-05-17-documentation-current-audit.md`
- `docs/audits/2026-05-17-core-web-vitals-project-audit.md`
- `docs/audits/2026-05-17-schemaapp-support-knowledge-base-audit.md`
- `docs/audits/2026-05-17-json-ld-entity-full-audit-after-schemaapp-support.md`
- `docs/audits/2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md`
- `docs/audits/2026-05-17-json-ld-entity-full-audit-after-schemaapp-pdf-data.md`
- `docs/architecture/browser-view-transitions.md`
- `docs/deploy/local-tooling-mise.md`
- `docs/deploy/netlify-routing.md`
- `docs/quality/core-web-vitals-guide-2026.md`
- `docs/quality/lighthouse-single-page-audit.md`
- `docs/quality/unlighthouse-site-audit.md`

Для новичка порядок чтения такой: сначала `README.md`, затем `docs/README.md`, затем `docs/content/front-matter-reference.md`, затем `docs/architecture/hugo-template-helpers.md`, затем `docs/quality/unlighthouse-site-audit.md`. Для SEO/schema-задач после этого читать `docs/seo/schema-types-reference.md`, `docs/seo/schema-markup-quality-checklist-2026.md`, `docs/seo/entities-knowledge-graph-playbook-2026.md` и профильный playbook по задаче. Для performance/Core Web Vitals-задач читать `docs/quality/core-web-vitals-guide-2026.md`. Остальные гайды подключать по задаче.

## Контентные Правила

- Вся проектная документация должна быть написана на русском языке, с пояснениями для новичка и строгой структурой. Английские термины оставлять только для названий технологий, файлов, команд, полей и официальных SEO/schema/CWV-терминов. Подробный стандарт — `docs/architecture/documentation-style-guide.md`.

- Украинская и русская версии должны оставаться синхронными, если задача явно не ограничена одним языком.
- Текущий локализационный паттерн: `index.md` для украинской версии и `index.ru.md` для русской внутри одной папки страницы (`page bundle`).
- Изображения и другие файлы страницы хранятся рядом с теми контентными файлами, которые их используют.
- Для статей, новостей и товарных вариантов используйте явные `slug`, если важен контроль URL.
- Варианты товаров сознательно разделены по модели и цвету. Для каждого варианта — отдельная папка и отдельный `slug`.
- Во front matter использовать только `schema_types`. Шаблоны читают `.Params.schema_types`; не переходить на `schema_type`.
- Entity-поля `about_entities`, `mentions_entities` и `product_group_id` можно добавлять только точечно: каждое значение должно существовать в `data/entities.yaml` и быть раскрыто видимым контентом страницы. Для `about_entities` и `mentions_entities` использовать только `confirmed` сущности; `product_group_id` может быть staged, но JSON-LD `isVariantOf` появится только после перевода ProductGroup в `confirmed`.
- Для товарных страниц единый источник правды по product facts — front matter конкретного `content/products/<series>/<model>/index*.md`: цена, наличие, SKU, MPN, GTIN, гарантия, доставка, возврат, способы оплаты и rating. Владелец бизнес-значений — команда Aerocool Украина. Видимый товарный текст и `/faq/` должны подтверждать эти значения, а не заменять их.
- Для большинства страниц видимый `H1` рендерится шаблонным слоем через `layouts/_partials/page-h1.html` по правилу `.Params.h1 | default .Title`.
- Текущая главная страница — исключение: ее hero и видимый `H1` задаются единым shortcode `layouts/_shortcodes/home-hero.html`, который сам переключает украинский/русский текст по языку страницы.
- Home hero использует namespaced CSS-хуки `home-hero__*`; их визуальный слой держим в `assets/css/main.css`, а не размазываем по теме.
- Не добавлять markdown `# H1` внутрь `content/`. Тело страницы должно начинаться с вводного абзаца или с `##`.
- Поле `h1` в метаданных страницы использовать только тогда, когда видимый заголовок должен отличаться от SEO-заголовка документа `title`.
- При редактировании сохранять `date` и `lastmod`. `lastmod` обновлять при любом содержательном изменении.
- В видимом markdown-контенте `content/**/*.md` не использовать обратные кавычки для inline-code. Точные технические обозначения, характеристики, SKU/MPN/GTIN, размеры, рейтинги и значения из таблиц выделять обычным жирным форматом: `**11D**`, `**SYNC5 multi-adjustable**`, `**75 мм**`. Широкие коммерческие SEO-фразы вроде `игровое кресло`, `офисное кресло`, `компьютерное кресло`, `кресло для работы`, `home office` писать обычным текстом или, если нужен акцент, обычным жирным выделением. Это правило не относится к Hugo/JS-коду в `layouts/` и к документационным примерам вне `content/`.
- Сайт должен покрывать не только брендовые запросы, но и широкие коммерческие кластеры: `игровое кресло`, `офисное кресло`, `компьютерное кресло`, `кресло для работы`, `home office`.
- Постоянно актуальные статьи в `content/articles` обычно должны целиться минимум в `10000` знаков основного текста на каждую языковую версию.
- Брендовые и запусковые новости в `content/news`, если они поддерживают органическую видимость, обычно должны целиться минимум в `5000` знаков тела на каждую языковую версию.
- Товарные страницы в `content/products/<series>/<model>/` обычно должны целиться минимум в `6000` знаков основного текста на каждую языковую версию.
- Страницы серий в `content/products/<series>/_index.md` и `_index.ru.md` обычно должны целиться минимум в `6000` знаков основного текста на каждую языковую версию.
- Хабы `/products/`, `/articles/` и `/news/` обычно должны целиться минимум в `7000` знаков основного текста на каждую языковую версию.
- Страница `/about/` обычно должна целиться минимум в `10000` знаков основного текста на каждую языковую версию.
- Статьи и новости должны вести пользователя в каталог через прямые внутренние ссылки на серии, товары, FAQ и контакты.

## Изображения И SEO

- Для контентных изображений по возможности использовать shortcode `seo-image`, а не сырые `<img>`.
- Для каждого файла `content/**/*.md` поддерживать связку `image` + полный служебный `cover`-блок: `cover.image`, `cover.alt`, `cover.relative`, `cover.hiddenInSingle`.
- Для товарных карточек текущий стандарт такой: `image` во front matter для SEO/OG/schema, `cover.image` для preview в листингах и `seo-image` в теле страницы для основного изображения.
- Для главных изображений первого экрана (LCP) обычно нужен `eager loading`; для второстепенных изображений — `lazy loading`.
- Для hero-изображения главной страницы сейчас используется обычный `<img>` внутри `layouts/_shortcodes/home-hero.html`; там сохранять локальный путь через `relURL`, `loading="eager"` и `fetchpriority="high"`.
- Параметр `jsonld` в shortcode `seo-image` больше не использовать: schema для primary image собирается централизованно из `image` во front matter.
- `alt` и `cover.alt` должны быть описательными и соответствовать языку страницы. Для `cover.alt` лучше называть сущность или тему изображения, а не начинать с общей формулы вроде `Обложка` / `Обкладинка`.
- В проекте уже есть шаблоны schema.org-разметки для `website`, `organization`, `brand`, `collection`, `article`, `news`, `product`, `faq` и `breadcrumbs`.

## Шаблоны И Стили

- Сначала расширяем или переопределяем `Hugo`-шаблоны в `layouts/`, и только потом рассматриваем правки в `themes/PaperMod`.
- Если кажется, что нужно менять тему, сначала подтвердите, что этого нельзя добиться локальным переопределением.
- Локальные шаблоны, partials и shortcodes держим в формате `.html`; не возвращать `.gohtml`.
- Для новых локальных overrides сначала использовать верхний уровень `layouts/` или профильную подпапку, а не восстанавливать `layouts/_default`.
- При изменении CSS правим `assets/css/main.css`.
- В `assets/css/main.css` сначала обновляем design tokens и component-layer, и только потом добавляем точечный override; избегать возврата к широким `!important`-хакам и случайным hardcode-правилам темы.
- Поиск Tailwind-классов зависит от статистики сборки Hugo и путей сканирования контента/шаблонов. Не переносить шаблоны или контент в новые директории без проверки конфигурации.

## Сборка И Запуск

- Установка зависимостей: `npm install`.
- Локальная разработка: `./script_start.sh` или `hugo server`.
- Tailwind компилируется через `css.TailwindCSS` внутри Hugo; отдельный watch-процесс Tailwind не нужен.
- `npm run dev` — это удобный алиас для `hugo server`.
- Build в `Netlify`: `git submodule update --init --recursive && hugo --environment development --gc --minify`.
- `script_clean.sh` — разрушительный скрипт: он удаляет `public`, `resources`, `node_modules`, `.cache` и `package-lock.json`, а затем заново ставит зависимости.

## Правила Редактирования

- Не редактировать сгенерированный вывод в `public/` и временные Hugo-кэши в `resources/`.
- Не коммитить случайные `.DS_Store`.
- Предпочитать небольшие переопределения в `layouts/` и точечные правки контента вместо широких изменений темы.
- При добавлении новых разделов сохранять текущую двуязычную структуру папок и файлов.
- При изменении меню, языков, permalink-логики или SEO-дефолтов осторожно редактировать `hugo.yaml`, потому что это влияет на весь сайт.
- При изменении `static/_redirects` использовать синтаксис Netlify: корневой rewrite держать выше scanner-правил, `*` применять только как splat в конце path segment, placeholder `/:prefix/...` использовать для одного сегмента, scanner/sensitive правила оставлять со статусом `404!`. Человекопохожие parser URL из логов без подтвержденной замены, например `/aboutus`, `/contactus`, `/company` или `/profile`, не редиректить; они должны оставаться обычной `404`.

## Проверки

- Для контентных правок запускать хотя бы сборку Hugo или локальный сервер.
- Для правок шаблонов или CSS проверять минимум главную страницу, одну страницу-листинг и одну детальную страницу в обоих языках.
- Проверять, что локализованные ссылки корректно работают и под `/`, и под `/ru/`.
- Проверять, что изображения из папок страниц берутся из правильной директории.
- Проверять, что метаданные страницы, связанные со schema.org, используют `schema_types` и соответствуют текущим шаблонам.
- Проверять, что `search` остается `noindex,nofollow`. Пока проект намеренно собирается с `HUGO_ENVIRONMENT = "development"`, все HTML-страницы остаются `noindex,nofollow`; перед production-переходом отдельно проверить возврат `index,follow` для индексируемых URL.
- Проверять, что `404` и служебные alias-страницы остаются `noindex,nofollow`.
- При правках `static/_redirects` проверять, что `public/_redirects` обновился после сборки, `/` отдает `200`, а кастомная 404 продолжает отдаваться для scanner/sensitive URL. Для финальной проверки routing/headers использовать Netlify CLI или Deploy Preview.
- Проверять, что корневой `sitemap.xml` остается индексом карт сайта, а `/uk/sitemap.xml` и `/ru/sitemap.xml` содержат только индексируемые URL.
- Для SEO-посадочных страниц дополнительно проверять целевые объемы текста и покрытие как брендовых, так и широких коммерческих интентов.
