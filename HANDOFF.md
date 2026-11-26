# HANDOFF.md — Точка передачи контекста

- **Дата последнего обновления:** `2026-11-26`
- **Статус:** `Готово к показу владельцу ILAN`

## Итоговое состояние проекта
- **Палитра и типографика:** Обсидиан `#09090b`, графит `#121216`/`#18181e`, латунь `#d4a359` (красный/бордовый полностью убран). Заголовки `Montserrat` `800–900` uppercase + акценты `Cormorant` `700 italic` (`lining-nums tabular-nums`).
- **Секции:** `Header` (верхняя строка с адресом `ул. 8 Марта, 31`, режимом `18:00–04:00`, телефоном + навигация `О баре`, `Меню`, `VIP`, `Галерея`, `Бронь`) → `HeroSection` (фонарь `hero-lantern.jpg` с 3D parallax, без eyebrow и без 4-колоночной плашки) → `ScrollVelocityStrip` → `StorySection` (`#about`) → `GallerySection` (`#gallery`, 3D изометрическая стена фото + `TiltedCard` мозаика без подписей + лайтбокс) → `FeatureHighlightSection` (`#vip`) → `MenuSection` (`#menu`, 3D-сцена + сетка с фото блюд и кнопками `+ К столу`) → `ChronicleSection` → `BookingSection` (`#booking` с подстановкой предзаказа из корзины) → `Footer` + плавающая корзина `OrderCart` в правом нижнем углу.
- **Проверено по фактам ILAN:** Доставка и цифровая карта гостя отсутствуют у заведения — не реализованы; вместо доставки корзина собирает предзаказ «К столу» в рамках бронирования.
- **Проверки:** `npx.cmd tsc --noEmit` (0 ошибок), `npm.cmd run build` (успешно), `npx.cmd playwright test` (`10 passed (26.8s)` по `320..1920px`).

## Команды запуска
```powershell
npm.cmd install
npm.cmd run dev
npx.cmd tsc --noEmit
npm.cmd run build
npx.cmd playwright test
```
