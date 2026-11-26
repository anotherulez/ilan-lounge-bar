export interface ReviewSummary {
  id: string;
  quote: string;
  author: string;
  source: string;
  url: string;
}

export const REVIEWS: ReviewSummary[] = [
  {
    id: 'kitchen-night',
    quote:
      'Гости отмечают работу кухни в ночное время по будням: горячие блюда и закуски приносят поздно вечером без урезания меню.',
    author: 'Темы отзывов 2026',
    source: '2ГИС · рейтинг 4.9 (413 оценок)',
    url: 'https://2gis.ru/ekaterinburg/firm/70000001034142883',
  },
  {
    id: 'atmosphere-team',
    quote:
      'В оценках на Яндекс Картах атмосфера набрала 97% позитивных отзывов (67 упоминаний), для большой компании показатель 100%. Гости часто благодарят сотрудников по именам.',
    author: 'Яндекс Карты · статистика',
    source: 'Рейтинг 4.9 (497 оценок, 305 отзывов)',
    url: 'https://yandex.ru/maps/org/ilan/107996876289/reviews/',
  },
  {
    id: 'waiting-honest',
    quote:
      'Поздравления с днём рождения и спокойный свет отмечают в 2ГИС как сильные стороны. В пиковые часы время ожидания получает 57% позитивных оценок, поэтому лучше бронировать стол заранее.',
    author: 'Наблюдение по площадкам',
    source: 'Проверено 26.11.2026',
    url: 'https://yandex.ru/maps/org/ilan/107996876289/reviews/',
  },
];
