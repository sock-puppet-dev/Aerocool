import { defineUnlighthouseConfig } from 'unlighthouse/config'
import { cleanPuppeteerOptions } from './unlighthouse.shared.ts'

export default defineUnlighthouseConfig({
  site: 'https://aerocool.ua',

  outputPath: './reports/technical-noindex',

  cache: false,

  puppeteerOptions: cleanPuppeteerOptions,

  urls: [
    'https://aerocool.ua/404.html',
    'https://aerocool.ua/search/',
    'https://aerocool.ua/ru/search/'
  ],

  scanner: {
    device: 'mobile',
    throttle: true,
    samples: 2,
    sitemap: false,
    crawler: false,
    robotsTxt: false,
    skipJavascript: true,
    ignoreI18nPages: false,
    dynamicSampling: false
  },

  lighthouseOptions: {
    onlyCategories: [
      'performance',
      'accessibility',
      'best-practices'
    ]
  },

  ci: {
    budget: {
      performance: 95,
      accessibility: 100,
      'best-practices': 100
    },
    buildStatic: true
  }
})
