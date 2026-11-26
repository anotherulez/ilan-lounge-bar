import { useEffect, useRef, useState } from 'react';

export function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const revealIfSeen = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 1.05) {
        setVisible(true);
        return true;
      }
      return false;
    };

    if (revealIfSeen()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || revealIfSeen()) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0, rootMargin: '120px 0px 120px 0px' }
    );

    observer.observe(el);
    window.addEventListener('scroll', revealIfSeen, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', revealIfSeen);
    };
  }, []);

  return { ref, visible };
}
