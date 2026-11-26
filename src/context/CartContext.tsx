import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { MenuItem } from '../data/menu';

export interface CartEntry {
  item: MenuItem;
  qty: number;
}

interface CartContextValue {
  entries: CartEntry[];
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  addItem: (item: MenuItem) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  confirmedTotal: number;
  bookingSummary: string;
}

const CartContext = createContext<CartContextValue | null>(null);

function parsePriceNumber(price: string): number | null {
  const digits = price.replace(/\D+/g, '');
  return digits ? Number(digits) : null;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<CartEntry[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function addItem(item: MenuItem) {
    setEntries((prev) => {
      const idx = prev.findIndex((e) => e.item.id === item.id);
      if (idx >= 0) {
        return prev.map((e, i) => (i === idx ? { ...e, qty: e.qty + 1 } : e));
      }
      return [...prev, { item, qty: 1 }];
    });
  }

  function updateQty(id: string, delta: number) {
    setEntries((prev) =>
      prev
        .map((e) => (e.item.id === id ? { ...e, qty: e.qty + delta } : e))
        .filter((e) => e.qty > 0)
    );
  }

  function clearCart() {
    setEntries([]);
  }

  const totalCount = useMemo(
    () => entries.reduce((sum, e) => sum + e.qty, 0),
    [entries]
  );

  const confirmedTotal = useMemo(
    () =>
      entries.reduce((sum, e) => {
        if (!e.item.isPriceConfirmed) return sum;
        const val = parsePriceNumber(e.item.price);
        return sum + (val ? val * e.qty : 0);
      }, 0),
    [entries]
  );

  const bookingSummary = useMemo(
    () => entries.map((e) => `${e.item.name} × ${e.qty}`).join(', '),
    [entries]
  );

  return (
    <CartContext.Provider
      value={{
        entries,
        drawerOpen,
        setDrawerOpen,
        addItem,
        updateQty,
        clearCart,
        totalCount,
        confirmedTotal,
        bookingSummary,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
