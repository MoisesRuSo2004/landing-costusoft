"use client";

import Image from "next/image";

const stats = [
  { value: "14", label: "Módulos integrados", suffix: "" },
  { value: "95", label: "Precisión predictiva", suffix: "%" },
  { value: "4", label: "Niveles de riesgo", suffix: "" },
  { value: "9", label: "Consultas de IA", suffix: "" },
  { value: "16", label: "Tablas de datos", suffix: "" },
  { value: "4", label: "Roles de usuario", suffix: "" },
];

export default function Stats() {
  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0b3d91 0%, #0d4fa8 60%, #0e5c2a 100%)",
      }}
    >
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Logo watermark — centrado, muy sutil */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <Image
          src="/logo1.png"
          alt=""
          width={340}
          height={340}
          className="object-contain"
          style={{ opacity: 0.07, filter: "brightness(0) invert(1)" }}
        />
      </div>

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(73,194,27,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="container-landing relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-3xl sm:text-4xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-sora)",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #49c21b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-[12px] text-blue-200 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
