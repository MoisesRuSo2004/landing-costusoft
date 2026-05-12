"use client";

import { TrendingUp, Package, AlertTriangle, CheckCircle } from "lucide-react";

export default function ProductPreview() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(37,99,235,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-landing relative z-10">
        <div className="text-center mb-14">
          <div className="badge badge-indigo inline-flex mb-4">Vista previa</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Un dashboard construido para{" "}
            <span className="gradient-text">decisiones rápidas</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-[15px]">
            Toda la información crítica de tu taller, visible de un vistazo.
          </p>
        </div>

        {/* Main mockup */}
        <div className="max-w-5xl mx-auto">
          <div className="border-gradient rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/8 bg-white">
            {/* Chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white border border-gray-200 rounded px-4 py-1 text-[11px] text-gray-400">
                  app.costusoft.com/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="p-6 bg-[#F9FAFB]">
              {/* Top KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { label: "Stock Disponible", value: "12,480 un.", delta: "+3.2%", icon: Package, dcolor: "#16A34A", dbg: "#F0FDF4" },
                  { label: "Pedidos Activos", value: "47 pedidos", delta: "3 críticos", icon: AlertTriangle, dcolor: "#DC2626", dbg: "#FFF1F2" },
                  { label: "Predicción IA", value: "1,920 un.", delta: "95% confianza", icon: TrendingUp, dcolor: "#0369A1", dbg: "#F0F9FF" },
                  { label: "Utilidad Óptima", value: "$4.8M COP", delta: "OPTIMAL", icon: CheckCircle, dcolor: "#16A34A", dbg: "#F0FDF4" },
                ].map((kpi) => {
                  const Icon = kpi.icon;
                  return (
                    <div
                      key={kpi.label}
                      className="rounded-xl p-4 bg-white border border-gray-100 shadow-sm"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[10px] text-gray-400">{kpi.label}</span>
                        <Icon className="w-3.5 h-3.5" style={{ color: kpi.dcolor }} />
                      </div>
                      <div className="text-lg font-bold text-gray-900 mb-1">{kpi.value}</div>
                      <div
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded inline-block"
                        style={{ color: kpi.dcolor, backgroundColor: kpi.dbg }}
                      >
                        {kpi.delta}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-12 gap-3">
                {/* Stock levels */}
                <div className="col-span-12 sm:col-span-5 rounded-xl bg-white border border-gray-100 shadow-sm p-4">
                  <div className="text-[11px] font-semibold text-gray-700 mb-3">
                    Stock de Insumos — Riesgo
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { name: "Tela Poliéster Azul", pct: 78, color: "#16A34A" },
                      { name: "Tela Cuadros Gris", pct: 34, color: "#F59E0B" },
                      { name: "Hilo Blanco 40/2", pct: 12, color: "#DC2626" },
                      { name: "Botones metálicos", pct: 55, color: "#2563EB" },
                      { name: "Cierre YKK 20cm", pct: 8, color: "#DC2626" },
                    ].map((row) => (
                      <div key={row.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-[10px] text-gray-500">{row.name}</span>
                          <span className="text-[10px] font-semibold" style={{ color: row.color }}>
                            {row.pct}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${row.pct}%`, backgroundColor: row.color, opacity: 0.8 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ILP result */}
                <div className="col-span-12 sm:col-span-7 rounded-xl bg-white border border-gray-100 shadow-sm p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[11px] font-semibold text-gray-700">
                      Plan de Producción — ILP
                    </div>
                    <div className="badge badge-emerald text-[9px] py-0.5">
                      OPTIMAL
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { prenda: "Camisa Escolar M", qty: 320, util: "$480K" },
                      { prenda: "Pantalón Diario F", qty: 180, util: "$342K" },
                      { prenda: "Suéter Grado M", qty: 95, util: "$285K" },
                      { prenda: "Falda Escolar F", qty: 210, util: "$315K" },
                      { prenda: "Camiseta Ed. Física", qty: 145, util: "$145K" },
                      { prenda: "Pantaloneta M", qty: 130, util: "$130K" },
                    ].map((p) => (
                      <div
                        key={p.prenda}
                        className="rounded-lg px-3 py-2 bg-blue-50 border border-blue-100"
                      >
                        <div className="text-[10px] text-gray-500 leading-snug mb-0.5">
                          {p.prenda}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-bold text-gray-900">
                            {p.qty} un.
                          </span>
                          <span className="text-[10px] text-green-600 font-semibold">{p.util}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] text-gray-400">Utilidad total optimizada</span>
                    <span className="text-sm font-bold text-green-600">$4,825,000 COP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
