# Руководство По Полям Метаданных Страницы

В проекте `Aerocool` использовать только поле `schema_types`. Поле `schema_type` не используется.

## Главное Правило По Заголовкам

- `title` обязателен и отвечает за SEO-заголовок документа.
- `h1` необязателен и нужен только тогда, когда видимый заголовок страницы должен отличаться от `title`.
- Для большинства страниц видимый `H1` рендерит шаблонный слой по правилу `.Params.h1 | default .Title`.
- Исключение на текущий момент — главная страница: ее hero и видимый `H1` задаются в `layouts/_shortcodes/home-content-section.html` и `layouts/_shortcodes/home-content-section-ru.html`.
- В теле markdown не добавлять `# H1`; контент начинается с лида или с `##`.

## 1. Главная Страница `content/_index.md` и `content/_index.ru.md`

```yaml
---
title: ""
h1: ""          # сейчас не влияет на видимый H1 главной; hero и заголовок живут в home-content-section*.html
description: ""
summary: ""     # необязательно, но желательно для связанных блоков
date: 2026-03-19
lastmod: 2026-04-22
image: "cover.webp"
schema_types: ["website", "organization", "brand", "breadcrumbs"]
---
```

`title`, `description`, `summary` и `image` для главной по-прежнему задаются через front matter. Но видимый `H1` и hero-изображение на текущем этапе живут в локализованных home-shortcodes, а не в универсальном helper-слое.

## 2. Страница О Бренде `content/about/index.md` и `index.ru.md`

```yaml
---
title: ""
h1: ""          # необязательно
description: ""
summary: ""     # желательно
date: 2025-08-05T10:00:00+03:00
lastmod: 2026-04-22
slug: "about"
image: "cover.webp"
schema_types: ["organization", "brand", "breadcrumbs"]
---
```

## 3. Контакты `content/contact/index.md` и `index.ru.md`

```yaml
---
title: ""
h1: ""          # необязательно
description: ""
summary: ""
date: 2025-08-05T10:00:00+03:00
lastmod: 2026-04-22
slug: "contact"
image: "cover.webp"
schema_types: ["organization", "breadcrumbs"]
---
```

## 4. Поиск `content/search.md` и `content/search.ru.md`

```yaml
---
title: ""
h1: ""               # необязательно
layout: "search"
description: ""
summary: ""
date: 2025-08-05T10:00:00+03:00
lastmod: 2026-04-22
slug: "search"
placeholder: ""
schema_types: ["organization", "breadcrumbs"]
image: "cover.webp"
robotsNoIndex: true
---
```

`/search/` в текущем проекте — служебная страница и должна оставаться `noindex,nofollow`.

## 5. Листинги `content/articles/_index.md`, `content/news/_index.md`, `content/products/_index.md` и локализованные пары

```yaml
---
title: ""
h1: ""          # необязательно
description: ""
date: 2026-03-19
lastmod: 2026-04-22
summary: ""
image: "cover.webp"
schema_types: ["collection", "organization", "breadcrumbs"]
---
```

## 6. Страница Серии `content/products/<series>/_index.md` и `_index.ru.md`

```yaml
---
title: ""
h1: ""          # необязательно
description: ""
date: 2026-03-19
lastmod: 2026-04-22
summary: ""
slug: "<series>"
image: "cover.webp"
schema_types: ["collection", "organization", "breadcrumbs"]
---
```

## 7. Статья `content/articles/<slug>/index.md` и `index.ru.md`

```yaml
---
title: ""
h1: ""          # необязательно
description: ""
summary: ""
date: 2026-04-22T10:00:00+03:00
lastmod: 2026-04-22T10:00:00+03:00
slug: "<slug>"
image: "images/default-article.jpg"
schema_types: ["article", "organization", "breadcrumbs"]
---
```

Если у статьи есть собственная обложка в папке страницы (`page bundle`), поле `image` можно указывать на локальный файл из этой папки вместо статического изображения по умолчанию.
Для проекта `Aerocool` основная постоянно актуальная статья обычно должна иметь `10000+` знаков основного текста на каждую языковую версию.
`description` и `summary` у статьи должны помогать покрывать не только бренд, но и релевантный широкий кластер: `игровое кресло`, `офисное кресло`, `компьютерное кресло`, `кресло для работы`, `home office`.

