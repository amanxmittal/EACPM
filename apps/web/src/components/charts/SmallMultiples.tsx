import { RevealStagger } from "@/components/motion/Reveal";

export type SM = {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  dir?: "up" | "down" | "flat";
  series: number[];
  color?: string;
};

const palette = ["var(--cat-1)", "var(--cat-2)", "var(--cat-3)", "var(--app-gold)", "var(--cat-1)", "var(--cat-2)"];

export function MiniArea({
  series,
  color,
  idx,
  width = 130,
  height = 34,
}: {
  series: number[];
  color: string;
  idx: number;
  width?: number;
  height?: number;
}) {
  const W = width;
  const H = height;
  const pad = 2;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const r = max - min || 1;
  const pts = series.map((v, i) => [pad + (i / (series.length - 1)) * (W - pad * 2), pad + (1 - (v - min) / r) * (H - pad * 2)] as const);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const areaD = `${line} L${(W - pad).toFixed(1)} ${H} L${pad} ${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" aria-hidden style={{ display: "block" }}>
      <defs>
        <linearGradient id={`sm${idx}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#sm${idx})`} />
      <path d={line} fill="none" style={{ stroke: color }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function SmallMultiples({ items }: { items: SM[] }) {
  return (
    <RevealStagger className="sm-grid">
      {items.map((it, i) => (
        <div key={it.label} className="card sm">
          <div className="sm-lbl">
            {it.label}
            {it.delta && <span className={`trend-${it.dir ?? "flat"}`} style={{ fontWeight: 700 }}>{it.delta}</span>}
          </div>
          <div className="sm-val">
            {it.value}
            {it.unit && <span className="u">{it.unit}</span>}
          </div>
          <div className="sm-spark">
            <MiniArea series={it.series} color={it.color ?? palette[i % palette.length]} idx={i} />
          </div>
        </div>
      ))}
    </RevealStagger>
  );
}
