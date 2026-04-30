# Финальный SEO-чеклист для SSG-сайта в 2026 году

Этот файл — финальный список элементов для построения SSG-сайта уровня **top SEO**: Hugo, техническое SEO, schema.org, Core Web Vitals, контентная стратегия, entity SEO, E-E-A-T, мониторинг и развитие сайта.

---

## 1. Платформа

| Элемент | Лучший вариант |
|---|---|
| SSG | **Hugo / Astro** |
| Хостинг | **Netlify / Cloudflare Pages / Vercel** |
| CDN | Netlify Edge / Cloudflare CDN |
| CSS | Tailwind CSS |
| Поиск | Pagefind |
| Деплой | GitHub → Netlify / Cloudflare Pages |
| Версионирование | Git + GitHub |
| CI-проверки | Lighthouse CI / HTML validator / link checker |

---

## 2. Техническое SEO

| Элемент | Обязательно |
|---|---|
| Чистый HTML | Да |
| Semantic HTML | Да |
| Правильные `<title>` | Да |
| Уникальные meta description | Да |
| Canonical URL | Да |
| hreflang для мультиязычности | Да |
| sitemap.xml | Да |
| sitemap index | Да, если много страниц |
| robots.txt | Да |
| Чистые URL | Да |
| 301 / 308 redirects | Да |
| 404 page | Да |
| 410 для удалённых страниц | Да |
| noindex для мусорных страниц | Да |
| Pagination SEO | Да |
| Breadcrumbs | Да |
| Open Graph | Да |
| Twitter / X Cards | Да |

---

## 3. Structured Data / Schema.org

| Schema | Для чего |
|---|---|
| WebSite | Весь сайт |
| WebPage | Каждая страница |
| Organization | Компания / официальный сайт |
| Brand | Бренд |
| Product | Товар |
| Offer | Цена / наличие |
| AggregateRating | Рейтинг |
| Review | Отзывы |
| FAQPage | FAQ-блоки |
| BreadcrumbList | Хлебные крошки |
| Article | Статьи блога |
| BlogPosting | Блоговые публикации |
| CollectionPage | Категории |
| ItemList | Списки товаров |
| LocalBusiness | Если есть локальное представительство |
| SearchAction | Поиск по сайту; с 2024-11-21 не дает отдельный sitelinks search box в Google |
| ImageObject | Важные изображения |
| VideoObject | Видео, если есть |
| Person | Автор / эксперт / reviewer |

---

## 4. Архитектура сайта

| Элемент | Обязательно |
|---|---|
| Главная страница | Да |
| Категории | Да |
| Подкатегории | Да, если нужно |
| Страницы товаров | Да |
| Страницы сравнения | Да |
| FAQ-раздел | Да |
| Блог | Да |
| Гайды | Да |
| Glossary / словарь терминов | Очень желательно |
| Страницы “как выбрать” | Да |
| Страницы “лучшие товары” | Да |
| Страницы “товар vs товар” | Да |
| Страницы “бренд vs бренд” | Да |
| About / О компании | Да |
| Contact | Да |
| Delivery / Payment / Warranty | Да |
| Privacy Policy | Да |
| Terms | Да |
| Returns / Refunds | Да |

---

## 5. Контентная SEO-система

| Элемент | Обязательно |
|---|---|
| Keyword research | Да |
| Keyword clustering | Да |
| Search intent mapping | Да |
| Topical map | Да |
| Content calendar | Да |
| Content briefs | Да |
| Unique product descriptions | Да |
| Category SEO text | Да |
| FAQ для каждой категории | Да |
| FAQ для каждого товара | Да |
| Comparison content | Да |
| Buying guides | Да |
| Problem-solving articles | Да |
| Supporting articles | Да |
| Content refresh system | Да |
| Content pruning | Да |
| Проверка duplicate content | Да |
| Проверка cannibalization | Да |

---

## 6. Entity SEO

| Entity | Что нужно сделать |
|---|---|
| Brand entity | Чётко описать бренд |
| Organization entity | Чётко описать компанию |
| Product entity | Связать товары с брендом |
| Author entity | Добавить автора / эксперта |
| Reviewer entity | Добавить проверяющего |
| Category entity | Описать категории как отдельные сущности |
| Country entity | Привязка к Украине / региону |
| Language entity | Украинский / русский |
| SameAs links | Соцсети, официальные профили, Wikidata, если есть |
| About / Mentions | Использовать `about`, `mentions`, `sameAs` в JSON-LD |

