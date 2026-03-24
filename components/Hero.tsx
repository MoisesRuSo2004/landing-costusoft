"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const titleRef  = useRef<HTMLHeadingElement>(null);
  const subRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);
  const badgeRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered fade-in on mount
    const els = [titleRef, subRef, ctaRef, badgeRef];
    els.forEach((ref, i) => {
      if (ref.current) {
        ref.current.style.opacity = "0";
        ref.current.style.transform = "translateY(28px)";
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.transition = "opacity 0.9s ease, transform 0.9s ease";
            ref.current.style.opacity = "1";
            ref.current.style.transform = "translateY(0)";
          }
        }, 200 + i * 180);
      }
    });
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Taller textil clásico europeo"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay — navy on left, lighter on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/65 to-navy/20" />
        {/* Bottom fade for smooth section transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20 w-full">
        <div className="max-w-2xl">

          {/* Eyebrow badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-3 mb-8 opacity-0"
          >
            <span className="h-[1px] w-8 bg-burgundy" />
            <span className="text-beige font-sans text-[11px] tracking-[0.30em] uppercase">
              Sistema de Gestión Textil
            </span>
          </div>

          {/* Main title */}
          <h1
            ref={titleRef}
            className="font-serif text-ivory text-5xl md:text-6xl lg:text-7xl font-light leading-[1.12] mb-6 opacity-0"
          >
            Tejiendo el{" "}
            <em className="italic text-beige font-normal">Futuro,</em>
            <br />
            <span className="font-semibold">honrando</span>
            <br />
            la Tradición.
          </h1>

          {/* Subtitle */}
          <p
            ref={subRef}
            className="font-sans text-beige/85 text-[15px] md:text-base leading-relaxed max-w-lg mb-10 font-light tracking-wide opacity-0"
          >
            Más de una generación de excelencia artesanal fusionada con inteligencia
            artificial y gestión de inventario en tiempo real.
            <br className="hidden md:block" />
            Su negocio textil, elevado a su máxima expresión.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
            <a
              href="#sistema"
              className="inline-flex items-center gap-3 bg-burgundy text-ivory font-sans text-[12px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-burgundy-light transition-all duration-300 shadow-lg shadow-burgundy/30"
            >
              <span>Descubrir el Sistema</span>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#empresa"
              className="inline-flex items-center gap-3 border border-ivory/40 text-ivory font-sans text-[12px] tracking-[0.22em] uppercase px-8 py-4 hover:border-ivory hover:bg-ivory/10 transition-all duration-300"
            >
              Nuestra Historia
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-16 flex flex-wrap gap-12 border-t border-ivory/15 pt-8">
            {[
              { num: "30+", label: "Años de experiencia" },
              { num: "500+", label: "Clientes satisfechos" },
              { num: "99%", label: "Precisión de inventario" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-ivory text-3xl font-semibold">{stat.num}</div>
                <div className="font-sans text-pearl text-[11px] tracking-[0.18em] uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-12 hidden lg:flex flex-col items-center gap-2 z-10">
        <div className="h-12 w-[1px] bg-ivory/30 animate-pulse" />
        <span className="font-sans text-ivory/40 text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center mt-4">
          Scroll
        </span>
      </div>
    </section>
  );
}
