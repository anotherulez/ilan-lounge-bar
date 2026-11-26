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
    title: 'VIP-комната, в которой время пролетает незаметно',
    description: 'Закрылись своей компанией, включили PS5 или разложили настолки, и никто не мешает.',
    image: '/images/lounge-candles.webp',
    alt: 'Вечерняя посадка в баре ILAN',
    href: '#booking',
  },
  {
    id: 'dj-parties',
    meta: 'Ночной ритм · 23:00',
    title: 'Танцпол и диджей-сеты, когда сидеть уже не хочется',
    description: 'Ближе к ночи в зале становится громче, свет приглушается и включается режим вечеринки.',
    image: '/images/guest-vibe.jpg',
    alt: 'Неоновая надпись в зале бара ILAN',
    href: 'https://vk.ru/ilanbar',
  },
  {
    id: 'late-doors',
    meta: 'ул. 8 Марта, 31',
    title: 'Работаем до 04:00, когда почти весь центр уже закрыт',
    description: 'Дверь открыта каждый день с шести вечера. Приходите на ужин, чай или ночную встречу.',
    image: '/images/facade-night.jpg',
    alt: 'Вход в ILAN ночью',
    href: 'https://yandex.ru/maps/org/ilan/107996876289/',
  },
];
