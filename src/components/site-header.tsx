'use client';

import { Menu, MessageCircle, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { categories } from '../lib/catalog';
import { createWhatsAppCheckoutUrl } from '../lib/checkout';
import { storeConfig } from '../lib/store-config';
import { useCart } from './cart-provider';
import { VoriaBrandMark } from './voria-brand-mark';

const navigation = [
  { href: '/', label: 'Início' },
  { href: '/produtos', label: 'Produtos' },
  { href: '/contato', label: 'Contato' },
] as const;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const whatsappUrl = createWhatsAppCheckoutUrl({
    items: [],
    phoneNumber: storeConfig.whatsappNumber,
    representativeName: storeConfig.representativeName,
  });

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-blue)] text-[var(--color-ivory)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-8">
        <Link
          aria-label="Página inicial VORIA Jewelry"
          className="inline-flex"
          href="/"
        >
          <VoriaBrandMark />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 text-sm font-semibold text-[var(--color-ivory)] md:flex"
        >
          {navigation.map((item) => (
            <Link
              className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold-soft)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            aria-label="Falar no WhatsApp"
            className="hidden h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-white/45 px-4 text-sm font-semibold text-[var(--color-ivory)] transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold-soft)] sm:inline-flex"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <MessageCircle aria-hidden="true" size={17} />
            WhatsApp
          </a>
          <button
            aria-label={`Abrir carrinho com ${itemCount} item(ns)`}
            className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-[var(--color-ivory)] text-[var(--color-blue-deep)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold-soft)]"
            onClick={openCart}
            type="button"
          >
            <ShoppingBag aria-hidden="true" size={18} />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-gold)] px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            ) : null}
          </button>
          <button
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-white/45 text-[var(--color-ivory)] transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold-soft)] md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
          >
            {isMenuOpen ? (
              <X aria-hidden="true" size={18} />
            ) : (
              <Menu aria-hidden="true" size={18} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-white/25 px-5 py-5 md:hidden">
          <nav aria-label="Menu mobile" className="grid gap-3">
            {navigation.map((item) => (
              <Link
                className="rounded-md px-3 py-3 text-sm font-semibold text-[var(--color-ivory)] transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold-soft)]"
                href={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-white/25 pt-3">
              <p className="px-3 text-xs font-semibold uppercase text-[var(--color-gold-soft)]">
                Categorias
              </p>
              {categories.map((category) => (
                <Link
                  className="mt-2 block rounded-md px-3 py-2 text-sm text-[var(--color-ivory)] transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold-soft)]"
                  href={`/categoria/${category.slug}`}
                  key={category.slug}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
