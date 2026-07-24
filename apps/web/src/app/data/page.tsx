import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { Sparkline } from "@/components/charts/Sparkline";
import { LineChart } from "@/components/charts/LineChart";
import { indicators } from "@/content/indicators";

export const metadata: Metadata = {
  title: "Data & Dashboards",
  description: "India at a glance, per-publication dataset explorers and a download centre — every figure sourced, every chart with a table and CSV.",
};

const gdpLabels = ["FY19", "FY20", "FY21", "FY22", "FY23", "FY24", "FY25", "FY26"];
const gdpPoints = [6.5, 3.9, -5.8, 9.7, 7.0, 8.2, 7.6, 6.5];

// Real dimension set from EC_MetaDataList.xlsx (Economic Census EC4–EC6 microdata APIs).
const ecDimensions = ["State / UT", "Activity (NIC)", "Nature of operation", "Source of finance", "Type of ownership"];

const downloads = [
  { name: "Real GDP growth (FY19–FY26)", freq: "Annual", fmt: "CSV" },
  { name: "CPI inflation (monthly)", freq: "Monthly", fmt: "CSV" },
  { name: "UPI transaction volume (monthly)", freq: "Monthly", fmt: "CSV" },
  { name: "Forex reserves (weekly)", freq: "Weekly", fmt: "XLSX" },
];

export default function DataPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Data &amp; Dashboards</span>
          <h1 className="t-h1 balance" style={{ marginTop: "0.6rem" }}>
            India at a glance
          </h1>
          <p className="t-lead measure" style={{ marginTop: "0.8rem" }}>
            Curated macro indicators, per-publication dataset explorers, and a download centre.
            Every figure carries source, period and last-updated; every chart ships with a data
            table and a CSV.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <span className="flag">Illustrative data — pending verified sources</span>
          </p>
        </div>
      </section>

      {/* indicator grid */}
      <section className="section" style={{ paddingBottom: "1rem" }}>
        <div className="container">
          <div className="grid grid-4">
            {indicators.map((ind) => (
              <div className="card stat" key={ind.key}>
                <div className="stat-top">
                  <span className="stat-label">{ind.label}</span>
                  <span className={`stat-spark trend-${ind.direction}`}>
                    <Sparkline data={ind.spark} />
                  </span>
                </div>
                <div className="stat-figure">
                  <span className="stat-value">{ind.value}</span>
                  <span className="stat-unit">{ind.unit}</span>
                </div>
                <div className="stat-meta">{ind.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* main chart */}
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container">
          <div className="data-panel">
            <div className="cluster" style={{ justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <div>
                <h2 className="t-h3">Real GDP growth</h2>
                <p className="t-micro text-muted">Annual, % — illustrative</p>
              </div>
              <div className="cluster">
                <span className="flag">Illustrative</span>
                <button className="btn btn-outline" style={{ padding: "0.45rem 0.8rem", fontSize: "0.85rem" }}>
                  <Icon name="download" size={15} /> CSV
                </button>
              </div>
            </div>
            <LineChart
              labels={gdpLabels}
              series={[{ name: "Real GDP growth (%)", color: "var(--cat-1)", points: gdpPoints }]}
              ariaSummary="Illustrative real GDP growth by fiscal year, dipping to about -5.8% in FY21 and recovering to about 6.5% in FY26."
              yUnit="%"
              caption="Illustrative — the live series will be sourced from MoSPI with revision notes."
            />
          </div>
        </div>
      </section>

      {/* dataset explorer teaser (real EC dimensions) */}
      <section className="section tint" id="datasets" style={{ scrollMarginTop: "84px" }}>
        <div className="container">
          <span className="eyebrow">Paper datasets</span>
          <h2 className="t-h2" style={{ marginTop: "0.5rem" }}>
            Explore the data behind the papers
          </h2>
          <p className="t-lead measure" style={{ marginTop: "0.6rem" }}>
            For every data-heavy publication, the underlying dataset is uploadable and explorable
            — filter, cross-filter, chart, download the exact slice, and cite a permalink.
          </p>
          <div className="card" style={{ marginTop: "1.5rem" }}>
            <div className="cluster" style={{ justifyContent: "space-between" }}>
              <div>
                <span className="badge">Reference dataset</span>
                <h3 className="t-h3" style={{ marginTop: "0.6rem" }}>
                  Economic Census — EC4 · EC5 · EC6
                </h3>
                <p className="text-muted t-small" style={{ marginTop: "0.3rem" }}>
                  Derived from the shared metadata dictionary. Note: dimension code-lists differ
                  per round (e.g. the State code for Andhra Pradesh is 02 / 28 / 37 across EC4 / EC5
                  / EC6) — so the explorer versions its code-lists and validates each upload.
                </p>
              </div>
            </div>
            <div className="cluster" style={{ marginTop: "1rem" }}>
              {ecDimensions.map((d) => (
                <span key={d} className="chip" style={{ cursor: "default" }}>
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* download centre */}
      <section className="section" id="downloads" style={{ scrollMarginTop: "84px" }}>
        <div className="container">
          <span className="eyebrow">Download centre</span>
          <h2 className="t-h2" style={{ marginTop: "0.5rem", marginBottom: "1.2rem" }}>
            Series &amp; data dictionaries
          </h2>
          <div className="card">
            {downloads.map((d) => (
              <div key={d.name} className="row-item">
                <div className="row-main">
                  <div style={{ fontWeight: 600 }}>{d.name}</div>
                  <div className="t-micro text-muted">{d.freq}</div>
                </div>
                <button className="btn btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}>
                  <Icon name="download" size={15} /> {d.fmt}
                </button>
              </div>
            ))}
          </div>
          <p className="t-micro text-muted" style={{ marginTop: "0.8rem" }}>
            Downloads are illustrative placeholders in the MVP; the live centre serves versioned
            series with a data dictionary and an open licence.
          </p>
        </div>
      </section>
    </>
  );
}
