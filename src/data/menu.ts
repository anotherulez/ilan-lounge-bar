export type MenuCategoryId = 'hot' | 'snacks' | 'tea' | 'lounge';

export interface MenuItem {
  id: string;
  name: string;
  weight?: string;
  price: string;
  isPriceConfirmed: boolean;
  note?: string;
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
    subtitle: 'Позиции и цены подтверждены по меню ILAN на Яндекс Картах',
    items: [
      {
        id: 'plov',
        name: 'Плов с говядиной',
        weight: '350 г',
        price: '550 ₽',
        isPriceConfirmed: true,
        note: 'Горячая подача в том числе в ночное время',
      },
      {
        id: 'borscht',
        name: 'Борщ с говядиной и сметаной',
        weight: '350 г',
        price: '550 ₽',
        isPriceConfirmed: true,
        note: 'Подаётся со сметаной',
      },
      {
        id: 'fettuccine',
        name: 'Паста Феттучини',
        weight: '350 г',
        price: '690 ₽',
        isPriceConfirmed: true,
        note: 'Сливочный соус, горячее блюдо кухни',
      },
      {
        id: 'khinkali',
        name: 'Хинкали и пельмени',
        price: 'По меню в заведении',
        isPriceConfirmed: false,
        note: 'Указаны в карточках 2ГИС и Restoclub',
      },
      {
        id: 'burgers',
        name: 'Бургеры',
        price: 'По меню в заведении',
        isPriceConfirmed: false,
        note: 'Доступны к заказу в зале',
      },
    ],
  },
  {
    id: 'snacks',
    label: 'Закуски и салаты',
    subtitle: '5 позиций с подтверждёнными ценами + блюда к столу для компаний',
    items: [
      {
        id: 'sandwich',
        name: 'Сэндвич с копчёной курицей',
        weight: '280 г',
        price: '400 ₽',
        isPriceConfirmed: true,
      },
      {
        id: 'veg-plate',
        name: 'Овощное ассорти',
        weight: '350 г',
        price: '600 ₽',
        isPriceConfirmed: true,
      },
      {
        id: 'caesar-chicken',
        name: 'Салат Цезарь с курицей',
        weight: '250 г',
        price: '700 ₽',
        isPriceConfirmed: true,
      },
      {
        id: 'caesar-shrimp',
        name: 'Салат Цезарь с тигровыми креветками',
        weight: '250 г',
        price: '750 ₽',
        isPriceConfirmed: true,
      },
      {
        id: 'meat-plate',
        name: 'Мясное ассорти',
        weight: '550 г',
        price: '1200 ₽',
        isPriceConfirmed: true,
      },
    ],
  },
  {
    id: 'tea',
    label: 'Чай и напитки',
    subtitle: 'Чайная карта и безалкогольные напитки по данным площадок',
    items: [
      {
        id: 'puerh',
        name: 'Китайский чай (пуэр, ассам)',
        price: 'По меню в заведении',
        isPriceConfirmed: false,
        note: 'Заваривается в чайнике к столу',
      },
      {
        id: 'lemonades',
        name: 'Лимонады и морсы',
        price: 'По меню в заведении',
        isPriceConfirmed: false,
      },
      {
        id: 'smoothie',
        name: 'Смузи',
        price: 'По меню в заведении',
        isPriceConfirmed: false,
      },
      {
        id: 'coffee',
        name: 'Кофе',
        price: 'По меню в заведении',
        isPriceConfirmed: false,
      },
      {
        id: 'baklava',
        name: 'Пахлава и мороженое',
        price: 'По меню в заведении',
        isPriceConfirmed: false,
        note: 'Десертные позиции к чаю',
      },
    ],
  },
  {
    id: 'lounge',
    label: 'Лаундж-карта',
    subtitle: 'Информационный раздел без онлайн-продажи (18+)',
    items: [
      {
        id: 'vip-ps5',
        name: 'Бронь VIP-зала с PlayStation 5',
        price: 'Уточнить по телефону',
        isPriceConfirmed: false,
        note: 'Отдельная комната для компании, настольные игры',
      },
      {
        id: 'bar-card',
        name: 'Позиции барной карты',
        price: 'По меню в заведении',
        isPriceConfirmed: false,
        note: 'Актуальный перечень и цены у администратора',
      },
      {
        id: 'steam-card',
        name: 'Лаундж-карта зала',
        price: 'По меню в заведении',
        isPriceConfirmed: false,
        note: 'Только для совершеннолетних гостей (18+)',
      },
      {
        id: 'screens',
        name: 'Трансляции на 3 экранах',
        price: 'По расписанию',
        isPriceConfirmed: false,
        note: 'Уточняйте свободные столы заранее',
      },
      {
        id: 'payment',
        name: 'Оплата картой, наличными или по QR',
        price: 'Доступно',
        isPriceConfirmed: false,
        note: 'Средний чек на площадках: 500–1000 ₽',
      },
    ],
  },
];
