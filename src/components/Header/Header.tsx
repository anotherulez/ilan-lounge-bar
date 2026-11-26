import { useEffect, useState } from 'react';
import { NAV_LINKS, VENUE } from '../../data/venue';
import styles from './Header.module.css';

interface HeaderProps {
  mobileMenuOpen: boolean;
  onOpenMobileMenu: () => void;
  onOpenBookingModal: () => void;
}

export function Header({
  mobileMenuOpen,
  onOpenMobileMenu,
  onOpenBookingModal,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.topbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#top" className={styles.wordmark} aria-label="ILAN — наверх">
          {VENUE.brand}
        </a>

        <nav className={styles.nav} aria-label="Основная навигация">
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </nav>

        <button type="button" className={styles.pillBtn} onClick={onOpenBookingModal}>
          Забронировать
        </button>

        <button
          type="button"
          className={`${styles.burger} ${mobileMenuOpen ? styles.burgerOpen : ''}`}
          onClick={onOpenMobileMenu}
          aria-label={mobileMenuOpen ? 'Закрыть меню навигации' : 'Открыть меню навигации'}
          aria-expanded={mobileMenuOpen}
        >
          <span className={styles.burgerLines} aria-hidden="true">
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </span>
        </button>
      </div>
    </header>
  );
}
