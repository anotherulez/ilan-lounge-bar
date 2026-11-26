import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MenuItem } from '../../data/menu';
import styles from './PerspectiveMenuStrip.module.css';

interface PerspectiveMenuStripProps {
  items: MenuItem[];
  categoryLabel: string;
}

export function PerspectiveMenuStrip({ items, categoryLabel }: PerspectiveMenuStripProps) {
  const [active, setActive] = useState(Math.min(2, Math.max(0, items.length - 1)));
  const stageRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(active);
  const targetRef = useRef(active);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mid = Math.min(2, Math.max(0, items.length - 1));
    setActive(mid);
    posRef.current = mid;
    targetRef.current = mid;
  }, [items]);

  useEffect(() => {
    targetRef.current = active;
  }, [active]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;

    const tick = () => {
      const reduced = media.matches;
      posRef.current += (targetRef.current - posRef.current) * (reduced ? 1 : 0.12);
      const stageWidth = stageRef.current?.clientWidth ?? 960;
      const spread = Math.min(205, stageWidth * 0.21);

      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const d = i - posRef.current;
        const absD = Math.min(Math.abs(d), 3);
        const rotateY = reduced
          ? 0
          : Math.max(-1, Math.min(1, -d)) * Math.min(absD, 1.4) * 30;
        const z = reduced ? 0 : -absD * 90;
        const scale = 1 - absD * 0.05;
        el.style.transform = `translate3d(${d * spread}px, 0, ${z}px) rotateY(${rotateY}deg) scale(${scale})`;
        el.style.opacity = String(Math.max(0.28, 1 - absD * 0.22));
        el.style.zIndex = String(100 - Math.round(absD * 10));
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [items.length]);

  const clamp = (n: number) => Math.max(0, Math.min(items.length - 1, n));

  return (
    <div
      className={styles.wrapper}
      aria-roledescription="carousel"
      aria-label={`3D-витрина: ${categoryLabel}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setActive((prev) => clamp(prev + 1));
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setActive((prev) => clamp(prev - 1));
        }
      }}
    >
      <div
        ref={stageRef}
        className={styles.stage}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
          }
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          setActive(clamp(Math.round(ratio * (items.length - 1))));
        }}
      >
        {items.map((item, i) => {
          const isCurrent = i === active;
          return (
            <div
              key={item.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className={styles.cardSlot}
            >
              <button
                type="button"
                className={`${styles.cardBtn} ${isCurrent ? styles.cardActive : ''}`}
                aria-current={isCurrent ? 'true' : undefined}
                aria-label={`${item.name} — ${item.price}`}
                onClick={() => setActive(i)}
              >
                <div className={styles.cardTop}>
                  <span className={`${styles.cardIndex} tabular-nums`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.weight && (
                    <span className={`${styles.cardWeight} tabular-nums`}>{item.weight}</span>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.name}</h3>
                  {item.note && <p className={styles.cardNote}>{item.note}</p>}
                </div>

                <div className={styles.cardFooter}>
                  <span
                    className={`${styles.cardPrice} tabular-nums ${
                      item.isPriceConfirmed ? styles.priceConfirmed : styles.pricePending
                    }`}
                  >
                    {item.price}
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navBtn}
          aria-label="Предыдущая позиция"
          onClick={() => setActive((prev) => clamp(prev - 1))}
          disabled={active === 0}
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <span className={`${styles.counter} tabular-nums`} aria-live="polite">
          {active + 1} / {items.length}
        </span>
        <button
          type="button"
          className={styles.navBtn}
          aria-label="Следующая позиция"
          onClick={() => setActive((prev) => clamp(prev + 1))}
          disabled={active === items.length - 1}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
