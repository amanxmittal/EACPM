"use client";
import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { reportTypes, reportYears, type Report } from "@/lib/reports";

export function PublicationsExplorer({
  reports,
  initialType = "All",
  initialQuery = "",
}: {
  reports: Report[];
  initialType?: string;
  initialQuery?: string;
}) {
  const [type, setType] = useState(initialType);
  const [year, setYear] = useState<"All" | number>("All");
  const [q, setQ] = useState(initialQuery);

  const filtered = useMemo(
    () =>
      reports.filter((r) => {
        if (type !== "All" && r.type !== type) return false;
        if (year !== "All" && r.year !== year) return false;
        if (q) {
          const hay = `${r.title} ${r.abstract}`.toLowerCase();
          if (!hay.includes(q.toLowerCase())) return false;
        }
        return true;
      }),
    [reports, type, year, q],
  );

  const types = ["All", ...reportTypes];

  return (
    <>
      <div className="toolbar">
        <div className="filter-chips" role="group" aria-label="Filter by type">
          {types.map((t) => (
            <button key={t} className={`chip ${type === t ? "is-active" : ""}`} aria-pressed={type === t} onClick={() => setType(t)}>
              {t}
            </button>
          ))}
        </div>
        <div className="cluster">
          <select
            className="chip"
            aria-label="Filter by year"
            value={String(year)}
            onChange={(e) => setYear(e.target.value === "All" ? "All" : Number(e.target.value))}
          >
            <option value="All">All years</option>
            {reportYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <label className="search-box">
            <Icon name="search" size={18} />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search titles & abstracts"
              aria-label="Search publications"
            />
          </label>
        </div>
      </div>

      <p className="results-count" aria-live="polite">
        {filtered.length} publication{filtered.length !== 1 ? "s" : ""}
        {type !== "All" ? ` · ${type}` : ""}
      </p>

      {filtered.length ? (
        <div className="grid grid-3" style={{ marginTop: "1.2rem" }}>
          {filtered.map((r) => (
            <PublicationCard key={r.slug} report={r} />
          ))}
        </div>
      ) : (
        <p className="empty">No publications match those filters. Try clearing the search.</p>
      )}
    </>
  );
}
