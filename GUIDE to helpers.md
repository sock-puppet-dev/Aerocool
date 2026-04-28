# GUIDE to helpers

## Зачем Нужен Этот Гайд

Этот документ объясняет логику локальных `helpers` и `partials` проекта `Aerocool` так, чтобы в ней мог быстро разобраться новичок.

Главная цель:

- понять, **что такое helper в Hugo**;
- понять, **какие helpers есть в проекте**;
- понять, **какой helper за что отвечает**;
- понимать, **в какой файл идти, если нужно изменить конкретное поведение сайта**;
- не ломать архитектуру проекта случайными правками в неправильном месте.

## Что Такое Helper В Этом Проекте

В контексте `Aerocool` helper — это небольшой `partial` в папке `layouts/_partials`, который делает одну понятную работу:

- либо **возвращает значение**;
- либо **рендерит HTML-блок**;
- либо **рендерит SEO-мета-теги**;
- либо **рендерит schema.org JSON-LD**.

Проще говоря:

- `single.html` и `list.html` — это большие шаблоны страницы;
- `helpers` / `partials` — это маленькие переиспользуемые куски логики, которые эти шаблоны вызывают.

## Почему Это Вообще Хорошо

Без helpers код быстро превращается в копипасту:

- один и тот же `<title>` собирается в трех местах;
- один и тот же `description` пишется в разных шаблонах;
- один и тот же `Organization` JSON-LD дублируется вручную;
- header и footer становятся слишком длинными.

С helpers проект получает:

- меньше дублирования;
- понятную архитектуру;
- более безопасные изменения;
- более предсказуемый SEO-слой.

## Как Выглядит Вызов Helper

Обычно helper вызывается так:

```gohtml
{{ partial "page-title.html" . }}
```

Здесь:

- `partial` — функция Hugo;
- `"page-title.html"` — имя partial-файла;
- `.` — текущий контекст страницы.

Если helper возвращает строку, результат можно использовать внутри другого шаблона:

```gohtml
<title>{{ partial "page-title.html" . }}</title>
```

Если helper рендерит готовый HTML-блок, его просто вставляют как есть:

```gohtml
{{ partial "header.html" . }}
```

## Главная Идея Архитектуры

В проекте `Aerocool` helpers условно делятся на 4 группы:

1. `page-*` helpers — возвращают данные текущей страницы.
2. `layout helpers` — рендерят структурные части страницы.
3. `_seo/*` helpers — рендерят meta-теги.
4. `_schema/*` helpers — рендерят schema.org JSON-LD.

## Цепочка Рендера Простыми Словами

Вот как это работает сверху вниз:

1. `layouts/baseof.html` собирает каркас HTML-документа.
2. Внутри `<head>` вызывается `layouts/_partials/head.html`.
3. `head.html` уже вызывает helpers вроде:
   - `page-title.html`
   - `page-description.html`
   - `_seo/opengraph.html`
   - `_seo/twitter_cards.html`
   - `_seo/jsonld.html`
4. В теле страницы рендерятся:
   - `header.html`
   - основной контент
   - `footer.html`
5. В `jsonld.html` собирается `@graph` из schema helpers:
   - `website.html`
   - `webpage.html`
   - `product.html`
   - `article.html`
   - `news.html`
   - `faq.html`
   - `breadcrumbs.html`
   - и других

## Группа 1. Page Helpers

Это самые важные helper-файлы для понимания логики страницы.

### `page-title.html`

Файл: [page-title.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-title.html)

Что делает:

- собирает итоговый `<title>` страницы;
- учитывает пагинацию;
- для главной берет `title` из front matter;
- для обычной страницы собирает формат `Title | Site.Title`.

Когда идти сюда:

- если у страницы неправильный `<title>`;
- если нужно изменить общую формулу заголовка документа;
- если нужно изменить поведение `title` для home, pagination или detail pages.

### `page-description.html`

Файл: [page-description.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-description.html)

Что делает:

- выбирает лучшее описание страницы;
- в первую очередь берет `description`;
- если его нет, использует `summary`;
- если и этого нет, строит fallback-описание по типу страницы.

Когда идти сюда:

- если `<meta name="description">` пустой или слабый;
- если листинги или служебные страницы получают плохой description;
- если нужно улучшить fallback-логику.

### `page-h1.html`

Файл: [page-h1.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-h1.html)

Что делает:

- возвращает видимый `H1` страницы;
- работает по правилу:

