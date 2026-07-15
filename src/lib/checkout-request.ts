import type { CartItem, Product } from '../types/catalog';

import { mergeCartItems } from './cart';

interface CheckoutRequestItem {
  readonly productSlug: string;
  readonly quantity: number;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readCheckoutRequestItems = (
  value: unknown,
): readonly CheckoutRequestItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce<CheckoutRequestItem[]>((items, item) => {
    if (!isRecord(item) || typeof item.productSlug !== 'string') {
      return items;
    }

    const productSlug = item.productSlug.trim();
    const quantity =
      typeof item.quantity === 'number' && Number.isFinite(item.quantity)
        ? Math.floor(item.quantity)
        : 1;

    if (productSlug.length === 0) {
      return items;
    }

    items.push({
      productSlug,
      quantity: Math.min(99, Math.max(1, quantity)),
    });

    return items;
  }, []);
};

export const buildCheckoutItemsFromRequest = (
  requestItems: unknown,
  catalogProducts: readonly Product[],
): CartItem[] => {
  const parsedItems = readCheckoutRequestItems(requestItems);

  if (parsedItems.length === 0) {
    return [];
  }

  const productsBySlug = new Map(
    catalogProducts.map((product) => [product.slug, product]),
  );

  return mergeCartItems(
    parsedItems.map((item) => {
      const product = productsBySlug.get(item.productSlug);

      if (!product) {
        throw new Error(`Product not found: ${item.productSlug}`);
      }

      return {
        productSlug: product.slug,
        name: product.name,
        categorySlug: product.categorySlug,
        quantity: item.quantity,
        status: product.status,
        imageUrl: product.imageUrl,
        unitPriceInCents: product.unitPriceInCents,
      };
    }),
  );
};
