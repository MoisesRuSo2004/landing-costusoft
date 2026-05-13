"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Brain, Package, Shield } from "lucide-react";
import Image from "next/image";

const roles = [
  { label: "ADMIN", icon: Shield, color: "#49c21b", desc: "Control total" },
  {
    label: "SECRETARIA",
    icon: Zap,
    color: "#2563eb",
    desc: "Pedidos y ventas",
  },
  {
    label: "BODEGA",
    icon: Package,
    color: "#f59e0b",
    desc: "Stock y producción",
  },
  {
    label: "INSTITUCIÓN",
    icon: Brain,
    color: "#7c3aed",
    desc: "Solicitar pedidos",
  },
];

interface SceneProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function S1_Intro({ onNext }: SceneProps) {
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center px-4 sm:px-5 py-4 sm:py-6 gap-4 sm:gap-5 relative">
        {/* Big glow behind title */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(11,61,145,0.35) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center gap-3 mb-5 sm:mb-8"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden shadow-2xl"
            style={{
              backgroundColor: "#0b3d91",
              boxShadow: "0 0 40px rgba(11,61,145,0.6)",
            }}
          >
            <Image
              src="/logo1.png"
              alt="CostuSoft"
              width={42}
              height={42}
              className="object-contain"
            />
          </div>
          <div>
            <div className="text-[22px] font-black text-white leading-none tracking-tight">
              CostuSoft
            </div>
            <div className="text-[14px] font-semibold text-blue-400 leading-none mt-0.5 tracking-widest uppercase">
              Control
            </div>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-center leading-tight tracking-tight mb-4"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          <span className="text-white">El sistema que </span>
          <span
            style={{
              background:
                "linear-gradient(135deg, #49c21b 0%, #a3e635 40%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            transforma
          </span>
          <br />
          <span className="text-white">tu empresa</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[15px] sm:text-[17px] text-white/55 text-center leading-relaxed max-w-xl mb-5 sm:mb-8"
        >
          Recorre el flujo completo del sistema: desde que un colegio hace su
          pedido hasta que el uniforme es entregado — con IA, optimización ILP y
          4 roles trabajando en equipo.
        </motion.p>

        {/* Role cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-5 sm:mb-8"
        >
          {roles.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
              style={{
                background: `${r.color}18`,
                border: `1px solid ${r.color}40`,
              }}
            >
              <r.icon
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: r.color }}
              />
              <div>
                <div
                  className="text-[10px] font-bold tracking-wider"
                  style={{ color: r.color }}
                >
                  {r.label}
                </div>
                <div className="text-[10px] text-white/40 leading-none">
                  {r.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-[15px] font-bold text-white transition-all"
          style={{
            background:
              "linear-gradient(135deg, #0b3d91 0%, #1a5cc8 50%, #49c21b 150%)",
            boxShadow:
              "0 8px 40px rgba(11,61,145,0.5), 0 2px 16px rgba(73,194,27,0.2)",
          }}
        >
          Comenzar tour
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        {/* Scene count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-5 text-[11px] text-white/25"
        >
          9 escenas · ~3 minutos · Flujo completo
        </motion.p>
      </div>
    </div>
  );
}
