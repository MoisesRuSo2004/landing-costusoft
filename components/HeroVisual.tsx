"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Zap, Brain, TrendingUp, AlertTriangle,
  CheckCircle2, Activity, Building2,
} from "lucide-react";

function CountUp({ target, inView, delay = 0 }: { target: number; inView: boolean; delay?: number }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 16 });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => mv.set(target), delay);
    return () => clearTimeout(t);
  }, [inView, target, mv, delay]);
  useEffect(() => {
    const unsub = spring.on("change", v => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);
  return <>{display}</>;
}

/* ── Helpers ──────────────────────────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial:    { opacity: 0, y: 18, scale: 0.97 },
  animate:    { opacity: 1, y: 0,  scale: 1    },
  transition: { duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] as const },
});

/* ── Estilos glass reutilizables ──────────────────────────────────────── */
const glass = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.10)",
} as const;

const glassDim = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
} as const;

/* ── Data ─────────────────────────────────────────────────────────────── */
const production = [
  { name: "Camisa Escolar M",  qty: 340, pct: 100, value: "$1.2M", color: "#49c21b" },
  { name: "Pantalón Drill M",  qty: 280, pct: 82,  value: "$980K", color: "#3B82F6" },
  { name: "Suéter Escolar L",  qty: 190, pct: 56,  value: "$670K", color: "#7dd3fc" },
];

const stocks = [
  { name: "Tela azul poliéster", pct: 34, color: "#f87171" },
  { name: "Hilo blanco 40/2",    pct: 71, color: "#60a5fa" },
  { name: "Botón nácar 15mm",    pct: 58, color: "#4ade80" },
];

const forecast = [42, 55, 48, 68, 72, 65, 80, 76, 90, 95, 88, 100];

const colegios = [
  { name: "Col. Simón Bolívar", pedidos: 12, color: "#7dd3fc" },
  { name: "Col. San José",      pedidos:  7, color: "#60a5fa" },
  { name: "INEM Cartagena",     pedidos:  5, color: "#4ade80" },
];

