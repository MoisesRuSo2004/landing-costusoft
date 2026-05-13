"use client";

import { motion } from "framer-motion";
import {
  Zap, Brain, TrendingUp, AlertTriangle,
  CheckCircle2, Activity, Building2,
} from "lucide-react";

/* ── Helpers ──────────────────────────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial:    { opacity: 0, y: 18, scale: 0.97 },
  animate:    { opacity: 1, y: 0,  scale: 1    },
  transition: { duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] as const },
});

/* ── Data ─────────────────────────────────────────────────────────────── */
const production = [
  { name: "Camisa Escolar M",  qty: 340, pct: 100, value: "$1.2M", color: "#0b3d91" },
  { name: "Pantalón Drill M",  qty: 280, pct: 82,  value: "$980K", color: "#2563EB" },
  { name: "Suéter Escolar L",  qty: 190, pct: 56,  value: "$670K", color: "#49c21b" },
];

const stocks = [
  { name: "Tela azul poliéster", pct: 34, color: "#DC2626" },
  { name: "Hilo blanco 40/2",    pct: 71, color: "#2563EB" },
  { name: "Botón nácar 15mm",    pct: 58, color: "#16A34A" },
];

const forecast = [42, 55, 48, 68, 72, 65, 80, 76, 90, 95, 88, 100];

const colegios = [
  { name: "Col. Simón Bolívar", pedidos: 12, color: "#0b3d91" },
  { name: "Col. San José",      pedidos:  7, color: "#2563EB" },
  { name: "INEM Cartagena",     pedidos:  5, color: "#49c21b" },
];

