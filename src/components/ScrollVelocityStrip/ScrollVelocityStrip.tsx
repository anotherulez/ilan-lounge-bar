import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import styles from './ScrollVelocityStrip.module.css';

interface ScrollVelocityStripProps {
  text: string;
}

export function ScrollVelocityStrip({ text }: ScrollVelocityStripProps) {
  const prefersReduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 360 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 3.2], { clamp: false });
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    if (prefersReduced) return;
    let moveBy = directionFactor.current * -3.2 * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * Math.abs(vf);

    let next = baseX.get() + moveBy;
    if (next <= -50) next += 50;
    if (next > 0) next -= 50;
    baseX.set(next);
  });

  const xPercent = useTransform(baseX, (v) => `${v}%`);

  return (
    <div className={styles.strip} aria-hidden="true">
      <motion.div className={styles.track} style={prefersReduced ? undefined : { x: xPercent }}>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
}
