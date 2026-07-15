import { describe, expect, it, vi } from 'vitest';

import {
  readCartItemsFromStorage,
  writeCartItemsToStorage,
} from './cart-storage';

describe('cart storage helpers', () => {
  it('falls back to an empty cart when storage read throws', () => {
    const storage = {
      getItem: vi.fn(() => {
        throw new Error('blocked');
      }),
      setItem: vi.fn(),
    };

    expect(readCartItemsFromStorage(storage)).toEqual([]);
  });

  it('does not throw when storage write is unavailable', () => {
    const storage = {
      getItem: vi.fn(),
      setItem: vi.fn(() => {
        throw new Error('quota');
      }),
    };

    expect(() => writeCartItemsToStorage(storage, [])).not.toThrow();
  });
});
