"use client";

import { X, Check } from "lucide-react";

const before = [
  "Inventario en cuadernos o Excel sin sync en tiempo real",
  "Pedidos perdidos por falta de stock sin saberlo",
  "Producción empírica — confías en el 'ojo' del operario",
  "Sin predicción de demanda escolar por temporada",
  "Errores de tela por no calcular consumos exactos",
  "Cuellos de botella que solo notas cuando es tarde",
];

const after = [
  "Stock en tiempo real con alertas de reorden automáticas",
  "Pedidos trazados del detalle a la entrega, sin omisiones",
  "ILP resuelve: ¿qué y cuánto producir para maximizar utilidad?",
  "Prophet + XGBoost predicen demanda con 95%+ de confianza",
  "Calculadora textil: consumos exactos por prenda y talla",
  "Tablero de riesgos con 4 niveles de alerta accionable",
];

export default function Problem() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#F9FAFB]">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(37,99,235,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container-landing relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge badge-cyan inline-flex mb-4">
            El problema real
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Las empresas pierden dinero <br className="hidden sm:block" />
            <span className="gradient-text">
              que no saben que están perdiendo
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-[15px] leading-relaxed">
            Sin datos en tiempo real, cada decisión de producción es una
            apuesta. CostuSoft Control convierte incertidumbre en precisión.
          </p>
        </div>

        {/* Before / After */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Before */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-red-100 shadow-sm">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center">
                <X className="w-4 h-4 text-red-500" />
              </div>
              <span className="font-semibold text-red-600">
                Sin CostuSoft Control
              </span>
            </div>
            <ul className="flex flex-col gap-3.5">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-2.5 h-2.5 text-red-400" />
                  </div>
                  <span className="text-sm text-gray-500 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-green-100 shadow-sm relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(22,163,74,0.06) 0%, transparent 70%)",
              }}
            />
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-semibold text-green-700">
                Con CostuSoft Control
              </span>
            </div>
            <ul className="flex flex-col gap-3.5">
              {after.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
