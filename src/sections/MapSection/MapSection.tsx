import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowUpRight } from 'lucide-react';
import { VENUE } from '../../data/venue';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import styles from './MapSection.module.css';

const ILAN_COORDS: [number, number] = [56.8321, 60.6003];

export function MapSection() {
  const { ref, visible } = useRevealOnScroll<HTMLElement>();
  const mapHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mapHostRef.current;
    if (!host) return;

    const map = L.map(host, {
      center: ILAN_COORDS,
      zoom: 16,
      scrollWheelZoom: false,
      attributionControl: true,
    });
    map.attributionControl.setPrefix(false);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    const markerIcon = L.divIcon({
      className: styles.pinWrap,
      html: `<span class="${styles.pinDot}"></span><span class="${styles.pinTag}">ILAN · 8 Марта, 31</span>`,
      iconSize: [140, 32],
      iconAnchor: [12, 16],
    });

    L.marker(ILAN_COORDS, { icon: markerIcon }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

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
          <div
            ref={mapHostRef}
            className={styles.mapCanvas}
            aria-label="Интерактивная карта: Екатеринбург, ул. 8 Марта, 31"
          />
        </div>
      </div>
    </section>
  );
}
