import { Container } from "@/components/ui/Container";
import { Frame, Knob } from "@/components/ui/Frame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { methodology } from "@/lib/content";

export function Methodology() {
  return (
    <section id="metodologia" aria-labelledby="metodologia-title" className="relative py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_100%,rgba(16,185,129,0.1),transparent_60%)]"
        aria-hidden="true"
      />
      <Container>
        <SectionHeading
          id="metodologia-title"
          eyebrow={methodology.eyebrow}
          title={methodology.title}
          subtitle={methodology.subtitle}
        />

        <div className="relative mt-14">
          {/* Línea conectora con pulso (desktop) */}
          <span
            className="animate-scan-x absolute left-[10%] right-[10%] top-[3.25rem] hidden h-px overflow-hidden bg-white/10 lg:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {methodology.steps.map((step, i) => {
              const Icon = step.icon;
              const number = String(i + 1).padStart(2, "0");
              return (
                <Reveal as="li" key={step.title} delay={i * 0.06} className="flex">
                  <Frame className="flex-1" innerClassName="p-6">
                    <div className="flex items-center justify-between">
                      <Knob size="sm" className={i === 4 ? "text-green" : "text-blue-soft"}>
                        <Icon className="size-5" />
                      </Knob>
                      <span className="font-mono text-xs text-muted" aria-hidden="true">
                        {number}
                      </span>
                    </div>
                    <h3 className="mt-8 text-card-title font-semibold text-fg">
                      <span className="sr-only">Paso {number}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted">{step.description}</p>
                  </Frame>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
