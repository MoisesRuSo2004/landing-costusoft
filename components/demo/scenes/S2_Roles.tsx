"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Package, GraduationCap, ChevronRight } from "lucide-react";

interface SceneProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const roles = [
  {
    id: "ADMIN",
    label: "Administrador",
    icon: Shield,
    color: "#49c21b",
    bgColor: "#49c21b",
    desc: "Visión 360° del negocio. Acceso a todos los módulos, reportes avanzados, IA predictiva y configuración del sistema.",
    perms: ["Dashboard global", "Reportes y métricas", "IA predictiva", "Gestión de usuarios", "Configuración", "Alertas críticas"],
  },
  {
    id: "USUARIO",
    label: "Usuario / Secretaria",
    icon: Zap,
    color: "#2563eb",
    bgColor: "#2563eb",
    desc: "Gestiona pedidos, confirma órdenes y hace seguimiento del estado de cada solicitud en el taller.",
    perms: ["Crear pedidos", "Confirmar órdenes", "Ver inventario", "Notificar colegios", "Calculadora textil", "Seguimiento de estados"],
  },
  {
    id: "BODEGA",
    label: "Encargado Bodega",
    icon: Package,
    color: "#f59e0b",
    bgColor: "#f59e0b",
    desc: "Controla el inventario en tiempo real, gestiona materias primas y actualiza el estado de producción.",
    perms: ["Control de stock", "Movimientos material", "Estado producción", "Alertas de agotamiento", "Recepción de telas", "Conteos físicos"],
  },
  {
    id: "INSTITUCION",
    label: "Institución / Colegio",
    icon: GraduationCap,
    color: "#7c3aed",
    bgColor: "#7c3aed",
    desc: "Solicita pedidos de uniformes, hace seguimiento del estado y coordina la entrega con el taller.",
    perms: ["Solicitar pedidos", "Ver estado del pedido", "Historial de compras", "Confirmar entregas", "Catálogo de prendas", "Contacto directo"],
  },
];

export default function S2_Roles({ onNext }: SceneProps) {
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center px-4 sm:px-5 py-4 sm:py-6 gap-4 sm:gap-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-3"
          style={{ background: "rgba(73,194,27,0.15)", border: "1px solid rgba(73,194,27,0.3)", color: "#49c21b" }}>
          Escena 2 de 9
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight" style={{ fontFamily: "var(--font-sora)" }}>
          Los <span style={{ color: "#49c21b" }}>4 actores</span> del sistema
        </h2>
        <p className="text-[13px] text-white/45 mt-2 max-w-lg mx-auto">
          Cada rol tiene permisos específicos. Todos trabajan en el mismo sistema en tiempo real.
        </p>
      </motion.div>

      {/* Role cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-5xl">
        {roles.map((role, i) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="relative flex flex-col gap-3 p-4 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${role.color}30`,
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Color top bar */}
            <div className="absolute top-0 inset-x-0 h-0.5 rounded-t-2xl"
              style={{ background: `linear-gradient(90deg, transparent, ${role.color}, transparent)` }} />

            {/* Icon + badge */}
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${role.color}22`, border: `1px solid ${role.color}40` }}>
                <role.icon className="w-5 h-5" style={{ color: role.color }} />
              </div>
              <span className="text-[9px] font-black tracking-widest px-2 py-1 rounded-full"
                style={{ background: `${role.color}20`, color: role.color, border: `1px solid ${role.color}35` }}>
                {role.id}
              </span>
            </div>

            {/* Name */}
            <div>
              <div className="text-[14px] font-bold text-white leading-tight">{role.label}</div>
              <p className="text-[11px] text-white/40 leading-relaxed mt-1">{role.desc}</p>
            </div>

            {/* Permissions */}
            <ul className="flex flex-col gap-1 mt-auto">
              {role.perms.slice(0, 4).map((p) => (
                <li key={p} className="flex items-center gap-1.5 text-[11px] text-white/55">
                  <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: role.color }} />
                  {p}
                </li>
              ))}
              {role.perms.length > 4 && (
                <li className="text-[10px] text-white/30 pl-4">+{role.perms.length - 4} más…</li>
              )}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Continue hint */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onNext}
        className="mt-5 flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors"
      >
        Ver cómo empieza el flujo →
      </motion.button>
      </div>
    </div>
  );
}
