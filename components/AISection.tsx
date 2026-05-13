"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, MessageSquare, TrendingUp, Cpu } from "lucide-react";
import Image from "next/image";

/* ── Textos del chat ─────────────────────────────────────────────────────── */
const Q1 = "¿Cuándo debo reponer la tela azul poliéster?";
const A1 = "Según el stock actual (34%) y la tasa de consumo de los últimos 30 días, se proyecta agotamiento en 12 días. Recomiendo emitir una orden de 500 metros esta semana para evitar paro de producción.";
const Q2 = "¿Qué prenda debo priorizar esta semana?";
const A2 = "El modelo ILP indica que la Camisa Escolar Masculina genera $1,500 COP/unidad de eficiencia por insumo escaso. Con el stock actual puedes producir 320 unidades y maximizar $480,000 COP de utilidad neta.";

/* ── Typing dots ─────────────────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div
      className="flex-1 rounded-2xl rounded-tl-sm px-4 py-3"
      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <div className="flex items-center gap-1.5 h-4">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#49c21b" }}
            animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Chat animation component ────────────────────────────────────────────── */
// Steps: 0=vacío · 1=Q1 · 2=typing1 · 3=A1 typewriter · 4=pausa1
//        5=Q2 · 6=typing2 · 7=A2 typewriter · 8=pausa2 · 9=reset
const STEP_DELAYS: Record<number, number> = {
  0: 900, 1: 750, 2: 2100, 4: 1700, 5: 750, 6: 2100, 8: 3600,
};

