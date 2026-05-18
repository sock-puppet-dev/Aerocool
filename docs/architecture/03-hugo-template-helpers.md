# Руководство по шаблонным helper-файлам Hugo

Обновлено: 2026-05-17.

## Зачем Нужен Этот Документ

Этот документ объясняет логику локальных `helpers` и `partials` проекта `Aerocool` так, чтобы в ней мог быстро разобраться новичок.

Базовая синхронизация документации с Hugo 0.161, Tailwind CSS 4, SEO/schema и CWV-практиками 2026 зафиксирована в [37-2026-05-13-documentation-2026-best-practices-sync-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md).

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
4. В теле страницы рендерятся:
   - `header.html`
   - основной контент
   - `footer.html`
5. В `footer.html` после основного контента вызывается `_seo/jsonld.html`, чтобы JSON-LD не задерживал первый экран.
6. В `jsonld.html` собирается `@graph` из schema helpers:
   - `website.html`
   - `webpage.html`
   - `about-page.html`
   - `contact-page.html`
   - `logo.html`
   - `page-image-object.html`
   - `product.html`
   - `article.html`
   - `news.html`
   - `faq.html`
   - `breadcrumbs.html`
   - и других

Верхнеуровневые шаблоны `layouts/search.html`, `layouts/rss.xml`, `layouts/sitemap.xml`, `layouts/sitemapindex.xml`, `layouts/404.html`, `layouts/alias.html`, `layouts/list.html` и `layouts/single.html` тоже считаются локальными overrides проекта. Папки `layouts/_default` в текущей структуре нет.

## Быстрая Карта Верхнеуровневых Layout-Файлов

Эта карта нужна новичку, чтобы не искать точку входа по всему проекту.

- [layouts/baseof.html](/Users/stadnyk/MEGA/Aerocool/layouts/baseof.html) — общий HTML-каркас.
- [layouts/single.html](/Users/stadnyk/MEGA/Aerocool/layouts/single.html) — обычная детальная страница.
- [layouts/list.html](/Users/stadnyk/MEGA/Aerocool/layouts/list.html) — списковые страницы и хабы.
- [layouts/search.html](/Users/stadnyk/MEGA/Aerocool/layouts/search.html) — страница поиска; должна оставаться `noindex,nofollow`.
- [layouts/404.html](/Users/stadnyk/MEGA/Aerocool/layouts/404.html) — кастомная 404; должна оставаться `noindex,nofollow`.
- [layouts/alias.html](/Users/stadnyk/MEGA/Aerocool/layouts/alias.html) — служебные alias-страницы; не использовать как SEO-посадочные.
- [layouts/rss.xml](/Users/stadnyk/MEGA/Aerocool/layouts/rss.xml) — RSS.
- [layouts/sitemap.xml](/Users/stadnyk/MEGA/Aerocool/layouts/sitemap.xml) — языковые sitemap-файлы.
- [layouts/sitemapindex.xml](/Users/stadnyk/MEGA/Aerocool/layouts/sitemapindex.xml) — корневой sitemap index.
- [layouts/faq/single.html](/Users/stadnyk/MEGA/Aerocool/layouts/faq/single.html) — детальная страница FAQ с видимым выводом вопросов.

## Быстрая Карта Shortcode-Файлов

- [layouts/_shortcodes/home-hero.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/home-hero.html) — hero главной страницы и ее H1.
- [layouts/_shortcodes/seo-image.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/seo-image.html) — контентные изображения с контролем LCP/lazy loading.
- [layouts/_shortcodes/faq-list.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/faq-list.html) — видимый список FAQ из front matter.
- [layouts/_shortcodes/contact.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/contact.html) — контактный блок.

## Группа 1. Helper-Файлы Данных Страницы

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
- Текущее исключение — главная страница: ее hero и видимый `H1` сейчас живут в едином [home-hero.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/home-hero.html), который сам переключает украинский/русский текст по языку страницы.

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

### `cover.html`

Файл: [cover.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/cover.html)

Что делает:

- переопределяет стандартный PaperMod cover partial локально;
- берет `cover.image` из front matter;
- корректно ищет изображения внутри page bundle;
- генерирует WebP-версии, `srcset`, `sizes`, `width` и `height`;
- помогает снижать CLS и контролировать LCP для главного изображения страницы.

Когда идти сюда:

- если preview-картинка в листинге или cover одиночной страницы рендерится неправильно;
- если нужно изменить стратегию responsive images для cover;
- если меняется стандарт `cover.image`, `cover.relative` или `cover.hiddenInSingle`.

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

## Группа 2. Структурные Helper-Файлы

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
- выводит JSON-LD через `_seo/jsonld.html` для обычных страниц;
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

### `translation-list.html`

Файл: [translation-list.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/translation-list.html)

Что делает:

- выводит список переводов текущей страницы;
- использует актуальные Hugo language fields `.Language.Name` и `.Language.Label`;
- вызывается из [layouts/single.html](/Users/stadnyk/MEGA/Aerocool/layouts/single.html), [layouts/faq/single.html](/Users/stadnyk/MEGA/Aerocool/layouts/faq/single.html) и [layouts/search.html](/Users/stadnyk/MEGA/Aerocool/layouts/search.html).

