import styles from './FeatureHighlightSection.module.css';

export function FeatureHighlightSection() {
  return (
    <section id="kitchen-story" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textCol}>
          <h2 className={styles.heading}>
            Кухня до 04:00
            <br />
            и VIP-зал с PS5
          </h2>
          <p className={styles.body}>
            В будни и выходные гости заказывают горячие блюда ночью: плов, борщ,
            пасту, салаты и закуски к столу. Для компаний выделен отдельный VIP-зал
            с PlayStation 5, настольными играми и тремя экранами для трансляций.
          </p>
          <a href="#booking" className={styles.btn}>
            Забронировать VIP
          </a>
        </div>

        <div className={styles.photoCol}>
          <img
            src="/images/lantern-wall.webp"
            alt="Тёплый свет мозаичного светильника в зале ILAN"
            className={styles.photo}
          />
        </div>
      </div>
    </section>
  );
}
