import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HeroWaves } from "@/components/ui/HeroWaves";
import { Isotipo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="nf-title"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy px-4 pb-16 pt-[calc(var(--header-h)+2rem)] text-center"
    >
      <HeroWaves className="-z-10" />
      <div className="max-w-xl">
        <Isotipo size={88} className="mx-auto drop-shadow-2xl" />
        <p className="mt-8 text-7xl font-extrabold tracking-tight text-brand-gradient sm:text-8xl">404</p>
        <h1 id="nf-title" className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          Esta página no existe
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-300 sm:text-lg">
          Puede que el enlace haya cambiado o que la dirección esté mal escrita. Te llevamos de vuelta.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-green px-7 py-3.5 font-semibold text-navy shadow-lg shadow-green/25 transition hover:bg-emerald-400"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
