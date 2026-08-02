import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { HeroCarousel, type HeroSlide } from "@/components/art/HeroCarousel";
import { HomePublications } from "@/components/publications/HomePublications";
import { HomeNewsroom } from "@/components/media/HomeNewsroom";
import { HomeNotices } from "@/components/notices/HomeNotices";
import { HomeDashboards } from "@/components/data/HomeDashboards";
import { news as pressCoverage } from "@/app/media/page";
import { multiples as indicators } from "@/app/data/page";
import { reports } from "@/lib/reports";
import { articles, notices } from "@/content/media";
import { members } from "@/content/team";
import { MemberAvatar } from "@/components/ui/MemberAvatar";
import { channels } from "@/content/channels";

// Rotating hero backdrop: India's economy across sectors. Real, CC BY-SA photographs,
// self-hosted; credits in content/ATTRIBUTIONS.md and surfaced in the hero.
const heroSlides: HeroSlide[] = [
  { src: "/img/bandra-worli-sealink.jpg", theme: "Infrastructure", place: "Bandra-Worli Sea Link, Mumbai", alt: "The Bandra-Worli Sea Link stretching across the sea at sunset", credit: { name: "Capturedmumbai", href: "https://commons.wikimedia.org/wiki/File:Bandra_worli_sea-link_at_sunset.jpg" } },
  { src: "/img/delhi-metro.jpg", theme: "People & mobility", place: "Delhi Metro", alt: "Commuters boarding a Delhi Metro train at a station platform", credit: { name: "Celestinesucess", href: "https://commons.wikimedia.org/wiki/File:Delhi_Metro_Station_(P1140769).jpg" } },
  { src: "/img/jnpt-port.jpg", theme: "Trade & exports", place: "Jawaharlal Nehru Port, Navi Mumbai", alt: "Gantry cranes loading containers onto a ship at Jawaharlal Nehru Port", credit: { name: "Ccmarathe", href: "https://commons.wikimedia.org/wiki/File:JNPT_Port_container_handling.jpg" } },
];

type Affiliation = { src: string; alt: string; href: string; wordmark?: { top: string; bottom: string } };
const affiliations: Affiliation[] = [
  { src: "/brand/NITI-Aayog-logo.png", alt: "NITI Aayog", href: "https://www.niti.gov.in/" },
  { src: "/brand/PMINDIA.png", alt: "Prime Minister of India", href: "https://www.pmindia.gov.in/" },
  { src: "/brand/Cabinet-Secretariat.png", alt: "Cabinet Secretariat", href: "https://cabsec.gov.in/" },
  { src: "/brand/mygov-logo.png", alt: "MyGov", href: "https://www.mygov.in/" },
  { src: "/brand/india-gov-in.svg", alt: "India.gov.in — National Portal of India", href: "https://www.india.gov.in/" },
  // apps.gov.in's own header pairs this icon with real "Gov.in / AppStore" text, not a
  // flattened logo image — matched here rather than baking the wordmark into a raster/
  // vector export, which would break Hindi parity and screen-reader text.
  { src: "/brand/apps-gov-in.svg", alt: "Gov.in AppStore", href: "https://apps.gov.in/", wordmark: { top: "Gov.in", bottom: "AppStore" } },
];

