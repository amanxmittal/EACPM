import { GroupedBarChart, type GroupedBarSeries } from "@/components/charts/GroupedBarChart";
import { InteractiveLineChart } from "@/components/charts/InteractiveLineChart";
import { DashLegend } from "@/components/data/DashLegend";
import { ADOPTION_CATEGORIES, ADOPTION_GROWTH, ADOPTION_PERIODS } from "@/lib/adoptionGrowth";

const OWNERSHIP_GAP: GroupedBarSeries[] = [
  { label: "Bottom 40%", color: "var(--cat-1)", values: [68.9, 95.6, 53.2, 50.7] },
  { label: "Top 20%", color: "var(--cat-2)", values: [73.3, 98.4, 69.3, 63.8] },
];

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
        <DashLegend series={ADOPTION_GROWTH} />
        <div className="dash-chart">
          <div className="dash-chart-panel">
            <InteractiveLineChart labels={ADOPTION_PERIODS} series={ADOPTION_GROWTH} maxValue={110} />
          </div>
        </div>
      </div>
      <div className="carousel-card dash-card-plain">
        <div className="dash-item-head">
          <span className="dash-label">Ownership Gap by Wealth Bracket (2023-24)</span>
          <span className="flag-inline">
            <span className="d" aria-hidden /> Source pending verification
          </span>
        </div>
        <DashLegend series={OWNERSHIP_GAP} />
        <div className="dash-chart">
          <div className="dash-chart-panel">
            <GroupedBarChart categories={ADOPTION_CATEGORIES} series={OWNERSHIP_GAP} maxValue={110} />
          </div>
        </div>
      </div>
    </div>
  );
}
