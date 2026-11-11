# CromIA — Sitio web corporativo

Sitio one-page de **CromIA**, empresa colombiana de automatización e inteligencia artificial.

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** (tokens de marca en `app/globals.css`)
- **Framer Motion** (animaciones sutiles, respeta `prefers-reduced-motion`)
- **lucide-react** (iconos) · **Poppins** vía `next/font`
- **Resend** para el formulario de contacto (`app/api/contact/route.ts`)

Todo el sitio se genera como estático. Solo el endpoint del formulario se ejecuta en el servidor.

---

## 1. Correr el proyecto en local

Requisitos: **Node.js 20.9 o superior** y npm.

```bash
npm install
cp .env.example .env.local   # completa las variables (ver sección 3)
npm run dev                  # http://localhost:3000
```

Otros comandos:

| Comando         | Qué hace                                   |
| --------------- | ------------------------------------------ |
| `npm run build` | Compila la versión de producción           |
| `npm run start` | Sirve la versión compilada (tras `build`)  |
| `npm run lint`  | Revisa el código con ESLint                |

---

## 2. Cómo editar textos y datos de contacto

| Qué quieres cambiar                                                     | Archivo                |
| ----------------------------------------------------------------------- | ---------------------- |
| Correo, WhatsApp, LinkedIn, Instagram, eslogan, descripción SEO, URL    | `lib/site-config.ts`   |
| Textos de todas las secciones (servicios, sectores, metodología, etc.)  | `lib/content.ts`       |
| Colores de marca                                                        | `app/globals.css` (`@theme`) |
| Logo / isotipo                                                          | `public/brand/`        |

### Datos de contacto pendientes (placeholders)

En `lib/site-config.ts`, cada canal tiene esta forma:

```ts
email: {
  value: "admin@cromiacol.co",          // texto visible
  href: "mailto:admin@cromiacol.co",    // enlace
  pending: false,                       // true = placeholder
},
```

Mientras `pending` sea `true`, el canal **no se muestra** en el sitio ni se incluye en los datos estructurados (SEO). Hoy solo **WhatsApp** está pendiente: cuando tengas el número, reemplaza `value` y `href` (formato `https://wa.me/57XXXXXXXXXX`, sin `+` ni espacios) y cambia `pending` a `false`.

### Logo

- `public/brand/cromia-logo-original.png`: copia exacta del archivo original.
- `public/brand/cromia-isotipo.png`: el mismo isotipo, recortado y con el halo semitransparente del fondo limpiado (512 px).
- `app/icon.png`, `app/apple-icon.png` y `app/favicon.ico` se generaron a partir del mismo archivo.

La imagen para redes sociales (Open Graph y Twitter) se genera en el build desde `app/opengraph-image.tsx`, con el isotipo y la fuente Poppins de `assets/fonts/`.

---

## 3. Variables de entorno

| Variable               | Obligatoria | Descripción |
| ---------------------- | ----------- | ----------- |
| `RESEND_API_KEY`       | Sí          | API key de [Resend](https://resend.com/api-keys). |
| `CONTACT_TO_EMAIL`     | Sí          | Correo que recibe los mensajes. Puedes poner varios separados por coma. |
| `CONTACT_FROM_EMAIL`   | Recomendada | Remitente, por ejemplo `CromIA <contacto@tudominio.com>`. Debe pertenecer a un **dominio verificado en Resend**. Si no la defines se usa `onboarding@resend.dev`, que **solo** entrega correos al email dueño de la cuenta de Resend (sirve solo para pruebas). |
| `NEXT_PUBLIC_SITE_URL` | Opcional    | URL pública sin `/` final (ej. `https://www.cromia.co`). Se usa en el sitemap, robots, Open Graph y JSON-LD. Si no la defines, en Vercel se usa automáticamente el dominio de producción del proyecto. |

Si faltan `RESEND_API_KEY` o `CONTACT_TO_EMAIL`, el sitio compila y funciona igual. El formulario mostrará el mensaje "El formulario aún no está configurado…" y el error quedará registrado en los logs del servidor.

### Configurar Resend (una sola vez)

1. Crea una cuenta en [resend.com](https://resend.com).
2. En **Domains**, agrega tu dominio y crea los registros DNS que te indique. Espera a que quede "Verified".
3. En **API Keys**, crea una key con permiso de envío.

---

## 4. Desplegar en Vercel

1. **Sube el proyecto a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Sitio web CromIA"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/cromia-web.git
   git push -u origin main
   ```
   (`.env.local` está en `.gitignore` y no se sube.)
2. Entra a [vercel.com/new](https://vercel.com/new) e **importa el repositorio**. Vercel detecta Next.js automáticamente y no hace falta cambiar ninguna configuración de build.
3. Antes de desplegar, abre **Environment Variables** y agrega `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL` (y `NEXT_PUBLIC_SITE_URL` si ya tienes dominio) para el entorno **Production**. Si quieres probar el formulario en los previews, agrégalas también en **Preview**.
4. Pulsa **Deploy**.
5. **Dominio propio** (opcional): en el proyecto, ve a *Settings → Domains*, agrega tu dominio y configura los DNS que indique Vercel. Luego actualiza `NEXT_PUBLIC_SITE_URL` y haz *Redeploy*.

Cada `git push` a `main` vuelve a desplegar el sitio automáticamente.

> Si cambias variables de entorno en Vercel, haz **Redeploy** para que se apliquen.

---

## 5. Estructura del proyecto

```
app/
  layout.tsx            Fuente, metadata SEO, JSON-LD, header y footer
  page.tsx              Página principal (orden de las secciones)
  not-found.tsx         Página 404
  api/contact/route.ts  Envío del formulario con Resend
  opengraph-image.tsx   Imagen para redes sociales (generada en el build)
  sitemap.ts, robots.ts, icon.png, apple-icon.png, favicon.ico
components/
  layout/               Header (menú móvil) y Footer
  sections/             Una componente por sección del sitio
  ui/                   Logo, ondas del hero, animaciones, utilidades
lib/
  site-config.ts        ← datos de contacto y configuración general
  content.ts            ← textos del sitio
  contact.ts            Validación compartida del formulario
public/brand/           Logo e isotipo
assets/fonts/           Poppins (TTF) para la imagen Open Graph
brand-assets/           Archivos fuente de marca (no se publican)
```
