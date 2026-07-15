'use client';

import { MessageCircle } from 'lucide-react';
import { useState, type ReactNode } from 'react';

import type { CartItem } from '../types/catalog';

export function WhatsAppCheckoutButton({
  children,
  className,
  items,
}: {
  readonly children: ReactNode;
  readonly className: string;
  readonly items: readonly CartItem[];
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setErrorMessage(null);
    setIsPending(true);

    try {
      const response = await fetch('/api/checkout/whatsapp', {
        body: JSON.stringify({
          items: items.map((item) => ({
            productSlug: item.productSlug,
            quantity: item.quantity,
          })),
          sourceUrl: window.location.href,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Não foi possível preparar a mensagem.');
      }

      const payload = (await response.json()) as { readonly url?: unknown };

      if (typeof payload.url !== 'string') {
        throw new Error('Resposta inválida do checkout.');
      }

      window.location.href = payload.url;
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Não foi possível abrir o WhatsApp.',
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <button
        className={className}
        disabled={isPending}
        onClick={handleClick}
        type="button"
      >
        <MessageCircle aria-hidden="true" size={18} />
        {isPending ? 'Preparando...' : children}
      </button>
      {errorMessage ? (
        <p className="mt-2 text-sm text-[var(--color-copper)]">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
