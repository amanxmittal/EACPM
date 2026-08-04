"use client";
import { useState } from "react";
import { GroupedBarChart, type GroupedBarSeries } from "@/components/charts/GroupedBarChart";
import { DURABLE_GOODS, DURABLES_STATES, DURABLES_STATEWISE, type DurableGood } from "@/lib/durablesData";

type Sector = "rural" | "urban";
type Year = "2011" | "2024" | "both";

const YEAR_OPTIONS: { value: Year; label: string }[] = [
  { value: "2011", label: "2011-12" },
  { value: "2024", label: "2023-24" },
  { value: "both", label: "Both years" },
];

function valueFor(good: DurableGood, state: string, sector: Sector, year: "2011" | "2024") {
  const row = DURABLES_STATEWISE[good].find((r) => r.state === state);
  if (!row) return 0;
  const key = `${sector}${year}` as "rural2011" | "rural2024" | "urban2011" | "urban2024";
  return row[key];
}

/**
 * Filtered graphical view of the durables-adoption dataset — pick a state,
 * a sector and a year (or both years), see the four goods compared as bars.
 * X axis = durable good, Y axis = % of households (fixed 0-100 scale so the
 * bars stay comparable across filter changes).
 */
export function DurablesFilterChart() {
  const [state, setState] = useState(DURABLES_STATES[0]);
  const [sector, setSector] = useState<Sector>("rural");
  const [year, setYear] = useState<Year>("both");

  const series: GroupedBarSeries[] =
    year === "both"
      ? [
          { label: "2011-12", color: "var(--cat-4)", values: DURABLE_GOODS.map((g) => valueFor(g, state, sector, "2011")) },
          { label: "2023-24", color: "var(--cat-1)", values: DURABLE_GOODS.map((g) => valueFor(g, state, sector, "2024")) },
        ]
      : [
          {
            label: year === "2011" ? "2011-12" : "2023-24",
            color: "var(--cat-1)",
            values: DURABLE_GOODS.map((g) => valueFor(g, state, sector, year)),
          },
        ];

  return (
    <div>
      <div className="durables-filters">
        <label className="durables-filter">
          <span className="durables-filter-label">State / UT</span>
          <select className="durables-select" value={state} onChange={(e) => setState(e.target.value)}>
            {DURABLES_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <div className="durables-filter">
          <span className="durables-filter-label">Sector</span>
          <div className="durables-tabs" role="tablist" aria-label="Sector">
            {(["rural", "urban"] as Sector[]).map((s) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={s === sector}
                data-active={s === sector}
                className="durables-tab"
                onClick={() => setSector(s)}
              >
                {s === "rural" ? "Rural" : "Urban"}
              </button>
            ))}
          </div>
        </div>

        <div className="durables-filter">
          <span className="durables-filter-label">Year</span>
          <div className="durables-tabs" role="tablist" aria-label="Year">
            {YEAR_OPTIONS.map((y) => (
              <button
                key={y.value}
                type="button"
                role="tab"
                aria-selected={y.value === year}
                data-active={y.value === year}
                className="durables-tab"
                onClick={() => setYear(y.value)}
              >
                {y.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="dash-legend ux4g-mt-m">
        {series.map((s) => (
          <span key={s.label} className="dash-legend-item">
            <span className="dash-legend-swatch" style={{ background: s.color }} aria-hidden />
            {s.label}
          </span>
        ))}
      </div>

      <div className="dash-chart">
        <GroupedBarChart categories={DURABLE_GOODS} series={series} maxValue={100} showYAxis />
      </div>

      <p className="t-micro text-muted ux4g-mt-s">
        {state} · {sector === "rural" ? "Rural" : "Urban"}
        {" "}
        households · Source: NSS 2011-12 &amp; HCES 2023-24, durables-adoption working paper
        dataset.
      </p>
    </div>
  );
}
