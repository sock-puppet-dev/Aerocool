Имя файла обновлено под текущее поле front matter: в проекте `Aerocool` нужно использовать `schema_types`.

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

About `content/about/index.md`
`schema_types: ["organization", "brand", "breadcrumbs"]`

Contact `content/contact/index.md`
`schema_types: ["organization", "breadcrumbs"]`

Search `content/search.md`
`schema_types: ["organization", "breadcrumbs"]`
