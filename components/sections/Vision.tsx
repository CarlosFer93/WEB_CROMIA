import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Isotipo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, IconBadge } from "@/components/ui/SectionHeading";
import { vision } from "@/lib/content";

export function Vision() {
  return (
    <section id="nosotros" aria-labelledby="vision-title" className="bg-ice py-20 sm:py-28">
      <Container>
        <Reveal>
          <figure className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white px-6 py-12 shadow-xl shadow-navy/10 sm:px-14 sm:py-16">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-gradient" aria-hidden="true" />
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
              <Isotipo size={56} />
              <div className="text-center sm:text-left">
                <Eyebrow>{vision.eyebrow}</Eyebrow>
                <h2 id="vision-title" className="mt-1 text-2xl font-extrabold text-navy sm:text-3xl">
                  Hacia dónde vamos
                </h2>
              </div>
            </div>
            <blockquote className="relative mt-10">
              <Quote className="size-10 text-green/40 sm:absolute sm:-left-2 sm:top-0 sm:size-12" aria-hidden="true" />
              <p className="relative mt-3 text-xl sm:mt-0 sm:pl-14 font-medium leading-relaxed text-navy sm:text-2xl lg:text-[1.9rem] lg:leading-snug">
                {vision.quote}
              </p>
            </blockquote>
          </figure>
        </Reveal>

        <div className="mt-20">
          <Reveal className="text-center">
            <h3 className="text-2xl font-extrabold text-navy sm:text-3xl">{vision.valuesTitle}</h3>
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vision.values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal as="li" key={v.title} delay={i * 0.08}>
                  <article className="h-full rounded-2xl border-t-4 border-t-blue bg-white p-6 shadow-sm shadow-navy/5 transition hover:-translate-y-1 hover:shadow-md">
                    <IconBadge>
                      <Icon className="size-5" />
                    </IconBadge>
                    <h4 className="mt-5 text-lg font-bold text-navy">{v.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink">{v.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
