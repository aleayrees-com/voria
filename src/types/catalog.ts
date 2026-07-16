export type ProductStatus = 'coming-soon' | 'consult-whatsapp' | 'available';

export interface ProductCategory {
  readonly slug: string;
  readonly name: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly imageUrl: string;
}

export interface Product {
  readonly slug: string;
  readonly name: string;
  readonly categorySlug: string;
  readonly shortDescription: string;
  readonly description: string;
  readonly status: ProductStatus;
  readonly notes: readonly string[];
  readonly imageUrl?: string;
  readonly unitPriceInCents?: number;
  readonly featured?: boolean;
}

export interface CartItem {
  readonly productSlug: string;
  readonly name: string;
  readonly categorySlug: string;
  readonly quantity: number;
  readonly status: ProductStatus;
  readonly imageUrl?: string;
  readonly unitPriceInCents?: number;
}
