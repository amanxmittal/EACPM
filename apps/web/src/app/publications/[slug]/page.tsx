import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { CoverArt } from "@/components/ui/CoverArt";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { reports, getReport, relatedReports, readMinutes, illustrativeStats } from "@/lib/reports";

export function generateStaticParams() {
  return reports.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getReport(slug);
  return r ? { title: r.title, description: r.abstract.slice(0, 150) } : { title: "Publication" };
}

export default async function PublicationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getReport(slug);
  if (!r) notFound();
  const related = relatedReports(r);
  const stats = illustrativeStats(r);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: r.title,
    abstract: r.abstract,
    datePublished: r.year ? String(r.year) : undefined,
    inLanguage: "en",
    publisher: { "@type": "GovernmentOrganization", name: "Economic Advisory Council to the Prime Minister" },
  };

  return (
    <section className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container">
        <nav className="ux4g-breadcrumb ux4g-breadcrumb-divider" aria-label="Breadcrumb">
          <ol className="ux4g-breadcrumb-list">
            <li className="ux4g-breadcrumb-item">
              <Link className="ux4g-breadcrumb-link" href="/">Home</Link>
            </li>
            <li className="ux4g-breadcrumb-item">
              <Link className="ux4g-breadcrumb-link" href="/publications">Publications</Link>
            </li>
            <li className="ux4g-breadcrumb-item active">{r.type}</li>
          </ol>
        </nav>

        <div className="detail-grid">
          <article>
            <span className="ux4g-tag-tonal-primary ux4g-tag-s">{r.type}</span>
            <h1 className="t-h1 balance" style={{ marginTop: "0.8rem" }}>
              {r.title}
            </h1>
            <p className="text-muted" style={{ marginTop: "0.6rem" }}>
              Authors: <em>pending verification</em> · {r.year ?? "—"} · {readMinutes(r)} min read
            </p>

            <div className="prose" style={{ marginTop: "1.5rem" }}>
              <h2 className="t-h3">Abstract</h2>
              <p>{r.abstract}</p>
              <p className="text-muted t-small">
                The full text lives in the PDF. An accessible in-page viewer, full-text-in-PDF
                search, and author profile links arrive with the search service and CMS.
              </p>
            </div>

            <div className="cluster" style={{ marginTop: "1.5rem" }}>
              <a href={r.pdfUrl} target="_blank" rel="noopener noreferrer" className="ux4g-btn-primary ux4g-btn-lg">
                <Icon name="download" size={18} /> Download PDF
              </a>
              <a href={r.pdfUrl} target="_blank" rel="noopener noreferrer" className="ux4g-btn-outline-primary ux4g-btn-lg">
                <Icon name="external" size={18} /> View original
              </a>
            </div>
          </article>

          <aside>
            <div className="side-card stack">
              <CoverArt report={r} />
              <div className="card">
                <dl style={{ margin: 0 }}>
                  <div className="meta-row">
                    <dt>Type</dt>
                    <dd>{r.type}</dd>
                  </div>
                  <div className="meta-row">
                    <dt>Year</dt>
                    <dd>{r.year ?? "—"}</dd>
                  </div>
                  <div className="meta-row">
                    <dt>Series</dt>
                    <dd>EAC-PM</dd>
                  </div>
                  <div className="meta-row">
                    <dt>Language</dt>
                    <dd>English</dd>
                  </div>
                  <div className="meta-row">
                    <dt>Views</dt>
                    <dd>{stats.views.toLocaleString("en-IN")}</dd>
                  </div>
                  <div className="meta-row">
                    <dt>Downloads</dt>
                    <dd>{stats.downloads.toLocaleString("en-IN")}</dd>
                  </div>
                </dl>
              </div>
              <p className="t-micro text-muted">Illustrative — real analytics need server-side, bot-filtered tracking.</p>
              <div>
                <p className="t-overline" style={{ marginBottom: "0.5rem" }}>
                  Cite as
                </p>
                <div className="cite-box">
                  Economic Advisory Council to the Prime Minister ({r.year ?? "n.d."}). <em>{r.title}</em>. Government of India.
                </div>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: "3rem" }}>
            <h2 className="t-h3" style={{ marginBottom: "1.2rem" }}>
              Related publications
            </h2>
            <div className="grid grid-3">
              {related.map((x) => (
                <PublicationCard key={x.slug} report={x} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
