import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Frame, Knob } from "@/components/ui/Frame";
import { Isotipo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/SectionHeading";
import { corporate, education, type IconItem } from "@/lib/content";

type ShowcaseData = {
  badge: string;
  title: string;
  brand: { first: string; second: string };
  subtitle: string;
  items: IconItem[];
};

/** Tarjeta destacada (inspirada en la tarjeta de precio): azul con brillo que se desplaza. */
function FeatureCard({ data, tone }: { data: ShowcaseData; tone: "blue" | "dark" }) {
  const blue = tone === "blue";
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] p-8 sm:p-10 ${
        blue
          ? "bg-[linear-gradient(180deg,#0e2a6b_0%,#1d4ed8_60%,#2563eb_100%)] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95),0_0_0_1px_rgba(90,130,255,0.25),0_0_60px_-12px_rgba(60,120,255,0.45)]"
          : "bg-[linear-gradient(180deg,#0b1a14_0%,#06261c_55%,#064e3b_100%)] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95),0_0_0_1px_rgba(16,185,129,0.25),0_0_60px_-12px_rgba(16,185,129,0.35)]"
      }`}
    >
      <div
        className={`animate-glow-drift pointer-events-none absolute -left-10 top-0 size-52 rounded-full blur-3xl ${
          blue ? "bg-blue-soft/40" : "bg-green/30"
        }`}
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center text-center">
        <Isotipo size={88} className="drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)]" />
        <p className="mt-4 text-[clamp(3rem,7vw,4.5rem)] font-semibold leading-none tracking-[-0.05em]">
          <span className="text-chrome">{data.brand.first}</span>
          <span className={blue ? "text-white" : "text-green-soft"}>{data.brand.second}</span>
        </p>
      </div>
      <div className="relative mt-8 flex flex-col items-center gap-3 text-center">
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-950">{data.badge}</span>
        <ButtonLink href="#contacto" variant="light" className="mt-4 w-full !px-4 text-sm whitespace-nowrap sm:text-[0.9375rem]">
          {blue ? "Hablemos de tu institución" : "Hablemos de tu empresa"}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </div>
  );
}

function Showcase({
  data,
  id,
  reverse = false,
  tone,
}: {
  data: ShowcaseData;
  id: string;
  reverse?: boolean;
  tone: "blue" | "dark";
}) {
  return (
    <section aria-labelledby={`${id}-title`} className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <FeatureCard data={data} tone={tone} />
        </Reveal>

        <div>
          <Reveal>
            <Badge>{data.badge}</Badge>
            <h2 id={`${id}-title`} className="mt-5 text-title font-semibold text-fg">
              {data.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-muted sm:text-lg">{data.subtitle}</p>
          </Reveal>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {data.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal as="li" key={item.title} delay={i * 0.06} className="flex">
                  <Frame className="flex-1" innerClassName="gap-4 p-5">
                    <Knob size="sm" className={tone === "blue" ? "text-blue-soft" : "text-green"}>
                      <Icon className="size-5" />
                    </Knob>
                    <div>
                      <h3 className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-fg">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
                    </div>
                  </Frame>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function Education() {
  return <Showcase data={education} id="education" tone="blue" />;
}

export function Corporate() {
  return <Showcase data={corporate} id="corporate" tone="dark" reverse />;
}
