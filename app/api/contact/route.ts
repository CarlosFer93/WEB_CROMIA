import { Resend } from "resend";
import { HONEYPOT_FIELD, normalizeContact, validateContact } from "@/lib/contact";
import { siteConfig } from "@/lib/site-config";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid");
    raw = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Solicitud inválida." }, 400);
  }

  // Honeypot: si un bot llenó el campo oculto, respondemos "ok" sin enviar nada.
  const trap = raw[HONEYPOT_FIELD];
  if (typeof trap === "string" && trap.trim() !== "") {
    return json({ ok: true });
  }

  const data = normalizeContact(raw);
  const errors = validateContact(data);
  if (Object.keys(errors).length) {
    return json({ ok: false, error: "Revisa los campos marcados.", errors }, 422);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error(
      "[contact] Faltan variables de entorno: RESEND_API_KEY y/o CONTACT_TO_EMAIL. Configúralas en Vercel.",
    );
    return json(
      {
        ok: false,
        error:
          "El formulario aún no está configurado en el servidor. Por favor escríbenos por otro medio mientras lo habilitamos.",
      },
      503,
    );
  }

  // Remitente: debe ser un dominio verificado en Resend.
  // Sin dominio verificado, Resend solo permite "onboarding@resend.dev" (útil para pruebas).
  const from = process.env.CONTACT_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`;

  const rows: [string, string][] = [
    ["Nombre", data.name],
    ["Empresa", data.company],
    ["Correo", data.email],
    ["Sector", data.sector],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0B2D5B;max-width:600px">
      <h2 style="margin:0 0 16px">Nuevo mensaje desde el sitio web de CromIA</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;font-weight:bold;white-space:nowrap">${k}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px">Mensaje</h3>
      <p style="white-space:pre-wrap;line-height:1.5;margin:0">${escapeHtml(data.message)}</p>
    </div>`;

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMensaje:\n${data.message}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      replyTo: data.email,
      subject: `Nuevo contacto web: ${data.name} (${data.company})`,
      html,
      text,
    });
    if (error) {
      console.error("[contact] Error de Resend:", error);
      return json({ ok: false, error: "No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde." }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error("[contact] Error inesperado:", err);
    return json({ ok: false, error: "No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde." }, 500);
  }
}
