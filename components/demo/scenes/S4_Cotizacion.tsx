"use client";

import { motion } from "framer-motion";
import { Zap, Bell, FileText, ClipboardCheck, ArrowRight, CheckCircle2 } from "lucide-react";

interface SceneProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const detallePedido = [
  { prenda: "Camisa manga larga", tallas: "6 – 14", total: 100 },
  { prenda: "Pantalón escolar", tallas: "6 – 14", total: 100 },
  { prenda: "Falda tableada", tallas: "6 – 12", total: 52 },
];

const estados = [
  { key: "BORRADOR", label: "Borrador", done: true },
  { key: "CALCULADO", label: "Calculado", done: true, active: true },
  { key: "CONFIRMADO", label: "Confirmado", done: false },
  { key: "EN_PRODUCCION", label: "Producción", done: false },
  { key: "ENTREGADO", label: "Entregado", done: false },
];

export default function S4_Cotizacion({ onNext }: SceneProps) {
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
          Escena 4 · USUARIO
        </div>

        <div>
          <h2 className="text-3xl font-black text-white leading-tight" style={{ fontFamily: "var(--font-sora)" }}>
            Usuario revisa <br />
            <span style={{ color: "#60a5fa" }}>y confirma</span>
          </h2>
          <p className="text-[13px] text-white/50 leading-relaxed mt-3">
            El usuario (secretaria) recibe la notificación del pedido, verifica
            las prendas y cantidades, agrega observaciones si es necesario
            y cambia el estado a <strong className="text-white">CALCULADO</strong>.
            Cuando el taller aprueba → <strong className="text-white">CONFIRMADO</strong>.
          </p>
        </div>

        {/* State machine */}
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Estado del pedido</div>
          <div className="flex flex-col gap-1.5">
            {estados.map((e, i) => (
              <motion.div
                key={e.key}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0"
                  style={{
                    background: e.done ? (e.active ? "#2563eb" : "rgba(73,194,27,0.8)") : "rgba(255,255,255,0.08)",
                    border: e.active ? "2px solid #60a5fa" : "none",
                  }}>
                  {e.done && !e.active ? "✓" : i + 1}
                </div>
                <span className={`text-[11px] ${e.active ? "text-white font-semibold" : e.done ? "text-green-400" : "text-white/30"}`}>
                  {e.label}
                </span>
                {e.active && (
                  <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse"
                    style={{ background: "rgba(37,99,235,0.3)", color: "#60a5fa" }}>
                    ACTUAL
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <button onClick={onNext} className="mt-2 text-[12px] text-white/35 hover:text-white/60 transition-colors self-start">
          Siguiente: revisar inventario →
        </button>
      </motion.div>

      {/* Right: Revisión de pedido mockup */}
      <motion.div
        initial={{ opacity: 0, x: 30, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="w-full max-w-md flex-shrink-0"
      >
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(10,20,40,0.8)", border: "1px solid rgba(37,99,235,0.3)", backdropFilter: "blur(10px)" }}>
          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-3"
            style={{ background: "rgba(37,99,235,0.1)", borderBottom: "1px solid rgba(37,99,235,0.2)" }}>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-[12px] font-bold text-white">Revisión de pedido</span>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1.5 text-[10px] font-medium"
              style={{ color: "#fbbf24" }}
            >
              <Bell className="w-3 h-3" />
              1 pedido pendiente
            </motion.div>
          </div>

          <div className="p-4 flex flex-col gap-3">
            {/* Pedido info */}
            <div className="flex items-center justify-between p-2.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div>
                <div className="text-[11px] font-bold text-white">Colegio Simón Bolívar</div>
                <div className="text-[9px] text-white/35">Pedido #2025-047 · Recibido hace 2 min</div>
              </div>
              <FileText className="w-4 h-4 text-white/30" />
            </div>

            {/* Detalle prendas */}
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="grid grid-cols-3 px-3 py-1.5 text-[9px] font-bold text-white/30 uppercase"
                style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span>Prenda</span>
                <span className="text-center">Tallas</span>
                <span className="text-right">Total uds.</span>
              </div>
              {detallePedido.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className="grid grid-cols-3 px-3 py-2 items-center"
                  style={{ borderBottom: i < detallePedido.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                >
                  <span className="text-[10px] text-white/70">{item.prenda}</span>
                  <span className="text-[10px] text-white/45 text-center">{item.tallas}</span>
                  <span className="text-[11px] font-bold text-blue-300 text-right">{item.total}</span>
                </motion.div>
              ))}
            </div>

            {/* Total prendas */}
            <div className="flex items-center justify-between px-1"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 8 }}>
              <span className="text-[11px] text-white/40">Total prendas solicitadas</span>
              <span className="text-[13px] font-black text-white">252</span>
            </div>

            {/* Observaciones */}
            <div className="p-2.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="text-[9px] font-bold text-white/30 uppercase mb-1.5">Observaciones del usuario</div>
              <p className="text-[10px] text-white/50 leading-relaxed">
                Verificar que las tallas 6 y 8 incluyan bordado del escudo. Entrega preferida semana del 14 de julio.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl text-[10px] font-semibold text-white/50"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                Pedir ajustes
              </button>
              <motion.button
                animate={{ boxShadow: ["0 0 0px rgba(37,99,235,0)", "0 0 20px rgba(37,99,235,0.6)", "0 0 0px rgba(37,99,235,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-bold text-white"
                style={{ background: "linear-gradient(135deg, #1d4ed8, #2563eb)" }}>
                <ClipboardCheck className="w-3.5 h-3.5" />
                Confirmar pedido <ArrowRight className="w-3 h-3" />
              </motion.button>
            </div>

            {/* Confirmed toast */}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="flex items-center gap-2 p-2.5 rounded-xl"
              style={{ background: "rgba(73,194,27,0.1)", border: "1px solid rgba(73,194,27,0.25)" }}
            >
              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-green-400">Pedido confirmado → CALCULADO</div>
                <div className="text-[9px] text-white/35">Bodega recibirá notificación para verificar stock</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
