import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { TiltedCard } from '../TiltedCard/TiltedCard';
import styles from './ScatteredPhoto.module.css';

interface ScatteredPhotoProps {
  src: string;
  alt: string;
  className?: string;
  drift?: number;
  tiltDeg?: number;
}

export function ScatteredPhoto({
  src,
  alt,
  className = '',
  drift = 28,
  tiltDeg = 0,
}: ScatteredPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <motion.div
      ref={ref}
      className={`${styles.frame} ${className}`}
      style={
        prefersReduced
          ? { rotate: tiltDeg }
          : { y, rotate: tiltDeg }
      }
    >
      <TiltedCard maxTilt={7} className={styles.innerTilt}>
        <img src={src} alt={alt} className={styles.img} />
      </TiltedCard>
    </motion.div>
  );
}
