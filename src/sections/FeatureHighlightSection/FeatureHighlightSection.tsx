import { Magnet } from '../../components/Magnet/Magnet';
import { Reveal } from '../../components/Reveal/Reveal';
import { ScatteredPhoto } from '../../components/ScatteredPhoto/ScatteredPhoto';
import { SectionKicker } from '../../components/SectionKicker/SectionKicker';
import styles from './FeatureHighlightSection.module.css';

export function FeatureHighlightSection() {
  return (
    <section id="vip" className={styles.section}>
      <Reveal>
        <div className={styles.container}>
          <div className={styles.textCol}>
            <SectionKicker index="03" label="СВОЯ КОМПАНИЯ" ghostWord="ЗАКРЫТЫЙ" />
            <h2 className={styles.heading}>
              ОТДЕЛЬНЫЙ <span className="serif-italic">зал</span> ДЛЯ СВОИХ.
            </h2>
            <p className={styles.body}>
              Дверь закрывается, чужих разговоров за спиной нет. Внутри три экрана под матчи,
              PlayStation 5, настольные игры и подача блюд прямо к дивану.
            </p>
            <Magnet>
              <a href="#booking" className={styles.btn}>
                Занять VIP
              </a>
            </Magnet>

            <ScatteredPhoto
              src="/images/interior-wide.webp"
              alt="Подача чая за стойкой ILAN"
              className={styles.photoCorner}
              drift={20}
              tiltDeg={2.4}
            />
          </div>

          <div className={styles.photoPair}>
            <ScatteredPhoto
              src="/images/guest-vibe.jpg"
              alt="Неоновая вывеска в зале ILAN"
              className={styles.mainPhoto}
              drift={32}
              tiltDeg={-1.8}
            />
            <ScatteredPhoto
              src="/images/bar-craft.webp"
              alt="Приготовление напитков за стойкой"
              className={styles.accentPhoto}
              drift={-28}
              tiltDeg={3.1}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
