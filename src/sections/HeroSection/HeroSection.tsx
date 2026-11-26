import { Magnet } from '../../components/Magnet/Magnet';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section id="top" className={styles.heroCanvas}>
      <div className={styles.bgStage}>
        <img
          src="/images/hero-lantern.jpg"
          alt="Мозаичный светильник в баре ILAN"
          className={styles.bgImage}
        />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.centerStage}>
        <h1 className={styles.title}>
          <span className={`${styles.maskLine} ${styles.lineTop}`}>УЖИН ПОСЛЕ ПОЛУНОЧИ</span>
          <span className={`${styles.maskLine} ${styles.lineBottom}`}>
            ILAN <span className={styles.dotSep} aria-hidden="true">/</span>{' '}
            <span className={`${styles.accentLine} tabular-nums`}>ДО 04:00</span>
          </span>
        </h1>

        <p className={styles.lead}>
          Подаём горячий плов и бургеры ночью, завариваем чай на свече и держим закрытый VIP на
          8 Марта, 31.
        </p>

        <div className={styles.actions}>
          <Magnet>
            <a href="#booking" className={styles.ctaPrimary}>
              Забронировать стол
            </a>
          </Magnet>
          <Magnet>
            <a href="#menu" className={styles.ctaSecondary}>
              Меню
            </a>
          </Magnet>
        </div>
      </div>
    </section>
  );
}
