import type { Metadata } from 'next';
import { Mail, MessageCircle, Sparkles } from 'lucide-react';

import { IndependentNotice } from '../../components/independent-notice';
import {
  createWhatsAppCheckoutUrl,
  createWhatsAppTextUrl,
} from '../../lib/checkout';
import { storeConfig } from '../../lib/store-config';

export const metadata: Metadata = {
  title: 'Atendimento | VORIA Jewelry',
};

export default function ContactPage() {
  const whatsappUrl = createWhatsAppCheckoutUrl({
    items: [],
    phoneNumber: storeConfig.whatsappNumber,
    representativeName: storeConfig.representativeName,
  });
  const resaleUrl = createWhatsAppTextUrl({
    message: storeConfig.resaleMessage,
    phoneNumber: storeConfig.whatsappNumber,
  });

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <section>
        <p className="text-xs font-semibold uppercase text-[var(--color-copper)]">
          Atendimento
        </p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-[var(--color-ink)] md:text-6xl">
          Fale com a VORIA
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-muted)]">
          Tire dúvidas sobre peças, materiais, disponibilidade, presente e
          composição. O atendimento VORIA acontece pelo WhatsApp.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--color-ink)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--color-charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <MessageCircle aria-hidden="true" size={18} />
            Chamar no WhatsApp
          </a>
          <a
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-[var(--color-copper)] px-6 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-ivory)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
            href={resaleUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Sparkles aria-hidden="true" size={18} />
            Conhecer a VORIA
          </a>
        </div>
      </section>

      <section className="grid gap-5">
        <div className="rounded-md border border-[var(--color-mist)] bg-white p-7 shadow-[var(--shadow-soft)]">
          <Mail aria-hidden="true" className="text-[var(--color-copper)]" />
          <h2 className="mt-5 font-display text-3xl text-[var(--color-ink)]">
            Atendimento personalizado
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
            Conte qual peça procura, a ocasião e o estilo que deseja compor.
            Assim, a curadoria pode indicar a melhor escolha.
          </p>
        </div>
        <IndependentNotice />
      </section>
    </div>
  );
}
