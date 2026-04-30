{{- if eq .File.ContentBaseName "_index" -}}
---
title: ""
slug: "articles"
date: {{ .Date }}
lastmod: {{ .Date }}
description: ""
summary: ""
schema_types: ["website", "collection", "organization", "breadcrumbs"]
image: "cover.webp"
---

{{- else -}}
---
title: ""
date: {{ .Date }}
lastmod: {{ .Date }}
slug: ""
description: ""
summary: ""
schema_types: ["website", "article", "organization", "breadcrumbs"]
categories: [""]
tags: [""]
image: "01-front.png"
cover:
  image: "01-front.png"
  alt: ""
  relative: true
  hiddenInSingle: true
---

{{- end -}}
