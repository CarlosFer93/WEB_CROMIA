import Link from "next/link";

type Variant = "primary" | "secondary" | "light";
type Size = "md" | "sm";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-[transform,filter,background-color] duration-(--duration-fast) ease-(--ease-out) active:scale-[0.97] motion-reduce:transition-none";

const sizes: Record<Size, string> = {
  md: "h-12 px-7 text-[0.9375rem]",
  sm: "h-11 px-5 text-sm",
};

const variants: Record<Variant, string> = {
  // Verde "cromado": acento de marca con brillo interior (dirección Planes)
  primary:
    "text-navy-950 bg-[linear-gradient(180deg,#6ee7b7_0%,var(--color-green)_55%,#0e9f6e_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(0,0,0,0.18),0_0_0_1px_rgba(16,185,129,0.5),0_10px_32px_-10px_rgba(16,185,129,0.6)] hover:brightness-110",
  // Cristal oscuro
  secondary:
    "text-fg bg-white/[0.06] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_0_1px_rgba(255,255,255,0.1),0_8px_24px_-12px_rgba(0,0,0,0.6)] hover:bg-white/[0.1]",
  // Blanco plateado
  light:
    "text-[#111218] bg-[linear-gradient(180deg,#ffffff_0%,#e6e8ee_60%,#cdd1da_100%)] shadow-[inset_0_1px_0_#fff,inset_0_-1px_0_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.35),0_10px_32px_-10px_rgba(170,185,230,0.45)] hover:brightness-105",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${sizes[size]} ${variants[variant]} ${extra}`;
}

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
};

/** Enlace con apariencia de botón (píldora). */
export function ButtonLink({ href, children, variant = "primary", size = "md", className = "", onClick }: ButtonLinkProps) {
  return (
    <Link href={href} onClick={onClick} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}
