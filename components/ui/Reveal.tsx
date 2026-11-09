"use client";

import { m } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Retraso en segundos (útil para listas escalonadas). */
  delay?: number;
  as?: "div" | "li" | "article";
};

/** Aparición sutil al hacer scroll. Con reduced-motion solo hace fundido. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
