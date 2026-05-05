import fs from 'node:fs'
import path from 'node:path'

const reportRoot = path.resolve(process.cwd(), process.argv[2] || 'reports')
const forbiddenTextPatterns = [
  {
    pattern: /local\.adguard\.org/i,
    message: 'AdGuard injection detected'
  },
  {
    pattern: /imagesrcset=[^>]*%20/i,
    message: 'Encoded spaces found in imagesrcset'
  },
  {
    pattern: /\bsrc=(?:""|''|(?=\s|>))/i,
    message: 'Empty image or resource src detected'
  }
]

const lighthouseJsonFiles = []
const payloadHtmlFiles = []
const ciResultFiles = []
const issues = []
const categoryThresholds = {
  performance: 0.95,
  accessibility: 1,
  'best-practices': 1,
  seo: 1
}

function isIgnoredReportPath(filePath) {
  return filePath
    .split(path.sep)
    .some((segment) => segment.startsWith('_invalid') || segment.startsWith('_archive'))
}

function walk(dir) {
  if (!fs.existsSync(dir)) {
    return
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name)

    if (isIgnoredReportPath(filePath)) {
      continue
    }

    if (entry.isDirectory()) {
      walk(filePath)
      continue
    }

    if (entry.name === 'lighthouse.json') {
      lighthouseJsonFiles.push(filePath)
    }
    else if (entry.name === 'payload.html') {
      payloadHtmlFiles.push(filePath)
    }
    else if (/^ci-result.*\.json$/.test(entry.name)) {
      ciResultFiles.push(filePath)
    }
  }
}

function addIssue(filePath, message) {
  issues.push(`${path.relative(process.cwd(), filePath)}: ${message}`)
}

function validateTextFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')

  for (const { pattern, message } of forbiddenTextPatterns) {
    if (pattern.test(text)) {
      addIssue(filePath, message)
    }
  }
}

function validateLighthouseJson(filePath) {
  validateTextFile(filePath)

  const report = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const consoleErrors = report.audits?.['errors-in-console']?.details?.items || []
  const realConsoleErrors = consoleErrors.filter((item) => {
    const url = item.sourceLocation?.url || item.url || ''
    return !/local\.adguard\.org/i.test(url)
  })

  if (realConsoleErrors.length > 0) {
    addIssue(filePath, `${realConsoleErrors.length} browser console error(s) detected`)
  }

  for (const [key, category] of Object.entries(report.categories || {})) {
    const threshold = categoryThresholds[key] ?? 1

    if (typeof category.score === 'number' && category.score < threshold) {
      const score = Math.round(category.score * 100)
      const expected = Math.round(threshold * 100)
      addIssue(filePath, `${key} score is ${score}/100, expected ${expected}/100`)
    }
  }
}

walk(reportRoot)

for (const filePath of payloadHtmlFiles) {
  validateTextFile(filePath)
}

for (const filePath of lighthouseJsonFiles) {
  validateLighthouseJson(filePath)
}

for (const filePath of ciResultFiles) {
  validateTextFile(filePath)
}

if (lighthouseJsonFiles.length === 0 && ciResultFiles.length === 0) {
  console.error(`No active Unlighthouse reports found in ${path.relative(process.cwd(), reportRoot) || '.'}.`)
  process.exit(1)
}

if (issues.length > 0) {
  console.error('Unlighthouse report validation failed:')
  for (const issue of issues.slice(0, 80)) {
    console.error(`- ${issue}`)
  }
  if (issues.length > 80) {
    console.error(`- ...and ${issues.length - 80} more issue(s)`)
  }
  process.exit(1)
}

console.log(`Unlighthouse report validation passed: 10/10 (${lighthouseJsonFiles.length} Lighthouse report(s), ${payloadHtmlFiles.length} payload(s), ${ciResultFiles.length} CI result file(s)).`)
