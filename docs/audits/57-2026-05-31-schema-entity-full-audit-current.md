# Полный Schema/Entity Аудит Проекта На 2026-05-31

Дата аудита: 2026-05-31.

Контекст: это текущий полный срез schema/entity-слоя проекта `Aerocool Ukraine` после обновления Entity Registry, активации `ProductGroup` для реальных WING/XTAL цветовых вариантов, добавления `Product.color` / `Product.additionalProperty` и повторной сборки Hugo 0.162.0. Аудит проверяет rendered JSON-LD, [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml), front matter `content/**/*.md`, Product graph, `about_entities`, `mentions_entities`, `product_group_id`, `sameAs`, reviews pipeline, breadcrumbs и текущий список проблем.

Базовые документы:

- [19-schema-types-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/19-schema-types-reference.md);
- [20-schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/20-schema-markup-quality-checklist-2026.md);
- [21-ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/21-ecommerce-structured-data-playbook-2026.md);
- [22-entity-registry-beginner-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/22-entity-registry-beginner-guide-2026.md);
- [23-entity-registry-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/23-entity-registry-2026.md);
- [24-entities-knowledge-graph-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/24-entities-knowledge-graph-playbook-2026.md);
- [25-ai-search-entity-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/25-ai-search-entity-map-2026.md);
- [26-json-ld-graph-audit-roadmap-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/26-json-ld-graph-audit-roadmap-2026.md);
- [53-keyword-database-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/53-keyword-database-2026.md).

## 1. Главный Вывод

Schema/entity-система проекта сейчас сильная и технически чистая. JSON-LD парсится без ошибок, внутренних битых graph URL нет, служебные страницы `search` и `contact/success` не получают JSON-LD, `about_entities` и `mentions_entities` используют только `confirmed` сущности, локальная `Aerocool Ukraine` не получает global social `sameAs`, а `ProductGroup` включен только для реальных цветовых вариантов WING/XTAL.

Общая оценка: `9.4 / 10`.

Оценка не `10 / 10` по четырем причинам:

1. сайт все еще собирается в `development`, поэтому все `112` JSON-LD страниц получают `noindex,nofollow`;
2. `SKY 360` и `SKY Lite` не имеют подтвержденных `mpn` и `gtin13`;
3. нет регулярного Entity Performance Report, который связывает registry, страницы, GSC, AI Search и бизнес-сигналы;
4. image license metadata и post-production AI Search baseline еще не внедрены.

Закрыто в текущем обновлении:

- `products-collection` удален как дублирующий registry ID; каноническая сущность каталога теперь `aerocool-catalog`;
- `wing-racer-product-group`, `wing-loft-air-product-group`, `xtal-racer-product-group`, `xtal-loft-air-product-group` переведены в `confirmed` и выводятся в JSON-LD;
- `lumbar-support`, `armrests-4d-x-360`, `armrests-3d-x-360`, `hot-room`, `leatherette-material`, `fabric-material` переведены в `confirmed` и подключены к релевантным страницам через `mentions_entities`.
- `Product.color` выводится для всех `24` Product nodes из registry;
- `Product.additionalProperty` выводится для всех `24` Product nodes из видимой вкладки `characteristics`.

Review/rating governance не является открытым P0/P1: legacy `rating.value` и `rating.count` удалены из product front matter, все товарные страницы имеют `review_target_id` и `reviews_enabled`, а `Product.aggregateRating` выводится только из approved reviews snapshot. В локальной сборке Netlify Database недоступна, поэтому [data/generated/reviews.json](/Users/stadnyk/MEGA/Aerocool/data/generated/reviews.json) пустой и `AggregateRating` не выводится. Это корректно.

## 2. Метод Проверки

Проверено:

- `npm run build`;
- rendered HTML в `public/**/*.html`;
- все JSON-LD scripts `application/ld+json`;
- внутренние `@id` и `url` внутри graph;
- отсутствие JSON-LD на служебных URL;
- [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml);
- front matter в `content/**/*.md`;
- product facts, reviews fields, `product_group_id`, `about_entities`, `mentions_entities`;
- schema partials в [layouts/_partials/_schema](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema);
- product variant swatches.

