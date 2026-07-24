import type { Metadata } from "next";
import Link from "next/link";
import { reports, readMinutes } from "@/lib/reports";
import { PublicationsExplorer } from "@/components/publications/PublicationsExplorer";
import { CoverArt } from "@/components/ui/CoverArt";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Publications",
  description: "Working papers, reports and occasional papers from the Economic Advisory Council to the Prime Minister.",
};

export default async function PublicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const initialType = typeof sp.type === "string" ? sp.type : "All";
  const initialQuery = typeof sp.q === "string" ? sp.q : "";
  const featured = reports[0];

  return (
    <>
      <section className="page-hero hero-stage grain">
        <div className="container hero-content">
          <span className="kicker">Publications</span>
          <h1 className="t-h1 balance" style={{ marginTop: "0.6rem", maxWidth: "18ch" }}>
            Working papers, reports &amp; occasional papers
          </h1>
          <hr className="gold-rule" style={{ margin: "1.1rem 0" }} />
          <p className="t-lead measure">
            {reports.length} publications from the Council and its partners. Fuzzy full-text search
            inside every PDF arrives with the search service — for now, filter and scan.
          </p>
        </div>
      </section>

      {/* featured spotlight */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Reveal>
            <span className="kicker">Latest working paper</span>
            <Link
              href={`/publications/${featured.slug}`}
              className="card card-hover"
              style={{ display: "grid", gridTemplateColumns: "minmax(0, 300px) 1fr", gap: "clamp(1.2rem, 3vw, 2.4rem)", alignItems: "center", marginTop: "1rem" }}
            >
              <div style={{ maxWidth: "300px" }}>
                <CoverArt report={featured} />
              </div>
              <div>
                <div className="cluster" style={{ gap: "0.5rem" }}>
                  <span className="badge">{featured.type}</span>
                  <span className="t-micro text-muted">
                    {featured.year} · {readMinutes(featured)} min read
                  </span>
                </div>
                <h2 className="t-h2 balance" style={{ marginTop: "0.6rem" }}>
                  {featured.title}
                </h2>
                <p className="text-muted" style={{ marginTop: "0.7rem" }}>
                  {featured.abstract}
                </p>
                <span className="link-arrow" style={{ marginTop: "1rem" }}>
                  Read the paper <Icon name="arrowRight" size={16} />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <PublicationsExplorer reports={reports} initialType={initialType} initialQuery={initialQuery} />
        </div>
      </section>
    </>
  );
}
