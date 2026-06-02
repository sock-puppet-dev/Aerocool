# Production Quality-Gate

Обновлено: 2026-06-02.

Этот документ фиксирует короткий финальный чек перед production-релизом `Aerocool Ukraine`. Он дополняет [13-pagespeed-insights-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/13-pagespeed-insights-audit.md), но не заменяет SEO/schema-проверки.

## 1. Когда Использовать

Использовать перед:

- переносом `dev` в `main`;
- переключением Netlify с `development` на `production`;
- крупным изменением `layouts/`, `assets/`, `static/_redirects`, `netlify.toml`, `hugo.yaml`;
- релизом новых товарных страниц, статей, новостей или серий.

## 2. Локальный Минимум

Перед ручной проверкой опубликованного URL выполнить:

```bash
./scripts/script_check.sh
npm run build:production
```

Если менялись redirects, headers, CSP или 404:

```bash
./scripts/script_netlify_dev.sh
./scripts/script_check_routes.sh
```

## 3. Проверка Published URL

После Netlify deploy проверить:

- главную `/` и `/ru/`;
- `/products/` и `/ru/products/`;
- одну серию в двух языках;
- один товар в двух языках;
- одну статью в двух языках;
- одну новость в двух языках;
- `/faq/`, `/contact/`, `/search/`, `/404.html`;
- sitemap index и языковые sitemap;
- robots meta, canonical, hreflang;
- JSON-LD через `validator.schema.org`;
- PageSpeed Insights для ключевых URL.

## 4. Критерий Готовности

Production-релиз можно считать технически готовым, если:

- локальные проверки проходят;
- Netlify deploy не падает;
- индексируемые страницы в production получают `index,follow`;
- служебные страницы остаются `noindex,nofollow`;
- schema.org validator не показывает ошибок;
- PageSpeed Insights не показывает критических регрессий;
- routing и forced 404 работают на опубликованном URL.

## 5. Что Не Делать

- Не переносить `dev` в `main`, если опубликованный Branch Deploy не проверен вручную.
- Не включать production-индексацию, если sitemap, robots, canonical или hreflang не проверены.
- Не возвращать в проект локальный browser audit runtime без отдельного решения.
