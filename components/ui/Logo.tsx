import Image from "next/image";
import isotipo from "@/public/brand/cromia-isotipo.png";

type Tone = "light" | "dark";

/** Wordmark oficial: "Crom" en navy (o blanco sobre fondo oscuro) + "IA" en verde. */
export function Wordmark({
  tone = "light",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <span className={`font-bold tracking-tight ${className}`}>
      <span className={tone === "dark" ? "text-white" : "text-navy"}>Crom</span>
      <span className="text-green">IA</span>
    </span>
  );
}

export function Isotipo({
  size = 40,
  className = "",
  priority = false,
  alt = "",
}: {
  size?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  return (
    <Image
      src={isotipo}
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      className={className}
      sizes={`${size}px`}
    />
  );
}

/** Logo completo: isotipo + wordmark. */
export function Logo({
  tone = "light",
  size = 36,
  textClassName = "text-2xl",
  priority = false,
}: {
  tone?: Tone;
  size?: number;
  textClassName?: string;
  priority?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <Isotipo size={size} priority={priority} />
      <Wordmark tone={tone} className={textClassName} />
    </span>
  );
}
