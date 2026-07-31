"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { reportTypes, reportYears, isArchived, type Report } from "@/lib/reports";

const PER_PAGE = 12;

/** Page numbers to render, collapsing long runs to `…` around the current page. */
function pageItems(current: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "gap")[] = [1];
  const from = Math.max(2, current - 1);
  const to = Math.min(total - 1, current + 1);
  if (from > 2) out.push("gap");
  for (let p = from; p <= to; p++) out.push(p);
  if (to < total - 1) out.push("gap");
  out.push(total);
  return out;
}

export function PublicationsExplorer({
  reports,
  initialType = "All",
  initialQuery = "",
  initialArchive = false,
}: {
  reports: Report[];
  initialType?: string;
  initialQuery?: string;
  initialArchive?: boolean;
}) {
  const [type, setType] = useState(initialType);
  const [year, setYear] = useState<"All" | number>("All");
  const [q, setQ] = useState(initialQuery);
  const [isArchiveView, setIsArchiveView] = useState(initialArchive);

  // Archive is its own base pool (current vs archived) — the type/year/search
  // filters then narrow whichever pool is active, same idea as /notices'
  // Current/Archive split but with the richer filter set Publications already has.
  const filtered = useMemo(
    () =>
      reports.filter((r) => {
        if (isArchived(r) !== isArchiveView) return false;
        if (type !== "All" && r.type !== type) return false;
        if (year !== "All" && r.year !== year) return false;
        if (q) {
          const hay = `${r.title} ${r.abstract}`.toLowerCase();
          if (!hay.includes(q.toLowerCase())) return false;
        }
        return true;
      }),
    [reports, isArchiveView, type, year, q],
  );

  const types = ["All", ...reportTypes];

  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const gridRef = useRef<HTMLDivElement>(null);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Any filter change resets to the first page, otherwise narrowing the results
  // can strand the reader on a page that no longer exists.
  useEffect(() => {
    setPage(1);
  }, [type, year, q, isArchiveView]);

  function goTo(next: number) {
    setPage(next);
    // Jump to the top of the results, not the top of the document — the filters
    // stay in view so the reader keeps their context.
    gridRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  return (
    <>
      <div className="toolbar">
        <div className="filter-chips" role="group" aria-label="Filter by type">
          {types.map((t) => (
            <button key={t} className={`ux4g-choice-chip-md ${type === t ? "active" : ""}`} aria-pressed={type === t} onClick={() => setType(t)}>
              {t}
            </button>
          ))}
          {/* Archive is a separate base pool (current vs archived), not another
              type — trailing and visually distinct, same idea as /notices. */}
          <button
            type="button"
            className={`ux4g-choice-chip-md chip-trailing ${isArchiveView ? "active" : ""}`}
            aria-pressed={isArchiveView}
            onClick={() => setIsArchiveView((v) => !v)}
          >
            Archives
          </button>
        </div>
        <div className="cluster">
          <select
            className="ux4g-choice-chip-md chip-select"
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
          <label className="ux4g-search search-box">
            <Icon name="search" size={18} className="ux4g-search-leading-icon" />
            <input
              className="ux4g-search-input"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search titles & abstracts"
              aria-label="Search publications"
            />
          </label>
        </div>
      </div>

      <div className="results-row">
        <p className="results-count" aria-live="polite">
          {filtered.length} publication{filtered.length !== 1 ? "s" : ""}
          {isArchiveView ? " · Archives" : ""}
          {type !== "All" ? ` · ${type}` : ""}
          {totalPages > 1 ? ` · page ${page} of ${totalPages}` : ""}
        </p>
        <div className="view-toggle" role="group" aria-label="View as">
          <span className="view-toggle-label">View</span>
          <button
            type="button"
            className={`ux4g-icon-btn ux4g-icon-btn-sm ${view === "grid" ? "ux4g-icon-btn-primary" : "ux4g-icon-btn-outline-primary"}`}
            aria-pressed={view === "grid"}
            aria-label="Grid view"
            title="Grid"
            onClick={() => setView("grid")}
          >
            <Icon name="grid" size={16} />
          </button>
          <button
            type="button"
            className={`ux4g-icon-btn ux4g-icon-btn-sm ${view === "list" ? "ux4g-icon-btn-primary" : "ux4g-icon-btn-outline-primary"}`}
            aria-pressed={view === "list"}
            aria-label="List view"
            title="List"
            onClick={() => setView("list")}
          >
            <Icon name="list" size={16} />
          </button>
        </div>
      </div>

      {filtered.length ? (
        <>
          <div ref={gridRef} className="grid ux4g-row ux4g-mt-l" style={{ scrollMarginTop: "120px" }}>
            {paged.map((r) => (
              <div key={r.slug} className={view === "list" ? "ux4g-col-12" : "ux4g-col-12 ux4g-col-sm-6 ux4g-col-lg-4"}>
                <PublicationCard report={r} layout={view} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="ux4g-pagination-wrapper ux4g-mt-2xl" aria-label="Publications pages">
              <div className="ux4g-pagination">
                <button
                  type="button"
                  className={`ux4g-page-nav prev${page === 1 ? " disabled" : ""}`}
                  onClick={() => goTo(page - 1)}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <Icon name="arrowRight" size={18} style={{ transform: "rotate(180deg)" }} />
                </button>

                {pageItems(page, totalPages).map((p, i) =>
                  p === "gap" ? (
                    <span key={`gap-${i}`} className="ux4g-page-number" aria-hidden style={{ cursor: "default" }}>
                      …
                    </span>
                  ) : (
                    <button
                      type="button"
                      key={p}
                      className="ux4g-page-number"
                      aria-current={p === page ? "page" : undefined}
                      aria-label={`Page ${p}`}
                      onClick={() => goTo(p)}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  className={`ux4g-page-nav next${page === totalPages ? " disabled" : ""}`}
                  onClick={() => goTo(page + 1)}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  <Icon name="arrowRight" size={18} />
                </button>
              </div>
            </nav>
          )}
        </>
      ) : (
        <div className="ux4g-empty-state ux4g-mt-2xl">
          <span className="ux4g-empty-state-icon">
            <Icon name="search" size={32} />
          </span>
          <div className="ux4g-empty-state-content">
            <p className="t-h4">No publications match those filters</p>
            <p className="text-muted t-small">Try a different year or clear the search.</p>
          </div>
          <button
            type="button"
            className="ux4g-btn-outline-primary ux4g-btn-md"
            onClick={() => {
              setType("All");
              setYear("All");
              setQ("");
              setIsArchiveView(false);
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