Команда проверки:

```bash
npm run build
```

## 3. Rendered JSON-LD Snapshot

| Метрика | Значение |
| --- | ---: |
| HTML files | `134` |
| Pages with JSON-LD | `112` |
| JSON-LD scripts | `112` |
| JSON parse errors | `0` |
| JSON-LD top-level nodes | `2008` |
| Duplicate node `@id` внутри одной страницы | `0` |
| Empty `@id` | `0` |
| Internal Aerocool graph URL refs | `11100` |
| Broken internal Aerocool graph URL refs | `0` |
| JSON-LD на `contact/success` | `0` |
| JSON-LD на `search` | `0` |
| BreadcrumbList nodes | `98` |
| Breadcrumb position issues | `0` |
| Visible breadcrumb pages | `100` |
| JSON-LD pages with `noindex` | `112` |

Вывод: rendered graph технически чистый. Главный blocker перед SEO-запуском не JSON-LD, а production/indexability gate.

## 4. Типы Узлов В Rendered Graph

| Type | Count |
| --- | ---: |
| `AboutPage` | `2` |
| `Article` | `32` |
| `Brand` | `112` |
| `BreadcrumbList` | `98` |
| `CollectionPage` | `18` |
| `ContactPage` | `2` |
| `DefinedTerm` | `902` |
| `FAQPage` | `2` |
| `ImageObject` | `224` |
| `NewsArticle` | `18` |
| `Organization` | `224` |
| `Product` | `24` |
| `ProductGroup` | `16` |
| `Thing` | `114` |
| `WebPage` | `108` |
| `WebSite` | `112` |

Вывод: проект работает как связанный Content Knowledge Graph. После активации полезных сущностей и ProductGroup вырос слой `DefinedTerm`, а для вариантов WING/XTAL появился отдельный `ProductGroup`.

## 5. Entity Registry Snapshot

| Метрика | Значение |
| --- | ---: |
| Total entities | `62` |
| Markupable entities | `60` |
| `confirmed` | `60` |
| `planned` | `0` |
| `do-not-markup` | `2` |
| Unknown front matter entity refs | `0` |
| Non-confirmed refs in `about_entities` / `mentions_entities` | `0` |
| `about_entities` refs | `296` |
| `mentions_entities` refs | `1010` |
| `product_group_id` refs | `16` |
| `product_group_id` status | `16 confirmed` |
| Confirmed entities with zero usage/rendered refs | `0` |
| Duplicate registry `@id` targets | `0` |

Классы сущностей:

| Class | Count |
| --- | ---: |
| `ProductVariant` | `8` |
| `Feature` | `8` |
| `UseCase` | `7` |
| `Material` | `5` |
| `Policy` | `5` |
| `Product` | `4` |
| `ProductGroup` | `4` |
| `Collection` | `3` |
| `ProductSeries` | `3` |
| `Mechanism` | `3` |
| Остальные классы | `12` |

Оценка Entity Registry: `9.7 / 10`.

Минус к оценке остается только за governance-процесс: registry технически чистый, но его нужно поддерживать при каждом изменении front matter, ассортимента, коммерческих условий и контентных хабов.

## 6. Полный Аудит Всех Сущностей

Колонки:

- `about` — сколько раз сущность используется как главный предмет страницы;
- `mentions` — сколько раз сущность используется как связанная сущность;
- `group` — сколько раз сущность указана как `product_group_id`;
- `@id refs` — сколько раз точный `current_jsonld_id` или `future_jsonld_id` встречается как `@id`-ссылка в rendered JSON-LD;
- `node defs` — сколько раз точный `@id` встречается как собственная node definition;
- `Аудит` — результат проверки статуса, ID, entity home и front matter-ссылок.

