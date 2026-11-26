export interface ChronicleEntry {
  id: string;
  meta: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
}

export const CHRONICLE_ITEMS: ChronicleEntry[] = [
  {
    id: 'vip-nights',
    meta: 'Каждый вечер',
    title: 'VIP-комната без чужих разговоров',
    description: 'Закрылись своей компанией, включили PS5 или разложили настолки.',
    image: '/images/lounge-candles.webp',
    alt: 'Стол со свечами в зале ILAN',
    href: '#booking',
  },
  {
    id: 'dj-parties',
    meta: '23:00 и позже',
    title: 'Диджей-сеты и танцпол в центре',
    description: 'Когда спокойный ужин плавно переходит в громкую ночь.',
    image: '/images/guest-vibe.jpg',
    alt: 'Неоновая вывеска ILAN',
    href: 'https://vk.ru/ilanbar',
  },
  {
    id: 'late-doors',
    meta: 'ул. 8 Марта, 31',
    title: 'Открыты до четырёх утра каждый день',
    description: 'Заходите на горячий ужин, чай или встречу без оглядки на часы.',
    image: '/images/facade-night.jpg',
    alt: 'Вход в ILAN ночью',
    href: 'https://yandex.ru/maps/org/ilan/107996876289/',
  },
];