---

## 7. Internal Linking

| Элемент | Обязательно |
|---|---|
| Breadcrumbs | Да |
| Related products | Да |
| Related articles | Да |
| Category → product links | Да |
| Product → category links | Да |
| Article → product links | Да |
| Article → category links | Да |
| FAQ → guide links | Да |
| Guide → comparison links | Да |
| Comparison → product links | Да |
| Footer links | Да |
| Contextual anchors | Да |
| HTML sitemap | Желательно |
| Hub pages | Да |
| Topic clusters | Да |

---

## 8. Performance / Core Web Vitals

| Элемент | Обязательно |
|---|---|
| LCP optimization | Да |
| INP optimization | Да |
| CLS optimization | Да |
| Lazy loading images | Да |
| Preload hero image | Да |
| Responsive images | Да |
| AVIF output | Да |
| WebP fallback | Да |
| Correct image dimensions | Да |
| Font optimization | Да |
| Font preload | Да |
| `font-display: swap` | Да |
| Critical CSS | Желательно |
| Minimal JavaScript | Да |
| CDN caching | Да |
| Brotli / gzip | Да |
| HTTP/2 или HTTP/3 | Да |
| Lighthouse 95–100 | Да |
| Real field data monitoring | Да |

---

## 9. Изображения

| Элемент | Обязательно |
|---|---|
| Source images в хорошем качестве | Да |
| JPEG / PNG / WebP source | Да |
| AVIF output | Да |
| WebP output | Да |
| JPEG fallback | Да |
| Responsive sizes | Да |
| Width / height attributes | Да |
| Lazy loading | Да |
| Eager loading для hero | Да |
| Descriptive alt text | Да |
| ImageObject schema | Желательно |
| Image sitemap | Желательно |
| EXIF cleanup | Да |
| Уникальные изображения | Очень желательно |

---

## 10. Мультиязычность

| Элемент | Обязательно |
|---|---|
| Отдельные URL для языков | Да |
| hreflang | Да |
| `x-default` | Да |
| Canonical внутри своей языковой версии | Да |
| Переводы без машинного мусора | Да |
| Уникальные meta title/description | Да |
| Переведённые breadcrumbs | Да |
| Переведённые schema.org поля | Да |
| Переведённые alt-тексты | Да |
| Переведённый sitemap | Да |
| Правильный `lang` в HTML | Да |
| UA как основной язык | Да, для aerocool.ua |

---

## 11. Ecommerce / Product SEO

| Элемент | Обязательно |
|---|---|
| Product pages | Да |
| Category pages | Да |
| Product schema | Да |
| Offer schema | Да |
| Price | Да |
| Availability | Да |
| SKU / MPN / GTIN, если есть | Да |
| Brand | Да |
| Reviews | Да, если реальные |
| AggregateRating | Да, если реальные |
| Comparison tables | Да |
| Pros / cons | Да |
| FAQ | Да |
| Delivery info | Да |
| Warranty info | Да |
| Return policy | Да |
| Merchant Center | Да, если есть продажи |
| Product feed | Да, если есть продажи |
| Availability monitoring | Да |
| Price update system | Да |

---

## 12. Trust / E-E-A-T

| Элемент | Обязательно |
|---|---|
| About page | Да |
| Contact page | Да |
| Company details | Да |
| Real address, если есть | Да |
| Phone / email | Да |
| Author bio | Да |
| Reviewer bio | Желательно |
| Editorial policy | Желательно |
| Warranty policy | Да |
| Return policy | Да |
| Privacy Policy | Да |
| Terms of Service | Да |
| Real photos | Желательно |
| Real reviews | Да, если есть |
| Brand mentions | Да |
| External citations | Да, где уместно |
| Updated date | Да |
| Last reviewed date | Желательно |

---

## 13. Authority SEO

| Элемент | Обязательно |
|---|---|
| Backlinks | Да |
| Brand mentions | Да |
| Digital PR | Да |
| Guest posts | Желательно |
| Product reviews на внешних сайтах | Да |
| Local directories | Да |
| Business citations | Да |
| Social profiles | Да |
| YouTube / video presence | Желательно |
| Google Business Profile | Если есть локальный бизнес |
| Partnerships | Желательно |
| Press page | Желательно |

---

## 14. UX / Conversion SEO

