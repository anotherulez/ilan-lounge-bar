# IMPLEMENTATION_PLAN.md — Поэтапный план реализации (Этапы 00–09)

> **Правило:** перед началом Этапа 02 план представляется на утверждение пользователю. Переход к следующему этапу выполняется только после закрытия критериев приёмки текущего этапа и локального Git-коммита.

## Архитектура проекта (Этап 02+)

- **Стек:** Vite + React + TypeScript (`strict: true`) + CSS Modules + `lucide-react` + `motion` (`motion/react` на Этапе 07) + `@playwright/test` (для проверок на Этапах 04, 05, 08).
- **Планируемая структура файлов:**
  - `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`
  - `public/images/` — локальные демо-фото из `ASSETS.md` (`facade-night.jpg`, `interior-wide.webp`, `interior-velvet.webp`, `guest-vibe.jpg`, `hero-ilan.jpg`)
  - `reference/bakery-png/` — извлечённые из `.fig` референсы (`bakery-desktop-hero.jpg`, `bakery-desktop-full.jpg`, `bakery-fig-thumbnail.png`)
  - `src/styles/tokens.css`, `src/styles/global.css` — палитра ILAN, шрифты `Roboto Condensed` + `Roboto` (с кириллицей), правила поверхностей браузера (`selection`, `focus-visible`, `tabular-nums`)
  - `src/data/venue.ts`, `src/data/menu.ts`, `src/data/reviews.ts`, `src/data/chronicle.ts` — строго подтверждённые факты из `PROJECT_BRIEF.md` (без выдуманных цен, контактов и AI-текстов)
  - `src/components/Header/*`, `src/components/MobileMenu/*`, `src/components/SectionButton/*`
  - `src/sections/HeroSection/*`, `src/sections/CategoriesSection/*`, `src/sections/StorySection/*`, `src/sections/FeatureHighlightSection/*`, `src/sections/MenuSection/*`, `src/sections/ReviewsSection/*`, `src/sections/ChronicleSection/*`, `src/sections/BookingSection/*`, `src/sections/Footer/*`
  - `tests/qa.spec.ts` — Playwright-проверки 8 разрешений, консоли, изображений, клавиатуры и `prefers-reduced-motion`

## Этапы выполнения

| Этап | Цель | Изменяемые файлы | Зависимости | Критерии приёмки | Способ проверки |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **00. Инициализация** | Аудит файлов, Git, загрузка фото и референсов из `.fig` | `.gitignore`, `public/images/*`, `reference/bakery-png/*`, `PROGRESS.md`, `HANDOFF.md` | Git, Python | Репозиторий инициализирован, фото и референсы локально проверены | `git status`, просмотр изображений |
| **01. Анализ референса** | Декомпозиция `.fig`, заполнение `DESIGN_SPEC.md`, фиксация отклонений | `DESIGN_SPEC.md`, `IMPLEMENTATION_PLAN.md`, `PROGRESS.md`, `HANDOFF.md` | `bakery-cake-shop-figma-website-template.fig` | Все параметры заполнены из `.fig`; спорные пункты `DEV-03..07` вынесены на согласование | Ревью пользователя |
| **02. Архитектура и токены** | Инициализация Vite + React + TS + CSS Modules + шрифты + данные | `package.json`, `tsconfig.json`, `index.html`, `src/styles/*`, `src/data/*` | `react`, `react-dom`, `vite`, `typescript`, `lucide-react` | `npm run build` и `npx tsc --noEmit` проходят без ошибок | `npx tsc --noEmit`, `npm run build` |
| **03. Статическая реализация** | Вёрстка всех 10 секций десктопа (1440/1600px) **без анимаций** | `src/components/*`, `src/sections/*`, `src/App.tsx`, `*.module.css` | CSS Modules | 100% секций по структуре Bakery и палитре ILAN, без AI-штампов и Lorem Ipsum | Локальный запуск `npm run dev` |
| **04. Визуальное сравнение** | Сверка скриншотов в браузере с `reference/bakery-png/*` | `QA_REPORT.md`, правки `*.module.css` | `@playwright/test` | Устранены расхождения пропорций, нахлёстов, ритма и типографики | Скриншоты Playwright vs Bakery |
| **05. Адаптивность** | Мобильная и планшетная вёрстка на 8 брейкпоинтах | `*.module.css`, `MobileMenu.tsx` | Playwright | `scrollWidth <= innerWidth`, нет наложений, touch targets `>= 44×44px` на `320..1920px` | Тест Playwright по 8 viewport |
| **06. Интерактивность** | Табы меню, демо-форма бронирования, мобильное меню, якорная навигация | `MenuSection.tsx`, `BookingSection.tsx`, `Header.tsx` | React state | Все табы, валидация формы и мобильное меню работают; статус «Демо-режим» явный | Playwright e2e-сценарии |
| **07. Анимации** | Деликатные переходы после утверждения статики и адаптива | `src/components/*`, `src/sections/*` | `motion` (`motion/react`) | Один осмысленный ритм появления без задержки первого экрана; `prefers-reduced-motion` | Проверка + эмуляция reduced-motion |
| **08. Независимый аудит** | Консоль, сеть, a11y, клавиатура, humanizer/unslop-проверка, скриншоты | `tests/qa.spec.ts`, `QA_REPORT.md` | Playwright | 0 ошибок в консоли, 0 битых `<img>`, корректный `Tab`/`Escape`, текст очищен от AI-штампов | `npx playwright test` |
| **09. Финальная сборка** | Production build, TypeScript, документация, финальный коммит | `PROGRESS.md`, `HANDOFF.md`, `QA_REPORT.md` | Vite, TypeScript | `npm run build` и `npx tsc --noEmit` без ошибок, финальный Git-коммит | `npm run build`, `git log -n 10` |
