"use client";

import { Mail, MapPin } from "lucide-react";
import Image from "next/image";

const sections = [
  {
    title: "Producto",
    links: [
      { label: "Características", href: "#features" },
      { label: "Cómo funciona", href: "#how-it-works" },
      { label: "IA y Predicción", href: "#ai" },
      { label: "Precios", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Sistema",
    links: [
      { label: "Inventario", href: "#" },
      { label: "Pedidos", href: "#" },
      { label: "Optimización ILP", href: "#" },
      { label: "Calculadora Textil", href: "#" },
      { label: "Reportes", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-100 bg-white overflow-hidden min-h-[480px]">
      {/* ── Watermark texto ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="text-[clamp(80px,16vw,200px)] font-black tracking-tighter leading-none whitespace-nowrap"
          style={{ color: "#E5E7EB", opacity: 0.4, userSelect: "none" }}
        >
          CostuSoft
        </span>
      </div>

      {/* ── Logo watermark esquina inferior-izquierda ── */}
      <div
        className="absolute bottom-[-30px] left-[-30px] pointer-events-none select-none"
        aria-hidden="true"
        style={{ width: 220, height: 220, opacity: 0.055, filter: "brightness(0)", transform: "rotate(-8deg)" }}
      >
        <Image src="/logo1.png" alt="" fill className="object-contain" />
      </div>

      {/* ── Main body ── */}
      <div className="relative z-10 container-landing" style={{ paddingTop: "48px", paddingBottom: "24px" }}>
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: "#0b3d91" }}
              >
                <Image
                  src="/logo1.png"
                  alt="CostuSoft Control"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>
              <div className="leading-tight">
                <span className="block font-bold text-[16px] tracking-tight text-gray-900 leading-none">
                  CostuSoft
                </span>
                <span className="block text-[12px] font-medium text-blue-600 tracking-wide leading-none mt-0.5">
                  Control
                </span>
              </div>
            </a>

            {/* Tagline */}
            <p className="text-[13px] text-gray-400 leading-relaxed max-w-xs">
              El sistema de gestión integral para talleres de confección
              escolar. Inventario en tiempo real, IA predictiva y optimización
              de producción.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2.5 mt-1">
              <a
                href="mailto:contacto@costusoft.com"
                className="flex items-center gap-2.5 text-[13px] text-gray-400 hover:text-blue-600 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                </div>
                contacto@costusoft.com
              </a>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-400">
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                </div>
                Colombia
              </div>
            </div>
          </div>

          {/* Link sections */}
          {sections.map((sec) => (
            <div key={sec.title} className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-[0.15em]">
                {sec.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {sec.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="mt-10 mb-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-gray-400">
            © {new Date().getFullYear()} CostuSoft Control. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-glow" />
            <span className="text-[12px] text-gray-400">Sistema operativo</span>
          </div>
          <div className="flex gap-5">
            <a
              href="#"
              className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors"
            >
              Privacidad
            </a>
            <a
              href="#"
              className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors"
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
