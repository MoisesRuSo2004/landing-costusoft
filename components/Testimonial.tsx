"use client";

import { useEffect, useRef } from "react";

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal-t").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 150);
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
      ref={sectionRef}
      className="bg-beige py-28 lg:py-36 overflow-hidden relative"
    >
      {/* Decorative large quote in background */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 font-serif text-[240px] text-burgundy/5 select-none leading-none pointer-events-none">
        &ldquo;
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">

        {/* Ornament top */}
        <div
          className="reveal-t flex items-center justify-center gap-4 mb-12"
          style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
        >
          <div className="h-[1px] w-16 bg-burgundy/40" />
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-burgundy/50" />
            ))}
          </div>
          <div className="h-[1px] w-16 bg-burgundy/40" />
        </div>

        {/* Main quote */}
        <blockquote
          className="reveal-t"
          style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
        >
          <p className="font-serif text-navy text-3xl md:text-4xl lg:text-5xl font-light italic leading-[1.25] mb-10">
            &ldquo;El verdadero lujo no es el precio&nbsp;de una tela;
            <br className="hidden md:block"/>
            es la <span className="font-semibold not-italic text-burgundy">certeza</span> de que
            cada decisión fue tomada
            <br className="hidden md:block"/>
            con precisión, pasión y propósito.&rdquo;
          </p>
        </blockquote>

        {/* Attribution */}
        <div
          className="reveal-t"
          style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
        >
          <div className="inline-flex flex-col items-center gap-2">
            <div className="h-[1px] w-12 bg-burgundy/50" />
            <p className="font-sans text-navy/60 text-[11px] tracking-[0.3em] uppercase font-light">
              Filosofía Costusoft
            </p>
          </div>
        </div>

        {/* Client testimonial */}
        <div
          className="reveal-t mt-20 bg-navy/5 border border-burgundy/15 p-10 md:p-12 max-w-3xl mx-auto"
          style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center text-left">
            {/* Avatar initials */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-navy flex items-center justify-center">
                <span className="font-serif text-ivory text-xl font-semibold">MR</span>
              </div>
            </div>
            {/* Quote text */}
            <div>
              <p className="font-sans text-navy/75 text-[14px] leading-relaxed font-light italic mb-4">
                &ldquo;Antes perdíamos horas buscando stock y cometíamos errores costosos en los pedidos.
                Con Costusoft, todo el equipo trabaja sincronizado y los datos están siempre a la mano.
                Nuestra producción mejoró un 40% en el primer trimestre.&rdquo;
              </p>
              <div>
                <div className="font-sans text-navy text-[13px] font-medium tracking-wide">María Rodríguez</div>
                <div className="font-sans text-pearl text-[11px] tracking-[0.15em] uppercase mt-0.5">
                  Directora de Producción · Confecciones El Hilo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
