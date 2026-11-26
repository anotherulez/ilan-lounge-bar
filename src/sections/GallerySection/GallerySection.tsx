import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { SectionKicker } from '../../components/SectionKicker/SectionKicker';
import { GALLERY_PHOTOS } from '../../data/venue';
import styles from './GallerySection.module.css';

const EDITORIAL_FRAMES = [
  { photo: GALLERY_PHOTOS[0], role: 'spanWide', chapter: '01 — Свет' },
  { photo: GALLERY_PHOTOS[2], role: 'tall', chapter: '02 — Зал' },
  { photo: GALLERY_PHOTOS[7], role: 'standard', chapter: '03 — Подача' },
  { photo: GALLERY_PHOTOS[10], role: 'standard', chapter: '04 — Фасад' },
  { photo: GALLERY_PHOTOS[8], role: 'standard', chapter: '05 — Детали' },
];

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
        );
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  const activePhoto = lightboxIndex !== null ? GALLERY_PHOTOS[lightboxIndex] : null;

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div>
            <SectionKicker index="02" label="ПРОСТРАНСТВО" />
            <h2 className={styles.heading}>ВНУТРИ БАРА</h2>
          </div>
          <p className={styles.lead}>
            Живые кадры зала, освещения и вечерних деталей на 8 Марта, 31.
          </p>
        </div>

        <div className={styles.editorialGrid}>
          {EDITORIAL_FRAMES.map(({ photo, role, chapter }) => {
            const galleryIdx = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
            return (
              <figure key={photo.id} className={`${styles.frame} ${styles[role]}`}>
                <button
                  type="button"
                  className={styles.photoBtn}
                  onClick={() => setLightboxIndex(galleryIdx >= 0 ? galleryIdx : 0)}
                  aria-label={`Увеличить фото: ${photo.alt}`}
                >
                  <img src={photo.src} alt={photo.alt} className={styles.gridImg} />
                </button>
                <figcaption className={styles.caption}>{chapter}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {activePhoto && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.alt}
          onClick={() => setLightboxIndex(null)}
        >
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setLightboxIndex(null)}
              aria-label="Закрыть просмотр"
            >
              <X size={22} aria-hidden="true" />
            </button>

            <img src={activePhoto.src} alt={activePhoto.alt} className={styles.lightboxImg} />

            <div className={styles.lightboxBar}>
              <div className={styles.lightboxNav}>
                <button
                  type="button"
                  className={styles.navIconBtn}
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev === null ? 0 : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
                    )
                  }
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <span className={`${styles.navCounter} tabular-nums`}>
                  {(lightboxIndex ?? 0) + 1} / {GALLERY_PHOTOS.length}
                </span>
                <button
                  type="button"
                  className={styles.navIconBtn}
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev === null ? 0 : (prev + 1) % GALLERY_PHOTOS.length
                    )
                  }
                  aria-label="Следующее фото"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
