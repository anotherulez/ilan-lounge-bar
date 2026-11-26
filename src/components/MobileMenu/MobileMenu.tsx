import { useEffect } from 'react';
import { X } from 'lucide-react';
import { NAV_LEFT, NAV_RIGHT, VENUE } from '../../data/venue';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const links = [...NAV_LEFT, ...NAV_RIGHT];

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
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      <nav className={styles.nav} aria-label="Мобильная навигация">
        {links.map((item) => (
          <a key={item.href} href={item.href} className={styles.link} onClick={onClose}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className={styles.meta}>
        <p>{VENUE.address}</p>
        <p>{VENUE.hours}</p>
        <a href={VENUE.phoneHref} className={styles.phone}>
          {VENUE.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
