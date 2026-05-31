# Реестр Сущностей Aerocool 2026

Обновлено: 2026-05-31.

Базовая синхронизация документации с лучшими практиками 2026 зафиксирована в [37-2026-05-13-documentation-2026-best-practices-sync-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md). PDF-аудит Schema App по connected graph, Content Knowledge Graphs, impact и Agentic Web зафиксирован в [44-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/44-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md). Актуальный полный audit registry и rendered graph зафиксирован в [55-2026-05-26-schema-entity-full-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/55-2026-05-26-schema-entity-full-audit.md). Реестр остается governance-документом: `confirmed` сущности можно использовать в JSON-LD, staged/planned сущности не должны становиться сильными связями без видимого подтверждения на странице.

Этот документ — канонический реестр сущностей проекта `Aerocool Ukraine`. Он нужен для управляемого Entity SEO, AI Search, `about_entities`, `mentions_entities`, `ProductGroup`, будущих `additionalProperty`, `llms.txt`, будущего `Callable Actions Registry` и структурированного [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml).

Если вы впервые работаете с entity-полями, сначала прочитайте [Entity Registry: гайд для новичка](/Users/stadnyk/MEGA/Aerocool/docs/seo/22-entity-registry-beginner-guide-2026.md).

Реестр не заменяет `schema_types`. Поле `schema_types` по-прежнему выбирает типы JSON-LD, а registry фиксирует стабильные сущности, `@id`, entity home, связи, владельца фактов и условия внедрения.

## Актуальный Audit Snapshot

На 2026-05-31 в registry зафиксировано `63` сущности: `51 confirmed`, `10 planned` и `2 do-not-markup`. Машинных ошибок registry не найдено: неизвестных ссылок из front matter нет, `about_entities` и `mentions_entities` используют только `confirmed` сущности, а `product_group_id` остался только у реальных цветовых вариантов WING/XTAL и пока указывает на `planned` ProductGroup, поэтому не выводит `isVariantOf` в JSON-LD.

Оценка Entity Registry: `9.5 / 10`.

Активация `2026-05-26`: `dual-backrest`, `replaceable-elements` и `long-sitting` переведены в `confirmed`, потому что для них уже есть сильный видимый контент, стабильные entity homes и точечное использование в front matter.

Главные открытые задачи registry-слоя:

- перевести ProductGroup из `planned` в `confirmed` только после видимой навигации вариантов;
- не создавать ProductGroup для одиночных товаров без соседних вариантов;
- не активировать planned feature/use case/material entities без видимого объяснения и entity home;
- завести регулярный Entity Performance Report;
- поддерживать review governance через approved reviews pipeline и не возвращать ручные rating-поля во front matter.

## 1. Как Использовать Этот Документ

- При создании новой страницы сначала определить главную сущность страницы в registry.
- При добавлении `about_entities` или `mentions_entities` использовать только `entity_id` из registry.
- Если сущности нет в registry, сначала добавить ее сюда, затем использовать в контенте или шаблонах.
- Если сущность имеет статус `planned`, ее можно использовать для планирования контента, но не стоит выводить как сильный JSON-LD relationship без видимого объяснения.
- Если сущность имеет статус `do-not-markup`, ее не размечать и не использовать как `sameAs`.

## 2. Основные Правила

- `entity_id` должен быть стабильным, коротким, lower-case и `kebab-case`.
- `entity_home` — собственный URL сайта, который лучше всего объясняет сущность человеку.
- `@id` — машинный стабильный идентификатор в JSON-LD graph.
- `sameAs` — только для точного совпадения сущности, не для “похожих” или “связанных” ссылок.
- Local organization `Aerocool Ukraine` не получает global social `sameAs`; она связана с global organization через `parentOrganization` и с global brand через `brand`.
- Внешние профили Aerocool остаются у `https://aerocool.io/#brand` и `https://aerocool.io/#organization`.
- Официальный реестр `sameAs` проверять раз в квартал: URL должен быть живым, стабильным и по-прежнему представлять ту же global Aerocool entity.
- `additionalType` не является заменой `sameAs`. Его можно рассматривать только для уточнения типа через внешний словарь, если внешний термин является более узким типом текущей сущности.
- Product facts canonical source — product front matter; владелец business values — команда Aerocool Украина.
- Не добавлять entity fields в `content/`, пока Hugo templates не умеют безопасно читать эти поля.
- Не создавать новые schema nodes, если человек не видит соответствующий факт на странице.
- Hugo генерирует отдельные registry-based JSON-LD nodes для `confirmed` сущностей классов `Material`, `Mechanism`, `Feature`, `UseCase`, `ContentTopic` и `Policy`, если они используются в `about_entities` или `mentions_entities`. Product, Organization, Brand, WebPage и Collection nodes не дублируются, потому что для них уже есть отдельные schema partials.
- Registry-based nodes должны оставаться объяснительными: они называют сущность, дают стабильный `@id`, `entity_home`, localized `name`, `alternateName`, `identifier` и связи `isRelatedTo`, но не заменяют Product/Offer/FAQ/Article schema.
- Agentic actions не добавлять в JSON-LD, пока нет реального business endpoint, owner, input validation, success/failure states и видимого процесса для пользователя.

## 3. Статусы Сущностей

