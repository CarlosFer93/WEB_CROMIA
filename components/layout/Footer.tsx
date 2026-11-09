import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { SpotlightWordmark } from "@/components/ui/SpotlightWordmark";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { sectors } from "@/lib/content";
import { navItems, siteConfig, type ContactChannel } from "@/lib/site-config";

function PendingTag({ pending }: { pending: boolean }) {
  if (!pending) return null;
  return (
    <span className="whitespace-nowrap rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300 ring-1 ring-amber-400/30">
      Por definir
    </span>
  );
}

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
      <PendingTag pending={channel.pending} />
    </a>
  );
}

export function Footer() {
  const { contact, social } = siteConfig;
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
            <li>
              <ChannelLink channel={contact.email} label="Correo" icon={<Mail className="size-4" aria-hidden="true" />} />
            </li>
            <li>
              <ChannelLink channel={contact.whatsapp} label="WhatsApp" icon={<MessageCircle className="size-4" aria-hidden="true" />} />
            </li>
            <li>
              <ChannelLink channel={social.linkedin} label="LinkedIn de CromIA" icon={<LinkedInIcon className="size-4" />} />
            </li>
            <li>
              <ChannelLink channel={social.instagram} label="Instagram de CromIA" icon={<InstagramIcon className="size-4" />} />
            </li>
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
