import { Reveal } from '../../components/Reveal/Reveal';
import { TiltedCard } from '../../components/TiltedCard/TiltedCard';
import { VENUE } from '../../data/venue';
import styles from './StorySection.module.css';

export function StorySection() {
  return (
    <section id="about" className={styles.section}>
      <Reveal>
        <div className={styles.container}>
          <div className={styles.photoBox}>
            <img
              src="/images/ilan-sign-lamp.jpg"
              alt="Вывеска ILAN и тёплый свет лампы в зале"
              className={styles.photo}
            />
          </div>

          <h2 className={styles.displayHeading}>
            Уют без пафоса,
            <br />
            но с характером
          </h2>

          <div className={styles.cardWrap}>
            <TiltedCard maxTilt={5}>
              <div className={styles.burgundyCard}>
                <p className={styles.lead}>
                  Сюда приходят не на экскурсию по ремонту, а выдохнуть после дня,
                  поесть горячего хоть в три ночи и посидеть так, чтобы никто не стоял над душой.
                </p>
                <p className={styles.subCopy}>
                  Без напыщенного дресс-кода, зато с живой кухней, отдельной VIP-комнатой и
                  честным рейтингом <strong className="tabular-nums">{VENUE.stats.yandex.rating}</strong>{' '}
                  на Яндекс Картах и в 2ГИС.
                </p>
                <a href="#menu" className={styles.btn}>
                  Посмотреть меню
                </a>
              </div>
            </TiltedCard>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
