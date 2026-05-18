# Руководство по Core Web Vitals 2026 для Aerocool

Обновлено: 2026-05-17.

Этот документ собирает в одном месте правила Core Web Vitals для проекта `Aerocool Ukraine`: что проверять, какие пороги считать хорошими, где искать причины просадки и как исправлять типовые проблемы на Hugo / Netlify / Tailwind CSS 4 сайте.

Связанные документы:

- [quality/13-unlighthouse-site-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/13-unlighthouse-site-audit.md) — массовый Lighthouse-аудит по сайту.
- [quality/14-lighthouse-single-page-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/14-lighthouse-single-page-audit.md) — точечный Lighthouse-аудит одной страницы.
- [content/06-seo-image-shortcode.md](/Users/stadnyk/MEGA/Aerocool/docs/content/06-seo-image-shortcode.md) — правила изображений в page bundle.
- [seo/27-google-seo-audit-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/27-google-seo-audit-checklist-2026.md) — общий SEO-аудит для сильного ранжирования в Google.
- [seo/28-ssg-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/28-ssg-seo-checklist-2026.md) — общий SSG SEO-чеклист.
- [deploy/16-netlify-routing.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/16-netlify-routing.md) — Netlify redirects, headers и cache notes.

Официальные источники:

- Google Search Central: https://developers.google.com/search/docs/appearance/core-web-vitals
- Google Page Experience: https://developers.google.com/search/docs/appearance/page-experience
- web.dev LCP optimization: https://web.dev/articles/optimize-lcp
- web.dev INP optimization: https://web.dev/articles/optimize-inp
- web.dev CLS optimization: https://web.dev/optimize-cls
- web.dev TTFB optimization: https://web.dev/articles/optimize-ttfb
- web.dev Fetch Priority: https://web.dev/articles/fetch-priority
- web.dev responsive image preload: https://web.dev/articles/preload-responsive-images

## 1. Главная Идея

Core Web Vitals — это не декоративная оценка Lighthouse. Это набор пользовательских метрик, которые показывают, насколько быстро страница показывает главный контент, насколько быстро отвечает на действия и насколько стабильно держит layout.

Актуальные основные метрики:

| Метрика | Что измеряет | Хороший уровень Google | Строгая цель Aerocool |
|---|---|---:|---:|
| `LCP` | скорость показа главного контента | ≤ 2.5 s | ≤ 2.0 s, лучше ≤ 1.5 s |
| `INP` | отзывчивость на пользовательские действия | ≤ 200 ms | ≤ 150 ms, лучше ≤ 100 ms |
| `CLS` | визуальная стабильность layout | ≤ 0.1 | 0 или почти 0 |

Поддерживающие метрики:

| Метрика | Зачем нужна | Рабочая цель |
|---|---|---:|
| `TTFB` | насколько быстро сервер начал отдавать HTML | ≤ 0.8 s |
| `FCP` | когда появился первый видимый контент | ≤ 1.8 s, лучше ≤ 1.5 s |
| `TBT` | lab-сигнал блокировки main thread, полезен для INP | чем ниже, тем лучше |
| `Speed Index` | визуальная скорость загрузки | чем ниже, тем лучше |

Важно: `FID` больше не считать основной метрикой Core Web Vitals. Для отзывчивости использовать `INP`.

## 2. Как CWV Связаны С Ранжированием Google

Core Web Vitals помогают ранжированию, но не заменяют релевантность, качество контента, доверие, structured data и ссылки.

Для проекта `Aerocool` правильная формула такая:

```text
Полезная страница
+ правильная индексация
+ хорошая mobile page experience
+ зеленые Core Web Vitals
+ сильный контент под интент
+ понятные entity/schema связи
+ доверие и коммерческие факты
= больше шансов на сильные позиции
```

Нельзя обещать первую позицию только из-за хороших CWV. Но в конкурентной выдаче медленная, дергающаяся или плохо отвечающая страница почти всегда проигрывает сильной странице с хорошим UX.

## 3. Полевые И Лабораторные Данные

Есть два типа данных.

| Тип | Где смотреть | Что означает |
|---|---|---|
| Полевые данные | Search Console, PageSpeed Insights, Chrome UX Report | реальные пользователи, обычно 28-дневное окно |
| Лабораторные данные | Lighthouse, Unlighthouse, DevTools | контролируемый тест здесь и сейчас |

Для SEO важнее полевые данные, но для исправлений удобнее лабораторные данные.

Правильный порядок:

