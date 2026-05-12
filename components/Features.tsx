"use client";

import {
  Package,
  BarChart3,
  Brain,
  Zap,
  Calculator,
  ShieldAlert,
  FileText,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Package,
    color: "#0b3d91",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    title: "Inventario en tiempo real",
    description:
      "Control total de insumos, prendas y stock por bodega. Alertas automáticas de reorden. Trazabilidad de cada movimiento.",
    badge: "Core",
  },
  {
    icon: Brain,
    color: "#7C3AED",
    bg: "#FAF5FF",
    border: "#E9D5FF",
    title: "IA Predictiva de Demanda",
    description:
      "Prophet + XGBoost analizan historial de pedidos y detectan patrones estacionales con 95%+ de confianza. Adelántate a la temporada escolar.",
    badge: "IA",
  },
  {
    icon: Zap,
    color: "#0369A1",
    bg: "#F0F9FF",
    border: "#BAE6FD",
    title: "Optimización ILP",
    description:
      "Motor de Programación Lineal Entera (PuLP + CBC) calcula el plan óptimo de producción: ¿qué confeccionar y cuánto para maximizar utilidad sin desperdiciar insumos?",
    badge: "Diferenciador",
  },
  {
    icon: Calculator,
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    title: "Calculadora Textil",
    description:
      "Coeficientes de consumo por prenda, tipo y talla. Calcula exactamente cuánta tela, hilo y accesorios necesitas para cada pedido. 95%+ precisión.",
    badge: "Exclusivo",
  },
  {
    icon: BarChart3,
    color: "#B45309",
    bg: "#FFFBEB",
    border: "#FDE68A",
    title: "Gestión de Pedidos",
    description:
      "Ciclo completo: creación, detalle por prenda-talla, seguimiento de estado y entrega. Vinculado directamente al inventario y al optimizador.",
    badge: "Core",
  },
  {
    icon: ShieldAlert,
    color: "#DC2626",
    bg: "#FFF1F2",
    border: "#FECDD3",
    title: "Tablero de Riesgos",
    description:
      "4 niveles de alerta (Crítico, Alto, Medio, Bajo) sobre stock, demanda y capacidad. Identifica cuellos de botella antes de que afecten tu producción.",
    badge: "Inteligencia",
  },
  {
    icon: FileText,
    color: "#0b3d91",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    title: "Reportes y PDF",
    description:
      "Historial de optimizaciones, exportación de planes de producción en PDF, gráficas Plotly interactivas y región factible del ILP.",
    badge: "Reportes",
  },
  {
    icon: Users,
    color: "#6D28D9",
    bg: "#FAF5FF",
    border: "#E9D5FF",
    title: "Roles y Colegios",
    description:
      "Administrador, Operario y Vista. Soporte multi-colegio: cada taller gestiona múltiples clientes escolares con datos completamente aislados.",
    badge: "Multi-tenant",
  },
];

export default function Features() {
  return (
    <section id="features" className="section-padding relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(37,99,235,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-landing relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge badge-indigo inline-flex mb-4">Características</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Todo lo que necesita tu taller,{" "}
            <span className="gradient-text">nada que no</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-[15px] leading-relaxed">
            14 módulos integrados diseñados específicamente para la producción
            de uniformes escolares en Colombia.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                style={{ borderColor: feat.border }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top left, ${feat.bg} 0%, transparent 60%)`,
                  }}
                />

                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: feat.bg,
                      color: feat.color,
                      borderColor: feat.border,
                    }}
                  >
                    {feat.badge}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                  style={{ backgroundColor: feat.bg, borderColor: feat.border }}
                >
                  <Icon className="w-5 h-5" style={{ color: feat.color }} />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-[15px] text-gray-900 mb-2 pr-8 leading-snug">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
