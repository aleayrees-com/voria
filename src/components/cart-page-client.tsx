'use client';

import { MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useMemo } from 'react';

import { createWhatsAppCheckoutUrl } from '../lib/checkout';
import { storeConfig } from '../lib/store-config';
import { useCart } from './cart-provider';
import { WhatsAppCheckoutButton } from './whatsapp-checkout-button';

export function CartPageClient() {
  const { items, removeItem, updateQuantity } = useCart();
  const checkoutUrl = useMemo(
    () =>
      createWhatsAppCheckoutUrl({
        items,
        phoneNumber: storeConfig.whatsappNumber,
        representativeName: storeConfig.representativeName,
      }),
    [items],
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase text-[var(--color-copper)]">
          Sacola
        </p>
        <h1 className="mt-2 font-display text-5xl text-[var(--color-ink)]">
          Carrinho
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="rounded-md border border-[var(--color-mist)] bg-white p-10 text-center shadow-[var(--shadow-soft)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-ivory)] text-[var(--color-copper)]">
            <ShoppingBag aria-hidden="true" size={28} />
          </div>
          <h2 className="mt-6 font-display text-4xl text-[var(--color-ink)]">
            Sua sacola está pronta para futuros produtos
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[var(--color-muted)]">
            O catálogo está em atualização. Você já pode consultar
            disponibilidade e atendimento personalizado pelo WhatsApp.
          </p>
          <a
            className="mt-7 inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--color-ink)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--color-charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
            href={checkoutUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <MessageCircle aria-hidden="true" size={18} />
            Falar no WhatsApp
          </a>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-4">
            {items.map((item) => (
              <article
                className="rounded-md border border-[var(--color-mist)] bg-white p-5 shadow-[var(--shadow-soft)]"
                key={item.productSlug}
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-[var(--color-ink)]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">
                      Disponibilidade e valores confirmados no WhatsApp.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center rounded-md border border-[var(--color-mist)]">
                      <button
                        aria-label={`Diminuir quantidade de ${item.name}`}
                        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center transition hover:bg-[var(--color-ivory)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
                        onClick={() =>
                          updateQuantity(item.productSlug, item.quantity - 1)
                        }
                        type="button"
                      >
                        <Minus aria-hidden="true" size={15} />
                      </button>
                      <span className="min-w-10 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        aria-label={`Aumentar quantidade de ${item.name}`}
                        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center transition hover:bg-[var(--color-ivory)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
                        onClick={() =>
                          updateQuantity(item.productSlug, item.quantity + 1)
                        }
                        type="button"
                      >
                        <Plus aria-hidden="true" size={15} />
                      </button>
                    </div>
                    <button
                      aria-label={`Remover ${item.name}`}
                      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[var(--color-muted)] transition hover:bg-[var(--color-ivory)] hover:text-[var(--color-copper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
                      onClick={() => removeItem(item.productSlug)}
                      type="button"
                    >
                      <Trash2 aria-hidden="true" size={17} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <aside className="h-fit rounded-md border border-[var(--color-mist)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <p className="text-sm font-semibold text-[var(--color-ink)]">
              Finalização por WhatsApp
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              O atendimento VORIA confirma disponibilidade, valores e forma de
              entrega antes da compra.
            </p>
            <WhatsAppCheckoutButton
              className="mt-6 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--color-ink)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--color-charcoal)] disabled:cursor-wait disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
              items={items}
            >
              Enviar pedido
            </WhatsAppCheckoutButton>
          </aside>
        </div>
      )}
    </div>
  );
}
