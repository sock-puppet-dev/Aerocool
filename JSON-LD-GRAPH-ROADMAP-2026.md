# JSON-LD Graph Audit And Roadmap 2026

Актуально на `2026-04-29`.

Этот документ фиксирует текущее состояние JSON-LD Graph проекта `Aerocool Ukraine`, объясняет оценку `Google rich-results quality: 9/10` и хранит roadmap усиления structured data без риска переспама или несоответствия видимому контенту.

Важно: JSON-LD не является кнопкой `топ-1`. Он помогает Google понять сущности, связи, товарные данные, организацию, хлебные крошки, FAQ и изображения, а также повышает eligibility для rich results. Но позиция в Google зависит от интента, качества страницы, доверия, внутренней архитектуры, ссылок, UX, индексации и конкуренции.

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

### Google rich-results quality: `9/10`

Минус один балл не за синтаксис и не за schema.org Validator. Причина в качестве соответствия Product-разметки видимому контенту.

Сейчас в `Product` JSON-LD есть:

- `offers.price`;
- `offers.availability`;
- `aggregateRating.ratingValue`;
- `aggregateRating.reviewCount`;
- доставка;
- возврат;
- гарантия.

Но цена, наличие, рейтинг и количество отзывов пока не выведены в видимой карточке товара. Это запланировано в разработке. До появления видимого блока Google может считать эти данные недостаточно подтвержденными для rich results, даже если Schema Validator показывает `0` ошибок.

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

## 3. Что Нужно Доделать Для `10/10` По Google Rich Results

### P0. Видимый коммерческий блок на Product pages

Добавить на каждую товарную страницу видимый блок с теми же фактами, которые уже есть в JSON-LD:

- цена;
- валюта `UAH`;
- наличие;
- SKU;
- гарантия;
- доставка;
- возврат;
- способы оплаты;
- рейтинг и количество отзывов, только если они реальные и подтверждены.

Если рейтинг и отзывы пока не являются реальным пользовательским сигналом, лучше временно не усиливать их в UI и не расширять review-разметку.

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

Если данные пока статичны и управляются front matter, это нормально, но команда должна понимать: front matter становится источником коммерческой правды.

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
