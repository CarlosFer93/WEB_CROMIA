/**
 * Fondo del hero: aurora de resplandores azul/verde + remolino de líneas finas (SVG determinista).
 * Todo es decorativo, CSS puro, y se detiene con prefers-reduced-motion.
 */

const SIZE = 1600;
const C = SIZE / 2;

function buildSwirl(count: number): { d: string; tone: number }[] {
  const lines: { d: string; tone: number }[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const twist = 0.9 + 0.35 * Math.sin(i * 1.7);
    const r0 = 70 + 20 * Math.sin(i * 2.3);
    const r1 = 780;
    const x0 = C + Math.cos(a) * r0;
    const y0 = C + Math.sin(a) * r0;
    const am = a + twist * 0.55;
    const cx = C + Math.cos(am) * (r1 * 0.55);
    const cy = C + Math.sin(am) * (r1 * 0.55);
    const ae = a + twist;
    const x1 = C + Math.cos(ae) * r1;
    const y1 = C + Math.sin(ae) * r1;
    const r = (n: number) => Math.round(n);
    lines.push({ d: `M${r(x0)} ${r(y0)}Q${r(cx)} ${r(cy)} ${r(x1)} ${r(y1)}`, tone: i % 3 });
  }
  return lines;
}

const swirl = buildSwirl(132);
const strokes = ["#60a5fa", "#34d399", "#e6e4df"];

export function HeroBackdrop({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Aurora */}
      <div className="animate-aurora absolute -inset-[10%]">
        <div className="absolute left-1/2 top-[18%] size-[46rem] -translate-x-1/2 rounded-full bg-blue/30 blur-[140px]" />
        <div className="absolute left-[58%] top-[30%] size-[30rem] rounded-full bg-green/20 blur-[130px]" />
        <div className="absolute left-[18%] top-[40%] size-[28rem] rounded-full bg-navy/70 blur-[120px]" />
      </div>

      {/* Remolino */}
      <div
        className="absolute left-1/2 top-[22%] aspect-square w-[160vmax] max-w-[2200px] -translate-x-1/2 -translate-y-1/2 sm:top-[24%]"
        style={{
          maskImage: "radial-gradient(circle at center, transparent 4%, #000 18%, #000 38%, transparent 62%)",
          WebkitMaskImage: "radial-gradient(circle at center, transparent 4%, #000 18%, #000 38%, transparent 62%)",
        }}
      >
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="animate-spin-slow size-full" fill="none">
          {swirl.map((l, i) => (
            <path key={i} d={l.d} stroke={strokes[l.tone]} strokeOpacity={l.tone === 2 ? 0.16 : 0.32} strokeWidth="1.2" />
          ))}
        </svg>
      </div>

      {/* Viñeta para legibilidad y transición a negro */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_0%,rgba(0,0,0,0.35)_55%,#000_95%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-canvas to-transparent" />
    </div>
  );
}
