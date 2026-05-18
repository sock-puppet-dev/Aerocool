# Netlify Database Для SEO-First Отзывов

Обновлено: 2026-05-17.

Этот документ объясняет, как в проекте `Aerocool Ukraine` использовать `Netlify Database` для собственной системы отзывов к товарам и статьям.

Главная цель: не просто сохранять отзывы, а сделать SEO-безопасный review pipeline, где `Product` JSON-LD получает рейтинг только из реальных, публичных, approved отзывов, которые видны пользователю на странице.

## Как Пользоваться Новичку

Если ты раньше не работал с `Netlify Database`, читай документ в таком порядке:

1. Раздел 1 объясняет, что уже подключено.
2. Раздел 2 дает актуальный алгоритм работ.
3. Раздел 3 объясняет, зачем нужна база.
4. Раздел 4 показывает команды запуска.
5. Раздел 5 объясняет миграции.
6. Раздел 6 фиксирует целевую таблицу отзывов.
7. Раздел 7 объясняет `review_target_id`.
8. Раздел 8 объясняет SEO-first pipeline.
9. Раздел 11 показывает, что проверять после изменений.

Не начинай с формы на сайте. Для SEO сначала нужно зафиксировать данные, модерацию и build-time экспорт approved отзывов.

## 1. Текущий Статус

На `2026-05-17` для проекта выполнено:

- `Netlify CLI` установлен через `brew`;
- версия CLI: `netlify-cli/26.0.2`;
- локальная папка `/Users/stadnyk/MEGA/Aerocool` связана с Netlify-проектом `hugo-aerocool`;
- production URL проекта: `https://aerocool.ua`;
- `Netlify Database` включена для проекта;
- пакет `@netlify/database` установлен в корневой `package.json`;
- выбран режим `Direct SQL`;
- sample data не создавались;
- миграций пока нет.

Управление базой в Netlify находится здесь:

```text
https://app.netlify.com/projects/hugo-aerocool/database
```

## 2. Актуальный Алгоритм Работ

Это текущий порядок внедрения review-системы после подключения `Netlify Database`.

### Уже Сделано

1. Установлен `Netlify CLI 26.0.2`.
2. Выполнен `netlify login`.
3. Выполнен `netlify link`.
4. Локальная папка связана с проектом `hugo-aerocool`.
5. Выполнен `netlify database init`.
6. Выбран режим `Direct SQL`.
7. Sample data не создавались.
8. Установлен пакет `@netlify/database`.

### Следующий Шаг

Создать первую миграцию:

```bash
netlify database migrations new --description "create reviews table" --scheme timestamp
```

После создания миграции вставить SQL из раздела 6 в созданный файл миграции.

### Полный Алгоритм V1

1. Создать миграцию `reviews`.
2. Вставить SQL таблицы отзывов.
3. Запустить локальное окружение:

   ```bash
   netlify dev
   ```

4. В другом терминале применить миграции:

   ```bash
   netlify database migrations apply
   ```

5. Проверить состояние базы:

   ```bash
   netlify database status
   ```

6. Добавить `review_target_id` и `reviews_enabled` только в один тестовый товар, например `SKY Lite`, в обе языковые версии.
7. Сделать `POST /api/reviews`, который создает только `pending` отзыв.
8. Сделать минимальный admin endpoint для перевода отзыва в `approved`, `rejected` или `spam`.
9. Сделать build-time export approved отзывов в `data/generated/reviews.json`.
10. Подключить Hugo partial отзывов только на тестовом товаре.
11. Переключить `Product.aggregateRating` на generated reviews snapshot.
12. Проверить два состояния:

    ```text
    нет approved отзывов -> нет AggregateRating
    есть approved отзыв -> visible review block + AggregateRating
    ```

13. После успешной проверки масштабировать `review_target_id` на остальные товары.
14. Статьи подключать вторым этапом, без `AggregateRating` в `Article` JSON-LD.

### Что Не Делать В Первом Проходе

Не делать:

- не начинать с красивой админки;
- не подключать отзывы сразу ко всем товарам;
- не подключать статьи до проверки товарного pipeline;
- не добавлять `Review` JSON-LD раньше visible approved отзывов;
- не оставлять front matter `rating.value` / `rating.count` источником `Product.aggregateRating`.

## 3. Что Такое Netlify Database

