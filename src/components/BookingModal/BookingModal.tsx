import { useEffect } from 'react';
import { ArrowRight, Globe, Phone, Send, X } from 'lucide-react';
import { VENUE } from '../../data/venue';
import styles from './BookingModal.module.css';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  onChooseOnSite: () => void;
}

export function BookingModal({ open, onClose, onChooseOnSite }: BookingModalProps) {
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

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={onClose}
    >
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Закрыть окно бронирования"
        >
          <X size={18} strokeWidth={1.6} aria-hidden="true" />
        </button>

        <h2 id="booking-modal-title" className={styles.title}>
          Где вам удобно?
        </h2>
        <p className={styles.subtitle}>Выберите способ бронирования стола</p>

        <div className={styles.options}>
          <a
            href={VENUE.links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.optionRow}
          >
            <span className={styles.iconBox} aria-hidden="true">
              <Send size={17} strokeWidth={1.6} />
            </span>
            <span className={styles.optionText}>
              <span className={styles.optionTitle}>Telegram</span>
              <span className={styles.optionSub}>Написать в мессенджер</span>
            </span>
            <ArrowRight size={17} strokeWidth={1.6} className={styles.arrow} aria-hidden="true" />
          </a>

          <button
            type="button"
            className={styles.optionRow}
            onClick={onChooseOnSite}
          >
            <span className={styles.iconBox} aria-hidden="true">
              <Globe size={17} strokeWidth={1.6} />
            </span>
            <span className={styles.optionText}>
              <span className={styles.optionTitle}>На сайте</span>
              <span className={styles.optionSub}>Заполнить короткую форму</span>
            </span>
            <ArrowRight size={17} strokeWidth={1.6} className={styles.arrow} aria-hidden="true" />
          </button>

          <a href={VENUE.phoneHref} className={styles.optionRow}>
            <span className={styles.iconBox} aria-hidden="true">
              <Phone size={17} strokeWidth={1.6} />
            </span>
            <span className={styles.optionText}>
              <span className={styles.optionTitle}>Позвонить</span>
              <span className={`${styles.optionSub} tabular-nums`}>{VENUE.phoneDisplay}</span>
            </span>
            <ArrowRight size={17} strokeWidth={1.6} className={styles.arrow} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
