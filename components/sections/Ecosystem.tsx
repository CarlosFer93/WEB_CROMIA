import { Container } from "@/components/ui/Container";
import { Isotipo, Wordmark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ecosystem, sectors, type Sector } from "@/lib/content";

/** Posiciones (en %) de los 6 sectores alrededor del centro en desktop. */
const positions = [
  { left: "17%", top: "16%" },
  { left: "10%", top: "50%" },
  { left: "17%", top: "84%" },
  { left: "83%", top: "16%" },
  { left: "90%", top: "50%" },
  { left: "83%", top: "84%" },
];

function SectorChip({ sector }: { sector: Sector }) {
  const Icon = sector.icon;
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-md shadow-navy/5">
      <span className="flex size-10 items-center justify-center rounded-xl bg-ice text-blue" aria-hidden="true">
        <Icon className="size-5" />
      </span>
      <span className="font-semibold text-navy">{sector.name}</span>
    </div>
  );
}

function CenterBadge() {
  return (
    <div className="flex size-36 flex-col items-center justify-center gap-1 rounded-[1.75rem] bg-navy shadow-2xl shadow-navy/30 sm:size-40">
      <Isotipo size={56} />
      <Wordmark tone="dark" className="text-2xl" />
    </div>
  );
}

export function Ecosystem() {
  return (
    <section id="sectores" aria-labelledby="sectores-title" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="sectores-title"
          eyebrow={ecosystem.eyebrow}
          title={ecosystem.title}
          subtitle={ecosystem.subtitle}
        />

        {/* Desktop: diagrama radial */}
        <Reveal className="relative mx-auto mt-16 hidden h-[460px] max-w-5xl lg:block">
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="ring-pulse absolute size-[420px] rounded-full border border-dashed border-blue/20" />
            <div className="absolute size-[320px] rounded-full border border-blue/25" />
            <div
              className="ring-pulse absolute size-[220px] rounded-full border-2 border-green/40"
              style={{ animationDelay: "1.5s" }}
            />
            <div className="absolute size-[220px] rounded-full bg-linear-to-br from-blue/10 to-green/10" />
          </div>
          {/* Conectores */}
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            {positions.map((p, i) => (
              <line
                key={i}
                x1="50%"
                y1="50%"
                x2={p.left}
                y2={p.top}
                stroke="#2563EB"
                strokeOpacity="0.18"
                strokeDasharray="4 6"
              />
            ))}
          </svg>
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
          <ul className="mt-10 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 md:grid-cols-3" aria-label="Sectores">
            {sectors.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 0.05}>
                <SectorChip sector={s} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