| Статус | Значение | Можно Использовать В Планировании | Можно Использовать В JSON-LD Сейчас |
| --- | --- | --- | --- |
| `confirmed` | Сущность имеет entity home, факты подтверждены, связана с видимым контентом | Yes | Yes, если шаблон поддерживает |
| `planned` | Сущность важна, но нужен glossary block, visible specs, variant navigation или mapping | Yes | Not yet |
| `needs-review` | Сущность есть в контенте, но факты, `@id` или entity home нужно уточнить | Yes | No |
| `do-not-markup` | Сущность не стоит размечать отдельно на текущем этапе | No | No |

## 4. Справочник Полей

| Field | Meaning |
| --- | --- |
| `entity_id` | Stable internal ID used by future front matter and resolver |
| `name_uk` / `name_ru` / `name_en` | Localized labels for editors and future UI/schema helpers |
| `entity_class` | Brand, Organization, ProductSeries, ProductGroup, Product, ProductVariant, Material, Mechanism, UseCase, Policy, ContentHub |
| `schema_candidate` | Schema.org type to consider, not always active today |
| `current_jsonld_id` | Existing `@id` emitted by current Hugo templates |
| `future_jsonld_id` | Stable `@id` for registry-managed nodes that are not emitted by core Product/Organization/Page partials |
| `entity_home` | Best URL on `aerocool.ua` for the entity |
| `owner` | Who owns factual accuracy |
| `status` | Registry status |
| `sameAs` | External exact-identity links only |
| `parent` | Parent entity in the graph |
| `related` | Useful related entities for future `mentions` |

## 5. Правила Для ID

| Класс Сущности | Шаблон `entity_id` | Текущий / Будущий Шаблон `@id` |
| --- | --- | --- |
| Brand | `aerocool-brand` | `https://aerocool.io/#brand` |
| Local organization | `aerocool-ukraine` | `https://aerocool.ua/#organization` |
| Website | `aerocool-website` | `https://aerocool.ua/#website` |
| Collection | `<section>-collection` | `https://aerocool.ua/<section>/#collection` |
| Product series | `<series>-series` | `https://aerocool.ua/products/<series>/#collection` |
| Product group | `<series>-<model>-product-group` | `https://aerocool.ua/products/<series>/#<series>-<model>-product-group` |
| Product variant | `<series>-<variant>` | `https://aerocool.ua/products/<series>/<variant>/#product` |
| Material | `<name>-material` | Future glossary/entity node |
| Mechanism | `<name>-mechanism` | Future glossary/entity node |
| Use case | `<intent-name>` | Future glossary/entity node or content hub |
| Policy | `<policy>-policy` | `/faq/` now; future policy pages if split |

## 6. Базовые Сущности Бренда, Сайта И Организации

| entity_id | name_en | name_uk | name_ru | entity_class | schema_candidate | current_jsonld_id | entity_home | owner | status | Примечания |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `aerocool-brand` | Aerocool | Aerocool | Aerocool | Brand | `Brand` | `https://aerocool.io/#brand` | `/about/` | Global Aerocool + Aerocool Ukraine | `confirmed` | Global brand. Official global social profiles live here as `sameAs`. |
| `aerocool-global-organization` | Aerocool Advanced Technologies Corp. | Aerocool Advanced Technologies Corp. | Aerocool Advanced Technologies Corp. | Organization | `Organization` | `https://aerocool.io/#organization` | `https://aerocool.io/` | Global Aerocool | `confirmed` | Global parent organization. |
| `aerocool-ukraine` | Aerocool Ukraine | Aerocool Україна | Aerocool Украина | Organization | `Organization` | `https://aerocool.ua/#organization` | `/about/` + `/contact/` | Aerocool Ukraine | `confirmed` | Local facts confirmed `2026-05-07`; no local `sameAs` for global social profiles. |
| `aerocool-website` | Aerocool Ukraine website | Сайт Aerocool Україна | Сайт Aerocool Украина | WebSite | `WebSite` | `https://aerocool.ua/#website` | `/` | Aerocool Ukraine | `confirmed` | Site-level entity for search, publisher and page graph. |
| `aerocool-logo` | Aerocool logo | Логотип Aerocool | Логотип Aerocool | ImageObject | `ImageObject` | `https://aerocool.ua/#logo` | `/` | Aerocool Ukraine | `confirmed` | Shared visual identity node. |

## 7. Официальный Реестр `sameAs`

Only these global profiles are currently approved as exact identity links for global Aerocool entities.

| Целевая Сущность | sameAs URL | Статус | Примечания |
| --- | --- | --- | --- |
| `aerocool-brand`, `aerocool-global-organization` | `https://www.facebook.com/AeroCoolGlobal/` | `confirmed` | Global official profile. |
| `aerocool-brand`, `aerocool-global-organization` | `https://www.instagram.com/aerocool_global` | `confirmed` | Global official profile. |
| `aerocool-brand`, `aerocool-global-organization` | `https://x.com/AerocoolGlobal` | `confirmed` | Global official profile. |
| `aerocool-brand`, `aerocool-global-organization` | `https://www.linkedin.com/company/aerocool-advanced-technologies-corp./` | `confirmed` | Global official profile. |
| `aerocool-brand`, `aerocool-global-organization` | `https://www.youtube.com/@AeroCoolGlobal` | `confirmed` | Global official profile. |
| `aerocool-ukraine` | none | `confirmed` | Local entity uses `parentOrganization` and `brand`, not local `sameAs`. |

## 8. Сущности Страниц И Контентных Хабов

