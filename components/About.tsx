"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="empresa"
      ref={sectionRef}
      className="bg-beige py-28 lg:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <div className="reveal" style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          <div className="divider-ornament max-w-xs mb-3">
            <span className="font-sans text-burgundy text-[10px] tracking-[0.35em] uppercase whitespace-nowrap">
              Nuestra Historia
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center mt-10">

          {/* Text column */}
          <div className="space-y-8">
            <h2
              className="reveal font-serif text-navy text-3xl sm:text-4xl md:text-5xl font-light leading-[1.15]"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
            >
              Donde el hilo encuentra
              <br />
              <em className="italic text-burgundy">su alma.</em>
            </h2>

            <p
              className="reveal font-sans text-navy/70 text-[15px] leading-loose font-light"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
            >
              Costusoft nació de una pasión generacional por el tejido y la confección.
              Desde nuestros primeros talleres, aprendimos que cada pieza de tela cuenta
              una historia: la del artesano que la cortó, la del sastre que la moldeó
              y la del cliente que la lució con orgullo.
            </p>

            <p
              className="reveal font-sans text-navy/70 text-[15px] leading-loose font-light"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
            >
              Con el paso de los años, comprendimos que la tradición más auténtica no
              es la que se resiste al futuro, sino la que lo abraza sin perder su esencia.
              Así nació nuestro sistema de gestión: una herramienta diseñada por quienes
              conocen el oficio desde adentro.
            </p>

            {/* Decorative quote */}
            <blockquote
              className="reveal border-l-2 border-burgundy pl-6 py-2"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
            >
              <p className="font-serif text-navy text-xl italic font-light leading-relaxed">
                &ldquo;La calidad nunca es un accidente; siempre es el resultado
                de un esfuerzo inteligente.&rdquo;
              </p>
              <footer className="font-sans text-pearl text-[11px] tracking-[0.2em] uppercase mt-3">
                — Fundadores de Costusoft
              </footer>
            </blockquote>
          </div>

          {/* Visual column */}
          <div
            className="reveal relative"
            style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.9s ease, transform 0.9s ease" }}
          >
            {/* Decorative frame */}
            <div className="relative">
              {/* Offset border */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-burgundy/30" />
              {/* Stats card */}
              <div className="bg-navy p-6 sm:p-8 md:p-10 lg:p-12 relative">
                <div className="text-[10px] tracking-[0.3em] uppercase font-sans text-pearl mb-8">
                  Nuestra esencia en cifras
                </div>
                <div className="space-y-8">
                  {[
                    { value: "1989", label: "Año de fundación", desc: "Tres décadas de excelencia textil" },
                    { value: "120+", label: "Artesanos aliados", desc: "Red de maestros confeccionistas" },
                    { value: "45+", label: "Categorías de tela", desc: "Desde algodón pima hasta seda" },
                  ].map((item) => (
                    <div key={item.value} className="flex gap-6 items-start border-b border-white/10 pb-6 last:border-0 last:pb-0">
                      <div className="font-serif text-ivory text-3xl font-semibold w-20 flex-shrink-0">
                        {item.value}
                      </div>
                      <div>
                        <div className="font-sans text-ivory text-[13px] tracking-wide mb-1">{item.label}</div>
                        <div className="font-sans text-pearl text-[12px] font-light">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Small decoration */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-burgundy/25 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
