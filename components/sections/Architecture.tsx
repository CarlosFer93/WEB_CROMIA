import { AppWindow, Database, Workflow } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Frame, Knob } from "@/components/ui/Frame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { architecture } from "@/lib/content";

const accent = {
  navy: { icon: "text-white", dot: "bg-white/70", chip: "text-white/80" },
  blue: { icon: "text-blue-soft", dot: "bg-blue-soft", chip: "text-blue-soft" },
  green: { icon: "text-green", dot: "bg-green", chip: "text-green" },
} as const;

const layerIcons = [Database, Workflow, AppWindow];

export function Architecture() {
  return (
    <section aria-labelledby="arquitectura-title" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          id="arquitectura-title"
          eyebrow={architecture.eyebrow}
          title={architecture.title}
          subtitle={architecture.subtitle}
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <ol className="relative flex flex-col gap-4">
          {/* Conector vertical con pulso */}
          <span
            className="animate-scan-y absolute bottom-12 left-[2.65rem] top-12 hidden w-px overflow-hidden bg-white/10 sm:block"
            aria-hidden="true"
          />
          {architecture.layers.map((layer, i) => {
            const s = accent[layer.accent];
            const Icon = layerIcons[i];
            return (
              <Reveal as="li" key={layer.name} delay={i * 0.08} className="relative flex">
                <Frame className="flex-1" innerClassName="p-5 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <Knob size="sm" className={s.icon}>
                      <Icon className="size-5" />
                    </Knob>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <span className={`size-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
                        capa {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-1 text-card-title font-semibold text-fg">{layer.name}</h3>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {layer.items.map((item) => (
                          <li
                            key={item}
                            className={`rounded-lg bg-white/[0.04] px-3 py-1.5 font-mono text-xs ring-1 ring-white/[0.08] ${s.chip}`}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Frame>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