| entity_id | status | class | schema | about | mentions | group | @id refs | node defs | Аудит |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| `11d-adjustment` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 42 | 0 | 142 | 44 | OK |
| `7d-adjustment` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 30 | 0 | 92 | 32 | OK |
| `8d-adjustment` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 22 | 0 | 70 | 24 | OK |
| `about-page` | `confirmed` | `AboutPage` | `AboutPage` | 0 | 0 | 0 | 2 | 1 | OK |
| `aerocool-brand` | `confirmed` | `Brand` | `Brand` | 6 | 34 | 0 | 330 | 112 | OK |
| `aerocool-catalog` | `confirmed` | `Collection` | `CollectionPage` | 8 | 26 | 0 | 116 | 1 | OK, canonical catalog ID |
| `aerocool-global-organization` | `confirmed` | `Organization` | `Organization` | 2 | 0 | 0 | 226 | 112 | OK |
| `aerocool-logo` | `confirmed` | `ImageObject` | `ImageObject` | 0 | 0 | 0 | 448 | 112 | OK |
| `aerocool-ukraine` | `confirmed` | `Organization` | `Organization` | 6 | 2 | 0 | 504 | 112 | OK |
| `aerocool-website` | `confirmed` | `WebSite` | `WebSite` | 0 | 0 | 0 | 147 | 56 | OK |
| `armrests-3d-x-360` | `confirmed` | `Feature` | `DefinedTerm` | 0 | 4 | 0 | 10 | 4 | OK, newly activated |
| `armrests-4d-x-360` | `confirmed` | `Feature` | `DefinedTerm` | 0 | 12 | 0 | 26 | 12 | OK, newly activated |
| `articles-collection` | `confirmed` | `Collection` | `CollectionPage` | 6 | 0 | 0 | 26 | 3 | OK |
| `chair-selection` | `confirmed` | `ContentTopic` | `DefinedTerm` | 20 | 2 | 0 | 98 | 26 | OK |
| `computer-chair` | `confirmed` | `UseCase` | `DefinedTerm` | 36 | 42 | 0 | 294 | 94 | OK |
| `contact-page` | `confirmed` | `ContactPage` | `ContactPage` | 0 | 0 | 0 | 2 | 1 | OK |
| `delivery-policy` | `confirmed` | `Policy` | `OfferShippingDetails` | 2 | 26 | 0 | 56 | 28 | OK |
| `dual-backrest` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 4 | 0 | 26 | 6 | OK |
| `ergonomic-chair` | `confirmed` | `UseCase` | `DefinedTerm` | 4 | 16 | 0 | 124 | 20 | OK |
| `fabric-material` | `confirmed` | `Material` | `DefinedTerm` | 0 | 10 | 0 | 72 | 10 | OK, newly activated |
| `faq-page` | `confirmed` | `FAQPage` | `FAQPage` | 2 | 0 | 0 | 4 | 1 | OK |
| `gaming-chair` | `confirmed` | `UseCase` | `DefinedTerm` | 14 | 38 | 0 | 224 | 68 | OK |
| `home-office` | `confirmed` | `UseCase` | `DefinedTerm` | 28 | 52 | 0 | 336 | 96 | OK |
| `home-page` | `confirmed` | `WebPage` | `WebPage` | 0 | 0 | 0 | 7 | 7 | OK |
| `hot-room` | `confirmed` | `UseCase` | `DefinedTerm` | 0 | 6 | 0 | 116 | 6 | OK, newly activated |
| `leatherette-material` | `confirmed` | `Material` | `DefinedTerm` | 0 | 10 | 0 | 70 | 10 | OK, newly activated |
| `loft-air-material` | `confirmed` | `Material` | `DefinedTerm` | 4 | 42 | 0 | 246 | 50 | OK |
| `long-sitting` | `confirmed` | `UseCase` | `DefinedTerm` | 4 | 4 | 0 | 132 | 8 | OK |
| `lumbar-support` | `confirmed` | `Feature` | `DefinedTerm` | 0 | 30 | 0 | 66 | 30 | OK, newly activated |
| `mesh-material` | `confirmed` | `Material` | `DefinedTerm` | 4 | 44 | 0 | 242 | 52 | OK |
| `news-collection` | `confirmed` | `Collection` | `CollectionPage` | 2 | 0 | 0 | 12 | 2 | OK |
| `office-chair` | `confirmed` | `UseCase` | `DefinedTerm` | 30 | 44 | 0 | 378 | 90 | OK |
| `online-store` | `do-not-markup` | `BusinessModel` | `OnlineStore` | 0 | 0 | 0 | 0 | 0 | OK, do not mark up |
| `payment-policy` | `confirmed` | `Policy` | `Thing` | 2 | 26 | 0 | 56 | 28 | OK |
| `price-validity-policy` | `confirmed` | `Policy` | `Thing` | 2 | 0 | 0 | 4 | 2 | OK |
| `racer-material` | `confirmed` | `Material` | `DefinedTerm` | 2 | 42 | 0 | 212 | 48 | OK |
| `replaceable-elements` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 4 | 0 | 26 | 6 | OK |
| `return-policy` | `confirmed` | `Policy` | `MerchantReturnPolicy` | 2 | 26 | 0 | 56 | 28 | OK |
| `review-layer` | `do-not-markup` | `Review` | `Review` | 0 | 0 | 0 | 0 | 0 | OK, handled through approved review snapshots |
| `sky-360` | `confirmed` | `Product` | `Product` | 6 | 14 | 0 | 144 | 1 | P1: missing MPN/GTIN |
| `sky-lite` | `confirmed` | `Product` | `Product` | 6 | 14 | 0 | 100 | 1 | P1: missing MPN/GTIN |
| `sky-series` | `confirmed` | `ProductSeries` | `CollectionPage` | 12 | 40 | 0 | 304 | 1 | OK |
| `sync4-mechanism` | `confirmed` | `Mechanism` | `DefinedTerm` | 4 | 28 | 0 | 178 | 36 | OK |
| `sync5-mechanism` | `confirmed` | `Mechanism` | `DefinedTerm` | 4 | 48 | 0 | 240 | 56 | OK |
| `synchronous-tilt` | `confirmed` | `Mechanism` | `DefinedTerm` | 6 | 64 | 0 | 288 | 74 | OK |
| `warranty-policy` | `confirmed` | `Policy` | `WarrantyPromise` | 2 | 26 | 0 | 56 | 28 | OK |
| `wing-loft-air-dark-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 8 | 0 | 24 | 1 | OK |
| `wing-loft-air-light-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 6 | 0 | 20 | 1 | OK |
| `wing-loft-air-product-group` | `confirmed` | `ProductGroup` | `ProductGroup` | 0 | 0 | 4 | 8 | 4 | OK, active ProductGroup |
| `wing-mesh-black` | `confirmed` | `Product` | `Product` | 2 | 8 | 0 | 20 | 1 | OK |
| `wing-racer-black` | `confirmed` | `ProductVariant` | `Product` | 2 | 6 | 0 | 20 | 1 | OK |
| `wing-racer-dark-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 4 | 0 | 16 | 1 | OK |
| `wing-racer-product-group` | `confirmed` | `ProductGroup` | `ProductGroup` | 0 | 0 | 4 | 8 | 4 | OK, active ProductGroup |
| `wing-series` | `confirmed` | `ProductSeries` | `CollectionPage` | 20 | 36 | 0 | 410 | 1 | OK |
| `xtal-loft-air-dark-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 8 | 0 | 24 | 1 | OK |
| `xtal-loft-air-light-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 6 | 0 | 20 | 1 | OK |
| `xtal-loft-air-product-group` | `confirmed` | `ProductGroup` | `ProductGroup` | 0 | 0 | 4 | 8 | 4 | OK, active ProductGroup |
| `xtal-mesh-black` | `confirmed` | `Product` | `Product` | 2 | 8 | 0 | 20 | 1 | OK |
| `xtal-racer-black` | `confirmed` | `ProductVariant` | `Product` | 2 | 4 | 0 | 16 | 1 | OK |
| `xtal-racer-dark-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 6 | 0 | 20 | 1 | OK |
| `xtal-racer-product-group` | `confirmed` | `ProductGroup` | `ProductGroup` | 0 | 0 | 4 | 8 | 4 | OK, active ProductGroup |
| `xtal-series` | `confirmed` | `ProductSeries` | `CollectionPage` | 20 | 36 | 0 | 386 | 1 | OK |

