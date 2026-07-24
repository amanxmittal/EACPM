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
      <div className="container container-narrow">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <span>Policies</span>
        </nav>
        <span className="eyebrow">Statutory page · GIGW 3.0</span>
        <h1 className="t-h1 balance" style={{ marginTop: "0.6rem" }}>
          {p.title}
        </h1>
        <div className="prose" style={{ marginTop: "1.5rem" }}>
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
        <Link href="/" className="link-arrow" style={{ marginTop: "1.5rem" }}>
          ← Back to home
        </Link>
      </div>
    </section>
  );
}
