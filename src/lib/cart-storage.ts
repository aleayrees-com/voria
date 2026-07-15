import type { CartItem } from '../types/catalog';

import { CART_STORAGE_KEY, mergeCartItems, sanitizeCartItems } from './cart';

interface CartStorage {
  readonly getItem: (key: string) => string | null;
  readonly setItem: (key: string, value: string) => void;
}

export const readCartItemsFromStorage = (
  storage: CartStorage,
): readonly CartItem[] => {
  try {
    const storedItems = storage.getItem(CART_STORAGE_KEY);

    if (!storedItems) {
      return [];
    }

    return mergeCartItems(sanitizeCartItems(JSON.parse(storedItems)));
  } catch {
    return [];
  }
};

export const writeCartItemsToStorage = (
  storage: CartStorage,
  items: readonly CartItem[],
): void => {
  try {
    storage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Cart remains usable in memory when storage is blocked or full.
  }
};
