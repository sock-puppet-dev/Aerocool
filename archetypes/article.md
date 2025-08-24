---
# Заголовок статьи (формируется из имени файла, дефисы → пробелы, с заглавной буквы)
title: "{{ replace .Name "-" " " | title }}"
# Дата создания и последнего изменения
date: "{{ .Date }}"
lastmod: "{{ .Date }}"
# Черновик? false — статья опубликована
draft: false
# Теги и категории (можно заполнить вручную)
tags: []
categories: []
# Главное изображение для статьи
image: ""
# Article section для Schema.org и категорий (мультиязычное)
articleSection: '{{ if eq .Site.Language.Lang "uk" }}Статті{{ else if eq .Site.Language.Lang "ru" }}Статьи{{ end }}'
# Язык статьи
inLanguage: "{{ .Site.Language.Lang }}"
lang: "{{ .Site.Language.Lang }}"
# Используем .Site.Language.Lang вместо .Page.Language.Lang
# Ключ для связи мультиязычных версий
translationKey: "{{ .Name }}"
# Мета-описание (SEO) — заполняется вручную
description: ""
# ЧПУ (slug) — часть URL, автоматически urlize
slug: "{{ .Name | urlize }}"
# Канонический URL (SEO) — заполняется вручную
canonicalURL: ""

# Настройки отображения
showToc: true
tocOpen: true
hidemeta: false
comments: false
showReadingTime: true
showBreadCrumbs: true
showPostNavLinks: true
showWordCount: true
useHugoToc: true

# Параметры обложки
cover:
  image: "/images/articles/{{ .Name }}/cover.webp"
  alt: "Описание изображения статьи {{ .Name }} для SEO и доступности"
  caption: "Подпись к изображению статьи {{ .Name }}"
  relative: true
  hidden: false

# JSON-LD (Schema.org) для поисковых систем
schema:
  type: BlogPosting
  author: "Aerocool"
  publisher: "Aerocool"
  image: "/images/articles/{{ .Name }}/cover.webp"
  datePublished: "{{ .Date }}"
  dateModified: "{{ .Date }}"
  mainEntityOfPage: "{{ .Permalink }}"
  headline: "{{ replace .Name "-" " " | title }}"      # краткий заголовок ≤110 символов
  articleSection: '{{ if eq .Site.Language.Lang "uk" }}Статті{{ else if eq .Site.Language.Lang "ru" }}Статьи{{ end }}'
  inLanguage: "{{ .Site.Language.Lang }}"

# PWA (прогрессивное веб-приложение)
pwa:
  manifest: "/manifest.webmanifest"
  offline: "/offline.html"
  themeColor: "#0A0A0A"
  backgroundColor: "#FFFFFF"

# Кнопка "Редактировать пост"
editPost:
  url: "https://github.com/Dmytro-Stadnyk/Aerocool/content"
  text: "Запропонувати зміни"
  appendFilePath: true
---