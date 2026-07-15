import { describe, expect, it } from 'vitest';

import {
  categories,
  getCategoryBySlug,
  getFeaturedProducts,
  getProductBySlug,
  products,
} from './catalog';

describe('VORIA demonstrative catalog', () => {
  it('exposes the jewelry categories and editable sample products', () => {
    expect(categories.map((category) => category.slug)).toEqual([
      'brincos',
      'aneis',
      'colares',
      'pulseiras',
    ]);
    expect(products).toHaveLength(6);
    expect(products.every((product) => product.status === 'available')).toBe(
      true,
    );
  });

  it('finds featured pieces and product details by slug', () => {
    expect(getCategoryBySlug('aneis')?.name).toBe('Anéis');
    expect(getProductBySlug('brinco-nascente')?.name).toBe('Brinco Nascente');
    expect(getFeaturedProducts().map((product) => product.slug)).toEqual([
      'brinco-nascente',
      'anel-eclipse',
      'colar-alma',
    ]);
    expect(getProductBySlug('peca-ausente')).toBeUndefined();
  });
});
