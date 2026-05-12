"use client";

import { ArrowRight, Play, Sparkles } from "lucide-react";

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
        className="float absolute top-32 right-[10%] w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="float-slow absolute bottom-40 left-[8%] w-48 h-48 rounded-full pointer-events-none"
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
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.08] mb-6">
            Tu taller,{" "}
            <span className="shimmer-text">inteligente.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
            Inventario en tiempo real, predicciones de demanda con IA y
            optimización automática de producción. Todo en un solo sistema
            diseñado para talleres de uniformes escolares.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#pricing"
              className="btn-primary text-[15px] py-3.5 px-8 w-full sm:w-auto justify-center"
            >
              Solicitar demo gratuita
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#how-it-works"
              className="btn-secondary text-[15px] py-3.5 px-8 w-full sm:w-auto justify-center"
            >
              <Play className="w-4 h-4 text-blue-600" />
              Ver cómo funciona
            </a>
          </div>

          {/* Social proof strip */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-gray-400 text-sm">
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

        {/* Dashboard preview */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="border-gradient rounded-2xl overflow-hidden glow-blue shadow-2xl shadow-blue-900/10 bg-white">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white border border-gray-200 rounded-md px-3 py-1 text-[11px] text-gray-400 text-center max-w-xs mx-auto">
                  app.costusoft.com/dashboard
                </div>
              </div>
            </div>

            {/* Fake dashboard UI */}
            <div className="p-6 grid grid-cols-12 gap-4 bg-[#F9FAFB]" style={{ minHeight: 360 }}>
              {/* Sidebar */}
              <div className="col-span-2 bg-white rounded-xl border border-gray-100 p-3 flex flex-col gap-1.5">
                {["Dashboard", "Inventario", "Pedidos", "Predicción", "Optimizar", "Reportes"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`rounded-lg px-3 py-2 text-[11px] font-medium ${
                        i === 0
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>

              {/* Main area */}
              <div className="col-span-10 flex flex-col gap-4">
                {/* Top stat cards */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Stock total", value: "12,480", color: "#0b3d91", delta: "+3.2%", bg: "#EFF6FF" },
                    { label: "Pedidos activos", value: "47", color: "#7C3AED", delta: "+8", bg: "#FAF5FF" },
                    { label: "Predicción mes", value: "1,920", color: "#0369A1", delta: "95% conf.", bg: "#F0F9FF" },
                    { label: "Utilidad opt.", value: "$4.8M", color: "#16A34A", delta: "OPTIMAL", bg: "#F0FDF4" },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="rounded-xl p-3 bg-white border border-gray-100 shadow-sm"
                    >
                      <div className="text-[10px] text-gray-400 mb-1">{card.label}</div>
                      <div className="text-[18px] font-bold text-gray-900 leading-none mb-1">
                        {card.value}
                      </div>
                      <div
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded inline-block"
                        style={{ color: card.color, backgroundColor: card.bg }}
                      >
                        {card.delta}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart area */}
                <div className="flex-1 rounded-xl bg-white border border-gray-100 shadow-sm p-4">
                  <div className="text-[11px] text-gray-600 font-semibold mb-3">
                    Predicción de demanda — Próximas 12 semanas
                  </div>
                  <div className="flex items-end gap-1.5 h-24">
                    {[40, 55, 48, 72, 65, 80, 58, 90, 75, 88, 95, 100].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t"
                          style={{
                            height: `${h}%`,
                            background:
                              i >= 8
                                ? "linear-gradient(to top, #0b3d91, #3B82F6)"
                                : "#DBEAFE",
                          }}
                        />
                      )
                    )}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[9px] text-gray-400">Sem 1</span>
                    <span className="text-[9px] text-blue-600 font-medium">
                      ▲ IA Forecast (Prophet + XGBoost)
                    </span>
                    <span className="text-[9px] text-gray-400">Sem 12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow under preview */}
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 blur-3xl pointer-events-none"
            style={{ background: "rgba(37,99,235,0.10)" }}
          />
        </div>
      </div>
    </section>
  );
}
