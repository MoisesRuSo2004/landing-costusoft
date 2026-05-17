"use client";

import { ArrowRight, Play, Sparkles } from "lucide-react";
import HeroVisual from "@/components/HeroVisual";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #071e4a 0%, #0b3d91 45%, #0a5c1e 100%)",
      }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg-dark" />

      {/* Glow central — verde suave */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(73,194,27,0.10) 0%, rgba(11,61,145,0.06) 45%, transparent 70%)",
        }}
      />

      {/* Glow esquina inferior derecha */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[350px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom right, rgba(73,194,27,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Orbs flotantes */}
      <div
        className="float hidden sm:block absolute top-32 right-[10%] w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(73,194,27,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="float-slow hidden sm:block absolute bottom-40 left-[8%] w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="container-landing relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 badge mb-8"
            style={{
              background: "rgba(73,194,27,0.15)",
              border: "1px solid rgba(73,194,27,0.35)",
              color: "#86efac",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sistema integral para talleres de confección</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            Tu taller,{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, #ffffff 0%, #86efac 35%, #ffffff 55%, #49c21b 75%, #ffffff 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}
            >
              inteligente.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-blue-200 leading-relaxed max-w-2xl mx-auto mb-10">
            Inventario en tiempo real, predicciones de demanda con IA y
            optimización automática de producción. Todo en un solo sistema
            diseñado para talleres de uniformes escolares.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-16">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 text-[15px] font-semibold py-3.5 px-8 rounded-xl w-full sm:w-auto justify-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: "linear-gradient(135deg, #49c21b, #3daf12)",
                color: "white",
                boxShadow: "0 4px 24px rgba(73,194,27,0.40)",
              }}
            >
              Solicitar demo gratuita
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/demo"
              className="inline-flex items-center gap-2 text-[15px] font-medium py-3.5 px-8 rounded-xl w-full sm:w-auto justify-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "white",
                backdropFilter: "blur(8px)",
              }}
            >
              <Play className="w-4 h-4" style={{ color: "#49c21b" }} />
              Tour interactivo
            </a>
          </div>

          {/* Social proof strip */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-blue-300 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[
                  { letter: "G", color: "#0b3d91" },
                  { letter: "M", color: "#2563EB" },
                  { letter: "L", color: "#16A34A" },
                ].map(({ letter, color }) => (
                  <div
                    key={letter}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{
                      backgroundColor: color,
                      border: "2px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span>Talleres activos</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/15" />
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 pulse-glow" />
              <span>Servidor activo 24/7</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/15" />
            <span>Datos seguros en Colombia</span>
          </div>
        </div>

        {/* Bento visual */}
        <HeroVisual />
      </div>
    </section>
  );
}
