import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { CurrentYear } from "@/components/ui/CurrentYear";
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
      className="group inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg text-slate-300 transition-colors hover:text-white"
    >
      <span className="inline-flex size-9 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 group-hover:bg-white/10">
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
    <footer className="bg-navy-950 text-slate-300">
      <div className="h-px w-full bg-brand-gradient opacity-60" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:px-8">
        <div>
          <Link href="/#inicio" aria-label="CromIA — ir al inicio" className="inline-block rounded-lg">
            <Logo tone="dark" size={40} textClassName="text-3xl" />
          </Link>
          <p className="mt-4 max-w-xs text-base font-medium text-white">{siteConfig.slogan}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-400">
            {siteConfig.tagline}.
          </p>
        </div>

        <nav aria-label="Enlaces del sitio">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Navegación</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="rounded transition-colors hover:text-green">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Sectores</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {sectors.map((s) => (
              <li key={s.name}>
                <Link href="/#sectores" className="rounded transition-colors hover:text-green">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Contacto</h2>
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

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © <CurrentYear /> CromIA. Hecho en Colombia.
          </p>
          <p>Educación · Empresas · Salud · Industria · Innovación</p>
        </div>
      </div>
    </footer>
  );
}
