import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { CategoryCard } from '../components/category-card';
import { ProductCard } from '../components/product-card';
import { categories, getFeaturedProducts } from '../lib/catalog';
import { createWhatsAppCheckoutUrl } from '../lib/checkout';
import { storeConfig } from '../lib/store-config';

const assurances = [
  {
    icon: Sparkles,
    title: 'Feito para durar',
    copy: 'Peças demonstrativas com banho de ouro 18k e acabamento cuidadoso.',
  },
  {
    icon: ShieldCheck,
    title: 'Compra com clareza',
    copy: 'Você consulta detalhes e disponibilidade antes de finalizar.',
  },
  {
    icon: Truck,
    title: 'Envio acompanhado',
    copy: 'Entrega e prazo confirmados no atendimento personalizado.',
  },
] as const;

export default function Home() {
  const whatsappUrl = createWhatsAppCheckoutUrl({
    items: [],
    phoneNumber: storeConfig.whatsappNumber,
    representativeName: storeConfig.representativeName,
  });
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <section className="relative isolate min-h-[min(400px,48vh)] overflow-hidden bg-[var(--color-blue-deep)]">
        <Image
          alt="Modelo usando a coleção VORIA em ouro sobre seda azul"
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          src="/voria-hero.png"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(27,54,71,0.96)] via-[rgba(27,54,71,0.76)] to-[rgba(27,54,71,0.05)]" />
        <div className="relative mx-auto flex min-h-[min(400px,48vh)] max-w-7xl items-center px-5 py-8 lg:px-8 lg:py-10">
          <div className="max-w-2xl text-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-gold-soft)]">
              Joias que acompanham histórias
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[0.84] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-7xl">
              A forma de
              <br />
              <em>brilhar</em> é sua
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/78 md:text-base md:leading-7">
              VORIA traduz o luxo de todos os dias em joias de linhas fluidas,
              textura e presença
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--color-ivory)] px-6 text-sm font-bold text-[var(--color-blue-deep)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
                href="/produtos"
              >
                Conheça a coleção
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <a
                className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/40 px-6 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
                href={whatsappUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <MessageCircle aria-hidden="true" size={17} />
                Falar com a VORIA
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Coleções</p>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] text-[var(--color-blue-deep)] md:text-[2.5rem] md:whitespace-nowrap">
              Detalhes que falam por você
            </h2>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-blue-deep)] transition hover:text-[var(--color-gold)]"
            href="/produtos"
          >
            Ver todas as peças
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.slug} />
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-sand)] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <p className="eyebrow">Em destaque</p>
            <h2 className="mt-4 font-display text-3xl leading-[0.95] text-[var(--color-blue-deep)] md:text-4xl md:whitespace-nowrap">
              Escolhas para ficar perto
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="relative isolate min-h-[430px] overflow-hidden rounded-[1.5rem] bg-[var(--color-blue)] md:min-h-[520px]">
          <Image
            alt="Seleção VORIA de joias douradas sobre seda azul-clara"
            className="object-cover"
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            src="/voria-banner-collection.png"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(24,45,59,0.85)] via-[rgba(24,45,59,0.46)] to-transparent" />
          <div className="relative flex min-h-[430px] max-w-xl flex-col justify-end p-8 text-white md:min-h-[520px] md:p-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-gold-soft)]">
              Curadoria VORIA
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.94] md:text-6xl">
              Ouro que encontra o seu ritmo
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/80">
              Formas orgânicas, brilho suave e peças feitas para compor o seu
              cotidiano.
            </p>
            <Link
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/45 px-5 py-3 text-sm font-bold transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
              href="/produtos"
            >
              Ver a coleção
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="relative min-h-[540px] overflow-hidden rounded-[1.5rem] bg-[var(--color-blue)]">
          <Image
            alt="Seleção de joias VORIA em ouro sobre pedra natural"
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            src="/voria-gold-collection.png"
          />
        </div>
        <div className="flex flex-col justify-center py-5 lg:pl-12">
          <p className="eyebrow">O seu ritual</p>
          <h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.95] text-[var(--color-blue-deep)] md:text-6xl">
            Joias para viver com você, não para esperar uma ocasião
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-[var(--color-muted)]">
            Uma coleção demonstrativa pensada como um convite: escolha a peça,
            descubra os detalhes e crie a sua composição.
          </p>
          <Link
            className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-[var(--color-blue-deep)] transition hover:text-[var(--color-gold)]"
            href="/produtos"
          >
            Explorar o catálogo
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {assurances.map((item) => {
            const Icon = item.icon;

            return (
              <article className="flex gap-4" key={item.title}>
                <Icon
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[var(--color-gold)]"
                  size={23}
                />
                <div>
                  <h3 className="font-display text-3xl text-[var(--color-blue-deep)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    {item.copy}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
