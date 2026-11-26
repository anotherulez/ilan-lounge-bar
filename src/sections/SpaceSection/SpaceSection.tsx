import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import styles from './SpaceSection.module.css';

export function SpaceSection() {
  const { ref, visible } = useRevealOnScroll<HTMLElement>();

  return (
    <section
      id="space"
      ref={ref}
      className={`${styles.section} reveal-section`}
      data-visible={visible}
    >
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.textCol}>
            <span className={styles.label}>Пространство</span>
            <h2 className={styles.heading}>Основной зал</h2>
            <p className={styles.desc}>
              Приглушённый свет, горячая кухня до закрытия, чай на свече и диджей-сеты по
              выходным.
            </p>
          </div>
          <div className={styles.mediaCol}>
            <img
              src="/images/interior-velvet.webp"
              alt="Основной зал ILAN с велюровыми диванами"
              className={styles.photo}
            />
          </div>
        </div>

        <div id="vip" className={`${styles.row} ${styles.rowReversed}`}>
          <div className={styles.textCol}>
            <span className={styles.label}>Приватная зона</span>
            <h2 className={styles.heading}>Закрытый VIP</h2>
            <p className={styles.desc}>
              Отдельная комната, три экрана, PlayStation 5 и подача блюд прямо к дивану.
            </p>
            <a href="#booking" className={styles.ghostLink}>
              Занять VIP
            </a>
          </div>
          <div className={styles.mediaCol}>
            <img
              src="/images/ilan-sign-lamp.jpg"
              alt="Интерьер комнаты ILAN с тёплой лампой"
              className={styles.photo}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
