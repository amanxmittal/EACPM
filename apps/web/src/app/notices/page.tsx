import type { Metadata } from "next";
import { notices } from "@/content/media";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Notices",
  description: "Tenders, vacancy circulars, Work at EAC-PM and other notices.",
};

const whatsNew = [
  { title: "New working paper: The World in Purchasing Power Parity", type: "Publication", href: "/publications" },
  { title: "ASUSE–PLFS working paper published", type: "Publication", href: "/publications" },
  { title: "Vacancy circular for consultants opened", type: "Notice", href: "/notices" },
];

export default function NoticesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Notices</span>
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
          <div className="card">
            {notices.map((n) => (
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
        </div>
      </section>

      <section className="section tint" id="whats-new" style={{ scrollMarginTop: "84px" }}>
        <div className="container">
          <SectionHeader eyebrow="What's new" title="Recently added &amp; updated">
            Auto-populated from content timestamps — zero manual curation — with an RSS/Atom feed.
          </SectionHeader>
          <div className="card">
            {whatsNew.map((w) => (
              <a key={w.title} href={w.href} className="row-item">
                <span className="badge">{w.type}</span>
                <div className="row-main" style={{ fontWeight: 600 }}>
                  {w.title}
                </div>
                <Icon name="arrowRight" size={16} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
