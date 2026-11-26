import { useState, type FormEvent } from 'react';
import { VENUE } from '../../data/venue';
import styles from './BookingSection.module.css';

interface FormState {
  zone: string;
  date: string;
  time: string;
  guests: string;
  name: string;
  phone: string;
}

export function BookingSection() {
  const [form, setForm] = useState<FormState>({
    zone: 'Основной зал',
    date: '',
    time: '20:00',
    guests: '4',
    name: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="booking" className={styles.band}>
      <div className={styles.container}>
        <div className={styles.infoCol}>
          <h2 className={styles.heading}>Бронь стола или VIP-зала</h2>
          <p className={styles.sub}>
            {VENUE.address} · {VENUE.hours} ({VENUE.hoursDisclaimer.toLowerCase()}).
          </p>
          <p className={styles.phoneLine}>
            Прямой телефон администратора:{' '}
            <a href={VENUE.phoneHref} className={styles.phoneLink}>
              {VENUE.phoneDisplay}
            </a>
          </p>
          <p className={styles.demoNotice}>
            Демо-режим: форма ниже показывает интерфейс заявки и не отправляет данные на сервер.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.rowTwo}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Зона</span>
              <select
                className={styles.input}
                value={form.zone}
                onChange={(e) => {
                  setSubmitted(false);
                  setForm({ ...form, zone: e.target.value });
                }}
              >
                <option value="Основной зал">Основной зал</option>
                <option value="VIP-зал с PS5">VIP-зал с PS5</option>
                <option value="У барной стойки">У барной стойки</option>
              </select>
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Гостей</span>
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
              <span className={styles.fieldLabel}>Дата</span>
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
              <span className={styles.fieldLabel}>Время</span>
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
              <span className={styles.fieldLabel}>Имя</span>
              <input
                type="text"
                placeholder="Как к вам обращаться"
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
              <span className={styles.fieldLabel}>Телефон</span>
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

          <button type="submit" className={styles.submitBtn}>
            Проверить демо-заявку
          </button>

          {submitted && (
            <p className={styles.confirmBox} role="status">
              Демо-предпросмотр: {form.zone}, {form.date || 'дата выбрана'} в {form.time}, гостей —{' '}
              {form.guests}. Для реальной брони позвоните{' '}
              <a href={VENUE.phoneHref} className={styles.confirmLink}>
                {VENUE.phoneDisplay}
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
