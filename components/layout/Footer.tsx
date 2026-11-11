import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { SpotlightWordmark } from "@/components/ui/SpotlightWordmark";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { sectors } from "@/lib/content";
import { navItems, siteConfig, type ContactChannel } from "@/lib/site-config";

function ChannelLink({
  channel,
  icon,
  label,
}: {
  channel: ContactChannel;
  icon: React.ReactNode;
  label: string;
}) {
  const external = channel.href.startsWith("http");
  return (
    <a
      href={channel.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1 rounded-lg text-white/65 transition-colors hover:text-fg"
    >
      <span className="knob size-9">
        {icon}
      </span>
      <span>
        <span className="sr-only">{label}: </span>
        {channel.value}
      </span>
    </a>
  );
}

export function Footer() {
  const { contact, social } = siteConfig;
  // Los canales con `pending: true` en lib/site-config.ts no se muestran.
  const channels = [
    { label: "Correo", channel: contact.email, icon: <Mail className="size-4" aria-hidden="true" /> },
    { label: "WhatsApp", channel: contact.whatsapp, icon: <MessageCircle className="size-4" aria-hidden="true" /> },
    { label: "LinkedIn de CromIA", channel: social.linkedin, icon: <LinkedInIcon className="size-4" /> },
    { label: "Instagram de CromIA", channel: social.instagram, icon: <InstagramIcon className="size-4" /> },
  ];
  return (
    <footer className="border-t border-white/[0.08] bg-canvas text-white/65">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:px-8">
        <div>
          <Link href="/#inicio" aria-label="CromIA — ir al inicio" className="inline-block rounded-lg">
            <Logo tone="dark" size={30} textClassName="text-xl tracking-[-0.02em]" />
          </Link>
          <p className="mt-4 max-w-xs text-[0.9375rem] font-medium text-fg">{siteConfig.slogan}</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
            {siteConfig.tagline}.
          </p>
        </div>

        <nav aria-label="Enlaces del sitio">
          <h2 className="text-xs font-medium text-muted">Navegación</h2>
          <ul className="mt-4 space-y-1 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="inline-flex min-h-8 items-center rounded transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-medium text-muted">Sectores</h2>
          <ul className="mt-4 space-y-1 text-sm">
            {sectors.map((s) => (
              <li key={s.name}>
                <Link href="/#sectores" className="inline-flex min-h-8 items-center rounded transition-colors hover:text-fg">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-medium text-muted">Contacto</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {channels
              .filter((c) => !c.channel.pending)
              .map((c) => (
                <li key={c.label}>
                  <ChannelLink channel={c.channel} label={c.label} icon={c.icon} />
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © <CurrentYear /> CromIA. Hecho en Colombia.
          </p>
          <p>Educación · Empresas · Salud · Industria · Innovación</p>
        </div>
      </div>
      <SpotlightWordmark />
    </footer>
  );
}
