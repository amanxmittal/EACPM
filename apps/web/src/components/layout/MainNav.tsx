"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { primaryNav } from "@/content/nav";
import s from "./header.module.css";

export function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [floating, setFloating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Full-bleed at rest; detaches into a floating pill once the page scrolls.
  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 8);
    onScroll(); // sync on mount (covers restored scroll positions)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Top-level section match only (not individual dropdown/hash children — too fragile
  // and would light up several links at once for what's really one page).
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className={s.mainbar} data-floating={floating}>
      {/* Tier 1 — brand + utility icons */}
      <div className={`container ${s.topRow}`}>
        <Link href="/" className={s.brand} aria-label="EAC-PM home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.png" alt="" className={`${s.brandMark} emblem-adapt`} width={24} height={40} />
          <span className={s.brandText}>
            <span className={s.brandTitle}>EAC&#8288;-&#8288;PM</span>
            <span className={s.brandSub}>Economic Advisory Council to the PM</span>
          </span>
        </Link>

        <div className={s.actions}>
          <button
            className={s.iconBtn}
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Icon name={searchOpen ? "close" : "search"} size={20} />
          </button>
          <Link href="/contact" className={`btn btn-primary ${s.contactCta}`} aria-current={isActive("/contact") ? "page" : undefined}>
            Contact Us
          </Link>
          <button
            className={`${s.iconBtn} ${s.menuBtn}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Tier 2 — primary nav */}
      <div className={s.navRow}>
        <div className="container">
          <nav className={s.nav} aria-label="Primary">
            {/* Contact Us is promoted to a CTA button in the actions row instead. */}
            {primaryNav.filter((item) => item.href !== "/contact").map((item) => (
              <div key={item.label} className={s.navItem}>
                <Link href={item.href} className={s.navLink} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                  {item.children && <Icon name="chevronDown" size={15} />}
                </Link>
                {item.children && (
                  <div className={s.dropdown} role="menu">
                    {item.children.map((c) => (
                      <Link key={c.label} href={c.href} className={s.ddLink} role="menuitem">
                        <span className={s.ddTitle}>{c.label}</span>
                        {c.desc && <span className={s.ddDesc}>{c.desc}</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {searchOpen && (
        <div className={s.searchWrap}>
          <form className={`container ${s.searchInner}`} action="/publications">
            <Icon name="search" size={22} />
            <input
              className={s.searchInput}
              name="q"
              type="search"
              autoFocus
              placeholder="Search papers, notices, data…"
              aria-label="Search the site"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className={`container ${s.drawer}`}>
          {primaryNav.map((item) => (
            <div key={item.label}>
              <Link href={item.href} className={s.drawerLink} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
              {item.children && (
                <div className={s.drawerSub}>
                  {item.children.map((c) => (
                    <Link key={c.label} href={c.href}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
