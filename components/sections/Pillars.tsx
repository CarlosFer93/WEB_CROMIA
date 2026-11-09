import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconBadge, SectionHeading } from "@/components/ui/SectionHeading";
import { pillars } from "@/lib/content";

export function Pillars() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-title"
      className="relative overflow-hidden bg-navy py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-blue/20 blur-[140px]"
        aria-hidden="true"
      />
      <Container className="relative">
        <SectionHeading
          id="servicios-title"
          tone="dark"
          eyebrow={pillars.eyebrow}
          title={
            <>
              {pillars.title}{" "}
              <span className="text-brand-gradient">{pillars.titleAccent}</span>
            </>
          }
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal as="li" key={item.title} delay={i * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-2xl bg-white/[0.04] p-7 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:ring-white/20">
                  <div className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" aria-hidden="true" />
                  <IconBadge>
                    <Icon className="size-5" />
                  </IconBadge>
                  <h3 className="mt-6 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-300">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
