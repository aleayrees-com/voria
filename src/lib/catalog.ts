import type { Product, ProductCategory } from '../types/catalog';

export const categories: readonly ProductCategory[] = [
  {
    slug: 'brincos',
    name: 'Brincos',
    eyebrow: 'Luz em movimento',
    description: 'Peças que acompanham o rosto com brilho e leveza.',
    imageUrl: '/voria-blue-collection.png',
  },
  {
    slug: 'aneis',
    name: 'Anéis',
    eyebrow: 'Gestos que ficam',
    description: 'Formas orgânicas desenhadas para marcar presença.',
    imageUrl: '/voria-rings.png',
  },
  {
    slug: 'colares',
    name: 'Colares',
    eyebrow: 'Perto do coração',
    description: 'Camadas sutis para compor o seu próprio ritual.',
    imageUrl: '/voria-necklaces.png',
  },
  {
    slug: 'pulseiras',
    name: 'Pulseiras',
    eyebrow: 'Detalhes de todos os dias',
    description: 'Acabamentos luminosos para usar sem ocasião.',
    imageUrl: '/voria-bracelets.png',
  },
] as const;

export const products: readonly Product[] = [
  {
    slug: 'brinco-nascente',
    name: 'Brinco Nascente',
    categorySlug: 'brincos',
    shortDescription: 'Argola orgânica com pérola de água doce.',
    description:
      'Uma curva de brilho suave encontra a pérola para criar uma peça de presença silenciosa e inesquecível.',
    status: 'available',
    notes: ['Banho de ouro 18k', 'Pérola de água doce', 'Hipoalergênico'],
    imageUrl: '/voria-earrings.png',
    unitPriceInCents: 28990,
    featured: true,
  },
  {
    slug: 'brinco-orla',
    name: 'Brinco Orla',
    categorySlug: 'brincos',
    shortDescription: 'Brinco escultural com textura acetinada.',
    description:
      'Volume, textura e uma silhueta que captura a luz em qualquer movimento.',
    status: 'available',
    notes: ['Banho de ouro 18k', 'Acabamento acetinado', 'Fecho pino'],
    imageUrl: '/voria-earrings.png',
    unitPriceInCents: 24990,
  },
  {
    slug: 'anel-eclipse',
    name: 'Anel Eclipse',
    categorySlug: 'aneis',
    shortDescription: 'Anel de curvas entrelaçadas e polimento espelhado.',
    description:
      'Uma peça de linhas contínuas, feita para trazer um ponto de luz ao gesto mais simples.',
    status: 'available',
    notes: ['Banho de ouro 18k', 'Ajustável', 'Polimento espelhado'],
    imageUrl: '/voria-rings.png',
    unitPriceInCents: 21990,
    featured: true,
  },
  {
    slug: 'anel-mar',
    name: 'Anel Mar',
    categorySlug: 'aneis',
    shortDescription: 'Forma fluida inspirada pelo encontro das águas.',
    description:
      'Uma textura orgânica e contemporânea para usar só ou em composição.',
    status: 'available',
    notes: ['Banho de ouro 18k', 'Ajustável', 'Textura orgânica'],
    imageUrl: '/voria-rings.png',
    unitPriceInCents: 19990,
  },
  {
    slug: 'colar-alma',
    name: 'Colar Alma',
    categorySlug: 'colares',
    shortDescription: 'Corrente delicada com pingente em forma de onda.',
    description:
      'Delicado à primeira vista, memorável em cada detalhe. Um colar para permanecer perto.',
    status: 'available',
    notes: ['Banho de ouro 18k', 'Corrente de 45 cm', 'Fecho lagosta'],
    imageUrl: '/voria-necklaces.png',
    unitPriceInCents: 25990,
    featured: true,
  },
  {
    slug: 'pulseira-entremares',
    name: 'Pulseira Entremarés',
    categorySlug: 'pulseiras',
    shortDescription: 'Corrente fluida de elos amplos e presença leve.',
    description:
      'Uma peça luminosa, desenhada para acompanhar a pele e multiplicar combinações.',
    status: 'available',
    notes: ['Banho de ouro 18k', '18 cm + extensor', 'Fecho seguro'],
    imageUrl: '/voria-bracelets.png',
    unitPriceInCents: 22990,
  },
  {
    slug: 'colar-sereno',
    name: 'Colar Sereno',
    categorySlug: 'colares',
    shortDescription: 'Corrente dourada com pérola barroca central.',
    description:
      'Uma composição delicada de brilho e matéria orgânica, para iluminar a pele com naturalidade.',
    status: 'available',
    notes: ['Banho de ouro 18k', 'Pérola barroca', 'Corrente de 42 cm'],
    imageUrl: '/voria-necklaces.png',
    unitPriceInCents: 23990,
  },
  {
    slug: 'pulseira-aurora',
    name: 'Pulseira Aurora',
    categorySlug: 'pulseiras',
    shortDescription: 'Duo de aro escultural e corrente delicada.',
    description:
      'Duas texturas complementares para criar uma composição de presença leve e luminosa.',
    status: 'available',
    notes: ['Banho de ouro 18k', 'Aro rígido', 'Corrente com extensor'],
    imageUrl: '/voria-bracelets.png',
    unitPriceInCents: 24990,
  },
] as const;

export const getCategoryBySlug = (slug: string): ProductCategory | undefined =>
  categories.find((category) => category.slug === slug);

export const getProductsByCategory = (
  categorySlug: string,
): readonly Product[] =>
  products.filter((product) => product.categorySlug === categorySlug);

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug);

export const getFeaturedProducts = (): readonly Product[] =>
  products.filter((product) => product.featured);

export const featuredCategories = categories.slice(0, 3);
