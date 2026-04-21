Использовать в проекте только поле `schema_types`. Поле `schema_type` в текущем `Aerocool` не используется.

1. Главная страница `content/_index.md` и `content/_index.ru.md`

```yaml
---
title: ""
description: ""
date: 2026-03-19
lastmod: 2026-04-21
image: "cover.webp"
schema_types: ["website", "organization", "brand", "breadcrumbs"]
---
```

2. About `content/about/index.md` и `index.ru.md`

```yaml
---
title: ""
description: ""
date: 2025-08-05T10:00:00+03:00
lastmod: 2026-04-21
summary: ""
slug: "about"
image: "cover.webp"
schema_types: ["organization", "brand", "breadcrumbs"]
---
```

3. Contact `content/contact/index.md` и `index.ru.md`

```yaml
---
title: ""
description: ""
date: 2025-08-05T10:00:00+03:00
lastmod: 2026-04-21
summary: ""
slug: "contact"
image: "cover.webp"
schema_types: ["organization", "breadcrumbs"]
---
```

4. Search `content/search.md` и `content/search.ru.md`

```yaml
---
title: ""
description: ""
date: 2025-08-05T10:00:00+03:00
lastmod: 2026-04-21
slug: "search"
schema_types: ["organization", "breadcrumbs"]
---
```

5. Листинги `content/articles/_index.md`, `content/news/_index.md`, `content/products/_index.md` и локализованные пары

```yaml
---
title: ""
description: ""
date: 2026-03-19
lastmod: 2026-04-21
summary: ""
image: "cover.webp"
schema_types: ["collection", "organization", "breadcrumbs"]
---
```

6. Страница серии `content/products/<series>/_index.md` и `_index.ru.md`

```yaml
---
title: ""
description: ""
date: 2026-03-19
lastmod: 2026-04-21
summary: ""
slug: "<series>"
image: "cover.webp"
schema_types: ["collection", "organization", "breadcrumbs"]
---
```

7. Статья `content/articles/<slug>/index.md` и `index.ru.md`

```yaml
---
title: ""
description: ""
summary: ""
date: 2026-04-21T10:00:00+03:00
lastmod: 2026-04-21T10:00:00+03:00
slug: "<slug>"
image: "images/default-article.jpg"
schema_types: ["article", "organization", "breadcrumbs"]
---
```

Если у статьи есть собственная обложка в page bundle, поле `image` можно указывать на локальный файл bundle вместо статического default image.

8. Новость `content/news/<slug>/index.md` и `index.ru.md`

```yaml
---
title: ""
description: ""
summary: ""
date: 2026-04-21T10:00:00+03:00
lastmod: 2026-04-21T10:00:00+03:00
slug: "<slug>"
image: "images/default-news.jpg"
schema_types: ["news", "organization", "breadcrumbs"]
---
```

9. Товар `content/products/<series>/<model>/index.md` и `index.ru.md`

```yaml
---
title: ""
description: ""
summary: ""
date: 2026-04-21T10:00:00+03:00
lastmod: 2026-04-21T10:00:00+03:00
slug: "<slug>"
categories: ["<series>"]
tags: ["aerocool", "<series>", "<variant>"]
image: "<image-file>"
schema_types: ["product", "organization", "breadcrumbs"]
price: 0
sku: "<SKU>"
availability: InStock
priceValidUntil: 2027-12-31
warranty: 12
mpn: "<MPN>"          # optional
gtin13: "<GTIN13>"    # optional
return_days: 14       # optional
shipping_country: "UA" # optional
rating:
  value: 4.8
  count: 10
---
```

10. FAQ `content/faq/index.md` и `index.ru.md`

```yaml
---
title: "Часті запитання (FAQ) — Aerocool"
description: "Відповіді на ключові запитання про серії SKY, WING і XTAL, гарантію, матеріали, synchronous tilt, доставку та підбір крісел Aerocool."
summary: "FAQ про вибір серії, матеріалів, гарантію, доставку та консультації Aerocool."
date: 2025-08-05T10:00:00+03:00
lastmod: 2026-04-21
slug: "faq"
image: "cover.webp"
schema_types: ["faq", "organization", "breadcrumbs"]
faq:
  - question: "Яка гарантія на крісла Aerocool?"
    answer: "Для актуальних моделей на сайті гарантійний строк становить 12 місяців. Точний гарантійний термін також зазначений на сторінці конкретної моделі."
---
```

Важно:
1. Всегда использовать `schema_types`, не `schema_type`.
2. `lastmod` обновляется при любом содержательном изменении страницы.
3. Для `uk` и `ru` версии факты должны совпадать, меняется язык и локальные ссылки.
4. Для статей и новостей не оставлять пустое `image`.
5. Для товаров с несколькими цветами или материалами держать отдельный `slug` и отдельную папку на вариант.
6. Поле `keywords` не добавлять вручную в front matter.
7. FAQ в front matter должен совпадать с видимым FAQ на странице.
