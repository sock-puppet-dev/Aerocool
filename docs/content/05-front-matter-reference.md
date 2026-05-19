# Руководство По Полям Метаданных Страницы

Обновлено: 2026-05-19.

В проекте `Aerocool` использовать только поле `schema_types`. Поле `schema_type` не используется.

Этот гайд нужен для работы с файлами `content/**/*.md`. Front matter — это YAML-блок между `---` в начале markdown-файла. В нем задаются SEO-заголовок, описание, дата, slug, картинка, schema.org типы и другие данные, которые потом читают Hugo-шаблоны.

Как пользоваться новичку:

1. Найди тип страницы: главная, товар, серия, статья, новость, FAQ, контакт или поиск.
2. Скопируй пример front matter из нужного раздела.
3. Замени значения на реальные данные страницы.
4. Не добавляй поля “на всякий случай”, если шаблоны проекта их не используют.
5. После правки запусти `npm run build`.

Практический план entity/product fields (`about_entities`, `mentions_entities`, `product_group_id`, `variant_attributes`, `rating_source`) описан в [34-2026-05-07-documentation-refresh-and-project-action-plan.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/34-2026-05-07-documentation-refresh-and-project-action-plan.md). Базовая синхронизация документации с лучшими практиками 2026 зафиксирована в [37-2026-05-13-documentation-2026-best-practices-sync-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md). Entity IDs и entity homes зафиксированы в [23-entity-registry-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/23-entity-registry-2026.md), а структурированный источник для шаблонов — [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml). Для первого знакомства с этим слоем читайте [22-entity-registry-beginner-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/22-entity-registry-beginner-guide-2026.md). Hugo templates уже безопасно читают `about_entities`, `mentions_entities` и `product_group_id`, но добавлять их в `content/` нужно только точечно: значение должно существовать в registry и быть видимо раскрыто на странице. Для JSON-LD resolver выводит только `confirmed` сущности; `product_group_id` может быть подготовлен заранее, но `isVariantOf` появится только после подтверждения ProductGroup.

## Поля Сущностей Во Front Matter

`about_entities` — главные сущности страницы. Для статьи это тема, для серии — сама серия и ключевой сценарий, для товара — конкретная модель, серия и основной тип кресла.

`mentions_entities` — важные связанные сущности, которые заметно раскрыты в тексте, ссылках, FAQ, характеристиках или коммерческих условиях.

`product_group_id` — только для товарных вариантов. Значение указывает на группу вариантов товара, например `wing-racer-product-group`. Пока ProductGroup entity имеет статус `planned`, поле остается подготовленным front matter и не выводит `isVariantOf` в JSON-LD.

Пример:

```yaml
about_entities:
  - "wing-racer-black"
  - "wing-series"
  - "gaming-chair"
mentions_entities:
  - "racer-material"
  - "sync5-mechanism"
  - "11d-adjustment"
product_group_id: "wing-racer-product-group"
```

## Главное Правило По Заголовкам

- `title` обязателен и отвечает за SEO-заголовок документа.
- `linkTitle` задает короткое навигационное имя для хлебных крошек и внутренних списков, если полный `title` слишком длинный.
- `h1` необязателен и нужен только тогда, когда видимый заголовок страницы должен отличаться от `title`.
- Для большинства страниц видимый `H1` рендерит шаблонный слой по правилу `.Params.h1 | default .Title`.
- Видимые хлебные крошки и `BreadcrumbList` используют единый helper `breadcrumb-label.html`: сначала берется `linkTitle`, а если его нет — `title`.
- Исключение на текущий момент — главная страница: ее hero и видимый `H1` задаются единым shortcode `layouts/_shortcodes/home-hero.html`, который сам выбирает украинский или русский текст по языку страницы.
- В теле markdown не добавлять `# H1`; контент начинается с лида или с `##`.

## Видимая Meta-Строка И Даты

В проекте есть два разных слоя метаданных:

- **служебные SEO/schema-данные** во front matter, head и JSON-LD;
- **видимая meta-строка** под `H1` или в карточке листинга.