/* ── Component ────────────────────────────────────────────────────────── */
export default function HeroVisual() {
  return (
    <div className="w-full mt-12 sm:mt-16 md:mt-20 max-w-5xl mx-auto px-1">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-2.5">

        {/* ────────────────────────────────────────────────────────────
            ILP Card  — col 1-5 / row 1-2
        ──────────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.25)}
          className="col-span-full md:col-span-5 md:row-span-2 bg-white rounded-2xl border border-blue-100
                     p-5 shadow-sm shadow-blue-900/5 relative overflow-hidden flex flex-col"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at top left, rgba(11,61,145,0.05) 0%, transparent 65%)" }}
          />

          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                <Zap className="w-3.5 h-3.5 text-blue-700" />
              </div>
              <span className="text-[12px] font-semibold text-gray-700 leading-tight">
                Plan óptimo de producción
              </span>
              <div className="ml-auto flex items-center gap-1 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-glow" />
                <span className="text-[10px] text-green-600 font-semibold">ILP activo</span>
              </div>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-3.5 mb-5 flex-1">
              {production.map((item, i) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-gray-600">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-gray-800">{item.qty} un.</span>
                      <span className="text-[11px] font-bold" style={{ color: item.color }}>
                        {item.value}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 0.9, delay: 0.7 + i * 0.15, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div
              className="rounded-xl p-3.5 border"
              style={{
                background: "linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)",
                borderColor: "#BBF7D0",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400 mb-0.5">Utilidad total proyectada</div>
                  <div className="text-[24px] font-black gradient-text leading-none">$4.8M COP</div>
                </div>
                <div
                  className="flex items-center gap-1.5 rounded-xl px-3 py-2 border"
                  style={{ background: "#F0FDF4", borderColor: "#86EFAC" }}
                >
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-[12px] font-bold text-green-700">ÓPTIMO</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────
            AI Chat Card  — col 6-9 / row 1
        ──────────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.38)}
          className="col-span-full md:col-span-4 bg-white rounded-2xl border border-purple-100
                     p-4 shadow-sm relative overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at top right, rgba(124,58,237,0.04) 0%, transparent 65%)" }}
          />
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #0b3d91, #49c21b)" }}
              >
                <Brain className="w-3 h-3 text-white" />
              </div>
              <span className="text-[11px] font-semibold text-gray-700">Asistente IA</span>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[9px] text-gray-400">LLaMA 3.3 70B</span>
              </div>
            </div>

            {/* User bubble */}
            <div className="flex justify-end mb-2">
              <div
                className="rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%]"
                style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}
              >
                <p className="text-[11px] text-gray-700">¿Qué prenda priorizar esta semana?</p>
              </div>
            </div>

            {/* AI bubble */}
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Brain className="w-2.5 h-2.5 text-green-600" />
              </div>
              <div
                className="flex-1 rounded-xl rounded-tl-sm px-3 py-2"
                style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }}
              >
                <p className="text-[10px] text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">Camisa Escolar M</strong> genera $1,500 COP/u de eficiencia.
                  Stock permite <strong className="text-blue-700">340 unidades</strong> → utilidad máxima.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────
            Metric Card  — col 10-12 / row 1
        ──────────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.46)}
          className="col-span-full md:col-span-3 bg-white rounded-2xl border border-emerald-100
                     p-4 shadow-sm relative overflow-hidden flex flex-col"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at bottom right, rgba(73,194,27,0.07) 0%, transparent 65%)" }}
          />
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-green-600" />
              <span className="text-[10px] font-semibold text-gray-500">Precisión predictiva</span>
            </div>
            <div
              className="text-[38px] font-black leading-none mb-0.5"
              style={{
                background: "linear-gradient(135deg, #16A34A, #49c21b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              97%
            </div>
            <div className="text-[10px] text-gray-400 mb-2">Prophet + XGBoost</div>
            {/* Sparkline */}
            <svg viewBox="0 0 80 24" className="w-full mt-auto" fill="none">
              <polyline
                points="0,20 10,17 20,18 30,11 40,13 50,7 60,9 70,4 80,2"
                stroke="#49c21b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              />
              <polyline
                points="0,20 10,17 20,18 30,11 40,13 50,7 60,9 70,4 80,2"
                stroke="rgba(73,194,27,0.12)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────
            Stock Card  — col 6-9 / row 2
        ──────────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.52)}
          className="col-span-full md:col-span-4 bg-white rounded-2xl border border-gray-100
                     p-4 shadow-sm relative overflow-hidden"
        >
          <div className="flex items-center gap-1.5 mb-3.5">
            <Activity className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-[11px] font-semibold text-gray-600">Stock de insumos</span>
          </div>
          <div className="flex flex-col gap-2.5 mb-3">
            {stocks.map((s, i) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gray-500 truncate max-w-[75%]">{s.name}</span>
                  <span className="text-[10px] font-bold" style={{ color: s.color }}>
                    {s.pct}%
                  </span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ duration: 0.85, delay: 0.9 + i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Alert */}
          <div
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
            style={{ background: "#FFF1F2", border: "1px solid #FECDD3" }}
          >
            <AlertTriangle className="w-3 h-3 text-red-500 flex-shrink-0" />
            <span className="text-[10px] text-red-600">
              Tela azul · Reponer en <strong>12 días</strong>
            </span>
          </div>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────
            Status Card  — col 10-12 / row 2
        ──────────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.57)}
          className="col-span-full md:col-span-3 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between"
          style={{ background: "linear-gradient(145deg, #071e4a 0%, #0b3d91 60%, #0a5c1e 100%)" }}
        >
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="relative z-10 flex flex-col gap-3 h-full">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-glow" />
              <span className="text-[10px] font-semibold text-blue-100">Sistema activo</span>
            </div>
            <div>
              <div className="text-[10px] text-white/50 mb-0.5">Última optimización</div>
              <div className="text-[13px] font-bold text-white">hace 3 minutos</div>
            </div>
            <div>
              <div className="text-[10px] text-white/50 mb-0.5">Pedidos en producción</div>
              <div className="text-[26px] font-black text-white leading-none">19</div>
            </div>
            <div className="mt-auto text-[9px] text-blue-300/70">
              Uptime 99.9% · Datos Colombia 🇨🇴
            </div>
          </div>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────
            Forecast Bar Chart  — col 1-8 / row 3
        ──────────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.62)}
          className="col-span-full md:col-span-8 bg-white rounded-2xl border border-blue-100
                     p-4 shadow-sm relative overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at bottom right, rgba(37,99,235,0.04) 0%, transparent 60%)" }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[11px] font-semibold text-gray-700">
                  Predicción de demanda · Próximas 12 semanas
                </span>
              </div>
              <div
                className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1D4ED8" }}
              >
                ▲ Pico escolar Sem. 3
              </div>
            </div>

            {/* Bars */}
            <div className="flex items-end gap-1 h-14">
              {forecast.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.04, ease: "easeOut" }}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${h}%`,
                    background:
                      i >= 7
                        ? "linear-gradient(to top, #0b3d91, #3B82F6)"
                        : i === 2
                        ? "linear-gradient(to top, #16A34A, #4ade80)"
                        : "#DBEAFE",
                    transformOrigin: "bottom",
                  }}
                />
              ))}
            </div>

            <div className="flex justify-between mt-1.5">
              <span className="text-[9px] text-gray-400">Sem 1</span>
              <span className="text-[9px] text-blue-500 font-medium">
                Prophet + XGBoost forecast →
              </span>
              <span className="text-[9px] text-gray-400">Sem 12</span>
            </div>
          </div>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────
            Colegios Card  — col 9-12 / row 3
        ──────────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.67)}
          className="col-span-full md:col-span-4 bg-white rounded-2xl border border-gray-100
                     p-4 shadow-sm"
        >
          <div className="flex items-center gap-1.5 mb-3">
            <Building2 className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
              Colegios activos
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {colegios.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: c.color }}
                />
                <span className="text-[11px] text-gray-600 flex-1 truncate">{c.name}</span>
                <span className="text-[10px] font-semibold text-gray-400">{c.pedidos} ped.</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-400">8 colegios en total</span>
            <span className="text-[10px] font-semibold text-blue-600">Multi-tenant →</span>
          </div>
        </motion.div>

      </div>

      {/* Glow bajo el bento */}
      <div
        className="mx-auto mt-2 w-2/3 h-8 blur-3xl pointer-events-none"
        style={{ background: "rgba(37,99,235,0.08)" }}
      />
    </div>
  );
}
