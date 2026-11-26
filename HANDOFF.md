# HANDOFF.md — Точка передачи контекста

- **Дата последнего обновления:** `2026-11-26`
- **Статус:** `Luxury Minimalist Rebuild (v1) завершён и проверен`

## Итоговая архитектура
- **Палитра и шрифт:** Чистая тёмная сцена `#050505`, нейтральный `--surface: #0b0b0b`, типографика `#fafafa` / `#a7a6a6` / `#8b8a8a`, белые pill-кнопки `#ffffff` / `#050505`, разделители `1px solid rgba(250,250,250,0.10)`. Единственный шрифт: `Manrope` (`200..800`).
- **Секции:**
  - `Header` (`ILAN` + `Пространство`, `Меню`, `VIP`, `Контакты` + `Забронировать`; на `<= 768px` frosted-glass бургер и fullscreen overlay).
  - `HeroSection` (`100dvh`, полноэкранный фон `lounge-candles.webp` с Ken Burns `1.0 → 1.04`, левая виньетка и нижний фейд в `#050505`, заголовок `ILAN / До 04:00.`, адрес, pill-кнопка + ghost `Меню`, нижние метаданные).
  - `SpaceSection` (`#space` + `#vip`: два асимметричных редакционных ряда без карточек и рамок — `Основной зал` и `Закрытый VIP` с реальными фото `interior-velvet.webp` и `ilan-sign-lamp.jpg`).
  - `MenuSection` (`#menu`: чистый 2-колоночный типографический список с табами `Горячее · Закуски · Чай и напитки · Бар`, без фото и без корзины).
  - `BookingSection` (`#booking`: 2-колоночный сплит, инпуты `#0b0b0b`, белая pill-кнопка `Отправить заявку`).
  - `Footer` (однострочный минималистичный футер с `1px` разделителем).
- **Проверки:** `tsc --noEmit` (0 ошибок), `vite build` (`dist/index.html 0.87 kB`, CSS `13.02 kB`, JS `242.79 kB`, `1.23s`), Playwright (`7 passed`, `44.0s` по `1440`, `1280`, `768`, `390`, `320` px). Скриншоты в `references/lux-v1/`.

## Команды запуска
```powershell
npm.cmd install
npm.cmd run dev
npx.cmd tsc --noEmit
npm.cmd run build
npx.cmd playwright test
```
