export interface HeroCardItem {
  id: string;
  label: string;
  image: string;
  alt: string;
  tone: 'terracotta' | 'burgundy' | 'brass';
  href: string;
}

export interface FeatureBarItem {
  id: string;
  title: string;
  description: string;
}

export interface CategoryTile {
  index: string;
  title: string;
  image: string;
  alt: string;
  caption: string;
  href: string;
}

export const VENUE = {
  brand: 'ILAN',
  subtitle: 'LOUNGE BAR',
  city: 'Екатеринбург',
  address: 'ул. 8 Марта, 31, 1 этаж',
  addressNote: 'Центр, Ленинский район · Дом В.А. Яковлева',
  landmarks: '5 мин от м. Геологическая и м. Площадь 1905 года',
  hours: 'Ежедневно 18:00–04:00',
  hoursDisclaimer: 'Уточните актуальный режим работы перед визитом',
  phoneDisplay: '+7 (909) 028-58-58',
  phoneHref: 'tel:+79090285858',
  capacity: 'До 100 посадочных мест, несколько отдельных залов',
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
      ratingsCount: '497 оценок',
      reviewsCount: '305 отзывов',
      url: 'https://yandex.ru/maps/org/ilan/107996876289/reviews/',
    },
    twoGis: {
      name: '2ГИС',
      rating: '4.9',
      ratingsCount: '413 оценок',
      reviewsCount: '329+ отзывов',
      url: 'https://2gis.ru/ekaterinburg/firm/70000001034142883',
    },
  },
} as const;

export const NAV_LEFT = [
  { label: 'О баре', href: '#about' },
  { label: 'Меню', href: '#menu' },
  { label: 'VIP PS5', href: '#zones' },
] as const;

export const NAV_RIGHT = [
  { label: 'Атмосфера', href: '#kitchen-story' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#booking' },
] as const;

export const HERO_CARDS: HeroCardItem[] = [
  {
    id: 'velvet',
    label: 'Основной зал',
    image: '/images/interior-velvet.webp',
    alt: 'Основной зал ILAN с бордовыми велюровыми диванами и люстрами',
    tone: 'terracotta',
    href: '#about',
  },
  {
    id: 'bar',
    label: 'Чайная подача',
    image: '/images/interior-wide.webp',
    alt: 'Барная стойка ILAN с чайной подачей в стеклянных стаканах',
    tone: 'burgundy',
    href: '#menu',
  },
  {
    id: 'facade',
    label: 'ул. 8 Марта, 31',
    image: '/images/facade-night.jpg',
    alt: 'Вечерний вход и вывеска бара ILAN на улице 8 Марта, 31',
    tone: 'brass',
    href: '#booking',
  },
];

export const HERO_FEATURES: FeatureBarItem[] = [
  {
    id: 'kitchen',
    title: 'Ночная кухня',
    description:
      'Горячие блюда, салаты и закуски подают до закрытия, включая будние ночи.',
  },
  {
    id: 'vip',
    title: 'VIP-зал с PS5',
    description:
      'Отдельная зона с приставкой PlayStation 5, настольными играми и 3 экранами в зале.',
  },
  {
    id: 'rating',
    title: '4.9 на картах',
    description:
      'Яндекс Карты — 497 оценок, 2ГИС — 413 оценок на ноябрь 2026 года.',
  },
  {
    id: 'location',
    title: 'Центр города',
    description:
      'Исторический Дом Яковлева на 8 Марта, 31 — пять минут пешком от метро.',
  },
];

export const CATEGORY_TILES: CategoryTile[] = [
  {
    index: '01.',
    title: 'Вход и фасад',
    image: '/images/facade-night.jpg',
    alt: 'Ночной фасад исторического здания и вход в бар ILAN',
    caption: 'Дом В.А. Яковлева, 1 этаж',
    href: '#booking',
  },
  {
    index: '02.',
    title: 'Зал и велюр',
    image: '/images/interior-velvet.webp',
    alt: 'Бордовые велюровые диваны и хрустальные люстры в зале ILAN',
    caption: 'До 100 гостей в залах',
    href: '#about',
  },
  {
    index: '03.',
    title: 'Чай и кухня',
    image: '/images/interior-wide.webp',
    alt: 'Подача горячего чая на деревянной барной стойке ILAN',
    caption: 'Кухня работает до 04:00',
    href: '#menu',
  },
  {
    index: '04.',
    title: 'Вечерний свет',
    image: '/images/lantern-wall.webp',
    alt: 'Мозаичный настенный светильник в вечернем зале ILAN',
    caption: 'Танцпол, DJ-сеты и VIP PS5',
    href: '#chronicle',
  },
];
