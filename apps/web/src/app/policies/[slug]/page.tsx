import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { policies, getPolicy } from "@/content/policies";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPolicy(slug);
  return { title: p?.title ?? "Policy" };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPolicy(slug);
  if (!p) notFound();

  return (
    <section className="section">
      <div className="ux4g-container container-narrow">
        <nav className="ux4g-breadcrumb ux4g-breadcrumb-divider" aria-label="Breadcrumb">
          <ol className="ux4g-breadcrumb-list">
            <li className="ux4g-breadcrumb-item">
              <Link className="ux4g-breadcrumb-link" href="/">Home</Link>
            </li>
            <li className="ux4g-breadcrumb-item active">Policies</li>
          </ol>
        </nav>
        <span className="eyebrow">Statutory page · GIGW 3.0</span>
        <h1 className="t-h1 balance ux4g-mt-xs">
          {p.title}
        </h1>
        <div className="prose ux4g-mt-xl">
          <p className="text-muted">
            This is a mandatory Government of India (GIGW 3.0) page. Its content is migrated
            verbatim from official sources and reviewed before launch — it is a titled placeholder
            in the MVP so the compliance structure and navigation are complete.
          </p>
          <p className="t-small text-muted">
            Tracked in <code>docs/GIGW_COMPLIANCE_MATRIX.md</code> with the implementing
            page/component/test and a pass/fail status.
          </p>
        </div>
        <Link href="/" className="link-arrow ux4g-mt-xl">
          ← Back to home
        </Link>
      </div>
    </section>
  );
}