## 7. Что Сейчас `planned`

Сейчас в [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml) нет сущностей со статусом `planned`.

Это не значит, что новые сущности больше нельзя добавлять. Это значит, что текущий registry очищен: все сущности, которые используются в `about_entities`, `mentions_entities` и `product_group_id`, либо `confirmed`, либо сознательно `do-not-markup`.

Правило остается прежним: новая сущность сначала появляется как `planned`, если для нее еще нет видимого подтверждения, entity home, владельца фактов или шаблонной поддержки.

## 8. Front Matter И Entity Fields

| Метрика | Значение |
| --- | ---: |
| Content markdown files | `98` |
| `schema_types` refs | `98` |
| Product front matter pages | `24` |
| Products with `review_target_id` | `24` |
| Products with `reviews_enabled` | `24` |
| Products missing `priceValidUntil` | `0` |
| Products with legacy `rating` front matter | `0` |
| Products missing MPN | `4` files |
| Products missing GTIN | `4` files |

Файлы без `mpn` и `gtin13`:

- [content/products/sky/360/index.md](/Users/stadnyk/MEGA/Aerocool/content/products/sky/360/index.md);
- [content/products/sky/360/index.ru.md](/Users/stadnyk/MEGA/Aerocool/content/products/sky/360/index.ru.md);
- [content/products/sky/lite/index.md](/Users/stadnyk/MEGA/Aerocool/content/products/sky/lite/index.md);
- [content/products/sky/lite/index.ru.md](/Users/stadnyk/MEGA/Aerocool/content/products/sky/lite/index.ru.md).

