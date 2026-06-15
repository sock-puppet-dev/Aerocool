# Аудит Inline-Изображений Articles/News И SERP-Стандарт Изображений 2026

Актуально на 2026-06-15.

Этот документ фиксирует текущий ручной анализ всех текстов `content/articles` и `content/news`: какие изображения нужны внутри тела каждой статьи и новости, где их ставить, какие форматы использовать и какие технические правила соблюдать, чтобы изображения помогали пользователю, SEO, schema.org и Core Web Vitals.

Документ заменяет план [73-2026-06-14-articles-news-inline-image-plan.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/73-2026-06-14-articles-news-inline-image-plan.md) как текущий рабочий источник. Аудит `73` оставлен как исторический snapshot.

## 1. Проверенные Источники

Внешние источники, с которыми сверялся стандарт:

- Google Search Central, Google Images best practices: https://developers.google.com/search/docs/appearance/google-images
- Google Search Central, Article structured data: https://developers.google.com/search/docs/appearance/structured-data/article
- Google Search Central, helpful people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- web.dev, Image performance: https://web.dev/learn/performance/image-performance
- web.dev, Responsive images: https://web.dev/learn/design/responsive-images
- web.dev, Fetch Priority API: https://web.dev/articles/fetch-priority

Практический вывод для проекта:

- изображение должно быть релевантным видимому тексту, а не декоративной вставкой;
- важные изображения должны быть доступны через HTML `<img>` / `<picture>`, не только через CSS background;
- `alt`, имя файла, соседний заголовок и соседний абзац должны говорить об одной теме;
- первый image candidate страницы может быть LCP и получать `eager`, `preload` и `fetchpriority=high`;
- все вторичные inline-изображения должны быть lazy, без preload и без высокого приоритета;
- для `Article` и `NewsArticle` нужны representative image variants **16:9**, **4:3**, **1:1**;
- картинки не гарантируют топ-1, но помогают закрывать интент, повышать понятность страницы, CTR и пригодность для Search/Images surfaces.

## 2. Текущее Состояние На 2026-06-15

Проверены:

- `16` evergreen-статей в `content/articles`;
- `9` новостей в `content/news`;
- украинские `index.md` и русские `index.ru.md`;
- обложки `01-front.webp`;
- schema crops `01-front-16x9.webp`, `01-front-4x3.webp`, `01-front-1x1.webp`;
- фактические вызовы `seo-image` в markdown.

Факт:

- во всех статьях и новостях сейчас есть главное изображение `01-front.webp`;
- у всех article/news bundles есть schema crops для `16:9`, `4:3`, `1:1`;
- в теле всех материалов сейчас активен только первый `seo-image` с `01-front.webp`;
- дополнительных inline-изображений `02-*` / `03-*` в текущем рабочем дереве нет;
- значит текущий слой inline-иллюстраций нужно считать P1-backlog, а не завершенным внедрением.

Оценка текущего visual content depth для `content/articles` и `content/news`: **7.2 / 10**.

Почему не выше:

- primary covers и schema crops уже закрыты хорошо;
- но длинные статьи с механизмами, материалами, сравнением серий и настройкой пока визуально объясняются только одной обложкой;
- новости про запуск серий и моделей не показывают второй уровень инфоповода: состав серии, материал, механизм или практическое изменение для покупателя.

Целевая оценка после внедрения рекомендаций: **8.9-9.3 / 10**, если изображения будут фактически связаны с текстом, легкие, без случайного текста и с локализованным `alt`.

## 3. Единый SERP-Стандарт Для Изображений Проекта

Этот раздел задает правила для всех изображений проекта, а не только для articles/news.

### 3.1. Размеры И Форматы

