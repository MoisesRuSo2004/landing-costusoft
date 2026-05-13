"use client";

import { useEffect, useRef } from "react";

const benefits = [
  {
    icon: (
      <svg viewBox="0 0 56 56" fill="none" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="28" cy="28" r="22" strokeOpacity="0.25"/>
        <path d="M20 28l6 6 10-12" strokeWidth="1.8"/>
        <path d="M28 10v4M28 42v4M10 28h4M42 28h4" strokeOpacity="0.4"/>
      </svg>
    ),
    title: "Reducción de Desperdicio",
    description:
      "Optimice sus cortes y compras con datos precisos. Reduzca hasta un 35% el desperdicio de tela y máxime el rendimiento de cada metro de material.",
    metric: "−35%",
    metricLabel: "Desperdicio de tela",
  },
  {
    icon: (
      <svg viewBox="0 0 56 56" fill="none" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="28" cy="28" r="22" strokeOpacity="0.25"/>
        <rect x="18" y="16" width="20" height="20" rx="2" />
        <path d="M22 28h12M22 24h8M28 36v4" strokeWidth="1.8"/>
      </svg>
    ),
    title: "Mejor Planificación Operativa",
    description:
      "Anticipe la demanda, programe su producción y coordine a su equipo con visibilidad completa del flujo de trabajo en tiempo real.",
    metric: "+60%",
    metricLabel: "Eficiencia en planificación",
  },
  {
    icon: (
      <svg viewBox="0 0 56 56" fill="none" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="28" cy="28" r="22" strokeOpacity="0.25"/>
        <path d="M18 36V24l10-8 10 8v12" strokeWidth="1.8"/>
        <path d="M24 36v-8h8v8" strokeWidth="1.8"/>
      </svg>
    ),
    title: "Control Total del Negocio",
    description:
      "Un solo panel de control para inventario, producción, proveedores y ventas. Tome decisiones basadas en datos, no en suposiciones.",
    metric: "360°",
    metricLabel: "Visibilidad de operaciones",
  },
];

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal-b").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 140);
            });
          }
        });
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="beneficios"
      ref={sectionRef}
      className="bg-ivory py-28 lg:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-xl mb-20">
          <div
            className="reveal-b"
            style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
          >
            <div className="divider-ornament max-w-xs mb-3">
              <span className="font-sans text-burgundy text-[10px] tracking-[0.35em] uppercase whitespace-nowrap">
                Beneficios
              </span>
            </div>
          </div>
          <h2
            className="reveal-b font-serif text-navy text-4xl md:text-5xl font-light leading-[1.15]"
            style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
          >
            Resultados que{" "}
            <em className="italic text-burgundy">hablan solos.</em>
          </h2>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="reveal-b group"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
            >
              {/* Card */}
              <div className="bg-beige border border-transparent hover:border-burgundy/30 p-6 sm:p-8 md:p-10 h-full flex flex-col transition-all duration-500 hover:shadow-lg">
                {/* Icon */}
                <div className="text-burgundy mb-6">
                  {b.icon}
                </div>

                {/* Metric */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="font-serif text-navy text-3xl sm:text-4xl font-semibold">{b.metric}</span>
                  <span className="font-sans text-pearl text-[10px] tracking-[0.18em] uppercase leading-tight">{b.metricLabel}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-navy text-xl font-semibold mb-3">
                  {b.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-navy/65 text-[13px] leading-relaxed font-light flex-1">
                  {b.description}
                </p>

                {/* Hover line */}
                <div className="h-[1px] w-0 bg-burgundy mt-8 group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
