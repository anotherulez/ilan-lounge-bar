# HANDOFF.md — Точка передачи контекста другому агенту

> Этот файл позволяет другому агенту продолжить работу с точного места остановки без доступа к предыдущей переписке.

- **Дата последнего обновления:** `2026-11-26`
- **Текущий этап:** `Ожидание согласования DESIGN_SPEC.md (DEV-03..07) и IMPLEMENTATION_PLAN.md перед Этапом 02`
- **Последний завершённый этап:** `Этап 01 — Декомпозиция bakery-cake-shop-figma-website-template.fig`
- **Идентификатор последнего Git-коммита:** `см. git log -n 2`

## Выполненные изменения
- **Этап 00:** Инициализирован Git-репозиторий, создан `.gitignore`, скачаны 5 фото из `ASSETS.md` в `public/images/`, извлечены референсы `bakery-desktop-hero.jpg`, `bakery-desktop-full.jpg` и `bakery-fig-thumbnail.png` из `.fig` в `reference/bakery-png/`.
- **Этап 01:** Полностью декодирован бинарный формат Kiwi (`canvas.fig`) из `bakery-cake-shop-figma-website-template.fig`; заполнены все точные размеры, отступы, сетка, типографика и цвета в `DESIGN_SPEC.md`; уточнён план в `IMPLEMENTATION_PLAN.md`.

## Список изменённых и созданных файлов
- `.gitignore`
- `public/images/*` (`facade-night.jpg`, `guest-vibe.jpg`, `hero-ilan.jpg`, `interior-velvet.webp`, `interior-wide.webp`)
- `reference/bakery-png/*` (`bakery-desktop-hero.jpg`, `bakery-desktop-full.jpg`, `bakery-fig-thumbnail.png`)
- `DESIGN_SPEC.md`, `IMPLEMENTATION_PLAN.md`, `PROGRESS.md`, `HANDOFF.md`

## Известные проблемы и ограничения
1. `hero-ilan.jpg` (`500×500px`) непригоден как полноэкранный фон Hero (малое разрешение, встроенный текст и реклама кальянов вразрез с `18+` compliance).
2. Мобильный фрейм в `bakery-cake-shop-figma-website-template.fig` отсутствует; адаптивные правила сформулированы в разделе 5 `DESIGN_SPEC.md`.
3. В публичном меню подтверждены цены только на 8 позиций кухни; фото из `ASSETS.md` пригодны только для локального демо.
4. На Windows PowerShell политика выполнения блокирует `npm.ps1` — использовать `npm.cmd` и `npx.cmd`.

## Следующая конкретная задача
После утверждения пользователем разделов 3–4 `DESIGN_SPEC.md` (`DEV-03..07`) и `IMPLEMENTATION_PLAN.md` перейти к **Этапу 02**: развернуть Vite + React + TypeScript, CSS-токены (`src/styles/tokens.css`), подключить шрифты и перенести подтверждённые факты в `src/data/*`.

## Команды запуска и проверки
```powershell
npm.cmd install
npm.cmd run dev
npx.cmd tsc --noEmit
npm.cmd run build
npx.cmd playwright test
```