| Тип | Размер | Формат | Вес | Где хранить |
|---|---:|---|---:|---|
| Article/news cover | **1536x1024** | WebP | 80-260 КБ | `content/articles/<slug>/01-front.webp`, `content/news/<slug>/01-front.webp` |
| Article/news 16:9 crop | **1600x900** | WebP | 70-240 КБ | рядом с материалом |
| Article/news 4:3 crop | **1200x900** | WebP | 70-240 КБ | рядом с материалом |
| Article/news 1:1 crop | **1200x1200** | WebP | 80-260 КБ | рядом с материалом |
| Inline editorial image | **1200x800** | WebP | 120-280 КБ, максимум 350 КБ | page bundle материала |
| Inline wide comparison | **1200x675** | WebP | 100-240 КБ | page bundle материала |
| Inline factual/detail | **1200x800** или **1000x1000** | WebP | 120-300 КБ | page bundle материала |
| Technical diagram | **1200x800 WebP** или SVG | WebP/SVG | WebP до 250 КБ, SVG минимальный | page bundle или `static/images` |
| Section/root/series cover | **1536x1024** | WebP | 80-280 КБ | `content/<section>/cover.webp` |
| Default fallback | **1536x1024** | WebP | 80-260 КБ | `static/images/default-*.webp` |
| Home hero | **2102x1401** | WebP | 140-420 КБ | `assets/images/home-hero85.webp` |
| Product primary | текущий source-size, целевой WebP/JPEG позже | PNG/WebP/JPEG | разумный для factual photo | product page bundle |

Для `content/articles` и `content/news` тяжелые PNG/JPEG не оставлять как production inline-изображения. PNG допустим только как исходник вне production-ссылки или как factual product source, если конвертация может ухудшить проверяемость.

### 3.2. Имена Файлов

Правила:

- только lowercase, латиница, цифры и дефисы;
- без пробелов, кириллицы, `final`, `new`, `v2`, `test`, `candidate` в production-имени;
- inline-файлы называть по порядку: `02-<topic>.webp`, `03-<topic>.webp`;
- `candidate`-файлы допустимы только для визуального утверждения и не должны попадать в markdown;
- опубликованные image URLs не переименовывать массово без отдельного SEO-плана.

### 3.3. HTML, Loading И Performance

Для article/news:

- первый `seo-image` должен совпадать с front matter `image`;
- первый `seo-image` получает `loading="eager"`, `preload=true`, `fetchpriority=high`;
- все `02-*` / `03-*` inline-изображения получают `loading="lazy"`, `preload=false`, `fetchpriority=auto`;
- `width` и `height` обязательны;
- `sizes="100vw"` не использовать для обычной контентной колонки;
- `alt` обязателен и локализуется отдельно в `index.md` и `index.ru.md`;
- если файл лежит не рядом с markdown page bundle, `seo-image` использовать нельзя.

Для home hero:

- только один LCP hero;
- `loading="eager"` и `fetchpriority="high"` сохранять;
- corner logo не нужен, бренд должен быть на кресле;
- размер строго **2102x1401**.

Для product gallery:

- стартовый product image не вставлять через `seo-image`;
- первый кадр берет product gallery из `image`;
- дополнительные product images кладутся рядом с товаром и становятся lazy thumbnails;
- factual product layer важнее high-tech editorial layer.

### 3.4. Alt, Filename И Соседний Текст

Хороший `alt`:

- описывает реальный смысл картинки;
- написан на языке страницы;
- не повторяет `title` механически;
- не является набором ключевых слов;
- обычно укладывается в одну фразу.

Пример:

```go-html-template
{{< seo-image
  src="02-material-macro-panels.webp"
  width="1200"
  height="800"
  alt="Порівняння поверхонь Racer, Loft Air і Mesh у кріслах Aerocool"
  loading="lazy"
  preload=false
  fetchpriority=auto
/>}}
```

Нельзя:

- вставлять картинку далеко от блока, который она объясняет;
- прятать важные данные только внутри bitmap;
- делать инфографику с мелким неиндексируемым текстом;
- использовать один и тот же generic chair image в разных статьях без новой смысловой роли.

### 3.5. Визуальное Качество И AI-Governance

Для AI-generated или AI-assisted изображений:

