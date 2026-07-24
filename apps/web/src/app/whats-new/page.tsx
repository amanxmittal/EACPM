import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { reports } from "@/lib/reports";
import { notices, articles } from "@/content/media";

export const metadata: Metadata = {
  title: "What's New",
  description: "Newly added and recently updated content across publications, notices and media.",
};

type Feed = "Publication" | "Notice" | "Media";
const kinds: Feed[] = ["Publication", "Notice", "Media"];

type Item = { type: Feed; title: string; meta: string; href: string; external?: boolean };

function buildFeed(): Item[] {
  const pubs: Item[] = reports.slice(0, 8).map((r) => ({
    type: "Publication",
    title: r.title,
    meta: `${r.type} · ${r.year ?? "—"}`,
    href: `/publications/${r.slug}`,
  }));
  const notes: Item[] = notices.map((n) => ({
    type: "Notice",
    title: n.title,
    meta: `${n.kind} · ${n.date}`,
    href: n.href,
    external: n.href.startsWith("http"),
  }));
  const media: Item[] = articles.slice(0, 4).map((a) => ({
    type: "Media",
    title: a.title,
    meta: `${a.author} · ${a.outlet}`,
    href: a.href,
    external: true,
  }));
  // Illustrative ordering — real recency comes from content timestamps once the CMS lands.
  return [...pubs, ...notes, ...media];
}

export default async function WhatsNewPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const activeType = typeof sp.type === "string" ? sp.type : null;
  const feed = buildFeed();
  const filtered = activeType ? feed.filter((i) => i.type === activeType) : feed;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="kicker">What&apos;s New</span>
          <h1 className="t-h1 balance" style={{ marginTop: "0.6rem" }}>
            Newly added &amp; recently updated
          </h1>
          <p className="t-lead measure" style={{ marginTop: "0.8rem" }}>
            Auto-populated from content across Publications, Notices and Media — zero manual
            curation, with an RSS/Atom feed once the backend lands.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <span className="flag">Illustrative ordering — real timestamps arrive with the CMS</span>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cluster" style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
            <div className="filter-chips" role="group" aria-label="Filter by type">
              <Link href="/whats-new" className={`chip${!activeType ? " is-active" : ""}`}>
                All
              </Link>
              {kinds.map((k) => (
                <Link key={k} href={`/whats-new?type=${k}`} className={`chip${activeType === k ? " is-active" : ""}`}>
                  {k}
                </Link>
              ))}
            </div>
            <a href="#" className="btn btn-outline" style={{ padding: "0.5rem 0.9rem" }}>
              <Icon name="rss" size={16} /> RSS
            </a>
          </div>

          {filtered.length ? (
            <div className="card">
              {filtered.map((item) => (
                <a
                  key={item.type + item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="row-item"
                >
                  <span className="badge">{item.type}</span>
                  <div className="row-main">
                    <div style={{ fontWeight: 600 }}>{item.title}</div>
                    <div className="t-micro text-muted">{item.meta}</div>
                  </div>
                  <Icon name={item.external ? "external" : "arrowRight"} size={16} />
                </a>
              ))}
            </div>
          ) : (
            <p className="empty">Nothing in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
