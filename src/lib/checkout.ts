import type { CartItem } from '../types/catalog';

import { formatPrice, getCartSubtotalInCents, mergeCartItems } from './cart';

interface CheckoutMessageInput {
  readonly items: readonly CartItem[];
  readonly representativeName: string;
  readonly sourceUrl?: string;
}

interface CheckoutUrlInput extends CheckoutMessageInput {
  readonly phoneNumber: string;
}

interface WhatsAppTextUrlInput {
  readonly phoneNumber: string;
  readonly message: string;
}

export const normalizeWhatsAppPhoneNumber = (phoneNumber: string): string => {
  const phoneDigits = phoneNumber.replace(/\D/g, '');

  if (phoneDigits.length === 0) {
    throw new Error('WhatsApp number is required');
  }

  if (phoneDigits.length < 10) {
    throw new Error('WhatsApp number must include country code');
  }

  return phoneDigits;
};

export const createWhatsAppTextUrl = ({
  message,
  phoneNumber,
}: WhatsAppTextUrlInput): string => {
  const phoneDigits = normalizeWhatsAppPhoneNumber(phoneNumber);

  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
};

const describeCartItem = (item: CartItem): string => {
  const price =
    typeof item.unitPriceInCents === 'number'
      ? ` - ${formatPrice(item.unitPriceInCents * item.quantity)}`
      : ' - Consultar disponibilidade e valores';

  return `- ${item.quantity}x ${item.name}${price}`;
};

export const buildWhatsAppCheckoutMessage = ({
  items,
  representativeName,
  sourceUrl,
}: CheckoutMessageInput): string => {
  const mergedItems = mergeCartItems(items);
  const subtotalInCents = getCartSubtotalInCents(mergedItems);
  const lines = [
    'Olá, quero consultar estas peças VORIA:',
    '',
    ...(mergedItems.length > 0
      ? mergedItems.map((item) => describeCartItem(item))
      : ['- Catálogo em atualização. Quero atendimento personalizado.']),
    '',
    subtotalInCents > 0
      ? `Total estimado: ${formatPrice(subtotalInCents)}`
      : 'Total: Consultar disponibilidade e valores',
    `Atendimento: ${representativeName}`,
    'Atendimento VORIA com confirmação de disponibilidade.',
  ];

  if (sourceUrl) {
    lines.push(`Origem: ${sourceUrl}`);
  }

  return lines.join('\n');
};

export const createWhatsAppCheckoutUrl = ({
  phoneNumber,
  ...messageInput
}: CheckoutUrlInput): string => {
  return createWhatsAppTextUrl({
    message: buildWhatsAppCheckoutMessage(messageInput),
    phoneNumber,
  });
};
