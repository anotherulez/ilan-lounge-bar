import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { GUEST_REVIEWS } from '../../data/reviews';
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
              <span>Яндекс Карты · 2ГИС · Restoclub</span>
              <span>Свыше 900 реальных оценок гостей</span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {GUEST_REVIEWS.map((item, idx) => (
            <article
              key={item.id}
              className={`${styles.card} stagger-item`}
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div className={styles.cardTop}>
                <span className={styles.platform}>{item.platform}</span>
                <span className={`${styles.cardScore} tabular-nums`}>{item.rating}</span>
              </div>

              <p className={`${styles.text} ${styles.quoteText}`}>{item.text}</p>

              <div className={styles.cardFooter}>
                <span className={styles.metaLabel}>{item.meta}</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardLink}
                  aria-label={`Открыть отзыв на ${item.platform}`}
                >
                  <span>Источник</span>
                  <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
                </a>
              </div>
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
