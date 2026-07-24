// Accessible SVG line chart built on UX4G tokens (no chart library for the MVP).
// Colours pass through `style` (CSS custom properties don't resolve as SVG attributes).
// Ships role="img" + aria summary AND a visually-hidden data table (PROMPT.md §9).
type Series = { name: string; color: string; points: number[] };

export function LineChart({
  labels,
  series,
  height = 300,
  caption,
  ariaSummary,
  yUnit = "",
}: {
  labels: string[];
  series: Series[];
  height?: number;
  caption?: string;
  ariaSummary: string;
  yUnit?: string;
}) {
  const W = 760;
  const H = height;
  const m = { top: 16, right: 18, bottom: 34, left: 42 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

  const all = series.flatMap((s) => s.points);
  const min = Math.min(...all);
  const max = Math.max(...all);
  const pad = (max - min) * 0.12 || 1;
  const lo = Math.min(0, Math.floor(min - pad));
  const hi = Math.ceil(max + pad);
  const range = hi - lo || 1;

  const x = (i: number) => m.left + (i / (labels.length - 1)) * iw;
  const y = (v: number) => m.top + (1 - (v - lo) / range) * ih;

  const ticks = 4;
  const gridVals = Array.from({ length: ticks + 1 }, (_, i) => lo + (range * i) / ticks);

  return (
    <figure style={{ margin: 0 }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={ariaSummary} style={{ display: "block", overflow: "visible" }}>
        {gridVals.map((v, i) => (
          <g key={i}>
            <line x1={m.left} x2={W - m.right} y1={y(v)} y2={y(v)} style={{ stroke: "var(--app-border)" }} strokeWidth="1" />
            <text x={m.left - 8} y={y(v) + 4} textAnchor="end" fontSize="11" style={{ fill: "var(--app-text-subtle)" }}>
              {Math.round(v)}
              {yUnit}
            </text>
          </g>
        ))}
        {labels.map((l, i) => (
          <text key={l + i} x={x(i)} y={H - 12} textAnchor="middle" fontSize="11" style={{ fill: "var(--app-text-subtle)" }}>
            {l}
          </text>
        ))}
        {series.map((s) => {
          const d = s.points.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
          const area = `${d} L${x(labels.length - 1)} ${m.top + ih} L${x(0)} ${m.top + ih} Z`;
          return (
            <g key={s.name}>
              {series.length === 1 && <path d={area} style={{ fill: s.color }} opacity="0.1" />}
              <path d={d} fill="none" style={{ stroke: s.color }} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {s.points.map((v, i) => (
                <circle key={i} cx={x(i)} cy={y(v)} r="3" strokeWidth="2" style={{ fill: "var(--app-bg)", stroke: s.color }} />
              ))}
            </g>
          );
        })}
      </svg>

      {caption && (
        <figcaption className="t-micro text-muted" style={{ marginTop: "0.6rem" }}>
          {caption}
        </figcaption>
      )}

      <table className="sr-only">
        <caption>{ariaSummary}</caption>
        <thead>
          <tr>
            <th>Period</th>
            {series.map((s) => (
              <th key={s.name}>{s.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {labels.map((l, i) => (
            <tr key={l + i}>
              <th scope="row">{l}</th>
              {series.map((s) => (
                <td key={s.name}>
                  {s.points[i]}
                  {yUnit}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
