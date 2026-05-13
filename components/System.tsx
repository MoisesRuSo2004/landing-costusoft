"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="36" height="36" rx="2" />
        <path d="M6 18h36M18 18v24M30 6v12" />
        <circle cx="24" cy="33" r="3" fill="currentColor" stroke="none" />
      </svg>
    ),
    tag: "01",
    title: "Control de Inventario Inteligente",
    description:
      "Seguimiento en tiempo real de cada rollo, bobina y pieza de tela. Alertas automáticas de stock, trazabilidad completa y cero pérdidas por descontrol.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 36l10-12 8 6 10-16 6 4" />
        <circle cx="38" cy="14" r="3" fill="currentColor" stroke="none" />
        <path d="M7 40h34" />
      </svg>
    ),
    tag: "02",
    title: "Predicción con Inteligencia Artificial",
    description:
      "Algoritmos de ML analizan temporadas, tendencias y demanda histórica para anticipar qué materiales necesita, cuándo y en qué cantidad.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6v8M8 40h32M12 40V24a4 4 0 014-4h16a4 4 0 014 4v16" />
        <path d="M18 30h12M18 34h8" />
        <circle cx="24" cy="10" r="4" />
      </svg>
    ),
    tag: "03",
    title: "Optimización de Producción",
    description:
      "Planificación de cortes, asignación de recursos y scheduling de órdenes para maximizar el rendimiento de tela y minimizar tiempos muertos.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="28" width="8" height="12" rx="1" />
        <rect x="20" y="20" width="8" height="20" rx="1" />
        <rect x="32" y="12" width="8" height="28" rx="1" />
        <path d="M8 22l10-8 10 4 10-10" strokeDasharray="2 2" />
      </svg>
    ),
    tag: "04",
    title: "Análisis de Datos en Tiempo Real",
    description:
      "Dashboards elegantes con KPIs clave: rotación de inventario, costos por prenda, eficiencia productiva y rentabilidad por línea.",
  },
];

export default function System() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal-card").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 130);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sistema"
      ref={sectionRef}
      className="bg-navy py-28 lg:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div
            className="reveal-card"
            style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
          >
            <div className="divider-ornament justify-center mb-4">
              <span className="font-sans text-burgundy text-[10px] tracking-[0.35em] uppercase whitespace-nowrap">
                El Sistema
              </span>
            </div>
          </div>

          <h2
            className="reveal-card font-serif text-ivory text-4xl md:text-5xl font-light leading-[1.15] mb-6"
            style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
          >
            Tecnología que entiende
            <br />
            <em className="italic text-beige font-normal">el lenguaje del textil.</em>
          </h2>

          <p
            className="reveal-card font-sans text-pearl text-[14px] leading-relaxed font-light"
            style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
          >
            Diseñado específicamente para empresas de confección. No es un ERP genérico;
            es una plataforma que habla su idioma, respeta sus procesos y amplifica su talento.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {features.map((f) => (
            <div
              key={f.tag}
              className="reveal-card group relative bg-navy-light border border-white/8 p-5 sm:p-6 md:p-8 hover:border-burgundy/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(108,46,63,0.15)]"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
            >
              {/* Tag */}
              <div className="font-serif text-burgundy/50 text-5xl font-semibold absolute top-5 right-6 select-none group-hover:text-burgundy/70 transition-colors duration-300">
                {f.tag}
              </div>

              {/* Icon */}
              <div className="text-burgundy mb-6 group-hover:text-beige transition-colors duration-300">
                {f.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-ivory text-xl font-semibold mb-3 leading-snug">
                {f.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-pearl text-[13px] leading-relaxed font-light">
                {f.description}
              </p>

              {/* Bottom accent */}
              <div className="h-[1px] w-0 bg-burgundy mt-6 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom CTA inside the section */}
        <div className="text-center mt-16">
          <a
            href="#contacto"
            className="inline-flex items-center gap-3 border border-burgundy/60 text-ivory font-sans text-[12px] tracking-[0.22em] uppercase px-6 sm:px-10 py-3 sm:py-4 hover:bg-burgundy hover:border-burgundy transition-all duration-300"
          >
            Solicitar una demostración
          </a>
        </div>
      </div>
    </section>
  );
}
