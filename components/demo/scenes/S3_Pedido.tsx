"use client";

import { motion } from "framer-motion";
import { GraduationCap, ShoppingCart, CheckCircle2, ChevronDown } from "lucide-react";

interface SceneProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const items = [
  { prenda: "Camisa manga larga", color: "Azul navy", tallas: ["6", "8", "10", "12", "14"], cantidades: [22, 18, 25, 20, 15] },
  { prenda: "Pantalón escolar", color: "Gris Oxford", tallas: ["6", "8", "10", "12", "14"], cantidades: [22, 18, 25, 20, 15] },
  { prenda: "Falda tableada", color: "Gris cuadros", tallas: ["6", "8", "10", "12"], cantidades: [14, 12, 16, 10] },
];
// sin manejo de precios — solo cantidades y tallas

export default function S3_Pedido({ onNext }: SceneProps) {
  const total = items.flatMap((i) => i.cantidades).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="min-h-full flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 px-4 sm:px-5 py-4 sm:py-6">
      {/* Left: explanation */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-col gap-4 max-w-xs w-full flex-shrink-0"
      >
        <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase"
          style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#7c3aed" }}>
          Escena 3 · INSTITUCIÓN
        </div>

        <div>
          <h2 className="text-3xl font-black text-white leading-tight" style={{ fontFamily: "var(--font-sora)" }}>
            El colegio <br />
            <span style={{ color: "#7c3aed" }}>hace su pedido</span>
          </h2>
          <p className="text-[13px] text-white/50 leading-relaxed mt-3">
            La coordinadora del colegio ingresa al sistema con su usuario INSTITUCIÓN
            y solicita los uniformes que necesita para el año escolar.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {[
            "Selecciona el catálogo de prendas",
            "Elige tallas y cantidades por grado",
            "Agrega notas especiales",
            "Envía la solicitud al taller",
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{ background: "rgba(124,58,237,0.3)", color: "#7c3aed", border: "1px solid rgba(124,58,237,0.5)" }}>
                {i + 1}
              </div>
              <span className="text-[12px] text-white/65">{step}</span>
            </motion.div>
          ))}
        </div>

        <button onClick={onNext} className="mt-2 text-[12px] text-white/35 hover:text-white/60 transition-colors self-start">
          Siguiente: cotización →
        </button>
      </motion.div>

      {/* Right: UI mockup */}
      <motion.div
        initial={{ opacity: 0, x: 30, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-md flex-shrink-0"
      >
        {/* Browser frame */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(10,20,40,0.8)", border: "1px solid rgba(124,58,237,0.3)", backdropFilter: "blur(10px)" }}>
          {/* Tab bar */}
          <div className="flex items-center gap-2 px-4 py-2.5"
            style={{ background: "rgba(124,58,237,0.08)", borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-md text-[10px] text-white/30 mx-2"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <GraduationCap className="w-3 h-3 text-purple-400" />
              app.costusoft.com · Solicitar Pedido
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-bold text-white">Nuevo Pedido</div>
                <div className="text-[10px] text-white/40">Colegio Simón Bolívar · 2025</div>
              </div>
              <span className="text-[9px] font-black px-2 py-1 rounded-full"
                style={{ background: "rgba(124,58,237,0.2)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.4)" }}>
                BORRADOR
              </span>
            </div>

            {/* Table */}
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="grid grid-cols-3 px-3 py-1.5 text-[9px] font-bold text-white/30 uppercase tracking-wider"
                style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span>Prenda</span>
                <span className="text-center">Tallas</span>
                <span className="text-right">Uds.</span>
              </div>
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className="grid grid-cols-3 px-3 py-2 items-center"
                  style={{ borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                >
                  <div>
                    <div className="text-[10px] font-medium text-white/80 leading-tight">{item.prenda}</div>
                    <div className="text-[9px] text-white/30">{item.color}</div>
                  </div>
                  <div className="flex justify-center gap-0.5">
                    {item.tallas.map((t) => (
                      <span key={t} className="text-[8px] w-4 h-4 flex items-center justify-center rounded font-medium"
                        style={{ background: "rgba(124,58,237,0.2)", color: "#a78bfa" }}>{t}</span>
                    ))}
                  </div>
                  <div className="text-[11px] font-bold text-white/70 text-right">
                    {item.cantidades.reduce((a, b) => a + b, 0)}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total + actions */}
            <div className="flex items-center justify-between pt-1">
              <div className="text-[11px] text-white/40">
                Total: <span className="font-bold text-white">{total} prendas</span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg text-[10px] font-semibold text-white/50"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Guardar
                </button>
                <motion.button
                  animate={{ boxShadow: ["0 0 0px rgba(124,58,237,0)", "0 0 16px rgba(124,58,237,0.5)", "0 0 0px rgba(124,58,237,0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
                  <ShoppingCart className="w-3 h-3" />
                  Enviar pedido
                </motion.button>
              </div>
            </div>

            {/* Sent confirmation */}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex items-center gap-2 p-2.5 rounded-xl"
              style={{ background: "rgba(73,194,27,0.1)", border: "1px solid rgba(73,194,27,0.25)" }}
            >
              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-green-400">Pedido enviado al taller</div>
                <div className="text-[9px] text-white/35">La secretaria recibirá una notificación ahora mismo</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