`Netlify Database` — это управляемая `PostgreSQL`-база, встроенная в Netlify workflow.

В этом проекте она нужна для хранения:

- пользовательских отзывов;
- рейтинга 1-5;
- имени автора;
- email автора в приватном виде;
- статуса модерации;
- даты создания и публикации отзыва.

Проще говоря:

```text
форма отзыва
-> Netlify Function
-> Netlify Database
-> pending review
-> moderation
-> approved review
-> Hugo build
-> visible review + Product JSON-LD
```

## 4. Базовые Команды

Все команды выполнять из корня проекта:

```bash
cd /Users/stadnyk/MEGA/Aerocool
```

Проверить аккаунт и привязку проекта:

```bash
netlify status
```

Проверить состояние базы и миграций:

```bash
netlify database status
```

Запустить локальное Netlify-окружение:

```bash
netlify dev
```

Важно: локальная база стартует автоматически вместе с `netlify dev`. Если запустить `netlify database status` без `netlify dev`, CLI может написать, что local database не запущена. Это нормально.

Выполнить одноразовый SQL-запрос:

```bash
netlify database connect --query "SELECT 1"
```

Открыть интерактивную SQL-консоль:

```bash
netlify database connect
```

## 5. Миграции

Миграция — это SQL-файл, который меняет структуру базы.

Пример: создать таблицу `reviews`, добавить индекс, добавить новое поле.

В проекте используется `Direct SQL`, поэтому схему пишем руками в SQL. `Drizzle ORM` для v1 review-системы не нужен: таблица простая, а ручной SQL прозрачнее для проверки.

Создать миграцию:

```bash
netlify database migrations new --description "create reviews table" --scheme timestamp
```

Ожидаемое место для миграций:

```text
netlify/database/migrations/
```

Применить pending migrations локально:

```bash
netlify database migrations apply
```

На deploy Netlify применяет миграции автоматически в рамках deploy lifecycle. Локально `migrations apply` нужен, чтобы проверить SQL до pull request или синхронизировать локальную базу после получения новых миграций.

Проверить, какие миграции применены:

```bash
netlify database status
```

Важное правило: если миграция уже применена, ее нельзя редактировать задним числом. Новое изменение схемы нужно делать новой миграцией.

## 6. Целевая Таблица `reviews`

Минимальная таблица для v1:

```sql
CREATE TABLE reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  target_type TEXT NOT NULL CHECK (target_type IN ('product', 'article')),
  target_id TEXT NOT NULL,
  target_url TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('uk', 'ru')),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  author_email_hash TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
  moderation_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX reviews_target_status_idx
ON reviews (target_type, target_id, language, status, created_at DESC);
```

Поля:

- `target_type` говорит, к чему относится отзыв: товар или статья;
- `target_id` — стабильный ID объекта отзыва;
- `target_url` — URL страницы, с которой отправили отзыв;
- `language` — язык страницы;
- `rating` — оценка 1-5;
- `author_email` хранится приватно и не выводится в публичный HTML;
- `author_email_hash` нужен для дедупликации и антиспама без публичного email;
- `status` управляет модерацией.

## 7. `review_target_id` Для Товаров

Для товаров нельзя привязывать отзывы только к URL. У товара есть украинская и русская версии, а URL может измениться.

Целевой front matter:

```yaml
review_target_id: "sky-lite"
reviews_enabled: true
```

Правило:

- украинская и русская версии одного товара используют одинаковый `review_target_id`;
- `language` хранится отдельно в базе;
- `Product` JSON-LD получает рейтинг только для текущего `review_target_id`;
- отзывы не агрегируются между разными моделями, сериями или категориями.

Для v1 лучше показывать на каждой языковой странице отзывы только ее языка. Позже можно добавить видимый переключатель отзывов на другом языке.

## 8. SEO-First Pipeline

Для максимального SEO нельзя полагаться только на клиентский `fetch`.

Правильный поток:

```text
Netlify Database
-> approved reviews
-> build-time export
-> data/generated/reviews.json
-> Hugo renders visible reviews
-> Hugo renders Product JSON-LD
```

Почему так:

- Google должен видеть отзывы в HTML;
- `AggregateRating` должен описывать видимый контент;
- `ratingValue` и `reviewCount` должны считаться из той же выборки, которая показана пользователю;
- hidden или runtime-only рейтинги повышают риск для rich results.

