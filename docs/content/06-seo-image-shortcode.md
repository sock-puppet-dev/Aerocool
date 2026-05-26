# Руководство По Shortcode `seo-image`

Обновлено: 2026-05-17.

Короткое руководство по shortcode `seo-image` в текущем проекте `Aerocool`.

Shortcode `seo-image` находится в [layouts/_shortcodes/seo-image.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/seo-image.html) и работает только с изображениями, которые лежат внутри папки страницы (`page bundle` в терминологии Hugo). Если файла нет рядом со страницей, сборка упадет с ошибкой.

`seo-image` отвечает только за видимое HTML-изображение в теле страницы: responsive `srcset`, WebP-версии, fallback-изображение, `width` / `height`, `sizes`, `loading`, `decoding`, `fetchpriority` и стабильный `aspect-ratio`. Он не рендерит `H1`, не меняет SEO `title`, не управляет `og:image` и не выводит JSON-LD.

Текущее hero-изображение главной страницы — отдельное исключение: оно живет в едином shortcode [home-hero.html](/Users/stadnyk/MEGA/Aerocool/layouts/_shortcodes/home-hero.html) и сейчас не проходит через `seo-image`.

Простыми словами для новичка: `seo-image` нужен, когда ты вставляешь изображение прямо в текст страницы. Он помогает Hugo собрать правильный HTML для картинки, чтобы Lighthouse не ругался на размеры, загрузку и адаптивность.

Для processable-форматов Hugo (`jpg`, `jpeg`, `png`, `webp`) shortcode выводит `<picture>`:

- `<source type="image/webp">` с WebP `srcset`;
- fallback `<img>` в исходном формате;
- `sizes`, `width`, `height` и стабильный `aspect-ratio`.

Для других форматов shortcode выводит обычный `<img>` с обязательными размерами. SVG не обрабатывается через Hugo image pipeline, но получает `width`, `height`, `loading`, `decoding`, `fetchpriority` и `aspect-ratio`.

AVIF сейчас не генерируется текущим Hugo pipeline проекта: в Hugo 0.162.0 AVIF является image resource, но не processable output-форматом. Если AVIF понадобится позже, это должен быть отдельный подготовленный asset/pipeline, а не параметр `seo-image`.

Если `preload=true` стоит на типовой странице `article`, `news` или `product`, где `image` во front matter совпадает с `src` shortcode и `cover.hiddenInSingle: true`, ранний responsive preload выводится в `<head>` через [lcp-image-preload.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_seo/lcp-image-preload.html). Сам shortcode в этом случае не дублирует `<link rel="preload">` рядом с картинкой.

Для полного Core Web Vitals workflow смотри [12-core-web-vitals-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/12-core-web-vitals-guide-2026.md).

JSON-LD для основного изображения страницы собирается централизованно через `layouts/_partials/_schema/page-image-object.html` и попадает в общий `@graph`. Источник URL изображения - поле `image` во front matter через helper `page-image.html`.

Image license metadata пока не внедрена. Не добавлять в content или shortcode параметры вроде `license`, `acquireLicensePage`, `creator`, `creditText` или `copyrightNotice`, пока проект не подтвердил права на изображения и не обновил schema partials. Для текущего этапа обязательны crawlable image URL, точный `alt`, реальные размеры и соответствие изображения видимому товару или теме страницы.

Официальная база этого правила:

- Google Image SEO: https://developers.google.com/search/docs/appearance/google-images
- web.dev Fetch Priority: https://web.dev/articles/fetch-priority
- web.dev responsive preload: https://web.dev/articles/preload-responsive-images
- Hugo image processing: https://gohugo.io/content-management/image-processing/
- Hugo page resources: https://gohugo.io/content-management/page-resources/

Для товарных страниц текущий стандарт проекта такой:

- `image` во front matter — для `og:image`, `twitter:image` и schema;
- `cover.image` — для preview в листингах;
- `seo-image` в теле страницы — для основного видимого изображения карточки.

