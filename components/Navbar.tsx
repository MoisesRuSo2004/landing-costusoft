"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#inicio",   label: "Inicio" },
  { href: "#empresa",  label: "Empresa" },
  { href: "#sistema",  label: "Sistema" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy shadow-[0_2px_20px_rgba(0,0,0,0.35)]"
          : "bg-navy/90 backdrop-blur-sm"
      }`}
    >
      {/* Thin burgundy accent line at very top */}
      <div className="h-[2px] w-full bg-burgundy" />

      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="#inicio" className="flex flex-col leading-tight group">
          <span className="font-serif text-ivory text-2xl tracking-widest font-semibold group-hover:text-beige transition-colors duration-300">
            COSTUSOFT
          </span>
          <span className="text-pearl text-[9px] tracking-[0.35em] uppercase font-sans">
            Tradición · Innovación
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-[13px] tracking-[0.18em] uppercase text-pearl hover:text-ivory transition-colors duration-300 relative after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-burgundy after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA button desktop */}
        <a
          href="#sistema"
          className="hidden md:inline-flex items-center gap-2 border border-burgundy text-ivory text-[11px] tracking-[0.2em] uppercase font-sans px-6 py-2.5 hover:bg-burgundy transition-all duration-300"
        >
          Ver Sistema
        </a>

        {/* Hamburger mobile */}
        <button
          className="md:hidden text-ivory flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span className={`block h-[1px] w-6 bg-ivory transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[10px]" : ""}`} />
          <span className={`block h-[1px] w-6 bg-ivory transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[1px] w-6 bg-ivory transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy border-t border-white/10 py-6 px-8">
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-[13px] tracking-[0.2em] uppercase text-pearl hover:text-ivory transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#sistema"
                onClick={() => setMenuOpen(false)}
                className="inline-block mt-2 border border-burgundy text-ivory text-[11px] tracking-[0.2em] uppercase font-sans px-6 py-2.5 hover:bg-burgundy transition-all duration-300"
              >
                Ver Sistema
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