- без случайного текста, цифр, UI labels, бейджей и фальшивых характеристик;
- без людей, рук и медицинских символов;
- кресло не должно получать лишние колеса, подлокотники, сломанную базу или fantasy-форму;
- бренд на кресле должен выглядеть как печать, тиснение или вышивка на материале;
- официальный corner logo используется только там, где это требует playbook;
- если бренд или геометрия кресла не проходят визуальную проверку, изображение не публикуется.

## 4. Рекомендации Для `content/articles`

### `best-chair-for-home-office`

Статус: внедрено 2026-06-15.

Внедрено:

- `02-home-office-scenarios.webp` — три домашних сценария: компактный home office, рабочая комната, гибрид work/gaming без людей и текста.
- `03-video-call-room-fit.webp` — кресло в кадре домашнего рабочего пространства с акцентом на визуальную уместность в комнате и видеозвонках.

Где стоит:

- после блока про три сценария домашней работы;
- после блока про видеозвонки и комнату.

Зачем: статья отвечает на широкий home office интент; картинки должны показать не только кресло, но и среду использования.

### `chair-for-computer-work`

Статус: внедрено 2026-06-15.

Внедрено:

- `02-full-workday-ergonomic-map.webp` — рабочее место, монитор, кресло, поддержка спины, рук и смена положения без медицинских обещаний.
- `03-computer-work-material-choice.webp` — Racer, Loft Air и Mesh как варианты поверхностей для полного рабочего дня.

Где стоит:

- после блока про полный рабочий день;
- после блока про выбор материала для работы за компьютером.

Зачем: помогает связать текст о долгой работе с физическими зонами посадки и материалом.

### `chair-for-posture-and-long-work`

Статус: нет активных inline-изображений.

Нужно:

- `02-neutral-posture-support.webp` — нейтральная поддержка спинки, сиденья и подлокотников без медицинских символов.
- `03-workplace-check-before-buying.webp` — проверка стола, монитора, клавиатуры и положения кресла перед покупкой.

Где ставить:

- после блока про спинку как главный ориентир;
- после блока про проверку рабочего места перед покупкой.

Зачем: статья сознательно избегает медицинских claims, поэтому визуал должен быть эргономическим, но не лечебным.

### `chair-setup-after-purchase`

Статус: нет активных inline-изображений.

Нужно:

- `02-chair-setup-sequence.webp` — последовательность настройки высоты, глубины, спинки, подлокотников и наклона без цифр внутри изображения.
- `03-tilt-armrest-headrest-details.webp` — крупные планы узлов настройки: наклон, подлокотники, подголовник.

Где ставить:

- после блока про шаг 4;
- после блока про шаг 6.

Зачем: пошаговая статья без visual sequence воспринимается слишком абстрактно.

### `chairs-for-office-team`

Статус: нет активных inline-изображений.

Нужно:

- `02-office-workstation-map.webp` — карта рабочих мест команды: оператор, менеджер, гибридный сотрудник, переговорная зона.
- `03-team-chair-distribution.webp` — несколько моделей Aerocool, распределенных под разные роли команды.

Где ставить:

- после блока про карту рабочих мест;
- после блока про распределение моделей по сценариям.

Зачем: B2B-статья должна показывать fleet logic, а не только одно кресло.

### `gaming-chair-long-sessions`

Статус: нет активных inline-изображений.

Нужно:

- `02-long-gaming-session-support.webp` — игровое место с акцентом на спину, руки и смену позы.
- `03-gaming-material-surfaces.webp` — Racer, Loft Air и Mesh в игровых сценариях.

Где ставить:

- после блока о том, почему дизайн не должен быть первым критерием;
- после блока про материалы.

Зачем: переводит тему из “gaming look” в практический выбор для долгих сессий.

### `how-to-choose-aerocool-chair`

Статус: внедрено 2026-06-15.

Внедрено:

