import { VENUE } from '../../data/venue';
import styles from './StorySection.module.css';

export function StorySection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.photoBox}>
          <img
            src="/images/interior-velvet.webp"
            alt="Бордовые велюровые диваны и хрустальные люстры в зале ILAN"
            className={styles.photo}
          />
        </div>

        <h2 className={styles.displayHeading}>
          Бордовый велюр
          <br />
          и тёплый свет
        </h2>

        <div className={styles.burgundyCard}>
          <p className={styles.lead}>
            {VENUE.capacity}. В интерьере сочетаются бордовые велюровые диваны,
            кирпичная кладка, тёмное дерево и тёплый свет люстр.
          </p>
          <p className={styles.stats}>
            Яндекс Карты: <strong className="tabular-nums">{VENUE.stats.yandex.rating}</strong> (
            {VENUE.stats.yandex.ratingsCount}, {VENUE.stats.yandex.reviewsCount}) · 2ГИС:{' '}
            <strong className="tabular-nums">{VENUE.stats.twoGis.rating}</strong> (
            {VENUE.stats.twoGis.ratingsCount}).
          </p>
          <a href="#menu" className={styles.btn}>
            Смотреть меню
          </a>
        </div>
      </div>
    </section>
  );
}
