/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN GENERAL DEL SITIO — edita aquí tus datos.
 * ─────────────────────────────────────────────────────────────
 *
 * Los campos marcados con `pending: true` son PLACEHOLDERS:
 * NO se muestran en el sitio ni se incluyen en los datos estructurados (SEO).
 * Cuando tengas el dato real, reemplaza `value` y `href` y cambia `pending` a `false`.
 */

export type ContactChannel = {
  /** Texto visible */
  value: string;
  /** Enlace (mailto:, https://wa.me/..., https://...) */
  href: string;
  /** true = todavía es un placeholder */
  pending: boolean;
};

/**
 * URL pública del sitio. Orden de prioridad:
 * 1. Variable NEXT_PUBLIC_SITE_URL (recomendado cuando tengas dominio propio).
 * 2. Dominio de producción que Vercel asigna automáticamente.
 * 3. Valor local por defecto.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "CromIA",
  /** Eslogan principal (footer, OG, JSON-LD) */
  slogan: "Inteligencia que transforma procesos.",
  /** Lema de marca (etiqueta del hero) */
  tagline: "Automatización inteligente para un mundo en evolución",
  description:
    "CromIA es una empresa colombiana de automatización e inteligencia artificial. Diseñamos soluciones flexibles y escalables para educación, empresas, salud, industria, comercio e investigación.",
  url: resolveSiteUrl(),
  locale: "es_CO",
  country: "Colombia",
  keywords: [
    "CromIA",
    "inteligencia artificial",
    "automatización de procesos",
    "IA en Colombia",
    "agentes inteligentes",
    "EdTech",
    "automatización empresarial",
    "analítica de datos",
    "transformación digital",
  ],

  contact: {
    email: {
      value: "admin@cromiacol.co",
      href: "mailto:admin@cromiacol.co",
      pending: false,
    },
    // TODO: reemplaza por el número real (formato wa.me sin + ni espacios)
    whatsapp: {
      value: "+57 300 000 0000",
      href: "https://wa.me/573000000000",
      pending: true,
    },
  } satisfies Record<string, ContactChannel>,

  social: {
    linkedin: {
      value: "LinkedIn",
      href: "https://www.linkedin.com/company/cromiacol",
      pending: false,
    },
    instagram: {
      value: "Instagram",
      href: "https://www.instagram.com/cromia_col",
      pending: false,
    },
  } satisfies Record<string, ContactChannel>,
} as const;

export const navItems = [
  { label: "Inicio", href: "/#inicio", id: "inicio" },
  { label: "Servicios", href: "/#servicios", id: "servicios" },
  { label: "Sectores", href: "/#sectores", id: "sectores" },
  { label: "Metodología", href: "/#metodologia", id: "metodologia" },
  { label: "Nosotros", href: "/#nosotros", id: "nosotros" },
  { label: "Contacto", href: "/#contacto", id: "contacto" },
] as const;