| Элемент | Обязательно |
|---|---|
| Mobile-first дизайн | Да |
| Простая навигация | Да |
| Sticky header | Желательно |
| Быстрый поиск | Да |
| Фильтры товаров | Да |
| Comparison tables | Да |
| Чёткие CTA | Да |
| Кнопка “Купить” / “Узнать цену” | Да |
| FAQ рядом с решением | Да |
| Trust badges | Желательно |
| Reviews block | Да |
| Delivery / warranty рядом с товаром | Да |
| No intrusive popups | Да |
| Accessibility | Да |

---

## 15. Monitoring / Analytics

| Инструмент | Обязательно |
|---|---|
| Google Search Console | Да |
| Bing Webmaster Tools | Да |
| Google Analytics 4 | Да |
| Plausible / Umami | Альтернатива |
| PageSpeed Insights | Да |
| Lighthouse CI | Да |
| CrUX monitoring | Да |
| Server logs analysis | Желательно |
| Broken link checker | Да |
| Redirect checker | Да |
| Sitemap checker | Да |
| Schema validator | Да |
| Rich Results Test | Да |
| Uptime monitoring | Да |
| SEO changelog | Да |
| Rank tracking | Желательно |
| Competitor monitoring | Да |

---

## 16. Security / Reliability

| Элемент | Обязательно |
|---|---|
| HTTPS | Да |
| HSTS | Да |
| Security headers | Да |
| CSP | Желательно |
| X-Content-Type-Options | Да |
| Referrer-Policy | Да |
| Permissions-Policy | Да |
| Clean redirects | Да |
| No mixed content | Да |
| Stable deployment | Да |
| Rollback system | Да |
| Backup контента | Да |

---

## 17. PWA / Modern Web

| Элемент | Нужно |
|---|---|
| manifest.webmanifest | Да |
| theme-color | Да |
| icons | Да |
| offline page | Желательно |
| service worker | Желательно |
| app shortcuts | Можно |
| installable PWA | Не всегда обязательно |
| View Transitions API | Желательно для UX |
| Speculation Rules API | Желательно осторожно |
| Pagefind search | Да |

---

## 18. AI / LLM Visibility

| Элемент | Желательно |
|---|---|
| Чёткие определения | Да |
| FAQ-структура | Да |
| Таблицы | Да |
| Списки характеристик | Да |
| Entity-rich контент | Да |
| Авторитетные страницы | Да |
| Цитируемые блоки | Да |
| `llms.txt` | Можно добавить |
| Хорошая структура headings | Да |
| Короткие summary-блоки | Да |
| Glossary | Да |

---

# Финальная формула

```text
Top SEO SSG Website =
Hugo / Astro
+ Clean HTML
+ Perfect Technical SEO
+ Structured Data
+ Entity SEO
+ Topical Authority
+ Strong Internal Linking
+ Excellent Core Web Vitals
+ High-Quality Content
+ Trust / E-E-A-T
+ Backlinks / Mentions
+ Monitoring
+ Continuous Updates
```

---

## Абсолютный минимум для топового проекта

```text
1. Hugo / Astro
2. CDN
3. Clean semantic HTML
4. Core Web Vitals
5. sitemap.xml
6. robots.txt
7. canonical
8. hreflang
9. schema.org
10. breadcrumbs
11. internal linking
12. keyword clustering
13. search intent mapping
14. topical map
15. product/category/blog architecture
16. unique content
17. content refresh
18. Search Console
19. analytics
20. backlinks / mentions
```

---

## Для Aerocool-сайта

```text
Hugo
+ Netlify
+ Tailwind CSS
+ Pagefind
+ AVIF/WebP
+ PWA
+ schema.org @graph
+ hreflang UA/RU
+ canonical
+ breadcrumbs
+ product pages
+ category pages
+ buying guides
+ comparison pages
+ FAQ
+ topical clusters
+ internal linking
+ Search Console
+ Merchant Center
+ backlinks / brand mentions
```

---

## Итог

Для максимального SEO важен не просто SSG. Важна система:

```text
Техническая база
+ контентная стратегия
+ структура сайта
+ доверие
+ внешняя авторитетность
+ постоянное обновление
```

Для проекта на Hugo это особенно удобно, потому что Hugo даёт полный контроль над HTML, URL, шаблонами, schema.org, мультиязычностью, sitemap, robots.txt, производительностью и структурой сайта.
