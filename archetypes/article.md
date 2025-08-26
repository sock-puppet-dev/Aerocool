---
title: "{{ replace .Name "-" " " | title }}"
date: "{{ .Date }}"
lastmod: "{{ .Date }}"
draft: false
author: "Aerocool Advanced Technologies Corp."
url: "/{{ .Site.Language.Lang }}/articles/{{ .Name | urlize }}/"
tags: []
categories: []
robots: '{{ if .Draft }}noindex, nofollow{{ else }}index, follow{{ end }}'
summary: ""
image: ""
articleSection: '{{ if eq .Site.Language.Lang "uk" }}Статті{{ else if eq .Site.Language.Lang "ru" }}Статьи{{ end }}'
lang: "{{ .Site.Language.Lang }}"
translationKey: "{{ .Name }}"
description: "{{ .Summary }}"
keywords: []
slug: "{{ .Name | urlize }}"
canonicalURL: "https://aerocool.ua/{{ .Site.Language.Lang }}/articles/{{ .Name | urlize }}/"
hreflang:
  - lang: "ru"
    url: "https://aerocool.ua/ru/articles/{{ .Name | urlize }}/"
  - lang: "uk"
    url: "https://aerocool.ua/uk/articles/{{ .Name | urlize }}/"

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
  image: "/images/articles/{{ .Name }}/cover.webp"
  alt: "{{ .Summary }}"
  caption: "Подпись к изображению статьи {{ .Name }}"
  image_width: ""
  image_height: ""
  loading: "lazy"

schema:
  "@type": "Article"
  "@id": "https://aerocool.ua/{{ .Site.Language.Lang }}/articles/{{ .Name | urlize }}/#article"
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
  mainEntityOfPage: "https://aerocool.ua/{{ .Site.Language.Lang }}/articles/{{ .Name | urlize }}/"
  articleSection: '{{ if eq .Site.Language.Lang "uk" }}Статті{{ else if eq .Site.Language.Lang "ru" }}Статьи{{ end }}'
  inLanguage: "{{ .Site.Language.Lang }}"
  keywords: []
  mainEntity:
    - "@type": "Question"
      name: ""
      acceptedAnswer:
        "@type": "Answer"
        text: ""
    - "@type": "Question"
      name: ""
      acceptedAnswer:
        "@type": "Answer"
        text: ""

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
  url: "https://github.com/Dmytro-Stadnyk/Aerocool/content/{{ .Site.Language.Lang }}/articles/{{ .Name }}.md"
  text: '{{ if eq .Site.Language.Lang "uk" }}Запропонувати зміни{{ else if eq .Site.Language.Lang "ru" }}Предложить изменения{{ end }}'
  appendFilePath: true
---