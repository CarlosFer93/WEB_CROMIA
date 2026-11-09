import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IntroCurtain, introScript } from "@/components/layout/IntroCurtain";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const title = `${siteConfig.name} | Automatización e Inteligencia Artificial en Colombia`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

function OrganizationJsonLd() {
  const { contact, social } = siteConfig;
  const sameAs = [social.linkedin, social.instagram].filter((c) => !c.pending).map((c) => c.href);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/cromia-isotipo.png`,
    slogan: siteConfig.slogan,
    description: siteConfig.description,
    areaServed: { "@type": "Country", name: siteConfig.country },
    address: { "@type": "PostalAddress", addressCountry: "CO" },
    knowsAbout: [
      "Inteligencia Artificial",
      "Automatización de procesos",
      "Agentes inteligentes",
      "Analítica de datos",
      "Tecnología educativa",
    ],
    ...(contact.email.pending ? {} : { email: contact.email.value }),
    ...(sameAs.length ? { sameAs } : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${poppins.variable} antialiased`} suppressHydrationWarning>
      <body className="flex min-h-svh flex-col bg-canvas text-fg">
        {/* Marca que hay JS y controla el intro (logo B/N → color → cortinas) sin esperar a React */}
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <IntroCurtain />
        <OrganizationJsonLd />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-black"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
