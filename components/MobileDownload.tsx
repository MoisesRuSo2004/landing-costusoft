import Image from "next/image";
import {
  Activity,
  ClipboardList,
  Download,
  Package,
  QrCode,
} from "lucide-react";

const apkDownloadUrl =
  process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL ||
  "https://github.com/MoisesRuSo2004/costusoft-mobile/releases/latest/download/costusoft-1.2.0.apk";
const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || "1.2.0";

const mobileFeatures = [
  {
    icon: Package,
    title: "Inventario",
    description: "Consulta existencias y movimientos.",
  },
  {
    icon: ClipboardList,
    title: "Pedidos",
    description: "Revisa estados y seguimiento según tu perfil.",
  },
  {
    icon: QrCode,
    title: "Escaneo QR",
    description: "Busca insumos desde sus etiquetas.",
  },
];

export default function MobileDownload() {
  return (
    <section
      id="descarga-movil"
      aria-labelledby="mobile-download-title"
      className="relative overflow-hidden bg-[#F9FAFB] py-20 sm:py-24 lg:py-28"
    >
      <div className="container-landing relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-2xl">
            <h2
              id="mobile-download-title"
              className="mb-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              CostuSoft <span className="gradient-text">en tu bolsillo</span>
            </h2>
            <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-gray-600 sm:text-base">
              Consulta inventario y pedidos, revisa alertas de riesgo y
              producción, y escanea etiquetas QR desde Android, según los
              permisos de tu perfil.
            </p>

            <ul className="mb-9 grid gap-5 sm:grid-cols-3">
              {mobileFeatures.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[#0b3d91]">
                    <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-gray-900">
                      {title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-gray-500">
                      {description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mb-7 flex flex-wrap gap-x-8 gap-y-3">
              <div>
                <span className="block text-xs text-gray-500">Versión</span>
                <span className="mt-1 block text-sm font-semibold tabular-nums text-gray-900">
                  {appVersion}
                </span>
              </div>
              <div>
                <span className="block text-xs text-gray-500">Plataforma</span>
                <span className="mt-1 block text-sm font-semibold text-gray-900">
                  Android
                </span>
              </div>
              <div>
                <span className="block text-xs text-gray-500">Tamaño</span>
                <span className="mt-1 block text-sm font-semibold tabular-nums text-gray-900">
                  83.9 MB
                </span>
              </div>
            </div>

            <a
              href={apkDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Descargar CostuSoft Control para Android, versión ${appVersion}, 83.9 MB`}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#0b3d91] px-3 py-3.5 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(11,61,145,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#092f70] hover:shadow-[0_12px_28px_rgba(11,61,145,0.24)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b3d91] motion-reduce:transition-none sm:w-auto sm:gap-2.5 sm:px-6 sm:text-sm"
            >
              Descargar para Android
              <Download aria-hidden="true" className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs leading-relaxed text-gray-500">
              Descarga proporcionada mediante GitHub Releases.
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div
              aria-hidden="true"
              className="absolute inset-x-8 top-1/4 h-2/3 rounded-full bg-blue-100/70 blur-3xl"
            />
            <figure
              role="img"
              aria-label="Mockup de teléfono con la identidad visual de CostuSoft Control"
              className="group relative w-[min(100%,18rem)] rotate-[-3deg] rounded-[2.7rem] border-[7px] border-[#12264f] bg-[#12264f] p-2 shadow-[0_28px_70px_rgba(11,61,145,0.20)] transition duration-500 hover:-translate-y-2 hover:rotate-0 motion-reduce:transition-none sm:w-[19rem]"
            >
              <div className="relative flex aspect-[9/18.5] flex-col overflow-hidden rounded-[2rem] bg-white">
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-[#12264f]"
                />
                <div className="flex flex-1 flex-col items-center justify-center bg-[linear-gradient(155deg,#0b3d91_0%,#124c9c_58%,#17642d_100%)] px-7 text-center">
                  <Image
                    src="/costusoft-control-icon.png"
                    alt=""
                    width={112}
                    height={112}
                    className="mb-6 h-24 w-24 rounded-[1.6rem] shadow-xl shadow-[#071e4a]/25 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="font-[var(--font-sora)] text-xl font-bold tracking-tight text-white">
                    CostuSoft
                  </span>
                  <span className="mt-1 text-sm font-medium text-green-200">
                    Control
                  </span>
                  <span className="mt-7 max-w-[13rem] text-xs leading-relaxed text-blue-100/90">
                    Inventario y pedidos al alcance de tu equipo.
                  </span>
                </div>
                <div className="flex h-8 items-center justify-center bg-white">
                  <span
                    aria-hidden="true"
                    className="h-1 w-20 rounded-full bg-gray-300"
                  />
                </div>
              </div>
            </figure>
          </div>
        </div>

        <div className="mt-16 border-t border-blue-100 pt-7 sm:mt-20">
          <div className="flex max-w-4xl items-start gap-4">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-green-100 bg-green-50 text-green-700">
              <Activity aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                Análisis de anomalías en movimientos
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                El motor predictivo compara cada movimiento con el historial del
                insumo y señala cantidades muy altas o bajas, repeticiones y
                combinaciones inusuales para revisión.
                Una alerta indica algo fuera de lo habitual, no una conclusión de
                fraude.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
