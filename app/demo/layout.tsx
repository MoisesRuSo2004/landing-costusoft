import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Interactiva — CostuSoft Control",
  description:
    "Recorre el flujo completo del sistema: cómo los 4 roles interactúan desde el pedido hasta la entrega.",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#050d1a]">
      {children}
    </div>
  );
}
