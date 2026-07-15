import { MessageCircle, Sparkles } from 'lucide-react';

import { createWhatsAppCheckoutUrl } from '../lib/checkout';
import { storeConfig } from '../lib/store-config';

export function EmptyCatalogState({
  title = 'Catálogo em atualização',
}: {
  readonly title?: string;
}) {
  const whatsappUrl = createWhatsAppCheckoutUrl({
    items: [],
    phoneNumber: storeConfig.whatsappNumber,
    representativeName: storeConfig.representativeName,
  });

  return (
    <section className="rounded-md border border-[var(--color-mist)] bg-white p-8 text-center shadow-[var(--shadow-soft)] md:p-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-ivory)] text-[var(--color-copper)]">
        <Sparkles aria-hidden="true" size={28} />
      </div>
      <h2 className="mx-auto mt-6 max-w-xl font-display text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">
        Em breve novas peças VORIA estarão disponíveis aqui. Para consultar
        disponibilidade, lançamentos ou reservar atendimento, fale no WhatsApp.
      </p>
      <a
        className="mt-7 inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--color-ink)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--color-charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]"
        href={whatsappUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <MessageCircle aria-hidden="true" size={18} />
        Consultar no WhatsApp
      </a>
    </section>
  );
}
