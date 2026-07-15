import { ShieldCheck } from 'lucide-react';

export function IndependentNotice() {
  return (
    <div className="rounded-md border border-[var(--color-mist)] bg-[var(--color-ivory)] p-5">
      <div className="flex gap-3">
        <ShieldCheck
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-[var(--color-copper)]"
          size={20}
        />
        <p className="text-sm leading-6 text-[var(--color-muted)]">
          Esta é uma vitrine demonstrativa. Disponibilidade, acabamento, prazo e
          condições são confirmados no atendimento VORIA antes da compra.
        </p>
      </div>
    </div>
  );
}
