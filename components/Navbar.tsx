"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Características", href: "#features" },
  { label: "Cómo funciona", href: "#how-it-works" },
  { label: "IA", href: "#ai" },
  { label: "Precios", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 py-2 shadow-sm"
          : "bg-white/70 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container-landing flex items-center justify-between">
        {/* ── Logo ── */}
        <a href="#" className="flex items-center gap-3 group">
          {/* Círculo navy con el logo dentro */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundColor: "#0b3d91" }}
          >
            <Image
              src="/logo1.png"
              alt="CostuSoft Control"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>

          {/* Texto */}
          <div className="leading-tight">
            <span className="block font-bold text-[15px] tracking-tight text-gray-900 leading-none">
              CostuSoft
            </span>
            <span className="block text-[11px] font-medium text-blue-600 tracking-wide leading-none mt-0.5">
              Control
            </span>
          </div>
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* ── CTAs ── */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://app.costusoft.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            Iniciar sesión
          </a>
          <a href="#pricing" className="btn-primary text-[13px] py-2 px-5">
            Solicitar demo
          </a>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          className="md:hidden text-gray-500 hover:text-gray-900 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-4 shadow-lg">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <hr className="border-gray-100" />
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="btn-primary text-sm justify-center"
          >
            Solicitar demo
          </a>
        </div>
      )}
    </header>
  );
}
