import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { REVIEW_SUMMARIES } from '../../data/reviews';
import { VENUE } from '../../data/venue';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import styles from './ReviewsSection.module.css';

export function ReviewsSection() {
  const { ref, visible } = useRevealOnScroll<HTMLElement>();

  return (
    <section
      id="reviews"
      ref={ref}
      className={`${styles.section} reveal-section`}
      data-visible={visible}
    >
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>Отзывы</h2>

          <div className={styles.ratingAnchor}>
            <span className={`${styles.score} tabular-nums`}>4.9</span>
            <div className={styles.ratingMeta}>
              <span>Яндекс Карты · 2ГИС</span>
              <span>Свыше 900 реальных оценок гостей</span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {REVIEW_SUMMARIES.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.platform}>{item.platform}</span>
                <span className={`${styles.cardScore} tabular-nums`}>
                  {item.rating} · {item.countLabel}
                </span>
              </div>
              <p className={styles.summary}>{item.summary}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
              >
                <span>Читать на {item.platform}</span>
                <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        <a
          href={VENUE.links.yandexReviews}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.allLink}
        >
          <span>Читать все отзывы на Яндекс Картах</span>
          <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
