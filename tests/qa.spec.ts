import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const AUDIT_VIEWPORTS = [2560, 1440, 768, 390, 320] as const;

test.describe('ILAN Luxury Minimalist v3 Audit', () => {
  for (const width of AUDIT_VIEWPORTS) {
    test(`visual & layout audit at ${width}px`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const failedRequests: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', (err) => consoleErrors.push(err.message));
      page.on('requestfailed', (req) => {
        // External map tile requests inside third-party iframe can abort on rapid navigation; flag only local errors
        if (req.url().startsWith('http://127.0.0.1')) {
          failedRequests.push(`${req.url()} (${req.failure()?.errorText})`);
        }
      });

      await page.setViewportSize({
        width,
        height: width <= 430 ? 844 : width === 2560 ? 1440 : 900,
      });
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);

      await page.evaluate(async () => {
        const step = 480;
        for (let y = 0; y <= document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 70));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(350);

      const audit = await page.evaluate(() => {
        const doc = document.documentElement;
        const imgs = Array.from(document.querySelectorAll('img'));
        const brokenImages = imgs
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.getAttribute('src'));

        return {
          scrollWidth: doc.scrollWidth,
          innerWidth: window.innerWidth,
          brokenImages,
          bgColor: getComputedStyle(document.body).backgroundColor,
          bodyText: document.body.innerText,
        };
      });

      expect(consoleErrors).toEqual([]);
      expect(failedRequests).toEqual([]);
      expect(audit.brokenImages).toEqual([]);
      expect(audit.scrollWidth).toBeLessThanOrEqual(audit.innerWidth);
      expect(audit.bgColor).toBe('rgb(5, 5, 5)');
      expect(audit.bodyText).not.toMatch(/Пространство/i);

      const outDir = path.resolve('references/lux-v3');
      fs.mkdirSync(outDir, { recursive: true });
      await page.screenshot({ path: path.join(outDir, `${width}-full.png`), fullPage: true });
    });
  }

  test('v3 sections, reviews, dark map, booking modal, and mobile menu', async ({ page }) => {
    const outDir = path.resolve('references/lux-v3');
    fs.mkdirSync(outDir, { recursive: true });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    // Header navigation without Пространство
    const headerText = await page.locator('header').innerText();
    expect(headerText).not.toMatch(/Пространство/i);
    expect(headerText).toMatch(/Меню/);
    expect(headerText).toMatch(/VIP/);
    expect(headerText).toMatch(/Новости/);
    expect(headerText).toMatch(/Отзывы/);
    expect(headerText).toMatch(/Контакты/);

    // Hall & VIP marquees
    const hall = page.locator('#hall');
    await hall.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await hall.screenshot({ path: path.join(outDir, 'hall-1440.png') });

    // News section without marquee
    const news = page.locator('#news');
    await news.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    expect(await news.locator('img').count()).toBe(6);

    // Reviews section ("Отзывы" + real Restoclub quote + Yandex/2GIS counts)
    const reviews = page.locator('#reviews');
    await reviews.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await expect(reviews).toContainText('4.9');
    await expect(reviews).toContainText('Dmitrievna Kristyusha');
    await expect(reviews).toContainText('Хуго учел все предпочтения');
    await expect(reviews).toContainText('497 оценок');
    await expect(reviews).toContainText('413 оценок');
    await expect(reviews.locator('article')).toHaveCount(3);
    await reviews.screenshot({ path: path.join(outDir, 'reviews-1440.png') });

    // Ad-free Dark Map section ("Как найти") via Leaflet
    const mapSection = page.locator('#location');
    await mapSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await expect(mapSection.locator('iframe')).toHaveCount(0);
    await expect(mapSection.locator('.leaflet-container')).toBeVisible();
    await mapSection.screenshot({ path: path.join(outDir, 'map-1440.png') });

    // Booking modal & form
    await page.getByRole('button', { name: 'Занять VIP' }).click();
    const modal = page.getByRole('dialog', { name: 'Где вам удобно?' });
    await expect(modal).toBeVisible();
    await modal.getByRole('button', { name: /На сайте/i }).click();
    await expect(modal).toBeHidden();

    const booking = page.locator('#booking');
    await expect(page.getByRole('radio', { name: 'Закрытый VIP' })).toHaveAttribute(
      'aria-checked',
      'true'
    );
    await page.getByRole('button', { name: 'Увеличить количество гостей' }).click();
    await expect(booking).toContainText('3 гостя');

    // Mobile menu (no Пространство)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Открыть меню навигации' }).click();
    const dialog = page.getByRole('dialog', { name: 'Меню сайта' });
    await expect(dialog).toBeVisible();
    await expect(dialog).not.toContainText(/Пространство/i);
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('prefers-reduced-motion renders cleanly', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toBeVisible();
  });
});
