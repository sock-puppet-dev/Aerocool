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
lang: "{{ .Page.Language.Lang }}"
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
showReadingTime: true
# Хлебные крошки включены
showBreadCrumbs: true
# Навигация между новостями
showPostNavLinks: true
# Количество слов
showWordCount: true
# Обложка новости
cover:
  image: "/images/news/{{ .Name }}/cover.webp"
  alt: "Изображение новости {{ .Name }} для SEO и доступности"
  caption: "Подпись к новости {{ .Name }}"
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
  mainEntityOfPage: "{{ .Permalink }}"
# PWA
pwa:
  manifest: "/manifest.webmanifest"
  offline: "/offline.html"
  themeColor: "#0A0A0A"
  backgroundColor: "#FFFFFF"
# Кнопка редактирования
editPost:
  url: "https://github.com/Dmytro-Stadnyk/Aerocool"
  text: "Запропонувати зміни"
  appendFilePath: true
---
