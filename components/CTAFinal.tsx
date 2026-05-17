"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function CTAFinal() {
  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0b3d91 0%, #0d5aa8 40%, #1a7a2e 80%, #49c21b 100%)" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg-dark" />

      {/* Logo — sello de marca esquina superior-derecha */}
      <div
        className="absolute top-[-20px] right-[-20px] pointer-events-none select-none"
        aria-hidden="true"
        style={{
          width: 320,
          height: 320,
          opacity: 0.10,
          filter: "brightness(0) invert(1)",
          transform: "rotate(-12deg)",
        }}
      >
        <Image src="/logo1.png" alt="" fill className="object-contain" />
      </div>

      {/* Glow orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, rgba(73,194,27,0.15) 0%, transparent 60%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle at bottom left, rgba(255,255,255,0.06) 0%, transparent 60%)" }}
      />

      <div className="container-landing relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 badge mb-6"
            style={{ background: "rgba(73,194,27,0.2)", border: "1px solid rgba(73,194,27,0.4)", color: "#86efac" }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Empieza hoy
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
            Tu taller merece{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #49c21b 0%, #a3e635 50%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              decisiones inteligentes
            </span>
          </h2>

          <p className="text-base sm:text-lg text-blue-100 leading-relaxed mb-10 max-w-xl mx-auto">
            Deja de confiar en el instinto. Empieza a producir con datos,
            predicciones de IA y el único optimizador ILP para talleres de
            confección escolar en Colombia.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contacto@costusoft.com"
              className="inline-flex items-center gap-2 text-[15px] font-semibold py-4 px-6 sm:px-10 rounded-xl w-full sm:w-auto justify-center transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #49c21b, #3daf12)",
                color: "white",
                boxShadow: "0 4px 24px rgba(73,194,27,0.35)",
              }}
            >
              Solicitar demo gratuita
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://app.costusoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[15px] font-medium py-4 px-6 sm:px-10 rounded-xl w-full sm:w-auto justify-center transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
              }}
            >
              Ver el sistema
            </a>
          </div>

          {/* Footnote */}
          <p className="mt-8 text-[13px] text-blue-200 opacity-70">
            Sin contrato de permanencia · Configuración asistida · Soporte en español
          </p>
        </div>
      </div>
    </section>
  );
}