Поле `date` нужно сохранять почти на всех контентных страницах, даже если дата не показывается пользователю. Оно участвует в сортировке, RSS, schema.org и других шаблонных сценариях. Поле `lastmod` обновляется при содержательной правке и используется SEO/schema-слоем; для статей и новостей оно дополнительно видно в редакционном блоке [editorial-note.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/editorial-note.html).

Видимую meta-строку контролирует [page-meta.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-meta.html). Она не равна всему front matter и не должна превращаться в универсальный вывод всех полей.

Текущая политика:

| Тип страницы | Front matter | Видимая meta-строка |
|---|---|---|
| Статья | `schema_types` содержит `article` | дата публикации + время чтения |
| Новость | `schema_types` содержит `news` | только дата публикации |
| Контакты | `contact-page` | не выводится |
| FAQ | `faq` | не выводится |
| Страница о бренде | `about-page` | не выводится |
| Каталог, серии, товары | `collection` или `product` | не выводится |
| Поиск, 404, alias | служебные шаблоны | не выводится |

Что важно:

- количество слов не показывается в интерфейсе;
- автор организации не показывается в видимой meta-строке;
- список переводов не выводится под `H1`;
- переключение языка живет в шапке сайта через [header.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/header.html);
- `hideMeta: true` использовать только как точечный ручной override, а не как способ массово чинить типы страниц.

## Стандарт `image` И `cover`

В текущем проекте каждый файл `content/**/*.md` должен иметь не только `image`, но и служебный `cover`-блок.

`image` — источник для SEO/OG/Twitter/schema через локальный helper `layouts/_partials/page-image.html`.

`cover.image` — источник для визуальных preview-карточек и PaperMod cover partial.

`cover.alt` — локализованное описание темы или объекта изображения. Не писать пустой `alt`, не использовать keyword list и не начинать формулировку с “Обложка/Обкладинка”, если можно назвать саму сущность: модель, серию, раздел, FAQ, поиск или тему статьи.

`seo_image_sizes` — необязательный override для head-preload главного контентного изображения. Поле нужно только тогда, когда первое видимое `seo-image` на странице использует нестандартный `sizes`. Если его не задать, [lcp-image-preload.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/lcp-image-preload.html) использует проектный default для `.main`: `(min-width: 1198px) 1150px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)`.

Если у служебной, taxonomy или иной системной страницы нет собственного `image`, helper `page-image.html` использует root `cover.webp` как общий meaningful fallback.

Для page bundle и section bundle использовать относительный путь:

```yaml
image: "cover.webp"
cover:
  image: "cover.webp"
  alt: "Каталог крісел Aerocool в Україні"
  relative: true
  hiddenInSingle: true
```

Если первое видимое `seo-image` не использует проектный default `sizes`, добавить отдельное поле на верхнем уровне front matter:

```yaml
seo_image_sizes: "(min-width: 848px) 800px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)"
```

Для служебных страниц, которые переиспользуют чужую или root-картинку, использовать абсолютный site path и `relative: false`:

```yaml
image: "/cover.webp"
cover:
  image: "/cover.webp"
  alt: "Пошук по сайту Aerocool"
  relative: false
  hiddenInSingle: true
```

## Терминология И Написание

- В видимом тексте, `title`, `description`, `summary`, `alt`, пунктах FAQ и внутренних ссылках использовать единое написание технических терминов.
- Для механизма наклона текущий стандарт проекта — `Synchronous Tilt`.
- Не возвращать нижнерегистровое написание этого термина, даже если он используется внутри украинского или русского текста.
- Slug и URL можно оставлять в нижнем регистре по SEO/URL-паттерну, например `what-is-synchronous-tilt`.
- В видимом теле страниц `content/**/*.md` не использовать обратные кавычки для inline-code.
- Если нужно выделить точное техническое обозначение, характеристику, SKU/MPN/GTIN, размер, рейтинг или значение из таблицы, использовать обычный жирный формат: `**11D**`, `**SYNC5 multi-adjustable**`, `**75 мм**`.
- Широкие коммерческие SEO-фразы вроде `игровое кресло`, `офисное кресло`, `компьютерное кресло`, `кресло для работы`, `home office` писать обычным текстом или, если нужен визуальный акцент, обычным жирным выделением.
- Не переносить это правило на шаблонный код Hugo/JS в `layouts/` и документационные примеры вне `content/`: там обратные кавычки могут быть частью кода или пояснения.

