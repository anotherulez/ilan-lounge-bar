import type { NewsItem } from '../types/news';
import generatedNews from './news.generated.json';

export const NEWS_SOURCE_LABELS = {
  yandex: 'Яндекс Карты',
  vk: 'ВКонтакте',
  instagram: 'Instagram',
} as const;

export const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 'yandex-late-kitchen',
    source: 'yandex',
    type: 'news',
    title: 'Ночная кухня до 04:00 каждый день',
    excerpt: 'Плов, борщ со сметаной, феттучини и горячие закуски готовим до закрытия дверей без сокращённого ночного меню.',
    date: '24 ноя',
    mediaUrl: '/images/marquee/news/facade-night.jpg',
    externalUrl: 'https://yandex.ru/maps/org/ilan/107996876289/',
  },
  {
    id: 'vk-weekend-dj',
    source: 'vk',
    type: 'vlog',
    title: 'Вечерние сеты и свет в основном зале',
    excerpt: 'Короткий видеоотчёт с пятничной смены: приглушённый свет, плотный звук и посадка за стойкой после полуночи.',
    date: '20 ноя',
    mediaUrl: '/images/marquee/news/guest-vibe.jpg',
    externalUrl: 'https://vk.ru/ilanbar',
  },
  {
    id: 'ig-bar-vlog',
    source: 'instagram',
    type: 'vlog',
    title: 'Один вечер за барной стойкой на 8 Марта, 31',
    excerpt: 'Влог от команды ILAN: как готовим авторские сочетания и собираем подачу чая на свече перед открытием.',
    date: '18 ноя',
    mediaUrl: '/images/marquee/news/bar-craft.webp',
    externalUrl: 'https://vk.ru/ilanbar',
  },
  {
    id: 'vk-vip-booking',
    source: 'vk',
    type: 'news',
    title: 'Закрытая VIP-комната для компаний и матчей',
    excerpt: 'Три экрана под трансляции, PlayStation 5, настольные игры и отдельная подача блюд прямо к дивану.',
    date: '14 ноя',
    mediaUrl: '/images/marquee/news/hero-ilan.jpg',
    externalUrl: 'https://vk.ru/ilanbar',
  },
  {
    id: 'yandex-winter-tea',
    source: 'yandex',
    type: 'news',
    title: 'Зимний сбор пуэра и цитрусовые лимонады',
    excerpt: 'Обновили чайную карту к холодам: согревающие сборы в чайнике на свече и свежие ягодные миксы.',
    date: '10 ноя',
    mediaUrl: '/images/marquee/news/lantern-orig.jpg',
    externalUrl: 'https://yandex.ru/maps/org/ilan/107996876289/menu/',
  },
  {
    id: 'ig-backstage-sign',
    source: 'instagram',
    type: 'vlog',
    title: 'Ночная прогулка до площади 1905 года',
    excerpt: 'Бэкстейдж закрытия смены и детали интерьера: пять минут пешком от метро «Геологическая» и «Площадь 1905 года».',
    date: '05 ноя',
    mediaUrl: '/images/marquee/news/ilan-sign-dark.jpg',
    externalUrl: 'https://yandex.ru/maps/org/ilan/107996876289/',
  },
];

const synced = generatedNews as NewsItem[];

export const NEWS_ITEMS: NewsItem[] = synced.length > 0 ? synced : FALLBACK_NEWS;
