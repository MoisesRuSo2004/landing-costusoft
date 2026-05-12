import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CostuSoft Control — El sistema que tu taller necesitaba",
  description:
    "Inventario en tiempo real, predicciones de IA y optimización de producción para talleres de confecciones escolares. Powered by LLaMA 3.3, Prophet y XGBoost.",
  keywords:
    "costusoft, sistema gestion textil, inventario confecciones, prediccion demanda IA, optimizacion produccion, uniformes escolares, software taller",
  openGraph: {
    title: "CostuSoft Control — El sistema que tu taller necesitaba",
    description:
      "Inventario en tiempo real, predicciones de IA y optimización de producción para talleres de confecciones escolares.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${sora.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
