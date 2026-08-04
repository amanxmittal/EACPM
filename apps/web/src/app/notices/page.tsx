import type { Metadata } from "next";
import { notices, isArchived } from "@/content/media";
import { NoticesExplorer } from "@/components/notices/NoticesExplorer";
import { NoticesSpotlight } from "@/components/notices/NoticesSpotlight";

export const metadata: Metadata = {
  title: "Notices",
  description: "Tenders, vacancy circulars, Work at EAC-PM and other notices.",
};

export default async function NoticesPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const initialType = typeof sp.type === "string" ? sp.type : "All";
  // Only 4 notices exist right now — spotlight shows whatever's current, up
  // to 5, rather than padding out to a fixed count with anything invented.
  const spotlightNotices = notices.filter((n) => !isArchived(n)).slice(0, 5);

  return (
    <>
      <section className="page-hero">
        <div className="ux4g-container">
          <span className="kicker">Tenders, vacancies &amp; circulars</span>
          <h1 className="t-h1 balance ux4g-mt-xs">
            Notices
          </h1>
          <p className="t-lead measure ux4g-mt-s">
            Open positions, procurement notices and circulars — with publish and close dates,
            status badges, and an e-mail / RSS subscription (wired with the backend).
          </p>
        </div>
      </section>

      <section className="section ux4g-pb-none">
        <div className="ux4g-container">
          <NoticesSpotlight notices={spotlightNotices} />
        </div>
      </section>

      <section className="section">
        <div className="ux4g-container">
          <NoticesExplorer notices={notices} initialType={initialType} />
        </div>
      </section>
    </>
  );
}
