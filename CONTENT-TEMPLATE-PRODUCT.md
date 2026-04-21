# Product Page Template

Использовать для новых страниц товаров в `content/products/<series>/<model>/index.md` и `index.ru.md`.

## Front Matter

```yaml
---
title: "Эргономичное кресло Aerocool <MODEL>"
description: "Купить Aerocool <MODEL> в Украине — эргономичное кресло серии <SERIES> с <KEY_FEATURE_1>, <KEY_FEATURE_2> и <CORE_USE_CASE>."
summary: "Aerocool <MODEL> — кресло серии <SERIES> с <ADJUSTABILITY>, <SURFACE_TYPE> и эргономикой для <USE_CASE>."
date: 2026-04-21T10:00:00+03:00
lastmod: 2026-04-21T10:00:00+03:00
schema_types: ["product", "organization", "breadcrumbs"]
slug: "<slug>"
categories: ["<series>"]
tags: ["aerocool", "эргономичное кресло", "<series>", "<variant>"]
image: "<image-file>"
price: 0
sku: "<SKU>"
warranty: 12
availability: InStock
priceValidUntil: 2027-12-31
mpn: "<MPN>"             # optional
gtin13: "<GTIN13>"       # optional
return_days: 14          # optional
shipping_country: "UA"   # optional
rating:
  value: 4.8
  count: 10
---
```

## Body Structure

```md
{{< seo-image 
  src="<image-file>"
  width="1920"
  height="1080"
  alt="Кресло Aerocool <MODEL> — краткое точное описание"
  title="Aerocool <MODEL> — краткий SEO-friendly title"
  loading="eager"
  preload=true
  fetchpriority=high
  class="w-full rounded-2xl shadow-xl"
  sizes="100vw"
  jsonld=true
/>}}

## Aerocool <MODEL> — короткое позиционирование модели

**Aerocool <MODEL>** — это ...

## Ключевые преимущества

- ...
- ...
- ...

## Кому подойдет

- ...
- ...
- ...

## Точные характеристики

- Модель: ...
- Общая регулировка: ...
- Подголовник: ...
- Каркас: ...
- Поверхность: ...
- Внутренний материал: ...
- Спинка: ...
- Поясничная поддержка: ...
- Подлокотники: ...
- Механизм: ...
- Сиденье: ...
- Тип наклона: ...
- Фиксация: ...
- Сопротивление спинки: ...
- Газлифт: ...
- База: ...
- Ролики: ...
- Вес изделия: ...

## Чем эта версия отличается внутри серии

...

## Полезные статьи по теме

- [...]
- [...]

## Новости и анонсы Aerocool

- [...]
- [...]

## Что еще посмотреть

- [Вся серия](<SERIES_URL>)
- [Каталог](<CATALOG_URL>)
- [Контакты](<CONTACT_URL>)

## Вывод

...
```

Для `index.md` используем локальные URL вида `/products/...`, `/contact/`. Для `index.ru.md` используем `/ru/products/...`, `/ru/contact/`. Если shortcode `seo-image` вставляется и в перевод, на translated page ставим `jsonld=false`.

## Editorial Rules

- Не выдумывать характеристики, которые не подтверждены производителем.
- Не путать `Racer`, `Loft Air`, `Mesh`.
- Не писать общий рекламный текст без конкретики.
- В `description` и `summary` упоминать реальные differentiators.
- Внутри текста раскрывать не только “что есть”, но и “кому это подходит”.
- Если доступны `mpn`, `gtin13`, `return_days`, `shipping_country`, заполнять их во front matter, потому что product schema их уже поддерживает.