| entity_id | name_en | name_uk | name_ru | entity_class | schema_candidate | current_jsonld_id | entity_home | status | Suggested `about_entities` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `home-page` | Homepage | Головна | Главная | WebPage | `WebPage` | `https://aerocool.ua/#webpage` | `/` | `confirmed` | `aerocool-brand`, `aerocool-ukraine`, `aerocool-catalog` |
| `about-page` | About Aerocool Ukraine | Про Aerocool Україна | Об Aerocool Украина | AboutPage | `AboutPage` | `https://aerocool.ua/about/#webpage` | `/about/` | `confirmed` | `aerocool-brand`, `aerocool-ukraine`, `aerocool-global-organization` |
| `contact-page` | Contacts | Контакти | Контакты | ContactPage | `ContactPage` | `https://aerocool.ua/contact/#webpage` | `/contact/` | `confirmed` | `aerocool-ukraine` |
| `faq-page` | FAQ | FAQ | FAQ | FAQPage | `FAQPage` | `https://aerocool.ua/faq/#faq` | `/faq/` | `confirmed` | `delivery-policy`, `payment-policy`, `return-policy`, `warranty-policy` |
| `products-collection` | Aerocool chairs catalog | Каталог крісел Aerocool | Каталог кресел Aerocool | Collection | `CollectionPage` | `https://aerocool.ua/products/#collection` | `/products/` | `confirmed` | `aerocool-catalog`, `gaming-chair`, `office-chair`, `computer-chair` |
| `articles-collection` | Aerocool articles | Статті Aerocool | Статьи Aerocool | Collection | `CollectionPage` | `https://aerocool.ua/articles/#collection` | `/articles/` | `confirmed` | `chair-selection`, `ergonomic-chair`, `aerocool-catalog` |
| `news-collection` | Aerocool news | Новини Aerocool | Новости Aerocool | Collection | `CollectionPage` | `https://aerocool.ua/news/#collection` | `/news/` | `confirmed` | `aerocool-brand`, `aerocool-catalog` |

## 9. Сущности Товарных Серий

| entity_id | name_en | name_uk | name_ru | entity_class | current_schema | future_schema | current_jsonld_id | entity_home | status | Main Relations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `sky-series` | Aerocool SKY | Aerocool SKY | Aerocool SKY | ProductSeries | `CollectionPage` | Product list/series collection | `https://aerocool.ua/products/sky/#collection` | `/products/sky/` | `confirmed` | parent `aerocool-catalog`; products `sky-lite`, `sky-360`; mentions `mesh-material`, `sync4-mechanism`, `sync5-mechanism` |
| `wing-series` | Aerocool WING | Aerocool WING | Aerocool WING | ProductSeries | `CollectionPage` | Product list/series collection | `https://aerocool.ua/products/wing/#collection` | `/products/wing/` | `confirmed` | parent `aerocool-catalog`; products WING; ProductGroup только для цветовых вариантов моделей; mentions `racer-material`, `loft-air-material`, `mesh-material`, `11d-adjustment`, `dual-backrest` |
| `xtal-series` | Aerocool XTAL | Aerocool XTAL | Aerocool XTAL | ProductSeries | `CollectionPage` | Product list/series collection | `https://aerocool.ua/products/xtal/#collection` | `/products/xtal/` | `confirmed` | parent `aerocool-catalog`; products XTAL; ProductGroup только для цветовых вариантов моделей; mentions `racer-material`, `loft-air-material`, `mesh-material`, `7d-adjustment`, `replaceable-elements` |

## 10. Сущности `ProductGroup`, Запланированные Для Вариантов

`ProductGroup` should not render in JSON-LD until product pages show visible variant navigation. Одиночные товары не получают ProductGroup. The IDs below are stable planning IDs only for real multi-variant model groups.

| entity_id | name_en | future_jsonld_id | entity_home | varies_by | variants | status | Blocking Requirement |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `wing-racer-product-group` | Aerocool WING Racer | `https://aerocool.ua/products/wing/#wing-racer-product-group` | `/products/wing/` | color | `wing-racer-black`, `wing-racer-dark-grey` | `planned` | Verify visible color navigation and group facts before confirming. |
| `wing-loft-air-product-group` | Aerocool WING Loft Air | `https://aerocool.ua/products/wing/#wing-loft-air-product-group` | `/products/wing/` | color | `wing-loft-air-light-grey`, `wing-loft-air-dark-grey` | `planned` | Verify visible color navigation and group facts before confirming. |
| `xtal-racer-product-group` | Aerocool XTAL Racer | `https://aerocool.ua/products/xtal/#xtal-racer-product-group` | `/products/xtal/` | color | `xtal-racer-black`, `xtal-racer-dark-grey` | `planned` | Verify visible color navigation and group facts before confirming. |
| `xtal-loft-air-product-group` | Aerocool XTAL Loft Air | `https://aerocool.ua/products/xtal/#xtal-loft-air-product-group` | `/products/xtal/` | color | `xtal-loft-air-light-grey`, `xtal-loft-air-dark-grey` | `planned` | Verify visible color navigation and group facts before confirming. |

## 11. Сущности Товаров И Товарных Вариантов

