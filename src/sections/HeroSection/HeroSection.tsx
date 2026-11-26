import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { Magnet } from '../../components/Magnet/Magnet';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const shiftX = useMotionValue(0);
  const shiftY = useMotionValue(0);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);

  const springX = useSpring(shiftX, { stiffness: 80, damping: 24 });
  const springY = useSpring(shiftY, { stiffness: 80, damping: 24 });
  const springRotX = useSpring(rotX, { stiffness: 80, damping: 24 });
  const springRotY = useSpring(rotY, { stiffness: 80, damping: 24 });

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    if (prefersReduced || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    shiftX.set(-nx * 28);
    shiftY.set(-ny * 20);
    rotX.set(-ny * 4);
    rotY.set(nx * 5);
  }

  function handlePointerLeave() {
    shiftX.set(0);
    shiftY.set(0);
    rotX.set(0);
    rotY.set(0);
  }

  return (
    <section
      id="top"
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
          alt="Мозаичный светильник в баре ILAN"
          className={styles.bgImage}
        />
      </motion.div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.centerStage}>
        <h1 className={styles.title}>
          <span className={styles.maskLine}>
            <motion.span
              className={styles.lineInner}
              initial={prefersReduced ? false : { y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              ПОСЛЕ ШЕСТИ.
            </motion.span>
          </span>
          <span className={styles.maskLine}>
            <motion.span
              className={`${styles.lineInner} ${styles.accentLine}`}
              initial={prefersReduced ? false : { y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, delay: 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              БЕЗ ПАФОСА.
            </motion.span>
          </span>
        </h1>

        <p className={styles.lead}>
          Кормим пловом и бургерами до четырёх утра, наливаем за стойкой и не стоим над душой.
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
