import { CHRONICLE_ITEMS } from '../../data/chronicle';
import { VENUE } from '../../data/venue';
import styles from './ChronicleSection.module.css';

export function ChronicleSection() {
  return (
    <section id="chronicle" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>Хроника и форматы</h2>
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
            <article key={item.id} className={styles.card}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={styles.photoLink}
              >
                <img src={item.image} alt={item.alt} className={styles.photo} />
              </a>
              <span className={styles.meta}>{item.meta}</span>
              <h3 className={styles.title}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
