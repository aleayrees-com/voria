import type { Metadata } from 'next';

import { ProductCard } from '../../components/product-card';
import { products } from '../../lib/catalog';

export const metadata: Metadata = {
  title: 'Coleção | VORIA Jewelry',
  description: 'Coleção demonstrativa de joias e semijoias VORIA.',
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="max-w-3xl">
        <p className="eyebrow">Catálogo VORIA</p>
        <h1 className="mt-4 font-display text-6xl leading-[0.9] text-[var(--color-blue-deep)] md:text-7xl">
          Peças para chamar de suas
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-muted)]">
          Esta vitrine apresenta peças demonstrativas. Valores, disponibilidade
          e acabamento podem ser confirmados no atendimento VORIA.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
