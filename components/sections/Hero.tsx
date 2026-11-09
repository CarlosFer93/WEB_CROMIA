import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { Isotipo } from "@/components/ui/Logo";
import { hero, sectors } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-canvas pb-20 pt-[calc(var(--header-h)+2.5rem)]"
    >
      <HeroBackdrop className="-z-10" />

      <Container className="flex flex-col items-center text-center">
        <div className="enter-up relative">
          <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-blue/30 blur-3xl" aria-hidden="true" />
          <Isotipo size={112} priority className="size-20 drop-shadow-[0_18px_40px_rgba(37,99,235,0.55)] sm:size-28" />
        </div>

        <p
          className="enter-up mt-8 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-xs font-medium text-fg/80 ring-1 ring-white/10 backdrop-blur sm:text-[0.8125rem]"
          style={{ animationDelay: "80ms" }}
        >
          <span className="size-1.5 rounded-full bg-green shadow-[0_0_10px_2px_rgba(16,185,129,0.6)]" aria-hidden="true" />
          {hero.eyebrow}
        </p>

        <h1 id="hero-title" className="mt-6 max-w-5xl text-display font-semibold text-fg-soft">
          Automatizamos procesos con <span className="text-green">IA</span> para impulsar{" "}
          <span className="text-accent animate-accent-flare">el futuro de tu negocio.</span>
        </h1>

        <p
          className="enter-up mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8"
          style={{ animationDelay: "160ms" }}
        >
          {hero.subtitle}
        </p>

        <div
          className="enter-up mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          style={{ animationDelay: "240ms" }}
        >
          <ButtonLink href={hero.primaryCta.href}>
            {hero.primaryCta.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>

        <ul
          className="enter-up mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[0.8125rem] text-white/55"
          style={{ animationDelay: "320ms" }}
          aria-label="Sectores en los que trabajamos"
        >
          {sectors.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.name} className="inline-flex items-center gap-1.5">
                <Icon className="size-4 text-white/70" aria-hidden="true" />
                {s.name}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
