"use client";

import { useId, useState } from "react";
import { CircleCheck, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import {
  HONEYPOT_FIELD,
  LIMITS,
  SECTOR_OPTIONS,
  normalizeContact,
  validateContact,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact";
import { contact } from "@/lib/content";
import { buttonClass } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

const inputBase =
  "mt-2 block w-full rounded-(--radius-card) border bg-black px-4 py-3 text-base text-fg placeholder:text-white/35 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] transition-[border-color,box-shadow] duration-(--duration-base) focus:outline-none focus:ring-4";
const inputOk = "border-white/12 hover:border-white/20 focus:border-green/70 focus:ring-green/15";
const inputErr = "border-red-400/80 focus:border-red-400 focus:ring-red-400/20";

export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverError, setServerError] = useState<string>("");

  const fieldId = (f: string) => `${uid}-${f}`;
  const errId = (f: ContactField) => `${uid}-${f}-error`;

  function fieldProps(f: ContactField) {
    const hasErr = Boolean(errors[f]);
    return {
      id: fieldId(f),
      name: f,
      "aria-invalid": hasErr || undefined,
      "aria-describedby": hasErr ? errId(f) : undefined,
      className: `${inputBase} ${hasErr ? inputErr : inputOk}`,
      onChange: () => {
        if (errors[f]) setErrors((prev) => ({ ...prev, [f]: undefined }));
      },
    };
  }

  function errorText(f: ContactField) {
    if (!errors[f]) return null;
    return (
      <p id={errId(f)} className="mt-1.5 text-sm font-medium text-red-400">
        {errors[f]}
      </p>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const data = normalizeContact(raw);
    const found = validateContact(data);

    if (Object.keys(found).length) {
      setErrors(found);
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setServerError("");
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, [HONEYPOT_FIELD]: raw[HONEYPOT_FIELD] ?? "" }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        errors?: ContactErrors;
      };
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error ?? "No pudimos enviar tu mensaje. Inténtalo de nuevo.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setServerError("Error de conexión. Revisa tu internet e inténtalo de nuevo.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="frame flex min-h-[28rem] flex-col items-center justify-center p-10 text-center"
      >
        <span className="knob size-16 text-green">
          <CircleCheck className="size-9" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-fg">{contact.successTitle}</h3>
        <p className="mt-2 max-w-sm text-muted">{contact.successBody}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={buttonClass("secondary", "md", "mt-8")}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-describedby={`${uid}-required-note`}
      className="frame relative"
    >
      <div className="card p-6 sm:p-9">
      <h3 className="text-xl font-semibold tracking-[-0.03em] text-fg sm:text-2xl">Agenda un diagnóstico</h3>
      <p id={`${uid}-required-note`} className="mt-1 text-sm text-muted">
        Todos los campos son obligatorios.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className="text-sm font-medium text-fg">
            Nombre
          </label>
          <input
            {...fieldProps("name")}
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            placeholder="Tu nombre"
            required
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={fieldId("company")} className="text-sm font-medium text-fg">
            Empresa u organización
          </label>
          <input
            {...fieldProps("company")}
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
            placeholder="Nombre de la organización"
            required
          />
          {errorText("company")}
        </div>
        <div>
          <label htmlFor={fieldId("email")} className="text-sm font-medium text-fg">
            Correo electrónico
          </label>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={LIMITS.email}
            placeholder="nombre@empresa.com"
            required
          />
          {errorText("email")}
        </div>
        <div>
          <label htmlFor={fieldId("sector")} className="text-sm font-medium text-fg">
            Sector
          </label>
          <select {...fieldProps("sector")} defaultValue="" required>
            <option value="" disabled>
              Selecciona un sector
            </option>
            {SECTOR_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errorText("sector")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={fieldId("message")} className="text-sm font-medium text-fg">
            Mensaje
          </label>
          <textarea
            {...fieldProps("message")}
            rows={5}
            maxLength={LIMITS.message}
            placeholder="Cuéntanos qué procesos te gustaría automatizar o mejorar."
            required
          />
          {errorText("message")}
        </div>

        {/* Honeypot anti-spam: invisible para personas, atractivo para bots */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor={fieldId(HONEYPOT_FIELD)}>No llenes este campo</label>
          <input id={fieldId(HONEYPOT_FIELD)} type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status === "error" && serverError && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl bg-red-500/10 p-4 text-sm font-medium text-red-300 ring-1 ring-red-400/25"
        >
          <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p>{serverError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={buttonClass("primary", "md", "mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto")}
      >
        {loading ? (
          <>
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
            Enviando…
          </>
        ) : (
          <>
            Enviar mensaje
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </button>
      <p className="sr-only" aria-live="polite">
        {loading ? "Enviando mensaje" : ""}
      </p>
      </div>
    </form>
  );
}
