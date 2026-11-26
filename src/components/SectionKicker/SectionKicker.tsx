import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import styles from './SectionKicker.module.css';

interface SectionKickerProps {
  index: string;
  label: string;
  ghostWord?: string;
}

export function SectionKicker({ index, label, ghostWord }: SectionKickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ghostX = useTransform(scrollYProgress, [0, 1], [-28, 28]);

  return (
    <div ref={ref} className={styles.wrap}>
      {ghostWord && (
        <motion.span
          aria-hidden="true"
          className={styles.ghost}
          style={prefersReduced ? undefined : { x: ghostX }}
        >
          {ghostWord}
        </motion.span>
      )}
      <div className={styles.kickerRow}>
        <span className={`${styles.index} tabular-nums`}>{index}</span>
        <span className={styles.rule} aria-hidden="true" />
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
