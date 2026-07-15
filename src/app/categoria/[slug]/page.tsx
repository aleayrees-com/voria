import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductCard } from '../../../components/product-card';
import {
  categories,
  getCategoryBySlug,
  getProductsByCategory,
} from '../../../lib/catalog';

interface CategoryPageProps {
  readonly params: Promise<{
    readonly slug: string;
  }>;
}

export const dynamicParams = false;

export const generateStaticParams = () =>
  categories.map((category) => ({ slug: category.slug }));

export const generateMetadata = async ({
  params,
}: CategoryPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  return {
    title: category ? `${category.name} | VORIA Jewelry` : 'VORIA Jewelry',
  };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="max-w-3xl">
        <p className="eyebrow">{category.eyebrow}</p>
        <h1 className="mt-4 font-display text-6xl leading-[0.9] text-[var(--color-blue-deep)] md:text-7xl">
          {category.name}
        </h1>
        <p className="mt-6 text-base leading-7 text-[var(--color-muted)]">
          {category.description}
        </p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categoryProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
