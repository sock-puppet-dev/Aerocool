{{- if eq .File.ContentBaseName "_index" -}}
---
title: ""
date: {{ .Date }}
lastmod: {{ .Date }}
description: ""
summary: ""
schema_types: ["website", "collection", "organization", "breadcrumbs"]
image: "cover.webp"
cover:
  image: "cover.webp"
  alt: ""
  relative: true
  hiddenInSingle: true
---

{{- else -}}
---
title: ""
date: {{ .Date }}
lastmod: {{ .Date }}
slug: ""
description: ""
summary: ""
schema_types: ["website", "product", "organization", "breadcrumbs"]
categories: [""]
tags: [""]
image: "cover.webp"
cover:
  image: "cover.webp"
  alt: ""
  relative: true
  hiddenInSingle: true
price: 0
sku: ""
mpn: ""
gtin13: ""
warranty: 12
availability: InStock
priceValidUntil: ""
rating:
  value: 0
  count: 0
---

{{- end -}}
