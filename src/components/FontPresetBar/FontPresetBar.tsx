import styles from './FontPresetBar.module.css';

export type FontPreset = 'fig' | 'editorial';

interface FontPresetBarProps {
  preset: FontPreset;
  onChange: (preset: FontPreset) => void;
}

export function FontPresetBar({ preset, onChange }: FontPresetBarProps) {
  return (
    <aside className={styles.bar} aria-label="Сравнение шрифтовых вариантов">
      <span className={styles.label}>Шрифт:</span>
      <button
        type="button"
        className={`${styles.btn} ${preset === 'fig' ? styles.active : ''}`}
        onClick={() => onChange('fig')}
        aria-pressed={preset === 'fig'}
      >
        .fig (Roboto Condensed)
      </button>
      <button
        type="button"
        className={`${styles.btn} ${preset === 'editorial' ? styles.active : ''}`}
        onClick={() => onChange('editorial')}
        aria-pressed={preset === 'editorial'}
      >
        UI/UX Pro (Cormorant)
      </button>
    </aside>
  );
}
