"use client";

const footerLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Empresa", href: "#empresa" },
  { label: "Sistema", href: "#sistema" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/8">
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="mb-3">
              <span className="font-serif text-ivory text-2xl tracking-widest font-semibold">COSTUSOFT</span>
            </div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-pearl mb-5">
              Tradición · Innovación
            </p>
            <p className="font-sans text-pearl/60 text-[13px] leading-relaxed font-light max-w-xs">
              Sistema de gestión textil diseñado para empresas de confección que valoran
              la tradición tanto como la eficiencia.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-burgundy mb-6">
              Navegación
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-pearl/70 text-[13px] hover:text-ivory transition-colors duration-300 tracking-wide"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-burgundy mb-6">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <svg className="text-burgundy w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <rect x="1" y="3" width="14" height="10" rx="1"/>
                  <path d="M1 5l7 5 7-5" strokeLinecap="round"/>
                </svg>
                <a href="mailto:contacto@costusoft.com" className="font-sans text-pearl/70 text-[13px] hover:text-ivory transition-colors duration-300">
                  contacto@costusoft.com
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <svg className="text-burgundy w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M2 2h3.5l1.5 4-2.5 1.5a9 9 0 004.5 4.5L10.5 9.5l4 1.5V14a1 1 0 01-1 1C6 15 1 9 1 3a1 1 0 011-1z" strokeLinejoin="round"/>
                </svg>
                <a href="tel:+1234567890" className="font-sans text-pearl/70 text-[13px] hover:text-ivory transition-colors duration-300">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <svg className="text-burgundy w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <circle cx="8" cy="7" r="3"/>
                  <path d="M8 1C5.24 1 3 3.24 3 6c0 4 5 9 5 9s5-5 5-9c0-2.76-2.24-5-5-5z" strokeLinejoin="round"/>
                </svg>
                <span className="font-sans text-pearl/70 text-[13px]">
                  Ciudad de México, MX
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Burgundy accent line + copyright */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-sans text-pearl/40 text-[11px] tracking-[0.15em]">
            © {new Date().getFullYear()} Costusoft. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-sans text-pearl/40 text-[11px] tracking-[0.12em] hover:text-pearl transition-colors duration-300">
              Privacidad
            </a>
            <a href="#" className="font-sans text-pearl/40 text-[11px] tracking-[0.12em] hover:text-pearl transition-colors duration-300">
              Términos
            </a>
          </div>
        </div>
      </div>

      {/* Bottom burgundy line */}
      <div className="h-[2px] bg-burgundy" />
    </footer>
  );
}
