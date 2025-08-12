---
# Заголовок статьи. Формируется из имени файла: дефисы заменяются на пробелы, слова — с заглавной буквы
title: "{{ replace .Name "-" " " | title }}"
# Дата создания статьи (ставится автоматически)
date: {{ .Date }}
# Дата последнего изменения (изначально совпадает с датой создания)
lastmod: {{ .Date }}
# Черновик? false — статья опубликована, true — скрыта
draft: false
# Язык страницы, Hugo подставит "uk" или "ru" в зависимости от папки
lang: "{{ .Lang }}"
# Ключ перевода для связи мультиязычных версий одной статьи
translationKey: "{{ .Name }}"
# Мета описание (короткое, для поисковиков)
description: ""
# Ключевые слова для SEO (список)
keywords: []
# ЧПУ (slug) — часть URL, обычно имя файла
slug: "{{ .Name }}"
# Канонический URL, чтобы избежать дублирования
canonicalURL: ""
# Показывать оглавление (Table of Contents)
showToc: true
# Оглавление открыто по умолчанию
TocOpen: true
# Показывать метаинформацию (автор, дата)
hidemeta: false
# Показывать комментарии под статьёй
comments: false
# Показывать примерное время чтения
ShowReadingTime: true
# Показывать хлебные крошки (навигацию)
ShowBreadCrumbs: true
# Показывать ссылки на соседние статьи (вперед/назад)
ShowPostNavLinks: true
# Показывать количество слов в статье
ShowWordCount: true
# Использовать автоматическое оглавление Hugo
UseHugoToc: true
# Параметры обложки (главного изображения)
cover:
  # Путь к изображению (обычно в папке images/articles/имя-статьи)
  image: "/images/articles/{{ .Name }}/cover.webp"
  # Альтернативный текст для SEO и доступности
  alt: ""
  # Подпись под картинкой
  caption: ""
  # true — путь к картинке относительный
  relative: true
  # false — картинка видна (true — скрыта)
  hidden: false
# JSON-LD (Schema.org) для поисковых систем (расширенный сниппет)
schema:
  # Тип контента — блог-пост
  type: BlogPosting
  # Автор статьи
  author: "Aerocool"
  # Издатель (бренд сайта)
  publisher: "Aerocool"
  # Изображение для сниппета
  image: "/images/articles/{{ .Name }}/cover.webp"
# Настройки PWA (прогрессивного веб-приложения)
pwa:
  # Путь к манифесту приложения
  manifest: "/manifest.webmanifest"
  # Страница офлайн-режима
  offline: "/offline.html"
  # Цвет темы браузера
  themeColor: "#0A0A0A"
  # Цвет фона splash screen
  backgroundColor: "#FFFFFF"
# Параметры кнопки "Редактировать пост"
editPost:
  # Ссылка на репозиторий с контентом
  URL: "https://github.com/<user>/<repo>/content"
  # Текст кнопки (локализация)
  Text: "Запропонувати зміни"
  # true — автоматически добавлять путь к файлу к ссылке
  appendFilePath: true
---
