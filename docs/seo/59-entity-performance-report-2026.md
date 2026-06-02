# Отчет По Эффективности Сущностей (Entity Performance Report) 2026

Обновлено: 2026-06-02.

Этот отчет связывает Entity Registry, front matter и rendered JSON-LD. Его задача — показать, какие сущности реально используются как главные темы страниц, какие упоминаются как связанные сущности и сколько раз их стабильные `@id` встречаются в готовом JSON-LD графе.

Команда генерации:

```bash
npm run build
npm run entity:report
```

CSV-версия отчета: [59-entity-performance-report-2026.csv](/Users/stadnyk/MEGA/Aerocool/docs/seo/59-entity-performance-report-2026.csv). Ручные GSC/AI/business-метрики добавлять не в generated CSV, а в [59-entity-performance-overrides.csv](/Users/stadnyk/MEGA/Aerocool/docs/seo/59-entity-performance-overrides.csv), чтобы следующий запуск не потерял данные.

## 1. Статус Данных

| Источник | Статус |
| --- | --- |
| Entity Registry | заполнено из [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml) |
| Front matter `about_entities` | заполнено из `content/**/*.md` |
| Front matter `mentions_entities` | заполнено из `content/**/*.md` |
| Front matter `product_group_id` | заполнено из `content/**/*.md` |
| Rendered JSON-LD refs | заполнено из `public/**/*.html` после `npm run build` |
| GSC impressions/clicks/CTR | из `docs/seo/59-entity-performance-overrides.csv`, сейчас `pending-production` |
| AI citations | из `docs/seo/59-entity-performance-overrides.csv`, сейчас `pending-production` |
| Business signal | из `docs/seo/59-entity-performance-overrides.csv`, сейчас `pending-production` |

## 2. Сводка Данных

| Метрика | Значение |
| --- | ---: |
| Сущности в Registry | `63` |
| Confirmed-сущности | `61` |
| Planned-сущности | `0` |
| Do-not-markup-сущности | `2` |
| Разобранные content-страницы | `100` |
| Разобранные JSON-LD scripts | `96` |
| Ошибки парсинга JSON-LD | `0` |
| Сущности с about usage | `46` |
| Сущности с mentions usage | `48` |
| Сущности с rendered `@id` refs | `61` |

Ошибки парсинга JSON-LD не найдены.

## 3. Топ Сущностей По About-Страницам

