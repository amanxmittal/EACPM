import type { Metadata } from "next";
import { HomeDashboards } from "@/components/data/HomeDashboards";
import { ReportsCharts } from "@/components/data/ReportsCharts";
import { PaperDatasetsExplorer } from "@/components/data/PaperDatasetsExplorer";

export const metadata: Metadata = {
  title: "Data & Dashboards",
  description: "India at a glance, per-publication dataset explorers and a download centre — every figure sourced, every chart with a table and CSV.",
};

export default function DataPage() {
  return (
    <>
      <section className="page-hero hero-stage grain">
        <div className="ux4g-container hero-content">
          <span className="kicker">India at a glance</span>
          <h1 className="t-h1 balance ux4g-mt-xs" style={{ maxWidth: "16ch" }}>
            Data &amp; Dashboards
          </h1>
          <hr className="gold-rule ux4g-my-m ux4g-mx-none" />
          <p className="t-lead measure">
            Curated macro indicators, per-publication dataset explorers, and a download centre.
            Every figure carries source, period and last-updated; every chart ships with a data
            table and a CSV.
          </p>
          <p className="ux4g-mt-m">
            <span className="flag ux4g-tag-tonal-warning ux4g-tag-s">Illustrative data — pending verified sources</span>
          </p>
        </div>
      </section>

      {/* Reports — same dataset as Working Papers, re-plotted as different chart
          types, stepped through via prev/next arrows at the bottom */}
      <section className="section">
        <div className="ux4g-container">
          <div className="cluster ux4g-jc-between ux4g-mb-m" style={{ alignItems: "flex-start" }}>
            <div>
              <h2 className="t-h3">Latest data and dashboards</h2>
            </div>
          </div>
          <ReportsCharts />
        </div>
      </section>

      {/* dataset explorer — search a report/paper, press Enter to surface the
          durables dataset card */}
      <section className="section tint" id="datasets" style={{ scrollMarginTop: "96px" }}>
        <div className="ux4g-container">
          <PaperDatasetsExplorer />
        </div>
      </section>

      {/* Working Papers (was "national dashboards") — same paired cards as the homepage */}
      <section className="section">
        <div className="ux4g-container">
          <div className="cluster ux4g-jc-between ux4g-mb-m" style={{ alignItems: "flex-start" }}>
            <div>
              <span className="kicker">Household &amp; asset trends</span>
              <h2 className="t-h3 ux4g-mt-xs">Working paper and Reports</h2>
            </div>
          </div>
          <HomeDashboards />
        </div>
      </section>

    </>
  );
}
