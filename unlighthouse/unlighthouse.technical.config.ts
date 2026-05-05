import { defineUnlighthouseConfig } from 'unlighthouse/config'
import { cleanPuppeteerOptions } from './unlighthouse.shared.ts'

/**
 * Unlighthouse Technical Noindex Config
 * ------------------------------------------------------------
 * Назначение файла:
 * Проверять служебные страницы, которые НЕ должны попадать в SEO-индекс.
 *
 * Почему это отдельный конфиг:
 * - /404.html должен быть noindex;
 * - /search/ должен быть noindex;
 * - /ru/search/ должен быть noindex;
 * - поэтому требовать SEO score 100 для этих страниц неправильно.
 *
 * Этот конфиг проверяет только:
 * - performance;
 * - accessibility;
 * - best-practices.
 *
 * SEO-проверку index/follow нужно делать только для нормальных
 * индексируемых страниц через production/urls/strict конфиги.
 *
 * Команда запуска:
 * npm run audit:technical
 */
export default defineUnlighthouseConfig({
  /**
   * Production-домен сайта.
   */
  site: 'https://aerocool.ua',

  /**
   * Отдельная папка для служебных noindex-отчетов.
   */
  outputPath: './reports/technical-noindex',

  /**
   * Каждый запуск должен быть свежим.
   */
  cache: false,

  puppeteerOptions: cleanPuppeteerOptions,

  /**
   * Явный список технических страниц.
   *
   * Мы не берем sitemap, потому что sitemap должен содержать только
   * индексируемые страницы. 404/search проверяются отдельно.
   */
  urls: [
    'https://aerocool.ua/404.html',
    'https://aerocool.ua/search/',
    'https://aerocool.ua/ru/search/'
  ],

  scanner: {
    /**
     * Проверяем mobile-first, как основной SEO/UX режим.
     */
    device: 'mobile',

    /**
     * Throttling делает проверку ближе к реальному пользователю.
     */
    throttle: true,

    /**
     * 2 samples = баланс скорости и стабильности.
     */
    samples: 2,

    /**
     * sitemap/crawler не нужны, потому что urls задан вручную.
     */
    sitemap: false,
    crawler: false,

    /**
     * robots.txt отключен только для технического аудита,
     * чтобы Unlighthouse мог открыть служебные страницы.
     */
    robotsTxt: false,

    /**
     * Hugo-сайт статический, JS для поиска ссылок не нужен.
     */
    skipJavascript: true,

    /**
     * Мультиязычность не игнорируем, потому что есть /ru/search/.
     */
    ignoreI18nPages: false,

    /**
     * Dynamic sampling не нужен при явном списке URL.
     */
    dynamicSampling: false
  },

  lighthouseOptions: {
    /**
     * SEO намеренно НЕ проверяется в этом конфиге.
     */
    onlyCategories: [
      'performance',
      'accessibility',
      'best-practices'
    ]
  },

  ci: {
    /**
     * Служебные страницы тоже должны быть быстрыми и без технических ошибок.
     */
    budget: {
      performance: 95,
      accessibility: 100,
      'best-practices': 100
    },
    buildStatic: true
  }
})
