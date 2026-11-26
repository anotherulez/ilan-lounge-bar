export interface GuestReview {
  id: string;
  platform: string;
  rating: string;
  meta: string;
  text: string;
  isDirectQuote: boolean;
  url: string;
}

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 'restoclub-dmitrievna',
    platform: 'Restoclub',
    rating: '10 / 10',
    meta: 'Dmitrievna Kristyusha · 08.06.2026',
    text: '«Хуго учел все предпочтения и обслуживал на высшем классе»',
    isDirectQuote: true,
    url: 'https://www.restoclub.ru/ekb/place/ilan',
  },
  {
    id: 'yandex-maps',
    platform: 'Яндекс Карты',
    rating: '4.9',
    meta: '497 оценок гостей',
    text: 'Гости отмечают приглушённый свет, мягкую посадку, блюда кухни и бургеры, работу мастеров и отдельную VIP-комнату с PlayStation 5.',
    isDirectQuote: false,
    url: 'https://yandex.ru/maps/org/ilan/107996876289/reviews/',
  },
  {
    id: 'twogis',
    platform: '2ГИС',
    rating: '4.9',
    meta: '413 оценок гостей',
    text: 'В отзывах выделяют внимательных официантов и администраторов, помощь с поздравлениями ко дню рождения и большой выбор напитков.',
    isDirectQuote: false,
    url: 'https://2gis.ru/ekaterinburg/firm/70000001034142883/tab/reviews',
  },
];