```gohtml
.Params.h1 | default .Title
```

Это означает:

- если в front matter задан `h1`, берем его;
- если `h1` не задан, берем `title`.
- Для большинства страниц проекта это и есть основной источник видимого `H1`.
- Текущее исключение — главная страница: ее hero и видимый `H1` сейчас живут в [home-content-section.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/home-content-section.html) и [home-content-section-ru.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/home-content-section-ru.html).

Когда идти сюда:

- если нужно поменять общую стратегию `H1`;
- если нужно изменить правило fallback;
- если команда хочет по-другому разделять `title` и `h1`.

### `page-image.html`

Файл: [page-image.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-image.html)

Что делает:

- возвращает главную картинку страницы;
- сначала ищет `image` во front matter;
- если `image` указывает на файл внутри page bundle, берет bundle-ресурс;
- если это внешний URL, использует его;
- если изображения нет, выбирает дефолт по типу страницы.

Где используется:

- `og:image`
- `twitter:image`
- `primaryImageOfPage`
- `Product.image`
- другие schema-сущности

Когда идти сюда:

- если на странице неправильная социальная картинка;
- если OG/Twitter/schema берут не то изображение;
- если нужно изменить дефолтные fallback-картинки.

### `page-language.html`

Файл: [page-language.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-language.html)

Что делает:

- переводит внутренний язык Hugo в нормальный языковой код для SEO и schema;
- например:
  - `uk` -> `uk-UA`
  - `ru` -> `ru-UA`

Когда идти сюда:

- если `hreflang`, `inLanguage`, `og:locale` или schema language ведут себя неправильно.

### `page-website-id.html`

Файл: [page-website-id.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-website-id.html)

Что делает:

- собирает `@id` сущности `WebSite`;
- используется в schema-графе как точка связи между `WebSite`, `WebPage`, `Article`, `Product`, `FAQPage` и другими сущностями.

Когда идти сюда:

- если ломается связность schema-графа;
- если `@id` у `WebSite` должен измениться;
- если нужно проверить multilingual-логику для `WebSite`.

### `page-series-slugs.html`

Файл: [page-series-slugs.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-series-slugs.html)

Что делает:

- определяет, к каким сериям относится текущая страница:
  - `sky`
  - `wing`
  - `xtal`
- берет данные из:
  - `related_series`
  - `category`
  - `categories`
  - `tags`
  - `title`
  - `description`
  - `summary`
  - `slug`
  - `RelPermalink`

Зачем нужен:

- для более точной перелинковки;
- чтобы related-блоки не сканировали весь `.Plain` текст и не тянули шумные материалы.

Когда идти сюда:

- если “похожие материалы” подбираются не по той серии;
- если нужно улучшить связь между контентом и каталогом.

## Группа 2. Structural Helpers

Эти helpers рендерят большие части страницы.

### `head.html`

Файл: [head.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/head.html)

Что делает:

- собирает весь `<head>`;
- выводит:
  - `robots`
  - `<title>`
  - `description`
  - `canonical`
  - JSON-LD
  - Open Graph
  - Twitter Cards
  - favicon
  - CSS
  - hreflang
  - prefetch
  - verification-теги

Это один из самых важных partial-файлов во всем проекте.

Когда идти сюда:

- если проблема в `<head>`;
- если страница индексируется неправильно;
- если `canonical`, `robots`, `hreflang`, CSS или SEO meta работают не так.

### `header.html`

Файл: [header.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/header.html)

Что делает:

- рендерит шапку сайта;
- логотип;
- переключатель языков;
- desktop menu;
- mobile menu.

Когда идти сюда:

- если нужно менять навигацию;
- если ломается логотип;
- если меню работает не так на мобильных;
- если нужно изменить ARIA/alt/языковой switcher.

### `footer.html`

Файл: [footer.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/footer.html)

Что делает:

- рендерит footer;
- подключает footer-links;
- рендерит copyright;
- регистрирует клиентские скрипты;
- подключает scroll-to-top и другие client-side сценарии.

Когда идти сюда:

- если проблема внизу сайта;
- если нужно убрать или добавить глобальный клиентский скрипт;
- если нужно изменить поведение service worker, scroll-to-top или footer-разметки.

### `footer-links.html`

Файл: [footer-links.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/footer-links.html)

Что делает:

- выводит SEO/sitewide блок ссылок в footer;
- собирает основные разделы и ключевые серии.

Когда идти сюда:

