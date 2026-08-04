import { GroupedBarChart, type GroupedBarSeries } from "@/components/charts/GroupedBarChart";
import { InteractiveLineChart } from "@/components/charts/InteractiveLineChart";
import { DumbbellChart } from "@/components/charts/DumbbellChart";
import { ScrollableChartCard, type ChartCardItem } from "@/components/data/ScrollableChartCard";
import { ADOPTION_CATEGORIES, ADOPTION_GROWTH, ADOPTION_PERIODS } from "@/lib/adoptionGrowth";

// Same three-per-good-array-of-two-values dataset as the homepage's
// "National Asset Adoption Growth" line chart (lib/adoptionGrowth.ts) — just
// re-plotted three different ways, so the numbers can never disagree.
const GROUPED_SERIES: GroupedBarSeries[] = ADOPTION_PERIODS.map((period, pi) => ({
  label: period,
  color: pi === 0 ? "var(--cat-4)" : "var(--cat-1)",
  values: ADOPTION_GROWTH.map((s) => s.values[pi]),
}));

export function ReportsCharts() {
  const items: ChartCardItem[] = [
    {
      key: "line",
      title: "Trend",
      legend: ADOPTION_GROWTH,
      chart: <InteractiveLineChart labels={ADOPTION_PERIODS} series={ADOPTION_GROWTH} maxValue={110} />,
    },
    {
      key: "bar",
      title: "By period",
      legend: GROUPED_SERIES,
      chart: <GroupedBarChart categories={ADOPTION_CATEGORIES} series={GROUPED_SERIES} maxValue={110} showYAxis />,
    },
    {
      key: "dumbbell",
      title: "Before / after",
      legend: [
        { label: ADOPTION_PERIODS[0], color: "var(--cat-4)" },
        { label: ADOPTION_PERIODS[1], color: "var(--cat-1)" },
      ],
      chart: (
        <DumbbellChart
          categories={ADOPTION_CATEGORIES}
          points={ADOPTION_GROWTH}
          periodColors={["var(--cat-4)", "var(--cat-1)"]}
          maxValue={110}
          showXAxis
        />
      ),
    },
  ];

  return (
    <ScrollableChartCard
      items={items}
      ariaLabel="National Asset Adoption Growth charts"
      heading="National Asset Adoption Growth"
      visible={2}
    />
  );
}
