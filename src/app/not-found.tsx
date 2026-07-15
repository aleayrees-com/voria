import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 text-center lg:px-8">
      <p className="text-xs font-semibold uppercase text-[var(--color-copper)]">
        VORIA
      </p>
      <h1 className="mt-4 font-display text-5xl text-[var(--color-ink)]">
        Página não encontrada
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[var(--color-muted)]">
        Esta área ainda pode estar sendo preparada para o catálogo futuro.
      </p>
      <Link
        className="mt-8 inline-flex h-12 cursor-pointer items-center justify-center rounded-md bg-[var(--color-ink)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--color-charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
        href="/produtos"
      >
        Ver produtos
      </Link>
    </div>
  );
}
