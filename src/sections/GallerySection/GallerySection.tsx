import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_PHOTOS } from '../../data/venue';
import { Reveal } from '../../components/Reveal/Reveal';
import { TiltedCard } from '../../components/TiltedCard/TiltedCard';
import styles from './GallerySection.module.css';

export function GallerySection() {
  const prefersReduced = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Split 11+ photos across 3 columns for isometric 3D marquee (adapted from 21st.dev ThreeDMarquee)
  const col1 = [GALLERY_PHOTOS[0], GALLERY_PHOTOS[3], GALLERY_PHOTOS[6], GALLERY_PHOTOS[9]];
  const col2 = [GALLERY_PHOTOS[1], GALLERY_PHOTOS[4], GALLERY_PHOTOS[7], GALLERY_PHOTOS[10]];
  const col3 = [GALLERY_PHOTOS[2], GALLERY_PHOTOS[5], GALLERY_PHOTOS[8], GALLERY_PHOTOS[0]];
  const columns = [col1, col2, col3];

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
      <Reveal>
        <div className={styles.container}>
          <div className={styles.headerRow}>
            <div>
              <h2 className={styles.heading}>Живые кадры бара</h2>
              <p className={styles.sub}>
                Нажмите на любой снимок, чтобы рассмотреть зал, свет и кухню поближе.
              </p>
            </div>
            <span className={`${styles.countTag} tabular-nums`}>
              {GALLERY_PHOTOS.length} фото из зала
            </span>
          </div>

          {/* 3D Isometric Photo Wall (adapted from 21st.dev ThreeDMarquee) */}
          <div className={styles.marqueeShell} aria-hidden="true">
            <div className={styles.marqueePlane}>
              {columns.map((col, colIdx) => (
                <motion.div
                  key={colIdx}
                  className={styles.marqueeCol}
                  animate={
                    prefersReduced
                      ? undefined
                      : { y: colIdx % 2 === 0 ? [-24, 24] : [24, -24] }
                  }
                  transition={
                    prefersReduced
                      ? undefined
                      : {
                          duration: colIdx === 1 ? 14 : 11,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'easeInOut',
                        }
                  }
                >
                  {col.map((photo, idx) => (
                    <div key={`${colIdx}-${idx}`} className={styles.marqueeTile}>
                      <img src={photo.src} alt="" className={styles.marqueeImg} />
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
            <div className={styles.marqueeVignette} />
          </div>

          {/* Interactive 3D Tilted Photo Grid (clickable to open Lightbox) */}
          <div className={styles.photoGrid}>
            {GALLERY_PHOTOS.slice(0, 8).map((photo, idx) => (
              <TiltedCard key={photo.id} maxTilt={7} className={styles.gridTilt}>
                <button
                  type="button"
                  className={styles.photoBtn}
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Открыть фото: ${photo.caption}`}
                >
                  <img src={photo.src} alt={photo.alt} className={styles.gridImg} />
                  <span className={styles.photoCaption}>{photo.caption}</span>
                </button>
              </TiltedCard>
            ))}
          </div>
        </div>
      </Reveal>

      {activePhoto && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.caption}
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
              <p className={styles.lightboxText}>{activePhoto.caption}</p>
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
