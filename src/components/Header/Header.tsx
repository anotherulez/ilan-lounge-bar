import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { NAV_LINKS, VENUE } from '../../data/venue';
import styles from './Header.module.css';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
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

        <a href="#booking" className={styles.pillBtn}>
          Забронировать
        </a>

        <button
          type="button"
          className={styles.burger}
          onClick={onOpenMobileMenu}
          aria-label="Открыть меню навигации"
        >
          <Menu size={20} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
