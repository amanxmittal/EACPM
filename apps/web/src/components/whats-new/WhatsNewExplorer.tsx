"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

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

export type WhatsNewItem = {
  type: Feed;
  title: string;
  meta: string;
  href: string;
  external?: boolean;
  /** From each source's own isArchived() — Media has no reliable date yet, so it's always current. */
  archived: boolean;
  /**
   * Set by the page from the item's position in the built feed, not a stored
   * flag — see whats-new/page.tsx. So it always tracks whatever is newest
   * without anyone having to remember to unset it on the item that used to be new.
   */
  isNew?: boolean;
};

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
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLUListElement>(null);

  // Archive is its own base pool (current vs archived), same idea as the
  // Publications and Notices pages — the type/search filters then narrow
  // whichever pool is active.
  const filtered = useMemo(
    () =>
      items.filter((i) => {
        if (i.archived !== isArchiveView) return false;
        if (type !== "All" && i.type !== type) return false;
        if (q) {
          const hay = `${i.title} ${i.meta}`.toLowerCase();
          if (!hay.includes(q.toLowerCase())) return false;
        }
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
          <a href="#" className="ux4g-btn-outline-primary ux4g-btn-sm">
            <Icon name="rss" size={16} /> RSS
          </a>
          <label className="ux4g-search search-box">
            <Icon name="search" size={18} className="ux4g-search-leading-icon" />
            <input
              className="ux4g-search-input"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search titles"
              aria-label="Search what's new"
            />
          </label>
        </div>
      </div>

      <p className="results-count" aria-live="polite">
        {filtered.length} item{filtered.length !== 1 ? "s" : ""}
        {isArchiveView ? " · Archives" : ""}
        {type !== "All" ? ` · ${type}` : ""}
        {totalPages > 1 ? ` · page ${page} of ${totalPages}` : ""}
      </p>

      {filtered.length ? (
        <>
          <ul ref={listRef} className="card ux4g-list ux4g-list-default ux4g-mt-l" style={{ scrollMarginTop: "120px" }}>
            {paged.map((item) => (
              <li key={item.type + item.title} className="ux4g-list-item">
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="ux4g-list-item-row"
                >
                  <span className="ux4g-list-item-start">
                    <span className="ux4g-tag-tonal-primary ux4g-tag-s">{item.type}</span>
                    <span>
                      <div style={{ fontWeight: 600 }}>{item.title}</div>
                      <div className="t-micro text-muted">{item.meta}</div>
                      {item.isNew && <span className="new-ribbon">New</span>}
                    </span>
                  </span>
                  <Icon name={item.external ? "external" : "arrowRight"} size={16} />
                </a>
              </li>
            ))}
          </ul>

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
