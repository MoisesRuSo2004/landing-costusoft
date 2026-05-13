"use client";

import { ArrowRight, Play, Sparkles } from "lucide-react";
import HeroVisual from "@/components/HeroVisual";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-white">

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-100" />

      {/* Radial glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(37,99,235,0.07) 0%, rgba(11,61,145,0.03) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[350px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom right, rgba(22,163,74,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Floating orbs */}
      <div
        className="float hidden sm:block absolute top-32 right-[10%] w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="float-slow hidden sm:block absolute bottom-40 left-[8%] w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(22,163,74,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container-landing relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 badge badge-indigo mb-8">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Sistema integral para talleres de confección</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.08] mb-6">
            Tu taller,{" "}
            <span className="shimmer-text">inteligente.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
            Inventario en tiempo real, predicciones de demanda con IA y
            optimización automática de producción. Todo en un solo sistema
            diseñado para talleres de uniformes escolares.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-16">
            <a
              href="#pricing"
              className="btn-primary text-[15px] py-3.5 px-8 w-full sm:w-auto justify-center"
            >
              Solicitar demo gratuita
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/demo"
              className="btn-secondary text-[15px] py-3.5 px-8 w-full sm:w-auto justify-center"
            >
              <Play className="w-4 h-4 text-blue-600" />
              Tour interactivo
            </a>
          </div>

          {/* Social proof strip */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[
                  { letter: "G", color: "#0b3d91" },
                  { letter: "M", color: "#2563EB" },
                  { letter: "L", color: "#16A34A" },
                ].map(({ letter, color }) => (
                  <div
                    key={letter}
                    className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span>Talleres activos</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 pulse-glow" />
              <span>Servidor activo 24/7</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-200" />
            <span>Datos seguros en Colombia</span>
          </div>
        </div>

        {/* Bento visual */}
        <HeroVisual />
      </div>
    </section>
  );
}
