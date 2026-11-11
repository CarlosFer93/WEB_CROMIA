import { Container } from "@/components/ui/Container";
import { Isotipo, Wordmark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ecosystem, sectors, type Sector } from "@/lib/content";

/** Posiciones (en %) de los 6 sectores alrededor del centro en desktop. */
const positions = [
  { left: "18%", top: "14%" },
  { left: "12%", top: "50%" },
  { left: "18%", top: "86%" },
  { left: "82%", top: "14%" },
  { left: "88%", top: "50%" },
  { left: "82%", top: "86%" },
];

/**
 * Sector "flotante": sube y baja suavemente (desfasado por índice) y al pasar el puntero
 * crece y se ilumina por debajo con un resplandor azul → verde.
 */
function SectorChip({ sector, index, full = false }: { sector: Sector; index: number; full?: boolean }) {
  const Icon = sector.icon;
  return (
    <div
      className={`animate-float group relative ${full ? "w-full" : ""}`}
      style={{ animationDelay: `${-index * 0.9}s`, animationDuration: `${5.5 + (index % 3) * 0.8}s` }}
    >
      {/* Resplandor inferior (aparece en hover) */}
      <span
        className="pointer-events-none absolute inset-x-6 -bottom-5 h-10 rounded-full bg-linear-to-r from-blue to-green opacity-0 blur-2xl transition-opacity duration-(--duration-slow) group-hover:opacity-90"
        aria-hidden="true"
      />
      <div
        className={`relative flex items-center gap-4 rounded-full bg-black/70 py-3 pl-3 pr-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_0_1px_rgba(255,255,255,0.12),0_28px_50px_-22px_rgba(0,0,0,0.95)] backdrop-blur-md transition-[transform,box-shadow] duration-300 ease-(--ease-out-expo) group-hover:scale-110 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_0_0_1px_rgba(96,165,250,0.5),0_18px_40px_-12px_rgba(16,185,129,0.55)] motion-reduce:transition-none ${
          full ? "w-full" : ""
        }`}
      >
        <span className="knob size-12 text-fg transition-colors duration-300 group-hover:text-green-soft" aria-hidden="true">
          <Icon className="size-6" />
        </span>
        <span className="text-lg font-semibold tracking-[-0.02em] text-fg">{sector.name}</span>
      </div>
    </div>
  );
}

function CenterBadge() {
  return (
    <div className="relative flex size-40 flex-col items-center justify-center gap-1.5 rounded-full bg-[radial-gradient(circle_at_50%_30%,#14213d_0%,#05070d_75%)] shadow-[0_0_0_1px_rgba(96,165,250,0.25),0_0_60px_-10px_rgba(37,99,235,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]">
      <Isotipo size={56} />
      <Wordmark tone="dark" className="text-xl tracking-[-0.03em]" />
    </div>
  );
}

/** Patrón de círculos superpuestos (decorativo). */
function OrbitPattern() {
  const r = 150;
  const centers = [0, 60, 120, 180, 240, 300].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return [Math.round(300 + Math.cos(a) * r * 0.62), Math.round(300 + Math.sin(a) * r * 0.62)];
  });
  return (
    <svg viewBox="0 0 600 600" className="absolute left-1/2 top-1/2 h-[150%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      <g fill="none" strokeWidth="1">
        {centers.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} stroke="rgb(255 255 255 / 0.06)" />
        ))}
        <circle cx="300" cy="300" r="120" stroke="rgb(96 165 250 / 0.25)" />
        <circle cx="300" cy="300" r="240" stroke="rgb(255 255 255 / 0.06)" strokeDasharray="2 6" />
      </g>
    </svg>
  );
}

export function Ecosystem() {
  return (
    <section id="sectores" aria-labelledby="sectores-title" className="relative overflow-hidden py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="sectores-title"
          align="center"
          title={ecosystem.title}
          subtitle={ecosystem.subtitle}
        />

        {/* Desktop: diagrama radial */}
        <Reveal className="relative mx-auto mt-16 hidden h-[520px] max-w-5xl lg:block">
          <div className="animate-spin-slow absolute inset-0" aria-hidden="true">
            <OrbitPattern />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <CenterBadge />
          </div>
          <ul aria-label="Sectores">
            {sectors.map((s, i) => (
              <li
                key={s.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 hover:z-10"
                style={{ left: positions[i].left, top: positions[i].top }}
              >
                <SectorChip sector={s} index={i} />
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Móvil / tablet: grilla */}
        <div className="mt-12 lg:hidden">
          <div className="flex justify-center">
            <CenterBadge />
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 md:grid-cols-3" aria-label="Sectores">
            {sectors.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 0.04} className="relative hover:z-10">
                <SectorChip sector={s} index={i} full />
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
