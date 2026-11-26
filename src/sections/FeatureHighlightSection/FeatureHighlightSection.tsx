import { Reveal } from '../../components/Reveal/Reveal';
import { TiltedCard } from '../../components/TiltedCard/TiltedCard';
import styles from './FeatureHighlightSection.module.css';

export function FeatureHighlightSection() {
  return (
    <section id="vip" className={styles.section}>
      <Reveal>
        <div className={styles.container}>
          <div className={styles.textCol}>
            <h2 className={styles.heading}>
              Закрыться в VIP
              <br />
              и никуда не спешить
            </h2>
            <p className={styles.body}>
              Для дня рождения, большого матча или встречи старых друзей есть отдельная
              VIP-комната. Внутри PlayStation 5, настольные игры, три экрана в зале
              и ноль случайных людей за соседним столом.
            </p>
            <a href="#booking" className={styles.btn}>
              Занять VIP
            </a>
          </div>

          <div className={styles.photoCol}>
            <TiltedCard maxTilt={8}>
              <div className={styles.photoFrame}>
                <img
                  src="/images/guest-vibe.jpg"
                  alt="Неоновая вывеска «Как же здесь офигенно» в зале ILAN"
                  className={styles.photo}
                />
              </div>
            </TiltedCard>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
