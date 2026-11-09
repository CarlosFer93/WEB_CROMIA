"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Retraso en segundos (útil para listas escalonadas). */
  delay?: number;
  as?: "div" | "li" | "article" | "section";
};

/**
 * Aparición al entrar en pantalla (una sola vez): opacidad + desplazamiento + blur.
 * La animación vive en CSS (`[data-reveal]` en globals.css) y solo se activa si hay JS
 * y el usuario no pidió reducir el movimiento.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <Tag
      // @ts-expect-error — ref polimórfico compatible con todos los elementos permitidos
      ref={ref}
      className={className}
      data-reveal=""
      data-shown={inView ? "" : undefined}
      style={delay ? ({ "--reveal-delay": `${Math.round(delay * 1000)}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
