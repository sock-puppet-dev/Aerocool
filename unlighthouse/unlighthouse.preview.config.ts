import { defineUnlighthouseConfig } from 'unlighthouse/config'
import { cleanPuppeteerOptions, getRequiredPreviewSite, qualityCategories } from './unlighthouse.shared.ts'

/**
 * Unlighthouse Preview Config
 * ------------------------------------------------------------
 * Назначение файла:
 * Проверять Netlify Deploy Preview ДО публикации изменений на production.
 *
 * Это очень правильный workflow:
 * 1. сделал изменения в Hugo;
 * 2. push в GitHub;
 * 3. Netlify создал Deploy Preview;
 * 4. передал preview URL через UNLIGHTHOUSE_PREVIEW_URL;
 * 5. запустил npm run audit:preview;
 * 6. проверил качество;
 * 7. только потом merge/deploy в production.
 *
 * Команда:
 * npm run audit:preview
 */

/**
 * previewSite берется только из UNLIGHTHOUSE_PREVIEW_URL.
 * Так в конфиге не остается случайного старого deploy-preview URL.
 */
const previewSite = getRequiredPreviewSite()

export default defineUnlighthouseConfig({
  /**
   * Проверяем не production, а preview.
   */
  site: previewSite,

  /**
   * Отдельная папка для preview-отчётов.
   */
  outputPath: './reports/preview',

  /**
   * Без кэша, потому что preview часто меняется.
   */
  cache: false,

  /**
   * User-Agent для логов.
   */
  userAgent: 'Aerocool-Unlighthouse-Preview-Audit/1.0',

  puppeteerOptions: cleanPuppeteerOptions,

  scanner: {
    /**
     * Preview тоже проверяем mobile-first.
     */
    device: 'mobile',

    /**
     * Throttling включён.
     */
    throttle: true,

    /**
     * 2 samples = хороший баланс для preview.
     */
    samples: 2,

    /**
     * Preview можно ограничить меньше, чем production.
     */
    maxRoutes: 300,

    /**
     * Используем sitemap preview-сайта.
     *
     * Важно:
     * На Netlify preview sitemap может содержать production canonical.
     * Это нормально для технического аудита, но SEO-финальную проверку
     * всё равно делай на production-домене.
     */
    sitemap: true,

    /**
     * Для preview-аудита тоже лучше не зависеть от robots.txt.
     */
    robotsTxt: false,

    /**
     * Crawler включён.
     */
    crawler: true,

    /**
     * Hugo-сайт статический, JS для поиска ссылок не нужен.
     */
    skipJavascript: true,

    /**
     * Проверяем uk/ru версии.
     */
    ignoreI18nPages: false,

    /**
     * Меньше агрессивной группировки URL.
     */
    dynamicSampling: false,

    /**
     * Исключения.
     */
    exclude: [
      '/tags/**',
      '/categories/**',
      '/page/**',

      '/wp-**',
      '/wp-admin/**',
      '/wp-content/**',
      '/wp-includes/**',
      '/xmlrpc.php',

      '/.git/**',
      '/.env',
      '/.env.**',
      '/openid_connect/**',
      '/cpanel/**',

      '/sitemap.xml',
      '/robots.txt',
      '/manifest.webmanifest',
      '/site.webmanifest',
      '/sw.js'
    ]
  },

  lighthouseOptions: {
    /**
     * Основные категории.
     */
    onlyCategories: qualityCategories,

    /**
     * Чистый запуск: Lighthouse по умолчанию сбрасывает storage.
     */
  },

  ci: {
    /**
     * Preview-бюджеты.
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
