import { useEffect } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCart } from '../../context/CartContext';
import styles from './OrderCart.module.css';

interface OrderCartProps {
  onApplyToBooking: () => void;
}

export function OrderCart({ onApplyToBooking }: OrderCartProps) {
  const {
    entries,
    drawerOpen,
    setDrawerOpen,
    updateQty,
    clearCart,
    totalCount,
    confirmedTotal,
  } = useCart();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen, setDrawerOpen]);

  return (
    <>
      <button
        type="button"
        className={styles.fab}
        onClick={() => setDrawerOpen(true)}
        aria-label={`Корзина к столу: позиций ${totalCount}`}
      >
        <ShoppingBag size={20} aria-hidden="true" />
        <span className={styles.fabLabel}>К столу</span>
        <span className={`${styles.fabCount} tabular-nums`}>{totalCount}</span>
      </button>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setDrawerOpen(false)}
          >
            <motion.aside
              className={styles.drawer}
              role="dialog"
              aria-modal="true"
              aria-label="Заказ к столу"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.header}>
                <div>
                  <h2 className={styles.title}>К столу</h2>
                  <p className={styles.subtitle}>Добавьте блюда к брони в зал или VIP</p>
                </div>
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Закрыть корзину"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {entries.length === 0 ? (
                <div className={styles.empty}>
                  <p>Пока пусто. Выберите блюда в разделе «Меню», чтобы собрать предзаказ к приходу.</p>
                </div>
              ) : (
                <>
                  <ul className={styles.list}>
                    {entries.map(({ item, qty }) => (
                      <li key={item.id} className={styles.row}>
                        <div className={styles.rowInfo}>
                          <span className={styles.rowName}>{item.name}</span>
                          <span className={`${styles.rowPrice} tabular-nums`}>{item.price}</span>
                        </div>
                        <div className={styles.qtyBox}>
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            onClick={() => updateQty(item.id, -1)}
                            aria-label={`Уменьшить ${item.name}`}
                          >
                            <Minus size={14} aria-hidden="true" />
                          </button>
                          <span className={`${styles.qtyVal} tabular-nums`}>{qty}</span>
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            onClick={() => updateQty(item.id, 1)}
                            aria-label={`Добавить ещё ${item.name}`}
                          >
                            <Plus size={14} aria-hidden="true" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.footer}>
                    {confirmedTotal > 0 && (
                      <div className={styles.totalRow}>
                        <span>Позиции с ценой</span>
                        <strong className="tabular-nums">{confirmedTotal} ₽</strong>
                      </div>
                    )}
                    <div className={styles.footerActions}>
                      <button
                        type="button"
                        className={styles.clearBtn}
                        onClick={clearCart}
                        aria-label="Очистить корзину"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className={styles.applyBtn}
                        onClick={() => {
                          setDrawerOpen(false);
                          onApplyToBooking();
                        }}
                      >
                        Перенести в бронь
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