export default function Home() {
  const feature = reports[0];
  const lead = reports[1] ?? reports[0];

  const whatsNew = [
    { when: "This week", title: feature.title, note: `${feature.type} · ${feature.year ?? "recent"}`, href: `/publications/${feature.slug}`, img: "/img/What's%20new/constituency%20size.png" },
    { when: "This week", title: notices[0].title, note: `${notices[0].kind} · ${notices[0].date}`, href: notices[0].href },
    { when: "Recent", title: lead.title, note: `${lead.type} · ${lead.year ?? "recent"}`, href: `/publications/${lead.slug}`, img: "/img/What's%20new/estimating%20reduction.png" },
    { when: "Recent", title: articles[0].title, note: `${articles[0].author} · ${articles[0].outlet}`, href: articles[0].href, img: "/img/What's%20new/manufacturing%20opportunity.jpg" },
    { when: "Recent", title: reports[3].title, note: `${reports[3].type} · ${reports[3].year ?? "recent"}`, href: `/publications/${reports[3].slug}`, img: "/img/What's%20new/financial%20inclusion.png" },
  ];

  return (
    <>
      {/* ============ 1 · HERO (cinematic, rotating) ============ */}
      <section className="hero-cine">
        <HeroCarousel slides={heroSlides}>
          <div className="hero-cine-inner">
            <div className="hero-cine-copy hero-cine-entrance">
              <Link href={`/publications/${feature.slug}`} className="hero-badge">
                <span className="pulse" aria-hidden /> New: latest working paper
              </Link>
              <span className="hero-cine-eyebrow">Economic Advisory Council to the Prime Minister</span>
              <h1 className="hero-cine-title">
                India&apos;s growth story, read with <span className="u">evidence</span>.
              </h1>
              <p className="hero-cine-sub">
                The data, working papers and analysis behind the world&apos;s most-watched economy.
                Sourced, dated, and open to everyone.
              </p>
            </div>
          </div>
        </HeroCarousel>
      </section>

      {/* ============ 2 · MESSAGE FROM THE CHAIRPERSON ============ */}
      <section className="section tint">
        <div className="ux4g-container">
          <div className="chair-grid">
            <Reveal className="chair-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/chairman-NITI.jpeg" alt="Portrait of the Chairperson, EAC-PM" />
            </Reveal>
            <Reveal delay={120}>
              <span className="kicker">Message from the Chairperson</span>
              <blockquote className="t-h3 balance dropcap ux4g-mt-s" style={{ fontWeight: 600 }}>
                The Council&apos;s work is to bring evidence to bear on the questions that matter most
                for India&apos;s growth — and to state plainly what the data does, and does not yet,
                show.
              </blockquote>
              <p className="text-muted ux4g-mt-m">
                A signed message and an optional captioned video with a transcript are placeholders
                pending official assets.
              </p>
              <Link href="/about#chairperson" className="ux4g-btn-outline-primary ux4g-btn-md ux4g-mt-l">
                Read the full message <Icon name="arrowRight" size={18} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 3 · TEAM (horizontal scroll) ============ */}
      <section className="team-section">
        <div className="ux4g-container">
          <div className="pubs-head">
            <h2>Team</h2>
            <Link href="/about#team" className="view-all">View team <Icon name="arrowRight" size={16} /></Link>
          </div>
          <div className="rail">
            {members.map((m) => (
              <div key={m.slug} className="card member team-rail-card">
                <MemberAvatar member={m} />
                <div>
                  <h3>{m.name}</h3>
                  <p className="text-muted t-small">{m.affiliation} · {m.designation ?? "designation pending"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4 · PUBLICATIONS (paired carousel cards) ============ */}
      <section className="pubs">
        <div className="ux4g-container">
          <div className="pubs-head">
            <h2>Publications</h2>
            <Link href="/publications" className="view-all">View all publications <Icon name="arrowRight" size={16} /></Link>
          </div>
          <HomePublications reports={reports} excludeSlug={feature.slug} />
        </div>
      </section>

      {/* ============ 5 · DASHBOARDS (paired carousel cards) ============ */}
      <section className="dashp bleed">
        <div className="ux4g-container">
          <div className="pubs-head">
            <h2>Data &amp; Dashboards</h2>
            <Link href="/data" className="view-all">Open the dashboards <Icon name="arrowRight" size={16} /></Link>
          </div>
          <HomeDashboards indicators={indicators} />
        </div>
      </section>

      {/* ============ 6 · INSTITUTION (photograph) ============ */}
      <section className="inst">
        <div className="ux4g-container">
          <div className="inst-grid">
            <Reveal className="inst-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/rashtrapati-bhavan.jpg" alt="Rashtrapati Bhavan, the seat of the Government of India in New Delhi" loading="lazy" />
              <span className="cap">Rashtrapati Bhavan, New Delhi</span>
            </Reveal>
            <div>
              <span className="inst-kicker">About the Council</span>
              <h2>Independent counsel to the Prime Minister on the economy</h2>
              <p>
                The Economic Advisory Council to the Prime Minister is an independent body that advises
                the Prime Minister on economic and related matters. It analyses the economy, flags the
                issues that need attention, and offers evidence-based policy counsel.
              </p>
              <p className="ux4g-mt-l">
                <Link href="/about" className="view-all">Read about EAC-PM <Icon name="arrowRight" size={16} /></Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7 · NOTICES (paired carousel cards) ============ */}
      <section className="news">
        <div className="ux4g-container">
          <div className="pubs-head">
            <h2>Notices</h2>
            <Link href="/notices" className="view-all">View all notices <Icon name="arrowRight" size={16} /></Link>
          </div>
          <HomeNotices notices={notices} />
        </div>
      </section>

      {/* ============ 8 · MEDIA & EVENTS (paired carousel cards) ============ */}
      <section className="news">
        <div className="ux4g-container">
          <div className="pubs-head">
            <h2>Media &amp; Events</h2>
            <Link href="/media" className="view-all">View all media <Icon name="arrowRight" size={16} /></Link>
          </div>
          <HomeNewsroom articles={articles} news={pressCoverage} />

          {/* What's New rail */}
          <div style={{ marginTop: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <div className="rail-head">
              <h2>What&apos;s new</h2>
              <Link href="/whats-new" className="view-all">Everything recent <Icon name="arrowRight" size={16} /></Link>
            </div>
            <div className="rail">
              {whatsNew.map((w, i) => (
                <a key={i} href={w.href} target={w.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="rail-card">
                  <span className="rail-thumb" aria-hidden>
                    {w.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={w.img} alt="" />
                    ) : (
                      <Icon name="book" size={22} />
                    )}
                  </span>
                  <span className="rail-body">
                    <span className="when">{w.when}</span>
                    <span className="rt">{w.title.length > 74 ? w.title.slice(0, 72) + "…" : w.title}</span>
                    <span className="rd">{w.note}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 9 · CONNECT (official channels) ============
          Channel cards, deliberately not a social feed: we neither mirror posts
          (nothing to fabricate, nothing to keep in sync) nor auto-load third-party
          embeds, which CLAUDE.md §8 bars. Handles/URLs are pending confirmation —
          see content/FACTCHECK_QUEUE.md FC-001. */}
      <section className="connect bleed">
        <div className="ux4g-container">
          <div className="connect-head">
            <div>
              <span className="connect-kicker">Follow the conversation</span>
              <h2>Connect with EAC-PM</h2>
              <p>
                Research releases, policy announcements and data updates — published to the
                Council&apos;s official channels as they go live.
              </p>
            </div>
            <div className="connect-actions">
              <Link href="/media" className="ux4g-btn ux4g-btn-md btn-ondark">
                <Icon name="rss" size={16} /> Newsroom
              </Link>
              <Link href="/contact" className="ux4g-btn-primary ux4g-btn-md">
                <Icon name="mail" size={16} /> Contact the Council
              </Link>
            </div>
          </div>

          <ul className="connect-grid">
            {channels.map((c) => (
              <li key={c.key}>
                <div className="connect-card">
                  <div className="cc-top">
                    <span className="cc-badge" aria-hidden>
                      <BrandIcon name={c.key} size={20} />
                    </span>
                    <div className="cc-id">
                      <span className="cc-name">{c.name}</span>
                      <span className="cc-platform">{c.handle ?? `on ${c.platform}`}</span>
                    </div>
                  </div>
                  <p className="cc-blurb">{c.blurb}</p>
                  <div className="cc-foot">
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="cc-cta">
                        {c.cta} <Icon name="external" size={14} />
                      </a>
                    ) : (
                      <span className="flag-inline">
                        <span className="d" aria-hidden /> Official handle pending confirmation
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 10 · AFFILIATION ============ */}
      <section className="affil bleed">
        <div className="ux4g-container">
          <div className="affil-lead">
            <span className="k">Part of the Government of India</span>
          </div>
          <div className="affil-logos">
            {affiliations.map((a) => (
              <a
                key={a.alt}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={a.wordmark ? undefined : a.alt}
                className={a.wordmark ? "affil-lockup" : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.src} alt={a.wordmark ? "" : a.alt} aria-hidden={a.wordmark ? true : undefined} loading="lazy" />
                {a.wordmark && (
                  <span className="affil-lockup-text">
                    <span className="t1">{a.wordmark.top}</span>
                    <span className="t2">{a.wordmark.bottom}</span>
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
