import { useEffect, useState, type FormEvent, type RefObject } from 'react';
import { Minus, Plus } from 'lucide-react';
import { VENUE } from '../../data/venue';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import styles from './BookingSection.module.css';

export type BookingZone = 'Основной зал' | 'Закрытый VIP';

interface BookingSectionProps {
  selectedZone: BookingZone;
  onZoneChange: (zone: BookingZone) => void;
  nameInputRef?: RefObject<HTMLInputElement | null>;
}

function formatGuestsLabel(count: number): string {
  if (count === 1) return '1 гость';
  if (count >= 2 && count <= 4) return `${count} гостя`;
  return `${count} гостей`;
}

export function BookingSection({
  selectedZone,
  onZoneChange,
  nameInputRef,
}: BookingSectionProps) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>();
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('20:00');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
  }, [selectedZone]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="booking"
      ref={ref}
      className={`${styles.section} reveal-section`}
      data-visible={visible}
    >
      <div className={styles.container}>
        <div className={styles.infoCol}>
          <h2 className={styles.heading}>Забронировать стол</h2>
          <div className={styles.metaList}>
            <a href={VENUE.phoneHref} className={styles.phoneLink}>
              {VENUE.phoneDisplay}
            </a>
            <p className={styles.metaItem}>{VENUE.addressFull}</p>
            <p className={styles.metaItem}>{VENUE.hours}</p>
          </div>
          <div className={styles.mapLinks}>
            <a
              href={VENUE.links.yandexMaps}
              target="_blank"
              rel="noreferrer"
              className={styles.mapLink}
            >
              Яндекс Карты
            </a>
            <a
              href={VENUE.links.twoGis}
              target="_blank"
              rel="noreferrer"
              className={styles.mapLink}
            >
              2ГИС
            </a>
          </div>
        </div>

        {submitted ? (
          <div className={styles.confirmPanel} role="status">
            <h3 className={styles.confirmTitle}>Заявка сформирована</h3>
            <dl className={styles.summaryList}>
              <div className={styles.summaryRow}>
                <dt>Зона</dt>
                <dd>{selectedZone}</dd>
              </div>
              <div className={styles.summaryRow}>
                <dt>Гости</dt>
                <dd className="tabular-nums">{formatGuestsLabel(guests)}</dd>
              </div>
              <div className={styles.summaryRow}>
                <dt>Дата и время</dt>
                <dd className="tabular-nums">
                  {date || 'Выбранная дата'} · {time}
                </dd>
              </div>
              {name && (
                <div className={styles.summaryRow}>
                  <dt>Контакт</dt>
                  <dd>
                    {name} · {phone}
                  </dd>
                </div>
              )}
            </dl>
            <p className={styles.confirmHint}>
              Демо-режим: форма работает локально. Для срочной брони позвоните{' '}
              <a href={VENUE.phoneHref} className={styles.confirmPhone}>
                {VENUE.phoneDisplay}
              </a>
              .
            </p>
            <button
              type="button"
              className={styles.editBtn}
              onClick={() => setSubmitted(false)}
            >
              Изменить заявку
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <span className={styles.label}>Зал / VIP</span>
              <div className={styles.segmented} role="radiogroup" aria-label="Выбор зоны">
                {(['Основной зал', 'Закрытый VIP'] as const).map((zoneOption) => {
                  const active = selectedZone === zoneOption;
                  return (
                    <button
                      key={zoneOption}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={`${styles.segmentBtn} ${active ? styles.segmentActive : ''}`}
                      onClick={() => onZoneChange(zoneOption)}
                    >
                      {zoneOption}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>Гости</span>
              <div className={styles.stepper}>
                <button
                  type="button"
                  className={styles.stepBtn}
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  disabled={guests <= 1}
                  aria-label="Уменьшить количество гостей"
                >
                  <Minus size={16} strokeWidth={1.6} aria-hidden="true" />
                </button>
                <span className={`${styles.stepValue} tabular-nums`} aria-live="polite">
                  {guests >= 15 ? '15+ гостей' : formatGuestsLabel(guests)}
                </span>
                <button
                  type="button"
                  className={styles.stepBtn}
                  onClick={() => setGuests((g) => Math.min(15, g + 1))}
                  disabled={guests >= 15}
                  aria-label="Увеличить количество гостей"
                >
                  <Plus size={16} strokeWidth={1.6} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className={styles.rowTwo}>
              <label className={styles.field}>
                <span className={styles.label}>Дата</span>
                <input
                  type="date"
                  className={styles.input}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Время</span>
                <input
                  type="time"
                  className={styles.input}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className={styles.rowTwo}>
              <label className={styles.field}>
                <span className={styles.label}>Имя</span>
                <input
                  ref={nameInputRef}
                  type="text"
                  placeholder="Ваше имя"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Телефон</span>
                <input
                  type="tel"
                  placeholder="+7 (900) 000-00-00"
                  className={styles.input}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.label}>Комментарий</span>
              <input
                type="text"
                placeholder="Пожелания к посадке"
                className={styles.input}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>

            <button type="submit" className={styles.submitPill}>
              Забронировать стол
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
