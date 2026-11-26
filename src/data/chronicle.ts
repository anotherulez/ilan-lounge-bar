export interface ChronicleEntry {
  id: string;
  meta: string;
  title: string;
  image: string;
  alt: string;
  href: string;
}

export const CHRONICLE_ITEMS: ChronicleEntry[] = [
  {
    id: 'vip-ps5-news',
    meta: 'Зоны · 7 августа 2026',
    title: 'VIP-зал с PlayStation 5 для компаний и закрытых встреч',
    image: '/images/interior-velvet.webp',
    alt: 'Интерьер ILAN с бордовыми велюровыми диванами',
    href: 'https://yandex.ru/maps/org/ilan/107996876289/',
  },
  {
    id: 'dj-nights',
    meta: 'События · 23:00',
    title: 'Ночные DJ-вечеринки на танцполе по выходным и праздничным датам',
    image: '/images/guest-vibe.jpg',
    alt: 'Неоновая вывеска на стене в зале бара ILAN',
    href: 'https://vk.ru/ilanbar',
  },
  {
    id: 'review-gift',
    meta: 'Акция · 2ГИС и Яндекс',
    title: 'Подарок за отзыв на картах; актуальность бонуса 7% уточняйте у администратора',
    image: '/images/facade-night.jpg',
    alt: 'Вечерний вход в бар ILAN на ул. 8 Марта, 31',
    href: 'https://2gis.ru/ekaterinburg/firm/70000001034142883',
  },
];
