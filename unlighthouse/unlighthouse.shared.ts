const chromeArgs = [
  '--disable-extensions',
  '--disable-component-extensions-with-background-pages',
  '--disable-background-networking',
  '--disable-default-apps',
  '--disable-sync',
  '--disable-translate',
  '--no-default-browser-check',
  '--no-first-run'
]

export const cleanPuppeteerOptions = {
  headless: true,
  args: chromeArgs
}

export const qualityCategories = [
  'performance',
  'accessibility',
  'best-practices',
  'seo'
]

export function getRequiredPreviewSite() {
  const previewSite = process.env.UNLIGHTHOUSE_PREVIEW_URL?.trim()

  if (!previewSite) {
    throw new Error(
      'Set UNLIGHTHOUSE_PREVIEW_URL to the Netlify Deploy Preview URL before running audit:preview.'
    )
  }

  try {
    const url = new URL(previewSite)

    if (url.protocol !== 'https:') {
      throw new Error('Preview URL must use https://')
    }

    return url.toString().replace(/\/$/, '')
  }
  catch (error) {
    if (error instanceof Error) {
      throw new Error(`Invalid UNLIGHTHOUSE_PREVIEW_URL: ${error.message}`)
    }

    throw error
  }
}
