# ASSETS.md — Реестр изображений и статус прав

> **Дата проверки ссылок:** `2026-11-26`  
> **Критическое правило по правам:** все URL ниже принадлежат внешним площадкам и правообладателям. Они допускаются **ТОЛЬКО для закрытого локального демо-превью** при презентации концепции. **Перед публичным размещением сайта** необходимо заменить каждый файл на оригинальные фотографии, переданные владельцем ILAN, либо получить письменное разрешение правообладателей.

| ID ассета | Назначение в макете | Локальный путь | Внешний источник (проверено `2026-11-26`) | Статус прав |
| :--- | :--- | :--- | :--- | :--- |
| `interior-wide` | Фон Hero-секции (`1230×820`, барная стойка и чайная подача) | `public/images/interior-wide.webp` | [Restoclub (ILAN)](https://img.restoclub.ru/uploads/place/b/8/9/b/b89b067d1c3afb9c6beffe4c15ba94ca_w1230_h820--no-cut.webp?v=3) | `DEMO_ONLY / NEEDS_LICENSE_CHECK` |
| `interior-velvet` | Блок «О баре» / Split 1 (`546×820`, бордовый велюр, люстры) | `public/images/interior-velvet.webp` | [Restoclub (ILAN)](https://img.restoclub.ru/uploads/place/5/c/a/2/5ca2c53673c2a337c546b02962b1b632_w1230_h820--no-cut.webp?v=3) | `DEMO_ONLY / NEEDS_LICENSE_CHECK` |
| `facade-night` | Врезка Hero / `01–04` / Контакты (`1200×800`, ночной вход ул. 8 Марта, 31) | `public/images/facade-night.jpg` | [HookahRussia (ночной фасад ILAN)](https://cdn.hookahrussia.ru/photos/62e1ae177295c119a988ff4f/l/By-gQA7yTq.jpeg) | `DEMO_ONLY / NEEDS_LICENSE_CHECK` |
| `guest-vibe` | Секция `01–04` / Хроника (`640×853`, фото из отзывов) | `public/images/guest-vibe.jpg` | [2ГИС (фото из отзывов ILAN)](https://cachizer1.2gis.com/reviews-photos/f11d322e-6ded-48fd-a0c8-04e0dd091f37.jpg?w=640) | `DEMO_ONLY / USER_GENERATED_CONTENT` |
| `lantern-wall` | Секция `01–04` / Атмосфера (`548×820`, светильник в интерьере) | `public/images/lantern-wall.webp` | [Restoclub (ILAN)](https://img.restoclub.ru/uploads/place/7/9/1/2/791274d6118c2945b4b6b78fc163f8ac_w1230_h820--no-cut.webp?v=3) | `DEMO_ONLY / NEEDS_LICENSE_CHECK` |
| `hero-ilan` | Не используется в фоне Hero (`500×500`, текстовый баннер; сохранён в архиве) | `public/images/hero-ilan.jpg` | [Яндекс Карты (обложка ILAN)](https://avatars.mds.yandex.net/get-altay/19756885/2a0000019fd75c5d7111cd5fb6733020a1e9/L_height) | `DEMO_ONLY / ARCHIVED_NOT_FOR_HERO` |
| `bakery-ref` | Референс макета Bakery | `reference/bakery-png/bakery-desktop-full.jpg` | Извлечено из `.fig` | `REFERENCE_ONLY (не включать в билд)` |

## Правила обработки изображений в коде
1. Хранить демо-изображения локально в `public/images/`, чтобы не зависеть от hotlink-блокировок сторонних CDN.
2. Запрещено подставлять случайные стоковые фото (Unsplash/Pexels) для недостающих блюд меню — при отсутствии подтверждённого фото использовать чистую типографическую карточку в стиле макета.
3. Всегда задавать явный `aspect-ratio`, `object-fit: cover` и корректный `alt` на русском языке.
