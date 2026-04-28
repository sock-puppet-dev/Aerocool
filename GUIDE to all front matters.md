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
Добор до `10000+` знаков должен быть редакционным, а не механическим: добавлять сценарии выбора, критерии, сравнения, практические проверки, FAQ и полезные внутренние ссылки.
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
Добор до `5000+` знаков должен раскрывать инфоповод, сценарии выбора, модели, материалы, коммерческую значимость и следующий шаг, а не превращать новость в псевдостатейный SEO-текст.
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
description: "FAQ Aerocool в Украине: серии SKY, WING и XTAL, материалы Racer, Loft Air и Mesh, 7D, 8D, 11D, synchronous tilt, гарантия, доставка, оплата, возврат, сборка и выбор кресла для работы и гейминга."
summary: "Практичный FAQ о креслах Aerocool: серии, материалы, настройки, сервис и помощь с выбором."
date: 2025-08-05T10:00:00+03:00
lastmod: 2026-04-28
slug: "faq"
image: "cover.webp"
schema_types: ["faq", "organization", "breadcrumbs"]
faq:
  - question: "Aerocool.ua — это официальный сайт бренда в Украине?"
    answer: "Да. Aerocool.ua — официальный сайт Aerocool в Украине. Здесь собраны актуальные серии SKY, WING и XTAL, а также гайды, FAQ, новости и контакты."
  - question: "Чем отличаются серии SKY, WING и XTAL?"
    answer: "Если коротко, SKY больше подходит для ежедневной работы и home office. WING стоит выбирать, когда нужны более активная поддержка спины и более широкие возможности настройки. XTAL подойдет тем, кто ищет более спокойную эргономику, synchronous tilt и конструкцию со сменными элементами."
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
