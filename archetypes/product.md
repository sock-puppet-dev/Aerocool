---
# Название товара (формируется из имени файла)
# Дефисы в имени файла заменяются на пробелы, каждое слово с заглавной буквы
title: "{{ replace .Name "-" " " | title }}"
# Дата создания страницы. Hugo подставит автоматически при создании файла
date: "{{ .Date }}"
# Дата последнего изменения. По умолчанию совпадает с date
lastmod: "{{ .Date }}"
# Черновик? false — страница опубликована, true — скрыта
draft: false
# Язык страницы (для отображения и локализации)
lang: "{{ .Site.Language.Lang }}"
# Язык контента для Schema.org (чтобы поисковики понимали язык товара)
inLanguage: "{{ .Site.Language.Lang }}"
# Ключ для связи мультиязычных версий одной страницы/товара
# Обычно используют имя файла — должно быть уникальным
translationKey: "{{ .Name }}"
# Краткое описание товара для SEO (заполняется вручную)
description: ""
# ЧПУ (slug) — часть URL, обычно имя файла, автоматически urlize
slug: "{{ .Name | urlize }}"
# Канонический URL для SEO, чтобы избежать дублирования
# Заполняется вручную при необходимости
canonicalURL: ""
# Показывать оглавление на странице (для товаров обычно не нужно)
showToc: false
# Показывать метаданные (автор, дата). false — скрыто
hidemeta: false
# Комментарии на странице. false — выключено
comments: false
# Показывать примерное время чтения. Для товаров обычно выключено
showReadingTime: false
# Показывать хлебные крошки (навигация по сайту)
showBreadCrumbs: true
# Показывать ссылки на предыдущий/следующий товар
showPostNavLinks: true
# Показывать количество слов. Для товаров обычно отключено
showWordCount: false
# Категория / секция для Schema.org и внутренней навигации
# Полезно для фильтров и JSON-LD
articleSection: '{{ if eq .Site.Language.Lang "uk" }}Товари{{ else if eq .Site.Language.Lang "ru" }}Товары{{ end }}'
canonicalURL: "/{{ .Site.Language.Lang }}/products/{{ .Name | urlize }}/"

# Параметры обложки товара
cover:
  # Путь к изображению товара (обычно images/products/имя-файла)
  image: "/images/products/{{ .Name }}/cover.webp"
  # Альтернативный текст для SEO и доступности (для экранных читалок)
  alt: "Изображение товара {{ .Name }} для SEO и доступности"
  # Подпись под изображением (видима для читателя)
  caption: "Подпись к товару {{ .Name }}"
  # true — путь относительный, false — абсолютный
  relative: true
  # false — изображение видимо, true — скрыто
  hidden: false

# JSON-LD Schema.org для поисковых систем (Google, Bing и т.д.)
schema:
  # Тип объекта
  type: Product
  # Название товара
  name: "{{ replace .Name "-" " " | title }}"
  # Бренд как объект (рекомендуется для строгого соответствия Schema.org)
  brand:
    "@type": "Brand"
    name: "Aerocool"
  # Изображение товара
  image: "/images/products/{{ .Name }}/cover.webp"
  # Описание товара (оставить пустым для заполнения вручную)
  description: ""
  # Артикул товара (SKU) — заполняется при необходимости
  sku: ""
  # Номер производителя (MPN) — заполняется при необходимости
  mpn: ""
  # mainEntityOfPage указывает, что эта страница является основной для данного продукта
  mainEntityOfPage: "/{{ .Site.Language.Lang }}/products/{{ .Name | urlize }}/"
  # Предложения и цены товара
  offers:
    # Валюта (UAH — гривна)
    priceCurrency: "UAH"
    # Цена — заполняется вручную
    price: ""
    # Наличие товара
    availability: "https://schema.org/InStock"
    # URL товара на сайте
    url: "/{{ .Site.Language.Lang }}/products/{{ .Name | urlize }}/"
    
# Настройки PWA (Progressive Web App)
pwa:
  # Путь к манифесту приложения
  manifest: "/manifest.webmanifest"
  # Страница офлайн-режима
  offline: "/offline.html"
  # Цвет темы браузера (например, в мобильных браузерах)
  themeColor: "#0A0A0A"
  # Цвет фона splash screen при запуске PWA
  backgroundColor: "#FFFFFF"

# Параметры кнопки "Редактировать пост" для пользователей/редакторов
editPost:
  # Ссылка на репозиторий с контентом
  url: "https://github.com/Dmytro-Stadnyk/Aerocool/content"
  # Текст кнопки (можно локализовать)
  text: "Запропонувати зміни"
  # true — автоматически добавлять путь к файлу к ссылке
  appendFilePath: true
---