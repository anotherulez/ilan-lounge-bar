import { VENUE } from '../../data/venue';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onOpenBookingModal: () => void;
}

export function HeroSection({ onOpenBookingModal }: HeroSectionProps) {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.plate} aria-hidden="true">
        <img
          src="./images/lounge-candles.webp"
          alt=""
          className={styles.plateImg}
        />
      </div>

      <div className={styles.contentWrap}>
        <div className={styles.copy}>
          <div className={styles.titleBlock}>
            <h1 className={styles.headline}>{VENUE.brand}</h1>
            <p className={styles.tagline}>lounge bar</p>
          </div>

          <p className={styles.subcopy}>
            {VENUE.city}, {VENUE.address}
          </p>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryPill}
              onClick={onOpenBookingModal}
            >
              Забронировать
            </button>
            <a href="#menu" className={styles.ghostLink}>
              Меню
            </a>
          </div>
        </div>

        <p className={styles.bottomAnchor}>
          <span>{VENUE.hoursFull}</span>
          <span className={styles.bottomSep} aria-hidden="true">·</span>
          <span className={styles.bottomPhone}>{VENUE.phoneDisplay}</span>
        </p>
      </div>
    </section>
  );
}