Вывод: front matter дисциплинирован. Source of truth для product facts остается product front matter, владелец бизнес-значений — команда Aerocool Украина.

## 9. Connected Schema, `sameAs` И Local Organization

| Метрика | Значение |
| --- | ---: |
| `WebPage` nodes | `108` |
| `WebPage.mainEntity` | `94` |
| `WebPage.about` | `108` |
| `WebPage.mentions` | `108` |
| Global Brand/Organization nodes with `sameAs` | `224` |
| Global `sameAs` refs | `1120` |
| Local Organization nodes | `112` |
| Local Organization nodes with `sameAs` | `0` |
| Local Organization nodes with `parentOrganization` | `112` |

Вывод: `sameAs` используется корректно. Глобальные официальные соцсети Aerocool принадлежат global Brand/Organization. Локальная Aerocool Ukraine связана с ними через `parentOrganization` и `brand`, а не через локальный `sameAs`.

## 10. Product Graph

| Метрика | Значение |
| --- | ---: |
| Product nodes | `24` |
| Product front matter pages | `24` |
| Product nodes without `Offer` | `0` |
| `priceValidUntil` | `2027-12-31` на всех `24` Product nodes |
| Availability | `https://schema.org/InStock` на всех `24` Product nodes |
| Product nodes with `aggregateRating` | `0` в локальной сборке без approved reviews snapshot |
| Product nodes with `review` | `0` |
| Product nodes without `mpn` | `4` rendered pages |
| Product nodes without `gtin13` | `4` rendered pages |
| Product nodes with `color` | `24` |
| Rendered `ProductGroup` nodes | `16` |
| Rendered `isVariantOf` | `16` |
| Rendered `inProductGroupWithID` | `16` |
| Product nodes with `additionalProperty` | `24` |

