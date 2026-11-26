export interface ReviewPlatformSummary {
  id: string;
  platform: string;
  rating: string;
  countLabel: string;
  summary: string;
  url: string;
}

export const REVIEW_SUMMARIES: ReviewPlatformSummary[] = [
  {
    id: 'yandex-maps',
    platform: 'Яндекс Карты',
    rating: '4.9',
    countLabel: '497 оценок',
    summary:
      'Посетители отмечают приглушённый свет, уютную посадку, блюда кухни (включая бургеры), работу мастеров и отдельную VIP-комнату с PlayStation 5.',
    url: 'https://yandex.ru/maps/org/ilan/107996876289/reviews/',
  },
  {
    id: 'twogis',
    platform: '2ГИС',
    rating: '4.9',
    countLabel: '413 оценок',
    summary:
      'В отзывах выделяют внимательных официантов и администраторов, помощь с поздравлениями ко дню рождения, выбор напитков и стабильное качество подачи.',
    url: 'https://2gis.ru/ekaterinburg/firm/70000001034142883/tab/reviews',
  },
  {
    id: 'flamp-yell',
    platform: 'Flamp и Yell',
    rating: '4.8–4.9',
    countLabel: 'Екатеринбург',
    summary:
      'Гости хвалят фоновую музыку и вечера с диджеями, спокойную атмосферу для компании и удобное расположение в пяти минутах от метро «Геологическая».',
    url: 'https://yandex.ru/maps/org/ilan/107996876289/reviews/',
  },
];