1. В Search Console смотреть группы URL с плохими `LCP`, `INP`, `CLS`.
2. В PageSpeed Insights открыть конкретный URL и сравнить полевые данные с лабораторными.
3. В Unlighthouse проверить, повторяется ли проблема на типах страниц.
4. В Lighthouse/DevTools разобрать одну проблемную страницу глубоко.
5. Исправить шаблон, CSS, JS, изображение или Netlify headers.
6. Проверить лабораторные данные сразу.
7. Проверить полевые данные после накопления новых реальных данных.

Пока Netlify намеренно собирает сайт в `development/noindex`, финальный SEO-indexability аудит не считается завершенным. Но технические CWV и Lighthouse-проверки все равно полезны для Deploy Preview и опубликованного URL.

## 4. Какие URL Проверять

Минимальный набор для CWV после важных правок:

| Тип страницы | URL-примеры | Почему важна |
|---|---|---|
| Главная | `/`, `/ru/` | hero, LCP, главный вход |
| Каталог | `/products/`, `/ru/products/` | листинг, карточки, изображения |
| Серия | `/products/<series>/`, `/ru/products/<series>/` | длинный SEO-текст и список товаров |
| Товар | `/products/<series>/<model>/`, `/ru/products/<series>/<model>/` | LCP product image, schema, коммерческий CTA |
| Статья | `/articles/<slug>/`, `/ru/articles/<slug>/` | длинный текст, изображения, внутренние ссылки |
| Новость | `/news/<slug>/`, `/ru/news/<slug>/` | обложка, дата, видимый контент |
| FAQ | `/faq/`, `/ru/faq/` | контентный хаб и schema |
| Contact | `/contact/`, `/ru/contact/` | доверие и локальный UX |
| Search | `/search/`, `/ru/search/` | JS, noindex, интерактивность |
| 404 | `/404.html` | служебная страница, noindex |

Для `search` и `404` SEO score может быть намеренно нецелевым, но Performance, Accessibility и Best Practices все равно должны быть чистыми.

## 5. Инструменты

| Инструмент | Когда использовать |
|---|---|
| Search Console Core Web Vitals report | после production-публикации и накопления field data |
| PageSpeed Insights | для связки field + lab по конкретному URL |
| Chrome UX Report | если нужно проверить реальные данные по origin или URL |
| Unlighthouse | регулярная массовая проверка шаблонов и типов страниц |
| Lighthouse | точечная диагностика одной проблемной страницы |
| Chrome DevTools Performance | поиск long tasks, layout shifts, render delays |
| DevTools Network | LCP resource, TTFB, cache, image weight |
| Rich Results Test / Schema Validator | не CWV-инструменты, но запускать рядом для SEO-релиза |

Основной рабочий инструмент проекта — `unlighthouse/`. Но Unlighthouse не заменяет Search Console и PageSpeed Insights, потому что не показывает реальные пользовательские field data.

## 6. Практика Работы С LCP

`LCP` отвечает на вопрос: когда пользователь увидел главный элемент страницы.

Чаще всего LCP-элемент на Aerocool:

- hero image главной страницы;
- product image на товарной странице;
- cover image в статье или новости;
- крупный `H1` / hero text, если изображение не является самым крупным элементом;
- карточка или баннер первого экрана на листинге.

### Как Диагностировать LCP

1. Открыть URL в PageSpeed Insights.
2. Найти `Largest Contentful Paint element`.
3. Сравнить mobile и desktop.
4. Если проблема повторяется, открыть Lighthouse report.
5. В DevTools Network проверить HTML, CSS, JS, image request, cache и размер LCP-ресурса.
6. В DevTools Performance проверить render delay.

LCP состоит из четырех частей:

| Часть | Что означает | Где чинить |
|---|---|---|
| `TTFB` | ожидание первого байта HTML | Netlify/CDN/cache/build output |
| Resource load delay | браузер поздно начал грузить LCP-ресурс | head preload, HTML order, CSS/JS blockers |
| Resource load duration | сам ресурс грузится долго | WebP, правильный `sizes`, размер изображения, CDN |
| Element render delay | ресурс уже есть, но элемент поздно рисуется | CSS, JS, fonts, layout |

### Исправления LCP Для Aerocool

