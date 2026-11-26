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

  test('header meta, gallery lightbox, 3D menu, cart, booking, no reviews, mobile menu', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const headerText = await page.locator('header').innerText();
    expect(headerText).toMatch(/8 Марта, 31/i);
    expect(headerText).toMatch(/18:00/);
    expect(headerText).not.toMatch(/АТМОСФЕРА|PS5|ОТЗЫВЫ/i);
    expect(headerText).toMatch(/VIP/i);

    // Reviews section removed and pure black background on Booking
    await expect(page.locator('#reviews')).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText(/без пафоса/i);
    const bookingBg = await page
      .locator('#booking')
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bookingBg).toBe('rgb(5, 5, 5)');

    // Lightbox open, next photo, Escape close
    await page.locator('header a[href="#gallery"]').click();
    await page.waitForTimeout(300);
    const gallerySection = page.locator('#gallery');
    await gallerySection.locator('button').first().click();
    const lightbox = page.getByRole('dialog');
    await expect(lightbox).toBeVisible();
    await page.getByRole('button', { name: 'Следующее фото' }).click();
    await expect(lightbox.getByText('2 / 11')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(lightbox).toBeHidden();

    // 3D Menu + Cart add + Grid switch + Tabs
    const menuSection = page.locator('#menu');
    await menuSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(menuSection).not.toContainText('Средний чек');
    await menuSection.screenshot({ path: path.resolve('qa/final-menu-3d.png') });

    await page.getByRole('button', { name: 'Следующая позиция' }).click();
    await expect(menuSection.getByText('4 / 5')).toBeVisible();

    // Navigate back to first card (Plov) and add it to the cart
    const prevBtn = page.getByRole('button', { name: 'Предыдущая позиция' });
    await prevBtn.click();
    await prevBtn.click();
    await prevBtn.click();
    await expect(menuSection.getByText('1 / 5')).toBeVisible();
    await page.waitForTimeout(350);
    await page.getByRole('button', { name: 'Добавить Плов с говядиной в корзину' }).click();
    const cartFab = page.getByRole('button', { name: /Корзина к столу: позиций 1/ });
    await expect(cartFab).toBeVisible();

    const gridViewBtn = page.getByRole('button', { name: 'Сетка' });
    await gridViewBtn.click();
    await expect(gridViewBtn).toHaveAttribute('aria-pressed', 'true');

    const snacksTab = page.getByRole('tab', { name: 'Закуски и салаты' });
    await snacksTab.click();
    await expect(page.getByText('Мясное ассорти')).toBeVisible();

    // Cart drawer open, increment qty, transfer to booking
    await cartFab.click();
    const cartDrawer = page.getByRole('dialog', { name: 'Заказ к столу' });
    await expect(cartDrawer).toBeVisible();
    await cartDrawer.getByRole('button', { name: 'Добавить ещё Плов с говядиной' }).click();
    await expect(cartDrawer.getByText('1100 ₽')).toBeVisible();
    await page.screenshot({ path: path.resolve('qa/final-cart-drawer.png') });
    await cartDrawer.getByRole('button', { name: 'Перенести в бронь' }).click();
    await expect(cartDrawer).toBeHidden();

    // Demo booking form includes transferred cart summary
    const form = page.locator('#booking form');
    await expect(form).toContainText('Плов с говядиной × 2');
    await form.locator('input[type="date"]').fill('2026-12-01');
    await form.locator('input[type="text"]').first().fill('Алексей');
    await form.locator('input[type="tel"]').fill('+7 (900) 111-22-33');
    await form.getByRole('button', { name: 'Забронировать стол' }).click();
    await expect(form.getByRole('status')).toContainText('Заявка сформирована');
    await expect(form.getByRole('status')).toContainText('Плов с говядиной × 2');

    // Mobile menu
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Открыть меню навигации' }).click();
    const mobileDialog = page.getByRole('dialog', { name: 'Меню сайта' });
    await expect(mobileDialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(mobileDialog).toBeHidden();
  });

  test('prefers-reduced-motion renders cleanly', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toBeVisible();
  });
});