- `02-series-choice-map.webp` — визуальный маршрут выбора между SKY, WING и XTAL.
- `03-scenario-adjustability-material.webp` — три критерия выбора: сценарий, регулировки, материал.

Где стоит:

- после блока “Крок 1 / Шаг 1”;
- после блока с короткой практической схемой выбора.

Зачем: главная evergreen-статья должна иметь центральную визуальную схему выбора.

### `how-to-choose-chair-by-adjustability`

Статус: нет активных inline-изображений.

Нужно:

- `02-7d-8d-11d-adjustment-zones.webp` — три кресла с растущим количеством подсвеченных зон без цифр и labels внутри изображения.
- `03-adjustment-priority-details.webp` — подлокотники, сиденье, спинка и подголовник крупным планом.

Где ставить:

- после блока про 7D/8D/11D;
- после блока про реально важные регулировки.

Зачем: числа D должны объясняться через зоны регулировки, а не только через текст.

### `racer-vs-loft-air-vs-mesh-materials`

Статус: внедрено 2026-06-15.

Внедрено:

- `02-material-macro-panels.webp` — factual macro-панели Racer, Loft Air и Mesh.
- `03-material-use-scenarios.webp` — работа, home office, gaming как три сценария выбора материала.

Где стоит:

- после блока про Mesh;
- после блока о том, как материал меняет ощущение от кресла.

Зачем: материал невозможно убедительно объяснить только текстом; нужна фактура.

### `sky-lite-vs-sky-360-guide`

Статус: нет активных inline-изображений.

Нужно:

- `02-sky-lite-sky-360-side-by-side.webp` — SKY Lite и SKY 360 рядом в office-tech среде.
- `03-sky-adjustment-difference.webp` — визуальный акцент на различие глубины настройки SKY 360.

Где ставить:

- после блока о том, что добавляет SKY 360;
- после блока о целесообразности доплаты.

Зачем: сравнение двух моделей должно быть видно до чтения всех деталей.

### `sky-vs-wing-vs-xtal`

Статус: нет активных inline-изображений.

Нужно:

- `02-series-comparison-map.webp` — три серии как продуктовая линейка с разными ролями.
- `03-series-scenario-routing.webp` — работа, gaming, практичная эксплуатация как маршруты выбора.

Где ставить:

- после сравнительной таблицы серий;
- после блока выбора по сценарию.

Зачем: это центральный hub-сравнитель, ему нужна визуальная навигация.

### `sync4-sync5-mechanism-guide`

Статус: внедрено 2026-06-15.

Внедрено:

- `02-sync4-sync5-mechanism-diagram.webp` — clean technical visual наклона и фиксации без недоказанных specs.
- `03-sync5-adjustment-closeups.webp` — крупные планы сиденья, рычагов и спинки.

Где стоит:

- после таблицы/блока производителя;
- после блока о выборе между SYNC4 и SYNC5.

Зачем: механизм нужно показывать движением и узлами, иначе текст выглядит терминологически плотным.

### `what-is-dual-backrest`

Статус: нет активных inline-изображений.

Нужно:

- `02-dual-backrest-closeup.webp` — крупный план разделенной спинки WING.
- `03-dual-vs-single-backrest-support.webp` — сравнение двойной и цельной логики спинки без текста внутри изображения.

Где ставить:

- после блока о связи Dual backrest с WING;
- после блока сравнения с SKY.

Зачем: feature-статья должна показать саму форму двойной спинки.

### `what-is-fully-replaceable-design`

Статус: нет активных inline-изображений.

Нужно:

- `02-xtal-replaceable-components.webp` — модульная логика XTAL и сменные элементы.
- `03-xtal-practical-maintenance.webp` — практический сценарий долгого использования и обслуживания.

Где ставить:

- после блока о конструкции со сменными элементами;
- после блока о практической важности этой идеи.

Зачем: replaceable design нужно объяснять через части и обслуживание.

### `what-is-synchronous-tilt-guide`

Статус: внедрено 2026-06-15.

Внедрено:

