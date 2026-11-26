import { useState } from 'react';
import { SeamlessImageMarquee } from '../../components/SeamlessImageMarquee/SeamlessImageMarquee';
import { MARQUEE_GALLERY } from '../../data/gallery';
import { MENU_CATEGORIES, type MenuCategoryId } from '../../data/menu';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import styles from './MenuSection.module.css';

export function MenuSection() {
  const [activeTab, setActiveTab] = useState<MenuCategoryId>('hot');
  const { ref, visible } = useRevealOnScroll<HTMLElement>();
  const current = MENU_CATEGORIES.find((cat) => cat.id === activeTab) ?? MENU_CATEGORIES[0];

  return (
    <section
      id="menu"
      ref={ref}
      className={`${styles.section} reveal-section`}
      data-visible={visible}
    >
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>Меню</h2>
          <div className={styles.tabs} role="tablist" aria-label="Категории меню">
            {MENU_CATEGORIES.map((category) => {
              const isSelected = category.id === activeTab;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`${styles.tab} ${isSelected ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(category.id)}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.marqueeWrap}>
          <SeamlessImageMarquee
            items={MARQUEE_GALLERY.menu}
            label="Фотографии подачи и меню ILAN"
            durationSec={44}
          />
        </div>

        <div role="tabpanel" aria-label={current.label} className={styles.grid}>
          {current.items.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.topLine}>
                <span className={styles.name}>{item.name}</span>
                <span className={`${styles.price} tabular-nums`}>{item.price}</span>
              </div>
              <p className={styles.desc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
