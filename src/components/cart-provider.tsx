'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { mergeCartItems } from '../lib/cart';
import {
  readCartItemsFromStorage,
  writeCartItemsToStorage,
} from '../lib/cart-storage';
import type { CartItem } from '../types/catalog';

interface CartContextValue {
  readonly items: readonly CartItem[];
  readonly itemCount: number;
  readonly isOpen: boolean;
  readonly addItem: (item: CartItem) => void;
  readonly updateQuantity: (productSlug: string, quantity: number) => void;
  readonly removeItem: (productSlug: string) => void;
  readonly clearCart: () => void;
  readonly openCart: () => void;
  readonly closeCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const normalizeQuantity = (quantity: number): number =>
  Math.min(99, Math.max(0, Math.floor(quantity)));

export function CartProvider({ children }: { readonly children: ReactNode }) {
  const [items, setItems] = useState<readonly CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const hydrateCart = window.setTimeout(() => {
      setItems(readCartItemsFromStorage(window.localStorage));
      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(hydrateCart);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    writeCartItemsToStorage(window.localStorage, items);
  }, [isHydrated, items]);

  const addItem = useCallback((item: CartItem) => {
    setItems((currentItems) => mergeCartItems([...currentItems, item]));
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback(
    (productSlug: string, quantity: number) => {
      const nextQuantity = normalizeQuantity(quantity);

      setItems((currentItems) =>
        currentItems
          .map((item) =>
            item.productSlug === productSlug
              ? { ...item, quantity: nextQuantity }
              : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    [],
  );

  const removeItem = useCallback((productSlug: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productSlug !== productSlug),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
      isOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      addItem,
      clearCart,
      closeCart,
      isOpen,
      items,
      openCart,
      removeItem,
      updateQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
};
