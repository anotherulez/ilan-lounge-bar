import { SectionKicker } from '../../components/SectionKicker/SectionKicker';
import styles from './StorySection.module.css';

export function StorySection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.copyCol}>
          <SectionKicker index="01" label="О БАРЕ" />
          <h2 className={styles.heading}>
            Заехать поздно <span className={styles.sansSub}>и остаться до утра.</span>
          </h2>

          <div className={styles.textBlock}>
            <p className={styles.lead}>
              Сюда заходят съесть тарелку горячего борща в три ночи, разлить чай на свече в армуды
              или засесть компанией за приставкой.
            </p>
            <p className={styles.sub}>
              Кухня готовит до закрытия дверей, а до метро «Геологическая» и «Площадь 1905 года»
              пять минут пешком.
            </p>
            <a href="#menu" className={styles.btn}>
              Смотреть меню
            </a>
          </div>
        </div>

        <div className={styles.photoPair}>
          <figure className={styles.figureLarge}>
            <img
              src="/images/ilan-sign-lamp.jpg"
              alt="Вывеска ILAN и лампа"
              className={styles.img}
            />
          </figure>
          <figure className={styles.figureSide}>
            <img
              src="/images/lounge-candles.webp"
              alt="Вечерний столик со свечами"
              className={styles.img}
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
