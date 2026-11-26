import { useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import styles from './TiltedCard.module.css';

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltedCard({ children, className, maxTilt = 7 }: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, active: false });

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 220, damping: 24, mass: 0.6 });
  const springRy = useSpring(ry, { stiffness: 220, damping: 24, mass: 0.6 });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReduced || e.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((0.5 - py) * maxTilt * 2);
    ry.set((px - 0.5) * maxTilt * 2);
    setGlarePos({ x: px * 100, y: py * 100, active: true });
  }

  function handleLeave() {
    rx.set(0);
    ry.set(0);
    setGlarePos((prev) => ({ ...prev, active: false }));
  }

  return (
    <div className={`${styles.perspective} ${className ?? ''}`} ref={ref}>
      <motion.div
        className={styles.inner}
        style={prefersReduced ? undefined : { rotateX: springRx, rotateY: springRy }}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        {children}
        {!prefersReduced && (
          <span
            aria-hidden="true"
            className={styles.glare}
            style={{
              opacity: glarePos.active ? 0.24 : 0,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(212, 163, 89, 0.45), transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
