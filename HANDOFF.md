# HANDOFF.md — Точка передачи контекста

- **Дата последнего обновления:** `2026-11-26`
- **Статус:** `Готово к показу владельцу ILAN`

## Итоговое состояние проекта
- **Шрифты:** `Cormorant` + `Montserrat` (`lining-nums tabular-nums`).
- **Секции:** `Header` (`О баре`, `Меню`, `VIP`, `Галерея`, `Отзывы`, `Бронь`) → `HeroSection` (полноэкранный мозаичный фонарь `hero-lantern.jpg` с 3D parallax + 2 кнопки + бордовая 4-колоночная планка) → `StorySection` (`#about`) → `GallerySection` (`#gallery`, 3D изометрическая стена фото + `TiltedCard` + лайтбокс) → `FeatureHighlightSection` (`#vip`) → `MenuSection` (`#menu`, 3D-витрина + 3D-сетка с фото и точными ценами без «среднего чека») → `ReviewsSection` (`#reviews`) → `ChronicleSection` → `BookingSection` (`#booking`) → `Footer`.
- **Проверки:** `npx.cmd tsc --noEmit` (0 ошибок), `npm.cmd run build` (успешно), `npx.cmd playwright test` (`10 passed` по `320..1920px`).

## Команды запуска
```powershell
npm.cmd install
npm.cmd run dev
npx.cmd tsc --noEmit
npm.cmd run build
npx.cmd playwright test
```
