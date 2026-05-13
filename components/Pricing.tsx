"use client";

import { Check, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";

const plans = [
  {
    name: "Esencial",
    desc: "Para talleres que quieren digitalizar su operación base.",
    highlight: false,
    badge: null,
    features: [
      "Inventario en tiempo real",
      "Gestión de pedidos",
      "Calculadora textil",
      "Hasta 3 colegios",
      "2 usuarios (Admin + Operario)",
      "Reportes básicos",
      "Soporte por correo",
    ],
    cta: "Solicitar info",
    ctaHref: "#contact",
  },
  {
    name: "Control Pro",
    desc: "El sistema completo: IA, optimización ILP y predicción avanzada.",
    highlight: true,
    badge: "Más completo",
    features: [
      "Todo lo de Esencial",
      "IA predictiva (Prophet + XGBoost)",
      "Optimizador ILP (PuLP + CBC)",
      "Asistente LLaMA 3.3 70B",
      "Tablero de riesgos (4 niveles)",
      "Historial de optimizaciones + PDF",
      "Multi-colegio ilimitado",
      "4 roles de usuario",
      "Soporte prioritario",
    ],
    cta: "Solicitar demo",
    ctaHref: "#contact",
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "linear-gradient(175deg, #f0fdf4 0%, #ffffff 50%, #EFF6FF 100%)",
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(37,99,235,0.04) 0%, transparent 65%)",
        }}
      />

      {/* Logo ghost — centrado en fondo claro */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
        style={{ width: 260, height: 260, opacity: 0.035, filter: "brightness(0)" }}
      >
        <Image src="/logo1.png" alt="" fill className="object-contain" />
      </div>

      <div className="container-landing relative z-10">
        <div className="text-center mb-14">
          <div className="badge badge-indigo inline-flex mb-4">Precios</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Invertir en datos es{" "}
            <span className="gradient-text">más barato que improvisar</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-[15px]">
            Planes adaptados a talleres en crecimiento. Sin costos ocultos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col border ${
                plan.highlight
                  ? "border-blue-200 shadow-lg shadow-blue-900/8"
                  : "border-gray-100 shadow-sm bg-white"
              }`}
              style={
                plan.highlight
                  ? {
                      background:
                        "linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)",
                    }
                  : {}
              }
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="badge badge-indigo text-[11px]">
                    <Zap className="w-3 h-3" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
                <div className="text-3xl font-black gradient-text">Cotizar</div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.ctaHref}
                className={`${
                  plan.highlight ? "btn-primary" : "btn-secondary"
                } justify-center`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-[13px] text-gray-400 mt-8">
          Precios personalizados según volumen y requerimientos del taller.{" "}
          <a href="#contact" className="text-blue-600 hover:underline">
            Habla con nosotros
          </a>
          .
        </p>
      </div>
    </section>
  );
}
