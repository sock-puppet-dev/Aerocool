# Аудит И План Развития JSON-LD Графа 2026

Актуально на 2026-05-31.

Этот документ фиксирует текущее состояние JSON-LD Graph проекта `Aerocool Ukraine`, объясняет текущую оценку `Google rich-results quality: 8.8/10` и хранит roadmap усиления structured data без риска переспама, schema drift или несоответствия видимому контенту.

Важно: JSON-LD не является кнопкой `топ-1`. Он помогает Google понять сущности, связи, товарные данные, организацию, хлебные крошки, FAQ и изображения, а также повышает eligibility для тех rich results, которые Google еще поддерживает. Но позиция в Google зависит от интента, качества страницы, доверия, внутренней архитектуры, ссылок, UX, индексации и конкуренции.

Актуализация `2026-05-17`: по официальной документации Google, с `2026-05-07` FAQ rich results больше не показываются в Google Search. Для Aerocool `FAQPage` остается полезным как структурированное описание видимого FAQ и сервисных условий, но не как SERP-enhancement цель.

Текущий практический план внедрения roadmap-задач описан в [34-2026-05-07-documentation-refresh-and-project-action-plan.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/34-2026-05-07-documentation-refresh-and-project-action-plan.md).
Базовый sync-аудит документации и 2026 best-practices alignment описан в [37-2026-05-13-documentation-2026-best-practices-sync-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md).
Актуальный полный schema/entity-срез зафиксирован в [57-2026-05-31-schema-entity-full-audit-current.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/57-2026-05-31-schema-entity-full-audit-current.md).
Операционный регламент поддержки product facts зафиксирован в [58-product-facts-maintenance-process-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/58-product-facts-maintenance-process-2026.md).

Простыми словами для новичка: JSON-LD — это машинное описание страницы для поисковика. Оно должно подтверждать то, что человек реально видит на странице. Если в JSON-LD указать цену, рейтинг или наличие, но не показать их пользователю, это становится риском для Google rich results.

## 1. Текущая Оценка

### Schema.org / JSON-LD Граф: `9.7/10`

Текущий граф технически чистый:

- один JSON-LD script на индексируемую страницу;
- единый `@graph`;
- стабильные top-level `@id`;
- нет дублей top-level `@id` внутри графа;
- нет висячих fragment-ссылок вида `#logo`, `#brand`, `#webpage`, `#primary-image`;
- `WebPage.url` совпадает с canonical;
- `search`, `404`, alias, `contact/success` и служебная пагинация остаются без JSON-LD;
- даты `Article` и `NewsArticle` сериализуются как `+03:00`, без `&#43;`.

Фактическая актуальная сборка в `development` содержит `112` HTML-страниц с JSON-LD и `1900` top-level nodes: `24` `Product`, `32` `Article`, `18` `NewsArticle`, `98` `BreadcrumbList`, `2` `FAQPage`, `18` `CollectionPage`, `2` `AboutPage`, `2` `ContactPage`, а также registry-based nodes для подтвержденных сущностей: `DefinedTerm` и объяснительные `Thing` nodes из `about_entities` и `mentions_entities`. Из-за временного `HUGO_ENVIRONMENT = "development"` эти страницы сейчас получают `noindex,nofollow`; rich-results eligibility нужно перепроверить после production-перехода.

### Качество Google Rich Results: `9.0/10`

Минус не за синтаксис и не за schema.org Validator. После контентных обновлений цена, SKU, гарантия, наличие и merchant facts выводятся видимо. Review-layer переведен на SEO-first pipeline: approved отзывы из `Netlify Database` выгружаются в `data/generated/reviews.json`, показываются на товарной странице и только после этого дают `Product.aggregateRating`. Legacy `rating.value` / `rating.count` удалены из товарного front matter.

Сейчас в `Product` JSON-LD есть:

- `offers.price`;
- `offers.availability`;
- доставка;
- возврат;
- гарантия.

Сейчас `Product.aggregateRating` появляется только при наличии approved отзывов в build-time snapshot. Если у товара нет approved отзывов или локальная сборка запущена без подключения `Netlify Database`, `aggregateRating` не выводится.

Статус `2026-05-07`: product front matter зафиксирован как единый источник правды для price, `priceValidUntil`, availability, SKU, MPN, GTIN, warranty, shipping, returns и payment methods; владелец бизнес-значений — команда Aerocool Украина. Значение `priceValidUntil: 2027-12-31` подтверждено как актуальный срок действия товарных цен. Видимый коммерческий блок на product pages и merchant-факты в `/faq/` теперь должны служить синхронным подтверждением этих значений.

Статус `2026-05-28`: pipeline рейтингов внедрен: `Netlify Database -> approved reviews -> build-time export -> data/generated/reviews.json -> visible reviews -> Product JSON-LD`. Legacy rating во front matter удален.

