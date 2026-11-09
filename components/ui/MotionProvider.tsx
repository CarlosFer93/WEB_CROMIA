"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/** Carga solo las funciones de animación necesarias y respeta prefers-reduced-motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