| entity_id | entity_class | name_en | SKU | MPN | GTIN-13 | series | material | color | adjustability | mechanism | current_jsonld_id | entity_home | product_group |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `sky-360` | Product | Aerocool SKY 360 | `SKY-360-001` |  |  | `sky-series` | `mesh-material` | not-specified | `11d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/sky/360/#product` | `/products/sky/360/` |  |
| `sky-lite` | Product | Aerocool SKY Lite | `SKY-LITE-001` |  |  | `sky-series` | `mesh-material` | not-specified | `8d-adjustment` | `sync4-mechanism` | `https://aerocool.ua/products/sky/lite/#product` | `/products/sky/lite/` |  |
| `wing-loft-air-dark-grey` | ProductVariant | Aerocool WING Loft Air Dark Grey | `WING-LADG-001` | `TEGC-309700Z.Z1` | `4711530966501` | `wing-series` | `loft-air-material` | dark-grey | `11d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/wing/loft-air-dark-grey/#product` | `/products/wing/loft-air-dark-grey/` | `wing-loft-air-product-group` |
| `wing-loft-air-light-grey` | ProductVariant | Aerocool WING Loft Air Light Grey | `WING-LALG-001` | `TEGC-3097004.41` | `4711530966518` | `wing-series` | `loft-air-material` | light-grey | `11d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/wing/loft-air-light-grey/#product` | `/products/wing/loft-air-light-grey/` | `wing-loft-air-product-group` |
| `wing-mesh-black` | Product | Aerocool WING Mesh Black | `WING-MB-001` | `TEGC-3098001.11` | `4711530966525` | `wing-series` | `mesh-material` | black | `11d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/wing/mesh-black/#product` | `/products/wing/mesh-black/` |  |
| `wing-racer-black` | ProductVariant | Aerocool WING Racer Black | `WING-RB-001` | `TEGC-3096001.11` | `4711530966488` | `wing-series` | `racer-material` | black | `11d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/wing/racer-black/#product` | `/products/wing/racer-black/` | `wing-racer-product-group` |
| `wing-racer-dark-grey` | ProductVariant | Aerocool WING Racer Dark Grey | `WING-RDG-001` | `TEGC-309600Z.Z1` | `4711530966495` | `wing-series` | `racer-material` | dark-grey | `11d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/wing/racer-dark-grey/#product` | `/products/wing/racer-dark-grey/` | `wing-racer-product-group` |
| `xtal-loft-air-dark-grey` | ProductVariant | Aerocool XTAL Loft Air Dark Grey | `XTAL-LADG-001` | `TEGC-210010Z.Z1` | `4711530966792` | `xtal-series` | `loft-air-material` | dark-grey | `7d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/xtal/loft-air-dark-grey/#product` | `/products/xtal/loft-air-dark-grey/` | `xtal-loft-air-product-group` |
| `xtal-loft-air-light-grey` | ProductVariant | Aerocool XTAL Loft Air Light Grey | `XTAL-LALG-001` | `TEGC-2100104.41` | `4711530966808` | `xtal-series` | `loft-air-material` | light-grey | `7d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/xtal/loft-air-light-grey/#product` | `/products/xtal/loft-air-light-grey/` | `xtal-loft-air-product-group` |
| `xtal-mesh-black` | Product | Aerocool XTAL Mesh Black | `XTAL-MB-001` | `TEGC-2101101.11` | `4711530966815` | `xtal-series` | `mesh-material` | black | `7d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/xtal/mesh-black/#product` | `/products/xtal/mesh-black/` |  |
| `xtal-racer-black` | ProductVariant | Aerocool XTAL Racer Black | `XTAL-RB-001` | `TEGC-2099101.11` | `4711530966778` | `xtal-series` | `racer-material` | black | `7d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/xtal/racer-black/#product` | `/products/xtal/racer-black/` | `xtal-racer-product-group` |
| `xtal-racer-dark-grey` | ProductVariant | Aerocool XTAL Racer Dark Grey | `XTAL-RDG-001` | `TEGC-209910Z.Z1` | `4711530966785` | `xtal-series` | `racer-material` | dark-grey | `7d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/xtal/racer-dark-grey/#product` | `/products/xtal/racer-dark-grey/` | `xtal-racer-product-group` |

## 12. Сущности Материалов И Поверхностей

| entity_id | name_en | name_uk | name_ru | entity_class | schema_candidate | entity_home | status | Текущие Сильные Страницы | Примечания |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `racer-material` | Racer | Racer | Racer | Material | `DefinedTerm` or `Thing` | `/articles/racer-vs-loft-air-vs-mesh/` | `confirmed` | material comparison article; Racer product pages | Leatherette-like dense contact and easier care. |
| `loft-air-material` | Loft Air | Loft Air | Loft Air | Material | `DefinedTerm` or `Thing` | `/articles/racer-vs-loft-air-vs-mesh/` | `confirmed` | material comparison article; Loft Air product pages | Ventilated multilayer textile feel. |
| `mesh-material` | Mesh | Mesh / сітка | Mesh / сетка | Material | `DefinedTerm` or `Thing` | `/articles/racer-vs-loft-air-vs-mesh/` | `confirmed` | material comparison article; SKY and Mesh product pages | Maximum ventilation entity. |
| `leatherette-material` | Leatherette | екошкіра / Leatherette | экокожа / Leatherette | Material | `DefinedTerm` or `Thing` | `/articles/racer-vs-loft-air-vs-mesh/` | `planned` | Racer pages | Treat as material behind Racer, not as separate page topic yet. |
| `fabric-material` | Fabric | тканина | ткань | Material | `DefinedTerm` or `Thing` | `/articles/racer-vs-loft-air-vs-mesh/` | `planned` | Loft Air pages | Treat as generic material until glossary is stronger. |

