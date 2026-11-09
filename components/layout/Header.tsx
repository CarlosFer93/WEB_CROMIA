"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { navItems } from "@/lib/site-config";

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrolled = () => window.scrollY > 24;
const getServerScrolled = () => false;

const pill =
  "rounded-full bg-black/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-xl";

export function Header() {
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getServerScrolled);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Resalta la sección visible en la navegación.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Escape cierra el menú móvil; se bloquea el scroll del fondo mientras está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-(--duration-slow) ${
        scrolled || open ? "border-b border-white/[0.06] bg-black/50 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-[var(--header-h)] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link href="/#inicio" className="rounded-lg" aria-label="CromIA — ir al inicio">
          <Logo tone="dark" size={28} textClassName="text-lg tracking-[-0.02em]" />
        </Link>

        <div className={`hidden items-center gap-1 p-1 lg:flex ${pill}`}>
          <ul className="flex items-center">
            {navItems.slice(1).map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`inline-flex h-9 items-center rounded-full px-4 text-sm font-medium tracking-[-0.02em] transition-colors duration-(--duration-base) ${
                      isActive ? "bg-white/[0.08] text-fg" : "text-white/60 hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink href="/#contacto" size="sm" className="ml-1 !h-9 !px-4">
            Agenda un diagnóstico
          </ButtonLink>
        </div>

        <button
          type="button"
          className={`inline-flex size-11 items-center justify-center text-fg lg:hidden ${pill}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-var(--header-h))] overflow-y-auto bg-black/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="flex flex-col gap-1 px-4 py-6 sm:px-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? "true" : undefined}
                className={`flex min-h-12 items-center rounded-xl px-4 text-2xl font-semibold tracking-[-0.03em] hover:bg-white/5 ${
                  active === item.id ? "text-green" : "text-fg"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-4 sm:px-6">
          <ButtonLink href="/#contacto" className="w-full" onClick={() => setOpen(false)}>
            Agenda un diagnóstico
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
