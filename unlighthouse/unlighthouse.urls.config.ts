import { defineUnlighthouseConfig } from 'unlighthouse/config'
import { cleanPuppeteerOptions, qualityCategories } from './unlighthouse.shared.ts'

/**
 * Unlighthouse Critical URLs Config
 * ------------------------------------------------------------
 * Назначение файла:
 * Проверять не весь сайт, а только самые важные типы страниц.
 *
 * Это самый удобный быстрый аудит:
 * - главная;
 * - русская главная;
 * - каталог;
 * - страница товара;
 * - статьи;
 * - FAQ;
 * - контакты;
 *
 * Когда использовать:
 * - после небольшого изменения CSS;
 * - после изменения header/footer;
 * - после изменения JSON-LD;
 * - после изменения hero-блока;
 * - после изменения карточек товаров;
 * - перед быстрым deploy.
 *
 * Команда:
 * npm run audit:urls
 */

export default defineUnlighthouseConfig({
  /**
   * Базовый сайт.
   */
  site: 'https://aerocool.ua',

  /**
   * Отдельная папка для отчётов по важным URL.
   */
  outputPath: './reports/critical-urls',

  /**
   * Без кэша.
   */
  cache: false,

  puppeteerOptions: cleanPuppeteerOptions,

  /**
   * urls
   * ------------------------------------------------------------
   * Явный список страниц для проверки.
   *
   * ВАЖНО:
   * Проверь, что все URL реально существуют на твоём сайте.
   *
   * Если какой-то URL отличается — замени его.
   *
   * Плюс этого режима:
   * - быстро;
   * - стабильно;
   * - проверяются именно главные шаблоны сайта.
   */
  urls: [
    /**
     * Главная украинская страница.
     */
    'https://aerocool.ua/',

    /**
     * Главная русская страница.
     */
    'https://aerocool.ua/ru/',

    /**
     * Каталог товаров.
     */
    'https://aerocool.ua/products/',
    'https://aerocool.ua/ru/products/',

    /**
     * Серии товаров.
     */
    'https://aerocool.ua/products/xtal/',
    'https://aerocool.ua/products/wing/',
    'https://aerocool.ua/products/sky/',

    'https://aerocool.ua/ru/products/xtal/',
    'https://aerocool.ua/ru/products/wing/',
    'https://aerocool.ua/ru/products/sky/',

    /**
     * Важные страницы товаров.
     * Если какие-то URL отличаются — замени на реальные.
     */
    'https://aerocool.ua/products/xtal/racer-black/',
    'https://aerocool.ua/products/xtal/racer-dark-grey/',
    'https://aerocool.ua/products/xtal/mesh-black/',
    'https://aerocool.ua/products/xtal/loft-air-dark-grey/',
    'https://aerocool.ua/products/xtal/loft-air-light-grey/',

    'https://aerocool.ua/products/wing/racer-black/',
    'https://aerocool.ua/products/wing/racer-dark-grey/',
    'https://aerocool.ua/products/wing/mesh-black/',
    'https://aerocool.ua/products/wing/loft-air-dark-grey/',
    'https://aerocool.ua/products/wing/loft-air-light-grey/',

    'https://aerocool.ua/products/sky/360/',
    'https://aerocool.ua/products/sky/lite/',

    /**
     * Русские версии важных страниц товаров.
     */
    'https://aerocool.ua/ru/products/xtal/racer-black/',
    'https://aerocool.ua/ru/products/xtal/racer-dark-grey/',
    'https://aerocool.ua/ru/products/xtal/mesh-black/',
    'https://aerocool.ua/ru/products/xtal/loft-air-dark-grey/',
    'https://aerocool.ua/ru/products/xtal/loft-air-light-grey/',

    'https://aerocool.ua/ru/products/wing/racer-black/',
    'https://aerocool.ua/ru/products/wing/racer-dark-grey/',
    'https://aerocool.ua/ru/products/wing/mesh-black/',
    'https://aerocool.ua/ru/products/wing/loft-air-dark-grey/',
    'https://aerocool.ua/ru/products/wing/loft-air-light-grey/',

    'https://aerocool.ua/ru/products/sky/360/',
    'https://aerocool.ua/ru/products/sky/lite/',

    /**
     * Articles / News / FAQ / Contact.
     */
    'https://aerocool.ua/articles/',
    'https://aerocool.ua/news/',
    'https://aerocool.ua/faq/',
    'https://aerocool.ua/contact/',

    'https://aerocool.ua/ru/articles/',
    'https://aerocool.ua/ru/news/',
    'https://aerocool.ua/ru/faq/',
    'https://aerocool.ua/ru/contact/',

    /**
     * Примеры статей.
     */
    'https://aerocool.ua/articles/how-to-choose-aerocool-chair/',
    'https://aerocool.ua/articles/wing-vs-xtal/',
    'https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/',

    'https://aerocool.ua/ru/articles/how-to-choose-aerocool-chair/',
    'https://aerocool.ua/ru/articles/wing-vs-xtal/',
    'https://aerocool.ua/ru/articles/racer-vs-loft-air-vs-mesh/',

    /**
     * Технические noindex-страницы проверяются отдельным конфигом
     * unlighthouse.technical.config.ts, чтобы SEO budget 100 оставался
     * честным для индексируемых URL.
     */
  ],

  scanner: {
    /**
     * Проверяем mobile-first.
     */
    device: 'mobile',

    /**
     * Включаем throttling.
     */
    throttle: true,

    /**
     * 3 samples для важных страниц.
     */
    samples: 3,

    /**
     * В режиме urls sitemap и crawler не нужны,
     * потому что список URL задан вручную.
     */
    sitemap: false,
    crawler: false,

    /**
     * robots.txt отключаем для технического аудита.
     */
    robotsTxt: false,

    /**
     * JS для поиска ссылок не нужен.
     */
    skipJavascript: true,

    /**
     * Не игнорируем i18n.
     */
    ignoreI18nPages: false,

    /**
     * Dynamic sampling не нужен, потому что URL заданы вручную.
     */
    dynamicSampling: false
  },

  lighthouseOptions: {
    /**
     * Главные категории Lighthouse.
     */
    onlyCategories: qualityCategories,

    /**
     * Чистый запуск.
     */
  },

  ci: {
    /**
     * Стандарты качества для ключевых страниц.
     */
    budget: {
      performance: 95,
      accessibility: 100,
      'best-practices': 100,
      seo: 100
    },

    /**
     * Статический отчёт.
     */
    buildStatic: true
  }
})
