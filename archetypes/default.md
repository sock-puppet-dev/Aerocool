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
lang: "{{ .Page.Language.Lang }}"
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
showBreadCrumbs: true
# Показывать навигационные ссылки
showPostNavLinks: true
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
  url: "https://github.com/<user>/<repo>/content"
  text: "Запропонувати зміни"
  appendFilePath: true
---