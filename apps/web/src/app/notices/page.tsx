import Link from "next/link";
import type { Metadata } from "next";
import { notices, type NoticeKind } from "@/content/media";
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
  const activeType = typeof sp.type === "string" ? sp.type : null;
  const filtered = activeType ? notices.filter((n) => n.kind === activeType) : notices;

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
            <SectionHeader eyebrow="All notices" title="Current notices" />
            <a href="#" className="btn btn-outline" style={{ padding: "0.5rem 0.9rem" }}>
              <Icon name="rss" size={16} /> Subscribe
            </a>
          </div>

          <div className="filter-chips" role="group" aria-label="Filter by category" style={{ marginBottom: "1.2rem" }}>
            <Link href="/notices" className={`chip${!activeType ? " is-active" : ""}`}>
              All
            </Link>
            {categories.map((c) => (
              <Link key={c} href={`/notices?type=${encodeURIComponent(c)}`} className={`chip${activeType === c ? " is-active" : ""}`}>
                {c}
              </Link>
            ))}
          </div>

          {filtered.length ? (
            <div className="card">
              {filtered.map((n) => (
                <a key={n.title} href={n.href} target={n.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="row-item">
                  <span className="badge badge-neutral">{n.kind}</span>
                  <div className="row-main" style={{ fontWeight: 600 }}>
                    {n.title}
                  </div>
                  <span className="t-micro text-muted">{n.date}</span>
                  <span className={`status status-${n.status === "open" ? "open" : n.status === "soon" ? "soon" : "closed"}`}>
                    {n.status === "open" ? "Open" : n.status === "soon" ? "Opening soon" : "Closed"}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <p className="empty">No notices in this category right now.</p>
          )}
        </div>
      </section>
    </>
  );
}
