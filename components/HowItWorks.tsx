"use client";

import { Package, ClipboardList, Brain, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Package,
    color: "#0b3d91",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    step: "01",
    title: "Registra tu inventario",
    description:
      "Carga tus insumos (telas, hilos, botones) con stock inicial. La calculadora textil define automáticamente los coeficientes de consumo por prenda, tipo y talla.",
  },
  {
    icon: ClipboardList,
    color: "#7C3AED",
    bg: "#FAF5FF",
    border: "#E9D5FF",
    step: "02",
    title: "Gestiona pedidos",
    description:
      "Registra pedidos de colegios con detalle por prenda y talla. El sistema cruza automáticamente con el stock disponible y te alerta si hay riesgo de incumplimiento.",
  },
  {
    icon: Brain,
    color: "#0369A1",
    bg: "#F0F9FF",
    border: "#BAE6FD",
    step: "03",
    title: "IA predice la demanda",
    description:
      "Con el historial de pedidos, Prophet detecta estacionalidad escolar y XGBoost refina la predicción. Resultado: semanas de adelanto con 95%+ de confianza.",
  },
  {
    icon: Zap,
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    step: "04",
    title: "Optimiza la producción",
    description:
      "El motor ILP (Programación Lineal Entera) calcula en segundos el plan óptimo: qué prendas producir, en qué cantidad, para maximizar la utilidad sin exceder stocks ni demanda.",
  },
  {
    icon: TrendingUp,
    color: "#49c21b",
    bg: "#f0fdf0",
    border: "#bbf7b0",
    step: "05",
    title: "Monitorea y escala",
    description:
      "Dashboard en tiempo real, tablero de riesgos con 4 niveles de alerta, historial de optimizaciones y reportes PDF. Tu taller crece con datos, no con suposiciones.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #EFF6FF 0%, #f0fdf4 50%, #ffffff 100%)",
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="container-landing relative z-10">
        <div className="text-center mb-16">
          <div className="badge badge-emerald inline-flex mb-4">Cómo funciona</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            De cero a producción optimizada{" "}
            <span className="gradient-text">en 5 pasos</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-[15px] leading-relaxed">
            Un flujo diseñado para que cualquier taller empiece a operar con
            inteligencia desde el primer día.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-12 bottom-12 w-px bg-gradient-to-b from-blue-200 via-green-300 to-transparent hidden sm:block" />

          <div className="flex flex-col gap-5">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="relative flex gap-6 bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ borderColor: step.border }}
                >
                  <div className="flex-shrink-0 relative z-10">
                    <div
                      className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-1 border"
                      style={{ backgroundColor: step.bg, borderColor: step.border }}
                    >
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                      <span className="text-[9px] font-bold tracking-widest" style={{ color: step.color }}>
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[16px] text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                  </div>
                  <div
                    className="absolute right-5 top-4 text-[42px] font-black opacity-[0.05] leading-none select-none"
                    style={{ color: step.color }}
                  >
                    {idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