## 13. Сущности Механизмов И Функций

| entity_id | name_en | name_uk | name_ru | entity_class | schema_candidate | entity_home | status | Сильные Страницы | Примечания |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `synchronous-tilt` | Synchronous Tilt | Synchronous Tilt | Synchronous Tilt | Mechanism | `DefinedTerm` or `Thing` | `/articles/what-is-synchronous-tilt/` | `confirmed` | sync tilt guide; product pages | Main tilt concept. |
| `sync4-mechanism` | SYNC4 | SYNC4 | SYNC4 | Mechanism | `DefinedTerm` or `Thing` | `/articles/sync4-sync5-mechanism-guide/` | `confirmed` | SYNC4/SYNC5 guide; SKY Lite | Use where product content visibly says SYNC4. |
| `sync5-mechanism` | SYNC5 | SYNC5 | SYNC5 | Mechanism | `DefinedTerm` or `Thing` | `/articles/sync4-sync5-mechanism-guide/` | `confirmed` | SYNC4/SYNC5 guide; SKY 360, WING, XTAL | Use where product content visibly says SYNC5. |
| `7d-adjustment` | 7D adjustment | 7D регулювання | 7D регулировка | Feature | `DefinedTerm` or `Thing` | `/articles/how-to-choose-chair-by-adjustability/` | `confirmed` | adjustability guide; XTAL pages | Candidate for `additionalProperty`. |
| `8d-adjustment` | 8D adjustment | 8D регулювання | 8D регулировка | Feature | `DefinedTerm` or `Thing` | `/articles/how-to-choose-chair-by-adjustability/` | `confirmed` | adjustability guide; SKY Lite | Candidate for `additionalProperty`. |
| `11d-adjustment` | 11D adjustment | 11D регулювання | 11D регулировка | Feature | `DefinedTerm` or `Thing` | `/articles/how-to-choose-chair-by-adjustability/` | `confirmed` | adjustability guide; SKY 360, WING | Candidate for `additionalProperty`. |
| `dual-backrest` | Dual backrest | подвійна спинка | двойная спинка | Feature | `DefinedTerm` or `Thing` | `/articles/what-is-dual-backrest/` | `confirmed` | WING pages; dedicated Dual backrest article | Activated `2026-05-26`; use only where WING dual backrest is visibly discussed. |
| `replaceable-elements` | Replaceable elements | змінні елементи | сменные элементы | Feature | `DefinedTerm` or `Thing` | `/articles/what-is-fully-replaceable-design/` | `confirmed` | XTAL pages; dedicated replaceable design article | Activated `2026-05-26`; use only where XTAL replaceable elements are visibly discussed. |
| `lumbar-support` | Lumbar support | поперекова підтримка | поясничная поддержка | Feature | `DefinedTerm` or `Thing` | product/series pages | `planned` | SKY pages | Add visible specs table first. |
| `armrests-4d-x-360` | 4D X 360 armrests | підлокітники 4D X 360 | подлокотники 4D X 360 | Feature | `DefinedTerm` or `Thing` | `/products/wing/` | `planned` | WING pages | Candidate for `additionalProperty`. |
| `armrests-3d-x-360` | 3D X 360 armrests | підлокітники 3D X 360 | подлокотники 3D X 360 | Feature | `DefinedTerm` or `Thing` | `/products/sky/` | `planned` | SKY 360 pages | Candidate for `additionalProperty`. |

## 14. Сущности Сценариев Использования И Поисковых Интентов

| entity_id | name_en | name_uk | name_ru | entity_class | schema_candidate | entity_home | status | Примечания |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `gaming-chair` | gaming chair | ігрове крісло | игровое кресло | UseCase / ProductCategory | `Thing` or `DefinedTerm` | `/products/` | `confirmed` | Broad commercial intent; strongly present in catalog and products. |
| `office-chair` | office chair | офісне крісло | офисное кресло | UseCase / ProductCategory | `Thing` or `DefinedTerm` | `/products/` | `confirmed` | Broad commercial intent; SKY, Loft Air, Mesh pages. |
| `computer-chair` | computer chair | комп'ютерне крісло | компьютерное кресло | UseCase / ProductCategory | `Thing` or `DefinedTerm` | `/products/` | `confirmed` | Broad commercial intent across catalog. |
| `ergonomic-chair` | ergonomic chair | ергономічне крісло | эргономичное кресло | UseCase / ProductCategory | `Thing` or `DefinedTerm` | `/products/` | `confirmed` | Parent concept for selection articles. |
| `home-office` | home office | home office | home office | UseCase | `Thing` or `DefinedTerm` | `/articles/how-to-choose-aerocool-chair/` | `confirmed` | Important for AI Search prompts and product copy. |
| `long-sitting` | long sitting | довгі сесії | долгие сессии | UseCase | `Thing` or `DefinedTerm` | `/articles/chair-for-posture-and-long-work/` | `confirmed` | Long work and long gaming session articles. Activated `2026-05-26`. |
| `hot-room` | hot room | жарке приміщення | жаркое помещение | UseCase | `Thing` or `DefinedTerm` | `/articles/racer-vs-loft-air-vs-mesh/` | `planned` | Connected to Mesh and Loft Air material decisions. |
| `chair-selection` | chair selection | вибір крісла | выбор кресла | ContentTopic | `Thing` or `DefinedTerm` | `/articles/how-to-choose-aerocool-chair/` | `confirmed` | Main editorial support topic. |

