import { useEffect } from 'react';
import { X } from 'lucide-react';
import { NAV_LINKS, VENUE } from '../../data/venue';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenBookingModal: () => void;
}

export function MobileMenu({ open, onClose, onOpenBookingModal }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={styles.overlay}
      data-open={open}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label="Меню сайта"
      inert={!open || undefined}
    >
      <div className={styles.topRow}>
        <span className={styles.brand}>{VENUE.brand}</span>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Закрыть меню"
        >
          <X size={20} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>

      <nav className={styles.nav} aria-label="Мобильная навигация">
        {NAV_LINKS.map((item, idx) => (
          <a
            key={item.href}
            href={item.href}
            className={styles.link}
            style={{ transitionDelay: open ? `${80 + idx * 45}ms` : '0ms' }}
            onClick={onClose}
          >
            {item.label}
          </a>
        ))}
        <button
          type="button"
          className={styles.pillCta}
          style={{ transitionDelay: open ? `${80 + NAV_LINKS.length * 45}ms` : '0ms' }}
          onClick={() => {
            onClose();
            onOpenBookingModal();
          }}
        >
          Забронировать
        </button>
      </nav>

      <div className={styles.meta}>
        <span>{VENUE.addressFull}</span>
        <span>{VENUE.hoursFull}</span>
        <a href={VENUE.phoneHref} className={styles.phone}>
          {VENUE.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
