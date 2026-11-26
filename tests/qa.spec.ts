import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const AUDIT_VIEWPORTS = [1440, 1280, 768, 390, 320] as const;

test.describe('ILAN Luxury Minimalist Audit', () => {
  for (const width of AUDIT_VIEWPORTS) {
    test(`visual & layout audit at ${width}px`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const failedRequests: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', (err) => consoleErrors.push(err.message));
      page.on('requestfailed', (req) => {
        failedRequests.push(`${req.url()} (${req.failure()?.errorText})`);
      });

      await page.setViewportSize({ width, height: width <= 430 ? 844 : 900 });
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);

      // Scroll through page so IntersectionObserver reveals all sections cleanly for full-page audit
      await page.evaluate(async () => {
        const step = 480;
        for (let y = 0; y <= document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(500);

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
        };
      });

      expect(consoleErrors).toEqual([]);
      expect(failedRequests).toEqual([]);
      expect(audit.brokenImages).toEqual([]);
      expect(audit.scrollWidth).toBeLessThanOrEqual(audit.innerWidth);
      expect(audit.bgColor).toBe('rgb(5, 5, 5)');

      if (width !== 320) {
        const outDir = path.resolve('references/lux-v1');
        fs.mkdirSync(outDir, { recursive: true });
        if (width === 1440) {
          await page.screenshot({ path: path.join(outDir, '1440-hero.png'), fullPage: false });
        }
        await page.screenshot({ path: path.join(outDir, `${width}-full.png`), fullPage: true });
      }
    });
  }

  test('interactions: menu tabs, booking form, no cart, mobile overlay', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    // No floating cart anywhere
    await expect(page.getByText(/К столу/)).toHaveCount(0);

    // Header links
    await expect(page.locator('header')).toContainText('ILAN');
    await expect(page.locator('header')).toContainText('Забронировать');

    // Menu tabs
    const menu = page.locator('#menu');
    await menu.scrollIntoViewIfNeeded();
    await expect(menu.locator('img')).toHaveCount(0);
    await menu.getByRole('tab', { name: 'Закуски' }).click();
    await expect(menu).toContainText('Мясное ассорти');
    await menu.getByRole('tab', { name: 'Бар' }).click();
    await expect(menu).toContainText('Авторская барная карта');

    // Booking form
    const form = page.locator('#booking form');
    await form.locator('input[type="date"]').fill('2026-12-01');
    await form.locator('input[type="text"]').first().fill('Алексей');
    await form.locator('input[type="tel"]').fill('+7 (900) 111-22-33');
    await form.getByRole('button', { name: 'Отправить заявку' }).click();
    await expect(form.getByRole('status')).toContainText('Заявка сформирована');

    // Mobile overlay menu
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Открыть меню навигации' }).click();
    const dialog = page.getByRole('dialog', { name: 'Меню сайта' });
    await expect(dialog).toBeVisible();
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
