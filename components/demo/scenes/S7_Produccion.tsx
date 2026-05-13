"use client";

import { motion } from "framer-motion";
import { Package, Clock, Hammer, CheckCircle2, AlertCircle } from "lucide-react";

interface SceneProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const ordenes = [
  {
    id: "OP-2025-047-A",
    prenda: "Camisa manga larga",
    cant: 100,
    prog: 72,
    estado: "EN_PRODUCCION",
    operaria: "María García",
    maquina: "M-03",
    semana: 1,
    color: "#f59e0b",
  },
  {
    id: "OP-2025-047-B",
    prenda: "Pantalón escolar",
    cant: 100,
    prog: 0,
    estado: "PENDIENTE",
    operaria: "—",
    maquina: "—",
    semana: 2,
    color: "#6b7280",
  },
  {
    id: "OP-2025-047-C",
    prenda: "Falda tableada",
    cant: 52,
    prog: 0,
    estado: "PENDIENTE",
    operaria: "—",
    maquina: "—",
    semana: 2,
    color: "#6b7280",
  },
];

const timeline = [
  { label: "Confirmado", done: true },
  { label: "En producción", done: true, active: true },
  { label: "Listo para entrega", done: false },
  { label: "Entregado", done: false },
];

export default function S7_Produccion({ onNext }: SceneProps) {
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
          style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.35)", color: "#fbbf24" }}>
          Escena 7 · BODEGA
        </div>

        <div>
          <h2 className="text-3xl font-black text-white leading-tight" style={{ fontFamily: "var(--font-sora)" }}>
            Taller en <br />
            <span style={{ color: "#fbbf24" }}>plena producción</span>
          </h2>
          <p className="text-[13px] text-white/50 leading-relaxed mt-3">
            Con el plan ILP aprobado, Bodega registra el avance en tiempo real.
            Cada operaria reporta su progreso y el sistema descuenta el material consumido automáticamente.
          </p>
        </div>

        {/* Mini timeline */}
        <div className="flex items-center gap-0">
          {timeline.map((t, i) => (
            <div key={i} className="flex items-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
                  style={{
                    background: t.done ? (t.active ? "#f59e0b" : "#49c21b") : "rgba(255,255,255,0.1)",
                    border: t.active ? "2px solid #fcd34d" : "none",
                  }}>
                  {t.done && !t.active ? "✓" : i + 1}
                </div>
                <span className="text-[8px] text-white/40 text-center w-14 leading-tight">{t.label}</span>
              </motion.div>
              {i < timeline.length - 1 && (
                <div className="h-px w-6 -mt-3" style={{ background: i < 1 ? "#49c21b" : "rgba(255,255,255,0.1)" }} />
              )}
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}>
          <div className="text-[10px] font-bold text-amber-400 mb-1.5">Semana 1 — en curso</div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-white/50">Progreso general</span>
            <span className="font-bold text-amber-300">24% (72/252)</span>
          </div>
          <div className="mt-1.5 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "24%" }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #f59e0b, #fcd34d)" }}
            />
          </div>
        </div>

        <button onClick={onNext} className="text-[12px] text-white/35 hover:text-white/60 transition-colors self-start">
          Siguiente: IA predictiva →
        </button>
      </motion.div>

      {/* Right: Production board */}
      <motion.div
        initial={{ opacity: 0, x: 30, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="w-full max-w-md flex-shrink-0"
      >
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(10,20,40,0.8)", border: "1px solid rgba(245,158,11,0.3)", backdropFilter: "blur(10px)" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3"
            style={{ background: "rgba(245,158,11,0.08)", borderBottom: "1px solid rgba(245,158,11,0.2)" }}>
            <div className="flex items-center gap-2">
              <Hammer className="w-4 h-4 text-amber-400" />
              <span className="text-[12px] font-bold text-white">Panel de producción</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-amber-300">
              <Clock className="w-3 h-3" />
              Semana 1 de 2
            </div>
          </div>

          <div className="p-4 flex flex-col gap-3">
            {ordenes.map((ord, i) => (
              <motion.div
                key={ord.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.12 }}
                className="p-3 rounded-xl"
                style={{
                  background: ord.estado === "EN_PRODUCCION" ? "rgba(245,158,11,0.08)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${ord.estado === "EN_PRODUCCION" ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-white/80">{ord.prenda}</span>
                      <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full"
                        style={{
                          background: ord.estado === "EN_PRODUCCION" ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.06)",
                          color: ord.estado === "EN_PRODUCCION" ? "#fcd34d" : "#9ca3af",
                          border: `1px solid ${ord.estado === "EN_PRODUCCION" ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.1)"}`,
                        }}>
                        {ord.estado}
                      </span>
                    </div>
                    <div className="text-[9px] text-white/30 mt-0.5">{ord.id} · {ord.cant} uds. · Semana {ord.semana}</div>
                  </div>
                  {ord.estado === "EN_PRODUCCION"
                    ? <Package className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    : <Clock className="w-4 h-4 text-white/20 flex-shrink-0" />
                  }
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ord.prog}%` }}
                      transition={{ duration: 1, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: ord.prog > 0 ? "linear-gradient(90deg,#f59e0b,#fcd34d)" : "rgba(255,255,255,0.1)" }}
                    />
                  </div>
                  <span className="text-[9px] font-bold" style={{ color: ord.prog > 0 ? "#fbbf24" : "#4b5563", minWidth: 28, textAlign: "right" }}>
                    {ord.prog}%
                  </span>
                </div>

                {ord.estado === "EN_PRODUCCION" && (
                  <div className="flex items-center gap-3 text-[9px] text-white/35">
                    <span>Operaria: <strong className="text-white/55">{ord.operaria}</strong></span>
                    <span>Máquina: <strong className="text-white/55">{ord.maquina}</strong></span>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Quick update */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-2"
            >
              <input
                readOnly
                value="Registrar avance manual..."
                className="flex-1 px-3 py-1.5 rounded-lg text-[10px] text-white/30 cursor-not-allowed outline-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
              <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-amber-300"
                style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}>
                Actualizar
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
