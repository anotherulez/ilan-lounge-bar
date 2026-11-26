import { REVIEWS } from '../../data/reviews';
import styles from './ReviewsSection.module.css';

export function ReviewsSection() {
  return (
    <section id="reviews" className={styles.band}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Отзывы гостей</h2>

        <div className={styles.grid}>
          {REVIEWS.map((item) => (
            <article key={item.id} className={styles.column}>
              <p className={styles.quote}>{item.quote}</p>
              <div className={styles.footer}>
                <span className={styles.author}>{item.author}</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.source}
                >
                  {item.source}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.dots} aria-hidden="true">
          <span className={`${styles.dot} ${styles.dotActive}`} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    </section>
  );
}
