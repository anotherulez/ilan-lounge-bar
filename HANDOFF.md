# HANDOFF.md — Точка передачи контекста

- **Дата последнего обновления:** `2026-11-26`
- **Статус:** `Luxury Minimalist Refinement (v2) завершён и проверен`

## Что реализовано по этапам (Stage 0–4)
- **Stage 0 (Подготовка медиа и бэкап):** создан checkpoint-коммит `f99aacb`, локальные фото ILAN разложены по категориям в `public/images/marquee/{hall,vip,menu,news}/`, подключён манифест `src/data/gallery.ts`.
- **Stage 1 (Hero и `SeamlessImageMarquee`):**
  - Обновлён Hero: заголовок `ILAN` + подзаголовок `lounge bar` (без `До 04:00.`), адрес, две кнопки, нижняя мета-строка.
  - Создан CSS-компонент `SeamlessImageMarquee` (бесконечный плавный сдвиг влево с дублированием трека, паузой по ховеру, мягкими масками краёв и поддержкой `prefers-reduced-motion`). Размещён под заголовками `Основной зал`, `Закрытый VIP`, `Меню` и `Новости`.
- **Stage 2 (Модалка и форма бронирования):**
  - Добавлена `BookingModal` («Где вам удобно?»): `Telegram` (`https://telegram.org`), `На сайте` (скролл к `#booking`, фокус и автовыбор `Закрытый VIP` при открытии из VIP-секции), `Позвонить` (`tel:+79090285858`).
  - Переделана форма `#booking`: скруглённые hairline-поля `16px`, segmented pill `Основной зал | Закрытый VIP`, Stepper гостей (1–15), панель подтверждения с кнопкой `Изменить заявку`.
- **Stage 3 («Новости» и архитектура парсинга):**
  - Добавлена секция `#news` между `Меню` и `Бронирование` (ссылка `Новости` добавлена в Header/MobileMenu) с фильтрами `Все · Яндекс Карты · ВКонтакте · Instagram`, бейджами `Видео / Влог` и локальным фоллбеком `src/data/news.ts`.
  - Реализованы схема `src/types/news.ts` и скрипт `scripts/sync-news.mjs` (`npm run sync:news`) для синхронизации ВК API, Яндекс Карт и Instagram с записью в `src/data/news.generated.json`.
- **Stage 4 (Финальный QA):**
  - `npm.cmd run sync:news`: 0 ошибок.
  - `npx.cmd tsc --noEmit`: 0 ошибок.
  - `npm.cmd run build`: CSS `21.79 kB`, JS `258.87 kB` (`1.43s`).
  - `npx.cmd playwright test`: `7 passed (46.8s)` на `1440`, `1280`, `768`, `390`, `320` px; скриншоты сохранены в `references/lux-v2/`.
