"use client";

import { motion } from "framer-motion";
import { Shield, Package, AlertTriangle, CheckCircle2, BarChart3, Users, TrendingUp, ArrowRight, Smartphone } from "lucide-react";
import QRCode from "react-qr-code";

interface SceneProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const kpis = [
  { label: "Pedidos activos",   value: "12",    icon: Package,    color: "#2563eb", delta: "+3"  },
  { label: "En producción",     value: "4",     icon: BarChart3,  color: "#f59e0b", delta: "→"   },
  { label: "Colegios activos",  value: "8",     icon: Users,      color: "#7c3aed", delta: "+1"  },
  { label: "Prendas este mes",  value: "1.240", icon: TrendingUp, color: "#49c21b", delta: "+18%"},
];

const alerts = [
  { type: "warn", text: "Tela navy por debajo del mínimo (185/260m)", color: "#f59e0b" },
  { type: "warn", text: "Pedido #2025-046 sin confirmar (3 días)",    color: "#ef4444" },
  { type: "ok",   text: "OP-2025-047-A al 72% — entrega en tiempo",  color: "#49c21b" },
  { type: "ok",   text: "Forecast agosto: +12% vs año anterior",      color: "#49c21b" },
];

const recentOrders = [
  { id: "2025-047", colegio: "Simón Bolívar",  estado: "EN_PRODUCCION", prendas: 252, color: "#f59e0b" },
  { id: "2025-046", colegio: "La Salle Norte", estado: "CALCULADO",      prendas: 180, color: "#2563eb" },
  { id: "2025-045", colegio: "San José",        estado: "ENTREGADO",      prendas: 320, color: "#49c21b" },
  { id: "2025-044", colegio: "Nuevo Horizonte", estado: "CONFIRMADO",     prendas: 95,  color: "#60a5fa" },
];

export default function S9_Dashboard({ onPrev }: SceneProps) {
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="min-h-full flex flex-col px-4 sm:px-5 py-3 sm:py-5 gap-3 sm:gap-4">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between flex-shrink-0"
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-1"
              style={{ background: "rgba(73,194,27,0.15)", border: "1px solid rgba(73,194,27,0.35)", color: "#86efac" }}
            >
              Escena 9 · ADMIN
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight" style={{ fontFamily: "var(--font-sora)" }}>
              Dashboard <span style={{ color: "#49c21b" }}>360°</span>
            </h2>
          </div>
          <Shield className="w-7 h-7 sm:w-9 sm:h-9 text-green-400 opacity-30 flex-shrink-0" />
        </motion.div>

        {/* ── KPIs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 flex-shrink-0"
        >
          {kpis.map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="relative p-2.5 sm:p-3 rounded-xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${kpi.color}25` }}
            >
              <div className="absolute top-0 inset-x-0 h-0.5"
                style={{ background: `linear-gradient(90deg,transparent,${kpi.color},transparent)` }} />
              <div className="flex items-start justify-between mb-1.5">
                <kpi.icon className="w-3.5 h-3.5 opacity-60" style={{ color: kpi.color }} />
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: `${kpi.color}18`, color: kpi.color }}>
                  {kpi.delta}
                </span>
              </div>
              <div className="text-[15px] sm:text-[17px] font-black text-white leading-none">{kpi.value}</div>
              <div className="text-[9px] text-white/40 mt-0.5 leading-tight">{kpi.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Alerts + Orders ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 min-h-0">
          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="p-3 sm:p-4 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-bold text-white">Alertas del sistema</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {alerts.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.38 + i * 0.07 }}
                  className="flex items-start gap-2 p-2 rounded-lg"
                  style={{ background: `${a.color}08`, border: `1px solid ${a.color}22` }}
                >
                  {a.type === "ok"
                    ? <CheckCircle2 className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: a.color }} />
                    : <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: a.color }} />
                  }
                  <span className="text-[10px] text-white/60 leading-tight">{a.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Orders */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="p-3 sm:p-4 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[11px] font-bold text-white">Pedidos recientes</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {recentOrders.map((ord, i) => (
                <motion.div
                  key={ord.id}
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.38 + i * 0.07 }}
                  className="flex items-center justify-between p-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="min-w-0 mr-2">
                    <div className="text-[10px] font-bold text-white/80 truncate">{ord.colegio}</div>
                    <div className="text-[9px] text-white/30">#{ord.id} · {ord.prendas} prendas</div>
                  </div>
                  <span className="text-[8px] font-black px-2 py-1 rounded-full flex-shrink-0"
                    style={{ background: `${ord.color}20`, color: ord.color, border: `1px solid ${ord.color}40` }}>
                    {ord.estado.replace(/_/g, " ")}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── CTA + QR ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 flex-shrink-0 pb-1"
        >
          {/* QR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 22 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-2xl"
            style={{ background: "rgba(73,194,27,0.07)", border: "1px solid rgba(73,194,27,0.25)" }}
          >
            <div className="p-1.5 rounded-lg bg-white flex-shrink-0">
              <QRCode
                value="https://app.costusoft.com"
                size={64}
                fgColor="#0b3d91"
                bgColor="#ffffff"
                level="M"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-green-400 uppercase tracking-wide mb-0.5">
                <Smartphone className="w-3 h-3" />
                Escanea y entra ya
              </div>
              <div className="text-[10px] text-white/40 leading-tight">app.costusoft.com</div>
              <div className="text-[9px] text-white/25 leading-tight mt-0.5">Sistema real · live</div>
            </div>
          </motion.div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <a
              href="mailto:contacto@costusoft.com"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-bold text-white transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg,#0b3d91,#1a5cc8,#49c21b)",
                boxShadow: "0 4px 20px rgba(11,61,145,0.4)",
              }}
            >
              Solicitar demo real <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://app.costusoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-medium text-white/70 hover:text-white transition-all"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              Ir al sistema →
            </a>
            <button
              onClick={onPrev}
              className="text-[11px] text-white/25 hover:text-white/50 transition-colors text-center sm:text-left"
            >
              ← Ver de nuevo
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
