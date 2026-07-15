import type { CartItem, ProductStatus } from '../types/catalog';

export const CART_STORAGE_KEY = 'voria-jewelry-cart';

const MAX_QUANTITY = 99;
const VALID_STATUSES = new Set<ProductStatus>([
  'available',
  'coming-soon',
  'consult-whatsapp',
]);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readRequiredString = (
  record: Record<string, unknown>,
  key: string,
): string | null => {
  const value = record[key];

  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const readOptionalString = (
  record: Record<string, unknown>,
  key: string,
): string | undefined => {
  const value = record[key];

  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const readStatus = (value: unknown): ProductStatus | null =>
  typeof value === 'string' && VALID_STATUSES.has(value as ProductStatus)
    ? (value as ProductStatus)
    : null;

const readQuantity = (value: unknown): number => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 1;
  }

  return Math.min(MAX_QUANTITY, Math.max(1, Math.floor(value)));
};

const readUnitPrice = (value: unknown): number | undefined => {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    return undefined;
  }

  return Math.round(value);
};

export const sanitizeCartItems = (value: unknown): CartItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce<CartItem[]>((items, rawItem) => {
    if (!isRecord(rawItem)) {
      return items;
    }

    const productSlug = readRequiredString(rawItem, 'productSlug');
    const name = readRequiredString(rawItem, 'name');
    const categorySlug = readRequiredString(rawItem, 'categorySlug');
    const status = readStatus(rawItem.status);

    if (!productSlug || !name || !categorySlug || !status) {
      return items;
    }

    items.push({
      productSlug,
      name,
      categorySlug,
      quantity: readQuantity(rawItem.quantity),
      status,
      imageUrl: readOptionalString(rawItem, 'imageUrl'),
      unitPriceInCents: readUnitPrice(rawItem.unitPriceInCents),
    });

    return items;
  }, []);
};

export const mergeCartItems = (items: readonly CartItem[]): CartItem[] => {
  const mergedItems = new Map<string, CartItem>();

  for (const item of items) {
    const existing = mergedItems.get(item.productSlug);

    if (!existing) {
      mergedItems.set(item.productSlug, {
        ...item,
        quantity: readQuantity(item.quantity),
      });
      continue;
    }

    mergedItems.set(item.productSlug, {
      ...existing,
      quantity: Math.min(MAX_QUANTITY, existing.quantity + item.quantity),
    });
  }

  return [...mergedItems.values()];
};

export const getCartSubtotalInCents = (items: readonly CartItem[]): number =>
  items.reduce((total, item) => {
    if (typeof item.unitPriceInCents !== 'number') {
      return total;
    }

    return total + item.unitPriceInCents * item.quantity;
  }, 0);

export const formatPrice = (valueInCents: number): string =>
  new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(valueInCents / 100);
