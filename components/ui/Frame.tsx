/**
 * Tarjeta de doble borde: marco exterior translúcido + tarjeta interior.
 * Es la pieza base de todas las grillas tipo "bento".
 */
export function Frame({
  children,
  className = "",
  innerClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div className={`frame flex ${className}`}>
      <div className={`card flex flex-1 flex-col ${innerClassName}`}>{children}</div>
    </div>
  );
}

/** Círculo oscuro con relieve que aloja un icono. */
export function Knob({
  children,
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const s = { sm: "size-11", md: "size-16", lg: "size-24" }[size];
  return (
    <span className={`knob shrink-0 text-fg ${s} ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}
