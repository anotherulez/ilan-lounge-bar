export const VENUE = {
  brand: 'ILAN',
  city: 'Екатеринбург',
  address: 'ул. 8 Марта, 31',
  addressFull: 'Екатеринбург, ул. 8 Марта, 31, 1 этаж',
  landmark: '5 минут пешком от м. «Геологическая» и «Площадь 1905 года»',
  hours: '18:00–04:00',
  hoursFull: 'Ежедневно 18:00–04:00',
  phoneDisplay: '+7 (909) 028-58-58',
  phoneHref: 'tel:+79090285858',
  links: {
    yandexMaps: 'https://yandex.ru/maps/org/ilan/107996876289/',
    yandexReviews: 'https://yandex.ru/maps/org/ilan/107996876289/reviews/',
    twoGis: 'https://2gis.ru/ekaterinburg/firm/70000001034142883',
    vk: 'https://vk.ru/ilanbar',
    telegram: 'https://telegram.org',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Меню', href: '#menu' },
  { label: 'VIP', href: '#vip' },
  { label: 'Новости', href: '#news' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#booking' },
] as const;
