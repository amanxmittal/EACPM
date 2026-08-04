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

// Pulled out of `policies` into their own "Useful links" column, in this
// order — the rest stay under "Policies & Compliance".
const USEFUL_LINK_SLUGS = ["archive-policy", "sitemap", "help", "feedback", "terms-conditions", "rti", "web-information-manager"];

// Illustrative only (MVP), pending live analytics — Indian digit grouping.
const VISITOR_COUNT = "1,28,45,671";

/* eslint-disable @next/next/no-img-element */
export function SiteFooter() {
  const usefulLinks = USEFUL_LINK_SLUGS.map((slug) => policies.find((p) => p.slug === slug)).filter((p) => p != null);
  const compliancePolicies = policies.filter((p) => !USEFUL_LINK_SLUGS.includes(p.slug));

  return (
    <footer className={s.footer}>
      <div className="ux4g-container">
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
              matters. Evidence, data and analysis, in the public interest.
            </p>
            <p className={s.owned}>Content owned &amp; maintained by EAC-PM.</p>
            <span className={s.visitorCounter} title="Illustrative visitor count (MVP)">
              <span className={s.visitorLabel}>
                <Icon name="eye" size={15} /> Site Visitors
              </span>
              {/* The per-digit tiles are presentation: a screen reader would spell them out
                  one character at a time. Hide the whole display and expose the figure once
                  as plain text. (aria-label can't do that job here — it is prohibited on a
                  bare span, so it was being dropped and the count announced as nothing.) */}
              <span className={s.visitorDigits} aria-hidden>
                {VISITOR_COUNT.split("").map((c, i) =>
                  c === "," ? (
                    <span key={i} className={s.visitorComma}>,</span>
                  ) : (
                    <span key={i} className={s.visitorDigit}>{c}</span>
                  ),
                )}
              </span>
              <span className="sr-only">{VISITOR_COUNT}</span>
            </span>
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

          <nav aria-label="Useful links">
            <p className={s.colTitle}>Useful links</p>
            <div className={s.linkList}>
              {usefulLinks.map((p) => (
                <Link key={p.slug} href={`/policies/${p.slug}`}>
                  {p.title}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Policies">
            <p className={s.colTitle}>Policies &amp; Compliance</p>
            <div className={s.linkList}>
              {compliancePolicies.map((p) => (
                <Link key={p.slug} href={`/policies/${p.slug}`}>
                  {p.title}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className={s.bottom}>
          <p className={s.credit}>
            © 2026 EAC-PM. Designed &amp; developed by UX4G.
          </p>
          <div className={s.meta}>
            <span>Last updated: 24 Jul 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
