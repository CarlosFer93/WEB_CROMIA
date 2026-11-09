import { ArrowDown, AppWindow, Database, Workflow } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { architecture } from "@/lib/content";

const accentStyles = {
  navy: { border: "border-l-navy", icon: "bg-navy text-white", chip: "bg-navy/5 text-navy ring-navy/10" },
  blue: { border: "border-l-blue", icon: "bg-blue text-white", chip: "bg-blue/5 text-blue ring-blue/15" },
  green: {
    border: "border-l-green",
    icon: "bg-green text-navy",
    chip: "bg-green/10 text-green-ink ring-green/20",
  },
} as const;

const layerIcons = [Database, Workflow, AppWindow];

export function Architecture() {
  return (
    <section aria-labelledby="arquitectura-title" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="arquitectura-title"
          eyebrow={architecture.eyebrow}
          title={architecture.title}
          subtitle={architecture.subtitle}
        />

        <ol className="mx-auto mt-14 flex max-w-4xl flex-col items-center">
          {architecture.layers.map((layer, i) => {
            const s = accentStyles[layer.accent];
            const Icon = layerIcons[i];
            return (
              <li key={layer.name} className="flex w-full flex-col items-center">
                <Reveal delay={i * 0.1} className="w-full">
                  <div
                    className={`w-full rounded-2xl border border-slate-200 border-l-4 bg-white p-6 shadow-md shadow-navy/5 sm:p-7 ${s.border}`}
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-3 sm:w-64 sm:shrink-0">
                        <span className={`flex size-10 items-center justify-center rounded-xl ${s.icon}`} aria-hidden="true">
                          <Icon className="size-5" />
                        </span>
                        <h3 className="text-sm font-bold uppercase leading-snug tracking-wider text-navy">
                          {layer.name}
                        </h3>
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {layer.items.map((item) => (
                          <li key={item} className={`rounded-lg px-3 py-1.5 text-sm font-medium ring-1 ${s.chip}`}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
                {i < architecture.layers.length - 1 && (
                  <span className="my-3 flex size-8 items-center justify-center rounded-full bg-ice text-blue" aria-hidden="true">
                    <ArrowDown className="size-4" />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
