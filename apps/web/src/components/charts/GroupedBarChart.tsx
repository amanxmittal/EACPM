export type GroupedBarSeries = { label: string; color: string; values: number[] };

/**
 * Compact grouped bar chart (two series across N categories) — inline SVG,
 * same token-based-extension approach as MiniArea/SmallMultiples, since UX4G
 * ships no chart component (CLAUDE.md §9.1). Value labels sit above each bar,
 * matching the reference mockups' style.
 */
export function GroupedBarChart({
  categories,
  series,
  width = 640,
  height = 260,
  maxValue,
  valueSuffix = "%",
  showYAxis = false,
}: {
  categories: string[];
  series: GroupedBarSeries[];
  width?: number;
  height?: number;
  maxValue?: number;
  valueSuffix?: string;
  showYAxis?: boolean;
}) {
  const max = maxValue ?? Math.max(...series.flatMap((s) => s.values)) * 1.18;
  const pad = { top: 22, right: 8, bottom: 26, left: showYAxis ? 34 : 8 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const groupW = chartW / categories.length;
  const barGap = 6;
  const barW = (groupW - barGap * (series.length + 1)) / series.length;
  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none" role="img" aria-label={`Bar chart comparing ${series.map((s) => s.label).join(" vs ")} across ${categories.join(", ")}`}>
      {gridLines.map((t) => {
        const y = pad.top + chartH * (1 - t);
        return <line key={t} x1={pad.left} x2={width - pad.right} y1={y} y2={y} stroke="var(--app-border)" strokeWidth="1" />;
      })}
      {showYAxis &&
        gridLines.map((t) => {
          const y = pad.top + chartH * (1 - t);
          return (
            <text key={`y-${t}`} x={pad.left - 8} y={y + 3} textAnchor="end" fontSize="10" fontWeight="600" fill="var(--app-text-muted)">
              {Math.round(max * t)}
              {valueSuffix}
            </text>
          );
        })}
      {categories.map((cat, ci) => {
        const gx = pad.left + ci * groupW;
        return (
          <g key={cat}>
            {series.map((s, si) => {
              const v = s.values[ci];
              const bh = (v / max) * chartH;
              const bx = gx + barGap + si * (barW + barGap);
              const by = pad.top + chartH - bh;
              return (
                <g key={s.label}>
                  <rect x={bx} y={by} width={barW} height={bh} fill={s.color} rx="2" />
                  <text x={bx + barW / 2} y={by - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--app-text)">
                    {v}
                    {valueSuffix}
                  </text>
                </g>
              );
            })}
            <text x={gx + groupW / 2} y={height - 6} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--app-text-muted)">
              {cat}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