## 15. Сущности Сервисных Политик

The current entity home for service policies is `/faq/`. Do not create separate policy schema until visible policy pages or anchors are stable.

| entity_id | name_en | name_uk | name_ru | schema_candidate | entity_home | source_of_truth | owner | status | Примечания |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `delivery-policy` | Delivery | Доставка | Доставка | `OfferShippingDetails` / policy reference | `/faq/` | product front matter | Aerocool Ukraine | `confirmed` | FAQ mirrors product front matter. |
| `payment-policy` | Payment | Оплата | Оплата | payment policy reference | `/faq/` | product front matter | Aerocool Ukraine | `confirmed` | Uses `payment_methods`. |
| `return-policy` | Returns | Повернення | Возврат | `MerchantReturnPolicy` | `/faq/` | product front matter | Aerocool Ukraine | `confirmed` | Uses `return_days`, `return_method`, `return_fees`. |
| `warranty-policy` | Warranty | Гарантія | Гарантия | `WarrantyPromise` / policy reference | `/faq/` | product front matter | Aerocool Ukraine | `confirmed` | Uses `warranty`. |
| `price-validity-policy` | Price validity | Актуальність ціни | Актуальность цены | Offer validity reference | product front matter | product front matter | Aerocool Ukraine | `confirmed` | `priceValidUntil: 2027-12-31` подтверждено `2026-05-07`. |

## 16. Карта Сущностей Для Редакционного Контента

This section maps existing article pages to primary and secondary entities. It is the planning source for page-by-page `about_entities` and `mentions_entities`.

| Страница | Основные `about_entities` | Кандидаты `mentions_entities` | Статус |
| --- | --- | --- | --- |
| `/articles/how-to-choose-aerocool-chair/` | `chair-selection`, `aerocool-catalog` | `sky-series`, `wing-series`, `xtal-series`, `gaming-chair`, `office-chair`, `computer-chair`, `home-office`, `racer-material`, `loft-air-material`, `mesh-material` | `confirmed` |
| `/articles/how-to-choose-chair-by-adjustability/` | `7d-adjustment`, `8d-adjustment`, `11d-adjustment` | `sky-series`, `wing-series`, `xtal-series`, `sky-lite`, `sky-360`, `synchronous-tilt` | `confirmed` |
| `/articles/racer-vs-loft-air-vs-mesh/` | `racer-material`, `loft-air-material`, `mesh-material` | `leatherette-material`, `fabric-material`, `hot-room`, `gaming-chair`, `office-chair`, `home-office` | `confirmed` |
| `/articles/sky-lite-vs-sky-360/` | `sky-series` | `sky-lite`, `sky-360`, `8d-adjustment`, `11d-adjustment`, `sync4-mechanism`, `sync5-mechanism`, `home-office` | `confirmed` |
| `/articles/sync4-sync5-mechanism-guide/` | `sync4-mechanism`, `sync5-mechanism` | `synchronous-tilt`, `sky-lite`, `sky-360`, `wing-series`, `xtal-series` | `confirmed` |
| `/articles/what-is-synchronous-tilt/` | `synchronous-tilt` | `sync4-mechanism`, `sync5-mechanism`, `office-chair`, `home-office`, `long-sitting` | `confirmed` |
| `/articles/wing-vs-xtal/` | `wing-series`, `xtal-series` | `11d-adjustment`, `7d-adjustment`, `dual-backrest`, `replaceable-elements`, `racer-material`, `loft-air-material`, `mesh-material`, `gaming-chair`, `computer-chair`, `home-office` | `confirmed` |
| `/articles/what-is-dual-backrest/` | `dual-backrest`, `wing-series` | `long-sitting`, `gaming-chair`, `office-chair`, `home-office`, `sync5-mechanism`, `11d-adjustment`, WING products and variants | `confirmed` |
| `/articles/what-is-fully-replaceable-design/` | `replaceable-elements`, `xtal-series` | `long-sitting`, `gaming-chair`, `office-chair`, `home-office`, `sync5-mechanism`, `7d-adjustment`, XTAL products and variants | `confirmed` |
| `/articles/chair-for-posture-and-long-work/` | `chair-selection`, `long-sitting`, `ergonomic-chair`, `office-chair` | `dual-backrest`, `replaceable-elements`, `sky-series`, `wing-series`, `xtal-series`, mechanisms, materials | `confirmed` |
| `/articles/gaming-chair-long-sessions/` | `gaming-chair`, `long-sitting`, `chair-selection` | `dual-backrest`, `replaceable-elements`, `wing-series`, `xtal-series`, `sky-series`, materials | `confirmed` |

## 17. Карта Сущностей Для Новостей

