export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
}

export const VENUE = {
  brand: 'ILAN',
  subtitle: 'LOUNGE BAR',
  city: 'Екатеринбург',
  address: 'ул. 8 Марта, 31',
  landmarks: '5 минут от м. «Геологическая» и «Площадь 1905 года»',
  hours: '18:00–04:00',
  hoursFull: 'Каждый день 18:00–04:00',
  phoneDisplay: '+7 (909) 028-58-58',
  phoneHref: 'tel:+79090285858',
  links: {
    yandexMaps: 'https://yandex.ru/maps/org/ilan/107996876289/',
    yandexMenu: 'https://yandex.ru/maps/org/ilan/107996876289/menu/',
    twoGis: 'https://2gis.ru/ekaterinburg/firm/70000001034142883',
    vk: 'https://vk.ru/ilanbar',
    instagramHandle: '@ilanekb',
  },
} as const;

export const NAV_LEFT = [
  { label: 'О баре', href: '#about' },
  { label: 'Меню', href: '#menu' },
  { label: 'VIP', href: '#vip' },
] as const;

export const NAV_RIGHT = [
  { label: 'Галерея', href: '#gallery' },
  { label: 'Бронь', href: '#booking' },
] as const;

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: 'lantern', src: '/images/lantern-orig.jpg', alt: 'Мозаичный светильник ILAN' },
  { id: 'sign-lamp', src: '/images/ilan-sign-lamp.jpg', alt: 'Вывеска ILAN и лампа Эдисона' },
  { id: 'velvet', src: '/images/interior-velvet.webp', alt: 'Зал и люстры ILAN' },
  { id: 'tea-kettle', src: '/images/tea-kettle.jpg', alt: 'Чайник на свече и армуды' },
  { id: 'burger', src: '/images/burger-fries.jpg', alt: 'Бургер и картофель фри' },
  { id: 'candles', src: '/images/lounge-candles.webp', alt: 'Столики у окна вечером' },
  { id: 'bar-craft', src: '/images/bar-craft.webp', alt: 'Работа бармена за стойкой' },
  { id: 'wide-bar', src: '/images/interior-wide.webp', alt: 'Подача чая на барной стойке' },
  { id: 'sign-dark', src: '/images/ilan-sign-dark.jpg', alt: 'Логотип ILAN в темноте' },
  { id: 'guest-neon', src: '/images/guest-vibe.jpg', alt: 'Неон в зале ILAN' },
  { id: 'facade', src: '/images/facade-night.jpg', alt: 'Ночной вход на 8 Марта, 31' },
];
