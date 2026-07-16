import Link from 'next/link';

import { categories } from '../lib/catalog';
import { VoriaBrandMark } from './voria-brand-mark';

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-blue)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <VoriaBrandMark />
          <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
            Joias e semijoias de presença silenciosa, para acompanhar histórias
            que merecem ser lembradas.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase text-[var(--color-soft-gold)]">
            Loja
          </p>
          <div className="mt-4 grid gap-3 text-sm text-white/72">
            <Link className="transition hover:text-white" href="/produtos">
              Produtos
            </Link>
            <Link className="transition hover:text-white" href="/carrinho">
              Carrinho
            </Link>
            <Link className="transition hover:text-white" href="/contato">
              Contato
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase text-[var(--color-soft-gold)]">
            Categorias
          </p>
          <div className="mt-4 grid gap-3 text-sm text-white/72">
            {categories.slice(0, 4).map((category) => (
              <Link
                className="transition hover:text-white"
                href={`/categoria/${category.slug}`}
                key={category.slug}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="px-5 py-5 text-center text-xs text-white/55">
        © 2026 VORIA Jewelry. Vitrine demonstrativa para apresentação comercial.
      </div>
    </footer>
  );
}
