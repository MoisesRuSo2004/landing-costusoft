"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, TrendingUp } from "lucide-react";

interface SceneProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const CHAT_STEPS = [
  { role: "user", text: "¿Cuántas camisas debo producir en agosto?" },
  { role: "ai", text: "Basado en el historial de los últimos 3 años y la tendencia escolar, recomiendo producir **142 camisas** en agosto. Los colegios tienden a hacer pedidos rezagados en la 3ª semana. Considera aumentar un 12% el stock de tela navy." },
  { role: "user", text: "¿Cuál es el riesgo de desabastecimiento este mes?" },
  { role: "ai", text: "El riesgo es **MEDIO** (nivel 2/4). El drill azul tiene 185m y el consumo proyectado es 260m. Tienes 7 días para realizar la orden de compra antes de frenar producción. 🟡" },
];

// Fake forecast bars
const forecast = [
  { mes: "Jun", val: 68, actual: true },
  { mes: "Jul", val: 82, actual: true },
  { mes: "Ago", val: 95, actual: false },
  { mes: "Sep", val: 110, actual: false },
  { mes: "Oct", val: 88, actual: false },
  { mes: "Nov", val: 72, actual: false },
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#49c21b" }}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

export default function S8_IA({ onNext }: SceneProps) {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const [typedText, setTypedText] = useState<{ [k: number]: string }>({});
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const delays = [600, 1500, 4500, 5800];
    const timers: ReturnType<typeof setTimeout>[] = [];

    delays.forEach((delay, i) => {
      const t = setTimeout(() => {
        if (CHAT_STEPS[i].role === "ai") {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
            setVisibleSteps((p) => [...p, i]);
            // typewriter for ai
            const full = CHAT_STEPS[i].text;
            let idx = 0;
            const iv = setInterval(() => {
              idx++;
              setTypedText((p) => ({ ...p, [i]: full.slice(0, idx) }));
              if (idx >= full.length) clearInterval(iv);
            }, 14);
          }, 900);
        } else {
          setVisibleSteps((p) => [...p, i]);
          setTypedText((p) => ({ ...p, [i]: CHAT_STEPS[i].text }));
        }
      }, delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [visibleSteps, typing]);

  const maxForecast = Math.max(...forecast.map((f) => f.val));

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="min-h-full flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 px-4 sm:px-5 py-4 sm:py-6">
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 max-w-xs w-full flex-shrink-0"
      >
        <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase"
          style={{ background: "rgba(73,194,27,0.15)", border: "1px solid rgba(73,194,27,0.35)", color: "#86efac" }}>
          Escena 8 · ADMIN
        </div>

        <div>
          <h2 className="text-3xl font-black text-white leading-tight" style={{ fontFamily: "var(--font-sora)" }}>
            IA que <br />
            <span style={{ color: "#49c21b" }}>piensa contigo</span>
          </h2>
          <p className="text-[13px] text-white/50 leading-relaxed mt-3">
            El Admin consulta al asistente de IA powered by <strong className="text-white">LLaMA 3.3</strong>.
            Prophet y XGBoost generan el forecast de demanda para los próximos meses.
          </p>
        </div>

        {/* Models */}
        <div className="flex flex-col gap-2">
          {[
            { name: "LLaMA 3.3", desc: "Consultas en lenguaje natural", color: "#49c21b" },
            { name: "Prophet", desc: "Predicción temporal de demanda", color: "#2563eb" },
            { name: "XGBoost", desc: "Clasificación de riesgo (4 niveles)", color: "#f59e0b" },
          ].map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-2.5 p-2 rounded-lg"
              style={{ background: `${m.color}10`, border: `1px solid ${m.color}25` }}
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: m.color }}
              />
              <div>
                <div className="text-[11px] font-bold" style={{ color: m.color }}>{m.name}</div>
                <div className="text-[9px] text-white/40">{m.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Forecast mini chart */}
        <div className="p-3 rounded-xl" style={{ background: "rgba(73,194,27,0.05)", border: "1px solid rgba(73,194,27,0.2)" }}>
          <div className="text-[10px] font-bold text-green-400 mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" /> Forecast de prendas (Prophet)
          </div>
          <div className="flex items-end gap-1.5 h-16">
            {forecast.map((f, i) => (
              <div key={f.mes} className="flex flex-col items-center gap-1 flex-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(f.val / maxForecast) * 52}px` }}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                  className="w-full rounded-t-sm"
                  style={{
                    background: f.actual
                      ? "linear-gradient(180deg,#49c21b,#16a34a)"
                      : "linear-gradient(180deg,rgba(37,99,235,0.6),rgba(37,99,235,0.3))",
                    border: `1px solid ${f.actual ? "rgba(73,194,27,0.5)" : "rgba(37,99,235,0.3)"}`,
                  }}
                />
                <span className="text-[7px] text-white/30">{f.mes}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-1.5 text-[8px] text-white/30">
            <span><span className="inline-block w-2 h-2 rounded-sm mr-1" style={{ background: "#49c21b" }}></span>Real</span>
            <span><span className="inline-block w-2 h-2 rounded-sm mr-1" style={{ background: "#2563eb" }}></span>Predicción</span>
          </div>
        </div>

        <button onClick={onNext} className="text-[12px] text-white/35 hover:text-white/60 transition-colors self-start">
          Siguiente: dashboard final →
        </button>
      </motion.div>

      {/* Right: AI Chat */}
      <motion.div
        initial={{ opacity: 0, x: 30, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="w-full max-w-md flex-shrink-0"
      >
        <div className="rounded-2xl overflow-hidden flex flex-col"
          style={{ background: "rgba(5,12,24,0.9)", border: "1px solid rgba(73,194,27,0.3)", backdropFilter: "blur(10px)", height: "min(380px, 50vh)" }}>
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
            style={{ background: "rgba(73,194,27,0.08)", borderBottom: "1px solid rgba(73,194,27,0.2)" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#0b3d91,#49c21b)" }}>
              <Brain className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white">Asistente CostuSoft IA</div>
              <div className="flex items-center gap-1 text-[9px] text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                LLaMA 3.3 · en línea
              </div>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-green-400 ml-auto" />
          </div>

          {/* Messages */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5" style={{ scrollBehavior: "smooth" }}>
            <AnimatePresence>
              {CHAT_STEPS.map((step, i) =>
                visibleSteps.includes(i) ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${step.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[82%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed"
                      style={{
                        background: step.role === "user"
                          ? "rgba(37,99,235,0.25)"
                          : "rgba(73,194,27,0.12)",
                        border: `1px solid ${step.role === "user" ? "rgba(37,99,235,0.4)" : "rgba(73,194,27,0.3)"}`,
                        color: step.role === "user" ? "#bfdbfe" : "#d1fae5",
                        borderRadius: step.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      }}
                    >
                      {(typedText[i] || "").split("**").map((part, pi) =>
                        pi % 2 === 1
                          ? <strong key={pi} className="text-white">{part}</strong>
                          : <span key={pi}>{part}</span>
                      )}
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="rounded-2xl" style={{ background: "rgba(73,194,27,0.1)", border: "1px solid rgba(73,194,27,0.2)" }}>
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="flex-shrink-0 p-3 flex gap-2"
            style={{ borderTop: "1px solid rgba(73,194,27,0.12)" }}>
            <div className="flex-1 px-3 py-2 rounded-xl text-[10px] text-white/25"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              Pregunta algo sobre tu negocio...
            </div>
            <button className="px-3 py-2 rounded-xl text-[10px] font-bold text-white"
              style={{ background: "linear-gradient(135deg,#0b3d91,#49c21b)" }}>
              IA
            </button>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
