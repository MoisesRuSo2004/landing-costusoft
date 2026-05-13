"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "¿Qué tipo de taller puede usar CostuSoft Control?",
    a: "Está diseñado específicamente para talleres de confección de uniformes escolares en Colombia. Si produces camisas, pantalones, suéteres, faldas u otras prendas para colegios, CostuSoft Control está hecho para ti.",
  },
  {
    q: "¿Qué hace la 'Optimización ILP' exactamente?",
    a: "El motor de Programación Lineal Entera (ILP) resuelve matemáticamente la pregunta: ¿cuántas unidades de cada prenda producir esta semana para maximizar la utilidad sin exceder el stock de insumos ni la demanda de pedidos? En segundos te da el plan óptimo con explicación de cada decisión.",
  },
  {
    q: "¿Cómo funciona la predicción de demanda?",
    a: "Usamos dos modelos: Prophet (de Meta) detecta patrones estacionales en el historial de pedidos — como los picos de inicio escolar. XGBoost refina la predicción con features adicionales. El resultado es una proyección semanal con intervalo de confianza superior al 95%.",
  },
  {
    q: "¿Necesito conocimientos de IA para usar el sistema?",
    a: "No. La IA trabaja en segundo plano. Tú simplemente registras tus pedidos e inventario, y el sistema te entrega predicciones y planes de producción en lenguaje sencillo. El asistente LLaMA 3.3 entiende preguntas en español natural.",
  },
  {
    q: "¿Puedo gestionar varios colegios clientes?",
    a: "Sí. CostuSoft Control es multi-colegio: puedes registrar todos tus clientes escolares, sus pedidos y uniformes. Los datos de cada colegio están completamente aislados y el optimizador puede trabajar por colegio o globalmente.",
  },
  {
    q: "¿Cómo se calculan los consumos de tela e insumos?",
    a: "La Calculadora Textil define coeficientes de consumo por prenda, tipo de uniforme y talla. Puedes configurarlos basándote en tus propias fichas técnicas o usar los valores sugeridos. El optimizador usa estos coeficientes para calcular si tienes suficiente material antes de comprometerte a producir.",
  },
  {
    q: "¿Mis datos están seguros?",
    a: "Sí. Los datos se almacenan en Supabase (PostgreSQL) con seguridad a nivel de fila. Cada taller accede únicamente a su información. Los servicios de IA procesan datos de forma temporal y no retienen información entre sesiones.",
  },
  {
    q: "¿Cuánto tiempo tarda en implementarse?",
    a: "La configuración inicial (usuarios, colegios, insumos base) toma aproximadamente 2-4 horas. Empezarás a ver predicciones útiles una vez tengas al menos 4 semanas de historial de pedidos registrado.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding relative overflow-hidden bg-[#F9FAFB]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(37,99,235,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-landing relative z-10">
        <div className="text-center mb-14">
          <div className="badge badge-cyan inline-flex mb-4">FAQ</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Preguntas <span className="gradient-text">frecuentes</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-[15px]">
            Todo lo que necesitas saber antes de empezar.
          </p>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                open === i
                  ? "border-blue-200 shadow-md shadow-blue-900/5"
                  : "border-gray-100 shadow-sm hover:border-gray-200"
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-[15px] font-medium text-gray-800 leading-snug">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-180 text-blue-600" : "text-gray-400"
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
