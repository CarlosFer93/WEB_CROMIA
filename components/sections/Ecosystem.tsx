import { Container } from "@/components/ui/Container";
import { Isotipo, Wordmark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ecosystem, sectors, type Sector } from "@/lib/content";

/** Posiciones (en %) de los 6 sectores alrededor del centro en desktop. */
const positions = [
  { left: "16%", top: "18%" },
  { left: "9%", top: "50%" },
  { left: "16%", top: "82%" },
  { left: "84%", top: "18%" },
  { left: "91%", top: "50%" },
  { left: "84%", top: "82%" },
];

function SectorChip({ sector }: { sector: Sector }) {
  const Icon = sector.icon;
  return (
    <div className="flex items-center gap-3 rounded-full bg-black/60 py-2 pl-2 pr-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(255,255,255,0.1),0_20px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md">
      <span className="knob size-9 text-fg" aria-hidden="true">
        <Icon className="size-4" />
      </span>
      <span className="text-sm font-medium text-fg">{sector.name}</span>
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
          eyebrow={ecosystem.eyebrow}
          title={ecosystem.title}
          subtitle={ecosystem.subtitle}
        />

        {/* Desktop: diagrama radial */}
        <Reveal className="relative mx-auto mt-16 hidden h-[480px] max-w-5xl lg:block">
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
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: positions[i].left, top: positions[i].top }}
              >
                <SectorChip sector={s} />
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Móvil / tablet: grilla */}
        <div className="mt-12 lg:hidden">
          <div className="flex justify-center">
            <CenterBadge />
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3" aria-label="Sectores">
            {sectors.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 0.04}>
                <SectorChip sector={s} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
