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

type Status = "idle" | "loading" | "success" | "error";

const inputBase =
  "mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-navy placeholder:text-slate-400 shadow-sm transition focus:outline-none focus:ring-4";
const inputOk = "border-slate-300 focus:border-blue focus:ring-blue/20";
const inputErr = "border-red-500 focus:border-red-500 focus:ring-red-500/20";

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
      <p id={errId(f)} className="mt-1.5 text-sm font-medium text-red-600">
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
        className="flex min-h-[28rem] flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-2xl shadow-navy-950/40"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-green/15 text-green-ink">
          <CircleCheck className="size-9" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-bold text-navy">{contact.successTitle}</h3>
        <p className="mt-2 max-w-sm text-ink">{contact.successBody}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-full px-6 py-3 font-semibold text-blue ring-1 ring-blue/30 transition hover:bg-blue/5"
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
      className="relative rounded-3xl bg-white p-6 shadow-2xl shadow-navy-950/40 sm:p-9"
    >
      <div className="absolute inset-x-8 top-0 h-1 rounded-b-full bg-brand-gradient" aria-hidden="true" />
      <h3 className="text-xl font-bold text-navy sm:text-2xl">Agenda un diagnóstico</h3>
      <p id={`${uid}-required-note`} className="mt-1 text-sm text-ink">
        Todos los campos son obligatorios.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className="text-sm font-semibold text-navy">
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
          <label htmlFor={fieldId("company")} className="text-sm font-semibold text-navy">
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
          <label htmlFor={fieldId("email")} className="text-sm font-semibold text-navy">
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
          <label htmlFor={fieldId("sector")} className="text-sm font-semibold text-navy">
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
          <label htmlFor={fieldId("message")} className="text-sm font-semibold text-navy">
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
          className="mt-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700 ring-1 ring-red-200"
        >
          <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p>{serverError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green px-7 py-3.5 text-base font-semibold text-navy shadow-lg shadow-green/25 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
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
    </form>
  );
}
