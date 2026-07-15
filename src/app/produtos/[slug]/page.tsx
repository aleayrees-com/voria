import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ProductPurchasePanel } from '../../../components/product-purchase-panel';
import { formatPrice } from '../../../lib/cart';
import { getProductBySlug, products } from '../../../lib/catalog';

interface ProductPageProps {
  readonly params: Promise<{
    readonly slug: string;
  }>;
}

export const generateStaticParams = () =>
  products.map((product) => ({ slug: product.slug }));

export const dynamicParams = false;

export const generateMetadata = async ({
  params,
}: ProductPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return {
    title: product ? `${product.name} | VORIA Jewelry` : 'VORIA Jewelry',
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1fr_0.86fr] lg:px-8">
      <div className="relative min-h-[520px] overflow-hidden rounded-[1.5rem] bg-[var(--color-sand)]">
        {product.imageUrl ? (
          <Image
            alt={product.name}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={product.imageUrl}
          />
        ) : null}
      </div>

      <section className="flex flex-col justify-center">
        <p className="eyebrow">{product.categorySlug}</p>
        <h1 className="mt-4 font-display text-6xl leading-[0.9] text-[var(--color-blue-deep)] md:text-7xl">
          {product.name}
        </h1>
        <p className="mt-6 text-base leading-7 text-[var(--color-muted)]">
          {product.description}
        </p>
        <p className="mt-7 text-xl font-bold text-[var(--color-blue-deep)]">
          {typeof product.unitPriceInCents === 'number'
            ? formatPrice(product.unitPriceInCents)
            : 'Consultar valor'}
        </p>
        <div className="mt-8">
          <ProductPurchasePanel product={product} />
        </div>
        <div className="mt-9 border-t border-[var(--color-line)] pt-7">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-gold)]">
            Detalhes da peça
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.notes.map((note) => (
              <span
                className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-sm text-[var(--color-muted)]"
                key={note}
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
