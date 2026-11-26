import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import type { MenuItem } from '../../data/menu';
import { useCart } from '../../context/CartContext';
import styles from './PerspectiveMenuStrip.module.css';

interface PerspectiveMenuStripProps {
  items: MenuItem[];
  categoryLabel: string;
}

export function PerspectiveMenuStrip({ items, categoryLabel }: PerspectiveMenuStripProps) {
  const [active, setActive] = useState(Math.min(2, Math.max(0, items.length - 1)));
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const { addItem } = useCart();

  const stageRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(active);
  const targetRef = useRef(active);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dragStartXRef = useRef<number | null>(null);

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
      const diff = targetRef.current - posRef.current;
      if (reduced || Math.abs(diff) < 0.004) {
        posRef.current = targetRef.current;
      } else {
        posRef.current += diff * 0.24;
      }
      const stageWidth = stageRef.current?.clientWidth ?? 960;
      const spread = Math.min(265, stageWidth * 0.24);

      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const d = i - posRef.current;
        const absD = Math.min(Math.abs(d), 3);
        const rotateY = reduced
          ? 0
          : Math.max(-1, Math.min(1, -d)) * Math.min(absD, 1.35) * 28;
        const z = reduced ? 0 : absD < 0.2 ? 32 : -absD * 95;
        const scale = 1 - absD * 0.06;
        el.style.transform = `translate3d(${d * spread}px, 0, ${z}px) rotateY(${rotateY}deg) scale(${scale})`;
        el.style.opacity = String(Math.max(0.32, 1 - absD * 0.22));
        el.style.zIndex = String(100 - Math.round(absD * 10));
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [items.length]);

  const clamp = (n: number) => Math.max(0, Math.min(items.length - 1, n));

  function handleAdd(item: MenuItem, idx: number, e: React.MouseEvent) {
    e.stopPropagation();
    setActive(idx);
    addItem(item);
    setJustAddedId(item.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === item.id ? null : curr));
    }, 900);
  }

  return (
    <div
      className={styles.wrapper}
      aria-roledescription="carousel"
      aria-label={`3D-меню: ${categoryLabel}`}
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
        onPointerDown={(e) => {
          dragStartXRef.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (dragStartXRef.current === null) return;
          const dx = e.clientX - dragStartXRef.current;
          dragStartXRef.current = null;
          if (Math.abs(dx) > 42) {
            setActive((prev) => clamp(prev + (dx < 0 ? 1 : -1)));
          }
        }}
        onPointerCancel={() => {
          dragStartXRef.current = null;
        }}
      >
        {items.map((item, i) => {
          const isCurrent = i === active;
          const isAdded = justAddedId === item.id;
          return (
            <div
              key={item.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className={styles.cardSlot}
            >
              <div
                className={`${styles.cardShell} ${isCurrent ? styles.cardActive : ''}`}
                onClick={() => setActive(i)}
              >
                <div className={styles.mediaBox}>
                  <img src={item.image} alt={item.alt} className={styles.mediaImg} />
                  {item.weight && (
                    <span className={`${styles.weightBadge} tabular-nums`}>{item.weight}</span>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.name}</h3>
                  <p className={styles.cardNote}>{item.note}</p>

                  <div className={styles.cardFooter}>
                    <span
                      className={`${styles.cardPrice} tabular-nums ${
                        item.isPriceConfirmed ? styles.priceConfirmed : styles.pricePending
                      }`}
                    >
                      {item.price}
                    </span>
                    <button
                      type="button"
                      className={`${styles.addBtn} ${isAdded ? styles.addBtnAdded : ''}`}
                      onClick={(e) => handleAdd(item, i, e)}
                      aria-label={`Добавить ${item.name} в корзину`}
                    >
                      <Plus size={15} aria-hidden="true" />
                      <span>{isAdded ? 'Добавлено' : 'К столу'}</span>
                    </button>
                  </div>
                </div>
              </div>
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
