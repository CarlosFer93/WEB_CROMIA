import { Container } from "@/components/ui/Container";
import { Frame, Knob } from "@/components/ui/Frame";
import { Isotipo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { vision } from "@/lib/content";

/** Resalta las palabras clave de la visión; el resto queda atenuado. */
function VisionQuote({ text }: { text: string }) {
  const highlight = ["Inteligencia Artificial", "transformación real"];
  const parts = text.split(new RegExp(`(${highlight.join("|")})`));
  return (
    <>
      {parts.map((p, i) =>
        highlight.includes(p) ? (
          <span key={i} className="text-fg">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function Vision() {
  return (
    <section id="nosotros" aria-labelledby="vision-title" className="py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <Isotipo size={56} className="drop-shadow-[0_12px_30px_rgba(37,99,235,0.5)]" />
          </div>
          <Eyebrow className="mt-6">{vision.eyebrow}</Eyebrow>
          <h2 id="vision-title" className="sr-only">
            Nuestra visión
          </h2>
          <blockquote className="mt-6">
            <p className="text-[clamp(1.5rem,3.4vw,2.6rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-white/45">
              “<VisionQuote text={vision.quote} />”
            </p>
          </blockquote>
        </Reveal>

        <div className="mt-24">
          <Reveal>
            <h3 className="text-center text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">
              {vision.valuesTitle}
            </h3>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vision.values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal as="li" key={v.title} delay={i * 0.06} className="flex">
                  <Frame className="flex-1" innerClassName="items-start p-6">
                    <Knob className={i % 2 ? "text-green" : "text-blue-soft"}>
                      <Icon className="size-6" />
                    </Knob>
                    <h4 className="mt-8 text-card-title font-semibold text-fg">{v.title}</h4>
                    <p className="mt-1.5 text-sm leading-6 text-muted">{v.description}</p>
                  </Frame>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
