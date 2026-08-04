export function DashLegend({ series }: { series: { label: string; color: string }[] }) {
  return (
    <div className="dash-legend">
      {series.map((s) => (
        <span key={s.label} className="dash-legend-item">
          <span className="dash-legend-swatch" style={{ background: s.color }} aria-hidden />
          {s.label}
        </span>
      ))}
    </div>
  );
}
