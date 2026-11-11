/**
 * ─────────────────────────────────────────────────────────────
 *  TEXTOS DEL SITIO — servicios, sectores, metodología, etc.
 * ─────────────────────────────────────────────────────────────
 * Edita los textos aquí; los componentes los leen automáticamente.
 * Los iconos vienen de lucide-react (https://lucide.dev/icons).
 */
import {
  ChartColumnIncreasing,
  Bot,
  Boxes,
  Brain,
  Briefcase,
  ChartLine,
  Cog,
  Factory,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  type LucideIcon,
  MessagesSquare,
  MonitorSmartphone,
  PenTool,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  UserRoundCheck,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

export type IconItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/* 1 · Hero ─────────────────────────────────────────────── */
export const hero = {
  eyebrow: "Automatización inteligente para un mundo en evolución",
  subtitle:
    "Soluciones flexibles y escalables en educación, empresas, salud, industria y más.",
  primaryCta: { label: "Agenda un diagnóstico", href: "#contacto" },
  secondaryCta: { label: "Conoce nuestros servicios", href: "#servicios" },
};

/* 2 · ¿Qué es CromIA? ─────────────────────────────────── */
export const about = {
  eyebrow: "¿Qué es CromIA?",
  title: "Soluciones de automatización inteligente.",
  body: [
    "Utilizamos Inteligencia Artificial para transformar procesos, optimizar operaciones y crear nuevas experiencias digitales.",
    "Combinamos datos, modelos de IA y automatización para que cada organización trabaje de forma más ágil y tome mejores decisiones.",
  ],
  flow: [
    {
      icon: Brain,
      title: "Inteligencia Artificial",
      description: "Modelos que comprenden datos, lenguaje y contexto.",
    },
    {
      icon: Cog,
      title: "Automatización",
      description: "Flujos que ejecutan tareas sin intervención manual.",
    },
    {
      icon: ChartLine,
      title: "Decisiones & Resultados",
      description: "Información clara para actuar con rapidez.",
    },
  ] satisfies IconItem[],
};

/* 3 · ¿Por qué CromIA? ────────────────────────────────── */
export const why = {
  title: "¿Por qué CromIA?",
  subtitle:
    "Las organizaciones enfrentan retos operativos que frenan su crecimiento. Nosotros los convertimos en oportunidades.",
  problem: {
    label: "El problema",
    items: [
      "Procesos manuales repetitivos.",
      "Volúmenes masivos de información.",
      "Decisiones operativas lentas.",
    ],
  },
  impact: {
    label: "El impacto CromIA",
    items: [
      "Tecnología aplicada a la realidad.",
      "Automatización inteligente integrada.",
      "Resultados medibles y escalables.",
    ],
  },
};

/* 4 · El significado del nombre ───────────────────────── */
export const nameMeaning = {
  title: "Nuestra identidad",
  crom: ["Diversidad", "Evolución", "Transformación", "Adaptabilidad"],
  ia: ["Inteligencia Artificial", "Automatización", "Datos"],
  body: "CromIA combina la diversidad de los mercados (Crom) con el poder de la Inteligencia Artificial (IA) para transformar procesos y generar un impacto real.",
  quote: "Tecnología que se adapta a diferentes realidades.",
};

/* 5 · Servicios / pilares ─────────────────────────────── */
export const pillars = {
  title: "No solo implementamos IA.",
  titleAccent: "Transformamos procesos.",
  items: [
    {
      icon: Zap,
      title: "Automatización",
      description:
        "Reducimos tareas repetitivas para que tu equipo se enfoque en lo que genera valor.",
    },
    {
      icon: Brain,
      title: "Inteligencia",
      description:
        "Convertimos datos en conocimiento útil para la toma de decisiones.",
    },
    {
      icon: Boxes,
      title: "Adaptabilidad",
      description:
        "Diseñamos soluciones según la realidad y las necesidades de cada organización.",
    },
    {
      icon: TrendingUp,
      title: "Escalabilidad",
      description:
        "Construimos sistemas preparados para crecer junto con tu operación.",
    },
  ] satisfies IconItem[],
};

/* 6 · Sectores ────────────────────────────────────────── */
export type Sector = { icon: LucideIcon; name: string };

export const sectors: Sector[] = [
  { icon: GraduationCap, name: "Educación" },
  { icon: Briefcase, name: "Empresas" },
  { icon: HeartPulse, name: "Salud" },
  { icon: Factory, name: "Industria" },
  { icon: ShoppingCart, name: "Comercio" },
  { icon: FlaskConical, name: "Investigación" },
];

export const ecosystem = {
  title: "Un ecosistema multisectorial",
  subtitle: "Una misma inteligencia. Diferentes aplicaciones.",
};

/* 7 · CromIA Education ────────────────────────────────── */
export const education = {
  badge: "Sector principal",
  title: "CromIA Education",
  brand: { first: "Ed", second: "Tech" },
  subtitle:
    "Llevamos la Inteligencia Artificial a la enseñanza y a la gestión educativa para potenciar el aprendizaje de cada estudiante.",
  items: [
    {
      icon: MonitorSmartphone,
      title: "Plataformas inteligentes",
      description: "Entornos de aprendizaje adaptativos.",
    },
    {
      icon: UserRoundCheck,
      title: "Tutores IA",
      description: "Acompañamiento académico personalizado.",
    },
    {
      icon: ChartColumnIncreasing,
      title: "Analítica del aprendizaje",
      description: "Predicción de riesgo y rendimiento.",
    },
    {
      icon: Workflow,
      title: "Automatización académica",
      description: "Gestión administrativa eficiente.",
    },
  ] satisfies IconItem[],
};

/* 8 · CromIA para empresas ────────────────────────────── */
export const corporate = {
  badge: "Sector corporativo",
  title: "CromIA para empresas",
  brand: { first: "IA", second: "Corp" },
  subtitle: "Conectamos sistemas y optimizamos operaciones de alto valor.",
  items: [
    {
      icon: Bot,
      title: "Agentes inteligentes",
      description:
        "Asistentes autónomos que ejecutan tareas y se integran con tus sistemas.",
    },
    {
      icon: MessagesSquare,
      title: "Atención automatizada",
      description:
        "Canales de servicio que responden de forma ágil, consistente y en todo momento.",
    },
    {
      icon: LayoutDashboard,
      title: "Analítica empresarial",
      description:
        "Indicadores y tableros que convierten tus datos en decisiones.",
    },
    {
      icon: Sparkles,
      title: "Optimización operativa",
      description:
        "Detectamos cuellos de botella y automatizamos los flujos de mayor impacto.",
    },
  ] satisfies IconItem[],
};

/* 9 · Metodología ─────────────────────────────────────── */
export const methodology = {
  eyebrow: "Cómo trabajamos",
  title: "Metodología de integración",
  subtitle:
    "Un proceso claro y colaborativo, desde la primera conversación hasta la mejora continua.",
  steps: [
    { icon: Search, title: "Diagnóstico", description: "Identificamos oportunidades." },
    { icon: PenTool, title: "Diseño", description: "Diseñamos la solución." },
    { icon: Brain, title: "Inteligencia", description: "Integramos modelos y agentes IA." },
    { icon: Workflow, title: "Automatización", description: "Conectamos sistemas y procesos." },
    { icon: RefreshCw, title: "Evolución", description: "Medimos, aprendemos y mejoramos." },
  ] satisfies IconItem[],
};

/* 10 · Arquitectura tecnológica ───────────────────────── */
export const architecture = {
  eyebrow: "Tecnología",
  title: "Arquitectura tecnológica",
  subtitle:
    "Una arquitectura por capas que conecta los datos con las aplicaciones que usa tu equipo.",
  layers: [
    {
      name: "Capa de datos e inteligencia",
      accent: "navy",
      items: ["Datos", "Bases de datos", "Modelos de IA", "LLMs"],
    },
    {
      name: "Capa lógica y automatización",
      accent: "blue",
      items: ["Agentes autónomos", "Automatización", "APIs", "Cloud"],
    },
    {
      name: "Capa de aplicación",
      accent: "green",
      items: ["Integraciones", "Dashboards", "Aplicaciones web y móviles"],
    },
  ] as const,
};

/* 11 · Visión y valores ───────────────────────────────── */
export const vision = {
  eyebrow: "Nuestra visión",
  quote:
    "Construir una empresa colombiana de tecnología capaz de llevar la Inteligencia Artificial desde la experimentación hasta la transformación real de organizaciones y sectores.",
  valuesTitle: "Nuestros valores",
  values: [
    {
      icon: Zap,
      title: "Innovación",
      description: "Exploramos nuevas formas de resolver problemas reales.",
    },
    {
      icon: Users,
      title: "Flexibilidad",
      description: "Nos adaptamos a cada organización, sector y contexto.",
    },
    {
      icon: ShieldCheck,
      title: "Confianza",
      description: "Trabajamos con transparencia y cuidado de la información.",
    },
    {
      icon: TrendingUp,
      title: "Resultados",
      description: "Nos enfocamos en impactos medibles y sostenibles.",
    },
  ] satisfies IconItem[],
};

/* 12 · CTA final / contacto ───────────────────────────── */
export const contact = {
  eyebrow: "Contacto",
  quoteFirst: "El futuro no consiste solamente en usar Inteligencia Artificial.",
  quoteSecond: "Consiste en saber qué transformar con ella.",
  body: "Cuéntanos sobre tu organización y agenda un diagnóstico. Te ayudaremos a identificar qué procesos puedes transformar con IA.",
  successTitle: "¡Mensaje enviado!",
  successBody: "Gracias por escribirnos. Te responderemos lo antes posible.",
};