## 2. Почему Это Важно Для Google

Google отличает технически валидную structured data от качественной structured data.

Ключевое правило: размечать нужно то, что реально представляет содержимое страницы и доступно пользователю. Нельзя размечать скрытый, несуществующий, нерелевантный или вводящий в заблуждение контент.

Практический вывод для проекта:

- `price` в JSON-LD должен соответствовать видимой цене на товарной странице;
- `availability` должен соответствовать видимому статусу наличия;
- `ratingValue` и `reviewCount` должны быть подкреплены approved отзывами, которые видны на этой же товарной странице;
- `shippingDetails` и `hasMerchantReturnPolicy` должны совпадать с видимыми условиями доставки и возврата;
- `FAQPage` должен совпадать с видимым FAQ; при этом FAQ не считать Google rich result целью после обновления Google от `2026-05-08`;
- `Article` и `NewsArticle` должны соответствовать видимому материалу, авторству, датам и изображению.

Статус `2026-05-07`: merchant-условия `Product` JSON-LD читаются из product front matter и подтверждаются видимым FAQ: доставка по Украине `Новой Почтой`, доставка `0 грн`, передача в отправку `0-1 день`, транзит `1-3 дня`, возврат `14 дней`, бесплатный возврат, оплата наличными/картой.

Статус `2026-05-26`: источник рейтингов должен быть не front matter, а approved reviews snapshot из `Netlify Database`. Документ внедрения: [17-netlify-database-reviews.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/17-netlify-database-reviews.md).

## 3. Что Нужно Доделать Для `10/10` По Google Rich Results

### P0. Видимый Коммерческий Блок На Товарных Страницах

Статус `2026-05-07`: базовый visible product facts block добавлен в контент, а product front matter зафиксирован как source of truth для тех же фактов, которые есть в JSON-LD:

- цена;
- валюта `UAH`;
- наличие;
- SKU;
- гарантия;
- доставка;
- возврат;
- способы оплаты;
- рейтинг и количество отзывов, только если они реальные и подтверждены.

Если рейтинг и отзывы пока не являются реальным пользовательским сигналом, не выводить `aggregateRating` и не усиливать review-layer. Текущий шаблон уже следует этому правилу: `AggregateRating` выводится только из approved reviews snapshot.

### P0. Синхронизация Видимого Интерфейса И Schema-Разметки

Любое быстро меняющееся поле должно обновляться одновременно в UI и JSON-LD:

- `price`;
- `availability`;
- `priceValidUntil`;
- `shippingRate`;
- сроки доставки;
- условия возврата;
- рейтинг;
- количество отзывов.

Если меняются цена, наличие, доставка, возврат, гарантия, способы оплаты, `priceValidUntil`, цвет или характеристики, проходить регламент [58-product-facts-maintenance-process-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/58-product-facts-maintenance-process-2026.md): бизнес-подтверждение, product front matter или registry, видимый HTML, `/faq/` при policy-wide изменении, JSON-LD QA и post-deploy проверка. [layouts/_partials/_schema/product.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/product.html) менять нужно только при изменении mapping или добавлении новых полей.

### Выполнено. ProductGroup Для Вариантов

У Aerocool есть отдельные товарные URL, но не каждый товар является вариантом ProductGroup. На `2026-05-31` `ProductGroup` внедрен только там, где несколько URL представляют реальные варианты одной модели: цветовые пары WING Racer, WING Loft Air, XTAL Racer и XTAL Loft Air.

Rendered graph сейчас содержит:

- `ProductGroup`;
- `productGroupID`;
- `hasVariant`;
- `variesBy`;
- `isVariantOf` или `inProductGroupWithID`;
- variant-specific `color`, `material`, `sku`, `url`, `image`, `offers`.

Это поможет Google понять, что отдельные URL являются вариантами одной продуктовой группы, а не полностью независимыми товарами. Одиночные товары, такие как SKY Lite, SKY 360, WING Mesh Black и XTAL Mesh Black, должны оставаться самостоятельными `Product` внутри своей серии, без `isVariantOf`.

Важное условие остается для будущих групп: на странице должен быть видимый variant selector или хотя бы понятные ссылки на другие варианты. На `2026-05-28` этот UI-слой добавлен: `variant-swatches.html` выводит цветовые swatches как ссылки на соседние variant URL на основе `product_group_id` и `data/entities.yaml`. На `2026-05-31` singleton ProductGroup удалены из registry/front matter, а четыре реальные группы переведены в `confirmed` и активированы в JSON-LD.

### Выполнено. Свойства Товара

Видимые характеристики уже есть в product content/front matter. На `2026-05-31` Product schema усилена двумя безопасными слоями:

