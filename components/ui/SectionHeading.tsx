import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  id?: string;
  className?: string;
};

/** Encabezado de sección: etiqueta + título compacto + subtítulo atenuado. */
export function SectionHeading({ eyebrow, title, subtitle, align = "left", id, className = "" }: Props) {
  const center = align === "center";
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="mt-3 text-title font-semibold text-fg">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-7 text-muted sm:text-lg sm:leading-8 ${center ? "mx-auto max-w-2xl" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/** Etiqueta pequeña sobre los títulos. */
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2 text-[0.8125rem] font-medium text-muted ${className}`}>
      <span className="size-1.5 rounded-full bg-green shadow-[0_0_10px_2px_rgba(16,185,129,0.6)]" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Píldora de cristal (badges). */
export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-fg ring-1 ring-white/10 backdrop-blur ${className}`}
    >
      {children}
    </span>
  );
}
