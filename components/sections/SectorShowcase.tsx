import { Container } from "@/components/ui/Container";
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

function BrandPanel({ brand, id }: { brand: ShowcaseData["brand"]; id: string }) {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-white px-8 py-14 shadow-xl shadow-navy/10 ring-1 ring-slate-100">
      <div className="absolute -right-10 -top-10 size-40 rounded-full bg-green/10 blur-2xl" aria-hidden="true" />
      <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-blue/10 blur-2xl" aria-hidden="true" />
      <Isotipo size={128} className="relative drop-shadow-xl" />
      <p className="relative mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl" id={id}>
        <span className="text-navy">{brand.first}</span>
        <span className="text-green-deep">{brand.second}</span>
      </p>
    </div>
  );
}

function Showcase({
  data,
  id,
  reverse = false,
  variant,
  bg,
}: {
  data: ShowcaseData;
  id: string;
  reverse?: boolean;
  variant: "list" | "cards";
  bg: string;
}) {
  return (
    <section aria-labelledby={`${id}-title`} className={`${bg} py-20 sm:py-28`}>
      <Container
        className={`grid items-center gap-12 lg:gap-16 ${
          reverse ? "lg:grid-cols-[1.25fr_0.75fr]" : "lg:grid-cols-[0.75fr_1.25fr]"
        }`}
      >
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <BrandPanel brand={data.brand} id={`${id}-brand`} />
        </Reveal>

        <div>
          <Reveal>
            <Badge>{data.badge}</Badge>
            <h2
              id={`${id}-title`}
              className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl"
            >
              {data.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink sm:text-lg">{data.subtitle}</p>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {data.items.map((item, i) => {
              const Icon = item.icon;
              const accent = variant === "cards" ? (i % 2 === 0 ? "border-l-green" : "border-l-blue") : "border-l-blue";
              return (
                <Reveal as="li" key={item.title} delay={i * 0.08}>
                  <article
                    className={`flex h-full gap-4 rounded-2xl border border-slate-200 border-l-4 bg-white p-5 shadow-sm shadow-navy/5 transition hover:shadow-md ${accent}`}
                  >
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ice text-blue"
                      aria-hidden="true"
                    >
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-navy">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink">{item.description}</p>
                    </div>
                  </article>
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
  return <Showcase data={education} id="education" variant="list" bg="bg-ice" />;
}

export function Corporate() {
  return <Showcase data={corporate} id="corporate" variant="cards" bg="bg-white" reverse />;
}
