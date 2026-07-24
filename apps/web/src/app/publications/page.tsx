import type { Metadata } from "next";
import { reports } from "@/lib/reports";
import { PublicationsExplorer } from "@/components/publications/PublicationsExplorer";

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

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Publications</span>
          <h1 className="t-h1 balance" style={{ marginTop: "0.6rem" }}>
            Working papers, reports &amp; occasional papers
          </h1>
          <p className="t-lead measure" style={{ marginTop: "0.8rem" }}>
            {reports.length} publications from the Council and its partners. Fuzzy full-text
            search inside every PDF arrives with the search service — for now, filter and scan.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container">
          <PublicationsExplorer reports={reports} initialType={initialType} initialQuery={initialQuery} />
        </div>
      </section>
    </>
  );
}
