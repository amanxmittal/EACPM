import Link from "next/link";
import type { Metadata } from "next";
import { notices, isArchived, ARCHIVE_AFTER_YEARS, noticeStatusClass, noticeStatusLabel, type NoticeKind } from "@/content/media";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Notices",
  description: "Tenders, vacancy circulars, Work at EAC-PM and other notices.",
};

const categories: NoticeKind[] = ["Tender", "Vacancy Circular", "Work at EAC-PM", "Other"];

export default async function NoticesPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const isArchiveView = sp.view === "archive";
  const activeType = !isArchiveView && typeof sp.type === "string" ? sp.type : null;

  // Current and Archive are separate views, so an aged-out notice leaves the
  // category tabs entirely rather than showing up under both.
  const current = notices.filter((n) => !isArchived(n));
  const archived = notices
    .filter((n) => isArchived(n))
    .sort((a, b) => (b.published ?? "").localeCompare(a.published ?? "")); // newest first

  const filtered = isArchiveView
    ? archived
    : activeType
      ? current.filter((n) => n.kind === activeType)
      : current;

  return (
    <>
      <section className="page-hero">
        <div className="ux4g-container">
          <span className="kicker">Notices</span>
          <h1 className="t-h1 balance" style={{ marginTop: "0.6rem" }}>
            Tenders, vacancies &amp; circulars
          </h1>
          <p className="t-lead measure" style={{ marginTop: "0.8rem" }}>
            Open positions, procurement notices and circulars — with publish and close dates,
            status badges, and an e-mail / RSS subscription (wired with the backend).
          </p>
        </div>
      </section>

      <section className="section">
        <div className="ux4g-container">
          <div className="cluster" style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
            <SectionHeader
              eyebrow={isArchiveView ? "Archived notices" : "All notices"}
              title={isArchiveView ? "Archive" : "Current notices"}
            />
            <a href="#" className="ux4g-btn-outline-primary ux4g-btn-sm">
              <Icon name="rss" size={16} /> Subscribe
            </a>
          </div>

          <div className="filter-chips" role="group" aria-label="Filter by category" style={{ marginBottom: "1.2rem" }}>
            <Link href="/notices" className={`ux4g-choice-chip-md${!activeType && !isArchiveView ? " active" : ""}`} aria-current={!activeType && !isArchiveView ? "true" : undefined}>
              All
            </Link>
            {categories.map((c) => (
              <Link key={c} href={`/notices?type=${encodeURIComponent(c)}`} className={`ux4g-choice-chip-md${activeType === c ? " active" : ""}`} aria-current={activeType === c ? "true" : undefined}>
                {c}
              </Link>
            ))}
            {/* Archive sits last and is separated from the category chips — it
                switches view rather than narrowing the current list. */}
            <Link
              href="/notices?view=archive"
              className={`ux4g-choice-chip-md chip-trailing${isArchiveView ? " active" : ""}`}
              aria-current={isArchiveView ? "true" : undefined}
            >
              Archive
            </Link>
          </div>

          {filtered.length ? (
            <ul className="card ux4g-list ux4g-list-default">
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
            <div className="ux4g-empty-state" style={{ padding: "3rem 1rem" }}>
              <span className="ux4g-empty-state-icon">
                <Icon name="book" size={32} />
              </span>
              <div className="ux4g-empty-state-content">
                <p className="t-h4">
                  {isArchiveView ? "Nothing archived yet" : "No notices in this category right now"}
                </p>
                <p className="text-muted t-small">
                  {isArchiveView
                    ? `Notices move here once they are more than ${ARCHIVE_AFTER_YEARS} years old.`
                    : "Tenders and circulars appear here when published."}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
