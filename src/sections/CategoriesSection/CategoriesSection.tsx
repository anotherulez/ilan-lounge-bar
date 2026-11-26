import { CATEGORY_TILES } from '../../data/venue';
import styles from './CategoriesSection.module.css';

export function CategoriesSection() {
  return (
    <section id="zones" className={styles.section} aria-label="Ключевые направления">
      <div className={styles.container}>
        <div className={styles.grid}>
          {CATEGORY_TILES.map((tile) => (
            <a key={tile.index} href={tile.href} className={styles.item}>
              <div className={styles.labelRow}>
                <span className={`${styles.index} tabular-nums`}>{tile.index}</span>
                <span className={styles.title}>{tile.title}</span>
              </div>
              <div className={styles.imageFrame}>
                <img src={tile.image} alt={tile.alt} className={styles.image} />
              </div>
              <span className={styles.caption}>{tile.caption}</span>
            </a>
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