Важно:

- старое имя `translation_list.html` не использовать в локальных шаблонах;
- в теме PaperMod оно еще встречается, поэтому локальный `search.html` нужен как override.

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

- сейчас не добавляет видимый HTML и не содержит скриптов;
- оставлен как безопасная точка расширения footer-слоя;
- содержит комментарий, что поведение footer живет в `assets/js/site.js`.

Важно:

- не возвращать сюда inline scripts без отдельной причины;
- клиентское поведение сайта сейчас нужно менять в [assets/js/site.js](/Users/stadnyk/MEGA/Aerocool/assets/js/site.js).

### `script-theme.html`

Файл: [script-theme.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/script-theme.html)

Что делает:

- служебный partial под theme-script слой;
- по сути это точка расширения.

Если ты новичок и не понимаешь, нужен ли тебе этот файл:

- почти наверняка сейчас он тебе не нужен.

## Группа 3. SEO Helper-Файлы

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

### `_seo/lcp-image-preload.html`

Файл: [lcp-image-preload.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/lcp-image-preload.html)

Что делает:

- выводит ранний responsive preload для главного изображения первого экрана;
- работает только для типовых `article`, `news` и `product` страниц;
- использует `image` из front matter, если `cover.hiddenInSingle: true` и первое видимое `seo-image` использует тот же файл;
- генерирует WebP `imagesrcset`, `imagesizes`, `type="image/webp"` и `fetchpriority="high"`;
- берет `imagesizes` из `seo_image_sizes`, если поле задано во front matter, иначе использует проектный default для `.main`;
- дополняет shortcode `seo-image`, который в этом сценарии не дублирует body-level preload.

Когда идти сюда:

- если LCP-картинка не начинает грузиться из `<head>`;
- если нужно изменить общий `sizes` для первого контентного изображения;
- если у первого `seo-image` нестандартный `sizes` и нужно синхронизировать его с `seo_image_sizes`;
- если меняется стандарт `image + cover.hiddenInSingle + seo-image`.

### `_seo/jsonld.html`

Файл: [jsonld.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/jsonld.html)

Что делает:

- собирает итоговый schema.org `@graph`;
- включает сущности по `schema_types`:
  - `WebSite`
  - локальную `Organization`
  - глобальную `Organization`
  - `Brand`
- автоматически закрывает зависимости `logo` и `brand`, если выбранные сущности на них ссылаются;
- добавляет контентные сущности по типу страницы:
  - `Product`
  - `Article`
  - `NewsArticle`
  - `FAQPage`
  - `CollectionPage`
  - `WebPage`
  - `AboutPage`
  - `ContactPage`
  - `ImageObject`
  - `BreadcrumbList`

Это главный entrypoint для всего schema-слоя.
Для страниц с `layout: "search"` `footer.html` не вызывает `jsonld.html`, поэтому JSON-LD там не рендерится.
Для главной страницы `BreadcrumbList` не рендерится, потому что одноэлементные breadcrumbs на home не дают полезной структуры.
Техническая валидность графа не отменяет Google quality rules: значения, которые попадают в JSON-LD, должны соответствовать видимому контенту страницы.

Когда идти сюда:

- если нужно понять, почему schema вообще есть на странице;
- если нужно изменить состав графа;
- если какой-то schema-partial должен перестать включаться.

## Группа 4. Schema.org Helper-Файлы

Это отдельные сущности внутри JSON-LD.

### `website.html`

Файл: [website.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/website.html)

Что делает:

- описывает сайт как `WebSite`;
- включает `SearchAction`;
- задает `@id`, `url`, `name`, `description`, `image`, `inLanguage`;
- добавляет `publisher`, если в `schema_types` включена `organization`.

### `webpage.html`

Файл: [webpage.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/webpage.html)

Что делает:

- описывает конкретную страницу как `WebPage`;
- связывает ее с `WebSite`;
- подключает `mainEntity`, `breadcrumb`, `publisher`, `primaryImageOfPage`;
- не добавляет `breadcrumb` на главной странице.

### `about-page.html`

Файл: [about-page.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/about-page.html)

Что делает:

- описывает страницу `/about/` как `AboutPage`;
- связывает страницу с `Brand`, локальной `Organization`, `WebSite`, breadcrumbs и primary image;
- добавляет `lastReviewed` и ключевые `significantLink`.

### `contact-page.html`

Файл: [contact-page.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/contact-page.html)

Что делает:

- описывает страницу `/contact/` как `ContactPage`;
- связывает страницу с локальной `Organization`;
- добавляет `lastReviewed`, `significantLink` для `tel:` / `mailto:` и `relatedLink` на каталог и FAQ.

### `page-image-object.html`

Файл: [page-image-object.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/page-image-object.html)

Что делает:

- строит единый `ImageObject` для основного изображения страницы;
- использует `image` во front matter через `page-image.html`;
- дает стабильный `@id` вида `#primary-image`, на который ссылаются `WebPage`, `Product`, `Article` и `NewsArticle`.