Product/Offer слой сильный: цена, валюта, наличие, SKU, seller, доставка, возврат, оплата, гарантия и `priceValidUntil` собираются из front matter. ProductGroup activation закрыт для реальных WING/XTAL вариантов. `color` берется из registry, а `additionalProperty` строится из видимой вкладки характеристик. Открытый product gap: SKY identifiers.

## 11. Ratings И Reviews

Состояние на 2026-05-31:

- `review_target_id` есть у всех `24` товарных front matter файлов;
- `reviews_enabled: true` есть у всех `24` товарных front matter файлов;
- legacy `rating.value` и `rating.count` отсутствуют;
- `Product.aggregateRating` выводится только при наличии approved отзывов в generated snapshot;
- локальный build без Netlify Database создает пустой snapshot, поэтому `AggregateRating` в локальном rendered graph не появляется.

Практический вывод: review governance закрыт архитектурно, но остается операционный процесс: модерация, rebuild после approval, контроль visible reviews и rich-results reports на published URL.

## 12. ProductGroup И Варианты

| Метрика | Значение |
| --- | ---: |
| `ProductGroup` entities | `4 confirmed` |
| `product_group_id` refs | `16` |
| Rendered pages with variant swatches | `16` |
| Singleton ProductGroup refs | `0` |
| Rendered `ProductGroup` nodes | `16` |
| Rendered `isVariantOf` | `16` |
| Rendered `inProductGroupWithID` | `16` |

Активные группы:

- WING Racer: black / dark grey;
- WING Loft Air: light grey / dark grey;
- XTAL Racer: black / dark grey;
- XTAL Loft Air: light grey / dark grey.

Одиночные товары `SKY 360`, `SKY Lite`, `WING Mesh Black` и `XTAL Mesh Black` не получают `product_group_id`; они остаются самостоятельными Product внутри своей серии.

## 13. Breadcrumbs И `linkTitle`

| Метрика | Значение |
| --- | ---: |
| BreadcrumbList nodes | `98` |
| Breadcrumb issues | `0` |
| Visible breadcrumb pages | `100` |
| Duplicate breadcrumb positions | `0` |

Видимые breadcrumbs и schema.org `BreadcrumbList` используют общий helper [breadcrumb-label.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/breadcrumb-label.html). Это снижает риск schema drift между UI и JSON-LD.

## 14. ImageObject И Image License Metadata

| Метрика | Значение |
| --- | ---: |
| `ImageObject` nodes | `224` |
| Image license nodes | `0` |

Базовый image schema layer работает. `license`, `acquireLicensePage`, `creator`, `creditText` и `copyrightNotice` не добавлены. Это правильно, пока нет подтвержденной license page и юридически корректных прав на product/brand images.

## 15. Keyword Database И Entity Coverage

Keyword database содержит `255` строк. Target URL issues после split по `|` не найдены.

Сильные entity-кластеры:

- `computer-chair`: `36` about, `42` mentions;
- `office-chair`: `30` about, `44` mentions;
- `home-office`: `28` about, `52` mentions;
- `synchronous-tilt`: `6` about, `64` mentions;
- `sync5-mechanism`: `4` about, `48` mentions;
- `mesh-material`: `4` about, `44` mentions;
- `loft-air-material`: `4` about, `42` mentions;
- `racer-material`: `2` about, `42` mentions.

Новое усиление:

- `lumbar-support`: `30` mentions;
- `armrests-4d-x-360`: `12` mentions;
- `armrests-3d-x-360`: `4` mentions;
- `leatherette-material`: `10` mentions;
- `fabric-material`: `10` mentions;
- `hot-room`: `6` mentions.

Вывод: проект хорошо покрывает широкие коммерческие интенты, материалы, механизмы, функции и реальные варианты. Следующий уровень — измерять, какие сущности дают impressions, clicks, AI citations и конверсии.

## 16. Актуальные Проблемы

### P0. Production Gate: `development/noindex`

