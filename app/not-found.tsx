import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { Isotipo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="nf-title"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-canvas px-4 pb-16 pt-[calc(var(--header-h)+2rem)] text-center"
    >
      <HeroBackdrop className="-z-10" />
      <div className="max-w-xl">
        <Isotipo size={80} className="mx-auto drop-shadow-[0_18px_40px_rgba(37,99,235,0.55)]" />
        <p className="text-chrome animate-chrome-flare mt-8 text-[clamp(5rem,16vw,8rem)] font-semibold leading-none tracking-[-0.06em]">
          404
        </p>
        <h1 id="nf-title" className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">
          Esta página no existe
        </h1>
        <p className="mt-3 text-base leading-7 text-white/60 sm:text-lg">
          Puede que el enlace haya cambiado o que la dirección esté mal escrita. Te llevamos de vuelta.
        </p>
        <ButtonLink href="/" className="mt-10">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver al inicio
        </ButtonLink>
      </div>
    </section>
  );
}