function ChatSimulation() {
  const [step,    setStep]    = useState(0);
  const [a1,      setA1]      = useState(0);
  const [a2,      setA2]      = useState(0);
  const [fading,  setFading]  = useState(false);

  /* paso principal */
  useEffect(() => {
    if (step === 3 || step === 7) return;
    if (step === 9) {
      setFading(true);
      const t = setTimeout(() => { setStep(0); setA1(0); setA2(0); setFading(false); }, 550);
      return () => clearTimeout(t);
    }
    if (!(step in STEP_DELAYS)) return;
    const t = setTimeout(() => setStep(s => s + 1), STEP_DELAYS[step]);
    return () => clearTimeout(t);
  }, [step]);

  /* typewriter A1 */
  useEffect(() => {
    if (step !== 3) return;
    if (a1 >= A1.length) { const t = setTimeout(() => setStep(4), 280); return () => clearTimeout(t); }
    const t = setTimeout(() => setA1(c => c + 1), 14);
    return () => clearTimeout(t);
  }, [step, a1]);

  /* typewriter A2 */
  useEffect(() => {
    if (step !== 7) return;
    if (a2 >= A2.length) { const t = setTimeout(() => setStep(8), 280); return () => clearTimeout(t); }
    const t = setTimeout(() => setA2(c => c + 1), 14);
    return () => clearTimeout(t);
  }, [step, a2]);

  const isTyping  = step === 2 || step === 6;
  const showQ1    = step >= 1 && !fading;
  const showT1    = step === 2;
  const showA1    = step >= 3 && !fading;
  const showQ2    = step >= 5 && !fading;
  const showT2    = step === 6;
  const showA2    = step >= 7 && !fading;

  const aiBubble  = "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5";
  const aiWrap    = "flex-1 rounded-2xl rounded-tl-sm px-4 py-3";
  const aiStyle   = { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" } as const;
  const tag       = "text-[9px] font-bold mb-1.5 uppercase tracking-wider px-1.5 py-0.5 rounded inline-block";
  const tagStyle  = { color: "#49c21b", backgroundColor: "rgba(73,194,27,0.15)" } as const;
  const cursor    = (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.5, repeat: Infinity }}
      className="inline-block w-[2px] h-[13px] bg-green-400 ml-0.5 align-middle rounded-full"
    />
  );

  return (
    <motion.div
      className="rounded-2xl overflow-hidden"
      animate={{
        borderColor: isTyping
          ? ["rgba(73,194,27,0.25)", "rgba(73,194,27,0.65)", "rgba(73,194,27,0.25)"]
          : "rgba(255,255,255,0.1)",
        boxShadow: isTyping
          ? ["0 0 0px rgba(73,194,27,0)", "0 0 24px rgba(73,194,27,0.18)", "0 0 0px rgba(73,194,27,0)"]
          : "0 0 0px rgba(0,0,0,0)",
      }}
      transition={{ duration: 1.4, repeat: isTyping ? Infinity : 0 }}
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
      >
        <motion.div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0b3d91, #49c21b)" }}
          animate={isTyping ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 1.2, repeat: isTyping ? Infinity : 0 }}
        >
          <Brain className="w-4 h-4 text-white" />
        </motion.div>
        <div>
          <div className="text-[13px] font-semibold text-white">Asistente CostuSoft Control</div>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] text-blue-300">
              {isTyping ? "Procesando consulta…" : "LLaMA 3.3 70B · En línea"}
            </span>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      <div className="p-5 flex flex-col gap-4 min-h-[260px]">
        <AnimatePresence>
          {showQ1 && (
            <motion.div key="q1"
              initial={{ opacity: 0, x: 22, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
              className="flex justify-end"
            >
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-3"
                style={{ background: "rgba(73,194,27,0.2)", border: "1px solid rgba(73,194,27,0.3)" }}>
                <p className="text-sm text-white">{Q1}</p>
              </div>
            </motion.div>
          )}

          {showT1 && (
            <motion.div key="t1"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              className="flex gap-2.5"
            >
              <div className={aiBubble} style={{ background: "rgba(73,194,27,0.2)" }}>
                <Brain className="w-3 h-3" style={{ color: "#49c21b" }} />
              </div>
              <TypingDots />
            </motion.div>
          )}

          {showA1 && (
            <motion.div key="a1"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex gap-2.5"
            >
              <div className={aiBubble} style={{ background: "rgba(73,194,27,0.2)" }}>
                <Brain className="w-3 h-3" style={{ color: "#49c21b" }} />
              </div>
              <div className={aiWrap} style={aiStyle}>
                <div className={tag} style={tagStyle}>Inventario</div>
                <p className="text-[12px] text-blue-100 leading-relaxed">
                  {A1.slice(0, a1)}{step === 3 && a1 < A1.length && cursor}
                </p>
              </div>
            </motion.div>
          )}

          {showQ2 && (
            <motion.div key="q2"
              initial={{ opacity: 0, x: 22, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
              className="flex justify-end"
            >
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-3"
                style={{ background: "rgba(73,194,27,0.2)", border: "1px solid rgba(73,194,27,0.3)" }}>
                <p className="text-sm text-white">{Q2}</p>
              </div>
            </motion.div>
          )}

          {showT2 && (
            <motion.div key="t2"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              className="flex gap-2.5"
            >
              <div className={aiBubble} style={{ background: "rgba(73,194,27,0.2)" }}>
                <Brain className="w-3 h-3" style={{ color: "#49c21b" }} />
              </div>
              <TypingDots />
            </motion.div>
          )}

          {showA2 && (
            <motion.div key="a2"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex gap-2.5"
            >
              <div className={aiBubble} style={{ background: "rgba(73,194,27,0.2)" }}>
                <Brain className="w-3 h-3" style={{ color: "#49c21b" }} />
              </div>
              <div className={aiWrap} style={aiStyle}>
                <div className={tag} style={tagStyle}>Optimización</div>
                <p className="text-[12px] text-blue-100 leading-relaxed">
                  {A2.slice(0, a2)}{step === 7 && a2 < A2.length && cursor}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div className="px-5 pb-5">
        <motion.div
          className="flex items-center gap-2 rounded-xl px-4 py-3"
          animate={{ borderColor: isTyping ? "rgba(73,194,27,0.3)" : "rgba(255,255,255,0.1)" }}
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <MessageSquare className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span className="text-[12px] text-blue-400 flex-1">
            {isTyping ? "Procesando consulta con IA…" : "Pregunta algo sobre tu taller…"}
          </span>
          {isTyping && (
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div key={i} className="w-1 h-1 rounded-full bg-green-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14 }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

const models = [
  {
    name: "LLaMA 3.3 70B",
    desc: "Motor NLP — consultas en lenguaje natural",
    color: "#49c21b",
  },
  {
    name: "Prophet",
    desc: "Series de tiempo — estacionalidad escolar",
    color: "#7dd3fc",
  },
  {
    name: "XGBoost",
    desc: "Refinamiento predictivo con features avanzadas",
    color: "#86efac",
  },
  {
    name: "PuLP + CBC",
    desc: "ILP — optimización de producción",
    color: "#c4b5fd",
  },
];

export default function AISection() {
  return (
    <section
      id="ai"
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, #071e4a 0%, #0b3d91 45%, #0a5c1e 100%)",
      }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Logo — esquina inferior-derecha flotando */}
      <div
        className="absolute bottom-[-40px] right-[-40px] pointer-events-none select-none"
        aria-hidden="true"
        style={{
          width: 280,
          height: 280,
          opacity: 0.06,
          filter: "brightness(0) invert(1)",
          transform: "rotate(15deg)",
        }}
      >
        <Image src="/logo1.png" alt="" fill className="object-contain" />
      </div>

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(73,194,27,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(11,61,145,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="container-landing relative z-10">
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 badge mb-4"
            style={{
              background: "rgba(73,194,27,0.15)",
              border: "1px solid rgba(73,194,27,0.3)",
              color: "#49c21b",
            }}
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

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Chat animado */}
          <ChatSimulation />

          {/* Right side */}
          <div className="flex flex-col gap-5">
            {/* AI Stack */}
            <div
              className="rounded-2xl p-6 border"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Cpu className="w-4 h-4" style={{ color: "#49c21b" }} />
                <span className="text-sm font-semibold text-white">
                  Stack de IA
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {models.map((m, mi) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <motion.div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: m.color }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, delay: mi * 0.5 }}
                    />
                    <div>
                      <div className="text-[13px] font-semibold text-white">
                        {m.name}
                      </div>
                      <div className="text-[11px] text-blue-300">{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Query types */}
            <div
              className="rounded-2xl p-6 border"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-blue-300" />
                <span className="text-sm font-semibold text-white">
                  9 tipos de consulta
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Stock crítico",
                  "Prenda a priorizar",
                  "Predicción demanda",
                  "Riesgo de pedido",
                  "Consumo de insumo",
                  "Plan de producción",
                  "Historial colegio",
                  "Alerta de reorden",
                  "Resumen ejecutivo",
                ].map((q) => (
                  <div
                    key={q}
                    className="text-[11px] text-blue-200 rounded-lg px-3 py-2"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
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
                background:
                  "linear-gradient(135deg, rgba(73,194,27,0.15) 0%, rgba(11,61,145,0.2) 100%)",
                borderColor: "rgba(73,194,27,0.3)",
              }}
            >
              <div
                className="text-3xl sm:text-4xl font-black mb-1"
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
                Precisión en predicciones de demanda escolar. Prophet captura
                estacionalidad; XGBoost la refina.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
