export interface GuestReview {
  id: string;
  platform: string;
  rating: string;
  meta: string;
  text: string;
  url: string;
}

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 'yandex-alyona',
    platform: 'Яндекс Карты',
    rating: '5 / 5',
    meta: 'Алёна Королёва · 28 июля',
    text: '«Хочу выразить огромную благодарность всей команде этого потрясающего заведения за незабываемый вечер! Редко встретишь место, где абсолютно все составляющие идеального отдыха сходятся в одной точке.»',
    url: 'https://yandex.ru/maps/org/ilan/107996876289/reviews/',
  },
  {
    id: 'twogis-alina',
    platform: '2ГИС',
    rating: '5 / 5',
    meta: 'Алина Ковалева · 2ГИС',
    text: '«Очень хорошие и доброжелательные девушки, Дарья и Анна, профессионалы своего дела. Заведение топ.»',
    url: 'https://2gis.ru/ekaterinburg/firm/70000001034142883/tab/reviews',
  },
  {
    id: 'restoclub-dmitrievna',
    platform: 'Restoclub',
    rating: '10 / 10',
    meta: 'Dmitrievna Kristyusha · 08.06.2026',
    text: '«Хуго учел все предпочтения и обслуживал на высшем классе»',
    url: 'https://www.restoclub.ru/ekb/place/ilan',
  },
];
