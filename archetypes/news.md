{{- if eq .File.ContentBaseName "_index" -}}
---
title: ""
slug: "news"
date: {{ .Date }}
lastmod: {{ .Date }}
description: ""
summary: ""
schema_types: ["collection", "organization", "breadcrumbs"]
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
schema_types: ["news", "organization", "breadcrumbs"]
categories: [""]
tags: [""]
image: "cover.webp"
---

{{- end -}}

