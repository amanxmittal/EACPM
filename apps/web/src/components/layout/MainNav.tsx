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
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <div className={s.mainbar}>
      <div className={`container ${s.mainInner}`}>
        <Link href="/" className={s.brand} aria-label="EAC-PM home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.png" alt="" className={s.brandMark} width={24} height={40} />
          <span className={s.brandText}>
            <span className={s.brandTitle}>EAC&#8288;-&#8288;PM</span>
            <span className={s.brandSub}>Economic Advisory Council to the PM</span>
          </span>
        </Link>

        <nav className={s.nav} aria-label="Primary">
          {primaryNav.map((item) => (
            <div key={item.label} className={s.navItem}>
              <Link href={item.href} className={s.navLink}>
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

        <div className={s.actions}>
          <button
            className={s.iconBtn}
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Icon name={searchOpen ? "close" : "search"} size={20} />
          </button>
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

      {searchOpen && (
        <div className={s.searchWrap}>
          <form className={`container ${s.searchInner}`} action="/publications">
            <Icon name="search" size={22} />
            <input
              className={s.searchInput}
              name="q"
              type="search"
              autoFocus
              placeholder="Search 71 papers, data & the India story…"
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
              <Link href={item.href} className={s.drawerLink}>
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
