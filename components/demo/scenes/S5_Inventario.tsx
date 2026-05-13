"use client";

import { motion } from "framer-motion";
import { Package, AlertTriangle, CheckCircle2, TrendingDown } from "lucide-react";

interface SceneProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const materiales = [
  { nombre: "Tela Oxford gris", stock: 420, requerido: 380, unidad: "metros", alerta: false },
  { nombre: "Tela drill azul navy", stock: 185, requerido: 260, unidad: "metros", alerta: true },
  { nombre: "Hilo poliéster gris", stock: 48, requerido: 30, unidad: "conos", alerta: false },
  { nombre: "Botones escolares", stock: 840, requerido: 600, unidad: "unidades", alerta: false },
  { nombre: "Cremallera 20cm", stock: 52, requerido: 52, unidad: "unidades", alerta: false },
  { nombre: "Entretela fusionable", stock: 12, requerido: 40, unidad: "metros", alerta: true },
];

export default function S5_Inventario({ onNext }: SceneProps) {
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
          Escena 5 · BODEGA
        </div>

        <div>
          <h2 className="text-3xl font-black text-white leading-tight" style={{ fontFamily: "var(--font-sora)" }}>
            Verificar <br />
            <span style={{ color: "#fbbf24" }}>el inventario</span>
          </h2>
          <p className="text-[13px] text-white/50 leading-relaxed mt-3">
            Bodega revisa si hay suficientes materias primas para producir el pedido.
            El sistema muestra en tiempo real qué falta y cuánto hay que comprar.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { icon: CheckCircle2, color: "#49c21b", text: "4 materiales suficientes" },
            { icon: AlertTriangle, color: "#f59e0b", text: "2 materiales por debajo" },
            { icon: TrendingDown, color: "#ef4444", text: "75m tela navy faltante" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.1 }}
              className="flex items-center gap-2.5"
            >
              <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: item.color }} />
              <span className="text-[12px] text-white/65">{item.text}</span>
            </motion.div>
          ))}
        </div>

        <div className="p-3 rounded-xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}>
          <div className="text-[10px] font-bold text-amber-400 mb-1">Acción recomendada</div>
          <p className="text-[11px] text-white/55 leading-relaxed">
            Generar orden de compra para <strong className="text-white">75m tela drill azul navy</strong> y
            <strong className="text-white"> 28m entretela fusionable</strong> antes de confirmar producción.
          </p>
        </div>

        <button onClick={onNext} className="text-[12px] text-white/35 hover:text-white/60 transition-colors self-start">
          Siguiente: optimización ILP →
        </button>
      </motion.div>

      {/* Right: Inventory panel */}
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
              <Package className="w-4 h-4 text-amber-400" />
              <span className="text-[12px] font-bold text-white">Materias primas · Pedido #2025-047</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold"
              style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", padding: "2px 8px", borderRadius: 20 }}>
              <AlertTriangle className="w-3 h-3" />
              2 alertas
            </div>
          </div>

          <div className="p-4 flex flex-col gap-2">
            {materiales.map((mat, i) => {
              const pct = Math.min((mat.stock / mat.requerido) * 100, 100);
              const ok = mat.stock >= mat.requerido;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-2.5 rounded-xl"
                  style={{
                    background: mat.alerta ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${mat.alerta ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {mat.alerta
                        ? <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0" />
                        : <CheckCircle2 className="w-3 h-3 text-green-400 flex-shrink-0" />
                      }
                      <span className="text-[11px] font-medium text-white/80">{mat.nombre}</span>
                    </div>
                    <div className="text-[9px] text-white/40">
                      <span className={ok ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{mat.stock}</span>
                      {" / "}{mat.requerido} {mat.unidad}
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: ok ? "linear-gradient(90deg,#49c21b,#86efac)" : "linear-gradient(90deg,#ef4444,#fca5a5)" }}
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-2 mt-1"
            >
              <button className="flex-1 py-2 rounded-xl text-[10px] font-bold text-amber-300"
                style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}>
                Generar orden de compra
              </button>
              <button className="flex-1 py-2 rounded-xl text-[10px] font-bold text-white"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                Continuar sin comprar
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
