# Локальные Инструменты Через `mise`

Обновлено: 2026-05-13.

`mise` — это менеджер версий инструментов. В этом проекте он нужен, чтобы локально запускать те же версии `Hugo` и `Node`, которые используются в `Netlify`.

Базовая синхронизация tooling-документации с Hugo 0.161-era Node permission model и Tailwind CSS 4 зафиксирована в [37-2026-05-13-documentation-2026-best-practices-sync-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md).

Проще говоря:

```text
mise.toml говорит компьютеру:
"для этого проекта используй Hugo 0.161.0 и Node 24".
```

## 1. Актуальные версии проекта

В проекте используются:

- `Hugo 0.161.0`
- `Node 24`

Они зафиксированы в двух местах:

- `mise.toml` — для локальной разработки;
- `netlify.toml` — для сборки на Netlify.

Важно: актуальный файл называется `mise.toml`, без точки в начале. Если где-то встретилось старое имя `.mise.toml`, его нужно считать устаревшим.

Текущий `mise.toml`:

```toml
[tools]
hugo = "0.161.0"
node = "24"
```

## 2. Зачем это нужно новичку

Без фиксированных версий может быть так:

- локально сайт собирается одной версией Hugo;
- Netlify собирает другой версией Hugo;
- Tailwind работает у тебя, но не работает в deploy;
- ошибка появляется только после публикации.

`mise` снижает этот риск: локальная среда и Netlify становятся максимально похожими.

## 3. Базовая диагностика

Проверить, что `mise` установлен и видит проект:

```bash
mise version
mise doctor
mise current hugo
mise current node
mise which hugo
mise ls --installed
```

Если команды показывают `Hugo 0.161.0` и `Node 24`, всё хорошо.

Примечание на 2026-05-13: у Hugo уже есть более новые patch-релизы после `0.161.0`, но проект намеренно держит pinned-версию `0.161.0` в `mise.toml` и `netlify.toml` для воспроизводимости. Обновлять Hugo можно только отдельной задачей с повторной сборкой, Tailwind/CWV/SEO-проверками и обновлением этого документа.

## 4. Установка версий проекта

Из корня проекта:

```bash
cd /Users/stadnyk/MEGA/Aerocool
mise install
```

Что делает команда:

- читает `mise.toml`;
- ставит `Hugo 0.161.0`;
- ставит `Node 24`;
- подготавливает локальную оболочку к запуску проекта.

Если `mise` попросит доверять конфигу:

```bash
mise trust
```

После этого снова:

```bash
mise install
```

## 5. Проверка после установки

```bash
hugo version
node -v
npm -v
```

Ожидаемо:

- Hugo должен быть `0.161.0`;
- Node должен быть `24.x`.

Если текущая оболочка не подхватила версии, запускай команды через `mise exec --`:

```bash
mise exec -- hugo version
mise exec -- node -v
mise exec -- npm run build
```

## 6. Как запускать проект

Первый раз:

```bash
cd /Users/stadnyk/MEGA/Aerocool
mise install
npm install
```

Локальный сервер:

```bash
npm run dev
```

Обычная development-сборка:

```bash
npm run build
```

Локальная production-сборка:

```bash
npm run build:production
```

## 7. Почему важен Node 24

В Hugo `0.161.0` Node-инструменты, включая Tailwind, запускаются через Node permission model.

Для этого проекта важно:

- держать `Node 24`;
- держать `tailwindcss` и `@tailwindcss/cli` как npm-зависимости проекта;
- не переходить на standalone Tailwind CLI;
- не удалять `package-lock.json` без причины.

Tailwind в проекте собирается через Hugo `css.TailwindCSS`, а не отдельным `tailwind --watch`.

## 8. Частые проблемы

| Проблема | Что значит | Что делать |
| --- | --- | --- |
| `hugo: command not found` | Hugo не установлен или оболочка не видит mise | Запустить `mise install`, затем открыть новый терминал. |
| Версия Hugo не `0.161.0` | Подхватилась системная версия | Запустить через `mise exec -- hugo version`. |
| Netlify собирает иначе, чем локально | Разные версии инструментов или environment | Сверить `mise.toml`, `netlify.toml`, `package-lock.json`. |
| Tailwind не собирается | Node/Tailwind окружение сломано | Проверить `Node 24`, `npm install`, `assets/css/main.css`, `layouts/_partials/css.html`. |

## 9. Самая короткая памятка

```bash
cd /Users/stadnyk/MEGA/Aerocool
mise install
npm install
npm run build
npm run build:production
```

Если эти команды проходят, локальная среда проекта в порядке.