/* ── Component ────────────────────────────────────────────────────────── */
export default function HeroVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="w-full mt-12 sm:mt-16 md:mt-20 max-w-5xl mx-auto px-1">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-2.5">

        {/* ── ILP Card — col 1-5 / row 1-2 ──────────────────────────── */}
        <motion.div
          {...fadeUp(0.25)}
          className="col-span-full md:col-span-5 md:row-span-2 rounded-2xl p-5 relative overflow-hidden flex flex-col"
          style={glass}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at top left, rgba(73,194,27,0.08) 0%, transparent 65%)" }}
          />

          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(73,194,27,0.2)", border: "1px solid rgba(73,194,27,0.3)" }}
              >
                <Zap className="w-3.5 h-3.5" style={{ color: "#49c21b" }} />
              </div>
              <span className="text-[12px] font-semibold text-white leading-tight">
                Plan óptimo de producción
              </span>
              <div className="ml-auto flex items-center gap-1 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-glow" />
                <span className="text-[10px] font-semibold" style={{ color: "#4ade80" }}>ILP activo</span>
              </div>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-3.5 mb-5 flex-1">
              {production.map((item, i) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-blue-200">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-white">{item.qty} un.</span>
                      <span className="text-[11px] font-bold" style={{ color: item.color }}>
                        {item.value}
                      </span>
                    </div>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 0.9, delay: 0.7 + i * 0.15, ease: "easeOut" }}
                      className="h-full rounded-full relative overflow-hidden"
                      style={{ backgroundColor: item.color }}
                    >
                      <motion.span
                        className="absolute inset-y-0 w-8 -skew-x-12"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)" }}
                        initial={{ left: "-2rem" }}
                        animate={{ left: ["−2rem", "110%"] }}
                        transition={{ duration: 0.7, delay: 1.7 + i * 0.15, ease: "easeInOut", repeat: Infinity, repeatDelay: 3.5 }}
                      />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div
              className="rounded-xl p-3.5"
              style={{
                background: "linear-gradient(135deg, rgba(73,194,27,0.18) 0%, rgba(11,61,145,0.25) 100%)",
                border: "1px solid rgba(73,194,27,0.35)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-blue-300/70 mb-0.5">Utilidad total proyectada</div>
                  <div
                    className="text-[24px] font-black leading-none"
                    style={{
                      background: "linear-gradient(135deg, #49c21b, #7dd3fc)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    $4.8M COP
                  </div>
                </div>
                <div
                  className="flex items-center gap-1.5 rounded-xl px-3 py-2"
                  style={{ background: "rgba(73,194,27,0.2)", border: "1px solid rgba(73,194,27,0.35)" }}
                >
                  <CheckCircle2 className="w-4 h-4" style={{ color: "#4ade80" }} />
                  <span className="text-[12px] font-bold" style={{ color: "#4ade80" }}>ÓPTIMO</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── AI Chat Card — col 6-9 / row 1 ───────────────────────── */}
        <motion.div
          {...fadeUp(0.38)}
          className="col-span-full md:col-span-4 rounded-2xl p-4 relative overflow-hidden"
          style={glass}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at top right, rgba(124,58,237,0.06) 0%, transparent 65%)" }}
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
              <span className="text-[11px] font-semibold text-white">Asistente IA</span>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[9px] text-blue-300">LLaMA 3.3 70B</span>
              </div>
            </div>

            {/* User bubble */}
            <div className="flex justify-end mb-2">
              <div
                className="rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%]"
                style={{ background: "rgba(73,194,27,0.20)", border: "1px solid rgba(73,194,27,0.30)" }}
              >
                <p className="text-[11px] text-white">¿Qué prenda priorizar esta semana?</p>
              </div>
            </div>

            {/* AI bubble */}
            <div className="flex gap-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(73,194,27,0.2)", border: "1px solid rgba(73,194,27,0.3)" }}
              >
                <Brain className="w-2.5 h-2.5" style={{ color: "#49c21b" }} />
              </div>
              <div
                className="flex-1 rounded-xl rounded-tl-sm px-3 py-2"
                style={glassDim}
              >
                <p className="text-[10px] text-blue-100 leading-relaxed">
                  <strong className="text-white">Camisa Escolar M</strong> genera $1,500 COP/u de eficiencia.
                  Stock permite <strong style={{ color: "#7dd3fc" }}>340 unidades</strong> → utilidad máxima.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Metric Card — col 10-12 / row 1 ──────────────────────── */}
        <motion.div
          {...fadeUp(0.46)}
          className="col-span-full md:col-span-3 rounded-2xl p-4 relative overflow-hidden flex flex-col"
          style={glass}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at bottom right, rgba(73,194,27,0.09) 0%, transparent 65%)" }}
          />
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-3.5 h-3.5" style={{ color: "#4ade80" }} />
              <span className="text-[10px] font-semibold text-blue-300">Precisión predictiva</span>
            </div>
            <div
              className="text-[38px] font-black leading-none mb-0.5"
              style={{
                background: "linear-gradient(135deg, #49c21b, #7dd3fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <CountUp target={97} inView={inView} delay={400} />%
            </div>
            <div className="text-[10px] text-blue-400 mb-2">Prophet + XGBoost</div>
            {/* Sparkline */}
            <svg viewBox="0 0 80 24" className="w-full mt-auto" fill="none">
              <polyline
                points="0,20 10,17 20,18 30,11 40,13 50,7 60,9 70,4 80,2"
                stroke="#49c21b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              />
              <polyline
                points="0,20 10,17 20,18 30,11 40,13 50,7 60,9 70,4 80,2"
                stroke="rgba(73,194,27,0.15)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* ── Stock Card — col 6-9 / row 2 ─────────────────────────── */}
        <motion.div
          {...fadeUp(0.52)}
          className="col-span-full md:col-span-4 rounded-2xl p-4 relative overflow-hidden"
          style={glass}
        >
          <div className="flex items-center gap-1.5 mb-3.5">
            <Activity className="w-3.5 h-3.5 text-blue-300" />
            <span className="text-[11px] font-semibold text-white">Stock de insumos</span>
          </div>
          <div className="flex flex-col gap-2.5 mb-3">
            {stocks.map((s, i) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-blue-200 truncate max-w-[75%]">{s.name}</span>
                  <span className="text-[10px] font-bold" style={{ color: s.color }}>
                    {s.pct}%
                  </span>
                </div>
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ duration: 0.85, delay: 0.9 + i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ backgroundColor: s.color }}
                  >
                    <motion.span
                      className="absolute inset-y-0 w-6 -skew-x-12"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }}
                      initial={{ left: "-1.5rem" }}
                      animate={{ left: ["−1.5rem", "110%"] }}
                      transition={{ duration: 0.6, delay: 1.8 + i * 0.12, ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          {/* Alert */}
          <div
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
            style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.30)" }}
          >
            <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0" />
            <span className="text-[10px] text-red-300">
              Tela azul · Reponer en <strong className="text-red-200">12 días</strong>
            </span>
          </div>
        </motion.div>

        {/* ── Status Card — col 10-12 / row 2 ──────────────────────── */}
        <motion.div
          {...fadeUp(0.57)}
          className="col-span-full md:col-span-3 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            background: "linear-gradient(145deg, #0d2a6e 0%, #134e4a 60%, #0a3d1a 100%)",
            backgroundSize: "200% 200%",
            border: "1px solid rgba(73,194,27,0.25)",
          }}
        >
          <div className="absolute inset-0 grid-bg opacity-15" />
          <div className="relative z-10 flex flex-col gap-3 h-full">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-glow" />
              <span className="text-[10px] font-semibold" style={{ color: "#86efac" }}>Sistema activo</span>
            </div>
            <div>
              <div className="text-[10px] text-white/40 mb-0.5">Última optimización</div>
              <div className="text-[13px] font-bold text-white">hace 3 minutos</div>
            </div>
            <div>
              <div className="text-[10px] text-white/40 mb-0.5">Pedidos en producción</div>
              <div
                className="text-[26px] font-black leading-none"
                style={{
                  background: "linear-gradient(135deg, #ffffff, #49c21b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <CountUp target={19} inView={inView} delay={800} />
              </div>
            </div>
            <div className="mt-auto text-[9px] text-blue-300/60">
              Uptime 99.9% · Datos Colombia 🇨🇴
            </div>
          </div>
        </motion.div>

        {/* ── Forecast Chart — col 1-8 / row 3 ─────────────────────── */}
        <motion.div
          {...fadeUp(0.62)}
          className="col-span-full md:col-span-8 rounded-2xl p-4 relative overflow-hidden"
          style={glass}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at bottom right, rgba(37,99,235,0.07) 0%, transparent 60%)" }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[11px] font-semibold text-white">
                  Predicción de demanda · Próximas 12 semanas
                </span>
              </div>
              <div
                className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(73,194,27,0.18)", border: "1px solid rgba(73,194,27,0.30)", color: "#86efac" }}
              >
                ▲ Pico escolar Sem. 3
              </div>
            </div>

            {/* Bars + scan line */}
            <div className="flex items-end gap-1 h-14 relative overflow-hidden">
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
                        ? "linear-gradient(to top, #49c21b, #86efac)"
                        : i === 2
                        ? "linear-gradient(to top, #0b3d91, #60a5fa)"
                        : "rgba(255,255,255,0.12)",
                    transformOrigin: "bottom",
                  }}
                />
              ))}
              <motion.div
                className="absolute inset-y-0 w-[2px] pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(73,194,27,0.7), transparent)" }}
                animate={{ left: ["-2px", "calc(100% + 2px)"] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                aria-hidden="true"
              />
            </div>

            <div className="flex justify-between mt-1.5">
              <span className="text-[9px] text-blue-400">Sem 1</span>
              <span className="text-[9px] font-medium" style={{ color: "#86efac" }}>
                Prophet + XGBoost forecast →
              </span>
              <span className="text-[9px] text-blue-400">Sem 12</span>
            </div>
          </div>
        </motion.div>

        {/* ── Colegios Card — col 9-12 / row 3 ─────────────────────── */}
        <motion.div
          {...fadeUp(0.67)}
          className="col-span-full md:col-span-4 rounded-2xl p-4"
          style={glass}
        >
          <div className="flex items-center gap-1.5 mb-3">
            <Building2 className="w-3.5 h-3.5 text-blue-300" />
            <span className="text-[10px] font-semibold text-blue-300 uppercase tracking-wider">
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
                <span className="text-[11px] text-blue-100 flex-1 truncate">{c.name}</span>
                <span className="text-[10px] font-semibold text-blue-400">{c.pedidos} ped.</span>
              </div>
            ))}
          </div>
          <div
            className="mt-3 pt-2.5 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span className="text-[10px] text-blue-400">8 colegios en total</span>
            <span className="text-[10px] font-semibold" style={{ color: "#7dd3fc" }}>Multi-tenant →</span>
          </div>
        </motion.div>

      </div>

      {/* Glow bajo el bento */}
      <div
        className="mx-auto mt-2 w-2/3 h-8 blur-3xl pointer-events-none"
        style={{ background: "rgba(73,194,27,0.10)" }}
      />
    </div>
  );
}
