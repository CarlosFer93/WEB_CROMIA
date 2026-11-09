import { Container } from "@/components/ui/Container";
import { Frame, Knob } from "@/components/ui/Frame";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { about } from "@/lib/content";

export function About() {
  return (
    <section id="que-es" aria-labelledby="about-title" className="py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 id="about-title" className="mt-3 text-title font-semibold text-fg">
            {about.title}
          </h2>
          {about.body.map((p) => (
            <p key={p} className="mt-5 max-w-xl text-base leading-8 text-muted sm:text-lg">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <Frame innerClassName="p-6 sm:p-8">
            {/* barra superior tipo ventana */}
            <div className="mb-6 flex items-center gap-2 text-xs text-muted">
              <span className="size-2 rounded-full bg-green" aria-hidden="true" />
              cromia / flujo-inteligente
            </div>
            <ol className="relative flex flex-col gap-5" aria-label="Cómo funciona CromIA">
              {/* Conector vertical con pulso de datos */}
              <span
                className="animate-scan-y absolute bottom-10 left-8 top-10 w-px overflow-hidden bg-white/10"
                aria-hidden="true"
              />
              {about.flow.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className="relative flex items-center gap-5">
                    <Knob className={i === about.flow.length - 1 ? "text-green" : "text-blue-soft"}>
                      <Icon className="size-6" />
                    </Knob>
                    <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
                      <p className="text-card-title font-semibold text-fg">{step.title}</p>
                      <p className="mt-0.5 text-sm text-muted">{step.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Frame>
        </Reveal>
      </Container>
    </section>
  );
}
