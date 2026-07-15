import { describe, expect, it } from 'vitest';

import { buildCheckoutItemsFromRequest } from './checkout-request';

describe('checkout request helpers', () => {
  it('allows an empty consultation request while the catalog is empty', () => {
    expect(buildCheckoutItemsFromRequest([], [])).toEqual([]);
  });

  it('rebuilds cart items from catalog products instead of trusting clients', () => {
    const items = buildCheckoutItemsFromRequest(
      [
        {
          productSlug: 'royal-amber',
          quantity: 2,
          name: 'Fake Client Name',
          unitPriceInCents: 1,
        },
      ],
      [
        {
          slug: 'royal-amber',
          name: 'Royal Amber',
          categorySlug: 'aneis',
          shortDescription: 'Prepared product.',
          description: 'Prepared product.',
          status: 'consult-whatsapp',
          notes: [],
          unitPriceInCents: 12990,
        },
      ],
    );

    expect(items).toEqual([
      {
        productSlug: 'royal-amber',
        name: 'Royal Amber',
        categorySlug: 'aneis',
        quantity: 2,
        status: 'consult-whatsapp',
        unitPriceInCents: 12990,
      },
    ]);
  });

  it('rejects unknown product slugs when products are requested', () => {
    expect(() =>
      buildCheckoutItemsFromRequest(
        [{ productSlug: 'unknown', quantity: 1 }],
        [],
      ),
    ).toThrow('Product not found: unknown');
  });
});
