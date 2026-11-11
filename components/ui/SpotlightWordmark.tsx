"use client";

import { useRef } from "react";

type Props = {
  className?: string;
  /** Tamaño del texto (clase de Tailwind). */
  sizeClass?: string;
  /**
   * Muestra un foco de color fijo cuando el puntero no está encima
   * (útil en el hero y en pantallas táctiles, donde no hay cursor).
   */
  restingSpot?: { x: string; y: string };
};

/**
 * Wordmark gigante "CromIA" con un foco de luz azul/verde que sigue al puntero.
 * Solo actualiza variables CSS (sin re-render). Es decorativo (aria-hidden).
 */
export function SpotlightWordmark({ className = "", sizeClass = "text-[25vw]", restingSpot }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--spot-x", `${x}%`);
      el.style.setProperty("--spot-y", `${y}%`);
      el.style.setProperty("--spot-o", "1");
    });
  }

  function onPointerLeave() {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    if (restingSpot) {
      el.style.setProperty("--spot-x", restingSpot.x);
      el.style.setProperty("--spot-y", restingSpot.y);
    } else {
      el.style.setProperty("--spot-o", "0");
    }
  }

  const initial = {
    "--spot-o": restingSpot ? "1" : "0",
    "--spot-x": restingSpot?.x ?? "50%",
    "--spot-y": restingSpot?.y ?? "60%",
  } as React.CSSProperties;

  const text = `text-center ${sizeClass} font-bold leading-[0.85] tracking-[-0.06em] text-transparent`;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={initial}
      className={`relative select-none overflow-hidden ${className}`}
    >
      <p className={`translate-y-[12%] ${text}`}>
        <span
          className="bg-clip-text"
          style={{ backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.05) 10%, rgba(255,255,255,0.5) 100%)" }}
        >
          Crom
        </span>
        <span
          className="bg-clip-text"
          style={{ backgroundImage: "linear-gradient(180deg, rgba(16,185,129,0.06) 10%, rgba(16,185,129,0.55) 100%)" }}
        >
          IA
        </span>
      </p>
      {/* Capa del foco: misma palabra, coloreada solo alrededor del puntero */}
      <p
        className={`absolute inset-0 translate-y-[12%] opacity-(--spot-o) transition-opacity duration-(--duration-slow) ${text}`}
        style={{
          backgroundImage:
            "radial-gradient(circle 18vw at var(--spot-x) var(--spot-y), #60a5fa 0%, #34d399 45%, transparent 75%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        CromIA
      </p>
    </div>
  );
}
