import { ArrowRight, Check, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Isotipo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { why } from "@/lib/content";

export function WhyCromia() {
  return (
    <section aria-labelledby="why-title" className="bg-ice py-20 sm:py-28">
      <Container>
        <SectionHeading id="why-title" title={why.title} subtitle={why.subtitle} />

        <div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          <Reveal className="h-full">
            <div className="h-full rounded-2xl border-t-4 border-t-slate-300 bg-white p-7 shadow-sm shadow-navy/5 sm:p-9">
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
                {why.problem.label}
              </span>
              <ul className="mt-6 space-y-5">
                {why.problem.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                      <X className="size-4" aria-hidden="true" />
                      <span className="sr-only">Problema:</span>
                    </span>
                    <span className="text-base text-navy sm:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Isotipo con flecha (solo desktop) */}
          <div className="relative hidden flex-col items-center lg:flex" aria-hidden="true">
            <Isotipo size={120} className="drop-shadow-xl" />
            <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-navy text-white shadow-lg ring-4 ring-ice">
              <ArrowRight className="size-5" />
            </span>
          </div>

          <Reveal delay={0.1} className="h-full">
            <div className="h-full rounded-2xl border-t-4 border-t-green bg-white p-7 shadow-lg shadow-navy/10 sm:p-9">
              <span className="inline-flex rounded-full bg-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-ink">
                {why.impact.label}
              </span>
              <ul className="mt-6 space-y-5">
                {why.impact.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-green/15 text-green-ink">
                      <Check className="size-4" aria-hidden="true" />
                      <span className="sr-only">Solución:</span>
                    </span>
                    <span className="text-base font-medium text-navy sm:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
