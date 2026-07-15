import Link from 'next/link';

import { EmptyCatalogState } from '../../../components/empty-catalog-state';

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
      <EmptyCatalogState title="Produto ainda não cadastrado" />
      <div className="mt-8 text-center">
        <Link
          className="text-sm font-semibold text-[var(--color-ink)] transition hover:text-[var(--color-copper)]"
          href="/produtos"
        >
          Voltar para produtos
        </Link>
      </div>
    </div>
  );
}
