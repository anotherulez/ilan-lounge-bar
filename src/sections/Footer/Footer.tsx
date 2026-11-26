import { ExternalLink, MapPin, Phone } from 'lucide-react';
import { BrandMark } from '../../components/BrandMark/BrandMark';
import { VENUE } from '../../data/venue';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topGrid}>
          <div className={styles.brandCol}>
            <BrandMark size="footer" />
            <p className={styles.brandAddress}>
              <MapPin size={16} aria-hidden="true" />
              <span>
                {VENUE.city}, {VENUE.address}
              </span>
            </p>
            <p className={styles.brandAddress}>
              <Phone size={16} aria-hidden="true" />
              <a href={VENUE.phoneHref}>{VENUE.phoneDisplay}</a>
            </p>
            <div className={styles.socialRow}>
              <a
                href={VENUE.links.vk}
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                ВКонтакте <ExternalLink size={14} aria-hidden="true" />
              </a>
              <a
                href={VENUE.links.yandexMaps}
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                Яндекс Карты <ExternalLink size={14} aria-hidden="true" />
              </a>
              <a
                href={VENUE.links.twoGis}
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                2ГИС <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Разделы</h3>
            <ul className={styles.list}>
              <li>
                <a href="#top">Начало</a>
              </li>
              <li>
                <a href="#about">О баре</a>
              </li>
              <li>
                <a href="#menu">Меню и карта</a>
              </li>
              <li>
                <a href="#reviews">Отзывы</a>
              </li>
              <li>
                <a href="#booking">Бронирование</a>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>О заведении</h3>
            <ul className={styles.list}>
              <li>{VENUE.addressNote}</li>
              <li>{VENUE.landmarks}</li>
              <li>VIP-зал с PlayStation 5</li>
              <li>Instagram: {VENUE.links.instagramHandle}</li>
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Режим и оплата</h3>
            <ul className={styles.list}>
              <li>{VENUE.hours}</li>
              <li>{VENUE.hoursDisclaimer}</li>
              <li>Карта, наличные, QR-код</li>
              <li>Средний чек: 500–1000 ₽</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span>ILAN Lounge Bar · Демонстрационная веб-витрина</span>
          <span>18+ · Только для совершеннолетних гостей · Без онлайн-продажи</span>
        </div>
      </div>
    </footer>
  );
}
