import Image from 'next/image';

export function VoriaBrandMark() {
  return (
    <div className="relative h-14 w-44 overflow-hidden bg-[var(--color-blue)]">
      <Image
        alt="VORIA Jewelry"
        className="absolute left-1/2 top-1/2 h-auto w-[250px] max-w-none -translate-x-1/2 -translate-y-1/2"
        height={262}
        sizes="176px"
        src="/voria-brand-mark.png"
        width={450}
      />
    </div>
  );
}
