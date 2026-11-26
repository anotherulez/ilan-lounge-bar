import { SeamlessImageMarquee } from '../../components/SeamlessImageMarquee/SeamlessImageMarquee';
import { MARQUEE_GALLERY } from '../../data/gallery';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import styles from './SpaceSection.module.css';

interface SpaceSectionProps {
  onReserveVip: () => void;
}

export function SpaceSection({ onReserveVip }: SpaceSectionProps) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>();

  return (
    <section
      id="hall"
      ref={ref}
      className={`${styles.section} reveal-section`}
      data-visible={visible}
    >
      <div className={styles.container}>
        <div className={styles.block}>
          <div className={styles.headerBlock}>
            <h2 className={styles.heading}>Основной зал</h2>
            <p className={styles.desc}>
              Приглушённый свет, горячая кухня до закрытия, чай на свече и диджей-сеты по
              выходным.
            </p>
          </div>
          <SeamlessImageMarquee
            items={MARQUEE_GALLERY.hall}
            label="Галерея основного зала ILAN"
            durationSec={42}
          />
        </div>

        <div id="vip" className={styles.block}>
          <div className={styles.headerRow}>
            <div className={styles.headerBlock}>
              <h2 className={styles.heading}>Закрытый VIP</h2>
              <p className={styles.desc}>
                Отдельная комната, три экрана, PlayStation 5 и подача блюд прямо к дивану.
              </p>
            </div>
            <button type="button" className={styles.ghostBtn} onClick={onReserveVip}>
              Занять VIP
            </button>
          </div>
          <SeamlessImageMarquee
            items={MARQUEE_GALLERY.vip}
            label="Галерея закрытой VIP-зоны ILAN"
            durationSec={38}
          />
        </div>
      </div>
    </section>
  );
}
