import type { Metadata } from 'next';

import { CartDrawer } from '../components/cart-drawer';
import { CartProvider } from '../components/cart-provider';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

import './globals.css';

export const metadata: Metadata = {
  title: 'VORIA Jewelry | Joias que acompanham histórias',
  description:
    'Vitrine demonstrativa de joias e semijoias VORIA, com atendimento personalizado via WhatsApp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