Все `112` страниц с JSON-LD сейчас получают `noindex,nofollow`, потому что Netlify/Hugo намеренно настроены на `development`. Перед SEO-запуском нужно переключить production и проверить `index,follow`, canonical, hreflang, sitemap, robots, headers, 404 и rich results eligibility на published URL.

### P1. SKY Identifiers

`SKY 360` и `SKY Lite` не имеют `mpn` и `gtin13` в обеих языковых версиях. Нужно подтвердить, что официальных MPN/GTIN нет, либо добавить их во front matter.

### P1. Entity Performance Report

Нужен регулярный отчет по сущностям:

- entity ID;
- entity home;
- pages where entity is `about`;
- pages where entity is `mentions`;
- rendered node count;
- GSC impressions/clicks/query match;
- AI Search visibility/citations;
- бизнес-сигнал: заявка, переход, консультация, покупка, если появится.

### P2. Product Facts Maintenance Process

Source of truth и owner уже подтверждены: product front matter и команда Aerocool Украина. Но нужен регулярный операционный процесс: кто меняет цену, наличие, гарантию, доставку, возврат, оплату и `priceValidUntil`; кто проверяет `/faq/`; кто запускает build и post-deploy QA. Это governance-риск, а не ошибка JSON-LD.

### P2. Image License Metadata

Не внедрять до подтверждения прав и license page. После подтверждения можно добавить `license` и `acquireLicensePage` в `ImageObject`.

### P2. Post-Production AI Search Baseline

После production нужна baseline-проверка AI Search: бренд, локальная организация, серии, модели, материалы, механизмы, политики доставки/возврата/гарантии, запросы сравнения и выбора кресла.

### P3. Agentic Actions / MCP / NLWeb / `llms.txt`

Не внедрять сейчас. Вернуться после production, entity reporting и появления реальных бизнес-процессов/API.

## 17. Рекомендуемая Очередь Работ

1. Закрыть production gate и проверить published URL.
2. Подтвердить MPN/GTIN для `SKY 360` и `SKY Lite`.
3. Завести Entity Performance Report.
4. Описать операционный процесс поддержки product front matter.
5. После production собрать GSC, Product rich results, AI citations и entity-level baseline.
6. Вернуться к image license metadata только после юридического подтверждения.
7. Вернуться к agentic actions только после появления реальных action endpoints и владельцев процесса.

## 18. Оценка По Областям

| Область | Оценка | Комментарий |
| --- | ---: | --- |
| Техническая валидность JSON-LD | `9.8 / 10` | Parse errors, duplicate node IDs внутри страниц, empty IDs и broken refs не найдены |
| Entity Registry | `9.7 / 10` | Реестр стабилен: `60 confirmed`, `0 planned`, duplicate `@id` нет |
| Connected Schema | `9.4 / 10` | `about`, `mentions`, policy nodes, stable IDs, `sameAs`, `parentOrganization` работают корректно |
| ProductGroup / Variant Graph | `9.4 / 10` | 4 реальные группы активированы; singleton-групп нет |
| Breadcrumbs / `BreadcrumbList` | `9.4 / 10` | Общий helper, position issues нет |
| Product structured data | `9.4 / 10` | Offer facts, ProductGroup, `color` и `additionalProperty` сильные; открыт SKY identifiers |
| Reviews / ratings governance | `9.2 / 10` | Архитектура правильная; нужен production moderation/rebuild/reporting process |
| AI Search readiness | `8.8 / 10` | Entity foundation сильная; нужен post-production baseline |
| Documentation governance | `9.6 / 10` | Документация актуальна; source of truth для schema/entity audit — этот документ |
| Agentic Web readiness | `7.5 / 10` | Правильно удержано в P3 до появления реальных бизнес-процессов |

Общая оценка: `9.4 / 10`.

Главный вывод: больше не нужно решать `ProductGroup`, duplicate registry ID, planned-activation или базовый `additionalProperty`. Эти задачи закрыты. Следующие реальные задачи: production/indexability gate, SKY identifiers, Entity Performance Report и операционный процесс поддержки product front matter.