| Проблема | Что делать |
|---|---|
| LCP image lazy-loaded | Для первого экрана ставить `loading="eager"` |
| LCP image низкого приоритета | Для единственного главного изображения ставить `fetchpriority="high"` |
| LCP image поздно обнаруживается | Использовать `preload=true` только для главной картинки первого экрана; для article/news/product он выводится в `<head>` |
| Слишком тяжелое изображение | Использовать WebP output из `seo-image`, правильные размеры, responsive `srcset`; AVIF добавлять отдельным pipeline, если он реально нужен |
| Нет `sizes` | Задать `sizes` под реальную ширину рендера |
| CSS блокирует отрисовку | Убирать лишние правила, держать Tailwind purge через Hugo paths |
| JS блокирует первый экран | Не добавлять тяжелые скрипты в head, держать JS минимальным |
| Глобальный `prefetch` страниц меню | Не prefetch-ить навигационные HTML-страницы из `<head>`: это добавляет лишние загрузки до LCP и может ухудшать mobile lab-аудит |
| Большой search index | Не preload-ить `index.json` в `<head>` search-страницы; deferred search JS может загрузить индекс после первичного рендера |
| Шрифты задерживают текстовый LCP | Использовать ограниченное число шрифтов, `font-display: swap`, осторожный preload |
| Плохой TTFB | Проверить Netlify headers/cache, размер HTML и внешние зависимости |

### Где В Проекте Смотреть LCP

| Поверхность | Файл |
|---|---|
| Главная hero | `layouts/_shortcodes/home-hero.html` |
| Product/article image shortcode | `layouts/_shortcodes/seo-image.html` |
| Правила shortcode | `docs/content/06-seo-image-shortcode.md` |
| Cover/listing image | `layouts/_partials/cover.html` |
| CSS первого экрана | `assets/css/main.css` |
| Security/cache headers | `netlify.toml` |
| Netlify routing notes | `docs/deploy/16-netlify-routing.md` |

Правило: на одной странице должен быть только один настоящий LCP preload. Не preload-ить все изображения подряд.

## 7. Практика Работы С INP

`INP` отвечает на вопрос: насколько быстро страница реагирует на действия пользователя.

Для статического Hugo-сайта главные риски обычно не в framework hydration, а в точечных JS-участках:

- поиск;
- меню;
- view transitions;
- service worker registration;
- analytics или сторонние скрипты;
- тяжелые обработчики клика/скролла;
- большие long tasks на main thread.

### Как Диагностировать INP

1. В Search Console найти URL-группу с плохим `INP`.
2. В PageSpeed Insights посмотреть field data.
3. В Lighthouse смотреть `TBT` как lab-подсказку, но не путать его с `INP`.
4. В DevTools Performance записать взаимодействия: открыть меню, нажать CTA, использовать search, перейти по ссылке.
5. Найти long tasks, expensive event handlers и layout recalculation.

### Исправления INP Для Aerocool

| Проблема | Что делать |
|---|---|
| Длинный JS-task | Разбить работу на меньшие задачи |
| Тяжелый search JS | Индексировать только нужное, debounce input, не пересчитывать DOM на каждый символ без лимита |
| Обработчик делает layout thrashing | Разнести чтение и запись layout, не дергать размеры в цикле |
| Слишком много listeners | Делегировать события там, где это упрощает DOM |
| View transitions тормозят | Проверить `assets/js/site.js` и `docs/architecture/04-browser-view-transitions.md` |
| Сторонний скрипт тормозит main thread | Удалить, отложить или заменить |
| Большой bundle | Не добавлять framework/runtime без реальной нужды |

Где смотреть:

- `assets/js/site.js`
- `layouts/search.html`
- partials, которые подключают scripts
- `netlify.toml`, если проблема связана с headers/service worker

Правило: если JS не нужен для первого пользовательского действия, он не должен мешать первому пользовательскому действию.

## 8. Практика Работы С CLS

`CLS` отвечает на вопрос: двигается ли страница после того, как пользователь начал ее видеть.

Для Aerocool целевая цель — `0` или почти `0`.

### Типовые Причины CLS

| Причина | Что делать |
|---|---|
| Изображение без размеров | Всегда задавать `width` и `height` или стабильный aspect ratio |
| Cover/product image поздно меняет размер | Проверить `cover.image`, `seo-image`, CSS контейнера |
| Font swap меняет высоту строк | Использовать аккуратные font stacks, `font-display: swap`, не перегружать шрифты |
| Поздно вставленный баннер | Резервировать место заранее или не вставлять над контентом |
| JS меняет высоту первого экрана | Не делать layout mutation до/над основным контентом |
| Cards/listing прыгают при загрузке изображений | Фиксировать aspect ratio карточек |
| Header/menu меняет размер после загрузки | Держать стабильные размеры nav и кнопок |

### Где В Проекте Смотреть CLS

| Поверхность | Файл |
|---|---|
| Content images | `layouts/_shortcodes/seo-image.html` |
| Product/listing cover | `layouts/_partials/cover.html` |
| Home hero | `layouts/_shortcodes/home-hero.html` |
| Global CSS/layout | `assets/css/main.css` |
| Content usage | `content/**/*.md` |

