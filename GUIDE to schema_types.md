# Руководство По `schema_types`

В проекте `Aerocool` используется только поле `schema_types`.

Важно:

- `schema_types` определяет, какую схему пытается собрать шаблонный слой.
- `schema_types` не управляет индексацией страницы. Для служебных страниц вроде `search` это решается через `robotsNoIndex` и `layouts/_partials/head.html`.
- `404` и служебные alias-страницы не описываются через метаданные в `content/`; для них используются отдельные шаблонные файлы.

Главная `content/_index.md`
`schema_types: ["website", "organization", "brand", "breadcrumbs"]`

Товар `content/products/<series>/<model>/index.md`
`schema_types: ["product", "organization", "breadcrumbs"]`

Серия и каталоги `content/products/_index.md`, `content/products/<series>/_index.md`
`schema_types: ["collection", "organization", "breadcrumbs"]`

Новости `content/news/<slug>/index.md`
`schema_types: ["news", "organization", "breadcrumbs"]`

Листинг новостей `content/news/_index.md`
`schema_types: ["collection", "organization", "breadcrumbs"]`

Статьи `content/articles/<slug>/index.md`
`schema_types: ["article", "organization", "breadcrumbs"]`

Листинг статей `content/articles/_index.md`
`schema_types: ["collection", "organization", "breadcrumbs"]`

FAQ `content/faq/index.md`
`schema_types: ["faq", "organization", "breadcrumbs"]`

Страница о бренде `content/about/index.md`
`schema_types: ["organization", "brand", "breadcrumbs"]`

Контакты `content/contact/index.md`
`schema_types: ["organization", "breadcrumbs"]`

Поиск `content/search.md`
`schema_types: ["organization", "breadcrumbs"]`
