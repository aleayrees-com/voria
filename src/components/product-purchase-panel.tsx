'use client';

import { ShoppingBag } from 'lucide-react';

import type { Product } from '../types/catalog';
import { useCart } from './cart-provider';
import { WhatsAppCheckoutButton } from './whatsapp-checkout-button';

export function ProductPurchasePanel({
  product,
}: {
  readonly product: Product;
}) {
  const { addItem } = useCart();
  const checkoutItem = {
    productSlug: product.slug,
    name: product.name,
    categorySlug: product.categorySlug,
    quantity: 1,
    status: product.status,
    imageUrl: product.imageUrl,
    unitPriceInCents: product.unitPriceInCents,
  };

  return (
    <div className="grid gap-3">
      <button
        className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--color-ink)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--color-charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
        onClick={() => addItem(checkoutItem)}
        type="button"
      >
        <ShoppingBag aria-hidden="true" size={18} />
        Adicionar à sacola
      </button>
      <WhatsAppCheckoutButton
        className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-[var(--color-copper)] px-6 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-ivory)] disabled:cursor-wait disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
        items={[checkoutItem]}
      >
        Consultar esta peça
      </WhatsAppCheckoutButton>
    </div>
  );
}