Правило: каждый визуальный блок, который грузится асинхронно, должен иметь заранее известное место в layout.

## 9. Изображения И CWV

Изображения — главная зона риска для LCP и CLS.

В текущей реализации `seo-image` для `jpg` / `jpeg` / `png` / `webp` генерирует `<picture>` с WebP `srcset` и fallback `<img>` в исходном формате. Для типовых `article`, `news` и `product` страниц, где `image` во front matter совпадает с первым `seo-image`, а `cover.hiddenInSingle: true`, LCP preload выводится в `<head>` через `layouts/_partials/_seo/lcp-image-preload.html`.

Важно: preload в `<head>` должен использовать тот же `sizes`, что и первое видимое изображение. Если у первого `seo-image` нестандартный `sizes`, задайте такой же `seo_image_sizes` во front matter.

Для главного изображения первого экрана:

```md
{{< seo-image
  src="01-front.png"
  width="2000"
  height="2000"
  alt="Кресло Aerocool SKY 360 — эргономичная модель с 11D регулировкой"
  title="Aerocool SKY 360"
  loading="eager"
  preload=true
  fetchpriority=high
  class="w-full rounded-2xl"
  sizes="(min-width: 1198px) 1150px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)"
/>}}
```

Для вторичных изображений:

```md
{{< seo-image
  src="wing-mesh-side.png"
  width="800"
  height="600"
  alt="Вид сбоку кресла Aerocool WING Mesh Black"
  title="Aerocool WING Mesh Black — вид сбоку"
  loading="lazy"
  preload=false
  fetchpriority=auto
  class="mx-auto w-full max-w-[800px] rounded-xl"
  sizes="(min-width: 848px) 800px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)"
/>}}
```

Правила:

1. `width` и `height` обязательны.
2. `loading="eager"` только для изображения первого экрана.
3. `preload=true` только для главного LCP-кандидата.
4. `fetchpriority=high` только для главного LCP-кандидата.
5. `lazy` для всех вторичных изображений.
6. `alt` и `title` локализовать для `uk` и `ru`.
7. Не использовать `jsonld` в shortcode: schema image берется из front matter `image`.
8. `sizes="100vw"` не использовать для контентной колонки, если изображение не занимает весь viewport. Для full-width картинки внутри текущего `.main` использовать проектный `sizes` из примера.
9. AVIF сейчас не генерируется Hugo pipeline проекта; текущий рабочий слой — WebP + fallback. AVIF добавлять только отдельным pipeline, если для него есть реальная задача.

## 10. CSS, Tailwind И Шрифты

Для CWV важны не только изображения.

CSS-правила:

- основной CSS источник — `assets/css/main.css`;
- design tokens и component-layer править сначала там;
- не возвращать широкие `!important`-хаки;
- не добавлять тяжелые декоративные слои ради визуального эффекта;
- держать стабильные размеры fixed-format блоков: grids, cards, toolbar, counters, nav;
- не создавать layout, где hover/loading/text меняет размеры соседних элементов.

Tailwind-правила:

- Tailwind остается npm-зависимостью проекта;
- standalone Tailwind CLI не использовать;
- не переносить шаблоны/контент в новые директории без проверки scan paths и Hugo build stats;
- после больших CSS/HTML правок запускать сборку и Unlighthouse.

Fonts:

- не подключать лишние семьи и веса;
- проверять FCP/LCP после изменений шрифтов;
- использовать `font-display: swap`, если подключаются web fonts;
- font preload использовать только если он реально ускоряет первый экран.

## 11. Netlify, Кэш И TTFB

Для статического Hugo-сайта `TTFB` обычно должен быть сильной стороной.

Если `TTFB` плохой:

1. Проверить, что аудит смотрит правильный production или Deploy Preview URL.
2. Проверить, нет ли VPN/content blocker/расширений в окружении.
3. Проверить headers и cache rules в `netlify.toml`.
4. Проверить, не грузится ли страница через redirect chain.
5. Проверить размер HTML и количество blocking resources.
6. Сравнить mobile и desktop в PageSpeed Insights.

Важно: локальный `hugo server` не равен Netlify CDN. Финальный `TTFB` смотреть на опубликованном URL.

## 12. Команды Проверки

Базовая сборка:

```bash
npm run build
```

Production-сборка:

```bash
npm run build:production
```

Проверка Unlighthouse configs:

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm run check:types
```

Ключевые URL:

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm run audit:ci:urls
```

