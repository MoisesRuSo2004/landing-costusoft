"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Zap, CheckCircle2, TrendingUp } from "lucide-react";

interface SceneProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const constraints = [
  "Stock tela Oxford: 420m ≥ 380m ✓",
  "Stock tela navy: 185m < 260m ⚠️",
  "Capacidad máquinas: 8 unid/h",
  "Horas disponibles: 40h/semana",
  "Prioridad: Camisa > Pantalón > Falda",
];

const solution = [
  { prenda: "Camisa manga larga", semana: 1, qty: 100, horas: 12.5 },
  { prenda: "Pantalón escolar", semana: 2, qty: 100, horas: 12.5 },
  { prenda: "Falda tableada", semana: 2, qty: 52, horas: 6.5 },
];

export default function S6_ILP({ onNext }: SceneProps) {
  const [step, setStep] = useState(0); // 0=idle, 1=solving, 2=done

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

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
          style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.35)", color: "#60a5fa" }}>
          Escena 6 · USUARIO
        </div>

        <div>
          <h2 className="text-3xl font-black text-white leading-tight" style={{ fontFamily: "var(--font-sora)" }}>
            Optimización <br />
            <span style={{ color: "#60a5fa" }}>ILP en acción</span>
          </h2>
          <p className="text-[13px] text-white/50 leading-relaxed mt-3">
            El motor de <strong className="text-white">Programación Lineal Entera (ILP)</strong> con
            PuLP + CBC calcula el plan de producción óptimo considerando stock,
            capacidad y plazos de entrega.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {[
            "Modela restricciones de inventario",
            "Maximiza eficiencia de máquinas",
            "Minimiza tiempo de entrega",
            "Genera plan semana a semana",
          ].map((txt, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#60a5fa" }} />
              <span className="text-[12px] text-white/60">{txt}</span>
            </motion.div>
          ))}
        </div>

        <div className="p-3 rounded-xl" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
          <div className="text-[10px] font-bold text-blue-400 mb-1">Motor de optimización</div>
          <div className="flex items-center gap-2 text-[11px] text-white/55">
            <span className="px-2 py-0.5 rounded text-[9px] font-bold" style={{ background: "rgba(37,99,235,0.3)", color: "#93c5fd" }}>PuLP</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold" style={{ background: "rgba(73,194,27,0.2)", color: "#86efac" }}>CBC Solver</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold" style={{ background: "rgba(124,58,237,0.2)", color: "#c4b5fd" }}>Python 3.11</span>
          </div>
        </div>

        <button onClick={onNext} className="text-[12px] text-white/35 hover:text-white/60 transition-colors self-start">
          Siguiente: producción →
        </button>
      </motion.div>

      {/* Right: ILP Solver UI */}
      <motion.div
        initial={{ opacity: 0, x: 30, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="w-full max-w-md flex-shrink-0"
      >
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(5,10,20,0.9)", border: "1px solid rgba(37,99,235,0.3)", backdropFilter: "blur(10px)" }}>
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2.5"
            style={{ background: "rgba(37,99,235,0.1)", borderBottom: "1px solid rgba(37,99,235,0.2)" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <Cpu className="w-3.5 h-3.5 text-blue-400 ml-2" />
            <span className="text-[10px] font-mono text-white/60">optimizacion-service · ILP solver</span>
            <div className="ml-auto flex items-center gap-1.5 text-[9px] font-bold"
              style={{
                color: step === 0 ? "#60a5fa" : step === 1 ? "#fbbf24" : "#49c21b",
                background: step === 0 ? "rgba(37,99,235,0.15)" : step === 1 ? "rgba(245,158,11,0.15)" : "rgba(73,194,27,0.15)",
                border: `1px solid ${step === 0 ? "rgba(37,99,235,0.3)" : step === 1 ? "rgba(245,158,11,0.3)" : "rgba(73,194,27,0.3)"}`,
                padding: "2px 8px", borderRadius: 20,
              }}>
              <span className={`w-1.5 h-1.5 rounded-full ${step === 1 ? "animate-pulse" : ""}`}
                style={{ background: step === 0 ? "#60a5fa" : step === 1 ? "#fbbf24" : "#49c21b" }} />
              {step === 0 ? "Listo" : step === 1 ? "Resolviendo…" : "Óptimo hallado"}
            </div>
          </div>

          {/* Terminal body */}
          <div className="p-4 font-mono text-[10px] flex flex-col gap-1 min-h-[100px]"
            style={{ color: "#94a3b8" }}>
            <div className="text-green-400">$ python solve_ilp.py --pedido=2025-047</div>
            <div>Cargando restricciones... <span className="text-white/40">(5 variables)</span></div>
            <div>Materiales OK: {"{"}tela_oxford, hilo, botones, cremallera{"}"}</div>
            <div className="text-yellow-400">⚠ Stock insuficiente: tela_navy (deficit: 75m)</div>
            <div>Ajustando plan con stock disponible...</div>

            <AnimatePresence>
              {step >= 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-1">
                  <div className="text-blue-400">Iniciando CBC solver...</div>
                  {["Iteración 1/200", "Iteración 47/200", "Iteración 89/200", "Solución factible encontrada"].map((l, i) => (
                    <motion.div key={l} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.35 }}
                      className={i === 3 ? "text-green-400" : ""}>
                      {l}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 font-bold">
                  ✓ Status: OPTIMAL · Obj. value: 31.5h
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Solution table */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 pb-4 flex flex-col gap-2"
              >
                <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(73,194,27,0.4), transparent)" }} />
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Plan óptimo de producción
                </div>
                {solution.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-center justify-between p-2 rounded-lg"
                    style={{ background: "rgba(73,194,27,0.06)", border: "1px solid rgba(73,194,27,0.15)" }}
                  >
                    <div>
                      <div className="text-[10px] font-medium text-white/80">{s.prenda}</div>
                      <div className="text-[9px] text-white/35">Semana {s.semana}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-bold text-green-400">{s.qty} uds.</div>
                      <div className="text-[9px] text-white/35">{s.horas}h máquina</div>
                    </div>
                  </motion.div>
                ))}
                <div className="flex items-center gap-1.5 text-[10px] text-white/40 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  Eficiencia: 95.8% · Entrega estimada: 2 semanas
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
