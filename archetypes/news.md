---
# Заголовок новости (из имени файла)
title: "{{ replace .Name "-" " " | title }}"
# Дата публикации
date: "{{ .Date }}"
# Дата изменения
lastmod: "{{ .Date }}"
# Черновик?
draft: false
# Язык страницы
lang: "{{ .Lang }}"
# Ключ перевода
translationKey: "{{ .Name }}"
# Краткое описание новости для SEO
description: ""
# Ключевые слова
keywords: []
# ЧПУ URL
slug: "{{ .Name }}"
# Канонический URL
canonicalURL: ""
# Отображать оглавление (нет)
showToc: false
# Показывать метаинформацию
hidemeta: false
# Комментарии выключены
comments: false
# Показ времени чтения
ShowReadingTime: true
# Хлебные крошки включены
ShowBreadCrumbs: true
# Навигация между новостями
ShowPostNavLinks: true
# Количество слов
ShowWordCount: true
# Обложка новости
cover:
  image: "/images/news/{{ .Name }}/cover.webp"
  alt: ""
  caption: ""
  relative: true
  hidden: false
# JSON-LD для NewsArticle (Google News)
schema:
  type: NewsArticle
  headline: "{{ replace .Name "-" " " | title }}"
  datePublished: "{{ .Date }}"
  dateModified: "{{ .Date }}"
  author: "Aerocool"
  publisher: "Aerocool"
  image: "/images/news/{{ .Name }}/cover.webp"
  mainEntityOfPage: ""
# PWA
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
