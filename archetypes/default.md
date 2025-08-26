---
title: "{{ replace .Name "-" " " | title }}"
date: "{{ .Date }}"
lastmod: "{{ .Date }}"
draft: false
lang: "{{ .Site.Language.Lang }}"
translationKey: "{{ .Name }}"
description: "{{ .Summary }}"
slug: "{{ .Name | urlize }}"
canonicalURL: "https://aerocool.ua/{{ .Site.Language.Lang }}/{{ .Type | default "pages" }}/{{ .Name | urlize }}/"
robots: '{{ if .Draft }}noindex, nofollow{{ else }}index, follow{{ end }}'

hreflang:
  - lang: "ru"
    url: "https://aerocool.ua/ru/{{ .Type | default "pages" }}/{{ .Name | urlize }}/"
  - lang: "uk"
    url: "https://aerocool.ua/uk/{{ .Type | default "pages" }}/{{ .Name | urlize }}/"

showToc: true
tocOpen: true
hidemeta: false
comments: false
showReadingTime: true
showBreadCrumbs: true
showPostNavLinks: true
showWordCount: true
useHugoToc: true

cover:
  image: "/images/default-cover.webp"
  alt: "{{ .Summary }}"
  caption: "Подпись к изображению статьи {{ .Name }}"
  image_width: ""
  image_height: ""
  loading: "lazy"

markup:
  "@type": "WebPage"
  author:
    "@type": "Organization"
    name: "Aerocool Advanced Technologies Corp."
  publisher:
    "@type": "Organization"
    name: "Aerocool Advanced Technologies Corp."
    logo: "https://aerocool.ua/images/logo.svg"
  image: "/images/articles/{{ .Name }}/cover.webp"
  datePublished: "{{ .Date }}"
  dateModified: "{{ .Date }}"
  headline: "{{ replace .Name "-" " " | title }}" 
  mainEntityOfPage: "https://aerocool.ua/{{ .Site.Language.Lang }}/{{ .Type | default "pages" }}/{{ .Name | urlize }}/"
  articleSection: '{{ if eq .Site.Language.Lang "uk" }}Статті{{ else if eq .Site.Language.Lang "ru" }}Статьи{{ end }}'
  inLanguage: "{{ .Site.Language.Lang }}"
  keywords: []
  url: "https://aerocool.ua/{{ .Site.Language.Lang }}/{{ .Type | default "pages" }}/{{ .Name | urlize }}/"

pwa:
  manifest: "/manifest.webmanifest"
  offline: "/offline.html"
  themeColor: "#0A0A0A"
  backgroundColor: "#FFFFFF"
  short_name: "Aerocool"
  icons:
    - src: "/images/icons/icon-192.png"
      sizes: "192x192"
      type: "image/png"
      purpose: "any maskable"
    - src: "/images/icons/icon-512.png"
      sizes: "512x512"
      type: "image/png"
      purpose: "any maskable"

editPost:
  url: "https://github.com/Dmytro-Stadnyk/Aerocool/content/archetypes/default.md"
  text: '{{ if eq .Site.Language.Lang "uk" }}Запропонувати зміни{{ else if eq .Site.Language.Lang "ru" }}Предложить изменения{{ end }}'
  appendFilePath: true
---