- если нужно усилить sitewide-перелинковку;
- если нужно добавить или убрать важные ссылки из footer.

### `post-footer-navigation.html`

Файл: [post-footer-navigation.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/post-footer-navigation.html)

Что делает:

- строит блок “Что посмотреть дальше”;
- показывает:
  - ключевые разделы
  - похожие модели
  - полезные материалы

Это helper для внутренней перелинковки между:

- каталогом;
- сериями;
- товарами;
- статьями;
- новостями.

Когда идти сюда:

- если related links ведут не туда;
- если нужно усилить связь `article -> product`;
- если нужно изменить состав блока и правила подбора.

### `editorial-note.html`

Файл: [editorial-note.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/editorial-note.html)

Что делает:

- выводит видимый редакционный trust-блок на статьях и новостях;
- срабатывает для страниц, где `schema_types` содержит `article` или `news`;
- показывает редакционную ответственность Aerocool Украина;
- объясняет, что характеристики, цены, гарантия и наличие сверяются с карточками товаров и служебными страницами сайта;
- выводит дату последнего обновления из `.Lastmod`;
- локализуется по языку страницы.

Когда идти сюда:

- если нужно изменить формулировку редакционной ответственности;
- если появятся отдельные авторы, редакторы или reviewer-поля;
- если Article/NewsArticle schema начнет читать персональные author/reviewer-данные.

### `css.html`

Файл: [css.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/css.html)

Что делает:

- подключает Tailwind/CSS-слой, который должен собраться через Hugo pipeline;
- помогает Hugo увидеть классы и корректно собрать стили.

Когда идти сюда:

- если проблема в CSS pipeline;
- если новые классы не попадают в итоговую сборку;
- если нужно понять, как Hugo подключает CSS.

### `extend_footer.html`

Файл: [extend_footer.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/extend_footer.html)

Что делает:

- это точка расширения footer-слоя;
- обычно используется, когда нужно безопасно вставить дополнительную логику без переписывания основного footer.

### `script-theme.html`

Файл: [script-theme.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/script-theme.html)

Что делает:

- служебный partial под theme-script слой;
- по сути это точка расширения.

Если ты новичок и не понимаешь, нужен ли тебе этот файл:

- почти наверняка сейчас он тебе не нужен.

## Группа 3. SEO Helpers

Эти helpers не строят видимый UI, но отвечают за мета-слой.

### `_seo/opengraph.html`

Файл: [opengraph.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/opengraph.html)

Что делает:

- выводит `og:*` теги;
- использует:
  - `page-title`
  - `page-description`
  - `page-image`
  - URL страницы
  - тип страницы (`website`, `article`, `product`)

Когда идти сюда:

- если соцсети показывают неправильный заголовок;
- если `og:image` не совпадает с ожиданием;
- если нужно изменить `og:type`.

### `_seo/twitter_cards.html`

Файл: [twitter_cards.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/twitter_cards.html)

Что делает:

- рендерит `twitter:*` мета-теги;
- обычно использует те же базовые helpers, что и Open Graph.

Когда идти сюда:

- если Twitter/X показывает неправильную карточку страницы.

### `_seo/jsonld.html`

Файл: [jsonld.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/jsonld.html)

Что делает:

- собирает итоговый schema.org `@graph`;
- включает глобальные сущности:
  - `WebSite`
  - локальную `Organization`
  - глобальную `Organization`
  - `Brand`
- добавляет контентные сущности по типу страницы:
  - `Product`
  - `Article`
  - `NewsArticle`
  - `FAQPage`
  - `CollectionPage`
  - `WebPage`
  - `BreadcrumbList`

Это главный entrypoint для всего schema-слоя.

Когда идти сюда:

- если нужно понять, почему schema вообще есть на странице;
- если нужно изменить состав графа;
- если какой-то schema-partial должен перестать включаться.

## Группа 4. Schema Helpers

Это отдельные сущности внутри JSON-LD.

### `website.html`

Файл: [website.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/website.html)

Что делает:

- описывает сайт как `WebSite`;
- включает `SearchAction`;
- задает `@id`, `url`, `name`, `description`, `publisher`, `image`, `inLanguage`.

### `webpage.html`

Файл: [webpage.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/webpage.html)

Что делает:

- описывает конкретную страницу как `WebPage`;
- связывает ее с `WebSite`;
- подключает `mainEntity`, `breadcrumb`, `publisher`, `primaryImageOfPage`.

### `local-organization.html`

