import styles from './SectionKicker.module.css';

interface SectionKickerProps {
  index: string;
  label: string;
}

export function SectionKicker({ index, label }: SectionKickerProps) {
  return (
    <div className={styles.kickerRow}>
      <span className={`${styles.index} tabular-nums`}>{index}</span>
      <span className={styles.rule} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
