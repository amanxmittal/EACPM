import type { LineSeries } from "@/components/charts/InteractiveLineChart";

export const ADOPTION_CATEGORIES = ["TV", "Mobile", "2/4-Wheeler", "Refrigerator"];
export const ADOPTION_PERIODS = ["2011-12", "2023-24"];

// Values as supplied — no citation given for the underlying survey, so this
// carries the same "pending verification" flag as other unsourced figures
// (CLAUDE.md §2: never fabricate a source, a blank/flagged number is fine).
// Single source of truth — every "National Asset Adoption Growth" chart
// (homepage, /data dashboards, /data reports carousel) reads from here so
// the numbers can never drift between chart types.
export const ADOPTION_GROWTH: LineSeries[] = [
  { label: "TV", color: "var(--cat-1)", values: [70.3, 73.1] },
  { label: "Mobile", color: "var(--cat-2)", values: [86.5, 97.5] },
  { label: "2/4-Wheeler", color: "var(--cat-3)", values: [30.6, 63.0] },
  { label: "Refrigerator", color: "var(--cat-4)", values: [33.8, 58.7] },
];
