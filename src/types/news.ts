export type NewsSource = 'yandex' | 'vk' | 'instagram';
export type NewsMediaType = 'news' | 'vlog';

export interface NewsItem {
  id: string;
  source: NewsSource;
  type: NewsMediaType;
  title: string;
  excerpt: string;
  date: string;
  mediaUrl: string;
  externalUrl: string;
}
