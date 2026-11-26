import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const AUDIT_VIEWPORTS = [1440, 1280, 768, 390, 320] as const;

test.describe('ILAN Luxury Minimalist v2 Audit', () => {
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
        };
      });

      expect(consoleErrors).toEqual([]);
      expect(failedRequests).toEqual([]);
      expect(audit.brokenImages).toEqual([]);
      expect(audit.scrollWidth).toBeLessThanOrEqual(audit.innerWidth);
      expect(audit.bgColor).toBe('rgb(5, 5, 5)');

      if (width !== 320) {
        const outDir = path.resolve('references/lux-v2');
        fs.mkdirSync(outDir, { recursive: true });
        if (width === 1440) {
          await page.screenshot({ path: path.join(outDir, '01-hero-1440.png'), fullPage: false });
        }
        await page.screenshot({ path: path.join(outDir, `${width}-full.png`), fullPage: true });
      }
    });
  }

  test('Stage 1-3 interactions & lux-v2 section captures', async ({ page }) => {
    const outDir = path.resolve('references/lux-v2');
    fs.mkdirSync(outDir, { recursive: true });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    // No floating cart
    await expect(page.getByText(/К столу/)).toHaveCount(0);

    // Hero & Header
    const hero = page.locator('#top');
    await expect(hero.locator('h1')).toHaveText('ILAN');
    await expect(hero).toContainText('lounge bar');
    await expect(hero).not.toContainText('До 04:00.');
    await expect(page.locator('header')).toContainText('Новости');

    // Section with SeamlessImageMarquee
    const space = page.locator('#space');
    await space.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await space.screenshot({ path: path.join(outDir, '02-space-marquee-1440.png') });

    // Menu tabs
    const menu = page.locator('#menu');
    await menu.scrollIntoViewIfNeeded();
    expect(await menu.locator('img').count()).toBeGreaterThan(0);
    await menu.getByRole('tab', { name: 'Закуски' }).click();
    await expect(menu).toContainText('Мясное ассорти');
    await menu.getByRole('tab', { name: 'Бар' }).click();
    await expect(menu).toContainText('Авторская барная карта');

    // News section & source filter pills
    const news = page.locator('#news');
    await news.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await news.screenshot({ path: path.join(outDir, '05-news-section-1440.png') });
    await expect(news.locator('article')).toHaveCount(6);
    await news.getByRole('tab', { name: 'Яндекс Карты' }).click();
    await expect(news.locator('article')).toHaveCount(2);
    await news.getByRole('tab', { name: 'ВКонтакте' }).click();
    await expect(news.locator('article')).toHaveCount(2);
    await news.getByRole('tab', { name: 'Instagram' }).click();
    await expect(news.locator('article')).toHaveCount(2);
    await news.getByRole('tab', { name: 'Все' }).click();
    await expect(news.locator('article')).toHaveCount(6);

    // Booking modal ("Где вам удобно?") opened from VIP
    await page.getByRole('button', { name: 'Занять VIP' }).click();
    const bookingModal = page.getByRole('dialog', { name: 'Где вам удобно?' });
    await expect(bookingModal).toBeVisible();
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(outDir, '03-booking-modal-1440.png') });
    await expect(bookingModal.getByRole('link', { name: /Telegram/i })).toHaveAttribute(
      'href',
      'https://telegram.org'
    );
    await expect(bookingModal.getByRole('link', { name: /Позвонить/i })).toHaveAttribute(
      'href',
      'tel:+79090285858'
    );
    await bookingModal.getByRole('button', { name: /На сайте/i }).click();
    await expect(bookingModal).toBeHidden();

    // Booking form with VIP pre-selected & Stepper
    const bookingSection = page.locator('#booking');
    await bookingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    const vipRadio = page.getByRole('radio', { name: 'Закрытый VIP' });
    await expect(vipRadio).toHaveAttribute('aria-checked', 'true');
    await page.getByRole('button', { name: 'Увеличить количество гостей' }).click();
    await page.getByRole('button', { name: 'Увеличить количество гостей' }).click();
    await expect(bookingSection).toContainText('4 гостя');
    await page.getByRole('button', { name: 'Уменьшить количество гостей' }).click();
    await expect(bookingSection).toContainText('3 гостя');
    await bookingSection.screenshot({ path: path.join(outDir, '04-booking-form-1440.png') });

    const form = bookingSection.locator('form');
    await form.locator('input[type="date"]').fill('2026-12-01');
    await form.locator('input[type="text"]').first().fill('Алексей');
    await form.locator('input[type="tel"]').fill('+7 (900) 111-22-33');
    await form.getByRole('button', { name: 'Забронировать стол' }).click();
    await expect(bookingSection.getByRole('status')).toContainText('Заявка сформирована');
    await expect(bookingSection.getByRole('status')).toContainText('Закрытый VIP');
    await page.getByRole('button', { name: 'Изменить заявку' }).click();
    await expect(form).toBeVisible();

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
