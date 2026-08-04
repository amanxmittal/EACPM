"use client";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Icon } from "@/components/ui/Icon";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { WhatsNewCard } from "@/components/whats-new/WhatsNewCard";
import type { Report } from "@/lib/reports";

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

export type Feed = "Publication" | "Notice" | "Media";
const kinds: Feed[] = ["Publication", "Notice", "Media"];

// Publications carry their full Report (so PublicationCard — with its real
// abstract, PDF link and cover — can be reused as-is); Notices/Media carry
// the flatter shape WhatsNewCard expects, since they have no abstract or PDF.
export type WhatsNewItem =
  | {
      type: "Publication";
      report: Report;
      archived: boolean;
      isNew?: boolean;
    }
  | {
      type: "Notice" | "Media";
      badge: string;
      tagLabel: string;
      title: string;
      href: string;
      external?: boolean;
      imageUrl?: string;
      archived: boolean;
      isNew?: boolean;
    };

function itemTitle(i: WhatsNewItem): string {
  return i.type === "Publication" ? i.report.title : i.title;
}
function itemSearchText(i: WhatsNewItem): string {
  return i.type === "Publication" ? `${i.report.title} ${i.report.type} ${i.report.abstract}` : `${i.title} ${i.badge} ${i.tagLabel}`;
}
function itemHref(i: WhatsNewItem): string {
  return i.type === "Publication" ? `/publications/${i.report.slug}` : i.href;
}
function itemExternal(i: WhatsNewItem): boolean {
  return i.type === "Publication" ? false : Boolean(i.external);
}
function itemBadge(i: WhatsNewItem): string {
  return i.type === "Publication" ? i.report.type : i.badge;
}

export function WhatsNewExplorer({
  items,
  initialType = "All",
}: {
  items: WhatsNewItem[];
  initialType?: string;
}) {
  const [type, setType] = useState(initialType);
  const [q, setQ] = useState("");
  const [isArchiveView, setIsArchiveView] = useState(false);
  const [view, setView] = useState<"grid" | "list">("list");
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLElement>(null);

  // Archive is its own base pool (current vs archived), same idea as the
  // Publications and Notices pages — the type/search filters then narrow
  // whichever pool is active.
  const filtered = useMemo(
    () =>
      items.filter((i) => {
        if (i.archived !== isArchiveView) return false;
        if (type !== "All" && i.type !== type) return false;
        if (q && !itemSearchText(i).toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [items, isArchiveView, type, q],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Any filter change resets to the first page, otherwise narrowing the results
  // can strand the reader on a page that no longer exists.
  useEffect(() => {
    setPage(1);
  }, [type, q, isArchiveView]);

  function goTo(next: number) {
    setPage(next);
    // Jump to the top of the results, not the top of the document — the filters
    // stay in view so the reader keeps their context.
    listRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  return (
    <>
      <div className="toolbar">
        <div className="filter-chips" role="group" aria-label="Filter by type">
          <button type="button" className={`ux4g-choice-chip-md ${type === "All" ? "active" : ""}`} aria-pressed={type === "All"} onClick={() => setType("All")}>
            All
          </button>
          {kinds.map((k) => (
            <button key={k} type="button" className={`ux4g-choice-chip-md ${type === k ? "active" : ""}`} aria-pressed={type === k} onClick={() => setType(k)}>
              {k}
            </button>
          ))}
          {/* Archive is a separate base pool (current vs archived), not another
              type — trailing and visually distinct, same idea as /publications. */}
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
          <label className="ux4g-search search-box">
            <Icon name="search" size={18} className="ux4g-search-leading-icon" />
            <input
              className="ux4g-search-input"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search working papers, reports etc."
              aria-label="Search what's new"
            />
          </label>
        </div>
      </div>

      <div className="results-row">
        <p className="results-count" aria-live="polite">
          {filtered.length} item{filtered.length !== 1 ? "s" : ""}
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
          <div ref={listRef as RefObject<HTMLDivElement>} className="grid ux4g-row ux4g-mt-l" style={{ scrollMarginTop: "120px" }}>
            {paged.map((item) => (
              <div
                key={`${item.type}-${itemHref(item)}-${itemTitle(item)}`}
                className={view === "list" ? "ux4g-col-12" : "ux4g-col-12 ux4g-col-sm-6 ux4g-col-lg-4"}
              >
                {item.type === "Publication" ? (
                  <PublicationCard report={item.report} layout={view} isNew={item.isNew} />
                ) : (
                  <WhatsNewCard
                    imageUrl={item.imageUrl}
                    tagLabel={item.tagLabel}
                    badge={itemBadge(item)}
                    title={itemTitle(item)}
                    href={itemHref(item)}
                    external={itemExternal(item)}
                    isNew={item.isNew}
                    layout={view}
                  />
                )}
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="ux4g-pagination-wrapper ux4g-mt-2xl" aria-label="What's new pages">
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
        <div className="ux4g-empty-state ux4g-py-2xl ux4g-px-m">
          <span className="ux4g-empty-state-icon">
            <Icon name="spark" size={32} />
          </span>
          <div className="ux4g-empty-state-content">
            <p className="t-h4">{isArchiveView ? "Nothing archived yet" : "Nothing in this category yet"}</p>
            <p className="text-muted t-small">
              {isArchiveView ? "Items move here once they age out of Current." : "New items appear here as they are published."}
            </p>
          </div>
          {(type !== "All" || q || isArchiveView) && (
            <button
              type="button"
              className="ux4g-btn-outline-primary ux4g-btn-md"
              onClick={() => {
                setType("All");
                setQ("");
                setIsArchiveView(false);
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </>
  );
}
