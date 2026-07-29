import Link from "next/link";
import { Icon } from "./Icon";
import { CoverArt } from "./CoverArt";
import { readMinutes, type Report } from "@/lib/reports";

export function PublicationCard({ report }: { report: Report }) {
  return (
    <article className="card card-hover pub-card">
      <Link href={`/publications/${report.slug}`} aria-label={report.title}>
        <CoverArt report={report} />
      </Link>
      <div className="pub-body">
        <div className="cluster" style={{ gap: "0.5rem" }}>
          <span className="badge badge-neutral">{report.year ?? "—"}</span>
          <span className="t-micro text-muted">{report.type}</span>
          <span className="t-micro text-muted">· {readMinutes(report)} min read</span>
        </div>
        <Link href={`/publications/${report.slug}`}>
          <h3 className="pub-title">{report.title}</h3>
        </Link>
        <p className="pub-abstract">{report.abstract}</p>
        <div className="pub-foot">
          <Link href={`/publications/${report.slug}`} className="link-arrow t-small">
            Read <Icon name="arrowRight" size={16} />
          </Link>
          <a
            href={report.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ux4g-btn-outline-primary ux4g-btn-md"
            style={{ padding: "0.4rem 0.7rem", fontSize: "0.85rem" }}
            aria-label={`Download PDF: ${report.title}`}
          >
            <Icon name="download" size={15} /> PDF
          </a>
        </div>
      </div>
    </article>
  );
}