- `02-synchronous-tilt-motion-arcs.webp` — синхронное движение сиденья и спинки через аккуратные motion arcs.
- `03-tilt-vs-simple-recline.webp` — различие между синхронным наклоном и простым отклонением.

Где стоит:

- после блока о том, как работает Synchronous Tilt;
- после блока сравнения с простым отклонением.

Зачем: термин должен объясняться движением, а не только определением.

### `wing-vs-xtal-comparison`

Статус: нет активных inline-изображений.

Нужно:

- `02-wing-xtal-platforms.webp` — WING и XTAL рядом как разные эргономические платформы.
- `03-11d-vs-7d-practical-choice.webp` — регулировки как практический выбор, без тезиса “больше всегда лучше”.

Где ставить:

- после блока о силе WING/XTAL;
- после блока “11D против 7D”.

Зачем: сравнение должно визуально развести активную WING и более спокойную XTAL.

## 5. Рекомендации Для `content/news`

### `2026-04-15-aerocool-sky-series-launch`

Статус: нет активных inline-изображений.

Нужно:

- `02-sky-lite-360-lineup.webp` — SKY Lite и SKY 360 рядом, без текста внутри изображения.

Где ставить: после блока “Моделі серії / Модели серии”.

Зачем: запуск серии должен сразу показать состав серии.

### `2026-04-16-aerocool-wing-series-launch`

Статус: нет активных inline-изображений.

Нужно:

- `02-wing-dual-backrest-11d.webp` — WING с акцентом на dual backrest и зоны регулировок.
- `03-wing-material-variants.webp` — Racer, Loft Air и Mesh внутри WING.

Где ставить:

- после блока ключевых особенностей WING;
- после блока про три направления внутри серии.

Зачем: новость WING держится на feature + material variants.

### `2026-04-17-aerocool-xtal-series-launch`

Статус: нет активных inline-изображений.

Нужно:

- `02-xtal-replaceable-design.webp` — модульная/replaceable логика XTAL.
- `03-xtal-material-variants.webp` — XTAL Racer, Loft Air и Mesh.

Где ставить:

- после блока “Что делает XTAL особенной”;
- после блока вариантов серии.

Зачем: новость должна объяснить отличие XTAL от WING/SKY.

### `2026-04-18-aerocool-sky-360-launch`

Статус: нет активных inline-изображений.

Нужно:

- `02-sky-360-adjustment-zones.webp` — зоны регулировок SKY 360 без текстовых labels.

Где ставить: после блока о том, что получает пользователь в SKY 360.

Зачем: модельная новость нуждается в визуальном раскрытии регулировок.

### `2026-04-19-aerocool-sky-lite-launch`

Статус: нет активных inline-изображений.

Нужно:

- `02-sky-lite-daily-work.webp` — SKY Lite в спокойной ежедневной workstation-сцене.

Где ставить: после блока “Для кого создана эта модель”.

Зачем: показать SKY Lite как понятную точку входа в каталог.

### `2026-04-20-aerocool-loft-air-and-mesh-focus`

Статус: нет активных inline-изображений.

Нужно:

- `02-loft-air-mesh-material-macro.webp` — две поверхности крупным планом.
- `03-ventilation-material-choice.webp` — сценарии выбора вентиляции и материала.

Где ставить:

- после блока про Mesh;
- после блока о том, как читать разницу материалов.

Зачем: материальная новость без close-up теряет предметность.

### `2026-04-30-aerocool-sync4-sync5-mechanism-update`

Статус: нет активных inline-изображений.

Нужно:

- `02-sync4-sync5-update-diagram.webp` — визуальное сравнение SYNC4/SYNC5 без лишних specs.

Где ставить: после блока “Что именно уточнено”.

Зачем: новость об уточнении механизма должна быстро объяснять разницу.

### `2026-05-21-aerocool-chair-selection-guides-update`

Статус: нет активных inline-изображений.

Нужно:

- `02-chair-selection-guides-map.webp` — карта guide-кластеров: работа, home office, gaming, материалы.

