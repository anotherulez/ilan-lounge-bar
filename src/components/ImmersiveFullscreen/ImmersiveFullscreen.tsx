import { useEffect, useRef } from 'react';
import { BREAKPOINTS, MOTION_TOKENS, createMatchMediaContext, gsap } from '../../motion/motionSystem';
import styles from './ImmersiveFullscreen.module.css';

interface ImmersiveFullscreenProps {
  src: string;
  alt: string;
  chapter: string;
  caption: string;
}

export function ImmersiveFullscreen({
  src,
  alt,
  chapter,
  caption,
}: ImmersiveFullscreenProps) {
  const triggerRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = triggerRef.current;
    const frame = frameRef.current;
    const img = imgRef.current;
    const cap = captionRef.current;
    if (!scope || !frame || !img || !cap) return;

    return createMatchMediaContext(scope, (mm) => {
      mm.add(BREAKPOINTS.tabletUp, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scope,
            start: 'top top',
            end: '+=150%',
            pin: true,
            pinSpacing: true,
            scrub: MOTION_TOKENS.scrub,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase A -> Phase B (Establishing Shot -> Expansion)
        tl.fromTo(
          frame,
          { clipPath: 'inset(7% 8% 7% 8% round 4px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: MOTION_TOKENS.ease.scrub,
            duration: 0.45,
          },
          0
        );

        // Phase B -> Phase C (Camera drift inside Fullscreen)
        tl.fromTo(
          img,
          { scale: 1.09 },
          {
            scale: 1,
            ease: MOTION_TOKENS.ease.scrub,
            duration: 0.75,
          },
          0
        );

        // Phase C (Caption settles cleanly during Immersion)
        tl.fromTo(
          cap,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            ease: MOTION_TOKENS.ease.scrub,
            duration: 0.25,
          },
          0.35
        );

        // Phase D (Hold cleanly before release to next section)
        tl.to(img, { scale: 1.03, ease: MOTION_TOKENS.ease.scrub, duration: 0.25 }, 0.75);
      });

      mm.add(BREAKPOINTS.mobile, () => {
        gsap.fromTo(
          img,
          { scale: 1.06 },
          {
            scale: 1,
            ease: MOTION_TOKENS.ease.scrub,
            scrollTrigger: {
              trigger: scope,
              start: 'top bottom',
              end: 'bottom top',
              scrub: MOTION_TOKENS.scrub,
            },
          }
        );
      });
    });
  }, []);

  return (
    <section
      ref={triggerRef}
      className={styles.section}
      aria-label={`${chapter} — ${caption}`}
    >
      <div className={styles.viewportBox}>
        <div ref={frameRef} className={styles.frame}>
          <img ref={imgRef} src={src} alt={alt} className={styles.image} />
          <div className={styles.scrim} aria-hidden="true" />
          <div ref={captionRef} className={styles.meta}>
            <span className={`${styles.chapter} tabular-nums`}>{chapter}</span>
            <span className={styles.caption}>{caption}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
