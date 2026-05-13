"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Menu, Info } from "lucide-react";

import S1_Intro from "./scenes/S1_Intro";
import S2_Roles from "./scenes/S2_Roles";
import S3_Pedido from "./scenes/S3_Pedido";
import S4_Cotizacion from "./scenes/S4_Cotizacion";
import S5_Inventario from "./scenes/S5_Inventario";
import S6_ILP from "./scenes/S6_ILP";
import S7_Produccion from "./scenes/S7_Produccion";
import S8_IA from "./scenes/S8_IA";
import S9_Dashboard from "./scenes/S9_Dashboard";
import InfoPanel, { type SceneInfo } from "./InfoPanel";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), { ssr: false });

// ── Scene metadata ────────────────────────────────────────
const SCENES: {
  id: number;
  title: string;
  component: React.ComponentType<SceneProps>;
  role: string | null;
  roleColor: string;
  info: SceneInfo;
}[] = [
  {
    id: 1, title: "Bienvenida", component: S1_Intro, role: null, roleColor: "#2563eb",
    info: {
      module: "Presentación del sistema",
      description: "CostuSoft Control es un sistema de gestión integral para talleres de confección escolar. Cubre el ciclo completo: pedido → inventario → producción → IA → entrega.",
      tables: [],
      endpoints: [],
      tech: ["Next.js 16", "React 19", "Tailwind v4", "Supabase", "Python 3.11"],
    },
  },
  {
    id: 2, title: "Los 4 Roles", component: S2_Roles, role: null, roleColor: "#49c21b",
    info: {
      module: "Gestión de usuarios y roles",
      description: "El sistema define 4 roles con permisos granulares: ADMIN (control total), USER/Secretaria (pedidos y confirmaciones), BODEGA (inventario y producción) e INSTITUCION (solicitar pedidos). Implementado con Row Level Security en Supabase.",
      tables: ["users", "roles", "user_roles"],
      endpoints: ["GET /api/users/me", "GET /api/roles", "PATCH /api/users/:id/rol"],
      tech: ["Supabase Auth", "JWT", "Row Level Security (RLS)", "PostgreSQL"],
    },
  },
  {
    id: 3, title: "Colegio pide", component: S3_Pedido, role: "INSTITUCIÓN", roleColor: "#7c3aed",
    info: {
      module: "Módulo de Pedidos — creación",
      description: "La institución crea un pedido especificando prendas, tallas y cantidades por grado. El pedido inicia en estado BORRADOR y queda pendiente de revisión por el usuario/secretaria del taller.",
      tables: ["pedidos", "detalle_pedido", "colegios", "prendas", "tallas"],
      endpoints: ["POST /api/pedidos", "GET /api/prendas", "GET /api/colegios/me"],
      tech: ["Next.js API Routes", "Supabase PostgreSQL", "Supabase Realtime"],
    },
  },
  {
    id: 4, title: "Confirmación", component: S4_Cotizacion, role: "USUARIO", roleColor: "#2563eb",
    info: {
      module: "Gestión de estados del pedido",
      description: "El usuario/secretaria revisa el detalle del pedido, agrega observaciones y lo mueve al estado CALCULADO. La máquina de estados controla las transiciones válidas: BORRADOR → CALCULADO → CONFIRMADO → EN_PRODUCCION → LISTO_PARA_ENTREGA → ENTREGADO.",
      tables: ["pedidos", "historial_estados", "notificaciones"],
      endpoints: ["PATCH /api/pedidos/:id/estado", "POST /api/notificaciones", "GET /api/pedidos/:id"],
      tech: ["Supabase PostgreSQL", "DB Triggers", "Supabase Realtime", "State Machine pattern"],
    },
  },
  {
    id: 5, title: "Inventario", component: S5_Inventario, role: "BODEGA", roleColor: "#f59e0b",
    info: {
      module: "Control de inventario en tiempo real",
      description: "El sistema verifica automáticamente si el stock de materias primas es suficiente para producir el pedido. Genera alertas cuando algún material está por debajo del mínimo y sugiere órdenes de compra.",
      tables: ["materias_primas", "movimientos_inventario", "alertas_stock", "unidades_medida"],
      endpoints: ["GET /api/inventario", "GET /api/inventario/verificar/:pedidoId", "POST /api/inventario/movimientos", "GET /api/inventario/alertas"],
      tech: ["Supabase PostgreSQL", "DB Triggers", "Cron jobs (Supabase Edge Functions)", "Real-time subscriptions"],
    },
  },
  {
    id: 6, title: "Optimización ILP", component: S6_ILP, role: "USUARIO", roleColor: "#2563eb",
    info: {
      module: "Microservicio de optimización ILP",
      description: "Microservicio independiente en Python que resuelve el problema de Programación Lineal Entera (ILP). Maximiza la eficiencia de producción considerando restricciones de stock, capacidad de máquinas, disponibilidad de operarias y plazos de entrega.",
      tables: ["planes_produccion", "asignaciones_ilp", "restricciones"],
      endpoints: ["POST /api/optimizacion/solve", "GET /api/optimizacion/plan/:id", "GET /api/optimizacion/status/:jobId"],
      tech: ["Python 3.11", "PuLP", "CBC Solver (COIN-OR)", "FastAPI", "Docker", "Celery (async jobs)"],
    },
  },
  {
    id: 7, title: "Producción", component: S7_Produccion, role: "BODEGA", roleColor: "#f59e0b",
    info: {
      module: "Gestión de órdenes de producción",
      description: "El encargado de bodega registra el avance en tiempo real por orden de producción. Cada actualización descuenta automáticamente las materias primas consumidas del inventario mediante un trigger de base de datos.",
      tables: ["ordenes_produccion", "avances_produccion", "operarias", "maquinas", "consumo_materiales"],
      endpoints: ["GET /api/produccion/ordenes", "PATCH /api/produccion/:id/avance", "GET /api/produccion/stats", "POST /api/produccion/completar/:id"],
      tech: ["Next.js API Routes", "Supabase Realtime", "PostgreSQL Triggers", "WebSockets"],
    },
  },
  {
    id: 8, title: "IA Predictiva", component: S8_IA, role: "ADMIN", roleColor: "#49c21b",
    info: {
      module: "Módulo de Inteligencia Artificial",
      description: "3 motores de IA integrados: LLaMA 3.3 para consultas en lenguaje natural sobre el negocio, Prophet para forecasting de demanda estacional, XGBoost para clasificar el nivel de riesgo de desabastecimiento en 4 niveles (BAJO, MEDIO, ALTO, CRÍTICO).",
      tables: ["consultas_ia", "predicciones_demanda", "historial_forecast", "niveles_riesgo"],
      endpoints: ["POST /api/ia/consulta", "GET /api/ia/forecast/:prenda", "GET /api/ia/riesgo", "GET /api/ia/recomendaciones"],
      tech: ["LLaMA 3.3 (Ollama)", "Prophet (Meta)", "XGBoost", "Python", "FastAPI", "Pandas", "scikit-learn"],
    },
  },
  {
    id: 9, title: "Dashboard 360°", component: S9_Dashboard, role: "ADMIN", roleColor: "#49c21b",
    info: {
      module: "Dashboard administrativo global",
      description: "Vista consolidada de todo el sistema con KPIs en tiempo real. El administrador tiene acceso a todos los módulos: pedidos, inventario, producción, IA, usuarios y configuración. Alertas críticas con priorización automática.",
      tables: ["(16 tablas del sistema completo)"],
      endpoints: ["GET /api/dashboard/resumen", "GET /api/dashboard/kpis", "GET /api/dashboard/alertas", "GET /api/dashboard/actividad"],
      tech: ["Next.js Server Components", "Supabase", "Framer Motion", "Chart.js", "Supabase Realtime"],
    },
  },
];