| Страница | Основные `about_entities` | Кандидаты `mentions_entities` | Статус |
| --- | --- | --- | --- |
| `/news/sky-series-launch/` | `sky-series` | `sky-lite`, `sky-360`, `office-chair`, `computer-chair`, `home-office` | `confirmed` |
| `/news/wing-series-launch/` | `wing-series` | `wing-racer-product-group`, `wing-loft-air-product-group`, `wing-mesh-black`, `11d-adjustment`, `dual-backrest` | `confirmed` |
| `/news/xtal-series-launch/` | `xtal-series` | `xtal-racer-product-group`, `xtal-loft-air-product-group`, `xtal-mesh-black`, `7d-adjustment`, `replaceable-elements` | `confirmed` |
| `/news/sky-360-launch/` | `sky-360` | `sky-series`, `11d-adjustment`, `sync5-mechanism`, `synchronous-tilt`, `home-office` | `confirmed` |
| `/news/sky-lite-launch/` | `sky-lite` | `sky-series`, `8d-adjustment`, `sync4-mechanism`, `synchronous-tilt`, `office-chair` | `confirmed` |
| `/news/loft-air-and-mesh-focus/` | `loft-air-material`, `mesh-material` | `wing-loft-air-product-group`, `xtal-loft-air-product-group`, `wing-mesh-black`, `xtal-mesh-black`, `hot-room` | `confirmed` |
| `/news/sync4-sync5-mechanism-update/` | `sync4-mechanism`, `sync5-mechanism` | `synchronous-tilt`, `sky-series`, `wing-series`, `xtal-series` | `confirmed` |

## 18. Тройки Связей Между Сущностями

Use these as the semantic backbone for future JSON-LD relationships.

| Subject | Predicate | Object | Evidence |
| --- | --- | --- | --- |
| `aerocool-ukraine` | `brand` | `aerocool-brand` | local organization schema |
| `aerocool-ukraine` | `parentOrganization` | `aerocool-global-organization` | local organization schema |
| `aerocool-catalog` | `hasPart` | `sky-series`, `wing-series`, `xtal-series` | `/products/` |
| `sky-series` | `hasProduct` | `sky-lite`, `sky-360` | `/products/sky/` |
| `wing-series` | `hasProduct` | WING products and variants | `/products/wing/` |
| `xtal-series` | `hasProduct` | XTAL products and variants | `/products/xtal/` |
| `wing-racer-product-group` | `hasVariant` | `wing-racer-black`, `wing-racer-dark-grey` | visible variant navigation |
| `wing-loft-air-product-group` | `hasVariant` | `wing-loft-air-light-grey`, `wing-loft-air-dark-grey` | visible variant navigation |
| `xtal-racer-product-group` | `hasVariant` | `xtal-racer-black`, `xtal-racer-dark-grey` | visible variant navigation |
| `xtal-loft-air-product-group` | `hasVariant` | `xtal-loft-air-light-grey`, `xtal-loft-air-dark-grey` | visible variant navigation |
| `racer-material` | `isMaterialOf` | Racer product variants | product pages |
| `loft-air-material` | `isMaterialOf` | Loft Air product variants | product pages |
| `mesh-material` | `isMaterialOf` | SKY and Mesh products | product pages |
| `sync4-mechanism` | `usedIn` | `sky-lite` | product page |
| `sync5-mechanism` | `usedIn` | `sky-360`, WING products/variants, XTAL products/variants | product pages |
| `delivery-policy` | `appliesTo` | Product offers | product front matter and `/faq/` |
| `return-policy` | `appliesTo` | Product offers | product front matter and `/faq/` |
| `warranty-policy` | `appliesTo` | Product offers | product front matter and `/faq/` |

## 19. Связь С Front Matter Страницы

Template support exists for `about_entities`, `mentions_entities` and `product_group_id`. On `2026-05-07`, these fields were filled on priority pages: home, about, contact, FAQ, product/article/news hubs, series pages, current articles, current news and product pages. On `2026-05-31`, singleton ProductGroup entries were removed: `product_group_id` remains only for real multi-variant model groups.

Future additions must still be page-by-page after checking this registry and the visible page content.

Product example:

```yaml
about_entities:
  - wing-racer-black
  - wing-series
  - gaming-chair
mentions_entities:
  - racer-material
  - 11d-adjustment
  - sync5-mechanism
  - synchronous-tilt
  - delivery-policy
  - warranty-policy
product_group_id: "wing-racer-product-group"
variant_attributes:
  material: "racer-material"
  color: "black"
```

Article example:

```yaml
about_entities:
  - racer-material
  - loft-air-material
  - mesh-material
mentions_entities:
  - home-office
  - office-chair
  - gaming-chair
```

Rules:

- `about_entities` should contain the main subject of the page.
- `mentions_entities` should contain visibly discussed related products, series, materials, mechanisms, use cases and policies.
- `product_group_id` must point to a real multi-variant entity in section 10 and will render only after that entity is moved from `planned` to `confirmed`.
- `variant_attributes` should only contain visible attributes.
- Unknown `entity_id` values should fail QA before production.
- Entity values should be stable IDs, not display labels.

## 20. Структура `data/entities.yaml`

The structured resolver source now lives in [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml). Its shape follows this pattern:

```yaml
wing-racer-black:
  name:
    en: "Aerocool WING Racer Black"
    uk: "Aerocool WING Racer Black"
    ru: "Aerocool WING Racer Black"
  entity_class: "ProductVariant"
  schema_candidate: "Product"
  current_jsonld_id: "https://aerocool.ua/products/wing/racer-black/#product"
  entity_home: "/products/wing/racer-black/"
  parent: "wing-racer-product-group"
  related:
    - "wing-series"
    - "racer-material"
    - "11d-adjustment"
    - "sync5-mechanism"
  status: "confirmed"
```

