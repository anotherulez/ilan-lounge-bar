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
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Меню сайта">
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
        {NAV_LINKS.map((item) => (
          <a key={item.href} href={item.href} className={styles.link} onClick={onClose}>
            {item.label}
          </a>
        ))}
        <button
          type="button"
          className={styles.pillCta}
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
