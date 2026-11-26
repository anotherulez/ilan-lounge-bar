import { Magnet } from '../../components/Magnet/Magnet';
import { Reveal } from '../../components/Reveal/Reveal';
import { ScatteredPhoto } from '../../components/ScatteredPhoto/ScatteredPhoto';
import { SectionKicker } from '../../components/SectionKicker/SectionKicker';
import styles from './StorySection.module.css';

export function StorySection() {
  return (
    <section id="about" className={styles.section}>
      <Reveal>
        <div className={styles.container}>
          <div className={styles.copyCol}>
            <SectionKicker index="01" label="ПОСЛЕ РАБОТЫ" ghostWord="8 МАРТА 31" />
            <h2 className={styles.heading}>
              ЗАЕХАТЬ ПОЗДНО. <span className="serif-italic">остаться</span> ДО УТРА.
            </h2>

            <div className={styles.textBlock}>
              <p className={styles.lead}>
                Сюда заходят съесть тарелку горячего борща в три ночи, разлить чай на свече в
                армуды или засесть компанией за приставкой.
              </p>
              <p className={styles.sub}>
                Кухня готовит до закрытия дверей, а до метро «Геологическая» и «Площадь 1905 года»
                пять минут пешком.
              </p>
              <Magnet>
                <a href="#menu" className={styles.btn}>
                  Смотреть меню
                </a>
              </Magnet>
            </div>

            <ScatteredPhoto
              src="/images/tea-kettle.jpg"
              alt="Чайник на свече и армуды в зале ILAN"
              className={styles.photoUnderText}
              drift={24}
              tiltDeg={-2.2}
            />
          </div>

          <div className={styles.scatterField}>
            <ScatteredPhoto
              src="/images/ilan-sign-lamp.jpg"
              alt="Вывеска ILAN и лампа"
              className={styles.photoPrimary}
              drift={36}
              tiltDeg={1.4}
            />
            <ScatteredPhoto
              src="/images/lounge-candles.webp"
              alt="Вечерний столик со свечами"
              className={styles.photoTopLeft}
              drift={-22}
              tiltDeg={-3.2}
            />
            <ScatteredPhoto
              src="/images/interior-velvet.webp"
              alt="Зал бара ILAN"
              className={styles.photoBottomRight}
              drift={-30}
              tiltDeg={2.8}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
