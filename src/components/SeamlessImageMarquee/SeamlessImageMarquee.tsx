import type { GalleryAsset } from '../../data/gallery';
import styles from './SeamlessImageMarquee.module.css';

interface SeamlessImageMarqueeProps {
  items: GalleryAsset[];
  label: string;
  durationSec?: number;
}

export function SeamlessImageMarquee({
  items,
  label,
  durationSec = 42,
}: SeamlessImageMarqueeProps) {
  return (
    <div className={styles.wrapper} role="region" aria-label={label}>
      <div
        className={styles.track}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {[0, 1].map((dupIndex) => (
          <div
            key={dupIndex}
            className={styles.group}
            aria-hidden={dupIndex === 1 ? 'true' : undefined}
          >
            {items.map((item, idx) => (
              <div key={`${dupIndex}-${idx}`} className={styles.card}>
                <img
                  src={item.src}
                  alt={dupIndex === 0 ? item.alt : ''}
                  className={styles.img}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
