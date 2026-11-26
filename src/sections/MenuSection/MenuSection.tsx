import { useState } from 'react';
import { Plus } from 'lucide-react';
import { PerspectiveMenuStrip } from '../../components/PerspectiveMenuStrip/PerspectiveMenuStrip';
import { SectionKicker } from '../../components/SectionKicker/SectionKicker';
import { TiltedCard } from '../../components/TiltedCard/TiltedCard';
import { useCart } from '../../context/CartContext';
import { MENU_CATEGORIES, type MenuCategoryId } from '../../data/menu';
import { VENUE } from '../../data/venue';
import styles from './MenuSection.module.css';

export function MenuSection() {
  const [activeTab, setActiveTab] = useState<MenuCategoryId>('hot');
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const { addItem } = useCart();
  const current = MENU_CATEGORIES.find((cat) => cat.id === activeTab) ?? MENU_CATEGORIES[0];

  return (
    <section id="menu" className={styles.section}>
      <div className={styles.container}>
        <SectionKicker index="04" label="КУХНЯ И БАР" ghostWord="КУХНЯ" />
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>
            МЕНЮ <span className="serif-italic">к столу</span>
          </h2>
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

          <div className={styles.viewSwitch} role="group" aria-label="Вид меню">
            <button
              type="button"
              className={`${styles.viewBtn} ${viewMode === '3d' ? styles.viewBtnActive : ''}`}
              onClick={() => setViewMode('3d')}
              aria-pressed={viewMode === '3d'}
            >
              3D-сцена
            </button>
            <button
              type="button"
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
              onClick={() => setViewMode('grid')}
              aria-pressed={viewMode === 'grid'}
            >
              Сетка
            </button>
          </div>
        </div>

        <p className={styles.categoryNote}>{current.subtitle}</p>

        <div role="tabpanel" aria-label={current.label}>
          {viewMode === '3d' ? (
            <PerspectiveMenuStrip items={current.items} categoryLabel={current.label} />
          ) : (
            <div className={styles.grid}>
              {current.items.map((item) => (
                <TiltedCard key={item.id} maxTilt={7}>
                  <article className={styles.card}>
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
                </TiltedCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
