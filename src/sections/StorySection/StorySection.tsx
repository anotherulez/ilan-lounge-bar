import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Reveal } from '../../components/Reveal/Reveal';
import { TiltedCard } from '../../components/TiltedCard/TiltedCard';
import styles from './StorySection.module.css';

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const ySlow = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const yFast = useTransform(scrollYProgress, [0, 1], [-24, 38]);

  return (
    <section id="about" className={styles.section} ref={sectionRef}>
      <Reveal>
        <div className={styles.container}>
          <div className={styles.copyCol}>
            <h2 className={styles.heading}>
              СЮДА ПРИХОДЯТ НЕ НА{' '}
              <span className="serif-italic">экскурсию</span> ПО ИНТЕРЬЕРУ.
            </h2>

            <div className={styles.textBlock}>
              <p className={styles.lead}>
                Выдохнуть после работы, съесть тарелку горячего борща в три ночи и поспорить с
                друзьями за геймпадом. Без показной важности и лишних правил.
              </p>
              <p className={styles.sub}>
                Нас легко найти на 8 Марта, 31 в пяти минутах от метро, а дальше вы сами решите,
                уйти через час или остаться до утра.
              </p>
              <a href="#menu" className={styles.btn}>
                Выбрать блюда
              </a>
            </div>
          </div>

          {/* Scattered uncaptioned real ILAN photos with scroll-linked 3D parallax */}
          <div className={styles.scatterCol}>
            <motion.div
              className={styles.photoMain}
              style={prefersReduced ? undefined : { y: ySlow }}
            >
              <TiltedCard maxTilt={6}>
                <img
                  src="/images/ilan-sign-lamp.jpg"
                  alt="Вывеска ILAN и лампа"
                  className={styles.img}
                />
              </TiltedCard>
            </motion.div>

            <motion.div
              className={styles.photoFloatTop}
              style={prefersReduced ? undefined : { y: yFast }}
            >
              <TiltedCard maxTilt={8}>
                <img
                  src="/images/lounge-candles.webp"
                  alt="Вечерний столик со свечами"
                  className={styles.img}
                />
              </TiltedCard>
            </motion.div>

            <motion.div
              className={styles.photoFloatBottom}
              style={prefersReduced ? undefined : { y: yFast }}
            >
              <TiltedCard maxTilt={7}>
                <img
                  src="/images/interior-velvet.webp"
                  alt="Зал бара ILAN"
                  className={styles.img}
                />
              </TiltedCard>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
