/**
 * Fondo de ondas fluidas (SVG ligero, generado en el servidor de forma determinista).
 * La animación es CSS pura y se desactiva con prefers-reduced-motion.
 */

const W = 1440;
const H = 820;

type WaveParams = {
  count: number;
  baseY: number;
  rise: number;
  spread: number;
  amp: number;
  freq: number;
  phase: number;
};

function catmullRomPath(points: [number, number][]): string {
  const r = (n: number) => Math.round(n);
  let d = `M${r(points[0][0])} ${r(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${r(c1x)} ${r(c1y)} ${r(c2x)} ${r(c2y)} ${r(p2[0])} ${r(p2[1])}`;
  }
  return d;
}

function buildWaves({ count, baseY, rise, spread, amp, freq, phase }: WaveParams): string[] {
  const paths: string[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const pts: [number, number][] = [];
    for (let x = -160; x <= W + 160; x += 120) {
      const nx = (x + 160) / (W + 320);
      const fan = (t - 0.5) * (30 + spread * nx * nx);
      const y =
        baseY -
        rise * nx +
        fan +
        amp * (0.35 + nx) * Math.sin(nx * freq + phase + t * 1.6) +
        18 * Math.sin(nx * freq * 2.3 + t * 3.1);
      pts.push([x, y]);
    }
    paths.push(catmullRomPath(pts));
  }
  return paths;
}

const wavesA = buildWaves({ count: 18, baseY: 640, rise: 360, spread: 320, amp: 70, freq: 5.4, phase: 0.4 });
const wavesB = buildWaves({ count: 12, baseY: 720, rise: 260, spread: 260, amp: 90, freq: 4.2, phase: 2.2 });

export function HeroWaves({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Resplandores suaves */}
      <div className="absolute -right-40 top-1/4 size-[38rem] rounded-full bg-blue/25 blur-[120px]" />
      <div className="absolute -bottom-40 right-1/4 size-[30rem] rounded-full bg-green/20 blur-[120px]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="wave-grad-a" x1="0" y1="0" x2={W} y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2563EB" stopOpacity="0" />
            <stop offset="0.35" stopColor="#2563EB" stopOpacity="0.55" />
            <stop offset="0.75" stopColor="#10B981" stopOpacity="0.75" />
            <stop offset="1" stopColor="#10B981" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="wave-grad-b" x1="0" y1="0" x2={W} y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#10B981" stopOpacity="0" />
            <stop offset="0.45" stopColor="#3B82F6" stopOpacity="0.45" />
            <stop offset="1" stopColor="#2563EB" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <g className="wave-b" stroke="url(#wave-grad-b)" strokeWidth="1">
          {wavesB.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g className="wave-a" stroke="url(#wave-grad-a)" strokeWidth="1.1">
          {wavesA.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </svg>

      {/* Velo para garantizar legibilidad del texto a la izquierda */}
      <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/80 to-navy/10 md:via-navy/60" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-navy to-transparent" />
    </div>
  );
}
