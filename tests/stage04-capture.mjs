import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const qaDir = path.resolve('qa');
fs.mkdirSync(qaDir, { recursive: true });

const browser = await chromium.launch();
const consoleErrors = [];
const failedRequests = [];

try {
  for (const preset of ['fig', 'editorial']) {
    for (const width of [1600, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(`[${preset}@${width}] ${msg.text()}`);
      });
      page.on('pageerror', (err) => {
        consoleErrors.push(`[${preset}@${width}] PAGEERROR: ${err.message}`);
      });
      page.on('requestfailed', (req) => {
        failedRequests.push(`[${preset}@${width}] ${req.url()} (${req.failure()?.errorText})`);
      });

      await page.goto(`http://127.0.0.1:4173/?fonts=${preset}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);

      const metrics = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const broken = imgs.filter((img) => !img.complete || img.naturalWidth === 0).map((i) => i.src);
        const h1 = document.querySelector('h1');
        const h1Style = h1 ? getComputedStyle(h1) : null;
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          scrollHeight: document.documentElement.scrollHeight,
          brokenImages: broken,
          totalImages: imgs.length,
          h1Font: h1Style ? `${h1Style.fontFamily} (${h1Style.fontSize})` : null,
        };
      });

      console.log(`METRICS [${preset}@${width}]:`, JSON.stringify(metrics));

      await page.screenshot({ path: path.join(qaDir, `stage04-${width}-${preset}-hero.png`) });
      if (width === 1600) {
        await page.screenshot({
          path: path.join(qaDir, `stage04-${width}-${preset}-full.png`),
          fullPage: true,
        });
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}

console.log('CONSOLE ERRORS:', consoleErrors.length, consoleErrors);
console.log('FAILED REQUESTS:', failedRequests.length, failedRequests);
if (consoleErrors.length > 0) process.exitCode = 1;
