import { ArrowRight } from 'lucide-react';
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
              <span>Яндекс Карты · 2ГИС</span>
              <span>На основе оценок гостей</span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {GUEST_REVIEWS.map((review) => (
            <article key={review.id} className={styles.card}>
              <p className={styles.quote}>«{review.quote}»</p>
              <div className={styles.meta}>
                <span>{review.author}</span>
                <span aria-hidden="true">·</span>
                <span>{review.source}</span>
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
