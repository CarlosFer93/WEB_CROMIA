import { sectors } from "./content";

/** Validación compartida entre el formulario (cliente) y la API (servidor). */

export const SECTOR_OPTIONS = sectors.map((s) => s.name);

export type ContactInput = {
  name: string;
  company: string;
  email: string;
  sector: string;
  message: string;
};

export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const LIMITS = {
  name: 100,
  company: 120,
  email: 160,
  message: 3000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeContact(raw: Record<string, unknown>): ContactInput {
  return {
    name: str(raw.name),
    company: str(raw.company),
    email: str(raw.email).toLowerCase(),
    sector: str(raw.sector),
    message: str(raw.message),
  };
}

export function validateContact(data: ContactInput): ContactErrors {
  const errors: ContactErrors = {};

  if (data.name.length < 2) errors.name = "Escribe tu nombre.";
  else if (data.name.length > LIMITS.name) errors.name = "El nombre es demasiado largo.";

  if (data.company.length < 2) errors.company = "Escribe el nombre de tu empresa u organización.";
  else if (data.company.length > LIMITS.company) errors.company = "El nombre es demasiado largo.";

  if (!data.email) errors.email = "Escribe tu correo electrónico.";
  else if (!EMAIL_RE.test(data.email) || data.email.length > LIMITS.email)
    errors.email = "Escribe un correo electrónico válido.";

  if (!SECTOR_OPTIONS.includes(data.sector)) errors.sector = "Selecciona un sector.";

  if (data.message.length < 10)
    errors.message = "Cuéntanos un poco más (mínimo 10 caracteres).";
  else if (data.message.length > LIMITS.message)
    errors.message = `El mensaje no puede superar ${LIMITS.message} caracteres.`;

  return errors;
}

/** Nombre del campo trampa (honeypot) anti-spam. */
export const HONEYPOT_FIELD = "website";
