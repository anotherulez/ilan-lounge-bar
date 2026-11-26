import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const VIEWPORTS = [320, 375, 390, 430, 768, 1024, 1440, 1920] as const;

test.describe('ILAN Lounge Bar QA', () => {
  for (const width of VIEWPORTS) {
    test(`layout and zero overflow at ${width}px`, async ({ page }) => {
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

      const audit = await page.evaluate(() => {
        const doc = document.documentElement;
        const imgs = Array.from(document.querySelectorAll('img')).filter(
          (img) => img.getAttribute('loading') !== 'lazy'
        );
        const brokenImages = imgs
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.getAttribute('src'));

        return {
          scrollWidth: doc.scrollWidth,
          innerWidth: window.innerWidth,
          brokenImages,
        };
      });

      expect(consoleErrors).toEqual([]);
      expect(failedRequests).toEqual([]);
      expect(audit.brokenImages).toEqual([]);
      expect(audit.scrollWidth).toBeLessThanOrEqual(audit.innerWidth);

      const qaDir = path.resolve('qa');
      fs.mkdirSync(qaDir, { recursive: true });
      await page.screenshot({ path: path.join(qaDir, `${width}.png`), fullPage: false });
      if (width === 1440) {
        await page.screenshot({ path: path.join(qaDir, 'final-1440-full.png'), fullPage: true });
      }
    });
  }

  test('header nav, 3D gallery lightbox, 3D menu, demo booking and mobile menu', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const headerText = await page.locator('header').innerText();
    expect(headerText).not.toMatch(/АТМОСФЕРА|PS5/i);
    expect(headerText).toMatch(/VIP/i);

    // Lightbox open, next photo, Escape close
    await page.locator('header a[href="#gallery"]').click();
    await page.waitForTimeout(300);
    const gallerySection = page.locator('#gallery');
    await gallerySection.screenshot({ path: path.resolve('qa/final-gallery.png') });
    await page.screenshot({ path: path.resolve('qa/final-gallery-viewport.png') });
    await gallerySection.locator('button').first().click();
    const lightbox = page.getByRole('dialog');
    await expect(lightbox).toBeVisible();
    await page.getByRole('button', { name: 'Следующее фото' }).click();
    await expect(lightbox.getByText('2 / 11')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(lightbox).toBeHidden();

    // 3D Menu + Grid switch + Tabs
    const menuSection = page.locator('#menu');
    await menuSection.scrollIntoViewIfNeeded();
    await expect(menuSection).not.toContainText('Средний чек');
    await page.getByRole('button', { name: 'Следующая позиция' }).click();
    await expect(menuSection.getByText('4 / 5')).toBeVisible();

    const gridViewBtn = page.getByRole('button', { name: 'Сетка 5 в ряд' });
    await gridViewBtn.click();
    await expect(gridViewBtn).toHaveAttribute('aria-pressed', 'true');

    const snacksTab = page.getByRole('tab', { name: 'Закуски и салаты' });
    await snacksTab.click();
    await expect(page.getByText('Сэндвич с копчёной курицей')).toBeVisible();

    // Reviews without critic phrasing
    const reviewsText = await page.locator('#reviews').innerText();
    expect(reviewsText).not.toContain('Гости отмечают');

    // Demo booking form
    const form = page.locator('#booking form');
    await form.locator('input[type="date"]').fill('2026-12-01');
    await form.locator('input[type="text"]').fill('Алексей');
    await form.locator('input[type="tel"]').fill('+7 (900) 111-22-33');
    await form.getByRole('button', { name: 'Забронировать стол' }).click();
    await expect(form.getByRole('status')).toContainText('Заявка сформирована');

    // Mobile menu
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
