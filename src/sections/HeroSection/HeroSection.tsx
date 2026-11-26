import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { HERO_FEATURES, VENUE } from '../../data/venue';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const shiftX = useMotionValue(0);
  const shiftY = useMotionValue(0);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);

  const springX = useSpring(shiftX, { stiffness: 90, damping: 24 });
  const springY = useSpring(shiftY, { stiffness: 90, damping: 24 });
  const springRotX = useSpring(rotX, { stiffness: 90, damping: 24 });
  const springRotY = useSpring(rotY, { stiffness: 90, damping: 24 });

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReduced || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    shiftX.set(-nx * 22);
    shiftY.set(-ny * 16);
    rotX.set(-ny * 3.5);
    rotY.set(nx * 4.5);
  }

  function handlePointerLeave() {
    shiftX.set(0);
    shiftY.set(0);
    rotX.set(0);
    rotY.set(0);
  }

  return (
    <section id="top" className={styles.heroWrap}>
      <div
        className={styles.heroCanvas}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <motion.div
          className={styles.bgStage}
          style={
            prefersReduced
              ? undefined
              : {
                  x: springX,
                  y: springY,
                  rotateX: springRotX,
                  rotateY: springRotY,
                }
          }
        >
          <img
            src="/images/hero-lantern.jpg"
            alt="Мозаичный светильник в вечернем зале ILAN"
            className={styles.bgImage}
          />
        </motion.div>
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.centerStage}>
          <p className={styles.eyebrowLine}>
            {VENUE.city} · {VENUE.address} · {VENUE.hours}
          </p>
          <h1 className={styles.title}>
            Свой ритм
            <br />
            после шести
          </h1>
          <p className={styles.lead}>
            Горячая кухня до утра, чай на свече и своя компания до четырёх ночи.
          </p>
          <div className={styles.actions}>
            <a href="#booking" className={styles.ctaPrimary}>
              Забронировать стол
            </a>
            <a href="#menu" className={styles.ctaSecondary}>
              Меню
            </a>
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
