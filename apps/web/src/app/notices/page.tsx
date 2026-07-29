import Link from "next/link";
import type { Metadata } from "next";
import { notices, isArchived, ARCHIVE_AFTER_YEARS, type NoticeKind } from "@/content/media";
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
        <div className="container">
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
        <div className="container">
          <div className="cluster" style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
            <SectionHeader
              eyebrow={isArchiveView ? "Archived notices" : "All notices"}
              title={isArchiveView ? "Archive" : "Current notices"}
            />
            <a href="#" className="btn btn-outline" style={{ padding: "0.5rem 0.9rem" }}>
              <Icon name="rss" size={16} /> Subscribe
            </a>
          </div>

          <div className="filter-chips" role="group" aria-label="Filter by category" style={{ marginBottom: "1.2rem" }}>
            <Link href="/notices" className={`chip${!activeType && !isArchiveView ? " is-active" : ""}`}>
              All
            </Link>
            {categories.map((c) => (
              <Link key={c} href={`/notices?type=${encodeURIComponent(c)}`} className={`chip${activeType === c ? " is-active" : ""}`}>
                {c}
              </Link>
            ))}
            {/* Archive sits last and is separated from the category chips — it
                switches view rather than narrowing the current list. */}
            <Link
              href="/notices?view=archive"
              className={`chip chip-trailing${isArchiveView ? " is-active" : ""}`}
            >
              Archive
            </Link>
          </div>

          {filtered.length ? (
            <div className="card">
              {filtered.map((n) => (
                <a key={n.title} href={n.href} target={n.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="row-item">
                  <span className="badge badge-neutral">{n.kind}</span>
                  <div className="row-main" style={{ fontWeight: 600 }}>
                    {n.title}
                  </div>
                  <span className="t-micro text-muted">
                    {isArchiveView && n.published
                      ? new Date(n.published).toLocaleDateString("en-IN", { year: "numeric", month: "short" })
                      : n.date}
                  </span>
                  <span className={`status status-${n.status === "open" ? "open" : n.status === "soon" ? "soon" : "closed"}`}>
                    {n.status === "open" ? "Open" : n.status === "soon" ? "Opening soon" : "Closed"}
                  </span>
                </a>
              ))}
            </div>
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