Целевой файл для Hugo:

```text
data/generated/reviews.json
```

Пример структуры:

```json
{
  "product": {
    "sky-lite": {
      "uk": {
        "ratingValue": 4.8,
        "reviewCount": 12,
        "reviews": []
      }
    }
  }
}
```

## 9. Netlify Functions

Для review-системы нужны функции:

```text
POST /api/reviews
GET /api/reviews?target_id=...
GET /api/admin/reviews
PATCH /api/admin/reviews/:id
```

`POST /api/reviews`:

- принимает отзыв;
- проверяет поля;
- очищает текст;
- ставит статус `pending`;
- не публикует отзыв сразу.

Админские функции:

- показывают `pending` отзывы;
- переводят отзыв в `approved`, `rejected` или `spam`;
- после `approved` должны запускать Netlify build hook, чтобы Hugo пересобрал HTML и JSON-LD.

Для функций использовать современный формат Netlify:

```typescript
import type { Context, Config } from "@netlify/functions";
import { getDatabase } from "@netlify/database";

export default async (req: Request, context: Context) => {
  const db = getDatabase();

  const rows = await db.sql`
    SELECT *
    FROM reviews
    WHERE status = ${"approved"}
  `;

  return Response.json(rows);
};

export const config: Config = {
  path: "/api/reviews",
};
```

Если функция пишется на TypeScript и проект начинает проверять типы функций локально, добавить `@netlify/functions` как dev dependency. Для обычной Hugo-сборки этот пакет сейчас не нужен, пока функции физически не добавлены.

## 10. Правила SEO Для Отзывов

`AggregateRating` в `Product` JSON-LD можно выводить только если:

- отзывы реальные;
- отзывы относятся именно к текущему товару;
- отзывы имеют статус `approved`;
- отзывы публично видны в HTML этой страницы;
- `ratingValue` и `reviewCount` посчитаны из approved отзывов;
- visible review block и JSON-LD используют один источник данных.

`Review` в JSON-LD можно добавлять только для тех отзывов, которые видны пользователю на странице.

Для статей в v1 отзывы можно показывать как публичный UGC-блок, но не добавлять `AggregateRating` в `Article` JSON-LD. Основной SEO-сценарий review rich results для проекта — товарные страницы.

## 11. Что Проверять После Изменений

После добавления миграции:

```bash
netlify dev
netlify database migrations apply
netlify database status
```

После добавления функций:

```bash
netlify dev
```

Проверить:

- `POST /api/reviews` создает только `pending`;
- публичная функция не отдает email;
- admin endpoint защищен;
- `approved` отзыв попадает в build-time export;
- `data/generated/reviews.json` содержит только approved отзывы;
- Hugo не выводит `AggregateRating`, если approved отзывов нет;
- Hugo выводит `AggregateRating`, если approved отзывы есть и видны на странице;
- `npm run build` проходит без ошибок.

## 12. Чего Не Делать

Не делать:

- не создавать sample data в production-схеме;
- не использовать fake reviews;
- не использовать front matter `rating.value` и `rating.count` как долгосрочный источник для `Product` JSON-LD;
- не показывать `AggregateRating` без видимых approved отзывов;
- не агрегировать отзывы серии в рейтинг отдельного товара;
- не публиковать отзыв без модерации;
- не выводить email автора публично;
- не разрешать HTML в тексте отзыва без жесткой очистки;
- не хранить секреты в `netlify.toml`.

## 13. Официальная База

- Netlify Database: `https://docs.netlify.com/build/data-and-storage/netlify-database/`
- Netlify Database CLI: `https://docs.netlify.com/build/data-and-storage/netlify-database/cli/`
- Netlify Database API: `https://docs.netlify.com/build/data-and-storage/netlify-database/api/`
- Google Review Snippet structured data: `https://developers.google.com/search/docs/appearance/structured-data/review-snippet`

## 14. Связанные Документы

- [docs/content/05-front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/05-front-matter-reference.md)
- [docs/seo/21-ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/21-ecommerce-structured-data-playbook-2026.md)
- [docs/seo/20-schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/20-schema-markup-quality-checklist-2026.md)
- [docs/seo/26-json-ld-graph-audit-roadmap-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/26-json-ld-graph-audit-roadmap-2026.md)
- [docs/deploy/16-netlify-routing.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/16-netlify-routing.md)
