import type { Metadata } from "next";
import { notices } from "@/content/media";
import { NoticesExplorer } from "@/components/notices/NoticesExplorer";

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

  return (
    <>
      <section className="page-hero">
        <div className="ux4g-container">
          <span className="kicker">Notices</span>
          <h1 className="t-h1 balance ux4g-mt-xs">
            Tenders, vacancies &amp; circulars
          </h1>
          <p className="t-lead measure ux4g-mt-s">
            Open positions, procurement notices and circulars — with publish and close dates,
            status badges, and an e-mail / RSS subscription (wired with the backend).
          </p>
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
