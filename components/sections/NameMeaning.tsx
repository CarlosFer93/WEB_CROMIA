import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Reveal } from "@/components/ui/Reveal";
import { Badge, Eyebrow } from "@/components/ui/SectionHeading";
import { nameMeaning } from "@/lib/content";

function Chips({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label={label}>
      {items.map((w) => (
        <li key={w} className="rounded-full bg-white/[0.05] px-3.5 py-1.5 text-sm text-white/75 ring-1 ring-white/10">
          {w}
        </li>
      ))}
    </ul>
  );
}

export function NameMeaning() {
  return (
    <section aria-labelledby="name-title" className="relative overflow-hidden py-20 sm:py-28">
      <Container>
        <Reveal className="text-center">
          <Eyebrow>{nameMeaning.eyebrow}</Eyebrow>
          <h2 id="name-title" className="sr-only">
            El significado del nombre CromIA
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal className="flex">
            <Frame className="flex-1" innerClassName="items-center px-6 py-12 text-center sm:py-16">
              <p className="text-chrome animate-chrome-flare text-[clamp(4.5rem,11vw,8rem)] font-semibold leading-none tracking-[-0.05em]">
                Crom
              </p>
              <Chips items={nameMeaning.crom} label="Crom significa" />
            </Frame>
          </Reveal>
          <Reveal delay={0.08} className="flex">
            <Frame className="flex-1" innerClassName="items-center px-6 py-12 text-center sm:py-16">
              <div
                className="pointer-events-none absolute left-1/2 top-10 size-56 -translate-x-1/2 rounded-full bg-green/20 blur-3xl"
                aria-hidden="true"
              />
              <p className="relative bg-linear-to-b from-green-soft to-green-deep bg-clip-text text-[clamp(4.5rem,11vw,8rem)] font-semibold leading-none tracking-[-0.05em] text-transparent">
                IA
              </p>
              <Chips items={nameMeaning.ia} label="IA significa" />
            </Frame>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-base leading-8 text-muted sm:text-lg">{nameMeaning.body}</p>
          <Badge className="mt-8 px-5 py-2.5 text-sm sm:text-base">{nameMeaning.quote}</Badge>
        </Reveal>
      </Container>
    </section>
  );
}
