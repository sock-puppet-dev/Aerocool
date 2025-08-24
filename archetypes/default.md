---
# Заголовок страницы (формируется из имени файла: дефисы → пробелы, с заглавной буквы)
title: "{{ replace .Name "-" " " | title }}"
# Дата создания и последнего изменения
date: "{{ .Date }}"
lastmod: "{{ .Date }}"
# Черновик? false — страница публикуется
draft: false
# Язык страницы (uk/ru)
lang: "{{ .Site.Language.Lang }}"  # используем .Site.Language.Lang для единообразия
# Ключ перевода для мультиязычности
translationKey: "{{ .Name }}"
# Мета-описание для SEO — заполняется вручную
description: "Краткое описание страницы {{ .Name }} для поисковых систем"
# ЧПУ (slug) — часть URL страницы
slug: "{{ .Name | urlize }}"
# Канонический URL для SEO — заполняется вручную
canonicalURL: ""

# Настройки отображения
showToc: false
hidemeta: false
comments: false
showBreadCrumbs: true
showPostNavLinks: true

# Параметры обложки страницы
cover:
  image: "/images/default-cover.webp"
  alt: "Обложка страницы {{ .Name }}"
  caption: "Подпись к странице {{ .Name }}"
  relative: true
  hidden: false

# JSON-LD Schema.org для поисковых систем
schema:
  type: WebPage
  name: "{{ replace .Name "-" " " | title }}"
  description: "Краткое описание страницы {{ .Name }} для поисковых систем"
  mainEntityOfPage: "/{{ .Site.Language.Lang }}/{{ .Type }}/{{ .Name | urlize }}/"
  inLanguage: "{{ .Site.Language.Lang }}"   # добавлено для мультиязычности
  url: "/{{ .Site.Language.Lang }}/{{ .Name | urlize }}/"
# PWA (Progressive Web App)
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

