import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const VIEWPORTS = [320, 375, 390, 430, 768, 1024, 1440, 1920] as const;

test.describe('ILAN Lounge Bar Demo QA', () => {
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
      await page.goto('/?fonts=fig', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);

      const audit = await page.evaluate(() => {
        const doc = document.documentElement;
        const imgs = Array.from(document.querySelectorAll('img'));
        const brokenImages = imgs
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.getAttribute('src'));

        const interactive = Array.from(
          document.querySelectorAll('a, button, input, select')
        ).filter((el) => {
          const style = getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden';
        });

        const smallTargets = interactive
          .map((el) => {
            const rect = el.getBoundingClientRect();
            return {
              tag: el.tagName,
              text: (el.textContent || '').trim().slice(0, 30),
              w: Math.round(rect.width),
              h: Math.round(rect.height),
            };
          })
          .filter((t) => t.w > 0 && t.h > 0 && t.h < 32);

        return {
          scrollWidth: doc.scrollWidth,
          innerWidth: window.innerWidth,
          brokenImages,
          smallTargets,
        };
      });

      expect(consoleErrors).toEqual([]);
      expect(failedRequests).toEqual([]);
      expect(audit.brokenImages).toEqual([]);
      expect(audit.scrollWidth).toBeLessThanOrEqual(audit.innerWidth);

      const qaDir = path.resolve('qa');
      fs.mkdirSync(qaDir, { recursive: true });
      await page.screenshot({ path: path.join(qaDir, `${width}.png`), fullPage: false });
    });
  }

  test('interactive menu tabs, font preset switcher, demo booking, mobile menu and keyboard nav', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    // Font preset switch
    const editorialBtn = page.getByRole('button', { name: /UI\/UX Pro/i });
    await editorialBtn.click();
    await expect(page.locator('html')).toHaveAttribute('data-font-preset', 'editorial');

    const figBtn = page.getByRole('button', { name: /\.fig/i });
    await figBtn.click();
    await expect(page.locator('html')).toHaveAttribute('data-font-preset', 'fig');

    // Menu tabs + 3D perspective carousel + grid view switch
    const menuSection = page.locator('#menu');
    await menuSection.scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Следующая позиция' }).click();
    await expect(menuSection.getByText('4 / 5')).toBeVisible();
    await menuSection.screenshot({ path: path.resolve('qa/menu-3d.png') });

    const gridViewBtn = page.getByRole('button', { name: 'Сетка 5 в ряд' });
    await gridViewBtn.click();
    await expect(gridViewBtn).toHaveAttribute('aria-pressed', 'true');

    const snacksTab = page.getByRole('tab', { name: 'Закуски и салаты' });
    await snacksTab.click();
    await expect(snacksTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('Сэндвич с копчёной курицей')).toBeVisible();

    const teaTab = page.getByRole('tab', { name: 'Чай и напитки' });
    await teaTab.click();
    await expect(page.getByText('Китайский чай (пуэр, ассам)')).toBeVisible();

    // Demo booking form
    const form = page.locator('#booking form');
    await form.locator('input[type="date"]').fill('2026-12-01');
    await form.locator('input[type="text"]').fill('Алексей');
    await form.locator('input[type="tel"]').fill('+7 (900) 111-22-33');
    await form.getByRole('button', { name: 'Проверить демо-заявку' }).click();
    await expect(form.getByRole('status')).toContainText('Демо-предпросмотр');

    // Keyboard navigation Tab check
    await page.keyboard.press('Tab');
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT', 'SELECT']).toContain(focusedTag);

    // Mobile menu open & Escape close
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Открыть меню навигации' }).click();
    const dialog = page.getByRole('dialog', { name: 'Меню сайта' });
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('prefers-reduced-motion emulation renders cleanly', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toBeVisible();
  });
});
