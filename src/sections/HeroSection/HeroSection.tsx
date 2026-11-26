import { HERO_CARDS, HERO_FEATURES, VENUE } from '../../data/venue';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section id="top" className={styles.heroWrap}>
      <div className={styles.heroCanvas}>
        <img
          src="/images/interior-wide.webp"
          alt="Барная стойка ILAN с чайной подачей"
          className={styles.bgImage}
        />
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.inner}>
          <div className={styles.copyCol}>
            <h1 className={styles.title}>
              Вечерний
              <br />
              лаундж
              <br />
              в центре
            </h1>
            <p className={styles.meta}>
              {VENUE.address} · {VENUE.city} · {VENUE.hours}
            </p>
            <a href="#booking" className={styles.cta}>
              Забронировать стол
            </a>
          </div>

          <div className={styles.cardsRail} aria-label="Зоны заведения">
            {HERO_CARDS.map((card) => (
              <a key={card.id} href={card.href} className={styles.miniCard}>
                <img src={card.image} alt={card.alt} className={styles.miniPhoto} />
                <span className={`${styles.miniStrip} ${styles[`tone_${card.tone}`]}`}>
                  {card.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.featuresBar}>
        {HERO_FEATURES.map((feat) => (
          <article key={feat.id} className={styles.featureItem}>
            <h2 className={styles.featureTitle}>{feat.title}</h2>
            <p className={styles.featureDesc}>{feat.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
