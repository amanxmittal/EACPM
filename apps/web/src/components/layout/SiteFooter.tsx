import Link from "next/link";
import { policies } from "@/content/policies";
import { Icon } from "@/components/ui/Icon";
import s from "./footer.module.css";

const explore = [
  { label: "Publications", href: "/publications" },
  { label: "Data & Dashboards", href: "/data" },
  { label: "Media and Events", href: "/media" },
  { label: "What's New", href: "/whats-new" },
];
const quick = [
  { label: "About EAC-PM", href: "/about" },
  { label: "Notices", href: "/notices" },
  { label: "Contact Us", href: "/contact" },
];
const partners = [
  { src: "/brand/PMINDIA.png", alt: "PMINDIA" },
  { src: "/brand/NITI-Aayog-logo.png", alt: "NITI Aayog" },
  { src: "/brand/mygov-logo.png", alt: "MyGov" },
  { src: "/brand/Cabinet-Secretariat.png", alt: "Cabinet Secretariat" },
];

/* eslint-disable @next/next/no-img-element */
export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.top}>
          <div>
            <div className={s.brandRow}>
              <img src="/brand/logo.png" alt="" width={27} height={46} className="emblem-adapt" />
              <span className={s.brandName}>
                Economic Advisory Council
                <br />
                to the Prime Minister
              </span>
            </div>
            <p className={s.about}>
              An independent body constituted to advise the Prime Minister on economic
              matters. Evidence, data and analysis — in the public interest.
            </p>
            <p className={s.owned}>Content owned &amp; maintained by EAC-PM.</p>
          </div>

          <nav aria-label="Explore">
            <p className={s.colTitle}>Explore</p>
            <div className={s.linkList}>
              {explore.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Quick links">
            <p className={s.colTitle}>Quick Links</p>
            <div className={s.linkList}>
              {quick.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Policies">
            <p className={s.colTitle}>Policies &amp; Compliance</p>
            <div className={s.linkList}>
              {policies.map((p) => (
                <Link key={p.slug} href={`/policies/${p.slug}`}>
                  {p.title}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className={s.partners}>
          <span className={s.partnersLabel}>In association with</span>
          {partners.map((p) => (
            <span className={s.partnerChip} key={p.alt}>
              <img src={p.src} alt={p.alt} />
            </span>
          ))}
        </div>

        <div className={s.bottom}>
          <p className={s.credit}>
            © 2026 EAC-PM. Designed &amp; developed by <strong>Digital India Corporation</strong>.
            Hosted on the National Government Cloud.
          </p>
          <div className={s.meta}>
            <span className={s.counter} title="Illustrative visitor count (MVP)">
              <Icon name="users" size={15} /> Visitors:{" "}
              <span className={s.counterNum}>12,48,097</span>
            </span>
            <span>Last updated: 24 Jul 2026</span>
            <Link href="/policies/feedback" className="link-arrow">
              Feedback
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
