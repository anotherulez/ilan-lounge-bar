import { useState, type FormEvent } from 'react';
import { VENUE } from '../../data/venue';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import styles from './BookingSection.module.css';

interface FormState {
  zone: string;
  guests: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  comment: string;
}

export function BookingSection() {
  const { ref, visible } = useRevealOnScroll<HTMLElement>();
  const [form, setForm] = useState<FormState>({
    zone: 'Основной зал',
    guests: '2',
    date: '',
    time: '20:00',
    name: '',
    phone: '',
    comment: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.rowTwo}>
            <label className={styles.field}>
              <span className={styles.label}>Зал / VIP</span>
              <select
                className={styles.input}
                value={form.zone}
                onChange={(e) => {
                  setSubmitted(false);
                  setForm({ ...form, zone: e.target.value });
                }}
              >
                <option value="Основной зал">Основной зал</option>
                <option value="VIP-комната">VIP-комната</option>
              </select>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Гости</span>
              <input
                type="number"
                min={1}
                max={20}
                className={styles.input}
                value={form.guests}
                onChange={(e) => {
                  setSubmitted(false);
                  setForm({ ...form, guests: e.target.value });
                }}
                required
              />
            </label>
          </div>

          <div className={styles.rowTwo}>
            <label className={styles.field}>
              <span className={styles.label}>Дата</span>
              <input
                type="date"
                className={styles.input}
                value={form.date}
                onChange={(e) => {
                  setSubmitted(false);
                  setForm({ ...form, date: e.target.value });
                }}
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Время</span>
              <input
                type="time"
                className={styles.input}
                value={form.time}
                onChange={(e) => {
                  setSubmitted(false);
                  setForm({ ...form, time: e.target.value });
                }}
                required
              />
            </label>
          </div>

          <div className={styles.rowTwo}>
            <label className={styles.field}>
              <span className={styles.label}>Имя</span>
              <input
                type="text"
                placeholder="Ваше имя"
                className={styles.input}
                value={form.name}
                onChange={(e) => {
                  setSubmitted(false);
                  setForm({ ...form, name: e.target.value });
                }}
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Телефон</span>
              <input
                type="tel"
                placeholder="+7 (900) 000-00-00"
                className={styles.input}
                value={form.phone}
                onChange={(e) => {
                  setSubmitted(false);
                  setForm({ ...form, phone: e.target.value });
                }}
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
              value={form.comment}
              onChange={(e) => {
                setSubmitted(false);
                setForm({ ...form, comment: e.target.value });
              }}
            />
          </label>

          <button type="submit" className={styles.submitPill}>
            Отправить заявку
          </button>

          {submitted && (
            <p className={styles.statusMsg} role="status">
              Заявка сформирована: {form.zone}, {form.date || 'выбранная дата'} в {form.time}, гостей:{' '}
              {form.guests}. Для срочной брони позвоните {VENUE.phoneDisplay}.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