### `logo.html`

Файл: [logo.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/logo.html)

Что делает:

- строит отдельный top-level `ImageObject` для логотипа;
- дает стабильный `@id` вида `#logo`;
- используется как `WebSite.image`, `Organization.logo` и `Organization.image`;
- подключается как зависимый top-level узел, если в графе есть `website` или `organization`.

### `local-organization.html`

Файл: [local-organization.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/local-organization.html)

Что делает:

- описывает `Aerocool Ukraine` как локальную организацию/представительство;
- связывает локальную сущность с глобальной компанией через `parentOrganization` и с глобальным брендом через `brand`;
- не содержит `sameAs` на глобальные соцсети, потому что эти профили едины для всех представительств и принадлежат глобальным сущностям.

### `global-organization.html`

Файл: [global-organization.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/global-organization.html)

Что делает:

- описывает глобальную компанию `Aerocool`;
- содержит официальные глобальные `sameAs` профили Aerocool.

### `brand.html`

Файл: [brand.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/brand.html)

Что делает:

- описывает глобальный бренд `Aerocool`;
- содержит официальные глобальные `sameAs` профили Aerocool.

### `product.html`

Файл: [product.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/product.html)

Что делает:

- строит `Product` schema;
- использует:
  - `price`
  - `sku`
  - `availability`
  - `priceValidUntil`
  - `shippingDetails`
  - `hasMerchantReturnPolicy`
  - `acceptedPaymentMethod`
  - `warranty`
  - `aggregateRating`
  - `brand`
- для product facts источником правды является front matter конкретной товарной страницы;
- merchant-условия из `shippingDetails`, `hasMerchantReturnPolicy` и `acceptedPaymentMethod` читаются из front matter и должны оставаться синхронизированными с видимым товарным текстом и `/faq/` как policy-зеркалом.

Когда идти сюда:

- если product schema неверная;
- если в rich results у товара странные данные;
- если front matter заполнен верно, но цена, наличие, доставка, возврат, payment methods или seller schema рендерятся не так.

### `entity-ref.html`

Файл: [entity-ref.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/entity-ref.html)

Что делает:

- безопасно резолвит один `entity_id` из [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml);
- возвращает JSON-LD reference вида `{"@id": "..."}`;
- по умолчанию выводит только сущности со статусом `confirmed`;
- игнорирует неизвестные, `planned`, `needs-review` и `do-not-markup` сущности, чтобы front matter не ломал сборку.

### `entity-node.html`

Файл: [entity-node.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/entity-node.html)

Что делает:

- строит полноценный JSON-LD узел сущности из [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml);
- используется для подтвержденных сущностей, которые нужно вывести как часть общего graph;
- не заменяет видимый контент страницы: сущность должна быть раскрыта на странице или в связанном контенте.

### `entity-node-list.html`

Файл: [entity-node-list.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/entity-node-list.html)

Что делает:

- собирает список JSON-LD узлов сущностей;
- удаляет дубли;
- помогает держать `about_entities`, `mentions_entities` и registry-based nodes управляемыми через один источник данных.

### `entity-ref-list.html`

Файл: [entity-ref-list.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/entity-ref-list.html)

Что делает:

- безопасно резолвит список `about_entities` или `mentions_entities`;
- удаляет повторяющиеся `entity_id`;
- используется в `webpage`, `about-page`, `contact-page`, `collection`, `article` и `news` schema partials. Для товарных страниц `about_entities` и `mentions_entities` попадают в `WebPage`, а `Product` остается основным товарным узлом с `brand`, `offers`, `seller` и staged `product_group_id`.

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

- рендерит `FAQPage` на основе `.Params.faq`, если в `schema_types` есть `faq`.
- Для самой страницы `/faq/` видимый FAQ выводится через shortcode [layouts/_shortcodes/faq-list.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/faq-list.html), а layout [layouts/faq/single.html](/Users/stadnyk/MEGA/Aerocool/layouts/faq/single.html) задает место его вывода в контентном потоке.

### `collection.html`

Файл: [collection.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/collection.html)

Что делает:

- описывает списковые страницы как `CollectionPage`;
- добавляет `ItemList`.

### `breadcrumbs.html`

Файл: [breadcrumbs.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/breadcrumbs.html)

Что делает:

- строит `BreadcrumbList` для schema-графа.
- не рендерится на главной странице, чтобы не создавать одноэлементную хлебную крошку.

## Как Быстро Понять, Куда Идти

Если проблема такая:

- неправильный `<title>` -> [page-title.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-title.html)
- плохой `description` -> [page-description.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-description.html)
- странный `H1` на большинстве страниц -> [page-h1.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-h1.html)
- странный `H1` или hero на главной -> [home-hero.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/home-hero.html)
- проблема с видимым FAQ на `/faq/` -> [layouts/faq/single.html](/Users/stadnyk/MEGA/Aerocool/layouts/faq/single.html) и [faq-list.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/faq-list.html)
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
