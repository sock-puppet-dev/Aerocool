# Руководство По Shortcode `seo-image`

Обновлено: 2026-06-12.

Короткое руководство по shortcode `seo-image` в текущем проекте `Aerocool`.

Shortcode `seo-image` находится в [layouts/_shortcodes/seo-image.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/seo-image.html) и работает только с изображениями, которые лежат внутри папки страницы (`page bundle` в терминологии Hugo). Если файла нет рядом со страницей, сборка упадет с ошибкой.

`seo-image` отвечает только за видимое HTML-изображение в теле обычной контентной страницы: responsive `srcset`, WebP-версии, fallback-изображение, `width` / `height`, `sizes`, `loading`, `decoding`, `fetchpriority` и стабильный `aspect-ratio`. Он не рендерит `H1`, не меняет SEO `title`, не управляет `og:image` и не выводит JSON-LD.

В Hugo `0.163.0` shortcode проверяет processable image resources через `reflect.IsImageResourceProcessable` перед вызовами image pipeline. Это актуальный Hugo-подход вместо ручного списка расширений. Для processable-изображений проект выводит `<picture>` с WebP `srcset` и fallback `<img>` в исходном формате. SVG не является processable resource, поэтому выводится как обычный `<img>` с обязательными размерами.

Hero-изображение главной страницы — отдельное исключение: оно живет в shortcode [home-hero.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/home-hero.html), не проходит через `seo-image`, но использует Hugo global image resource из `assets/images/home-hero85.webp`. Shortcode выводит responsive `srcset`, `sizes`, `loading="eager"` и `fetchpriority="high"`, а matching preload для главной страницы выводится в `<head>` через [lcp-image-preload.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/lcp-image-preload.html).

Главное изображение товарной страницы — тоже отдельный сценарий. Оно не должно вставляться через `seo-image` в markdown. На товарных страницах первый видимый кадр выводит [products/gallery.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/products/gallery.html) из front matter `image`, а responsive preload для этого кадра выводится в `<head>` через [lcp-image-preload.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/lcp-image-preload.html) с тем же `sizes`, что и gallery.

Общий визуальный стандарт изображений, включая обложки, fallback, section covers, home hero, product gallery, inline-иллюстрации, технические схемы и AI-промпты, описан отдельно в [67-image-design-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/content/67-image-design-playbook-2026.md). Этот документ отвечает за внешний вид и reusable prompts; текущий `seo-image` отвечает за HTML, responsive delivery и performance.

Простыми словами для новичка: `seo-image` нужен, когда ты вставляешь изображение прямо в текст статьи, новости или обычной страницы. Для главной и товарной страницы уже есть отдельные шаблоны первого экрана.

Официальная база правил:

- Google Image SEO: https://developers.google.com/search/docs/appearance/google-images
- web.dev Fetch Priority: https://web.dev/articles/fetch-priority
- web.dev responsive preload: https://web.dev/articles/preload-responsive-images
- Hugo image processing: https://gohugo.io/content-management/image-processing/
- Hugo page resources: https://gohugo.io/content-management/page-resources/

## 1. Главное Изображение Статьи Или Новости

Сначала во front matter:

```yaml
image: "01-front.webp"
cover:
  image: "01-front.webp"
  alt: "Тема изображения на языке страницы"
  relative: true
  hiddenInSingle: true
```

Потом в начале markdown-тела:

```md
{{< seo-image
  src="01-front.webp"
  width="1536"
  height="1024"
  alt="Описательное alt-описание изображения на языке страницы"
  title="Короткий title изображения"
  loading="eager"
  preload=true
  fetchpriority=high
  class="w-full rounded-2xl"
  sizes="(min-width: 1198px) 1150px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)"
/>}}
```

Что делает эта связка:

- `seo-image` выводит видимый `<picture>` в теле страницы;
- [lcp-image-preload.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/lcp-image-preload.html) выводит один ранний responsive preload в `<head>`;
- shortcode не дублирует body-level preload, если `image`, `src` и `cover.hiddenInSingle: true` совпадают.

## 2. Товарная Страница

Для товара первичное изображение задается только через front matter:

