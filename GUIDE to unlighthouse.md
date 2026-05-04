Unlighthouse — это инструмент, который запускает Lighthouse не для одной страницы,
а для многих страниц сайта сразу.

Установка:
npm install -g unlighthouse

Проверка:
unlighthouse --version

Обновить:
npm install -g unlighthouse@latest

Запуск:
unlighthouse --site https://aerocool.ua

Что произойдёт:
1. Unlighthouse откроет сайт
2. найдёт внутренние ссылки
3. выберет страницы для аудита
4. запустит Lighthouse
5. создаст локальный dashboard
6. откроет результаты в браузере

Главные метрики в Unlighthouse:
Он основан на Lighthouse, поэтому метрики похожие:

Метрика             Что значит
FCP                 First Contentful Paint — когда появился первый контент
LCP                 Largest Contentful Paint — когда появился главный большой элемент
CLS                 Cumulative Layout Shift — сдвиги макета
TBT                 Total Blocking Time — блокировка главного потока
Speed Index         Скорость визуального заполнения
TTI                 Time to Interactive, в новых версиях менее важен
Performance Score   Общая оценка производительности

