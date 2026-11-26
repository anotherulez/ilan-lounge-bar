import { Reveal } from '../../components/Reveal/Reveal';
import { TiltedCard } from '../../components/TiltedCard/TiltedCard';
import { CHRONICLE_ITEMS } from '../../data/chronicle';
import { VENUE } from '../../data/venue';
import styles from './ChronicleSection.module.css';

export function ChronicleSection() {
  return (
    <section id="chronicle" className={styles.section}>
      <Reveal>
        <div className={styles.container}>
          <div className={styles.headerRow}>
            <h2 className={styles.heading}>Вечера в ILAN</h2>
            <a
              href={VENUE.links.vk}
              target="_blank"
              rel="noreferrer"
              className={styles.allBtn}
            >
              Сообщество ВК
            </a>
          </div>

          <div className={styles.grid}>
            {CHRONICLE_ITEMS.map((item) => (
              <TiltedCard key={item.id} maxTilt={6}>
                <article className={styles.card}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className={styles.photoLink}
                  >
                    <img src={item.image} alt={item.alt} className={styles.photo} />
                  </a>
                  <span className={styles.meta}>{item.meta}</span>
                  <h3 className={styles.title}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    >
                      {item.title}
                    </a>
                  </h3>
                  <p className={styles.desc}>{item.description}</p>
                </article>
              </TiltedCard>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
