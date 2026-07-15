import { describe, expect, it } from 'vitest';

import { mergeCartItems, sanitizeCartItems } from './cart';

describe('cart helpers', () => {
  it('sanitizes persisted cart items and removes invalid rows', () => {
    const items = sanitizeCartItems([
      {
        productSlug: 'eau-copper',
        name: 'Eau Copper',
        categorySlug: 'brincos',
        quantity: 2,
        status: 'consult-whatsapp',
      },
      {
        productSlug: 'broken',
        name: '',
        categorySlug: 'brincos',
        quantity: 3,
        status: 'consult-whatsapp',
      },
      {
        productSlug: 'too-many',
        name: 'Too Many',
        categorySlug: 'kits',
        quantity: 120,
        status: 'coming-soon',
      },
    ]);

    expect(items).toEqual([
      {
        productSlug: 'eau-copper',
        name: 'Eau Copper',
        categorySlug: 'brincos',
        quantity: 2,
        status: 'consult-whatsapp',
      },
      {
        productSlug: 'too-many',
        name: 'Too Many',
        categorySlug: 'kits',
        quantity: 99,
        status: 'coming-soon',
      },
    ]);
  });

  it('merges repeated products without losing item metadata', () => {
    const items = mergeCartItems([
      {
        productSlug: 'royal-amber',
        name: 'Royal Amber',
        categorySlug: 'aneis',
        quantity: 1,
        status: 'consult-whatsapp',
      },
      {
        productSlug: 'royal-amber',
        name: 'Royal Amber',
        categorySlug: 'aneis',
        quantity: 3,
        status: 'consult-whatsapp',
      },
    ]);

    expect(items).toEqual([
      {
        productSlug: 'royal-amber',
        name: 'Royal Amber',
        categorySlug: 'aneis',
        quantity: 4,
        status: 'consult-whatsapp',
      },
    ]);
  });
});
