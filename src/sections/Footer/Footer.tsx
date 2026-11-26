import { VENUE } from '../../data/venue';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.line}>
          <span className={styles.brand}>{VENUE.brand}</span>
          <span className={styles.sep} aria-hidden="true">·</span>
          <span>{VENUE.city}, {VENUE.address}</span>
          <span className={styles.sep} aria-hidden="true">·</span>
          <a href={VENUE.phoneHref} className={styles.link}>
            {VENUE.phoneDisplay}
          </a>
          <span className={styles.sep} aria-hidden="true">·</span>
          <a href={VENUE.links.vk} target="_blank" rel="noreferrer" className={styles.link}>
            ВКонтакте
          </a>
          <span className={styles.sep} aria-hidden="true">·</span>
          <span>18+</span>
        </div>
      </div>
    </footer>
  );
}
