import { useState } from 'react';
import { Plus } from 'lucide-react';
import { SectionKicker } from '../../components/SectionKicker/SectionKicker';
import { useCart } from '../../context/CartContext';
import { MENU_CATEGORIES, type MenuCategoryId } from '../../data/menu';
import { VENUE } from '../../data/venue';
import styles from './MenuSection.module.css';

export function MenuSection() {
  const [activeTab, setActiveTab] = useState<MenuCategoryId>('hot');
  const { addItem } = useCart();
  const current = MENU_CATEGORIES.find((cat) => cat.id === activeTab) ?? MENU_CATEGORIES[0];

  return (
    <section id="menu" className={styles.section}>
      <div className={styles.container}>
        <SectionKicker index="04" label="КУХНЯ И БАР" />
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>МЕНЮ</h2>
          <p className={styles.subtitle}>
            Готовим до последнего гостя.{' '}
            <a
              href={VENUE.links.yandexMenu}
              target="_blank"
              rel="noreferrer"
              className={styles.sourceLink}
            >
              Полный список на Яндекс Картах
            </a>
          </p>
        </div>

        <div className={styles.controlsBar}>
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

        <p className={styles.categoryNote}>{current.subtitle}</p>

        <div role="tabpanel" aria-label={current.label} className={styles.editorialGrid}>
          {current.items.map((item, idx) => {
            const isLead = idx === 0;
            return (
              <article
                key={item.id}
                className={`${styles.card} ${isLead ? styles.leadCard : ''}`}
              >
                <div className={styles.plate}>
                  <img src={item.image} alt={item.alt} className={styles.plateImg} />
                  {item.weight && (
                    <span className={`${styles.plateWeight} tabular-nums`}>{item.weight}</span>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.plateNote}>{item.note}</p>
                  <div className={styles.metaRow}>
                    <span
                      className={`${styles.itemPrice} tabular-nums ${
                        item.isPriceConfirmed ? styles.priceConfirmed : styles.pricePending
                      }`}
                    >
                      {item.price}
                    </span>
                    <button
                      type="button"
                      className={styles.gridAddBtn}
                      onClick={() => addItem(item)}
                      aria-label={`Добавить ${item.name} в корзину`}
                    >
                      <Plus size={14} aria-hidden="true" />
                      <span>К столу</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
