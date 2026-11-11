import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SpotlightWordmark } from "@/components/ui/SpotlightWordmark";
import { hero, sectors } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-canvas pt-[calc(var(--header-h)+2rem)] sm:pt-[calc(var(--header-h)+2.5rem)]"
    >
      {/* Fondo estático y liviano: un solo degradado, sin animación ni blur */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(37,99,235,0.22),transparent_70%),radial-gradient(ellipse_50%_40%_at_70%_100%,rgba(16,185,129,0.12),transparent_70%)]"
        aria-hidden="true"
      />

      <Container className="flex flex-1 flex-col items-center justify-center text-center">
        <h1
          id="hero-title"
          className="max-w-5xl text-[clamp(2.5rem,5.3vw,4.75rem)] font-semibold leading-none tracking-[-0.05em] text-fg-soft"
        >
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
          className="enter-up mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
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
          className="enter-up mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[0.8125rem] text-white/55"
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

      <SpotlightWordmark className="enter-up mt-10" sizeClass="text-[18vw]" restingSpot={{ x: "50%", y: "45%" }} />
    </section>
  );
}
