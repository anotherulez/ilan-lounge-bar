import { useEffect, useRef } from 'react';
import { BREAKPOINTS, MOTION_TOKENS, createMatchMediaContext, gsap } from '../../motion/motionSystem';
import styles from './KineticTypography.module.css';

export function KineticTypography() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineOneRef = useRef<HTMLDivElement>(null);
  const lineTwoRef = useRef<HTMLDivElement>(null);
  const lineThreeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    return createMatchMediaContext(scope, (mm) => {
      mm.add(BREAKPOINTS.tabletUp, () => {
        const trigger = {
          trigger: scope,
          start: 'top bottom',
          end: 'bottom top',
          scrub: MOTION_TOKENS.scrub,
        };

        gsap.fromTo(
          lineOneRef.current,
          { xPercent: -6 },
          { xPercent: 8, ease: MOTION_TOKENS.ease.scrub, scrollTrigger: trigger }
        );
        gsap.fromTo(
          lineTwoRef.current,
          { xPercent: 8 },
          { xPercent: -8, ease: MOTION_TOKENS.ease.scrub, scrollTrigger: trigger }
        );
        gsap.fromTo(
          lineThreeRef.current,
          { xPercent: -4 },
          { xPercent: 6, ease: MOTION_TOKENS.ease.scrub, scrollTrigger: trigger }
        );
      });

      mm.add(BREAKPOINTS.mobile, () => {
        const trigger = {
          trigger: scope,
          start: 'top bottom',
          end: 'bottom top',
          scrub: MOTION_TOKENS.scrub,
        };

        gsap.fromTo(
          lineOneRef.current,
          { xPercent: -3 },
          { xPercent: 4, ease: MOTION_TOKENS.ease.scrub, scrollTrigger: trigger }
        );
        gsap.fromTo(
          lineTwoRef.current,
          { xPercent: 4 },
          { xPercent: -4, ease: MOTION_TOKENS.ease.scrub, scrollTrigger: trigger }
        );
        gsap.fromTo(
          lineThreeRef.current,
          { xPercent: -2 },
          { xPercent: 3, ease: MOTION_TOKENS.ease.scrub, scrollTrigger: trigger }
        );
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Ужин после полуночи, Екатеринбург, 8 Марта 31, до 04:00"
    >
      <div className={styles.stack}>
        <div ref={lineOneRef} className={`${styles.row} ${styles.solidRow}`}>
          <span>УЖИН ПОСЛЕ ПОЛУНОЧИ</span>
          <span className={styles.sep} aria-hidden="true">·</span>
          <span>УЖИН ПОСЛЕ ПОЛУНОЧИ</span>
        </div>

        <div ref={lineTwoRef} className={`${styles.row} ${styles.outlineRow}`}>
          <span>ЕКАТЕРИНБУРГ · 8 МАРТА, 31</span>
          <span className={styles.brassAccent}>ДО 04:00</span>
          <span>ЕКАТЕРИНБУРГ · 8 МАРТА, 31</span>
        </div>

        <div ref={lineThreeRef} className={`${styles.row} ${styles.editorialRow}`}>
          <span>КУХНЯ НОЧЬЮ</span>
          <span className={styles.sep} aria-hidden="true">/</span>
          <span>ЧАЙ НА СВЕЧЕ</span>
          <span className={styles.sep} aria-hidden="true">/</span>
          <span>ЗАКРЫТЫЙ VIP</span>
        </div>
      </div>
    </section>
  );
}
