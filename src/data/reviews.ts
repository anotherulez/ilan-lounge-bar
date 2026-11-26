export interface ReviewSummary {
  id: string;
  quote: string;
  author: string;
  source: string;
  url: string;
}

export const REVIEWS: ReviewSummary[] = [
  {
    id: 'night-kitchen',
    quote:
      '«Зашли на часок попить чай и поболтать, а очнулись в полчетвёртого утра. То, что в будни ночью тут реально кормят пловом и борщом, просто спасает.»',
    author: 'Завсегдатаи бара',
    source: '2ГИС · 4.9',
    url: 'https://2gis.ru/ekaterinburg/firm/70000001034142883',
  },
  {
    id: 'birthday-team',
    quote:
      '«Пришли отмечать день рождения, ребята так душевно поздравили и не отпускали без улыбки весь вечер. Ане, Диле, Юле, Никите, Хуго и Тимофею отдельный респект!»',
    author: 'Компании гостей',
    source: 'Яндекс Карты · 4.9',
    url: 'https://yandex.ru/maps/org/ilan/107996876289/reviews/',
  },
  {
    id: 'friday-tip',
    quote:
      '«Хорошо, когда никуда не надо торопиться. Единственный совет от тех, кто ходит часто: в пятницу вечером здесь плотно, так что стол проще кинуть в бронь заранее.»',
    author: 'Проверенный лайфхак',
    source: 'Отзывы гостей',
    url: 'https://yandex.ru/maps/org/ilan/107996876289/reviews/',
  },
];