## 1. Главная Страница `content/_index.md` и `content/_index.ru.md`

```yaml
---
title: ""
h1: ""          # сейчас не влияет на видимый H1 главной; hero и заголовок живут в home-hero.html
description: ""
summary: ""     # необязательно, но желательно для связанных блоков
date: 2026-03-19
lastmod: 2026-04-30
image: "cover.webp"
cover:
  image: "cover.webp"
  alt: "Aerocool Україна: каталог крісел серій SKY, WING і XTAL"
  relative: true
  hiddenInSingle: true
schema_types: ["website", "organization", "brand"]
---
```

`title`, `description`, `summary` и `image` для главной по-прежнему задаются через front matter. Но видимый `H1` и hero-изображение на текущем этапе живут в едином shortcode `layouts/_shortcodes/home-hero.html`, а не в универсальном helper-слое.
`breadcrumbs` на главной не указывается: home не нуждается в одноэлементном `BreadcrumbList`.

## 2. Страница О Бренде `content/about/index.md` и `index.ru.md`

```yaml
---
title: ""
linkTitle: ""
h1: ""          # необязательно
description: ""
summary: ""     # желательно
date: 2025-08-05T10:00:00+03:00
lastmod: 2026-04-30
slug: "about"
image: "cover.webp"
cover:
  image: "cover.webp"
  alt: "Aerocool в Україні: бренд, каталог крісел і сервісна підтримка"
  relative: true
  hiddenInSingle: true
schema_types: ["website", "organization", "brand", "about-page", "breadcrumbs"]
---
```

Для проекта `Aerocool` страница `/about/` обычно должна иметь `10000+` знаков основного текста на каждую языковую версию. Этот объем нужен не для общей биографии, а для доверия: официальный статус, связь с брендом, специализация в креслах, сервисная модель, гарантии, консультация, внутренняя перелинковка в каталог, FAQ и контакты.

Дата из `date` и дата обновления из `lastmod` остаются служебными SEO/schema-данными, но видимая meta-строка под `H1` на `/about/` не выводится. Страница бренда не должна выглядеть как блоговая запись с временем чтения, количеством слов или автором.

## 3. Контакты `content/contact/index.md` и `index.ru.md`

```yaml
---
title: ""
linkTitle: ""
h1: ""          # необязательно
description: ""
summary: ""
date: 2025-08-05T10:00:00+03:00
lastmod: 2026-04-30
slug: "contact"
image: "cover.webp"
cover:
  image: "cover.webp"
  alt: "Контакти Aerocool Україна для консультації з вибору крісла"
  relative: true
  hiddenInSingle: true
schema_types: ["website", "organization", "contact-page", "breadcrumbs"]
---
```

Для `/contact/` видимая meta-строка не выводится. Контакты должны сразу вести к способам связи, консультации, доставке, гарантии и сервису, а не показывать блоговые признаки вроде даты публикации, времени чтения, количества слов или автора.

## 4. Поиск `content/search.md` и `content/search.ru.md`

```yaml
---
title: ""
h1: ""               # необязательно
layout: "search"
description: ""
summary: ""
date: 2025-08-05T10:00:00+03:00
lastmod: 2026-04-30
slug: "search"
placeholder: ""
schema_types: ["website", "organization", "breadcrumbs"]
image: "/cover.webp"
cover:
  image: "/cover.webp"
  alt: "Пошук по сайту Aerocool"
  relative: false
  hiddenInSingle: true
robotsNoIndex: true
---
```

`/search/` в текущем проекте — служебная страница и должна оставаться `noindex,nofollow`. Для `layout: "search"` JSON-LD не рендерится, даже если `schema_types` заполнен для общей совместимости front matter. Пока проект временно собирается с `HUGO_ENVIRONMENT = "development"`, все HTML-страницы также получают `noindex,nofollow`; перед production-переходом нужно отдельно проверить возврат `index,follow` для индексируемых страниц.

