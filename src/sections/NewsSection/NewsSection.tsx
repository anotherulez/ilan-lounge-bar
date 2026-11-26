import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { NEWS_ITEMS, NEWS_SOURCE_LABELS } from '../../data/news';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import type { NewsSource } from '../../types/news';
import styles from './NewsSection.module.css';

type FilterValue = 'all' | NewsSource;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'yandex', label: 'Яндекс Карты' },
  { value: 'vk', label: 'ВКонтакте' },
  { value: 'instagram', label: 'Instagram' },
];

export function NewsSection() {
  const [filter, setFilter] = useState<FilterValue>('all');
  const { ref, visible } = useRevealOnScroll<HTMLElement>();

  const filteredItems =
    filter === 'all' ? NEWS_ITEMS : NEWS_ITEMS.filter((item) => item.source === filter);

  return (
    <section
      id="news"
      ref={ref}
      className={`${styles.section} reveal-section`}
      data-visible={visible}
    >
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div>
            <h2 className={styles.heading}>Новости</h2>
            <p className={styles.subtitle}>Афиша, влоги и события ILAN</p>
          </div>

          <div className={styles.filters} role="tablist" aria-label="Фильтр источников новостей">
            {FILTERS.map((item) => {
              const active = filter === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`${styles.filterPill} ${active ? styles.filterActive : ''}`}
                  onClick={() => setFilter(item.value)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div key={filter} className={styles.grid}>
          {filteredItems.map((item, idx) => (
            <article
              key={item.id}
              className={`${styles.card} stagger-item`}
              style={{ transitionDelay: `${idx * 45}ms` }}
            >
              <div className={styles.thumbBox}>
                <img src={item.mediaUrl} alt={item.title} className={styles.thumb} />
                {item.type === 'vlog' && (
                  <span className={styles.badge}>Видео / Влог</span>
                )}
              </div>

              <div className={styles.meta}>
                <span>{NEWS_SOURCE_LABELS[item.source]}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{item.date}</span>
              </div>

              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.excerpt}>{item.excerpt}</p>

              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.openLink}
              >
                <span>Открыть</span>
                <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
