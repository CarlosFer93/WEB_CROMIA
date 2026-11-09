import { Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HeroWaves } from "@/components/ui/HeroWaves";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { contact } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { email, whatsapp } = siteConfig.contact;
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="relative isolate overflow-hidden bg-navy py-20 sm:py-28"
    >
      <HeroWaves className="-z-10 opacity-60" />
      <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28">
          <Eyebrow tone="dark">{contact.eyebrow}</Eyebrow>
          <h2
            id="contacto-title"
            className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.6rem]"
          >
            {contact.quoteFirst} <span className="text-green">{contact.quoteSecond}</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">{contact.body}</p>

          <ul className="mt-10 space-y-4">
            {!email.pending && (
              <li>
                <a href={email.href} className="inline-flex items-center gap-3 text-white hover:text-green">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white/10" aria-hidden="true">
                    <Mail className="size-5" />
                  </span>
                  {email.value}
                </a>
              </li>
            )}
            {!whatsapp.pending && (
              <li>
                <a
                  href={whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white hover:text-green"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white/10" aria-hidden="true">
                    <MessageCircle className="size-5" />
                  </span>
                  WhatsApp: {whatsapp.value}
                </a>
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
