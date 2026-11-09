import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { nameMeaning } from "@/lib/content";

export function NameMeaning() {
  return (
    <section aria-labelledby="name-title" className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Decoración sutil */}
      <div
        className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-blue/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-10 size-72 rounded-full bg-green/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <Reveal className="text-center">
          <Eyebrow>{nameMeaning.eyebrow}</Eyebrow>
          <h2 id="name-title" className="sr-only">
            El significado del nombre CromIA
          </h2>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-8">
          <Reveal>
            <div className="h-full rounded-2xl border-t-4 border-t-navy bg-ice/60 p-8 text-center sm:p-10">
              <p className="text-6xl font-extrabold tracking-tight text-navy sm:text-7xl">Crom</p>
              <ul className="mt-5 flex flex-wrap justify-center gap-2" aria-label="Crom significa">
                {nameMeaning.crom.map((w) => (
                  <li
                    key={w}
                    className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-navy ring-1 ring-slate-200"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="flex items-center justify-center" aria-hidden="true">
            <span className="flex size-12 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg">
              <Plus className="size-6" />
            </span>
          </div>

          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border-t-4 border-t-green bg-ice/60 p-8 text-center sm:p-10">
              <p className="text-6xl font-extrabold tracking-tight text-green-deep sm:text-7xl">IA</p>
              <ul className="mt-5 flex flex-wrap justify-center gap-2" aria-label="IA significa">
                {nameMeaning.ia.map((w) => (
                  <li
                    key={w}
                    className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-navy ring-1 ring-slate-200"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-ink sm:text-lg">{nameMeaning.body}</p>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <blockquote className="relative overflow-hidden rounded-2xl bg-navy px-8 py-8 text-center shadow-xl shadow-navy/20 sm:px-12">
            <div className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" aria-hidden="true" />
            <p className="text-xl font-semibold text-white sm:text-2xl">{nameMeaning.quote}</p>
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}
