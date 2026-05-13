"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const stats = [
  { value: 14, label: "Módulos integrados",  suffix: ""  },
  { value: 95, label: "Precisión predictiva", suffix: "%" },
  { value: 4,  label: "Niveles de riesgo",    suffix: ""  },
  { value: 9,  label: "Consultas de IA",      suffix: ""  },
  { value: 16, label: "Tablas de datos",      suffix: ""  },
  { value: 4,  label: "Roles de usuario",     suffix: ""  },
];

function Counter({
  target, suffix, inView, delay = 0,
}: {
  target: number; suffix: string; inView: boolean; delay?: number;
}) {
  const mv     = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 42, damping: 15 });
  const [display, setDisplay] = useState(0);
  const [done,    setDone]    = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => mv.set(target), delay);
    return () => clearTimeout(t);
  }, [inView, target, mv, delay]);

  useEffect(() => {
    const unsub = spring.on("change", v => {
      const r = Math.round(v);
      setDisplay(r);
      if (r >= target && !done) setDone(true);
    });
    return unsub;
  }, [spring, target, done]);

  return (
    <motion.span
      style={{ display: "inline-block" }}
      animate={done ? { scale: [1, 1.12, 1] } : {}}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {display}{suffix}
    </motion.span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0b3d91 0%, #0d4fa8 60%, #0e5c2a 100%)" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Logo watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <Image
          src="/logo1.png" alt="" width={340} height={340}
          className="object-contain"
          style={{ opacity: 0.07, filter: "brightness(0) invert(1)" }}
        />
      </div>

      {/* ── Scan line verde ── */}
      <motion.div
        className="absolute inset-x-0 pointer-events-none z-20"
        aria-hidden="true"
        style={{
          height: 2,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(73,194,27,0) 15%, rgba(73,194,27,0.9) 44%, rgba(255,255,255,1) 50%, rgba(73,194,27,0.9) 56%, rgba(73,194,27,0) 85%, transparent 100%)",
          boxShadow: "0 0 14px 4px rgba(73,194,27,0.35)",
        }}
        initial={{ top: "0%" }}
        animate={{ top: ["0%", "110%"] }}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 4.8, ease: "easeInOut" }}
      />

      {/* Glow central */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(73,194,27,0.15) 0%, transparent 70%)" }}
      />

      <div className="container-landing relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <div
                className="text-3xl sm:text-4xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-sora)",
                  background: "linear-gradient(135deg, #ffffff 0%, #49c21b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <Counter target={stat.value} suffix={stat.suffix} inView={inView} delay={i * 100} />
              </div>
              <div className="text-[12px] text-blue-200 leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
