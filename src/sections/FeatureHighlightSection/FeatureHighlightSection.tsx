import { SectionKicker } from '../../components/SectionKicker/SectionKicker';
import styles from './FeatureHighlightSection.module.css';

export function FeatureHighlightSection() {
  return (
    <section id="vip" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textCol}>
          <SectionKicker index="03" label="ПРИВАТНАЯ ЗОНА" />
          <h2 className={styles.heading}>
            <span className={styles.outlineWord}>ОТДЕЛЬНЫЙ</span> ЗАЛ ДЛЯ СВОИХ.
          </h2>
          <p className={styles.body}>
            Дверь закрывается, чужих разговоров за спиной нет. Внутри три экрана под матчи,
            PlayStation 5, настольные игры и подача блюд прямо к дивану.
          </p>
          <a href="#booking" className={styles.btn}>
            Занять VIP
          </a>
        </div>

        <figure className={styles.figureWide}>
          <img
            src="/images/bar-craft.webp"
            alt="Работа бармена и подача в ILAN"
            className={styles.photo}
          />
        </figure>
      </div>
    </section>
  );
}
