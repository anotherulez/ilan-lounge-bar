import { VENUE } from '../../data/venue';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.plate} aria-hidden="true">
        <img
          src="/images/lounge-candles.webp"
          alt=""
          className={styles.plateImg}
        />
      </div>

      <div className={styles.contentWrap}>
        <div className={styles.copy}>
          <h1 className={styles.headline}>
            <span className={styles.line}>ILAN</span>
            <span className={styles.line}>До 04:00.</span>
          </h1>

          <p className={styles.subcopy}>
            {VENUE.city}, {VENUE.address}
          </p>

          <div className={styles.actions}>
            <a href="#booking" className={styles.primaryPill}>
              Забронировать
            </a>
            <a href="#menu" className={styles.ghostLink}>
              Меню
            </a>
          </div>
        </div>

        <p className={styles.bottomAnchor}>
          {VENUE.hoursFull} · {VENUE.phoneDisplay}
        </p>
      </div>
    </section>
  );
}