## 8. Новость `content/news/<slug>/index.md` и `index.ru.md`

```yaml
---
title: ""
h1: ""          # необязательно
description: ""
summary: ""
date: 2026-04-22T10:00:00+03:00
lastmod: 2026-04-22T10:00:00+03:00
slug: "<slug>"
image: "01-front.png"
cover:
  image: "01-front.png"
  alt: "Обложка новости про Aerocool <MODEL/SERIES>"
  relative: true
  hiddenInSingle: true
schema_types: ["news", "organization", "breadcrumbs"]
---
```

Для проекта `Aerocool` новость, которая поддерживает ранжирование, обычно должна иметь `5000+` знаков тела на каждую языковую версию.
Если новость используется как SEO-посадочная страница для серии, модели или запуска, поле `summary` нужно заполнять обязательно.
Если у новости есть локальная обложка в папке страницы, текущий стандарт проекта — использовать ее как `image`, дублировать в `cover.image` для preview и выводить в начале тела через shortcode `seo-image`.

## 9. Товар `content/products/<series>/<model>/index.md` и `index.ru.md`

```yaml
---
title: ""
h1: ""          # необязательно
description: ""
summary: ""
date: 2026-04-22T10:00:00+03:00
lastmod: 2026-04-22T10:00:00+03:00
slug: "<slug>"
categories: ["<series>"]
tags: ["aerocool", "<series>", "<variant>"]
image: "<image-file>"
cover:
  image: "<image-file>"
  alt: "Кресло Aerocool <MODEL>"
  relative: true
  hiddenInSingle: true
schema_types: ["product", "organization", "breadcrumbs"]
price: 0
sku: "<SKU>"
availability: InStock
priceValidUntil: 2027-12-31
warranty: 12
mpn: "<MPN>"           # необязательно
gtin13: "<GTIN13>"     # необязательно
return_days: 14        # необязательно
shipping_country: "UA" # необязательно
rating:
  value: 4.8
  count: 10
---
```

Если на переведенной товарной странице используется shortcode `seo-image`, для `index.ru.md` ставить `jsonld=false`.
`image` отвечает за SEO/OG/schema, а `cover.image` — за preview-карточки в листингах. Для большинства product pages в текущем проекте нужны оба поля сразу.

## 10. FAQ `content/faq/index.md` и `index.ru.md`

```yaml
---
title: "Часто задаваемые вопросы (FAQ) — Aerocool"
h1: ""          # необязательно
description: "Ответы на ключевые вопросы о сериях SKY, WING и XTAL, гарантии, материалах, synchronous tilt, доставке и подборе кресел Aerocool."
summary: "FAQ по выбору серии, материалов, гарантии, доставке и консультациям Aerocool."
date: 2025-08-05T10:00:00+03:00
lastmod: 2026-04-22
slug: "faq"
image: "cover.webp"
schema_types: ["faq", "organization", "breadcrumbs"]
faq:
  - question: "Какая гарантия на кресла Aerocool?"
    answer: "Для актуальных моделей на сайте гарантийный срок составляет 12 месяцев. Точный срок гарантии также указан на странице конкретной модели."
---
```

## Важно

1. Всегда использовать `schema_types`, а не `schema_type`.
2. `lastmod` обновляется при любом содержательном изменении страницы.
3. Для `uk` и `ru` версии факты должны совпадать; меняются язык и локальные ссылки.
4. Для статей и новостей не оставлять пустое `image`.
5. Для товаров с несколькими цветами или материалами держать отдельный `slug` и отдельную папку под вариант.
6. Поле `keywords` не добавлять вручную во front matter.
7. FAQ во front matter должен совпадать с видимым FAQ на странице.
8. `404` и служебные alias-страницы — это служебные страницы шаблонного слоя, а не типы контента в `content/`.
9. Если `h1` не нужен, поле можно не заполнять: шаблонный слой автоматически возьмет `title`.