## 5. Листинги `content/articles/_index.md`, `content/news/_index.md`, `content/products/_index.md` и локализованные пары

```yaml
---
title: ""
linkTitle: ""
h1: ""          # необязательно
description: ""
date: 2026-03-19
lastmod: 2026-04-30
summary: ""
image: "cover.webp"
cover:
  image: "cover.webp"
  alt: "Каталог крісел Aerocool в Україні"
  relative: true
  hiddenInSingle: true
schema_types: ["website", "collection", "organization", "breadcrumbs"]
---
```

Для хабов `/products/`, `/articles/` и `/news/` целевой ориентир проекта — `7000+` знаков основного текста на каждую языковую версию. Такой текст должен объяснять структуру раздела, помогать выбрать следующий шаг, усиливать внутреннюю перелинковку и не дублировать карточки товаров, статьи или новости.

У самих хабов `/products/`, `/articles/` и `/news/` meta-строка под `H1` не выводится. В карточках листинга meta-строку получает только дочерний материал, если он является статьей или новостью: статья показывает дату и время чтения, новость показывает только дату.

## 6. Страница Серии `content/products/<series>/_index.md` и `_index.ru.md`

```yaml
---
title: ""
linkTitle: ""
h1: ""          # необязательно
description: ""
date: 2026-03-19
lastmod: 2026-04-30
summary: ""
slug: "<series>"
image: "cover.webp"
cover:
  image: "cover.webp"
  alt: "Серія Aerocool <SERIES> з ергономічними кріслами"
  relative: true
  hiddenInSingle: true
schema_types: ["website", "collection", "organization", "breadcrumbs"]
---
```

Для страниц серий `cover.image` нужен, если серия выводится карточкой внутри родительского каталога `/products/`. В текущем проекте это рекомендованный паттерн для `SKY`, `WING` и `XTAL`: `image` остается источником для SEO/OG/schema, а `cover.image` дает preview в листинге. `alt` должен быть локализован под язык страницы.

Для проекта `Aerocool` страница серии обычно должна иметь `6000+` знаков основного текста на каждую языковую версию. Добор объема должен раскрывать позиционирование серии, отличия от соседних серий, варианты внутри линейки, сценарии выбора и переходы в конкретные модели.

На страницах серий видимая meta-строка не выводится. Серия — это каталоговая посадочная страница, поэтому под `H1` не должно быть даты, времени чтения, количества слов, автора или списка переводов.

## 7. Статья `content/articles/<slug>/index.md` и `index.ru.md`

```yaml
---
title: ""
linkTitle: ""
h1: ""          # необязательно
description: ""
summary: ""
date: 2026-04-22T10:00:00+03:00
lastmod: 2026-04-30T10:00:00+03:00
slug: "<slug>"
image: "01-front.png"
cover:
  image: "01-front.png"
  alt: "Тема статті Aerocool <TOPIC>"
  relative: true
  hiddenInSingle: true
schema_types: ["website", "article", "organization", "breadcrumbs"]
---
```

Текущий стандарт для статей — локальная обложка `01-front.png` в папке страницы, `image + cover.image` во front matter и вывод изображения через shortcode `seo-image` в начале тела. Если `image`, `cover.image` и `seo-image src` совпадают, а `cover.hiddenInSingle: true`, главный image preload выводится в `<head>`. Если первое `seo-image` использует нестандартный `sizes`, добавить такой же `seo_image_sizes` во front matter. Fallback на `images/default-article.jpg` допустим только как запасной сценарий, если локальной обложки действительно нет.
Для проекта `Aerocool` основная постоянно актуальная статья обычно должна иметь `10000+` знаков основного текста на каждую языковую версию.
Добор до `10000+` знаков должен быть редакционным, а не механическим: добавлять сценарии выбора, критерии, сравнения, практические проверки, FAQ и полезные внутренние ссылки.
`description` и `summary` у статьи должны помогать покрывать не только бренд, но и релевантный широкий кластер: `игровое кресло`, `офисное кресло`, `компьютерное кресло`, `кресло для работы`, `home office`.

