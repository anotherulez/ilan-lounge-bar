import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import styles from './ScrollProgress.module.css';

export function ScrollProgress() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28, restDelta: 0.001 });

  if (prefersReduced) return null;

  return <motion.div className={styles.bar} style={{ scaleX }} aria-hidden="true" />;
}
