# Проверка Через PageSpeed Insights

Обновлено: 2026-06-02.

Этот документ фиксирует текущий стандарт проекта `Aerocool Ukraine`: автоматический браузерный performance-аудит внутри репозитория больше не используется. Для оценки скорости, Core Web Vitals, Accessibility, Best Practices, SEO и PWA использовать внешний сервис [PageSpeed Insights](https://pagespeed.web.dev/).

## 1. Зачем Это Нужно

PageSpeed Insights проще для проекта и владельца сайта:

- не требует локального Chrome в Netlify build environment;
- не добавляет тяжелые npm-зависимости в корневой проект;
- не ломает deploy из-за ошибки внешнего браузерного runtime;
- показывает и лабораторную проверку конкретного URL, и реальные field data, когда они накопятся;
- подходит для ручной production-проверки после каждого важного deploy.

## 2. Что Удалено Из Проекта

В проекте больше нет:

- локального Netlify build plugin для браузерной сводки после deploy;
- отдельной папки массового браузерного аудита;
- npm-зависимостей корневого проекта для запуска Chrome-аудита;
- helper-скрипта для запуска старого URL-аудита.

Netlify теперь должен только собрать и опубликовать Hugo-сайт. Проверка качества опубликованного URL выполняется отдельно через PageSpeed Insights.

## 3. Какие URL Проверять

Минимальный набор после важных правок:

| Тип страницы | URL |
|---|---|
| Главная | `https://aerocool.ua/` и `https://aerocool.ua/ru/` |
| Каталог | `https://aerocool.ua/products/` и `https://aerocool.ua/ru/products/` |
| Серия | одна актуальная серия в `uk` и `ru` |
| Товар | один товар в `uk` и `ru` |
| Статья | одна статья в `uk` и `ru` |
| Новость | одна новость в `uk` и `ru` |
| FAQ | `https://aerocool.ua/faq/` и `https://aerocool.ua/ru/faq/` |
| Contact | `https://aerocool.ua/contact/` и `https://aerocool.ua/ru/contact/` |
| Search | `https://aerocool.ua/search/` и `https://aerocool.ua/ru/search/` |
| 404 | `https://aerocool.ua/404.html` |

Для Branch Deploy проверять тот же набор, но на URL вида `https://dev--hugo-aerocool.netlify.app/`.

## 4. Как Проверять

1. Открыть [https://pagespeed.web.dev/](https://pagespeed.web.dev/).
2. Вставить опубликованный URL страницы.
3. Сначала смотреть mobile-результат.
4. Затем сравнить desktop-результат.
5. Проверить, нет ли console errors, CSP errors, missing resources и явных regressions.
6. Если страница в `development/noindex`, не считать SEO score финальным для indexability.
7. После production-переключения отдельно проверить `index,follow`, sitemap, canonical, hreflang и schema.

## 5. Целевые Ориентиры

Для проекта считать сильным результатом:

| Блок | Цель |
|---|---|
| Performance | `95+`, лучше `99-100` |
| Accessibility | `100` |
| Best Practices | `100` |
| SEO | `100` на production-indexable страницах |
| PWA | `100`, если страница участвует в PWA-контуре |
| LCP | ≤ `2.0 s`, лучше ≤ `1.5 s` |
| INP | ≤ `150 ms`, лучше ≤ `100 ms` |
| CLS | `0` или почти `0` |

Если PageSpeed показывает SEO ниже `100` на `dev` Branch Deploy из-за `noindex`, это ожидаемо. Финальную SEO-оценку считать только после production-переключения.

## 6. Что Делать При Просадке

Если просел `LCP`, сначала проверить:

- какое изображение или блок стал главным элементом первого экрана;
- не включен ли lazy loading для главного изображения;
- есть ли `fetchpriority="high"` у единственного LCP-изображения;
- корректны ли `srcset`, `sizes`, `width`, `height`;
- нет ли лишнего prefetch/preload;
- не блокирует ли CSS или JS первый рендер.

Если просел `INP`, проверить:

- поиск;
- меню;
- view transitions;
- service worker registration;
- тяжелые обработчики клика;
- лишнюю JS-работу до первого взаимодействия.

Если просел `CLS`, проверить:

- размеры изображений;
- aspect ratio карточек;
- header/nav;
- web fonts;
- поздно вставляемые блоки.

## 7. Локальные Проверки До PageSpeed

Перед ручной проверкой опубликованного URL запускать:

```bash
npm run build
npm run build:production
./scripts/script_check.sh
```

Если менялись redirects, headers, CSP или 404:

```bash
./scripts/script_netlify_dev.sh
./scripts/script_check_routes.sh
```

PageSpeed Insights проверяет опубликованный URL, поэтому локальная Hugo-сборка не заменяет ручную проверку.

## 8. Чего Не Делать

- Не возвращать браузерный audit plugin в `netlify.toml` без отдельного решения.
- Не добавлять тяжелые Chrome-аудит зависимости в root `package.json`.
- Не считать `dev` Branch Deploy финальной SEO-indexability проверкой, пока Netlify собирает сайт в `development`.
- Не гнаться за числом `100`, если правка ухудшает контент, UX или конверсию.
