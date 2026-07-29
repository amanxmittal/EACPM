"use client";
import { useEffect, useRef, useState } from "react";
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
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

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

  // Escape closes the search overlay / drawer and returns focus to the control that
  // opened it — otherwise a keyboard user has to Tab back through the whole panel to
  // dismiss it. Bound to the document so it works wherever focus currently sits.
  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (searchOpen) {
        setSearchOpen(false);
        searchBtnRef.current?.focus();
      } else if (menuOpen) {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, searchOpen]);

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
            ref={searchBtnRef}
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
            ref={menuBtnRef}
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
                {/* Deliberately NOT role="menu"/"menuitem": those roles promise
                    application-menu keyboard behaviour (arrow keys, Home/End, typeahead,
                    roving tabindex) that these plain navigation links don't implement, so
                    a screen reader would announce a contract the UI can't honour. The
                    enclosing <nav aria-label="Primary"> already carries the right
                    semantics. See WAI-ARIA Authoring Practices, "Disclosure Navigation". */}
                {item.children && (
                  <div className={s.dropdown}>
                    {item.children.map((c) => (
                      <Link key={c.label} href={c.href} className={s.ddLink}>
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
