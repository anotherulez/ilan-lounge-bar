import { Menu } from 'lucide-react';
import { NAV_LEFT, NAV_RIGHT } from '../../data/venue';
import { BrandMark } from '../BrandMark/BrandMark';
import styles from './Header.module.css';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.frame}>
        <nav className={styles.navGroup} aria-label="Основная навигация слева">
          {NAV_LEFT.map((item) => (
            <a key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#top" className={styles.logoLink} aria-label="ILAN Lounge Bar — наверх">
          <BrandMark size="header" />
        </a>

        <nav className={`${styles.navGroup} ${styles.navRight}`} aria-label="Основная навигация справа">
          {NAV_RIGHT.map((item) => (
            <a key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.mobileToggle}
          onClick={onOpenMobileMenu}
          aria-label="Открыть меню навигации"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
