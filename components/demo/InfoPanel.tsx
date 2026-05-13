"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Database, Server, Layers, BookOpen, Cpu } from "lucide-react";

export interface SceneInfo {
  module: string;
  description: string;
  tables: string[];
  endpoints: string[];
  tech: string[];
}

interface InfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sceneTitle: string;
  sceneNumber: number;
  info: SceneInfo;
  roleColor: string;
}

const METHOD_STYLE: Record<string, { bg: string; color: string }> = {
  GET:    { bg: "rgba(73,194,27,0.18)",  color: "#86efac" },
  POST:   { bg: "rgba(37,99,235,0.18)",  color: "#93c5fd" },
  PATCH:  { bg: "rgba(245,158,11,0.18)", color: "#fcd34d" },
  DELETE: { bg: "rgba(239,68,68,0.18)",  color: "#fca5a5" },
  PUT:    { bg: "rgba(124,58,237,0.18)", color: "#c4b5fd" },
};

export default function InfoPanel({
  isOpen,
  onClose,
  sceneTitle,
  sceneNumber,
  info,
  roleColor,
}: InfoPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[380px] flex flex-col overflow-hidden"
            style={{
              background: "rgba(4,11,22,0.98)",
              borderLeft: `1px solid ${roleColor}40`,
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}
            <div
              className="flex-shrink-0 flex items-start justify-between px-5 py-4"
              style={{
                background: `${roleColor}10`,
                borderBottom: `1px solid ${roleColor}25`,
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{ background: `${roleColor}20`, color: roleColor, border: `1px solid ${roleColor}40` }}
                  >
                    Escena {sceneNumber}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-white/40 mb-0.5">¿Qué acaba de pasar?</div>
                <div className="text-[16px] font-black text-white leading-tight">{sceneTitle}</div>
              </div>
              <button
                onClick={onClose}
                className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">

              {/* Module + Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="p-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${roleColor}20` }}>
                    <BookOpen className="w-3.5 h-3.5" style={{ color: roleColor }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Módulo</span>
                </div>
                <div className="text-[13px] font-bold text-white mb-1.5">{info.module}</div>
                <p className="text-[11px] text-white/50 leading-relaxed">{info.description}</p>
              </motion.div>

              {/* DB Tables */}
              {info.tables.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="p-4 rounded-2xl"
                  style={{ background: "rgba(73,194,27,0.05)", border: "1px solid rgba(73,194,27,0.18)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(73,194,27,0.15)" }}>
                      <Database className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">Tablas en Supabase</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {info.tables.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold"
                        style={{ background: "rgba(73,194,27,0.12)", color: "#86efac", border: "1px solid rgba(73,194,27,0.22)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* API Endpoints */}
              {info.endpoints.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.19 }}
                  className="p-4 rounded-2xl"
                  style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.18)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(37,99,235,0.2)" }}>
                      <Server className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Endpoints API</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {info.endpoints.map((e) => {
                      const [method, ...rest] = e.split(" ");
                      const style = METHOD_STYLE[method] ?? { bg: "rgba(255,255,255,0.1)", color: "#fff" };
                      return (
                        <div key={e} className="flex items-center gap-2.5">
                          <span
                            className="text-[8px] font-black px-1.5 py-0.5 rounded flex-shrink-0 w-10 text-center"
                            style={{ background: style.bg, color: style.color }}
                          >
                            {method}
                          </span>
                          <span className="text-[10px] font-mono text-white/55 leading-tight">{rest.join(" ")}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Tech stack */}
              {info.tech.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26 }}
                  className="p-4 rounded-2xl"
                  style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.18)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(124,58,237,0.2)" }}>
                      <Layers className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Stack técnico</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {info.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
                        style={{ background: "rgba(124,58,237,0.12)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.22)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Footer note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <Cpu className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />
                <p className="text-[10px] text-white/25 leading-relaxed">
                  Sistema en producción · backend Node.js + Python · DB PostgreSQL via Supabase
                </p>
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
