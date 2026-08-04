"use client";
import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  isArchived,
  ARCHIVE_AFTER_YEARS,
  noticeStatusClass,
  noticeStatusLabel,
  type Notice,
  type NoticeKind,
} from "@/content/media";

const categories: NoticeKind[] = ["Tender", "Vacancy Circular", "Work at EAC-PM", "Other"];

export function NoticesExplorer({ notices, initialType = "All" }: { notices: Notice[]; initialType?: string }) {
  const [type, setType] = useState(initialType);
  const [q, setQ] = useState("");
  const [isArchiveView, setIsArchiveView] = useState(false);

  // Current and Archive are separate base pools — an aged-out notice leaves the
  // category tabs entirely rather than showing up under both.
  const { current, archived } = useMemo(() => {
    const cur = notices.filter((n) => !isArchived(n));
    const arch = notices
      .filter((n) => isArchived(n))
      .sort((a, b) => (b.published ?? "").localeCompare(a.published ?? "")); // newest first
    return { current: cur, archived: arch };
  }, [notices]);

  const filtered = useMemo(() => {
    const pool = isArchiveView ? archived : type !== "All" ? current.filter((n) => n.kind === type) : current;
    if (!q) return pool;
    const needle = q.toLowerCase();
    return pool.filter((n) => `${n.title} ${n.kind}`.toLowerCase().includes(needle));
  }, [isArchiveView, archived, current, type, q]);

  return (
    <>
      <SectionHeader
        eyebrow={isArchiveView ? "Archived notices" : "All notices"}
        title={isArchiveView ? "Archive" : "Current notices"}
      />

      <div className="toolbar">
        <div className="filter-chips" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`ux4g-choice-chip-md${type === "All" && !isArchiveView ? " active" : ""}`}
            aria-pressed={type === "All" && !isArchiveView}
            onClick={() => {
              setType("All");
              setIsArchiveView(false);
            }}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`ux4g-choice-chip-md${type === c && !isArchiveView ? " active" : ""}`}
              aria-pressed={type === c && !isArchiveView}
              onClick={() => {
                setType(c);
                setIsArchiveView(false);
              }}
            >
              {c}
            </button>
          ))}
          {/* Archive switches the base pool rather than narrowing the current one,
              but sits inline with the category chips rather than pushed away —
              still one flat row of togglable filters. */}
          <button
            type="button"
            className={`ux4g-choice-chip-md${isArchiveView ? " active" : ""}`}
            aria-pressed={isArchiveView}
            onClick={() => setIsArchiveView((v) => !v)}
          >
            Archive
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
              placeholder="Search notices"
              aria-label="Search notices"
            />
          </label>
        </div>
      </div>

      {filtered.length ? (
        <ul className="card ux4g-list ux4g-list-default ux4g-mt-l">
          {filtered.map((n) => (
            <li key={n.title} className="ux4g-list-item">
              <a href={n.href} target={n.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="ux4g-list-item-row">
                <span className="ux4g-list-item-start">
                  <span className="ux4g-tag-tonal-neutral ux4g-tag-s">{n.kind}</span>
                  <span style={{ fontWeight: 600 }}>{n.title}</span>
                </span>
                <span className="ux4g-list-item-end">
                  <span className="t-micro text-muted">
                    {isArchiveView && n.published
                      ? new Date(n.published).toLocaleDateString("en-IN", { year: "numeric", month: "short" })
                      : n.date}
                  </span>
                  <span className={noticeStatusClass[n.status]}>{noticeStatusLabel[n.status]}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="ux4g-empty-state ux4g-mt-l" style={{ padding: "3rem 1rem" }}>
          <span className="ux4g-empty-state-icon">
            <Icon name="book" size={32} />
          </span>
          <div className="ux4g-empty-state-content">
            <p className="t-h4">
              {isArchiveView ? "Nothing archived yet" : q ? "No notices match that search" : "No notices in this category right now"}
            </p>
            <p className="text-muted t-small">
              {isArchiveView
                ? `Notices move here once they are more than ${ARCHIVE_AFTER_YEARS} years old.`
                : q
                  ? "Try a different search term."
                  : "Tenders and circulars appear here when published."}
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
