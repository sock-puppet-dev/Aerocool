---
# Заголовок, формируется из имени файла
title: "{{ replace .Name "-" " " | title }}"
# Дата создания
date: "{{ .Date }}"
# Дата изменения
lastmod: "{{ .Date }}"
# Черновик?
draft: false
# Язык страницы (автоматически)
lang: "{{ .Lang }}"
# Ключ перевода
translationKey: "{{ .Name }}"
# Мета описание
description: ""
# Ключевые слова
keywords: []
# ЧПУ
slug: "{{ .Name }}"
# Канонический URL
canonicalURL: ""
# Оглавление выключено по умолчанию
showToc: false
# Метаданные показывать?
hidemeta: false
# Комментарии выключены
comments: false
# Показывать хлебные крошки
ShowBreadCrumbs: true
# Показывать навигационные ссылки
ShowPostNavLinks: true
# Обложка — дефолтная
cover:
  image: "/images/default-cover.webp"
  alt: ""
  relative: true
  hidden: false
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