Видимая meta-строка статьи выводит дату публикации и время чтения. Количество слов, автор организации и список переводов не выводятся. Если статья обновлялась по существу, дата обновления видна в редакционном блоке, а `datePublished` и `dateModified` остаются согласованными в JSON-LD.

## 8. Новость `content/news/<slug>/index.md` и `index.ru.md`

```yaml
---
title: ""
linkTitle: ""
h1: ""          # необязательно
description: ""
summary: ""
date: 2026-04-22T10:00:00+03:00
lastmod: 2026-04-30T10:00:00+03:00
slug: "<slug>"
image: "01-front.png"
cover:
  image: "01-front.png"
  alt: "Новина Aerocool про <MODEL/SERIES>"
  relative: true
  hiddenInSingle: true
schema_types: ["website", "news", "organization", "breadcrumbs"]
---
```

Для проекта `Aerocool` новость, которая поддерживает ранжирование, обычно должна иметь `5000+` знаков тела на каждую языковую версию.
Добор до `5000+` знаков должен раскрывать инфоповод, сценарии выбора, модели, материалы, коммерческую значимость и следующий шаг, а не превращать новость в псевдостатейный SEO-текст.
Если новость используется как SEO-посадочная страница для серии, модели или запуска, поле `summary` нужно заполнять обязательно.
Если у новости есть локальная обложка в папке страницы, текущий стандарт проекта — использовать ее как `image`, дублировать в `cover.image` для preview и выводить в начале тела через shortcode `seo-image`. Если `image`, `cover.image` и `seo-image src` совпадают, а `cover.hiddenInSingle: true`, главный image preload выводится в `<head>`. Если первое `seo-image` использует нестандартный `sizes`, добавить такой же `seo_image_sizes` во front matter.

Видимая meta-строка новости выводит только дату публикации. Время чтения, количество слов, автор организации и список переводов для новости не выводятся, потому что для новостного интента важнее свежесть события и переход к актуальным сериям, товарам или FAQ.

## 9. Товар `content/products/<series>/<model>/index.md` и `index.ru.md`

```yaml
---
title: ""
linkTitle: ""
h1: ""          # необязательно
description: ""
summary: ""
date: 2026-04-22T10:00:00+03:00
lastmod: 2026-04-30T10:00:00+03:00
slug: "<slug>"
categories: ["<series>"]
tags: ["aerocool", "<series>", "<variant>"]
image: "<image-file>"
cover:
  image: "<image-file>"
  alt: "Крісло Aerocool <MODEL>"
  relative: true
  hiddenInSingle: true
schema_types: ["website", "product", "organization", "breadcrumbs"]
price: 0
sku: "<SKU>"
review_target_id: "<stable-review-id>" # одинаковый для uk/ru версии одного товара
reviews_enabled: false                  # включать true только после подключения review partials
availability: InStock
priceValidUntil: 2027-12-31
warranty: 12
mpn: "<MPN>"           # необязательно
gtin13: "<GTIN13>"     # необязательно
return_days: 14        # необязательно
return_method: "https://schema.org/ReturnByMail" # необязательно
return_fees: "https://schema.org/FreeReturn"     # необязательно
shipping_country: "UA"       # необязательно
shipping_rate: 0             # необязательно
shipping_currency: "UAH"     # необязательно
shipping_handling_min: 0     # необязательно
shipping_handling_max: 1     # необязательно
shipping_transit_min: 1      # необязательно
shipping_transit_max: 3      # необязательно
payment_methods:             # необязательно
  - "https://schema.org/Cash"
  - "https://schema.org/CreditCard"
rating:
  value: 4.8
  count: 10       # legacy-поле: не использовать как долгосрочный источник Product JSON-LD
---
```

`image` отвечает за SEO/OG/schema, а `cover.image` — за preview-карточки в листингах. Для большинства product pages в текущем проекте нужны оба поля сразу. Если `image`, `cover.image` и `seo-image src` совпадают, а `cover.hiddenInSingle: true`, главный product image preload выводится в `<head>`. Если первое `seo-image` использует нестандартный `sizes`, добавить такой же `seo_image_sizes` во front matter.

