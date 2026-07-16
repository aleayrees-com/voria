'use client';

import {
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  CART_DRAWER_EXIT_DELAY_MS,
  shouldKeepCartDrawerMounted,
} from '../lib/cart-drawer-state';
import { createWhatsAppCheckoutUrl } from '../lib/checkout';
import { storeConfig } from '../lib/store-config';
import { useCart } from './cart-provider';
import { WhatsAppCheckoutButton } from './whatsapp-checkout-button';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function CartDrawer() {
  const { clearCart, closeCart, isOpen, items, removeItem, updateQuantity } =
    useCart();
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<Element | null>(null);
  const [hasFinishedClosing, setHasFinishedClosing] = useState(true);

  const checkoutUrl = useMemo(
    () =>
      createWhatsAppCheckoutUrl({
        items,
        phoneNumber: storeConfig.whatsappNumber,
        representativeName: storeConfig.representativeName,
      }),
    [items],
  );

  useEffect(() => {
    if (isOpen) {
      const openingFrame = window.requestAnimationFrame(() => {
        setHasFinishedClosing(false);
      });

      return () => window.cancelAnimationFrame(openingFrame);
    }

    const closingTimer = window.setTimeout(
      () => setHasFinishedClosing(true),
      CART_DRAWER_EXIT_DELAY_MS,
    );

    return () => window.clearTimeout(closingTimer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCart();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusableElements = [
        ...dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ];

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    previouslyFocusedElementRef.current = document.activeElement;
    closeButtonRef.current?.focus();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);

      if (
        previouslyFocusedElementRef.current instanceof HTMLElement &&
        document.contains(previouslyFocusedElementRef.current)
      ) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [closeCart, isOpen]);

  if (!shouldKeepCartDrawerMounted(isOpen, hasFinishedClosing)) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Fechar carrinho"
        className={`absolute inset-0 cursor-pointer bg-black/45 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          isOpen && !hasFinishedClosing
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={closeCart}
        type="button"
      />
      <aside
        ref={dialogRef}
        aria-label="Carrinho"
        aria-modal="true"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-[var(--color-porcelain)] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isOpen && !hasFinishedClosing ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-mist)] px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase text-[var(--color-copper)]">
              Sacola VORIA
            </p>
            <h2 className="font-display text-3xl text-[var(--color-ink)]">
              Carrinho
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            aria-label="Fechar carrinho"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-[var(--color-mist)] text-[var(--color-ink)] transition hover:border-[var(--color-copper)] hover:text-[var(--color-copper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
            onClick={closeCart}
            type="button"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-ivory)] text-[var(--color-copper)]">
                <ShoppingBag aria-hidden="true" size={28} />
              </div>
              <h3 className="font-display text-3xl text-[var(--color-ink)]">
                Sua sacola está vazia
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--color-muted)]">
                Descubra as peças da coleção e adicione suas favoritas para
                consultar disponibilidade pelo WhatsApp.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  className="rounded-md border border-[var(--color-mist)] bg-white p-4"
                  key={item.productSlug}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-[var(--color-ink)]">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs uppercase text-[var(--color-muted)]">
                        Peça demonstrativa
                      </p>
                    </div>
                    <button
                      aria-label={`Remover ${item.name}`}
                      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-[var(--color-muted)] transition hover:bg-[var(--color-ivory)] hover:text-[var(--color-copper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
                      onClick={() => removeItem(item.productSlug)}
                      type="button"
                    >
                      <Trash2 aria-hidden="true" size={16} />
                    </button>
                  </div>
                  <div className="mt-4 inline-flex items-center rounded-md border border-[var(--color-mist)]">
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
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-[var(--color-mist)] p-6">
          {items.length === 0 ? (
            <a
              className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--color-ink)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
              href={checkoutUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" size={18} />
              Consultar pelo WhatsApp
            </a>
          ) : (
            <WhatsAppCheckoutButton
              className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--color-ink)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-charcoal)] disabled:cursor-wait disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
              items={items}
            >
              Consultar pelo WhatsApp
            </WhatsAppCheckoutButton>
          )}
          {items.length > 0 ? (
            <button
              className="mt-3 w-full cursor-pointer text-sm font-semibold text-[var(--color-muted)] transition hover:text-[var(--color-copper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
              onClick={clearCart}
              type="button"
            >
              Limpar carrinho
            </button>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
