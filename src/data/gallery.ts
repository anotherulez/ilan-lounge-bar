export type MarqueeCategory = 'hall' | 'vip' | 'menu' | 'news';

export interface GalleryAsset {
  src: string;
  alt: string;
}

/**
 * Verified local venue photos organized by section.
 * Additional photos from the 105-photo Yandex Maps archive can be dropped into
 * `public/images/marquee/<category>/` and listed here without touching UI components.
 */
export const MARQUEE_GALLERY: Record<MarqueeCategory, GalleryAsset[]> = {
  hall: [
    { src: './images/marquee/hall/interior-velvet.webp', alt: 'Основной зал ILAN с велюровыми диванами' },
    { src: './images/marquee/hall/lounge-candles.webp', alt: 'Вечерний свет и свечи в зале ILAN' },
    { src: './images/marquee/hall/interior-wide.webp', alt: 'Подача у барной стойки ILAN' },
    { src: './images/marquee/hall/hero-lantern.jpg', alt: 'Мозаичный светильник в зале' },
    { src: './images/marquee/hall/ilan-sign-lamp.jpg', alt: 'Логотип ILAN и лампа Эдисона' },
  ],
  vip: [
    { src: './images/marquee/vip/ilan-sign-lamp.jpg', alt: 'Приватная зона ILAN' },
    { src: './images/marquee/vip/guest-vibe.jpg', alt: 'Неоновая вывеска в зале отдыха' },
    { src: './images/marquee/vip/lounge-candles.webp', alt: 'Вечерний столик со свечами' },
    { src: './images/marquee/vip/interior-velvet.webp', alt: 'Мягкая посадка в зале' },
    { src: './images/marquee/vip/ilan-sign-dark.jpg', alt: 'Тёмный интерьер VIP-пространства' },
  ],
  menu: [
    { src: './images/marquee/menu/tea-kettle.jpg', alt: 'Чайник на свече и армуды' },
    { src: './images/marquee/menu/burger-fries.jpg', alt: 'Фирменный бургер и картофель фри' },
    { src: './images/marquee/menu/bar-craft.webp', alt: 'Приготовление напитков за стойкой' },
    { src: './images/marquee/menu/interior-wide.webp', alt: 'Подача чая на барной стойке' },
    { src: './images/marquee/menu/lounge-candles.webp', alt: 'Вечерняя подача к столу' },
  ],
  news: [
    { src: './images/marquee/news/facade-night.jpg', alt: 'Вечерний вход на ул. 8 Марта, 31' },
    { src: './images/marquee/news/guest-vibe.jpg', alt: 'Вечерняя атмосфера ILAN' },
    { src: './images/marquee/news/bar-craft.webp', alt: 'Работа бармена за стойкой' },
    { src: './images/marquee/news/hero-ilan.jpg', alt: 'Вечерний зал ILAN' },
    { src: './images/marquee/news/ilan-sign-dark.jpg', alt: 'Контражурный логотип ILAN' },
    { src: './images/marquee/news/lantern-orig.jpg', alt: 'Мозаичный фонарь ILAN' },
  ],
};