export interface SceneProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.96 }),
};

export default function DemoShell() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [transitionSignal, setTransitionSignal] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= SCENES.length) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
      setTransitionSignal((s) => s + 1);
      setInfoOpen(false);
    },
    [current]
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   goPrev();
      if (e.key === "Escape") {
        if (infoOpen) setInfoOpen(false);
        else window.location.href = "/";
      }
      if (e.key === "i" || e.key === "I") setInfoOpen((o) => !o);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, infoOpen]);

  const scene = SCENES[current];
  const SceneComponent = scene.component;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#050d1a]">
      {/* Three.js background */}
      <ThreeBackground
        sceneIndex={current}
        transitionSignal={transitionSignal}
        direction={direction}
      />

      {/* Dark radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(11,61,145,0.18) 0%, transparent 70%)" }}
      />

      {/* ── Layout: flex column fills the whole frame ── */}
      <div className="absolute inset-0 flex flex-col z-10">

      {/* ── Top bar ── */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-5 py-3.5 z-30"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", background: "rgba(5,13,26,0.55)" }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0" style={{ backgroundColor: "#0b3d91" }}>
            <Image src="/logo1.png" alt="CostuSoft" width={22} height={22} className="object-contain" />
          </div>
          <span className="text-[13px] font-semibold text-white/80 group-hover:text-white transition-colors">
            CostuSoft <span className="text-blue-400">Demo</span>
          </span>
        </a>

        {/* Scene pills — desktop */}
        <div className="hidden lg:flex items-center gap-0.5">
          {SCENES.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-200"
              style={{ color: i === current ? "#fff" : "rgba(255,255,255,0.35)", background: i === current ? "rgba(11,61,145,0.5)" : "transparent" }}
            >
              {i === current && (
                <motion.div
                  layoutId="pill"
                  className="absolute inset-0 rounded-md"
                  style={{ background: "rgba(37,99,235,0.3)", border: "1px solid rgba(37,99,235,0.5)" }}
                />
              )}
              <span className="relative z-10">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* ℹ button — always visible */}
          <motion.button
            onClick={() => setInfoOpen((o) => !o)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
            style={{
              background: infoOpen ? `${scene.roleColor}25` : "rgba(255,255,255,0.07)",
              border: `1px solid ${infoOpen ? scene.roleColor + "50" : "rgba(255,255,255,0.12)"}`,
              color: infoOpen ? scene.roleColor : "rgba(255,255,255,0.55)",
            }}
            title="Ver detalles técnicos (I)"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">¿Qué pasó?</span>
          </motion.button>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white/70 hover:text-white p-1">
            <Menu className="w-5 h-5" />
          </button>

          {/* Exit — desktop */}
          <a href="/" className="hidden lg:flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70 transition-colors">
            <X className="w-3.5 h-3.5" /> Salir
          </a>
        </div>
      </div>

      {/* ── Main scene — fills remaining space ── */}
      <div className="flex-1 min-h-0 relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <SceneComponent
              onNext={goNext}
              onPrev={goPrev}
              isFirst={current === 0}
              isLast={current === SCENES.length - 1}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom nav ── */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-5 py-3.5 z-30"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", background: "rgba(5,13,26,0.55)" }}
      >
        <button onClick={goPrev} disabled={current === 0}
          className="flex items-center gap-1.5 text-[13px] font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:text-white text-white/55">
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {SCENES.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? 24 : 8, height: 8,
                background: i === current ? s.roleColor : i < current ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)",
              }}
            />
          ))}
        </div>

        <button onClick={goNext} disabled={current === SCENES.length - 1}
          className="flex items-center gap-1.5 text-[13px] font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:text-white text-white/55">
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      </div>{/* end flex-col layout */}

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-[60px] inset-x-0 z-40 lg:hidden"
            style={{ background: "rgba(5,13,26,0.97)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            {SCENES.map((s, i) => (
              <button
                key={i}
                onClick={() => { goTo(i); setMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-white/5 transition-colors"
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{ background: i === current ? s.roleColor : "rgba(255,255,255,0.1)", color: "#fff" }}>
                  {i + 1}
                </span>
                <span className={`text-[13px] ${i === current ? "text-white font-medium" : "text-white/50"}`}>{s.title}</span>
                {s.role && (
                  <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{ background: `${s.roleColor}22`, color: s.roleColor, border: `1px solid ${s.roleColor}44` }}>
                    {s.role}
                  </span>
                )}
              </button>
            ))}
            <a href="/" className="w-full flex items-center gap-2 px-5 py-3 text-[13px] text-white/40 border-t border-white/5 hover:text-white/60 transition-colors">
              <X className="w-3.5 h-3.5" /> Salir del demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Role badge */}
      {scene.role && (
        <motion.div
          key={`role-${current}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-5 top-[70px] z-20 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide"
          style={{ background: `${scene.roleColor}22`, border: `1px solid ${scene.roleColor}55`, color: scene.roleColor }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: scene.roleColor }} />
          {scene.role}
        </motion.div>
      )}

      {/* Keyboard hint */}
      <div className="absolute bottom-[56px] right-5 z-20 hidden lg:flex items-center gap-1.5 text-[10px] text-white/18">
        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">←</kbd>
        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">→</kbd>
        <span>navegar</span>
        <span className="mx-1 opacity-50">·</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">I</kbd>
        <span>info</span>
      </div>

      {/* Info Panel */}
      <InfoPanel
        isOpen={infoOpen}
        onClose={() => setInfoOpen(false)}
        sceneTitle={scene.title}
        sceneNumber={scene.id}
        info={scene.info}
        roleColor={scene.roleColor}
      />
    </div>
  );
}
