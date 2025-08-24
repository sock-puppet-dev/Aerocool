---
# Заголовок новости (из имени файла, дефисы → пробелы, слова с заглавной буквы)
title: "{{ replace .Name "-" " " | title }}"
# Дата публикации и последнего изменения
date: "{{ .Date }}"
lastmod: "{{ .Date }}"
# Черновик? false — публикация
draft: false
# Теги и категории
tags: []
categories: []
# Главное изображение (можно оставить пустым для ручного заполнения)
image: ""
# Раздел/категория для Schema.org и внутренней навигации
articleSection: '{{ if eq .Site.Language.Lang "uk" }}Новини{{ else if eq .Site.Language.Lang "ru" }}Новости{{ end }}'
# Язык и мультиязычность
inLanguage: "{{ .Site.Language.Lang }}"
lang: "{{ .Site.Language.Lang }}"
translationKey: "{{ .Name }}"
# Краткое описание новости для SEO
description: ""
# ЧПУ URL (slug)
slug: "{{ .Name | urlize }}"
# Канонический URL
canonicalURL: ""

# Настройки отображения
showToc: false
hidemeta: false
comments: false
showReadingTime: true
showBreadCrumbs: true
showPostNavLinks: true
showWordCount: true

# Параметры обложки новости
cover:
  image: "/images/news/{{ .Name }}/cover.webp"
  alt: "Изображение новости {{ .Name }} для SEO и доступности"
  caption: "Подпись к новости {{ .Name }}"
  relative: true
  hidden: false

# JSON-LD Schema.org для новостей (Google News)
schema:
  type: NewsArticle
  headline: "{{ replace .Name "-" " " | title }}"
  datePublished: "{{ .Date }}"
  dateModified: "{{ .Date }}"
  author: "Aerocool"
  publisher: "Aerocool"
  image: "/images/news/{{ .Name }}/cover.webp"
  mainEntityOfPage: "{{ .Permalink }}"
  articleSection: '{{ if eq .Site.Language.Lang "uk" }}Новини{{ else if eq .Site.Language.Lang "ru" }}Новости{{ end }}'
  inLanguage: "{{ .Site.Language.Lang }}"

# PWA (Progressive Web App)
pwa:
  manifest: "/manifest.webmanifest"
  offline: "/offline.html"
  themeColor: "#0A0A0A"
  backgroundColor: "#FFFFFF"

# Кнопка редактирования поста
editPost:
  url: "https://github.com/Dmytro-Stadnyk/Aerocool/content"
  text: "Запропонувати зміни"
  appendFilePath: true
---