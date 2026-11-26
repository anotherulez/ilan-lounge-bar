export type MenuCategoryId = 'hot' | 'snacks' | 'tea' | 'lounge';

export interface MenuItem {
  id: string;
  name: string;
  weight?: string;
  price: string;
  isPriceConfirmed: boolean;
  note: string;
  image: string;
  alt: string;
}

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  subtitle: string;
  items: MenuItem[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'hot',
    label: 'Горячее',
    subtitle: 'Кормим нормально даже в три часа ночи.',
    items: [
      {
        id: 'plov',
        name: 'Плов с говядиной',
        weight: '350 г',
        price: '550 ₽',
        isPriceConfirmed: true,
        note: 'Тарелка горячего плова, которая держит вечер на плаву.',
        image: '/images/dish-plov.jpg',
        alt: 'Плов с говядиной',
      },
      {
        id: 'borscht',
        name: 'Борщ с говядиной и сметаной',
        weight: '350 г',
        price: '550 ₽',
        isPriceConfirmed: true,
        note: 'Тот случай, когда после полуночи хочется настоящего супа.',
        image: '/images/dish-borscht.jpg',
        alt: 'Борщ с говядиной и сметаной',
      },
      {
        id: 'fettuccine',
        name: 'Паста Феттучини',
        weight: '350 г',
        price: '690 ₽',
        isPriceConfirmed: true,
        note: 'Сливочный соус, горячая подача сразу со сковороды.',
        image: '/images/dish-pasta.jpg',
        alt: 'Паста Феттучини',
      },
      {
        id: 'burgers',
        name: 'Фирменные бургеры',
        price: 'По карте в зале',
        isPriceConfirmed: false,
        note: 'Подаём с картофелем фри и соусом, чтобы не вставать голодным.',
        image: '/images/burger-fries.jpg',
        alt: 'Бургер с картофелем фри',
      },
      {
        id: 'khinkali',
        name: 'Хинкали и пельмени',
        price: 'По карте в зале',
        isPriceConfirmed: false,
        note: 'Сочные, горячие, хороши и в одного, и на компанию.',
        image: '/images/lounge-candles.webp',
        alt: 'Подача блюд к столу',
      },
    ],
  },
  {
    id: 'snacks',
    label: 'Закуски и салаты',
    subtitle: 'Быстрый перекус или большая тарелка в центр стола.',
    items: [
      {
        id: 'meat-plate',
        name: 'Мясное ассорти',
        weight: '550 г',
        price: '1200 ₽',
        isPriceConfirmed: true,
        note: 'Полкило мяса на компанию, чтобы хватило каждому.',
        image: '/images/dish-meat.jpg',
        alt: 'Мясное ассорти на доске',
      },
      {
        id: 'caesar-chicken',
        name: 'Салат Цезарь с курицей',
        weight: '250 г',
        price: '700 ₽',
        isPriceConfirmed: true,
        note: 'Проверенная классика с хрустящим листом и соусом.',
        image: '/images/dish-caesar.jpg',
        alt: 'Салат Цезарь с курицей',
      },
      {
        id: 'caesar-shrimp',
        name: 'Салат Цезарь с креветками',
        weight: '250 г',
        price: '750 ₽',
        isPriceConfirmed: true,
        note: 'Тигровые креветки на тёмной тарелке без лишнего декора.',
        image: '/images/dish-caesar.jpg',
        alt: 'Салат Цезарь с тигровыми креветками',
      },
      {
        id: 'veg-plate',
        name: 'Овощное ассорти',
        weight: '350 г',
        price: '600 ₽',
        isPriceConfirmed: true,
        note: 'Свежая нарезка к горячему и на компанию.',
        image: '/images/interior-wide.webp',
        alt: 'Свежая подача к столу',
      },
      {
        id: 'sandwich',
        name: 'Сэндвич с копчёной курицей',
        weight: '280 г',
        price: '400 ₽',
        isPriceConfirmed: true,
        note: 'Удобно есть, даже когда в руках геймпад от PS5.',
        image: '/images/burger-fries.jpg',
        alt: 'Сытный перекус за столом',
      },
    ],
  },
  {
    id: 'tea',
    label: 'Чай и напитки',
    subtitle: 'Листовой чай на свече, кофе и домашние лимонады.',
    items: [
      {
        id: 'puerh',
        name: 'Китайский чай: пуэр и ассам',
        price: 'По карте в зале',
        isPriceConfirmed: false,
        note: 'Завариваем в чайнике на свече, чтобы не остыл за разговором.',
        image: '/images/tea-kettle.jpg',
        alt: 'Чайник на свече и армуды',
      },
      {
        id: 'lemonades',
        name: 'Домашние лимонады и морсы',
        price: 'По карте в зале',
        isPriceConfirmed: false,
        note: 'Освежающие миксы на всю ночь.',
        image: '/images/interior-wide.webp',
        alt: 'Подача напитков на стойке',
      },
      {
        id: 'bar-craft',
        name: 'Авторская барная карта',
        price: 'По карте в зале',
        isPriceConfirmed: false,
        note: 'Бармен соберёт вкус под настроение за парой вопросов.',
        image: '/images/bar-craft.webp',
        alt: 'Бармен за стойкой ILAN',
      },
      {
        id: 'coffee',
        name: 'Кофе и смузи',
        price: 'По карте в зале',
        isPriceConfirmed: false,
        note: 'Чтобы досидеть до четырёх утра бодрым.',
        image: '/images/lounge-candles.webp',
        alt: 'Вечерний стол со свечами',
      },
      {
        id: 'baklava',
        name: 'Пахлава и мороженое',
        price: 'По карте в зале',
        isPriceConfirmed: false,
        note: 'Сладкий финал к горячему пуэру.',
        image: '/images/tea-kettle.jpg',
        alt: 'Чай и сладкое в зале',
      },
    ],
  },
  {
    id: 'lounge',
    label: 'VIP и отдых',
    subtitle: 'Закрытая комната, трансляции и настолки для своих.',
    items: [
      {
        id: 'vip-room',
        name: 'Закрытый VIP-зал',
        price: 'Бронь по телефону',
        isPriceConfirmed: false,
        note: 'Отдельная комната с PlayStation 5, без лишних глаз.',
        image: '/images/guest-vibe.jpg',
        alt: 'Атмосфера в VIP-зоне',
      },
      {
        id: 'screens',
        name: 'Матчи на 3 экранах',
        price: 'По расписанию',
        isPriceConfirmed: false,
        note: 'Смотрим большие игры вместе с залом.',
        image: '/images/ilan-sign-lamp.jpg',
        alt: 'Основной зал ILAN',
      },
      {
        id: 'board-games',
        name: 'Настольные игры',
        price: 'Для гостей',
        isPriceConfirmed: false,
        note: 'Достаточно попросить коробку к столу.',
        image: '/images/lounge-candles.webp',
        alt: 'Столы для компании',
      },
      {
        id: 'dj-sets',
        name: 'Ночные DJ-сеты',
        price: 'По афише',
        isPriceConfirmed: false,
        note: 'Танцпол и плотный звук ближе к полуночи.',
        image: '/images/ilan-sign-dark.jpg',
        alt: 'Вечерний свет в зале',
      },
      {
        id: 'late-night',
        name: 'Работаем до 04:00',
        price: 'Каждый день',
        isPriceConfirmed: false,
        note: 'Кухня открыта, пока в зале есть гости.',
        image: '/images/facade-night.jpg',
        alt: 'Ночной вход ILAN',
      },
    ],
  },
];