```yaml
image: "01-front.png"
cover:
  image: "01-front.png"
  alt: "Кресло Aerocool SKY 360"
  relative: true
  hiddenInSingle: true
```

В markdown-теле товара не добавлять стартовый `seo-image` для `01-front.png`. Товарный шаблон сам:

- берет первый кадр из `image`;
- выводит его через [products/gallery.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/products/gallery.html);
- ставит `loading="eager"` и `fetchpriority="high"` на первый gallery image;
- выводит дополнительные изображения page bundle как lazy-loaded миниатюры;
- получает matching head preload из [lcp-image-preload.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/lcp-image-preload.html).

Если `image` или `cover.image` товарной страницы указывает на отсутствующий файл либо на image resource, который Hugo не может обработать через `reflect.IsImageResourceProcessable`, сборка должна остановиться. Это намеренная защита от битой LCP-картинки и рассинхронизации SEO/OG/schema с видимой gallery.

Если в товарной странице позже понадобится вторичная inline-иллюстрация внутри описания, ее можно вставить через `seo-image`, но только с `loading="lazy"`, `preload=false` и без `fetchpriority=high`.

## 3. Второстепенное Контентное Изображение

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

## Параметры

- `src`: имя файла внутри папки страницы.
- `alt`: обязательное описание изображения; пустой `alt` остановит сборку.
- `title`: необязательный короткий заголовок для интерфейса страницы; не дублировать `alt` слово в слово.
- `width` / `height`: обязательные размеры целевого рендера; shortcode остановит сборку, если их нет или они равны `0`.
- `loading`: `eager` для LCP-картинки статьи/новости, `lazy` для всего остального.
- `preload`: `true` только для главной LCP-картинки статьи/новости; на товарных страницах не использовать.
- `fetchpriority`: `high` только для главного LCP-кандидата; если параметр не задан, shortcode ставит `high` только при `preload=true`, иначе `auto`.
- `sizes`: media query для адаптивной загрузки; если не задан, используется проектный full-width default для `.main`.
- `crop`: необязательный `true`, только если нужно намеренно обрезать изображение через Hugo `Fill`.
- `class`: Tailwind-классы.

## Guardrails

1. `src`, `alt`, `width` и `height` обязательны.
2. `preload=true` требует `loading="eager"` и `fetchpriority=high`.
3. На странице допускается только один уникальный shortcode-вызов с `preload=true`.
4. На типовой `article` или `news` странице `preload=true` должен совпадать с front matter `image`.
5. На `product` странице `preload=true` в `seo-image` запрещен: product LCP обслуживает gallery.
6. Если `width` / `height` не совпадают с ratio исходника, сборка остановится. Для намеренного crop нужно явно добавить `crop=true`.
7. Параметр `jsonld` не использовать: `ImageObject` собирается централизованно из front matter `image`.
8. `sizes="100vw"` не использовать для контентной колонки, если изображение не занимает весь viewport.

## Важно

1. Текущий рекомендуемый стандарт для всех content-страниц — `image + cover.image + cover.alt + cover.relative + cover.hiddenInSingle`.
2. Для статей и новостей с локальной обложкой первое видимое изображение выводить через `seo-image`.
3. Для товаров первичный кадр не вставлять через `seo-image`: его выводит product gallery.
4. Не вставлять через shortcode изображения, которых нет в папке страницы.
5. На переведенной странице локализовать `alt` и `title`, даже если используется тот же исходный файл изображения.
6. Для schema.org основным источником изображения остается front matter `image`, а не параметры shortcode.
7. `cover.alt` не должен быть пустым, шаблонным или набитым ключевыми словами. Лучше назвать сущность или тему: `Кресло Aerocool SKY 360`, `Серия Aerocool WING`, `FAQ Aerocool в Украине`.
8. Не переименовывать массово уже опубликованные изображения без отдельного SEO/redirect-плана: это меняет URL image resources.
9. Image license metadata не управляется shortcode: если меняются условия использования изображений, сначала обновить страницы `/image-license/` и `/ru/image-license/`, затем проверить rendered `ImageObject`.
