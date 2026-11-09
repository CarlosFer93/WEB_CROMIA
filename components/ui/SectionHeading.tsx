import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "center" | "left";
  id?: string;
};

/** Encabezado de sección: etiqueta pequeña + título + subtítulo. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "center",
  id,
}: Props) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={`mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-slate-300" : "text-ink"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

export function Eyebrow({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.2em] ${
        tone === "dark" ? "text-green" : "text-green-ink"
      }`}
    >
      {children}
    </p>
  );
}

export function Badge({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
        tone === "dark"
          ? "bg-green/15 text-green ring-1 ring-green/30"
          : "bg-green/10 text-green-ink ring-1 ring-green/25"
      }`}
    >
      {children}
    </span>
  );
}

/** Chip de icono con degradado de marca. */
export function IconBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-md shadow-blue/20 ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
