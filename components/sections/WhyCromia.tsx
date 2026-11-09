import { ArrowRight, Check, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Isotipo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { why } from "@/lib/content";

export function WhyCromia() {
  return (
    <section aria-labelledby="why-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading id="why-title" title={why.title} subtitle={why.subtitle} />

        <div className="mt-14 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
          <Reveal className="flex">
            <Frame className="flex-1" innerClassName="p-7 sm:p-9">
              <p className="text-[0.8125rem] font-medium text-muted">{why.problem.label}</p>
              <ul className="mt-6 space-y-5">
                {why.problem.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400 ring-1 ring-red-400/20">
                      <X className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">Problema:</span>
                    </span>
                    <span className="text-base text-white/70 sm:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </Frame>
          </Reveal>

          {/* Isotipo con flecha al centro (desktop) */}
          <div className="hidden items-center justify-center md:flex" aria-hidden="true">
            <div className="knob relative size-24">
              <Isotipo size={52} />
              <span className="absolute -right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-green text-navy-950 shadow-[0_0_20px_rgba(16,185,129,0.6)]">
                <ArrowRight className="size-4" />
              </span>
            </div>
          </div>

          <Reveal delay={0.08} className="flex">
            <Frame className="flex-1" innerClassName="p-7 sm:p-9">
              <div
                className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-green/15 blur-3xl"
                aria-hidden="true"
              />
              <p className="relative text-[0.8125rem] font-medium text-green">{why.impact.label}</p>
              <ul className="relative mt-6 space-y-5">
                {why.impact.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-green/15 text-green ring-1 ring-green/30">
                      <Check className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">Solución:</span>
                    </span>
                    <span className="text-base font-medium text-fg sm:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </Frame>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}
