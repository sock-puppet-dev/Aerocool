# Руководство По `schema_types`

В проекте `Aerocool` используется только поле `schema_types`.

Важно:

- `schema_types` определяет, какие schema.org-сущности включает шаблонный слой.
- `website`, `organization`, `brand`, `collection`, `article`, `news`, `product`, `faq`, `breadcrumbs`, `about-page`, `contact-page` являются рабочими флагами.
- `schema_types` не управляет индексацией страницы. Для служебных страниц вроде `search` это решается через `robotsNoIndex` и `layouts/_partials/head.html`.
- Для страниц с `layout: "search"` JSON-LD не рендерится, даже если в front matter есть `schema_types`.
- `404` и служебные alias-страницы не описываются через метаданные в `content/`; для них используются отдельные шаблонные файлы.
- Основное изображение страницы теперь описывается через единый `ImageObject` в общем `@graph`, а не через отдельный JSON-LD-скрипт из `seo-image`.

Главная `content/_index.md`
`schema_types: ["website", "organization", "brand", "breadcrumbs"]`

Товар `content/products/<series>/<model>/index.md`
`schema_types: ["website", "product", "organization", "breadcrumbs"]`

Серия и каталоги `content/products/_index.md`, `content/products/<series>/_index.md`
`schema_types: ["website", "collection", "organization", "breadcrumbs"]`

Новости `content/news/<slug>/index.md`
`schema_types: ["website", "news", "organization", "breadcrumbs"]`

Листинг новостей `content/news/_index.md`
`schema_types: ["website", "collection", "organization", "breadcrumbs"]`

Статьи `content/articles/<slug>/index.md`
`schema_types: ["website", "article", "organization", "breadcrumbs"]`

Листинг статей `content/articles/_index.md`
`schema_types: ["website", "collection", "organization", "breadcrumbs"]`

FAQ `content/faq/index.md`
`schema_types: ["website", "faq", "organization", "breadcrumbs"]`

Страница о бренде `content/about/index.md`
`schema_types: ["website", "organization", "brand", "about-page", "breadcrumbs"]`

Контакты `content/contact/index.md`
`schema_types: ["website", "organization", "contact-page", "breadcrumbs"]`

Поиск `content/search.md`
`schema_types: ["website", "organization", "breadcrumbs"]`
