# Руководство По `schema_types`

В проекте `Aerocool` используется только поле `schema_types`.

`schema_types` — это список флагов в front matter, который говорит шаблонам, какие schema.org сущности нужно добавить в JSON-LD граф страницы.

Простыми словами:

```yaml
schema_types: ["website", "product", "organization", "breadcrumbs"]
```

означает: “эта страница относится к сайту, описывает товар, связана с организацией и должна иметь хлебные крошки”.

Не нужно придумывать новое поле `schema_type`: проект его не читает.

Важно:

- `schema_types` определяет, какие schema.org-сущности включает шаблонный слой.
- `website`, `organization`, `brand`, `collection`, `article`, `news`, `product`, `faq`, `breadcrumbs`, `about-page`, `contact-page` являются рабочими флагами.
- Опорные узлы вроде `logo` и `brand` могут подключаться автоматически как зависимости выбранных сущностей, чтобы в графе не было висячих `@id`-ссылок.
- `schema_types` не управляет индексацией страницы. Для служебных страниц вроде `search` это решается через `robotsNoIndex` и `layouts/_partials/head.html`.
- Для страниц с `layout: "search"` JSON-LD не рендерится, даже если в front matter есть `schema_types`.
- `404` и служебные alias-страницы не описываются через метаданные в `content/`; для них используются отдельные шаблонные файлы.
- Основное изображение страницы теперь описывается через единый `ImageObject` в общем `@graph`, а не через отдельный JSON-LD-скрипт из `seo-image`.
- `breadcrumbs` не используется на главной странице, потому что home не нуждается в одноэлементном `BreadcrumbList`.
- Чистый Schema Validator не равен гарантии rich results: для Google данные в JSON-LD должны совпадать с видимым контентом страницы.
- Для `product` source of truth по коммерческим фактам — front matter товарной страницы; schema partial читает эти поля, а видимый товарный блок и `/faq/` должны подтверждать их.
- Текущий roadmap усиления графа и rich-results качества хранится в [json-ld-graph-audit-roadmap-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/json-ld-graph-audit-roadmap-2026.md).
- QA-правила schema.org-графа, schema drift и ownership описаны в [schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/schema-markup-quality-checklist-2026.md).
- Entity strategy, `@id`, `sameAs`, `about` и `mentions` проектируются через [entities-knowledge-graph-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entities-knowledge-graph-playbook-2026.md) и [ai-search-entity-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/ai-search-entity-map-2026.md).
- Product/Offer/rating/variant/image policy для каталога описана в [ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/ecommerce-structured-data-playbook-2026.md).

Главная `content/_index.md`
`schema_types: ["website", "organization", "brand"]`

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
