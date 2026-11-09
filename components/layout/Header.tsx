"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navItems } from "@/lib/site-config";

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrolled = () => window.scrollY > 24;
const getServerScrolled = () => false;

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

  // Cierra el menú móvil con Escape y bloquea el scroll del fondo.
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

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        solid
          ? "bg-navy/95 shadow-lg shadow-navy-950/30 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/#inicio" className="rounded-lg" aria-label="CromIA — ir al inicio">
          <Logo tone="dark" size={34} textClassName="text-[1.45rem]" priority />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-white ${
                    isActive ? "text-white" : "text-slate-300"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-gradient transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/#contacto"
          className="hidden rounded-full bg-green px-5 py-2.5 text-sm font-semibold text-navy shadow-md shadow-green/20 transition hover:bg-emerald-400 lg:inline-flex"
        >
          Agenda un diagnóstico
        </Link>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl text-white hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-white/10 bg-navy lg:hidden"
      >
        <ul className="flex flex-col gap-1 px-4 py-6 sm:px-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? "true" : undefined}
                className={`block rounded-xl px-4 py-3 text-lg font-medium hover:bg-white/5 ${
                  active === item.id ? "text-green" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-4 sm:px-6">
          <Link
            href="/#contacto"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center rounded-full bg-green px-6 py-3.5 font-semibold text-navy"
          >
            Agenda un diagnóstico
          </Link>
        </div>
      </div>
    </header>
  );
}
