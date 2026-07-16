import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { ProductCategory } from '../types/catalog';

export function CategoryCard({
  category,
}: {
  readonly category: ProductCategory;
}) {
  return (
    <Link
      className="group relative min-h-[340px] overflow-hidden rounded-[1.35rem] bg-[var(--color-blue-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
      href={`/categoria/${category.slug}`}
    >
      <Image
        alt={`Coleção VORIA de ${category.name}`}
        className="object-cover transition duration-500 group-hover:scale-[1.04]"
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        src={category.imageUrl}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(27,54,71,0.92)] via-[rgba(27,54,71,0.3)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-gold-soft)]">
          {category.eyebrow}
        </p>
        <h3 className="mt-3 font-display text-4xl leading-none">
          {category.name}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-6 text-white/78">
          {category.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
          Explorar peças
          <ArrowUpRight
            aria-hidden="true"
            className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
            size={17}
          />
        </span>
      </div>
    </Link>
  );
}
