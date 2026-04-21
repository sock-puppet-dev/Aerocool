{{- if eq .File.ContentBaseName "_index" -}}
---
title: ""
slug: "articles"
date: {{ .Date }}
lastmod: {{ .Date }}
description: ""
summary: ""
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
schema_types: ["article", "organization", "breadcrumbs"]
categories: [""]
tags: [""]
image: "cover.webp"
---

# {{ replace .Name "-" " " | title }}
{{- end -}}