Для всех файлов `content/**/*.md` текущий общий стандарт — иметь `image` и полный служебный `cover`-блок. Даже если страница служебная, например `/search/` или `/contact/success/`, она должна иметь осмысленный `cover.alt` и корректный путь к preview-картинке. Если страница переиспользует root- или section-картинку, используйте site path и `relative: false`.

## 1. Главное изображение товара в первом экране (LCP)

Сначала во front matter:

```yaml
image: "01-front.png"
cover:
  image: "01-front.png"
  alt: "Кресло Aerocool SKY 360"
  relative: true
  hiddenInSingle: true
```

Потом в теле страницы:

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

- Для главного изображения товара использовать `loading="eager"`, `preload=true`, `fetchpriority=high`.
- Для квадратного фронтального product image нормален точный размер `2000x2000`.
- `sizes` должен отражать реальную ширину контентной колонки. Для full-width изображения внутри текущего `.main` используйте проектный стандарт `(min-width: 1198px) 1150px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)`.
- Если для LCP-изображения задается нестандартный `sizes`, то такое же значение нужно задать во front matter как `seo_image_sizes`, чтобы head preload и `<picture>` выбирали один и тот же ресурс.
- Не добавлять параметр `jsonld`: schema для primary image берется из `image` во front matter.

## 2. Основное контентное изображение

```md
{{< seo-image
  src="wing-mesh-black.png"
  width="1200"
  height="800"
  alt="Кресло Aerocool WING Mesh Black"
  title="Aerocool WING Mesh Black"
  loading="lazy"
  preload=false
  fetchpriority=auto
  class="w-full rounded-2xl"
  sizes="(min-width: 1198px) 1150px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)"
/>}}
```

- Для обычных изображений внутри страницы использовать `loading="lazy"`.
- `width` и `height` обязательны, потому что shortcode строит адаптивный рендер и помогает избежать `CLS`.

## 3. Второстепенное или галерейное изображение

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

- `src`: имя файла внутри папки страницы
- `alt`: обязательное описание изображения; пустой `alt` остановит сборку
- `title`: необязательный короткий заголовок для интерфейса страницы; не дублировать `alt` слово в слово
- `width` / `height`: обязательные размеры целевого рендера; shortcode остановит сборку, если их нет или они равны `0`
- `loading`: `eager` для LCP, `lazy` для всего остального
- `preload`: использовать только для главных изображений первого экрана
- `fetchpriority`: `high` только для главных изображений первого экрана
- `sizes`: media query для адаптивной загрузки; если не задан, используется проектный full-width default для `.main`
- `class`: Tailwind-классы

## Важно

1. Текущий рекомендуемый стандарт для всех content-страниц — `image + cover.image + cover.alt + cover.relative + cover.hiddenInSingle`; для статей, новостей и товаров с локальной обложкой дополнительно использовать `seo-image` в теле страницы.
2. Не вставлять через shortcode изображения, которых нет в папке страницы.
3. На переведенной странице локализовать `alt` и `title`, даже если используется тот же исходный файл изображения.
4. Для product page не забывать, что `cover.image` нужен отдельно: без него картинка появится в теле страницы, но не появится в preview-листингах.
5. Для schema.org основным источником изображения остается front matter `image`, а не параметры shortcode.
6. `cover.alt` не должен быть пустым, шаблонным или набитым ключевыми словами. Лучше назвать сущность или тему: `Кресло Aerocool SKY 360`, `Серия Aerocool WING`, `FAQ Aerocool в Украине`.
7. Не ставить `preload=true` на вторичные изображения. Для страницы должен быть только один главный LCP preload.
8. Не добавлять неподдерживаемые параметры вроде `jsonld`. Если такой параметр встретится в старом контенте, его можно удалить: текущий JSON-LD слой его не читает.
9. Для новых глобальных файлов использовать короткие описательные имена. Для page bundle допускается стабильный проектный паттерн `01-front.png`, потому что контекст URL, `alt`, `title`, видимый текст и `ImageObject` задаются страницей.
10. Не переименовывать массово уже опубликованные изображения без отдельного SEO/redirect-плана: это меняет URL image resources.
11. Image license metadata относится к P2: сначала юридическое/бизнес-подтверждение прав, затем документация полей, затем правка `page-image-object.html`.