| Сущность | Количество | Entity Home |
| --- | ---: | --- |
| computer-chair | 36 | [/products/](https://aerocool.ua/products/) |
| office-chair | 30 | [/products/](https://aerocool.ua/products/) |
| home-office | 28 | [/articles/how-to-choose-aerocool-chair/](https://aerocool.ua/articles/how-to-choose-aerocool-chair/) |
| chair-selection | 20 | [/articles/how-to-choose-aerocool-chair/](https://aerocool.ua/articles/how-to-choose-aerocool-chair/) |
| wing-series | 20 | [/products/wing/](https://aerocool.ua/products/wing/) |
| xtal-series | 20 | [/products/xtal/](https://aerocool.ua/products/xtal/) |
| gaming-chair | 14 | [/products/](https://aerocool.ua/products/) |
| sky-series | 12 | [/products/sky/](https://aerocool.ua/products/sky/) |
| aerocool-brand | 8 | [/about/](https://aerocool.ua/about/) |
| aerocool-catalog | 8 | [/products/](https://aerocool.ua/products/) |
| aerocool-ukraine | 8 | [/about/](https://aerocool.ua/about/) |
| articles-collection | 6 | [/articles/](https://aerocool.ua/articles/) |

## 4. Топ Сущностей По Mentions-Страницам

| Сущность | Количество | Entity Home |
| --- | ---: | --- |
| synchronous-tilt | 64 | [/articles/what-is-synchronous-tilt/](https://aerocool.ua/articles/what-is-synchronous-tilt/) |
| home-office | 52 | [/articles/how-to-choose-aerocool-chair/](https://aerocool.ua/articles/how-to-choose-aerocool-chair/) |
| sync5-mechanism | 48 | [/articles/sync4-sync5-mechanism-guide/](https://aerocool.ua/articles/sync4-sync5-mechanism-guide/) |
| mesh-material | 44 | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) |
| office-chair | 44 | [/products/](https://aerocool.ua/products/) |
| 11d-adjustment | 42 | [/articles/how-to-choose-chair-by-adjustability/](https://aerocool.ua/articles/how-to-choose-chair-by-adjustability/) |
| computer-chair | 42 | [/products/](https://aerocool.ua/products/) |
| loft-air-material | 42 | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) |
| racer-material | 42 | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) |
| sky-series | 40 | [/products/sky/](https://aerocool.ua/products/sky/) |
| gaming-chair | 38 | [/products/](https://aerocool.ua/products/) |
| wing-series | 36 | [/products/wing/](https://aerocool.ua/products/wing/) |

## 5. Топ Сущностей По Rendered `@id` Refs

| Сущность | Количество | Entity Home |
| --- | ---: | --- |
| aerocool-ukraine | 440 | [/about/](https://aerocool.ua/about/) |
| aerocool-global-organization | 388 | [https://aerocool.io/](https://aerocool.io/) |
| aerocool-logo | 384 | [/](https://aerocool.ua/) |
| aerocool-brand | 284 | [/about/](https://aerocool.ua/about/) |
| home-office | 212 | [/articles/how-to-choose-aerocool-chair/](https://aerocool.ua/articles/how-to-choose-aerocool-chair/) |
| computer-chair | 206 | [/products/](https://aerocool.ua/products/) |
| office-chair | 194 | [/products/](https://aerocool.ua/products/) |
| synchronous-tilt | 184 | [/articles/what-is-synchronous-tilt/](https://aerocool.ua/articles/what-is-synchronous-tilt/) |
| sync5-mechanism | 142 | [/articles/sync4-sync5-mechanism-guide/](https://aerocool.ua/articles/sync4-sync5-mechanism-guide/) |
| mesh-material | 134 | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) |
| gaming-chair | 132 | [/products/](https://aerocool.ua/products/) |
| aerocool-website | 128 | [/](https://aerocool.ua/) |

## 6. Полная Таблица Сущностей

| Сущность | Статус | Класс | Entity Home | About | Mentions | Группы | Rendered refs | Node defs | GSC | AI | Business | Заметки |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| 11d-adjustment | confirmed | Feature | [/articles/how-to-choose-chair-by-adjustability/](https://aerocool.ua/articles/how-to-choose-chair-by-adjustability/) | 2 | 42 | 0 | 120 | 44 | pending-production | pending-production | pending-production | ok |
| 7d-adjustment | confirmed | Feature | [/articles/how-to-choose-chair-by-adjustability/](https://aerocool.ua/articles/how-to-choose-chair-by-adjustability/) | 2 | 30 | 0 | 86 | 32 | pending-production | pending-production | pending-production | ok |
| 8d-adjustment | confirmed | Feature | [/articles/how-to-choose-chair-by-adjustability/](https://aerocool.ua/articles/how-to-choose-chair-by-adjustability/) | 2 | 22 | 0 | 70 | 24 | pending-production | pending-production | pending-production | ok |
| about-page | confirmed | AboutPage | [/about/](https://aerocool.ua/about/) | 0 | 0 | 0 | 2 | 1 | pending-production | pending-production | pending-production | ok |
| aerocool-brand | confirmed | Brand | [/about/](https://aerocool.ua/about/) | 8 | 34 | 0 | 284 | 96 | pending-production | pending-production | pending-production | ok |
| aerocool-catalog | confirmed | Collection | [/products/](https://aerocool.ua/products/) | 8 | 26 | 0 | 66 | 1 | pending-production | pending-production | pending-production | ok |
| aerocool-global-organization | confirmed | Organization | [https://aerocool.io/](https://aerocool.io/) | 2 | 2 | 0 | 388 | 96 | pending-production | pending-production | pending-production | ok |
| aerocool-logo | confirmed | ImageObject | [/](https://aerocool.ua/) | 0 | 0 | 0 | 384 | 96 | pending-production | pending-production | pending-production | ok |
| aerocool-ukraine | confirmed | Organization | [/about/](https://aerocool.ua/about/) | 8 | 2 | 0 | 440 | 96 | pending-production | pending-production | pending-production | ok |
| aerocool-website | confirmed | WebSite | [/](https://aerocool.ua/) | 0 | 0 | 0 | 128 | 48 | pending-production | pending-production | pending-production | ok |
| armrests-3d-x-360 | confirmed | Feature | [/products/sky/](https://aerocool.ua/products/sky/) | 0 | 4 | 0 | 10 | 4 | pending-production | pending-production | pending-production | ok |
| armrests-4d-x-360 | confirmed | Feature | [/products/wing/](https://aerocool.ua/products/wing/) | 0 | 12 | 0 | 26 | 12 | pending-production | pending-production | pending-production | ok |
| articles-collection | confirmed | Collection | [/articles/](https://aerocool.ua/articles/) | 6 | 0 | 0 | 14 | 1 | pending-production | pending-production | pending-production | ok |
| chair-selection | confirmed | ContentTopic | [/articles/how-to-choose-aerocool-chair/](https://aerocool.ua/articles/how-to-choose-aerocool-chair/) | 20 | 2 | 0 | 66 | 22 | pending-production | pending-production | pending-production | ok |
| computer-chair | confirmed | UseCase | [/products/](https://aerocool.ua/products/) | 36 | 42 | 0 | 206 | 78 | pending-production | pending-production | pending-production | ok |
| contact-page | confirmed | ContactPage | [/contact/](https://aerocool.ua/contact/) | 0 | 2 | 0 | 4 | 1 | pending-production | pending-production | pending-production | ok |
| delivery-policy | confirmed | Policy | [/faq/](https://aerocool.ua/faq/) | 2 | 26 | 0 | 56 | 28 | pending-production | pending-production | pending-production | ok |
| dual-backrest | confirmed | Feature | [/articles/what-is-dual-backrest/](https://aerocool.ua/articles/what-is-dual-backrest/) | 2 | 4 | 0 | 18 | 6 | pending-production | pending-production | pending-production | ok |
| ergonomic-chair | confirmed | UseCase | [/products/](https://aerocool.ua/products/) | 4 | 16 | 0 | 60 | 20 | pending-production | pending-production | pending-production | ok |
| fabric-material | confirmed | Material | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) | 0 | 10 | 0 | 22 | 10 | pending-production | pending-production | pending-production | ok |
| faq-page | confirmed | FAQPage | [/faq/](https://aerocool.ua/faq/) | 2 | 0 | 0 | 4 | 1 | pending-production | pending-production | pending-production | ok |
| gaming-chair | confirmed | UseCase | [/products/](https://aerocool.ua/products/) | 14 | 38 | 0 | 132 | 52 | pending-production | pending-production | pending-production | ok |
| home-office | confirmed | UseCase | [/articles/how-to-choose-aerocool-chair/](https://aerocool.ua/articles/how-to-choose-aerocool-chair/) | 28 | 52 | 0 | 212 | 80 | pending-production | pending-production | pending-production | ok |
| home-page | confirmed | WebPage | [/](https://aerocool.ua/) | 0 | 0 | 0 | 1 | 1 | pending-production | pending-production | pending-production | ok |
| hot-room | confirmed | UseCase | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) | 0 | 6 | 0 | 14 | 6 | pending-production | pending-production | pending-production | ok |
| image-license-policy | confirmed | Policy | [/image-license/](https://aerocool.ua/image-license/) | 2 | 0 | 0 | 4 | 2 | pending-production | pending-production | pending-production | ok |
| leatherette-material | confirmed | Material | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) | 0 | 10 | 0 | 22 | 10 | pending-production | pending-production | pending-production | ok |
| loft-air-material | confirmed | Material | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) | 4 | 42 | 0 | 128 | 46 | pending-production | pending-production | pending-production | ok |
| long-sitting | confirmed | UseCase | [/articles/chair-for-posture-and-long-work/](https://aerocool.ua/articles/chair-for-posture-and-long-work/) | 4 | 4 | 0 | 24 | 8 | pending-production | pending-production | pending-production | ok |
| lumbar-support | confirmed | Feature | [/products/](https://aerocool.ua/products/) | 0 | 30 | 0 | 66 | 30 | pending-production | pending-production | pending-production | ok |
| mesh-material | confirmed | Material | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) | 4 | 44 | 0 | 134 | 48 | pending-production | pending-production | pending-production | ok |
| news-collection | confirmed | Collection | [/news/](https://aerocool.ua/news/) | 2 | 0 | 0 | 6 | 1 | pending-production | pending-production | pending-production | ok |
| office-chair | confirmed | UseCase | [/products/](https://aerocool.ua/products/) | 30 | 44 | 0 | 194 | 74 | pending-production | pending-production | pending-production | ok |
| online-store | do-not-markup | BusinessModel |  | 0 | 0 | 0 | 0 | 0 | pending-production | pending-production | pending-production | do-not-markup |
| payment-policy | confirmed | Policy | [/faq/](https://aerocool.ua/faq/) | 2 | 26 | 0 | 56 | 28 | pending-production | pending-production | pending-production | ok |
| price-validity-policy | confirmed | Policy | [/faq/](https://aerocool.ua/faq/) | 2 | 0 | 0 | 4 | 2 | pending-production | pending-production | pending-production | ok |
| racer-material | confirmed | Material | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) | 2 | 42 | 0 | 122 | 44 | pending-production | pending-production | pending-production | ok |
| replaceable-elements | confirmed | Feature | [/articles/what-is-fully-replaceable-design/](https://aerocool.ua/articles/what-is-fully-replaceable-design/) | 2 | 4 | 0 | 18 | 6 | pending-production | pending-production | pending-production | ok |
| return-policy | confirmed | Policy | [/faq/](https://aerocool.ua/faq/) | 2 | 26 | 0 | 56 | 28 | pending-production | pending-production | pending-production | ok |
| review-layer | do-not-markup | Review |  | 0 | 0 | 0 | 0 | 0 | pending-production | pending-production | pending-production | do-not-markup |
| sky-360 | confirmed | Product | [/products/sky/360/](https://aerocool.ua/products/sky/360/) | 6 | 14 | 0 | 40 | 1 | pending-production | pending-production | pending-production | ok |
| sky-lite | confirmed | Product | [/products/sky/lite/](https://aerocool.ua/products/sky/lite/) | 6 | 14 | 0 | 40 | 1 | pending-production | pending-production | pending-production | ok |
| sky-series | confirmed | ProductSeries | [/products/sky/](https://aerocool.ua/products/sky/) | 12 | 40 | 0 | 96 | 1 | pending-production | pending-production | pending-production | ok |
| sync4-mechanism | confirmed | Mechanism | [/articles/sync4-sync5-mechanism-guide/](https://aerocool.ua/articles/sync4-sync5-mechanism-guide/) | 4 | 28 | 0 | 92 | 32 | pending-production | pending-production | pending-production | ok |
| sync5-mechanism | confirmed | Mechanism | [/articles/sync4-sync5-mechanism-guide/](https://aerocool.ua/articles/sync4-sync5-mechanism-guide/) | 4 | 48 | 0 | 142 | 52 | pending-production | pending-production | pending-production | ok |
| synchronous-tilt | confirmed | Mechanism | [/articles/what-is-synchronous-tilt/](https://aerocool.ua/articles/what-is-synchronous-tilt/) | 6 | 64 | 0 | 184 | 70 | pending-production | pending-production | pending-production | ok |
| warranty-policy | confirmed | Policy | [/faq/](https://aerocool.ua/faq/) | 2 | 26 | 0 | 56 | 28 | pending-production | pending-production | pending-production | ok |
| wing-loft-air-dark-grey | confirmed | ProductVariant | [/products/wing/loft-air-dark-grey/](https://aerocool.ua/products/wing/loft-air-dark-grey/) | 2 | 8 | 0 | 24 | 1 | pending-production | pending-production | pending-production | ok |
| wing-loft-air-light-grey | confirmed | ProductVariant | [/products/wing/loft-air-light-grey/](https://aerocool.ua/products/wing/loft-air-light-grey/) | 2 | 6 | 0 | 20 | 1 | pending-production | pending-production | pending-production | ok |
| wing-loft-air-product-group | confirmed | ProductGroup | [/products/wing/](https://aerocool.ua/products/wing/) | 0 | 0 | 4 | 8 | 4 | pending-production | pending-production | pending-production | active ProductGroup |
| wing-mesh-black | confirmed | Product | [/products/wing/mesh-black/](https://aerocool.ua/products/wing/mesh-black/) | 2 | 8 | 0 | 20 | 1 | pending-production | pending-production | pending-production | ok |
| wing-racer-black | confirmed | ProductVariant | [/products/wing/racer-black/](https://aerocool.ua/products/wing/racer-black/) | 2 | 6 | 0 | 20 | 1 | pending-production | pending-production | pending-production | ok |
| wing-racer-dark-grey | confirmed | ProductVariant | [/products/wing/racer-dark-grey/](https://aerocool.ua/products/wing/racer-dark-grey/) | 2 | 4 | 0 | 16 | 1 | pending-production | pending-production | pending-production | ok |
| wing-racer-product-group | confirmed | ProductGroup | [/products/wing/](https://aerocool.ua/products/wing/) | 0 | 0 | 4 | 8 | 4 | pending-production | pending-production | pending-production | active ProductGroup |
| wing-series | confirmed | ProductSeries | [/products/wing/](https://aerocool.ua/products/wing/) | 20 | 36 | 0 | 98 | 1 | pending-production | pending-production | pending-production | ok |
| xtal-loft-air-dark-grey | confirmed | ProductVariant | [/products/xtal/loft-air-dark-grey/](https://aerocool.ua/products/xtal/loft-air-dark-grey/) | 2 | 8 | 0 | 24 | 1 | pending-production | pending-production | pending-production | ok |
| xtal-loft-air-light-grey | confirmed | ProductVariant | [/products/xtal/loft-air-light-grey/](https://aerocool.ua/products/xtal/loft-air-light-grey/) | 2 | 6 | 0 | 20 | 1 | pending-production | pending-production | pending-production | ok |
| xtal-loft-air-product-group | confirmed | ProductGroup | [/products/xtal/](https://aerocool.ua/products/xtal/) | 0 | 0 | 4 | 8 | 4 | pending-production | pending-production | pending-production | active ProductGroup |
| xtal-mesh-black | confirmed | Product | [/products/xtal/mesh-black/](https://aerocool.ua/products/xtal/mesh-black/) | 2 | 8 | 0 | 20 | 1 | pending-production | pending-production | pending-production | ok |
| xtal-racer-black | confirmed | ProductVariant | [/products/xtal/racer-black/](https://aerocool.ua/products/xtal/racer-black/) | 2 | 4 | 0 | 16 | 1 | pending-production | pending-production | pending-production | ok |
| xtal-racer-dark-grey | confirmed | ProductVariant | [/products/xtal/racer-dark-grey/](https://aerocool.ua/products/xtal/racer-dark-grey/) | 2 | 6 | 0 | 20 | 1 | pending-production | pending-production | pending-production | ok |
| xtal-racer-product-group | confirmed | ProductGroup | [/products/xtal/](https://aerocool.ua/products/xtal/) | 0 | 0 | 4 | 8 | 4 | pending-production | pending-production | pending-production | active ProductGroup |
| xtal-series | confirmed | ProductSeries | [/products/xtal/](https://aerocool.ua/products/xtal/) | 20 | 36 | 0 | 98 | 1 | pending-production | pending-production | pending-production | ok |

## 7. Как Использовать Отчет

1. После каждого крупного schema/entity/content изменения запускать `npm run build`, затем `npm run entity:report`.
2. Проверять, что важные confirmed сущности не потеряли `about`, `mentions` или rendered refs.
3. После production-перехода добавить GSC impressions, clicks и CTR в `docs/seo/59-entity-performance-overrides.csv`.
4. После AI Search baseline добавить AI citations и ошибки представления бренда/товаров в `docs/seo/59-entity-performance-overrides.csv`.
5. После появления бизнес-событий добавить business signal: консультации, заявки, покупки или другие подтвержденные действия в `docs/seo/59-entity-performance-overrides.csv`.

## 8. Текущий Вывод

Локальный entity reporting теперь создан: registry, front matter usage и rendered JSON-LD refs измеряются автоматически. Внешние performance-поля остаются `pending-production`, потому что до production/indexability gate реальные GSC, AI citations и business signals нельзя считать честными метриками.
