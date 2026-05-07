# JSON-LD Graph Audit And Roadmap 2026

Актуально на `2026-05-07`.

Этот документ фиксирует текущее состояние JSON-LD Graph проекта `Aerocool Ukraine`, объясняет оценку `Google rich-results quality: 9/10` и хранит roadmap усиления structured data без риска переспама, schema drift или несоответствия видимому контенту.

Важно: JSON-LD не является кнопкой `топ-1`. Он помогает Google понять сущности, связи, товарные данные, организацию, хлебные крошки, FAQ и изображения, а также повышает eligibility для rich results. Но позиция в Google зависит от интента, качества страницы, доверия, внутренней архитектуры, ссылок, UX, индексации и конкуренции.

Текущий практический план внедрения roadmap-задач описан в [2026-05-07-documentation-refresh-and-project-action-plan.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-07-documentation-refresh-and-project-action-plan.md).

Простыми словами для новичка: JSON-LD — это машинное описание страницы для поисковика. Оно должно подтверждать то, что человек реально видит на странице. Если в JSON-LD указать цену, рейтинг или наличие, но не показать их пользователю, это становится риском для Google rich results.

## 1. Текущая Оценка

### Schema.org / JSON-LD Graph: `10/10`

Текущий граф технически чистый:

- один JSON-LD script на индексируемую страницу;
- единый `@graph`;
- стабильные top-level `@id`;
- нет дублей top-level `@id` внутри графа;
- нет висячих fragment-ссылок вида `#logo`, `#brand`, `#webpage`, `#primary-image`;
- `WebPage.url` совпадает с canonical;
- `search`, `404`, alias и служебная пагинация остаются без JSON-LD;
- даты `Article` и `NewsArticle` сериализуются как `+03:00`, без `&#43;`.

Фактическая актуальная сборка в `development` содержит `88` HTML-страниц с JSON-LD: `24` `Product`, `14` `Article`, `14` `NewsArticle`, `76` `BreadcrumbList`, `2` `FAQPage`, `16` `CollectionPage`, `2` `AboutPage` и `2` `ContactPage`. Из-за временного `HUGO_ENVIRONMENT = "development"` эти страницы сейчас получают `noindex,nofollow`; rich-results eligibility нужно перепроверить после production-перехода.

### Google rich-results quality: `9/10`

Минус один балл не за синтаксис и не за schema.org Validator. После контентных обновлений `2026-05-06` цена, SKU, гарантия, наличие, merchant facts и rating value/count, когда rating есть во front matter, выводятся видимо. Оставшийся риск — источник рейтингов и индивидуальные review evidence пока не документированы как полноценный пользовательский слой.

Сейчас в `Product` JSON-LD есть:

- `offers.price`;
- `offers.availability`;
- `aggregateRating.ratingValue`;
- `aggregateRating.reviewCount`;
- доставка;
- возврат;
- гарантия.

Status `2026-05-07`: product front matter зафиксирован как единый источник правды для price, availability, SKU, MPN, GTIN, warranty, shipping, returns и payment methods. Видимый коммерческий блок на product pages и merchant-факты в `/faq/` теперь должны служить синхронным подтверждением этих значений. До `10/10` остается подтвердить источник рейтингов/отзывов или убрать `aggregateRating`, а также перепроверить rich-results eligibility после production-перехода, потому что текущий Netlify-режим остается `development/noindex`.

## 2. Почему Это Важно Для Google

Google отличает технически валидную structured data от качественной structured data.

Ключевое правило: размечать нужно то, что реально представляет содержимое страницы и доступно пользователю. Нельзя размечать скрытый, несуществующий, нерелевантный или вводящий в заблуждение контент.

Практический вывод для проекта:

- `price` в JSON-LD должен соответствовать видимой цене на товарной странице;
- `availability` должен соответствовать видимому статусу наличия;
- `ratingValue` и `reviewCount` должны быть подкреплены видимым рейтингом/отзывами или реальным источником отзывов;
- `shippingDetails` и `hasMerchantReturnPolicy` должны совпадать с видимыми условиями доставки и возврата;
- `FAQPage` должен совпадать с видимым FAQ;
- `Article` и `NewsArticle` должны соответствовать видимому материалу, авторству, датам и изображению.

Status `2026-05-07`: merchant-условия `Product` JSON-LD читаются из product front matter и подтверждаются видимым FAQ: доставка по Украине `Новой Почтой`, доставка `0 грн`, передача в отправку `0-1 день`, транзит `1-3 дня`, возврат `14 дней`, бесплатный возврат, оплата наличными/картой. Открытым остается отдельное документирование источника рейтингов и отзывов.

## 3. Что Нужно Доделать Для `10/10` По Google Rich Results

### P0. Видимый коммерческий блок на Product pages

Status `2026-05-07`: базовый visible product facts block добавлен в контент, а product front matter зафиксирован как source of truth для тех же фактов, которые есть в JSON-LD:

- цена;
- валюта `UAH`;
- наличие;
- SKU;
- гарантия;
- доставка;
- возврат;
- способы оплаты;
- рейтинг и количество отзывов, только если они реальные и подтверждены.

Если рейтинг и отзывы пока не являются реальным пользовательским сигналом, лучше убрать `aggregateRating` или не усиливать review-layer.

### P0. Синхронизация видимого UI и schema

Любое быстро меняющееся поле должно обновляться одновременно в UI и JSON-LD:

- `price`;
- `availability`;
- `priceValidUntil`;
- `shippingRate`;
- сроки доставки;
- условия возврата;
- рейтинг;
- количество отзывов.

Если меняются доставка, возврат или способы оплаты, сначала обновлять product front matter, затем проверять `Product` JSON-LD, видимый коммерческий блок товарных страниц и `/faq/` одновременно. [layouts/_partials/_schema/product.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/product.html) менять нужно только при изменении mapping или добавлении новых полей.

### P1. ProductGroup Для Вариантов

У Aerocool есть варианты по сериям, модели, материалу и цвету. Если продуктовые URL остаются отдельными страницами вариантов, можно внедрить `ProductGroup`:

- `ProductGroup`;
- `productGroupID`;
- `hasVariant`;
- `variesBy`;
- `isVariantOf` или `inProductGroupWithID`;
- variant-specific `color`, `material`, `sku`, `url`, `image`, `offers`.

Это поможет Google понять, что отдельные URL являются вариантами одной продуктовой группы, а не полностью независимыми товарами.

Важное условие: на странице должен быть видимый variant selector или хотя бы понятные ссылки на другие варианты.

### P1. Product Properties

После появления видимых характеристик можно усилить `Product`:

- `color`;
- `material`;
- `pattern`, если актуально;
- `gtin13`, если есть официальный GTIN;
- `mpn`, если есть официальный MPN;
- `additionalProperty` через `PropertyValue` для технических параметров:
  - механизм;
  - уровень регулировок;
  - тип подлокотников;
  - материал поверхности;
  - база;
  - ролики;
  - гарантия;
  - рекомендованный сценарий.

Добавлять эти поля стоит только если они уже видны пользователю в таблице характеристик или в явном блоке спецификаций.

### P1. Merchant Policy На Уровне Organization

Сейчас возврат и доставка описаны на уровне `Offer`. Это валидно, но если политика единая для большинства товаров, лучше позже вынести стандартную политику на уровень организации или отдельной policy-сущности:

- общий `MerchantReturnPolicy`;
- общие условия доставки;
- ссылки на видимые страницы доставки, оплаты, возврата и гарантии.

Не добавлять это заранее, если на сайте еще нет видимых страниц или блоков с этими условиями.

### P2. Author / Reviewer Layer Для Статей

Сейчас `Article` и `NewsArticle` используют организацию как `author` и `publisher`. Это безопасно.

Позже можно усилить редакционный слой:

- реальные `Person`-авторы;
- страницы авторов;
- `reviewedBy`, если есть реальный экспертный ревью;
- `author.url`;
- `sameAs` для публичных профилей, если они реально существуют.

Не добавлять фиктивных авторов или reviewer-сущности только ради E-E-A-T.

### P2. About / Mentions Для Контентных Материалов

Для статей и новостей можно добавить более явные связи:

- `about` -> серия, бренд или основная тема;
- `mentions` -> связанные товары и серии;
- `mainEntity` только если материал действительно посвящен одной главной сущности.

Это имеет смысл после появления устойчивого front matter для связанных товаров/серий, чтобы не парсить связи из текста случайно.

### P2. ImageObject Gallery

Сейчас есть единый `primaryImageOfPage`. Для товарных страниц позже можно расширить изображения:

- несколько product images;
- разные пропорции `1:1`, `4:3`, `16:9`;
- изображения деталей: механизм, спинка, подлокотники, материал;
- только crawlable/indexable URL.

Для Google это полезнее, если изображения реально присутствуют в HTML-странице, а не только в JSON-LD.

## 4. Что Не Нужно Добавлять Сейчас

Не добавлять:

- `Review`, если нет реальных видимых отзывов;
- дополнительные `AggregateRating`, если рейтинг не подтвержден видимым блоком;
- `HowTo`, если на странице нет полноценной пошаговой инструкции;
- `VideoObject`, если нет реального видео;
- `LocalBusiness` только ради `openingHours`, если бизнес-модель не описана как физическая точка обслуживания;
- фиктивных авторов, экспертов, reviewer и профили;
- свойства, которых нет в контенте или front matter.

Правило простое: сначала видимый контент и бизнес-источник правды, потом schema.

## 5. Приоритеты На Следующий Цикл

1. Доделать видимый коммерческий блок на Product pages.
2. Синхронизировать UI и JSON-LD для цены, наличия, гарантии, доставки, возврата и рейтинга.
3. Решить, являются ли рейтинги реальными пользовательскими данными. Если нет, убрать или не усиливать review-layer.
4. Добавить таблицу характеристик как источник для будущих `additionalProperty`.
5. Спроектировать `ProductGroup` для вариантов по серии/модели/материалу/цвету.
6. Добавить отдельные видимые страницы или блоки для доставки, оплаты, возврата и гарантии.
7. После этого переносить общие merchant policy данные на уровень Organization или отдельной policy-сущности.
8. Вести entity/schema изменения через [schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/schema-markup-quality-checklist-2026.md), [entities-knowledge-graph-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entities-knowledge-graph-playbook-2026.md) и [ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/ecommerce-structured-data-playbook-2026.md).

## 6. Контроль Перед Деплоем

Минимальная проверка:

```bash
npm run build
```

После деплоя вручную проверить ключевые URL:

- `https://aerocool.ua/`
- `https://aerocool.ua/about/`
- `https://aerocool.ua/contact/`
- `https://aerocool.ua/products/`
- `https://aerocool.ua/products/sky/360/`
- `https://aerocool.ua/articles/how-to-choose-aerocool-chair/`
- `https://aerocool.ua/news/sky-series-launch/`
- `https://aerocool.ua/faq/`
- `https://aerocool.ua/ru/about/`
- `https://aerocool.ua/ru/products/sky/360/`
- `https://aerocool.ua/search/`

Инструменты:

- Schema Markup Validator: `https://validator.schema.org/`
- Google Rich Results Test: `https://search.google.com/test/rich-results`
- Search Console rich results reports после индексации.

## 7. Официальные Источники

- Google General Structured Data Guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google Product Snippet Structured Data: https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- Google Merchant Listing Structured Data: https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
- Google Product Variant Structured Data: https://developers.google.com/search/docs/appearance/structured-data/product-variants
- Google Organization Structured Data: https://developers.google.com/search/docs/appearance/structured-data/logo
- Google Article Structured Data: https://developers.google.com/search/docs/appearance/structured-data/article