Файл: [local-organization.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/local-organization.html)

Что делает:

- описывает `Aerocool Ukraine` как локальную организацию/представительство.

### `global-organization.html`

Файл: [global-organization.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/global-organization.html)

Что делает:

- описывает глобальную компанию `Aerocool`.

### `brand.html`

Файл: [brand.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/brand.html)

Что делает:

- описывает глобальный бренд `Aerocool`.

### `product.html`

Файл: [product.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/product.html)

Что делает:

- строит `Product` schema;
- использует:
  - `price`
  - `sku`
  - `availability`
  - `shipping`
  - `return policy`
  - `warranty`
  - `aggregateRating`
  - `brand`

Когда идти сюда:

- если product schema неверная;
- если в rich results у товара странные данные;
- если цена, наличие или seller schema рендерятся не так.

### `article.html`

Файл: [article.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/article.html)

Что делает:

- строит `Article` schema для evergreen-материалов.

### `news.html`

Файл: [news.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/news.html)

Что делает:

- строит `NewsArticle` schema для новостей.

### `faq.html`

Файл: [faq.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/faq.html)

Что делает:

- рендерит `FAQPage` на основе `.Params.faq`.
- Для самой страницы `/faq/` видимый FAQ выводится через shortcode [layouts/_shortcodes/faq_list.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/faq_list.html), а layout [layouts/faq/single.html](/Users/stadnyk/MEGA/Aerocool/layouts/faq/single.html) задает место его вывода в контентном потоке.

### `collection.html`

Файл: [collection.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/collection.html)

Что делает:

- описывает списковые страницы как `CollectionPage`;
- добавляет `ItemList`.

### `breadcrumbs.html`

Файл: [breadcrumbs.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/breadcrumbs.html)

Что делает:

- строит `BreadcrumbList` для schema-графа.

## Как Быстро Понять, Куда Идти

Если проблема такая:

- неправильный `<title>` -> [page-title.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-title.html)
- плохой `description` -> [page-description.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-description.html)
- странный `H1` на большинстве страниц -> [page-h1.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-h1.html)
- странный `H1` или hero на главной -> [home-content-section.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/home-content-section.html), [home-content-section-ru.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/home-content-section-ru.html)
- проблема с видимым FAQ на `/faq/` -> [layouts/faq/single.html](/Users/stadnyk/MEGA/Aerocool/layouts/faq/single.html) и [faq_list.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/faq_list.html)
- нет редакционного trust-блока на статье или новости -> [editorial-note.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/editorial-note.html) и вызов в [single.html](/Users/stadnyk/MEGA/Aerocool/layouts/single.html)
- не та картинка в соцсетях -> [page-image.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-image.html), [opengraph.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/opengraph.html), [twitter_cards.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/twitter_cards.html)
- canonical / robots / hreflang -> [head.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/head.html)
- schema не та -> [jsonld.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/jsonld.html) и нужный файл в `_schema`
- шапка сайта -> [header.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/header.html)
- footer -> [footer.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/footer.html)
- “похожие материалы” -> [post-footer-navigation.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/post-footer-navigation.html)

## Что Лучше Не Делать Новичку

- не править тему `themes/PaperMod`, если это можно решить локальным override в `layouts/`
- не вставлять SEO-логику в `single.html`, если для нее уже есть helper
- не дублировать вычисление `title`, `description`, `image` в нескольких местах
- не добавлять вручную `# H1` в markdown-контент
- не создавать новый helper, если уже есть подходящий существующий

## Хороший Подход К Правкам

Если нужно что-то изменить:

1. Сначала понять, это **данные страницы**, **HTML-блок**, **meta-слой** или **schema**.
2. Найти helper нужной группы.
3. Изменить логику в одном месте.
4. Пересобрать сайт.
5. Проверить:
   - главную;
   - одну списковую страницу;
   - одну детальную страницу;
   - `uk` и `ru`.

## Короткая Формула Для Запоминания

- `page-*` -> данные страницы
- `head/header/footer` -> структура HTML
- `_seo/*` -> meta-теги
- `_schema/*` -> JSON-LD

Если ты не уверен, с какого файла начать, почти всегда сначала смотри:

1. [head.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/head.html)
2. [page-title.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-title.html)
3. [page-description.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-description.html)
4. [page-image.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-image.html)
5. [jsonld.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/jsonld.html)

Этого обычно достаточно, чтобы новичок уже начал уверенно ориентироваться в helper-слое проекта.
