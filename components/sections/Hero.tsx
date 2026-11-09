import { ArrowRight, ChevronDown } from "lucide-react";
import { HeroWaves } from "@/components/ui/HeroWaves";
import { Container } from "@/components/ui/Container";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy pb-20 pt-[calc(var(--header-h)+3rem)]"
    >
      <HeroWaves className="-z-10" />

      <Container>
        <div className="max-w-3xl">
          <p className="hero-in inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-green ring-1 ring-green/30 backdrop-blur sm:text-sm">
            <span className="size-1.5 rounded-full bg-green" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.35rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
          >
            Automatizamos procesos con <span className="text-green">IA</span> para impulsar{" "}
            <span className="text-brand-gradient">el futuro de tu negocio</span>
          </h1>

          <p
            className="hero-in mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            {hero.subtitle}
          </p>

          <div
            className="hero-in mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "220ms" }}
          >
            <a
              href={hero.primaryCta.href}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-green px-7 py-3.5 text-base font-semibold text-navy shadow-lg shadow-green/25 transition hover:bg-emerald-400"
            >
              {hero.primaryCta.label}
              <ArrowRight
                className="size-5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold text-white ring-1 ring-white/40 transition hover:bg-white/10 hover:ring-white/70"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </Container>

      <a
        href="#que-es"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full p-2 text-slate-400 transition hover:text-white md:block"
        aria-label="Bajar a la siguiente sección"
      >
        <ChevronDown className="size-6 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
      </a>
    </section>
  );
}
