import { ArrowUpRight } from 'lucide-react';
import { VENUE } from '../../data/venue';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import styles from './MapSection.module.css';

const YANDEX_MAP_EMBED_URL =
  'https://yandex.ru/map-widget/v1/?ll=60.600300%2C56.832100&z=16&pt=60.600300%2C56.832100,pm2rdm';

export function MapSection() {
  const { ref, visible } = useRevealOnScroll<HTMLElement>();

  return (
    <section
      id="location"
      ref={ref}
      className={`${styles.section} reveal-section`}
      data-visible={visible}
    >
      <div className={styles.container}>
        <div className={styles.infoCol}>
          <h2 className={styles.heading}>Как найти</h2>

          <div className={styles.details}>
            <p className={styles.address}>{VENUE.addressFull}</p>
            <p className={styles.meta}>{VENUE.landmark}</p>
            <p className={styles.meta}>{VENUE.hoursFull}</p>
          </div>

          <div className={styles.actions}>
            <a
              href={VENUE.links.yandexMaps}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionPill}
            >
              <span>Открыть в Яндекс Картах</span>
              <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
            </a>
            <a
              href={VENUE.links.twoGis}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionPill}
            >
              <span>Открыть в 2ГИС</span>
              <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className={styles.mapFrame}>
          <iframe
            src={YANDEX_MAP_EMBED_URL}
            title="Карта проезда ILAN Lounge Bar — Екатеринбург, ул. 8 Марта, 31"
            className={styles.mapIframe}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
