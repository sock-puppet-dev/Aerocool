---
# Название товара (из имени файла, дефисы → пробелы, заглавные буквы)
title: "{{ replace .Name "-" " " | title }}"
# Дата создания
date: "{{ .Date }}"
# Дата последнего изменения
lastmod: "{{ .Date }}"
# Черновик (false — опубликовано)
draft: false
# Язык страницы (uk/ru)
lang: "{{ .Lang }}"
# Ключ перевода для мультиязычности
translationKey: "{{ .Name }}"
# Краткое описание товара (для SEO)
description: ""
# Ключевые слова (список)
keywords: []
# Слаг (часть URL)
slug: "{{ .Name }}"
# Канонический URL для SEO
canonicalURL: ""
# Показывать оглавление — обычно нет для товаров
showToc: false
# Показывать метаинформацию (false — скрыть)
hidemeta: false
# Комментарии выключены
comments: false
# Показ времени чтения — обычно выключен
ShowReadingTime: false
# Хлебные крошки включены для навигации
ShowBreadCrumbs: true
# Навигация между товарами (следующий/предыдущий)
ShowPostNavLinks: true
# Счётчик слов отключён (не нужно для товаров)
ShowWordCount: false
# Параметры обложки товара
cover:
  # Путь к картинке товара (обычно images/products/имя-файла)
  image: "/images/products/{{ .Name }}/cover.webp"
  alt: ""
  caption: ""
  relative: true
  hidden: false
# JSON-LD Schema.org для товара
schema:
  # Тип объекта — Product
  type: Product
  # Название товара
  name: "{{ replace .Name "-" " " | title }}"
  # Бренд
  brand: "Aerocool"
  # Изображение товара
  image: "/images/products/{{ .Name }}/cover.webp"
  # Описание (оставь пустым для заполнения)
  description: ""
  # Артикул товара (SKU)
  sku: ""
  # Номер производителя (MPN)
  mpn: ""
  # Предложения / цены товара
  offers:
    priceCurrency: "UAH"   # Валюта — гривна
    price: ""              # Цена — заполняй вручную
    availability: "https://schema.org/InStock"  # Наличие товара
    url: ""                # URL товара на сайте
# PWA настройки — такие же, как у статьи
pwa:
  manifest: "/manifest.webmanifest"
  offline: "/offline.html"
  themeColor: "#0A0A0A"
  backgroundColor: "#FFFFFF"
# Кнопка редактирования
editPost:
  URL: "https://github.com/<user>/<repo>/content"
  Text: "Запропонувати зміни"
  appendFilePath: true
---
