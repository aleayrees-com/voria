import { describe, expect, it } from 'vitest';

import {
  buildWhatsAppCheckoutMessage,
  createWhatsAppTextUrl,
  createWhatsAppCheckoutUrl,
  normalizeWhatsAppPhoneNumber,
} from './checkout';

const items = [
  {
    productSlug: 'anel-eclipse',
    name: 'Anel Eclipse',
    categorySlug: 'aneis',
    quantity: 2,
    status: 'consult-whatsapp' as const,
  },
];

describe('checkout helpers', () => {
  it('builds a representative-safe WhatsApp checkout message', () => {
    const message = buildWhatsAppCheckoutMessage({
      items,
      representativeName: 'Atendimento VORIA',
      sourceUrl: 'https://loja.test/carrinho',
    });

    expect(message).toContain('Olá, quero consultar estas peças VORIA:');
    expect(message).toContain('2x Anel Eclipse');
    expect(message).toContain('Consultar disponibilidade e valores');
    expect(message).toContain(
      'Atendimento VORIA com confirmação de disponibilidade',
    );
    expect(message).toContain('Origem: https://loja.test/carrinho');
  });

  it('creates an encoded wa.me URL with digits-only phone number', () => {
    const url = createWhatsAppCheckoutUrl({
      items,
      phoneNumber: '+55 (11) 98888-7777',
      representativeName: 'Atendimento VORIA',
    });

    expect(url.startsWith('https://wa.me/5511988887777?text=')).toBe(true);
    expect(decodeURIComponent(url)).toContain('2x Anel Eclipse');
  });

  it('normalizes and validates WhatsApp phone numbers', () => {
    expect(normalizeWhatsAppPhoneNumber('+55 (11) 98888-7777')).toBe(
      '5511988887777',
    );
    expect(() => normalizeWhatsAppPhoneNumber('')).toThrow(
      'WhatsApp number is required',
    );
    expect(() => normalizeWhatsAppPhoneNumber('123')).toThrow(
      'WhatsApp number must include country code',
    );
  });

  it('creates custom WhatsApp text URLs for VORIA messages', () => {
    const url = createWhatsAppTextUrl({
      message: 'Quero conhecer a VORIA',
      phoneNumber: '+55 (11) 98888-7777',
    });

    expect(url).toBe(
      'https://wa.me/5511988887777?text=Quero%20conhecer%20a%20VORIA',
    );
  });
});
