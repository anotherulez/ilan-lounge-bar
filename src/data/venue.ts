export interface FeatureBarItem {
  id: string;
  title: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export const VENUE = {
  brand: 'ILAN',
  subtitle: 'LOUNGE BAR',
  city: 'Екатеринбург',
  address: 'ул. 8 Марта, 31',
  landmarks: '5 минут от м. «Геологическая» и «Площадь 1905 года»',
  hours: 'Каждый день · 18:00–04:00',
  phoneDisplay: '+7 (909) 028-58-58',
  phoneHref: 'tel:+79090285858',
  links: {
    yandexMaps: 'https://yandex.ru/maps/org/ilan/107996876289/',
    yandexReviews: 'https://yandex.ru/maps/org/ilan/107996876289/reviews/',
    yandexMenu: 'https://yandex.ru/maps/org/ilan/107996876289/menu/',
    twoGis: 'https://2gis.ru/ekaterinburg/firm/70000001034142883',
    vk: 'https://vk.ru/ilanbar',
    instagramHandle: '@ilanekb',
  },
  stats: {
    yandex: {
      name: 'Яндекс Карты',
      rating: '4.9',
      count: '497 оценок',
      url: 'https://yandex.ru/maps/org/ilan/107996876289/reviews/',
    },
    twoGis: {
      name: '2ГИС',
      rating: '4.9',
      count: '413 оценок',
      url: 'https://2gis.ru/ekaterinburg/firm/70000001034142883',
    },
  },
} as const;

export const NAV_LEFT = [
  { label: 'О баре', href: '#about' },
  { label: 'Меню', href: '#menu' },
  { label: 'VIP', href: '#vip' },
] as const;

export const NAV_RIGHT = [
  { label: 'Галерея', href: '#gallery' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Бронь', href: '#booking' },
] as const;

export const HERO_FEATURES: FeatureBarItem[] = [
  {
    id: 'kitchen',
    title: 'Еда до четырёх утра',
    description:
      'Захотелось горячего плова или борща в три ночи? Кухня работает до закрытия даже в будни.',
  },
  {
    id: 'vip',
    title: 'Свой VIP без лишних глаз',
    description:
      'Отдельная комната для своей компании: PlayStation 5, настолки и никто не подслушивает тосты.',
  },
  {
    id: 'rating',
    title: '4.9 по-честному',
    description:
      'Почти тысяча оценок на Яндекс Картах и в 2ГИС. Заходите проверить, за что нас любят.',
  },
  {
    id: 'location',
    title: 'В самом центре',
    description:
      'Улица 8 Марта, 31. Пять минут пешком от метро «Геологическая» и «Площадь 1905 года».',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'lantern',
    src: '/images/lantern-orig.jpg',
    alt: 'Мозаичный светильник на стене в зале ILAN',
    caption: 'Вечерний свет, который задаёт настроение',
  },
  {
    id: 'sign-lamp',
    src: '/images/ilan-sign-lamp.jpg',
    alt: 'Вывеска ILAN и лампа Эдисона',
    caption: 'Фирменный знак в основном зале',
  },
  {
    id: 'velvet',
    src: '/images/interior-velvet.webp',
    alt: 'Зал ILAN с мягкими диванами и люстрами',
    caption: 'Большой зал для долгих разговоров',
  },
  {
    id: 'tea-kettle',
    src: '/images/tea-kettle.jpg',
    alt: 'Чайник на свече и стаканы с лимоном',
    caption: 'Горячий чай, который не остывает до конца вечера',
  },
  {
    id: 'burger',
    src: '/images/burger-fries.jpg',
    alt: 'Бургер с картофелем фри в баре ILAN',
    caption: 'Сытный бургер и фри прямо из кухни',
  },
  {
    id: 'candles',
    src: '/images/lounge-candles.webp',
    alt: 'Стол со свечами у окна в вечернее время',
    caption: 'Столики у окна на 8 Марта',
  },
  {
    id: 'bar-craft',
    src: '/images/bar-craft.webp',
    alt: 'Приготовление напитков за стойкой ILAN',
    caption: 'За стойкой всегда оживлённо',
  },
  {
    id: 'wide-bar',
    src: '/images/interior-wide.webp',
    alt: 'Подача чая на деревянной барной стойке',
    caption: 'Традиционная подача чая на баре',
  },
  {
    id: 'sign-dark',
    src: '/images/ilan-sign-dark.jpg',
    alt: 'Подсветка логотипа ILAN в темноте',
    caption: 'Поздний вечер в зале',
  },
  {
    id: 'guest-neon',
    src: '/images/guest-vibe.jpg',
    alt: 'Неоновая вывеска в зале ILAN',
    caption: 'Тот самый неон для фото на память',
  },
  {
    id: 'facade',
    src: '/images/facade-night.jpg',
    alt: 'Ночной вход в ILAN на улице 8 Марта, 31',
    caption: 'Ориентир с улицы 8 Марта после заката',
  },
];