- `color` берется из [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml);
- `additionalProperty` через `PropertyValue` для видимых технических параметров:
  - механизм;
  - уровень регулировок;
  - тип подлокотников;
  - материал поверхности;
  - база;
  - ролики;
  - гарантия;
  - рекомендованный сценарий.

`mpn` и `gtin13` продолжают выводиться только если официальные значения есть во front matter.

`Product.additionalProperty` сейчас строится из видимой вкладки `characteristics`. Не переносить туда маркетинговые фразы, которые не являются стабильными характеристиками модели.

### P1. Merchant Policy На Уровне Organization

Сейчас возврат и доставка описаны на уровне `Offer`. Это валидно, но если политика единая для большинства товаров, лучше позже вынести стандартную политику на уровень организации или отдельной policy-сущности:

- общий `MerchantReturnPolicy`;
- общие условия доставки;
- ссылки на видимые страницы доставки, оплаты, возврата и гарантии.

Не добавлять это заранее, если на сайте еще нет видимых страниц или блоков с этими условиями.

### P2. Слой Авторов И Проверяющих Для Статей

Сейчас `Article` и `NewsArticle` используют организацию как `author` и `publisher`. Это безопасно.

Позже можно усилить редакционный слой:

- реальные `Person`-авторы;
- страницы авторов;
- `reviewedBy`, если есть реальный экспертный ревью;
- `author.url`;
- `sameAs` для публичных профилей, если они реально существуют.

Не добавлять фиктивных авторов или reviewer-сущности только ради E-E-A-T.

### P2. Поля `about` И `mentions` Для Контентных Материалов

Для статей и новостей можно добавить более явные связи:

- `about` -> серия, бренд или основная тема;
- `mentions` -> связанные товары и серии;
- `mainEntity` только если материал действительно посвящен одной главной сущности.

Это имеет смысл после появления устойчивого front matter для связанных товаров/серий, чтобы не парсить связи из текста случайно.

### P2. Галерея `ImageObject`

Сейчас есть единый `primaryImageOfPage`. Для товарных страниц позже можно расширить изображения:

- несколько product images;
- разные пропорции `1:1`, `4:3`, `16:9`;
- изображения деталей: механизм, спинка, подлокотники, материал;
- только crawlable/indexable URL.

Для Google это полезнее, если изображения реально присутствуют в HTML-странице, а не только в JSON-LD.

### P2. Image License Metadata

Schema App support-документация и Google Image License Metadata подтверждают полезность `license` и `acquireLicensePage` для Google Images. Для Aerocool это не внедрять до подтверждения прав.

Порядок:

1. Подтвердить владельца и права использования product/brand images.
2. Создать или выбрать видимую страницу с условиями использования изображений.
3. Документировать поля в front matter или data layer.
4. Расширить `page-image-object.html` только после этого.

Не добавлять `license`, `creator`, `creditText`, `copyrightNotice` или `acquireLicensePage` как неподтвержденные юридические утверждения.

## 4. Что Не Нужно Добавлять Сейчас

Не добавлять:

- `Review`, если нет реальных видимых отзывов;
- дополнительные `AggregateRating`, если рейтинг не подтвержден approved отзывами из единого review source;
- `HowTo`, если на странице нет полноценной пошаговой инструкции;
- `VideoObject`, если нет реального видео;
- `LocalBusiness` только ради `openingHours`, если бизнес-модель не описана как физическая точка обслуживания;
- фиктивных авторов, экспертов, reviewer и профили;
- свойства, которых нет в контенте или front matter.

Правило простое: сначала видимый контент и бизнес-источник правды, потом schema.

## 5. Приоритеты На Следующий Цикл

1. Закрыть production gate: переключить окружение только после финальной проверки `index,follow`, sitemap, canonical, hreflang и published URL.
2. Подтвердить MPN/GTIN для `SKY 360` и `SKY Lite`.
3. Поддерживать регулярный [Entity Performance Report](/Users/stadnyk/MEGA/Aerocool/docs/seo/59-entity-performance-report-2026.md) через `npm run entity:report`; GSC/AI/business-поля заполнить после production.
4. Исполнять регламент product facts при каждом изменении коммерческих и товарных данных.
5. После production-перехода контролировать approved reviews snapshot, GSC product reports и rich-results eligibility на published URL.
6. Подготовить image license metadata только после подтверждения прав на изображения.
7. Вести entity/schema изменения через [20-schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/20-schema-markup-quality-checklist-2026.md), [24-entities-knowledge-graph-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/24-entities-knowledge-graph-playbook-2026.md), [21-ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/21-ecommerce-structured-data-playbook-2026.md), [58-product-facts-maintenance-process-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/58-product-facts-maintenance-process-2026.md) и [57-2026-05-31-schema-entity-full-audit-current.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/57-2026-05-31-schema-entity-full-audit-current.md).

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
