import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Magnet } from '../../components/Magnet/Magnet';
import { Reveal } from '../../components/Reveal/Reveal';
import { TiltedCard } from '../../components/TiltedCard/TiltedCard';
import styles from './FeatureHighlightSection.module.css';

export function FeatureHighlightSection() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yShift = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="vip" className={styles.section} ref={ref}>
      <Reveal>
        <div className={styles.container}>
          <div className={styles.textCol}>
            <h2 className={styles.heading}>
              VIP. <span className="serif-italic">только</span> СВОИ.
            </h2>
            <p className={styles.body}>
              Отдельная комната, где не слышно чужих тостов. Внутри PlayStation 5, настольные
              игры, три экрана для матчей и официант, который принесёт ужин прямо к дивану.
            </p>
            <Magnet>
              <a href="#booking" className={styles.btn}>
                Занять VIP
              </a>
            </Magnet>
          </div>

          <div className={styles.photoPair}>
            <TiltedCard maxTilt={8} className={styles.mainPhoto}>
              <div className={styles.photoFrame}>
                <img
                  src="/images/guest-vibe.jpg"
                  alt="Неоновая вывеска в зале ILAN"
                  className={styles.photo}
                />
              </div>
            </TiltedCard>
            <motion.div
              className={styles.accentPhoto}
              style={prefersReduced ? undefined : { y: yShift }}
            >
              <TiltedCard maxTilt={9}>
                <div className={styles.photoFrameSmall}>
                  <img
                    src="/images/bar-craft.webp"
                    alt="Приготовление напитков за стойкой"
                    className={styles.photo}
                  />
                </div>
              </TiltedCard>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