Strict audit:

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm run audit:ci:strict
```

Deploy Preview:

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
UNLIGHTHOUSE_PREVIEW_URL="https://deploy-preview-123--example.netlify.app" npm run audit:ci:preview
```

Одна страница через Lighthouse:

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
./node_modules/.bin/lighthouse https://aerocool.ua/products/xtal/racer-black/ --view
```

Если менялись `static/_redirects`, `netlify.toml` headers или 404/routing, дополнительно смотреть [deploy/16-netlify-routing.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/16-netlify-routing.md).

## 13. Что Делать При Провале

### LCP Выше Цели

Проверить:

- какой элемент является LCP;
- lazy/eager/fetchpriority/preload;
- размер и формат LCP image;
- `sizes` и `srcset`;
- CSS render-blocking;
- шрифты;
- TTFB;
- service worker/cache;
- mobile отдельно от desktop.

Обычно первый фикс: привести главное изображение к стандарту `seo-image` или поправить `home-hero`.

### INP Выше Цели

Проверить:

- search input;
- menu;
- CTA;
- view transitions;
- long tasks в DevTools;
- сторонние скрипты;
- большие DOM updates;
- expensive event handlers.

Обычно первый фикс: убрать лишнюю JS-работу из первого взаимодействия и разбить длинные задачи.

### CLS Выше Цели

Проверить:

- изображения без размеров;
- карточки без aspect ratio;
- late banners;
- web fonts;
- header/nav;
- JS layout mutations;
- embedded content.

Обычно первый фикс: добавить стабильные размеры или aspect ratio для проблемного блока.

## 14. Чего Не Делать

- Не гнаться за `100` Lighthouse любой ценой, если это ухудшает контент или UX.
- Не preload-ить все изображения.
- Не lazy-load-ить LCP image.
- Не удалять полезный текст ради скорости.
- Не добавлять отдельный Tailwind watch/standalone CLI.
- Не встраивать inline scripts ради микровыигрыша, если это ослабляет CSP.
- Не оптимизировать только desktop: mobile важнее для реального UX и Google.
- Не считать Unlighthouse заменой Search Console.
- Не считать PageSpeed field data мгновенной проверкой после деплоя: field data обновляются не сразу.

## 15. Чек-Лист CWV Перед Релизом

Для каждой важной страницы:

- [ ] `npm run build` проходит.
- [ ] `npm run build:production` проходит.
- [ ] `cd unlighthouse && npm run check:types` проходит.
- [ ] `npm run audit:ci:urls` проходит для ключевых URL.
- [ ] Перед важным релизом `npm run audit:ci:strict` проходит.
- [ ] Главная проверена в `uk` и `ru`.
- [ ] Один listing, одна серия и один товар проверены в `uk` и `ru`.
- [ ] Одна статья и одна новость проверены в `uk` и `ru`.
- [ ] `search` и `404` проверены как technical/noindex страницы.
- [ ] В Lighthouse нет console errors.
- [ ] LCP image не lazy-loaded.
- [ ] Только один главный LCP preload на странице.
- [ ] Главный LCP preload находится в `<head>`, если страница следует стандарту `image + cover.hiddenInSingle + seo-image`.
- [ ] Все видимые изображения имеют `width` / `height` или стабильный aspect ratio.
- [ ] Вторичные изображения lazy-loaded.
- [ ] Нет layout shifts от header, cards, fonts или late content.
- [ ] Search/menu/view transitions не создают long tasks.
- [ ] Mobile не хуже целевых CWV-порогов.
- [ ] PageSpeed Insights не показывает очевидных CWV-регрессий.
- [ ] После production-перехода Search Console Core Web Vitals monitor включен в регулярный контроль.

## 16. Стандарт 10/10

Для Aerocool считать CWV-контур сильным, если:

| Уровень | Требование |
|---|---|
| Lab critical URLs | Lighthouse Performance 95+ |
| Lab strict/desktop | Lighthouse Performance 98+ |
| Field LCP | ≤ 2.0 s, лучше ≤ 1.5 s |
| Field INP | ≤ 150 ms, лучше ≤ 100 ms |
| Field CLS | 0 или почти 0 |
| TTFB | ≤ 0.8 s |
| Images | responsive, sized, WebP + fallback; AVIF только при отдельном pipeline |
| JS | минимум, без long tasks на критичных действиях |
| CSS | без лишних блокирующих слоев |
| Monitoring | Search Console + PageSpeed + Unlighthouse |

Финальное правило:

> Сначала зеленые реальные CWV. Потом стабильный Lighthouse/Unlighthouse. Потом постоянный мониторинг после production-релиза.