Для проекта `Aerocool` товарная страница обычно должна иметь `6000+` знаков основного текста на каждую языковую версию. Добор объема должен объяснять назначение модели, сценарии использования, материалы, регулировки, отличия от альтернатив, FAQ, сервисные условия и следующий коммерческий шаг.

На товарных страницах видимая meta-строка не выводится. Дата, время чтения, количество слов и автор отвлекают от выбора модели, характеристик, условий покупки и консультации. `date` и `lastmod` при этом остаются во front matter для служебных сценариев и schema.

Не добавлять параметр `jsonld` в shortcode `seo-image`: `ImageObject` собирается централизованно из front matter `image`.

Для товарных страниц единый источник правды по merchant product facts — front matter конкретной страницы. Это относится к `price`, `sku`, `mpn`, `gtin13`, `availability`, `priceValidUntil`, `warranty`, `return_days`, `return_method`, `return_fees`, `shipping_country`, `shipping_rate`, `shipping_currency`, `shipping_handling_min`, `shipping_handling_max`, `shipping_transit_min`, `shipping_transit_max` и `payment_methods`.

Владелец бизнес-значений — команда Aerocool Украина. Она подтверждает цену, наличие, гарантию, доставку, возврат, оплату, SKU, MPN, GTIN и срок актуальности цены. Контент-редактор или Codex вносит подтвержденные значения в front matter и синхронизирует видимый товарный текст. По состоянию на `2026-05-07` значение `priceValidUntil: 2027-12-31` подтверждено для текущих товарных цен.

[layouts/_partials/_schema/product.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/product.html) читает merchant facts из front matter и строит `Offer`, `OfferShippingDetails`, `MerchantReturnPolicy`, `acceptedPaymentMethod` и `WarrantyPromise`. Видимый коммерческий блок товарной страницы и `/faq/` должны подтверждать эти же значения, но не являются первичным источником. Если меняется цена, наличие, SKU, GTIN, гарантия, доставка, возврат или оплата, сначала обновлять product front matter, затем в том же изменении синхронизировать видимый product copy и `/faq/`, если это изменение policy-wide. Сам partial менять нужно только при изменении schema mapping или добавлении новых полей.

`review_target_id` — стабильный ID объекта отзывов. Для украинской и русской версии одного товара он должен быть одинаковым. Лучше использовать человекочитаемый slug модели, например `sky-lite`, а не URL. Это защищает отзывы от потери связи при изменении адреса страницы.

`reviews_enabled` включает будущий видимый блок отзывов на странице. Пока review partials и build-time export не подключены, поле можно подготовить как `false`. Включать `true` нужно только тогда, когда страница уже умеет показывать approved отзывы из `data/generated/reviews.json`.

Поля `rating.value` и `rating.count` остаются legacy-риском текущего этапа. Целевая SEO-first архитектура описана в [17-netlify-database-reviews.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/17-netlify-database-reviews.md): рейтинг должен приходить не из front matter, а из approved отзывов в `Netlify Database`, выгруженных на build в `data/generated/reviews.json` и видимо показанных на странице.

Если рейтинг или количество отзывов не подтверждены реальными approved отзывами, их нельзя выводить в `AggregateRating` и нельзя усиливать дополнительной `Review`-разметкой.

## 10. FAQ `content/faq/index.md` и `index.ru.md`

```yaml
---
title: "Часто задаваемые вопросы (FAQ) — Aerocool"
linkTitle: "FAQ"
h1: ""          # необязательно
description: "FAQ Aerocool в Украине: серии SKY, WING и XTAL, материалы Racer, Loft Air и Mesh, 7D, 8D, 11D, Synchronous Tilt, гарантия, доставка, оплата, возврат, сборка и выбор кресла для работы и гейминга."
summary: "Практичный FAQ о креслах Aerocool: серии, материалы, настройки, сервис и помощь с выбором."
date: 2025-08-05T10:00:00+03:00
lastmod: 2026-04-30
slug: "faq"
image: "cover.webp"
cover:
  image: "cover.webp"
  alt: "FAQ Aerocool в Украине о сериях, доставке, оплате и гарантии"
  relative: true
  hiddenInSingle: true
schema_types: ["website", "faq", "organization", "breadcrumbs"]
faq:
  - question: "Aerocool.ua — это официальный сайт бренда в Украине?"
    answer: "Да. Aerocool.ua — официальный сайт Aerocool в Украине. Здесь собраны актуальные серии SKY, WING и XTAL, а также гайды, FAQ, новости и контакты."
  - question: "Чем отличаются серии SKY, WING и XTAL?"
    answer: "Если коротко, SKY больше подходит для ежедневной работы и home office. WING стоит выбирать, когда нужны более активная поддержка спины и более широкие возможности настройки. XTAL подойдет тем, кто ищет более спокойную эргономику, Synchronous Tilt и конструкцию со сменными элементами."
  - question: "Какая гарантия на кресла Aerocool?"
    answer: "Для актуальных моделей на сайте указана гарантия 12 месяцев. Точный срок также дублируется на странице каждой конкретной модели."
---
```