Resolver requirements:

- return localized display name;
- return `@id`;
- fail or warn on unknown ID;
- filter `planned`, `needs-review` and `do-not-markup` entities from JSON-LD by default;
- support `about`, `mentions`, `isVariantOf` and `inProductGroupWithID`;
- generate registry-based nodes for confirmed dictionary/policy entities used in `about_entities` and `mentions_entities`;
- keep `additionalProperty` for a later pass after visible specification tables exist.

## 21. Будущий `Callable Actions Registry`

`How Marketers Can Prepare Their Organization for the Agentic Web` добавляет будущий слой: AI agents должны понимать не только сущности, но и допустимые действия. Для Aerocool это P3-документация, а не текущий JSON-LD/API-вывод.

Action нельзя создавать как “идею”. Он должен соответствовать реальному бизнес-процессу.

| Action ID | Человеческое Действие | Возможная Сущность/Endpoint | Минимальные Входные Данные | Владелец | Статус | Блокер |
| --- | --- | --- | --- | --- | --- | --- |
| `compare-chairs` | Сравнить кресла | product/series comparison page | series/model IDs, язык, сценарий | Aerocool Ukraine + content owner | `planned` | Нужны стабильные comparison rules и visible comparison pages |
| `check-availability` | Проверить наличие | product front matter или будущий inventory endpoint | product ID, регион при необходимости | Aerocool Ukraine | `planned` | Нужен операционный процесс обновления наличия |
| `request-consultation` | Запросить консультацию | contact form | имя, контакт, интересующий товар/сценарий, язык | Aerocool Ukraine | `planned` | Нужен подтвержденный процесс обработки заявок |
| `submit-contact-form` | Отправить форму контакта | contact form | имя, email/phone, сообщение, consent где нужно | Aerocool Ukraine | `planned` | Нужны validation, anti-spam и success/failure states |
| `buy-product` | Купить товар | checkout или официальный purchase endpoint | product ID, цена, доставка, оплата, контакт | Aerocool Ukraine | `do-not-markup` | Нет подтвержденного checkout/purchase endpoint |
| `schedule-consultation` | Записаться на консультацию | календарь/слоты | тема, контакт, дата/время, язык | Aerocool Ukraine | `do-not-markup` | Нет подтвержденного расписания и владельца слотов |

Правила для будущих actions:

- action должен опираться на `confirmed` entities и актуальные product facts;
- action должен иметь понятный source of truth;
- action должен иметь владельца в команде;
- action должен иметь обязательные поля, validation rules и состояния ошибки;
- action нельзя публиковать, если пользователь не может выполнить его на сайте или через официальный процесс;
- `BuyAction` и `ScheduleAction` запрещены до появления реального checkout или расписания.

До production-стабилизации этот раздел использовать только как roadmap.

## 22. Правила Проверки Качества

- Every `about_entities` value must exist in this registry.
- Every `mentions_entities` value must exist in this registry.
- No page should mention a product group that is not visibly linked or explained.
- No standalone product should use `product_group_id`; use the series relationship instead.
- Do not render `ProductGroup` until variant navigation is visible.
- Do not render `additionalProperty` until product specs are visible in a table or comparable block.
- Do not render `Review` or reviewer entities until rating source is resolved.
- Do not add `OnlineStore` while the site remains a catalog without confirmed checkout flow.
- Do not add `sameAs` to marketplaces, random reviews or non-official pages.
- If an entity changes entity home, update internal links, registry, future front matter and schema tests together.

## 23. Что Пока Не Размечать

| Кандидат | Статус | Причина |
| --- | --- | --- |
| `OnlineStore` | `do-not-markup` | Requires confirmed merchant/checkout scenario. |
| `Review` | `do-not-markup` | Rating source and individual review evidence are not confirmed. |
| Author/reviewer people | `do-not-markup` | No real editorial person model yet. |
| Marketplace pages as `sameAs` | `do-not-markup` | Not exact identity. |
| Random product reviews as `sameAs` | `do-not-markup` | Not exact identity. |
| MCP/NLWeb/chatbot entities | `do-not-markup` | P3 only after production and stable knowledge graph. |
| `BuyAction` / `ScheduleAction` | `do-not-markup` | Requires real checkout, official purchase endpoint or scheduling workflow. |

## 24. План Внедрения

1. Keep this markdown file as the canonical registry during the first implementation pass.
2. Add visible variant navigation for product groups with multiple variants.
3. Add visible product specification tables.
4. Выполнено `2026-05-07`: add structured [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml).
5. Выполнено `2026-05-07`: implement safe entity resolver partials.
6. Выполнено `2026-05-07`: render optional `about` and `mentions` from resolver when front matter fields are present.
7. Выполнено `2026-05-07`: add [22-entity-registry-beginner-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/22-entity-registry-beginner-guide-2026.md).
8. Выполнено `2026-05-07`: fill `about_entities`, `mentions_entities` and staged `product_group_id` on priority pages.
9. Выполнено `2026-05-31`: remove singleton ProductGroup entries and keep `product_group_id` only for real WING/XTAL color variant groups.
10. Render `ProductGroup` only after visible variant navigation exists and group entities become `confirmed`.
11. Render `additionalProperty` only after visible specs tables exist.
12. Use this registry as input for `llms.txt` after production stabilization.
13. Keep `Callable Actions Registry` as P3 documentation until real business endpoints and owners exist.
