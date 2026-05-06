import Image from "next/image";

export default function ComingSoon() {
  return (
    <main className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(230,217,199,0.04) 79px, rgba(230,217,199,0.04) 80px),
            repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(230,217,199,0.04) 79px, rgba(230,217,199,0.04) 80px)
          `,
        }}
      />

      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(108,46,63,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Top line ornament */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-burgundy opacity-50" />

      {/* ─── Main content ─────────────────────── */}
      <div className="relative z-10 text-center max-w-md w-full">

        {/* Logo */}
        <div
          className="flex justify-center mb-8"
          style={{ animation: "var(--animate-fade-in)", animationDelay: "0s" }}
        >
          <Image
            src="/logo.svg"
            alt="Costusoft"
            width={130}
            height={130}
            priority
            className="opacity-90"
          />
        </div>

        {/* Ornamental divider */}
        <div
          className="flex items-center gap-4 mb-8"
          style={{ animation: "var(--animate-fade-in)", animationDelay: "0.15s", opacity: 0 }}
        >
          <div className="flex-1 h-px bg-beige opacity-15" />
          <div className="w-1.5 h-1.5 rounded-full bg-burgundy" />
          <div className="flex-1 h-px bg-beige opacity-15" />
        </div>

        {/* Main heading */}
        <h1
          className="font-display text-ivory text-6xl sm:text-7xl font-light leading-tight mb-2"
          style={{ animation: "var(--animate-slide-up)", animationDelay: "0.25s", opacity: 0 }}
        >
          En
        </h1>
        <h1
          className="font-display text-ivory text-6xl sm:text-7xl font-light leading-tight italic mb-2"
          style={{ animation: "var(--animate-slide-up)", animationDelay: "0.35s", opacity: 0 }}
        >
          Desarrollo
        </h1>

        {/* Description */}
        <p
          className="font-sans text-pearl text-sm tracking-wide leading-relaxed mb-10"
          style={{ animation: "var(--animate-fade-in)", animationDelay: "0.7s", opacity: 0 }}
        >
          Estamos perfeccionando cada detalle.<br />
          Pronto podrás acceder a la experiencia completa.
        </p>

        {/* CTA Button */}
        <div
          style={{ animation: "var(--animate-fade-in)", animationDelay: "0.85s", opacity: 0 }}
        >
          <a
            href="https://app.costusoft.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn inline-flex items-center gap-3 px-9 py-3.5 border border-burgundy text-ivory font-sans text-xs tracking-[0.25em] uppercase transition-all duration-300"
          >
            Ir al Sistema
            <span className="cta-arrow transition-transform duration-300">→</span>
          </a>
        </div>

      </div>

      {/* Bottom line ornament */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent to-burgundy opacity-50" />

      {/* Footer brand */}
      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sans text-pearl text-[10px] tracking-[0.3em] uppercase opacity-40 whitespace-nowrap">
        © 2026 Costusoft
      </p>

    </main>
  );
}