Где ставить: после блока “Что именно добавлено”.

Зачем: новость про контентный апдейт должна показать, как читать новые гайды.

### `2026-05-21-aerocool-practical-chair-guides-update`

Статус: нет активных inline-изображений.

Нужно:

- `02-practical-guides-map.webp` — посадка, настройка после покупки, выбор для команды как практический маршрут.

Где ставить: после блока “Какие материалы добавлены”.

Зачем: связывает несколько практических материалов в один путь пользователя.

## 6. Приоритет Внедрения

P1:

1. `how-to-choose-aerocool-chair` — центральный гайд выбора.
2. `chair-for-computer-work` — широкий коммерческий кластер “кресло для работы за компьютером”.
3. `best-chair-for-home-office` — home office кластер.
4. `racer-vs-loft-air-vs-mesh-materials` — материал нельзя хорошо закрыть без фактуры.
5. `sync4-sync5-mechanism-guide` и `what-is-synchronous-tilt-guide` — механизмы требуют visual explainer.

P2:

1. Остальные статьи-сравнения и feature-статьи.
2. Новости о запуске серий WING/XTAL/SKY.
3. Новости о материалах и механизмах.

P3:

1. Новости о контентных обновлениях.
2. Дополнительные factual close-ups после появления разных официальных product gallery assets.

## 7. Правила Вставки В Markdown

Украинская версия:

```go-html-template
{{< seo-image
  src="02-series-choice-map.webp"
  width="1200"
  height="800"
  alt="Візуальна схема вибору між серіями Aerocool SKY, WING і XTAL"
  loading="lazy"
  preload=false
  fetchpriority=auto
  class="mx-auto w-full rounded-xl"
  sizes="(min-width: 848px) 800px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)"
/>}}
```

Русская версия:

```go-html-template
{{< seo-image
  src="02-series-choice-map.webp"
  width="1200"
  height="800"
  alt="Визуальная схема выбора между сериями Aerocool SKY, WING и XTAL"
  loading="lazy"
  preload=false
  fetchpriority=auto
  class="mx-auto w-full rounded-xl"
  sizes="(min-width: 848px) 800px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)"
/>}}
```

Правила:

- один файл можно использовать в `index.md` и `index.ru.md`, если внутри изображения нет текста;
- `alt` всегда писать на языке страницы;
- картинку вставлять после релевантного смыслового блока;
- не ставить больше двух изображений подряд без текста между ними;
- не превращать таблицы, FAQ, списки характеристик и сравнения в bitmap;
- после добавления изображений обновить `lastmod` в обеих языковых версиях;
- после добавления проверить `npm run build`.

## 8. Defect-Checklist Для Inline-Изображений

Перед публикацией проверить:

- [ ] размер соответствует **1200x800** или осознанному **1200x675**;
- [ ] формат WebP;
- [ ] файл не тяжелее **350 КБ**;
- [ ] нет случайного текста, цифр, labels, fake UI;
- [ ] нет medical symbols и обещаний лечения;
- [ ] кресло не имеет лишних деталей;
- [ ] бренд на кресле выглядит как часть материала;
- [ ] если это материал, фактура читается;
- [ ] если это механизм, движение понятно без текста;
- [ ] изображение не дублирует обложку;
- [ ] `alt` локализован;
- [ ] shortcode содержит `width`, `height`, `loading="lazy"`, `preload=false`, `fetchpriority=auto`;
- [ ] сборка Hugo проходит.

## 9. Итог

Главный текущий разрыв не в cover-слое: обложки и schema crops уже закрывают базовые требования. Главный разрыв — в глубине тела материалов. Длинные статьи и новости должны получить второй визуальный слой: material close-ups, mechanism explainers, scenario maps и model lineups.

Рекомендуемый порядок: сначала внедрить P1-статьи, визуально утверждая каждое изображение, затем перейти к новостям серий, затем закрыть оставшиеся feature-статьи и контентные новости.
