import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { about } from "@/lib/content";

const accents = ["border-l-blue", "border-l-blue", "border-l-green"];
const iconColors = ["text-blue", "text-blue", "text-green-ink"];

export function About() {
  return (
    <section id="que-es" aria-labelledby="about-title" className="bg-white py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2
            id="about-title"
            className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl"
          >
            {about.title}
          </h2>
          {about.body.map((p) => (
            <p key={p} className="mt-5 max-w-xl text-base leading-relaxed text-ink sm:text-lg">
              {p}
            </p>
          ))}
        </Reveal>

        <ol className="mx-auto flex w-full max-w-md flex-col items-stretch" aria-label="Cómo funciona CromIA">
          {about.flow.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="flex flex-col items-center">
                <Reveal delay={i * 0.1} className="w-full">
                  <div
                    className={`flex w-full items-center gap-4 rounded-2xl border border-slate-200 border-l-4 bg-white p-5 shadow-sm shadow-navy/5 ${accents[i]}`}
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-ice">
                      <Icon className={`size-6 ${iconColors[i]}`} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-bold text-navy">{step.title}</p>
                      <p className="mt-0.5 text-sm text-ink">{step.description}</p>
                    </div>
                  </div>
                </Reveal>
                {i < about.flow.length - 1 && (
                  <span className="my-2 flex size-8 items-center justify-center text-slate-400" aria-hidden="true">
                    <ArrowDown className="size-5" />
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
