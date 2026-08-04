"use client";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { reports } from "@/lib/reports";
import { DurablesFilterChart } from "@/components/data/DurablesFilterChart";

/**
 * "Explore the data behind the papers" — search a report/paper title and
 * press Enter to surface the durable-goods statewise data card (the one
 * dataset this page can currently back with a filterable chart); hidden
 * otherwise. Search-on-submit rather than as-you-type, per product ask.
 */
export function PaperDatasetsExplorer() {
  const [q, setQ] = useState("");
  const [submitted, setSubmitted] = useState("");
  const query = submitted.trim().toLowerCase();
  const matches = query ? reports.filter((r) => r.title.toLowerCase().includes(query)) : [];

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(q);
  }

  return (
    <Reveal>
      <div className="cluster ux4g-jc-between ux4g-mb-s" style={{ alignItems: "flex-start" }}>
        <div>
          <span className="kicker">Paper datasets</span>
          <h2 className="t-h2 ux4g-mt-xs">Explore the data behind the papers</h2>
        </div>
        <form onSubmit={onSubmit}>
          <label className="ux4g-search search-box" style={{ minWidth: 280 }}>
            <Icon name="search" size={18} className="ux4g-search-leading-icon" />
            <input
              className="ux4g-search-input"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search working paper and reports"
              aria-label="Search reports and papers"
            />
          </label>
        </form>
      </div>
      <p className="t-lead measure ux4g-mt-xs">
        For every data-heavy publication, the underlying dataset is uploadable and explorable
        — filter, cross-filter, chart, download the exact slice, and cite a permalink.
      </p>

      {query && matches.length === 0 && (
        <p className="t-small text-muted ux4g-mt-l">No matching publications for &ldquo;{submitted.trim()}&rdquo;.</p>
      )}

      {matches.length > 0 && (
        <div className="card ux4g-mt-xl">
          <span className="ux4g-tag-tonal-primary ux4g-tag-s">Reference dataset</span>
          <h3 className="t-h3 ux4g-mt-xs">Durable-goods adoption — statewise</h3>
          <p className="text-muted t-small ux4g-mt-2xs">
            Matched {matches.length} publication{matches.length === 1 ? "" : "s"} for &ldquo;
            {submitted.trim()}&rdquo;. Household ownership of TV, mobile, motor vehicle and
            refrigerator, filterable by state, rural/urban sector and year. Source: NSS 2011-12 &amp;
            HCES 2023-24, durables-adoption working paper dataset.
          </p>
          <div className="ux4g-mt-m">
            <DurablesFilterChart />
          </div>
        </div>
      )}
    </Reveal>
  );
}
