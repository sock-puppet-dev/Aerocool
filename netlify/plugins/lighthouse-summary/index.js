const net = require('node:net');

const DEFAULT_PATHS = ['/'];
const DEFAULT_CHROME_PORT = 9222;

const normalizePath = (path) => {
  if (typeof path !== 'string' || path.trim() === '') {
    return '/';
  }

  const trimmed = path.trim();
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
};

const getAuditPaths = (inputs) => {
  if (Array.isArray(inputs?.paths) && inputs.paths.length > 0) {
    return inputs.paths.map(normalizePath);
  }

  return DEFAULT_PATHS;
};

const getDeployBaseUrl = () => {
  return (
    process.env.DEPLOY_PRIME_URL ||
    process.env.DEPLOY_URL ||
    process.env.URL ||
    ''
  ).replace(/\/$/, '');
};

const formatCategoryScore = ({ title, score }) => {
  const normalizedScore =
    typeof score === 'number' ? Math.round(score * 100) : 'unknown';
  return `${title}: ${normalizedScore}`;
};

const buildAuditUrl = (baseUrl, path) => {
  return new URL(path, `${baseUrl}/`).toString();
};

const isPortAvailable = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '127.0.0.1');
  });
};

const getAvailableChromePort = async () => {
  for (let port = DEFAULT_CHROME_PORT; port < DEFAULT_CHROME_PORT + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }

  throw new Error('No available localhost port found for Lighthouse Chrome.');
};

module.exports = {
  onSuccess: async ({ inputs, utils }) => {
    const baseUrl = getDeployBaseUrl();

    if (!baseUrl) {
      utils.status.show({
        summary: 'Lighthouse skipped: Netlify deploy URL is not available.',
      });
      return;
    }

    let chrome;

    try {
      const [{ default: lighthouse }, puppeteerModule, chromeLauncher] =
        await Promise.all([
          import('lighthouse'),
          import('puppeteer'),
          import('chrome-launcher'),
        ]);

      const chromePath = await puppeteerModule.default.executablePath();
      const port = await getAvailableChromePort();

      chrome = await chromeLauncher.launch({
        chromePath,
        port,
        chromeFlags: [
          '--headless=new',
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
        ],
        logLevel: 'error',
      });

      const summaries = [];

      for (const path of getAuditPaths(inputs)) {
        const auditUrl = buildAuditUrl(baseUrl, path);
        const result = await lighthouse(
          auditUrl,
          {
            port: chrome.port,
            output: 'html',
            logLevel: 'error',
          },
          {
            extends: 'lighthouse:default',
            settings: {
              // Branch deploys can intentionally carry noindex headers/meta.
              // This audit checks page quality without false failures from staging robots policy.
              skipAudits: ['is-crawlable'],
            },
          },
        );

        const categories = Object.values(result.lhr.categories);
        const shortSummary = categories.map(formatCategoryScore).join(', ');
        summaries.push(`Lighthouse summary for path '${path}': ${shortSummary}`);
      }

      utils.status.show({
        summary: summaries.join('\n'),
      });
    } catch (error) {
      utils.build.failPlugin(
        `Lighthouse summary failed: ${error.message}`,
        { error },
      );
    } finally {
      if (chrome) {
        await chrome.kill();
      }
    }
  },
};
