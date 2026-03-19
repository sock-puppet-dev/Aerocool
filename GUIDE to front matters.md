1️⃣ Главная страница (_index.md)
---
title: ""          		# Название сайта/главной страницы, с ключевыми словами
description: ""    		# Короткое описание сайта, включая ключевые слова
date: 2026-03-19   		# Дата публикации (можно текущую)
lastmod: 2026-03-19 	# Дата последнего изменения
---

2️⃣ About / Контакты / FAQ (страницы категории/информации)
---
title: ""          		# Заголовок страницы
description: ""    		# Описание страницы
date: 2026-03-19   		# Дата создания
lastmod: 2026-03-19 	# Дата последнего обновления
---

3️⃣ Articles List / News List / Products List
---
title: ""          		# Заголовок списка (например, "Статьи о креслах")
description: ""    		# Краткое описание списка
date: 2026-03-19		# Дата создания
lastmod: 2026-03-19		# Дата последнего обновления
summary: ""        		# Краткая версия для анонса (статьи или новости)
---

4️⃣ Article / News Item / Product (single page)
---
title: ""          		# Название статьи/новости/товара
description: ""    		# Подробное описание, включающее ключевые слова
summary: ""        		# Краткая версия для анонса (статьи или новости)
date: 2026-03-19   		# Дата публикации
lastmod: 2026-03-19 	# Дата последнего обновления
slug: ""           		# Контролируемый URL, короткий и понятный
categories: [""]   		# Категории (например, "royal", "releases")
tags: [""]         		# Теги для фильтрации и навигации
---

Примечание по SEO 2026:
1) keywords — не использовать, Google их игнорирует.
2) sitemap.priority и sitemap.changefreq — не использовать, Google их игнорирует.
3) slug — что это и где использовать, когда обязательный: на страницах продуктов, статей, новостей, где нужно контролировать точный URL.
На главной, категориях и FAQ slug обычно не указывают, Hugo сам формирует путь.
4) Для современного SEO не нужно добавлять поле keywords в front matter или в \<head\>. Основной фокус должен быть на:
   1.	Title и Description — включай главные ключевые слова естественно.
   2.	URL/Slug — короткий, понятный, с ключевыми словами.
   3.	Контент страницы — ключевые слова распределены естественно в тексте.
   4.	Alt-теги изображений — особенно для продуктов и статей.
   5.	JSON-LD / Schema.org / Open Graph / Twitter Cards — для структурированных данных и расширенных сниппетов.
5) JSON-LD создается шаблонами отдельно
6) Задача попасть в топ 1 в Search Engine Results Page


Структура контента:

content/
└── products/
    ├── _index.md                
    ├── royal/
    │   ├── _index.md
    │   ├── royal-leatherette.md
    │   ├── royal-aeroweave.md
    │   └── royal-aerosuede.md
    │
    ├── crown-plus/
    │   ├── _index.md
    │   ├── crown-plus-aeroweave.md
    │   ├── crown-plus-leatherette.md
    │   └── crown-plus-aerosuede.md
    │
    ├── crown/
    │   ├── _index.md
    │   ├── crown-aeroweave.md
    │   ├── crown-leatherette.md
    │   └── crown-aerosuede.md
    │
    ├── other/
    │   ├── _index.md
    │   ├── admiral.md
    │   └── guardian.md
    │
    ├── lite/
    │   ├── _index.md
    │   ├── knight-lite.md
    │   ├── duke-lite.md
    │   └── baron-lite.md
    │
    ├── classic/
    │   ├── _index.md
    │   ├── knight.md
    │   ├── earl.md
    │   ├── duke.md
    │   ├── count.md
    │   └── baron.md
    │
    ├── air/
    │   ├── _index.md
    │   ├── ac50c-air.md
    │   ├── ac110-air.md
    │   ├── ac100-air.md
    │   ├── ac40c-air.md
    │   ├── ac80c-air.md
    │   ├── ac120-air.md
    │   ├── ac220-air.md
    │   ├── ac120-air-rgb.md
    │   ├── ac220-air-rgb.md
    │   └── ac60c-air.md
    │
    ├── aero/
    │   ├── _index.md
    │   ├── aero-2-alpha.md
    │   └── aero-1-alpha.md
    │
    └── p7/
        ├── _index.md
        ├── p7-gc1-air.md
        └── p7-gc1-air-rgb.md