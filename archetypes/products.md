{{- if eq .File.ContentBaseName "_index" -}}
---
title: ""
date: {{ .Date }}
lastmod: {{ .Date }}
description: ""
summary: ""
# Add slug for product series pages like wing / xtal / sky when needed.
# slug: "wing"
schema_types: ["collection", "organization", "breadcrumbs"]
image: "cover.webp"
---

# {{ replace .Type "-" " " | title }}
{{- else -}}
---
title: ""
date: {{ .Date }}
lastmod: {{ .Date }}
slug: ""
description: ""
summary: ""
schema_types: ["product", "organization", "breadcrumbs"]
categories: [""]
tags: [""]
image: "cover.webp"
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

# {{ replace .Name "-" " " | title }}
{{- end -}}
