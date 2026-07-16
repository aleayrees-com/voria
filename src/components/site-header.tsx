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
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[var(--color-porcelain)]/92 backdrop-blur-xl">
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
          className="hidden items-center gap-7 text-sm font-semibold text-[var(--color-charcoal)] md:flex"
        >
          {navigation.map((item) => (
            <Link
              className="transition hover:text-[var(--color-copper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-copper)]"
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
            className="hidden h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-[var(--color-mist)] px-4 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-copper)] hover:text-[var(--color-copper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)] sm:inline-flex"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <MessageCircle aria-hidden="true" size={17} />
            WhatsApp
          </a>
          <button
            aria-label={`Abrir carrinho com ${itemCount} item(ns)`}
            className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-[var(--color-ink)] text-white transition hover:bg-[var(--color-charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
            onClick={openCart}
            type="button"
          >
            <ShoppingBag aria-hidden="true" size={18} />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-copper)] px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            ) : null}
          </button>
          <button
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-[var(--color-mist)] text-[var(--color-ink)] transition hover:border-[var(--color-copper)] hover:text-[var(--color-copper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)] md:hidden"
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
        <div className="border-t border-[var(--color-mist)] px-5 py-5 md:hidden">
          <nav aria-label="Menu mobile" className="grid gap-3">
            {navigation.map((item) => (
              <Link
                className="rounded-md px-3 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-ivory)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
                href={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-[var(--color-mist)] pt-3">
              <p className="px-3 text-xs font-semibold uppercase text-[var(--color-muted)]">
                Categorias
              </p>
              {categories.map((category) => (
                <Link
                  className="mt-2 block rounded-md px-3 py-2 text-sm text-[var(--color-ink)] transition hover:bg-[var(--color-ivory)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
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
