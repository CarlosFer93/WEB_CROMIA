"use client";

import { useRef } from "react";

/**
 * Wordmark gigante del footer con un foco de luz azul/verde que sigue al puntero.
 * Solo actualiza variables CSS (sin re-render). Es decorativo (aria-hidden).
 */
export function SpotlightWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
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
    ref.current?.style.setProperty("--spot-o", "0");
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative select-none overflow-hidden [--spot-o:0] [--spot-x:50%] [--spot-y:60%]"
    >
      <p
        className="translate-y-[12%] text-center text-[25vw] font-bold leading-[0.85] tracking-[-0.06em] text-transparent"
      >
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
        className="absolute inset-0 translate-y-[12%] text-center text-[25vw] font-bold leading-[0.85] tracking-[-0.06em] text-transparent opacity-(--spot-o) transition-opacity duration-(--duration-slow)"
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
