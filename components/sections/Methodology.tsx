import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { methodology } from "@/lib/content";

export function Methodology() {
  return (
    <section
      id="metodologia"
      aria-labelledby="metodologia-title"
      className="relative overflow-hidden bg-navy py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute -bottom-48 -right-32 size-[36rem] rounded-full bg-green/15 blur-[140px]"
        aria-hidden="true"
      />
      <Container className="relative">
        <SectionHeading
          id="metodologia-title"
          tone="dark"
          eyebrow={methodology.eyebrow}
          title={methodology.title}
          subtitle={methodology.subtitle}
        />

        <div className="relative mt-16">
          {/* Línea conectora: vertical en móvil, horizontal en desktop */}
          <span
            className="absolute bottom-6 left-[1.6rem] top-6 w-px bg-linear-to-b from-blue via-blue/60 to-green lg:hidden"
            aria-hidden="true"
          />
          <span
            className="absolute left-[10%] right-[10%] top-[1.6rem] hidden h-px bg-linear-to-r from-blue via-blue/60 to-green lg:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-5">
          {methodology.steps.map((step, i) => {
            const Icon = step.icon;
            const number = String(i + 1).padStart(2, "0");
            return (
              <Reveal as="li" key={step.title} delay={i * 0.08} className="relative">
                <div className="flex h-full gap-5 lg:flex-col lg:items-center lg:text-center">
                  <span className="relative z-10 flex size-[3.25rem] shrink-0 items-center justify-center rounded-full bg-navy text-white ring-2 ring-blue/60">
                    <span className="absolute inset-1 rounded-full bg-brand-gradient" aria-hidden="true" />
                    <Icon className="relative size-5" aria-hidden="true" />
                  </span>
                  <div className="flex-1 rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10 lg:mt-6 lg:w-full lg:flex-1">
                    <p className="text-3xl font-extrabold text-brand-gradient" aria-hidden="true">
                      {number}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-white">
                      <span className="sr-only">Paso {number}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
