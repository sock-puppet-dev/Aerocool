# Aerocool

Маркетинговый и каталоговый сайт `Aerocool Ukraine` на `Hugo` с двуязычной архитектурой `uk` + `ru`, SEO-ориентированным контентом и каталогом кресел серий `SKY`, `WING` и `XTAL`.

## Стек

- `Hugo 0.157.0`
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
- `assets/css/main.css` — главный CSS-источник проекта
- `static/` — статические файлы
- `hugo.yaml` — глобальная конфигурация сайта
- `netlify.toml` — production-сборка и заголовки ответа

## Текущая Архитектура Шаблонов

- Основной общий слой шаблонов живет в `layouts/single.html` и `layouts/list.html`.
- Служебные страницы вынесены в отдельные шаблоны: `layouts/404.html` и `layouts/alias.html`.
- Языковые sitemap-шаблоны вынесены в [layouts/sitemap.xml](/Users/stadnyk/MEGA/Aerocool/layouts/sitemap.xml), а корневой мультиязычный индекс — в [layouts/sitemapindex.xml](/Users/stadnyk/MEGA/Aerocool/layouts/sitemapindex.xml).
- Локальные partial-шаблоны и shortcodes в проекте держим в формате `.html`, а не `.gohtml`.
- Видимый `H1` принадлежит шаблонному слою и рендерится через `layouts/_partials/page-h1.html` по правилу `.Params.h1 | default .Title`.
- В теле markdown не используем `# H1`; контент начинается с вводного абзаца или `##`.

## Контентные Правила

- Основной язык — украинский (`index.md`), перевод — русский (`index.ru.md`).
- Использовать только `schema_types`, не `schema_type`.
- При необходимости можно задавать отдельный `h1` в метаданных страницы, если видимый заголовок должен быть короче или чище, чем SEO-заголовок `title`.
- Evergreen-статьи в `content/articles` обычно целятся в `10000+` знаков тела на каждую языковую версию.
- Новости в `content/news`, если они поддерживают органическую видимость, обычно целятся в `5000+` знаков тела на каждую языковую версию.
- Контент должен покрывать не только брендовые запросы, но и широкие коммерческие кластеры: `игровое кресло`, `офисное кресло`, `компьютерное кресло`, `кресло для работы`, `home office`.
- Статьи и новости должны вести в каталог, серии, конкретные товары, FAQ и контакты.

## Изображения И SEO

- Для изображений внутри папки страницы (`page bundle` в терминологии Hugo) использовать shortcode `seo-image`.
- Для главного изображения основной языковой версии допустим `jsonld=true`.
- Для перевода при использовании `seo-image` держим `jsonld=false`.
- `search`, `404` и служебные alias-страницы — это служебные страницы, и они должны оставаться `noindex,nofollow`.
- Корневой `sitemap.xml` в мультиязычной сборке является индексом карт сайта, а реальные списки URL лежат в `/uk/sitemap.xml` и `/ru/sitemap.xml`.

## Основные Команды

```bash
npm install
npm run dev
npm run build
hugo --environment production --minify --gc --cleanDestinationDir
```

`npm run dev` запускает `hugo server`, а `npm run build` предварительно обновляет подмодули и затем собирает production-сборку.

## Локальная Документация

- `AGENTS.md`
- `CONTENT-SEO-CHECKLIST-2026.md`
- `KEYWORD-MAP-2026.md`
- `GUIDE to all front matters.md`
- `GUIDE to seo-image.md`
- `GUIDE to schema_types.md`
- `GUIDE to view transitions.md`
- `GUIDE to mise.md`
- `CONTENT-TEMPLATE-ARTICLE.md`
- `CONTENT-TEMPLATE-NEWS.md`
- `CONTENT-TEMPLATE-PRODUCT.md`
- `CONTENT-TEMPLATE-SERIES.md`
