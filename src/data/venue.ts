export const VENUE = {
  brand: 'ILAN',
  city: 'Екатеринбург',
  address: 'ул. 8 Марта, 31',
  addressFull: 'Екатеринбург, ул. 8 Марта, 31, 1 этаж',
  hours: '18:00–04:00',
  hoursFull: 'Ежедневно 18:00–04:00',
  phoneDisplay: '+7 (909) 028-58-58',
  phoneHref: 'tel:+79090285858',
  links: {
    yandexMaps: 'https://yandex.ru/maps/org/ilan/107996876289/',
    twoGis: 'https://2gis.ru/ekaterinburg/firm/70000001034142883',
    vk: 'https://vk.ru/ilanbar',
    telegram: 'https://telegram.org',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Пространство', href: '#space' },
  { label: 'Меню', href: '#menu' },
  { label: 'VIP', href: '#vip' },
  { label: 'Новости', href: '#news' },
  { label: 'Контакты', href: '#booking' },
] as const;
