import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Frame, Knob } from "@/components/ui/Frame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillars } from "@/lib/content";

/* ── Mini-ilustraciones decorativas (sin imágenes) ── */

function TasksVisual() {
  const rows = ["Facturas recibidas", "Reportes semanales", "Respuestas a clientes"];
  return (
    <div className="card w-full max-w-xs p-4 text-left" aria-hidden="true">
      <div className="mb-3 flex items-center gap-2 text-[11px] text-muted">
        <span className="size-1.5 rounded-full bg-green" /> automatizacion.flow
      </div>
      <ul className="space-y-2">
        {rows.map((r, i) => (
          <li key={r} className="relative flex items-center gap-3 overflow-hidden rounded-lg bg-white/[0.03] px-3 py-2.5 text-[13px] text-white/75">
            <span className="flex size-5 items-center justify-center rounded-full bg-green/15 text-green">
              <Check className="size-3" />
            </span>
            {r}
            {i === 1 && <span className="animate-scan-x absolute inset-0" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DialVisual({ children }: { children: React.ReactNode }) {
  const ticks = Array.from({ length: 36 });
  return (
    <div className="relative flex size-36 items-center justify-center" aria-hidden="true">
      {ticks.map((_, i) => (
        <span
          key={i}
          className={`absolute left-1/2 top-0 h-2 w-px origin-[50%_72px] ${i < 26 ? "bg-white/40" : "bg-white/10"}`}
          style={{ transform: `translateX(-50%) rotate(${i * 10}deg)` }}
        />
      ))}
      <Knob size="lg">{children}</Knob>
    </div>
  );
}

function BarsVisual() {
  const bars = [28, 40, 36, 52, 60, 74, 88];
  return (
    <div className="flex h-32 w-full max-w-xs items-end gap-2" aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className={`flex-1 rounded-t-md ${i === bars.length - 1 ? "bg-linear-to-t from-blue to-green shadow-[0_0_24px_rgba(16,185,129,0.45)]" : "bg-white/[0.08]"}`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export function Pillars() {
  const [auto, intel, adapt, scale] = pillars.items;
  const cards = [
    { item: auto, span: "lg:col-span-4", visual: <TasksVisual />, layout: "split" },
    {
      item: intel,
      span: "lg:col-span-2",
      visual: (
        <DialVisual>
          <intel.icon className="size-7 text-blue-soft" />
        </DialVisual>
      ),
      layout: "stack",
    },
    {
      item: adapt,
      span: "lg:col-span-2",
      visual: (
        <Knob size="lg">
          <adapt.icon className="size-7 text-green" />
        </Knob>
      ),
      layout: "stack",
    },
    { item: scale, span: "lg:col-span-4", visual: <BarsVisual />, layout: "split" },
  ] as const;

  return (
    <section id="servicios" aria-labelledby="servicios-title" className="relative py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.14),transparent_60%)]"
        aria-hidden="true"
      />
      <Container>
        <SectionHeading
          id="servicios-title"
          title={
            <>
              {pillars.title}
              <br />
              <span className="text-white/45">{pillars.titleAccent}</span>
            </>
          }
        />

        <ul className="mt-14 grid gap-4 lg:grid-cols-6">
          {cards.map(({ item, span, visual, layout }, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.06} className={`flex ${span}`}>
              <Frame className="flex-1" innerClassName="">
                <article
                  className={`grid h-full flex-1 gap-6 p-7 ${
                    layout === "split" ? "sm:grid-cols-2 sm:items-center" : "content-between"
                  }`}
                >
                  <div className={`flex justify-center ${layout === "split" ? "order-first sm:order-last" : "py-4"}`}>
                    {visual}
                  </div>
                  <div>
                    <h3 className="text-card-title font-semibold text-fg">{item.title}</h3>
                    <p className="mt-2 text-body text-muted">{item.description}</p>
                  </div>
                </article>
              </Frame>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
