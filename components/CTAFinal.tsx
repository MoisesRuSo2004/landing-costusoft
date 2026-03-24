"use client";

import { useEffect, useRef } from "react";

export default function CTAFinal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal-cta").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 160);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="bg-navy py-32 lg:py-40 overflow-hidden relative"
    >
      {/* Subtle decorative pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #E6D9C7 0, #E6D9C7 1px, transparent 0, transparent 50%), repeating-linear-gradient(90deg, #E6D9C7 0, #E6D9C7 1px, transparent 0, transparent 50%)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* Burgundy accent corner */}
      <div className="absolute top-0 left-0 w-32 h-1 bg-burgundy" />
      <div className="absolute top-0 left-0 w-1 h-32 bg-burgundy" />
      <div className="absolute bottom-0 right-0 w-32 h-1 bg-burgundy" />
      <div className="absolute bottom-0 right-0 w-1 h-32 bg-burgundy" />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">

        {/* Eyebrow */}
        <div
          className="reveal-cta inline-flex items-center gap-3 mb-8"
          style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
        >
          <span className="h-[1px] w-8 bg-burgundy" />
          <span className="font-sans text-pearl text-[10px] tracking-[0.3em] uppercase">
            Dé el primer paso
          </span>
          <span className="h-[1px] w-8 bg-burgundy" />
        </div>

        {/* Headline */}
        <h2
          className="reveal-cta font-serif text-ivory text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] mb-6"
          style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
        >
          Su empresa textil merece
          <br />
          <em className="italic text-beige font-normal">la mejor gestión del mercado.</em>
        </h2>

        {/* Subline */}
        <p
          className="reveal-cta font-sans text-pearl text-[15px] leading-relaxed font-light max-w-xl mx-auto mb-12"
          style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
        >
          Descubra cómo Costusoft puede transformar su operación. Sin compromisos,
          con una demostración personalizada adaptada a su negocio.
        </p>

        {/* CTAs */}
        <div
          className="reveal-cta flex flex-col sm:flex-row gap-4 justify-center"
          style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
        >
          <a
            href="mailto:contacto@costusoft.com"
            className="inline-flex items-center justify-center gap-3 bg-burgundy text-ivory font-sans text-[12px] tracking-[0.22em] uppercase px-10 py-4 hover:bg-burgundy-light transition-all duration-300 shadow-xl shadow-burgundy/20"
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <rect x="1" y="1" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M1 3l7 5 7-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Solicitar Demostración
          </a>
          <a
            href="tel:+1234567890"
            className="inline-flex items-center justify-center gap-3 border border-ivory/30 text-ivory font-sans text-[12px] tracking-[0.22em] uppercase px-10 py-4 hover:border-ivory hover:bg-ivory/10 transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2h3l1.5 3.5-2 1.5a9 9 0 004.5 4.5l1.5-2L14 11v3a1 1 0 01-1 1C5 15 0 9 0 2a1 1 0 011-1l1 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
            Llamar Ahora
          </a>
        </div>

        {/* Assurance line */}
        <p
          className="reveal-cta font-sans text-pearl/50 text-[11px] tracking-[0.15em] uppercase mt-10"
          style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
        >
          Sin costos ocultos · Implementación asistida · Soporte continuo
        </p>
      </div>
    </section>
  );
}
