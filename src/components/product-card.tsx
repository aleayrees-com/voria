import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { Product } from '../types/catalog';
import { formatPrice } from '../lib/cart';
import { getCategoryBySlug } from '../lib/catalog';

export function ProductCard({ product }: { readonly product: Product }) {
  const categoryName = getCategoryBySlug(product.categorySlug)?.name;

  return (
    <Link
      className="group block cursor-pointer"
      href={`/produtos/${product.slug}`}
    >
      <article className="overflow-hidden rounded-[1.35rem] border border-[var(--color-line)] bg-white transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-lift)] focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[var(--color-gold)]">
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-sand)]">
          {product.imageUrl ? (
            <Image
              alt={product.name}
              className="object-cover transition duration-500 group-hover:scale-[1.035]"
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
              src={product.imageUrl}
            />
          ) : null}
          <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-blue-deep)] backdrop-blur">
            VORIA
          </span>
        </div>
        <div className="p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-gold)]">
            {categoryName ?? product.categorySlug}
          </p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-3xl leading-none text-[var(--color-blue-deep)]">
                {product.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                {product.shortDescription}
              </p>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="mt-1 shrink-0 text-[var(--color-gold)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              size={19}
            />
          </div>
          <p className="mt-5 text-sm font-semibold text-[var(--color-blue-deep)]">
            {typeof product.unitPriceInCents === 'number'
              ? formatPrice(product.unitPriceInCents)
              : 'Consultar valor'}
          </p>
        </div>
      </article>
    </Link>
  );
}
