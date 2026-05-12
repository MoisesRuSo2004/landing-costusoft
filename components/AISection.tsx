"use client";

import { Brain, MessageSquare, TrendingUp, Cpu } from "lucide-react";

const queries = [
  {
    q: "¿Cuándo debo reponer la tela azul poliéster?",
    a: "Según el stock actual (34%) y la tasa de consumo de los últimos 30 días, se proyecta agotamiento en 12 días. Recomiendo emitir una orden de 500 metros esta semana para evitar paro de producción.",
    tag: "Inventario",
    tagColor: "#49c21b",
    tagBg: "rgba(73,194,27,0.15)",
  },
  {
    q: "¿Qué prenda debo priorizar esta semana?",
    a: "El modelo ILP indica que la Camisa Escolar Masculina genera $1,500 COP/unidad de eficiencia por insumo escaso. Con el stock actual puedes producir 320 unidades y maximizar $480,000 COP de utilidad neta.",
    tag: "Optimización",
    tagColor: "#49c21b",
    tagBg: "rgba(73,194,27,0.15)",
  },
];

const models = [
  { name: "LLaMA 3.3 70B", desc: "Motor NLP — consultas en lenguaje natural", color: "#49c21b" },
  { name: "Prophet", desc: "Series de tiempo — estacionalidad escolar", color: "#7dd3fc" },
  { name: "XGBoost", desc: "Refinamiento predictivo con features avanzadas", color: "#86efac" },
  { name: "PuLP + CBC", desc: "ILP — optimización de producción", color: "#c4b5fd" },
];

export default function AISection() {
  return (
    <section
      id="ai"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #071e4a 0%, #0b3d91 45%, #0a5c1e 100%)" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(73,194,27,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(11,61,145,0.3) 0%, transparent 70%)" }}
      />

      <div className="container-landing relative z-10">
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 badge mb-4"
            style={{ background: "rgba(73,194,27,0.15)", border: "1px solid rgba(73,194,27,0.3)", color: "#49c21b" }}
          >
            <Brain className="w-3.5 h-3.5" />
            Inteligencia Artificial
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Tu asesor de producción{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #49c21b 0%, #7dd3fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              en lenguaje natural
            </span>
          </h2>
          <p className="text-blue-200 max-w-xl mx-auto text-[15px] leading-relaxed">
            LLaMA 3.3 70B entiende tu taller. Responde 9 tipos de consultas
            sobre inventario, pedidos, predicción y optimización.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Chat mockup */}
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 border-b"
              style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0b3d91, #49c21b)" }}>
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-white">Asistente CostuSoft</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[10px] text-blue-300">LLaMA 3.3 70B · En línea</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-5 flex flex-col gap-4">
              {queries.map((q, i) => (
                <div key={i} className="flex flex-col gap-2.5">
                  <div className="flex justify-end">
                    <div
                      className="max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-3"
                      style={{ background: "rgba(73,194,27,0.2)", border: "1px solid rgba(73,194,27,0.3)" }}
                    >
                      <p className="text-sm text-white">{q.q}</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(73,194,27,0.2)" }}
                    >
                      <Brain className="w-3 h-3" style={{ color: "#49c21b" }} />
                    </div>
                    <div
                      className="flex-1 rounded-2xl rounded-tl-sm px-4 py-3"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <div
                        className="text-[9px] font-bold mb-1.5 uppercase tracking-wider px-1.5 py-0.5 rounded inline-block"
                        style={{ color: q.tagColor, backgroundColor: q.tagBg }}
                      >
                        {q.tag}
                      </div>
                      <p className="text-[12px] text-blue-100 leading-relaxed">{q.a}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div
                className="mt-1 flex items-center gap-2 rounded-xl px-4 py-3"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <MessageSquare className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-[12px] text-blue-400">Pregunta algo sobre tu taller...</span>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col gap-5">
            {/* AI Stack */}
            <div
              className="rounded-2xl p-6 border"
              style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Cpu className="w-4 h-4" style={{ color: "#49c21b" }} />
                <span className="text-sm font-semibold text-white">Stack de IA</span>
              </div>
              <div className="flex flex-col gap-4">
                {models.map((m) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: m.color }}
                    />
                    <div>
                      <div className="text-[13px] font-semibold text-white">{m.name}</div>
                      <div className="text-[11px] text-blue-300">{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Query types */}
            <div
              className="rounded-2xl p-6 border"
              style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-blue-300" />
                <span className="text-sm font-semibold text-white">9 tipos de consulta</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Stock crítico", "Prenda a priorizar", "Predicción demanda",
                  "Riesgo de pedido", "Consumo de insumo", "Plan de producción",
                  "Historial colegio", "Alerta de reorden", "Resumen ejecutivo",
                ].map((q) => (
                  <div
                    key={q}
                    className="text-[11px] text-blue-200 rounded-lg px-3 py-2"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {q}
                  </div>
                ))}
              </div>
            </div>

            {/* Metric */}
            <div
              className="rounded-2xl p-5 border"
              style={{
                background: "linear-gradient(135deg, rgba(73,194,27,0.15) 0%, rgba(11,61,145,0.2) 100%)",
                borderColor: "rgba(73,194,27,0.3)",
              }}
            >
              <div
                className="text-4xl font-black mb-1"
                style={{
                  fontFamily: "var(--font-sora)",
                  background: "linear-gradient(135deg, #49c21b, #7dd3fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                95%+
              </div>
              <div className="text-sm text-blue-200 leading-relaxed">
                Precisión en predicciones de demanda escolar.
                Prophet captura estacionalidad; XGBoost la refina.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
