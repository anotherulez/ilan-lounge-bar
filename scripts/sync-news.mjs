#!/usr/bin/env node
/**
 * Hybrid news & vlog sync utility for ILAN Lounge Bar.
 * Fetches updates from VK API, Yandex Maps feed, and Instagram Graph / RSS bridge
 * when environment tokens are provided, writing normalized items into `src/data/news.generated.json`.
 * Exits cleanly with code 0 even when tokens are omitted so local builds stay deterministic.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const OUTPUT_PATH = path.resolve('src/data/news.generated.json');

const MONTHS_RU = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

function formatDateRu(unixOrIso) {
  const d = typeof unixOrIso === 'number' ? new Date(unixOrIso * 1000) : new Date(unixOrIso);
  if (Number.isNaN(d.getTime())) return 'Недавно';
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS_RU[d.getMonth()]}`;
}

function summarize(text, maxLen = 132) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return 'Событие в ILAN Lounge Bar на ул. 8 Марта, 31.';
  return clean.length > maxLen ? `${clean.slice(0, maxLen - 1).trim()}…` : clean;
}

async function fetchVkWallPosts() {
  const token = process.env.VK_SERVICE_TOKEN;
  const domain = process.env.VK_GROUP_DOMAIN || 'ilanbar';
  if (!token) {
    console.log('[sync-news] VK_SERVICE_TOKEN not set — skipping VK adapter.');
    return [];
  }

  try {
    const url = new URL('https://api.vk.com/method/wall.get');
    url.searchParams.set('domain', domain);
    url.searchParams.set('count', '6');
    url.searchParams.set('v', '5.199');
    url.searchParams.set('access_token', token);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const payload = await res.json();
    const items = payload?.response?.items ?? [];

    return items.map((post) => {
      const hasVideo = (post.attachments || []).some((a) => a.type === 'video');
      const photoAtt = (post.attachments || []).find((a) => a.type === 'photo');
      const photoSizes = photoAtt?.photo?.sizes || [];
      const largest = photoSizes[photoSizes.length - 1]?.url || '/images/marquee/news/guest-vibe.jpg';
      const lines = String(post.text || '').split('\n').filter(Boolean);

      return {
        id: `vk-${post.id}`,
        source: 'vk',
        type: hasVideo ? 'vlog' : 'news',
        title: summarize(lines[0] || 'Новости сообщества ВКонтакте', 68),
        excerpt: summarize(lines.slice(1).join(' ') || post.text, 130),
        date: formatDateRu(post.date),
        mediaUrl: largest,
        externalUrl: `https://vk.ru/${domain}?w=wall${post.owner_id}_${post.id}`,
      };
    });
  } catch (err) {
    console.warn(`[sync-news] VK adapter failed cleanly: ${err.message}`);
    return [];
  }
}

async function fetchYandexOrgFeed() {
  const feedUrl = process.env.YANDEX_ORG_FEED_URL;
  if (!feedUrl) {
    console.log('[sync-news] YANDEX_ORG_FEED_URL not set — skipping Yandex Maps adapter.');
    return [];
  }

  try {
    const res = await fetch(feedUrl, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const posts = Array.isArray(data?.items) ? data.items : [];

    return posts.slice(0, 6).map((post, idx) => ({
      id: `yandex-${post.id || idx}`,
      source: 'yandex',
      type: post.isVideo ? 'vlog' : 'news',
      title: summarize(post.title || 'Обновление в Яндекс Картах', 68),
      excerpt: summarize(post.description || post.text, 130),
      date: formatDateRu(post.publishedAt || Date.now()),
      mediaUrl: post.image || '/images/marquee/news/facade-night.jpg',
      externalUrl: post.url || 'https://yandex.ru/maps/org/ilan/107996876289/',
    }));
  } catch (err) {
    console.warn(`[sync-news] Yandex Maps adapter failed cleanly: ${err.message}`);
    return [];
  }
}

async function fetchInstagramMedia() {
  const token = process.env.IG_ACCESS_TOKEN;
  const userId = process.env.IG_USER_ID || 'me';
  if (!token) {
    console.log('[sync-news] IG_ACCESS_TOKEN not set — skipping Instagram adapter.');
    return [];
  }

  try {
    const url = new URL(`https://graph.instagram.com/${userId}/media`);
    url.searchParams.set('fields', 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp');
    url.searchParams.set('limit', '6');
    url.searchParams.set('access_token', token);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data?.data) ? data.data : [];

    return items.map((entry) => {
      const isVideo = entry.media_type === 'VIDEO' || entry.media_type === 'REELS';
      return {
        id: `ig-${entry.id}`,
        source: 'instagram',
        type: isVideo ? 'vlog' : 'news',
        title: summarize(entry.caption || 'Влог ILAN в Instagram', 68),
        excerpt: summarize(entry.caption, 130),
        date: formatDateRu(entry.timestamp),
        mediaUrl: entry.thumbnail_url || entry.media_url || '/images/marquee/news/bar-craft.webp',
        externalUrl: entry.permalink || 'https://vk.ru/ilanbar',
      };
    });
  } catch (err) {
    console.warn(`[sync-news] Instagram adapter failed cleanly: ${err.message}`);
    return [];
  }
}

async function main() {
  const [vkItems, yandexItems, igItems] = await Promise.all([
    fetchVkWallPosts(),
    fetchYandexOrgFeed(),
    fetchInstagramMedia(),
  ]);

  const combined = [...yandexItems, ...vkItems, ...igItems];
  if (combined.length === 0) {
    console.log('[sync-news] No live feeds configured; retaining fallback entries in src/data/news.ts.');
    return;
  }

  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(combined, null, 2)}\n`, 'utf8');
  console.log(`[sync-news] Wrote ${combined.length} normalized items to ${OUTPUT_PATH}.`);
}

main().catch((err) => {
  console.error('[sync-news] Unexpected error:', err);
  process.exitCode = 0;
});
