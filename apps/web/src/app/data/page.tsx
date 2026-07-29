import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { AnimatedAreaChart } from "@/components/charts/AnimatedAreaChart";
import { SmallMultiples, type SM } from "@/components/charts/SmallMultiples";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Data & Dashboards",
  description: "India at a glance, per-publication dataset explorers and a download centre — every figure sourced, every chart with a table and CSV.",
};

const gdpLabels = ["FY19", "FY20", "FY21", "FY22", "FY23", "FY24", "FY25", "FY26"];
const gdpPoints = [6.5, 3.9, -5.8, 9.7, 7.0, 8.2, 7.6, 6.5];

const multiples: SM[] = [
  { label: "Real GDP growth", value: "6.5", unit: "%", delta: "▲", dir: "up", series: [5.8, 6.1, 7.2, 8.7, 7.6, 6.9, 6.5] },
  { label: "CPI inflation", value: "4.8", unit: "%", delta: "▼", dir: "down", series: [6.8, 6.1, 5.7, 5.5, 5.1, 4.9, 4.8] },
  { label: "UPI volume", value: "18.4", unit: "bn/mo", delta: "▲", dir: "up", series: [8.7, 10.2, 11.4, 13.1, 14.9, 16.6, 18.4] },
  { label: "Forex reserves", value: "690", unit: "$bn", delta: "▲", dir: "up", series: [575, 598, 616, 642, 655, 678, 690] },
  { label: "Fiscal deficit", value: "5.1", unit: "% GDP", delta: "▼", dir: "down", series: [9.2, 6.7, 6.4, 5.9, 5.6, 5.3, 5.1] },
  { label: "Merch. exports", value: "44", unit: "$bn/mo", delta: "▲", dir: "up", series: [30, 28, 34, 38, 40, 42, 44] },
];

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
      <section className="page-hero hero-stage grain">
        <div className="container hero-content">
          <span className="kicker">Data &amp; Dashboards</span>
          <h1 className="t-h1 balance" style={{ marginTop: "0.6rem", maxWidth: "16ch" }}>
            India at a glance
          </h1>
          <hr className="gold-rule" style={{ margin: "1.1rem 0" }} />
          <p className="t-lead measure">
            Curated macro indicators, per-publication dataset explorers, and a download centre.
            Every figure carries source, period and last-updated; every chart ships with a data
            table and a CSV.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <span className="flag ux4g-tag-tonal-warning ux4g-tag-s">Illustrative data — pending verified sources</span>
          </p>
        </div>
      </section>

      {/* dashboard centerpiece */}
      <section className="section">
        <div className="container">
          <div className="data-panel">
            <div className="cluster" style={{ justifyContent: "space-between", marginBottom: "0.8rem", alignItems: "flex-start" }}>
              <div>
                <span className="kicker">Featured series</span>
                <h2 className="t-h3" style={{ marginTop: "0.4rem" }}>
                  Real GDP growth — the pandemic trough &amp; recovery
                </h2>
                <p className="t-micro text-muted">Annual, % · hover for values</p>
              </div>
              <div className="cluster">
                <span className="flag ux4g-tag-tonal-warning ux4g-tag-s">Illustrative</span>
                <button className="ux4g-btn-outline-primary ux4g-btn-sm">
                  <Icon name="download" size={15} /> CSV
                </button>
              </div>
            </div>
            <AnimatedAreaChart
              labels={gdpLabels}
              points={gdpPoints}
              yUnit="%"
              height={360}
              events={[{ index: 2, label: "COVID" }]}
              annotations={[
                { index: 2, label: "−5.8%", kind: "trough" },
                { index: 3, label: "+9.7%", kind: "peak" },
              ]}
              ariaSummary="Illustrative real GDP growth by fiscal year: 6.5% in FY19, a −5.8% pandemic trough in FY21, a 9.7% rebound in FY22, settling near 6.5% by FY26."
              caption="Illustrative — the live series will be sourced from MoSPI with revision notes and a 'provisional / revised / final' status."
            />
          </div>
        </div>
      </section>

      {/* small multiples */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div className="sh-copy">
              <span className="kicker">The dashboard</span>
              <h2 className="t-h2">Key indicators</h2>
            </div>
          </div>
          <SmallMultiples items={multiples} />
        </div>
      </section>

      {/* dataset explorer teaser */}
      <section className="section tint" id="datasets" style={{ scrollMarginTop: "96px" }}>
        <div className="container">
          <Reveal>
            <span className="kicker">Paper datasets</span>
            <h2 className="t-h2" style={{ marginTop: "0.5rem" }}>
              Explore the data behind the papers
            </h2>
            <p className="t-lead measure" style={{ marginTop: "0.6rem" }}>
              For every data-heavy publication, the underlying dataset is uploadable and explorable
              — filter, cross-filter, chart, download the exact slice, and cite a permalink.
            </p>
            <div className="card" style={{ marginTop: "1.5rem" }}>
              <span className="ux4g-tag-tonal-primary ux4g-tag-s">Reference dataset</span>
              <h3 className="t-h3" style={{ marginTop: "0.6rem" }}>
                Economic Census — EC4 · EC5 · EC6
              </h3>
              <p className="text-muted t-small" style={{ marginTop: "0.3rem" }}>
                Derived from the shared metadata dictionary. Note: dimension code-lists differ per
                round (e.g. the State code for Andhra Pradesh is 02 / 28 / 37 across EC4 / EC5 / EC6)
                — so the explorer versions its code-lists and validates each upload.
              </p>
              {/* Static labels, not filters — tags rather than chips. */}
              <div className="cluster" style={{ marginTop: "1rem" }}>
                {ecDimensions.map((d) => (
                  <span key={d} className="ux4g-tag-tonal-neutral ux4g-tag-s">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* download centre */}
      <section className="section" id="downloads" style={{ scrollMarginTop: "96px" }}>
        <div className="container">
          <span className="kicker">Download centre</span>
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
                <button className="ux4g-btn-outline-primary ux4g-btn-sm">
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
