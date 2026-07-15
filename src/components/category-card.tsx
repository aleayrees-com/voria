import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import type { ProductCategory } from '../types/catalog';

export function CategoryCard({
  category,
}: {
  readonly category: ProductCategory;
}) {
  return (
    <Link
      className="group relative min-h-[220px] overflow-hidden rounded-md border border-[var(--color-mist)] bg-white p-6 shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1 hover:border-[var(--color-copper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
      href={`/categoria/${category.slug}`}
    >
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-[var(--color-copper)]/20 bg-[var(--color-ivory)]" />
      <div className="absolute bottom-5 right-5 h-20 w-14 rounded-t-full border border-[var(--color-copper)]/40 bg-gradient-to-b from-white to-[var(--color-ivory)]" />
      <p className="text-xs font-semibold uppercase text-[var(--color-copper)]">
        {category.eyebrow}
      </p>
      <h3 className="mt-4 max-w-[12rem] font-display text-3xl leading-tight text-[var(--color-ink)]">
        {category.name}
      </h3>
      <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--color-muted)]">
        {category.description}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)]">
        Ver coleção
        <ArrowUpRight
          aria-hidden="true"
          className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
          size={16}
        />
      </span>
    </Link>
  );
}
