export type MenuCategoryId = 'hot' | 'snacks' | 'tea' | 'lounge';

export interface MenuItem {
  id: string;
  name: string;
  weight?: string;
  price: string;
  isPriceConfirmed: boolean;
  note: string;
  image?: string;
  alt?: string;
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
    subtitle: 'Плотно поужинать можно и в восемь вечера, и в три ночи.',
    items: [
      {
        id: 'plov',
        name: 'Плов с говядиной',
        weight: '350 г',
        price: '550 ₽',
        isPriceConfirmed: true,
        note: 'Горячая порция, которая спасает любой затянувшийся вечер.',
      },
      {
        id: 'borscht',
        name: 'Борщ с говядиной и сметаной',
        weight: '350 г',
        price: '550 ₽',
        isPriceConfirmed: true,
        note: 'Тот случай, когда после полуночи хочется настоящего супа.',
      },
      {
        id: 'fettuccine',
        name: 'Паста Феттучини',
        weight: '350 г',
        price: '690 ₽',
        isPriceConfirmed: true,
        note: 'Нежная паста в сливочном соусе, готовим сразу под заказ.',
      },
      {
        id: 'burgers',
        name: 'Фирменные бургеры',
        price: 'По меню в баре',
        isPriceConfirmed: false,
        note: 'Подаём с хрустящим картофелем фри и соусом.',
        image: '/images/burger-fries.jpg',
        alt: 'Бургер с картофелем фри в баре ILAN',
      },
      {
        id: 'khinkali',
        name: 'Хинкали и пельмени',
        price: 'По меню в баре',
        isPriceConfirmed: false,
        note: 'Сочные, горячие, хороши и по одному, и на компанию.',
      },
    ],
  },
  {
    id: 'snacks',
    label: 'Закуски и салаты',
    subtitle: 'Когда хочется перекусить за разговором или взять тарелку в центр стола.',
    items: [
      {
        id: 'sandwich',
        name: 'Сэндвич с копчёной курицей',
        weight: '280 г',
        price: '400 ₽',
        isPriceConfirmed: true,
        note: 'Быстро, сытно и удобно, даже если в руках джойстик.',
      },
      {
        id: 'veg-plate',
        name: 'Овощное ассорти',
        weight: '350 г',
        price: '600 ₽',
        isPriceConfirmed: true,
        note: 'Свежая нарезка к горячему и на компанию.',
      },
      {
        id: 'caesar-chicken',
        name: 'Салат Цезарь с курицей',
        weight: '250 г',
        price: '700 ₽',
        isPriceConfirmed: true,
        note: 'Классика, которая никогда не подводит.',
      },
      {
        id: 'caesar-shrimp',
        name: 'Салат Цезарь с тигровыми креветками',
        weight: '250 г',
        price: '750 ₽',
        isPriceConfirmed: true,
        note: 'Лёгкий и сытный вариант на ужин.',
      },
      {
        id: 'meat-plate',
        name: 'Мясное ассорти',
        weight: '550 г',
        price: '1200 ₽',
        isPriceConfirmed: true,
        note: 'Большая тарелка для компании, чтобы хватило на всех.',
      },
    ],
  },
  {
    id: 'tea',
    label: 'Чай и сладкое',
    subtitle: 'Завариваем листовой чай на подогреве, мешаем лимонады и варим кофе.',
    items: [
      {
        id: 'puerh',
        name: 'Китайский чай: пуэр и ассам',
        price: 'По карте в зале',
        isPriceConfirmed: false,
        note: 'Подаём в чайнике на свече, чтобы не остыл за разговором.',
        image: '/images/tea-kettle.jpg',
        alt: 'Чайник на свече в зале ILAN',
      },
      {
        id: 'lemonades',
        name: 'Домашние лимонады и морсы',
        price: 'По карте в зале',
        isPriceConfirmed: false,
        note: 'Освежающие миксы на весь вечер.',
        image: '/images/interior-wide.webp',
        alt: 'Подача напитков за барной стойкой ILAN',
      },
      {
        id: 'smoothie',
        name: 'Ягодные и фруктовые смузи',
        price: 'По карте в зале',
        isPriceConfirmed: false,
        note: 'Густые и без лишней приторности.',
      },
      {
        id: 'coffee',
        name: 'Кофе',
        price: 'По карте в зале',
        isPriceConfirmed: false,
        note: 'Чтобы взбодриться после полуночи.',
      },
      {
        id: 'baklava',
        name: 'Пахлава и мороженое',
        price: 'По карте в зале',
        isPriceConfirmed: false,
        note: 'Сладкий финал к горячему пуэру.',
      },
    ],
  },
  {
    id: 'lounge',
    label: 'VIP и бар',
    subtitle: 'Для тех, кто собирает друзей и не хочет спешить домой.',
    items: [
      {
        id: 'vip-room',
        name: 'Отдельный VIP-зал',
        price: 'Бронь по телефону',
        isPriceConfirmed: false,
        note: 'Приватная комната с PlayStation 5 и настольными играми.',
        image: '/images/lounge-candles.webp',
        alt: 'Уютная зона отдыха со свечами',
      },
      {
        id: 'bar-cocktails',
        name: 'Авторская барная карта',
        price: 'По карте в зале',
        isPriceConfirmed: false,
        note: 'Спросите у бармена за стойкой, подберём под настроение.',
        image: '/images/bar-craft.webp',
        alt: 'Работа бармена за стойкой ILAN',
      },
      {
        id: 'screens',
        name: 'Трансляции на 3 экранах',
        price: 'Включено в вечер',
        isPriceConfirmed: false,
        note: 'Большие матчи и важные события смотрим вместе.',
      },
      {
        id: 'board-games',
        name: 'Настольные игры для компании',
        price: 'Бесплатно для гостей',
        isPriceConfirmed: false,
        note: 'Достаточно попросить официанта принести коробку к столу.',
      },
      {
        id: 'payment',
        name: 'Карта, наличные или QR',
        price: 'Без сложностей',
        isPriceConfirmed: false,
        note: 'Принимаем любой удобный способ оплаты.',
      },
    ],
  },
];
