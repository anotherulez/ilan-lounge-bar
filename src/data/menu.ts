export type MenuCategoryId = 'hot' | 'snacks' | 'tea' | 'bar';

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
}

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  items: MenuItem[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'hot',
    label: 'Горячее',
    items: [
      {
        id: 'plov',
        name: 'Плов с говядиной',
        price: '550 ₽',
        description: 'Подача горячего плова, 350 г',
      },
      {
        id: 'borscht',
        name: 'Борщ с говядиной и сметаной',
        price: '550 ₽',
        description: 'Подаётся со сметаной, 350 г',
      },
      {
        id: 'fettuccine',
        name: 'Паста Феттучини',
        price: '690 ₽',
        description: 'Сливочный соус, 350 г',
      },
      {
        id: 'burgers',
        name: 'Фирменные бургеры',
        price: 'По карте в зале',
        description: 'Подаются с картофелем фри и соусом',
      },
      {
        id: 'khinkali',
        name: 'Хинкали и пельмени',
        price: 'По карте в зале',
        description: 'Горячая порция на одного или на компанию',
      },
    ],
  },
  {
    id: 'snacks',
    label: 'Закуски',
    items: [
      {
        id: 'meat-plate',
        name: 'Мясное ассорти',
        price: '1200 ₽',
        description: 'Большая нарезка на компанию, 550 г',
      },
      {
        id: 'caesar-chicken',
        name: 'Салат Цезарь с курицей',
        price: '700 ₽',
        description: 'Лист ромэн, соус и сухарики, 250 г',
      },
      {
        id: 'caesar-shrimp',
        name: 'Салат Цезарь с креветками',
        price: '750 ₽',
        description: 'С тигровыми креветками, 250 г',
      },
      {
        id: 'veg-plate',
        name: 'Овощное ассорти',
        price: '600 ₽',
        description: 'Свежие овощи и зелень, 350 г',
      },
      {
        id: 'sandwich',
        name: 'Сэндвич с копчёной курицей',
        price: '400 ₽',
        description: 'На тёплой булке бриошь, 280 г',
      },
    ],
  },
  {
    id: 'tea',
    label: 'Чай и напитки',
    items: [
      {
        id: 'puerh',
        name: 'Китайский чай: пуэр и ассам',
        price: 'По карте в зале',
        description: 'Заваривается в чайнике на свече',
      },
      {
        id: 'lemonades',
        name: 'Домашние лимонады и морсы',
        price: 'По карте в зале',
        description: 'Цитрусовые и ягодные миксы со льдом',
      },
      {
        id: 'coffee',
        name: 'Кофе и смузи',
        price: 'По карте в зале',
        description: 'Классический эспрессо, капучино и фруктовые смузи',
      },
      {
        id: 'baklava',
        name: 'Пахлава и мороженое',
        price: 'По карте в зале',
        description: 'Медовая пахлава с шариком пломбира',
      },
    ],
  },
  {
    id: 'bar',
    label: 'Бар',
    items: [
      {
        id: 'signature-cocktails',
        name: 'Авторская барная карта',
        price: 'По карте в зале',
        description: 'Классические и фирменные сочетания по вкусу гостя',
      },
      {
        id: 'shots',
        name: 'Сеты за стойкой',
        price: 'По карте в зале',
        description: 'Приготовление и подача за контактным баром',
      },
      {
        id: 'non-alc',
        name: 'Безалкогольная карта',
        price: 'По карте в зале',
        description: 'Тоники, холодный чай и цитрусовые напитки',
      },
    ],
  },
];
