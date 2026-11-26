import styles from './BrandMark.module.css';

interface BrandMarkProps {
  size?: 'header' | 'footer';
}

export function BrandMark({ size = 'header' }: BrandMarkProps) {
  return (
    <span className={`${styles.mark} ${size === 'footer' ? styles.footer : styles.header}`}>
      <span className={styles.word}>ILAN</span>
      <span className={styles.sub}>LOUNGE BAR</span>
    </span>
  );
}
