export type DumbbellPoint = { label: string; color: string; values: number[] };

/**
 * Before/after dumbbell chart — one horizontal row per category, a dot for
 * each period connected by a line. Inline SVG (no external chart lib; UX4G
 * ships none, CLAUDE.md §9.1). Unlike a grouped bar or line chart, this
 * reads change-per-category at a glance without implying the two periods
 * sum to anything (they don't — each is an independent ownership rate).
 */
export function DumbbellChart({
  categories,
  points,
  periodColors,
  width = 640,
  maxValue,
  valueSuffix = "%",
  showXAxis = false,
}: {
  categories: string[];
  points: DumbbellPoint[];
  periodColors: [string, string];
  width?: number;
  maxValue?: number;
  valueSuffix?: string;
  showXAxis?: boolean;
}) {
  const max = maxValue ?? Math.max(...points.flatMap((p) => p.values)) * 1.1;
  const rowH = 44;
  const pad = { top: 8, right: 16, bottom: showXAxis ? 24 : 8, left: 96 };
  const height = pad.top + pad.bottom + rowH * categories.length;
  const chartW = width - pad.left - pad.right;

  const xAt = (v: number) => pad.left + (v / max) * chartW;
  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      role="img"
      aria-label={`Before/after chart comparing ${points.map((p) => p.label).join(", ")} across ${categories.join(", ")}`}
    >
      {gridLines.map((t) => (
        <line key={t} x1={xAt(max * t)} x2={xAt(max * t)} y1={pad.top} y2={height - pad.bottom} stroke="var(--app-border)" strokeWidth="1" />
      ))}

      {points.map((p, ri) => {
        const cy = pad.top + rowH * ri + rowH / 2;
        const [x1, x2] = [xAt(p.values[0]), xAt(p.values[1])];
        return (
          <g key={p.label}>
            <text x={pad.left - 12} y={cy + 4} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--app-text)">
              {p.label}
            </text>
            <line x1={x1} x2={x2} y1={cy} y2={cy} stroke="var(--app-border-strong)" strokeWidth="2" />
            <circle cx={x1} cy={cy} r="5" fill={periodColors[0]} />
            <circle cx={x2} cy={cy} r="5" fill={periodColors[1]} />
            <text x={x2} y={cy - 12} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--app-text)">
              {(() => {
                const delta = Math.round((p.values[1] - p.values[0]) * 10) / 10;
                return `${delta >= 0 ? "+" : ""}${delta}${valueSuffix}`;
              })()}
            </text>
          </g>
        );
      })}

      {showXAxis &&
        gridLines.map((t) => (
          <text key={`x-${t}`} x={xAt(max * t)} y={height - 6} textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--app-text-muted)">
            {Math.round(max * t)}
            {valueSuffix}
          </text>
        ))}
    </svg>
  );
}
