import { Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { contact } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { email, whatsapp } = siteConfig.contact;
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="relative isolate overflow-hidden py-20 sm:py-28">
      <div className="animate-aurora pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-40 top-1/4 size-[36rem] rounded-full bg-blue/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 size-[30rem] rounded-full bg-green/15 blur-[140px]" />
      </div>
      <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28">
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <h2 id="contacto-title" className="mt-4 text-title font-semibold text-fg">
            {contact.quoteFirst} <span className="text-accent">{contact.quoteSecond}</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-muted sm:text-lg">{contact.body}</p>

          <ul className="mt-10 space-y-3">
            {!email.pending && (
              <li>
                <a href={email.href} className="inline-flex min-h-11 items-center gap-3 text-fg hover:text-green">
                  <span className="knob size-10" aria-hidden="true">
                    <Mail className="size-4" />
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
                  className="inline-flex min-h-11 items-center gap-3 text-fg hover:text-green"
                >
                  <span className="knob size-10" aria-hidden="true">
                    <MessageCircle className="size-4" />
                  </span>
                  WhatsApp: {whatsapp.value}
                </a>
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
