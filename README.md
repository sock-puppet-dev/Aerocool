# Aerocool

Маркетинговый и каталоговый сайт `Aerocool Ukraine` на `Hugo` с двуязычной архитектурой `uk` + `ru`, SEO-ориентированным контентом и каталогом кресел серий `SKY`, `WING` и `XTAL`.

## Стек

- `Hugo 0.161.0`
- `Node 24`
- `PaperMod` как git-подмодуль
- `Tailwind CSS 4`
- `Netlify` для развертывания

## Структура Проекта

- `content/` — весь контент сайта
- `content/_index.md` и `content/_index.ru.md` — локализованные главные страницы
- `content/products/` — каталог, серии и карточки товаров
- `content/articles/` — постоянно актуальные статьи и материалы со сравнениями
- `content/news/` — новости, анонсы и материалы о запусках
- `content/about`, `content/contact`, `content/faq`, `content/search*` — статичные и служебные страницы
- `layouts/` — локальные Hugo-переопределения
- `assets/css/main.css` — главный CSS-источник проекта: здесь живут Tailwind, локальные design tokens, белый page canvas, базовый текстовый слой и component-layer проекта
- `static/` — статические файлы
- `hugo.yaml` — глобальная конфигурация сайта
- `netlify.toml` — сборка и заголовки ответа; сейчас окружение Hugo временно `development`

## Текущая Архитектура Шаблонов

- Основной общий слой шаблонов живет в [layouts/single.html](/Users/stadnyk/MEGA/Aerocool/layouts/single.html) и [layouts/list.html](/Users/stadnyk/MEGA/Aerocool/layouts/list.html).
- Служебные страницы вынесены в отдельные верхнеуровневые шаблоны: [layouts/404.html](/Users/stadnyk/MEGA/Aerocool/layouts/404.html), [layouts/alias.html](/Users/stadnyk/MEGA/Aerocool/layouts/alias.html) и [layouts/search.html](/Users/stadnyk/MEGA/Aerocool/layouts/search.html).
- RSS-шаблон находится в [layouts/rss.xml](/Users/stadnyk/MEGA/Aerocool/layouts/rss.xml).
- Языковые sitemap-шаблоны вынесены в [layouts/sitemap.xml](/Users/stadnyk/MEGA/Aerocool/layouts/sitemap.xml), а корневой мультиязычный индекс — в [layouts/sitemapindex.xml](/Users/stadnyk/MEGA/Aerocool/layouts/sitemapindex.xml).
- В проекте больше нет локальной папки `layouts/_default`; локальные overrides держим верхнеуровнево в `layouts/` или в профильных подпапках вроде `layouts/faq/`.
- Локальные partial-шаблоны и shortcodes в проекте держим в формате `.html`, а не `.gohtml`.
- Partial списка переводов называется [layouts/_partials/translation-list.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/translation-list.html); старое имя `translation_list.html` не использовать.
- Для большинства страниц видимый `H1` принадлежит шаблонному слою и рендерится через `layouts/_partials/page-h1.html` по правилу `.Params.h1 | default .Title`.
- Текущая главная страница — осознанное исключение: ее hero и видимый `H1` живут в [layouts/_shortcodes/home-hero.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/home-hero.html) и [layouts/_shortcodes/home-hero-ru.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/home-hero-ru.html).
- Home hero использует namespaced CSS-хуки `home-hero__*`, а их визуальный слой живет в [assets/css/main.css](/Users/stadnyk/MEGA/Aerocool/assets/css/main.css).
- В теле markdown не используем `# H1`; контент начинается с вводного абзаца или `##`.

## Контентные Правила

- Основной язык — украинский (`index.md`), перевод — русский (`index.ru.md`).
- Использовать только `schema_types`, не `schema_type`.
- При необходимости можно задавать отдельный `h1` в метаданных страницы, если видимый заголовок должен быть короче или чище, чем SEO-заголовок `title`.
- Evergreen-статьи в `content/articles` обычно целятся в `10000+` знаков тела на каждую языковую версию.
- Новости в `content/news`, если они поддерживают органическую видимость, обычно целятся в `5000+` знаков тела на каждую языковую версию.
- Контент должен покрывать не только брендовые запросы, но и широкие коммерческие кластеры: `игровое кресло`, `офисное кресло`, `компьютерное кресло`, `кресло для работы`, `home office`.
- Технические обозначения, характеристики и поисковые фразы, которые в markdown оформляются как inline-code, пишем жирным code-стилем: ``**`11D`**``, ``**`SYNC5 multi-adjustable`**``. Это правило относится к `content/**/*.md`, а не к Hugo/JS-коду в `layouts/`.
- Статьи и новости должны вести в каталог, серии, конкретные товары, FAQ и контакты.

## Изображения И SEO

- Для изображений внутри папки страницы (`page bundle` в терминологии Hugo) использовать shortcode `seo-image`.
- Для карточек товаров текущий рабочий паттерн такой: `image` для SEO/OG/schema, `cover.image` для preview в листингах и `seo-image` в теле страницы для основного изображения.
- Hero-изображение главной сейчас задается отдельно в локализованных home-shortcodes и не проходит через `seo-image`; для него держим локальный путь через `relURL`, `loading="eager"` и `fetchpriority="high"`.
- JSON-LD для основного изображения собирается централизованно в общем `@graph`; `seo-image` больше не выводит отдельный `ImageObject`.
- `search`, `404` и служебные alias-страницы — это служебные страницы, и они должны оставаться `noindex,nofollow`. Пока окружение Hugo временно `development`, все HTML-страницы тоже получают `noindex,nofollow`; `index,follow` вернется только после включения production-режима.
- Корневой `sitemap.xml` в мультиязычной сборке является индексом карт сайта, а реальные списки URL лежат в `/uk/sitemap.xml` и `/ru/sitemap.xml`.

## Основные Команды

```bash
mise install
npm install
npm run dev
npm run build
hugo server --environment development --disableFastRender
hugo --environment development --gc --minify --cleanDestinationDir
```

Локальные версии инструментов зафиксированы в [.mise.toml](/Users/stadnyk/MEGA/Aerocool/.mise.toml): `Hugo 0.161.0` и `Node 24`. `npm run dev` запускает `hugo server`, а `npm run build` предварительно обновляет подмодули и затем собирает сборку в окружении `development`. Production-режим пока не включаем. Для Hugo 0.161.0 важно, что Tailwind установлен как npm-зависимость проекта: Hugo запускает Node-инструменты через Node permission model, поэтому standalone Tailwind CLI не используем. Для отладки шаблонов, CSS, SEO и изображений предпочтителен `hugo server --environment development --disableFastRender`.

## Локальная Документация

- `AGENTS.md`
- `CONTENT-SEO-CHECKLIST-2026.md`
- `KEYWORD-MAP-2026.md`
- `GUIDE to all front matters.md`
- `GUIDE to helpers.md`
- `JSON-LD-GRAPH-ROADMAP-2026.md`
- `GUIDE to seo-image.md`
- `GUIDE to schema_types.md`
- `GUIDE to view transitions.md`
- `GUIDE to mise.md`
- `HUGO-0.161.0-COMPLIANCE-AUDIT-2026-04-29.md`
- `RICH-RESULTS-AUDIT-2026-04-29.md`
- `TOP SEO SSG CHECKLIST 2026.md`
- `CONTENT-TEMPLATE-ARTICLE.md`
- `CONTENT-TEMPLATE-NEWS.md`
- `CONTENT-TEMPLATE-PRODUCT.md`
- `CONTENT-TEMPLATE-SERIES.md`
