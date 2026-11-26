import { useState } from 'react';
import { PerspectiveMenuStrip } from '../../components/PerspectiveMenuStrip/PerspectiveMenuStrip';
import { MENU_CATEGORIES, type MenuCategoryId } from '../../data/menu';
import { VENUE } from '../../data/venue';
import styles from './MenuSection.module.css';

export function MenuSection() {
  const [activeTab, setActiveTab] = useState<MenuCategoryId>('hot');
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const current = MENU_CATEGORIES.find((cat) => cat.id === activeTab) ?? MENU_CATEGORIES[0];

  return (
    <section id="menu" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>Меню и карта</h2>
          <p className={styles.subtitle}>
            Средний чек по данным площадок: <span className="tabular-nums">500–1000 ₽</span>.{' '}
            <a
              href={VENUE.links.yandexMenu}
              target="_blank"
              rel="noreferrer"
              className={styles.sourceLink}
            >
              Меню на Яндекс Картах
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

          <div className={styles.viewSwitch} role="group" aria-label="Вид отображения меню">
            <button
              type="button"
              className={`${styles.viewBtn} ${viewMode === '3d' ? styles.viewBtnActive : ''}`}
              onClick={() => setViewMode('3d')}
              aria-pressed={viewMode === '3d'}
            >
              3D-витрина
            </button>
            <button
              type="button"
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
              onClick={() => setViewMode('grid')}
              aria-pressed={viewMode === 'grid'}
            >
              Сетка 5 в ряд
            </button>
          </div>
        </div>

        <p className={styles.categoryNote}>{current.subtitle}</p>

        <div role="tabpanel" aria-label={current.label}>
          {viewMode === '3d' ? (
            <PerspectiveMenuStrip items={current.items} categoryLabel={current.label} />
          ) : (
            <div className={styles.grid}>
              {current.items.map((item, idx) => (
                <article key={item.id} className={styles.card}>
                  <div className={styles.plate}>
                    <span className={`${styles.plateIndex} tabular-nums`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {item.weight && (
                      <span className={`${styles.plateWeight} tabular-nums`}>{item.weight}</span>
                    )}
                    {item.note && <p className={styles.plateNote}>{item.note}</p>}
                  </div>

                  <div className={styles.metaRow}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <span
                      className={`${styles.itemPrice} tabular-nums ${
                        item.isPriceConfirmed ? styles.priceConfirmed : styles.pricePending
                      }`}
                    >
                      {item.price}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