Для FAQ-страницы в текущем проекте `faq:` — это канонический источник вопросов и ответов. Видимый FAQ берется из этого массива через [layouts/_shortcodes/faq-list.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/faq-list.html), который выводится в [layouts/faq/single.html](/Users/stadnyk/MEGA/Aerocool/layouts/faq/single.html), а `FAQPage` schema читает тот же массив через [layouts/_partials/_schema/faq.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/faq.html).

В markdown-теле FAQ-страницы сейчас нужен не второй полный экземпляр вопросов, а только supporting-контент и точка вывода FAQ:

- сначала короткий лид без `# H1`;
- затем `{{< faq-list >}}`;
- затем блок внутренних ссылок на каталог, серии, статьи и контакты.

Если на FAQ-странице используется длинный формат на `30+` вопросов, он должен оставаться:

- синхронным между `uk` и `ru`;
- подтвержденным текущим контентом сайта;
- связанным с реальными сериями, материалами, механикой и сервисом проекта.

Если точные сервисные данные на сайте еще не раскрыты, не нужно добавлять их в FAQ “на всякий случай”. Это особенно касается оплаты, возврата, сборки, рассрочки, параметров роста/веса и любых обещаний, которые нельзя подтвердить текущим контентом.

FAQ в проекте должен читаться как нормальный редакционный текст, а не как механическая подборка шаблонных ответов. Даже если основа готовилась с помощью AI, финальный вариант обязан пройти литературную и фактическую редактуру.

На FAQ-странице видимая meta-строка не выводится. FAQ — evergreen-справка, поэтому дата публикации, время чтения, количество слов, автор и список переводов не должны появляться под `H1`.

## Важно

1. Всегда использовать `schema_types`, а не `schema_type`.
2. `lastmod` обновляется при любом содержательном изменении страницы.
3. Для `uk` и `ru` версии факты, структура аргумента и коммерческий интент должны совпадать; меняются язык, локальные ссылки и естественные формулировки.
4. Для статей и новостей не оставлять пустое `image`.
5. Для товаров с несколькими цветами или материалами держать отдельный `slug` и отдельную папку под вариант.
6. Поле `keywords` не добавлять вручную во front matter.
7. Для FAQ-страницы канонический массив вопросов и ответов хранится в `faq:`; layout и schema читают его напрямую.
8. `404` и служебные alias-страницы — это служебные страницы шаблонного слоя, а не типы контента в `content/`.
9. Если `h1` не нужен, поле можно не заполнять: шаблонный слой автоматически возьмет `title`.
10. Если `title` длинный, добавлять короткий `linkTitle`, чтобы видимые breadcrumbs и `BreadcrumbList` оставались навигационными, а не повторяли SEO-заголовок.
11. Для страниц с JSON-LD обычно указывать `website`, чтобы `WebSite` и связи `isPartOf` оставались явными в графе.
12. Видимую meta-строку не настраивать вручную в markdown: правила живут в `layouts/_partials/page-meta.html`.
13. Для статей meta-строка показывает дату публикации и время чтения; для новостей — только дату публикации; для contact, FAQ, about, products, серий, товаров и служебных страниц она скрыта.
14. Переводы не выводить в контентной зоне под `H1`; пользователь переключает язык через шапку сайта.
