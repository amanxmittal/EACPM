import { GroupedBarChart, type GroupedBarSeries } from "@/components/charts/GroupedBarChart";

const CATEGORIES = ["TV", "Mobile", "2/4-Wheeler", "Refrigerator"];

// Values as supplied — no citation given for the underlying survey, so this
// carries the same "pending verification" flag as other unsourced figures
// (CLAUDE.md §2: never fabricate a source, a blank/flagged number is fine).
const ADOPTION_GROWTH: GroupedBarSeries[] = [
  { label: "2011-12", color: "var(--cat-4)", values: [70.3, 86.5, 30.6, 33.8] },
  { label: "2023-24", color: "var(--cat-1)", values: [73.1, 97.5, 63.0, 58.7] },
];

const OWNERSHIP_GAP: GroupedBarSeries[] = [
  { label: "Bottom 40%", color: "var(--cat-1)", values: [68.9, 95.6, 53.2, 50.7] },
  { label: "Top 20%", color: "var(--cat-2)", values: [73.3, 98.4, 69.3, 63.8] },
];

function Legend({ series }: { series: GroupedBarSeries[] }) {
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

export function HomeDashboards() {
  return (
    <div className="carousel-grid">
      <div className="carousel-card dash-card-plain">
        <div className="dash-item-head">
          <span className="dash-label">National Asset Adoption Growth</span>
          <span className="flag-inline">
            <span className="d" aria-hidden /> Source pending verification
          </span>
        </div>
        <Legend series={ADOPTION_GROWTH} />
        <div className="dash-chart">
          <GroupedBarChart categories={CATEGORIES} series={ADOPTION_GROWTH} maxValue={110} />
        </div>
      </div>
      <div className="carousel-card dash-card-plain">
        <div className="dash-item-head">
          <span className="dash-label">Ownership Gap by Wealth Bracket (2023-24)</span>
          <span className="flag-inline">
            <span className="d" aria-hidden /> Source pending verification
          </span>
        </div>
        <Legend series={OWNERSHIP_GAP} />
        <div className="dash-chart">
          <GroupedBarChart categories={CATEGORIES} series={OWNERSHIP_GAP} maxValue={110} />
        </div>
      </div>
    </div>
  );
}
