"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { FlagIndia } from "@/components/ui/FlagIndia";
import s from "./header.module.css";

const MIN = 0.9;
const MAX = 1.4;
const STEP = 0.1;

export function TopBar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [contrast, setContrast] = useState(false);
  const [scale, setScale] = useState(1);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const langBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const d = document.documentElement;
    setTheme((d.getAttribute("data-theme") as "light" | "dark") || "light");
    setContrast(d.classList.contains("contrast-more"));
    setScale(parseFloat(getComputedStyle(d).getPropertyValue("--app-font-scale")) || 1);
    setLang((d.getAttribute("lang") as "en" | "hi") || "en");
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setLangOpen(false);
      langBtnRef.current?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [langOpen]);

  function applyScale(next: number) {
    const v = Math.min(MAX, Math.max(MIN, Math.round(next * 10) / 10));
    document.documentElement.style.setProperty("--app-font-scale", String(v));
    localStorage.setItem("eac-font-scale", String(v));
    setScale(v);
  }
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("eac-theme", next);
    setTheme(next);
  }
  function toggleContrast() {
    const next = !contrast;
    document.documentElement.classList.toggle("contrast-more", next);
    localStorage.setItem("eac-contrast", next ? "1" : "0");
    setContrast(next);
  }
  // MVP: switches the document language only — Hindi content ships via Bhashini + human review later.
  function selectLang(next: "en" | "hi") {
    document.documentElement.setAttribute("lang", next);
    setLang(next);
    setLangOpen(false);
    langBtnRef.current?.focus();
  }

  return (
    <div className={`ux4g-topbar ux4g-topbar-wide ${s.topbar}`}>
      <div className="ux4g-container-fluid">
        <div className={`ux4g-topbar__wrap ux4g-d-flex ux4g-jc-between ux4g-ai-center ${s.topbarWrap}`}>
          <a
            aria-label="Government of India (opens in new tab)"
            className={`ux4g-d-flex ux4g-ai-center ${s.gov}`}
            href="https://www.india.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FlagIndia width={22} />
            <span className="ux4g-label-m-default">Government of India</span>
            <Icon name="external" size={12} />
          </a>

          <nav aria-label="Top utilities" className={`ux4g-d-flex ux4g-ai-center ${s.controls}`}>
            {/* The site's only skip link (layout.tsx no longer renders one). Kept
                permanently visible per the UX4G bar, rather than hidden until focus. */}
            <a className={`ux4g-topbar__skip ${s.skip}`} href="#main-content">
              Skip to Main Content
            </a>

            <span className={`ux4g-bl ${s.sep} ${s.a11yFull}`} aria-hidden />

            <div
              aria-label="Text size controls"
              role="group"
              className={`ux4g-topbar__group ux4g-ai-center ${s.ctrlGroup} ${s.a11yFull}`}
            >
              <button
                type="button"
                aria-label="Decrease text size"
                className={`ux4g-topbar__iconbtn ${s.ctrl}`}
                onClick={() => applyScale(scale - STEP)}
                disabled={scale <= MIN}
              >
                A<Icon name="minus" size={12} />
              </button>
              <button
                type="button"
                aria-label="Reset text size"
                className={`ux4g-topbar__iconbtn ${s.ctrl}`}
                onClick={() => applyScale(1)}
              >
                A
              </button>
              <button
                type="button"
                aria-label="Increase text size"
                className={`ux4g-topbar__iconbtn ${s.ctrl}`}
                onClick={() => applyScale(scale + STEP)}
                disabled={scale >= MAX}
              >
                A<Icon name="plus" size={12} />
              </button>
            </div>

            <span className={`ux4g-bl ${s.sep} ${s.a11yFull}`} aria-hidden />

            <button
              type="button"
              aria-label="Toggle high contrast"
              aria-pressed={contrast}
              className={`ux4g-topbar__iconbtn ${s.ctrl} ${s.a11yFull}`}
              onClick={toggleContrast}
            >
              <Icon name="contrast" size={16} />
              <span className={s.hideSm}>Contrast</span>
            </button>

            <button
              type="button"
              aria-label="Toggle dark mode"
              aria-pressed={theme === "dark"}
              className={`ux4g-topbar__iconbtn ${s.ctrl}`}
              onClick={toggleTheme}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
              <span className={s.hideSm}>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>

            <span className={`ux4g-bl ${s.sep} ${s.a11yFull}`} aria-hidden />

            <div ref={langRef} className={`ux4g-topbar__select ${s.langSelect}`}>
              <button
                ref={langBtnRef}
                type="button"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label="Select language"
                className={`ux4g-topbar__selectbtn ${s.ctrl}`}
                onClick={() => setLangOpen((v) => !v)}
              >
                <Icon name="globe" size={16} />
                <span>{lang === "en" ? "English" : "हिंदी"}</span>
                <Icon name="chevronDown" size={13} />
              </button>
              {langOpen && (
                <ul className={s.langList} role="listbox" aria-label="Language">
                  {(["en", "hi"] as const).map((code) => (
                    <li key={code} role="option" aria-selected={lang === code}>
                      <button type="button" className={s.langOption} onClick={() => selectLang(code)}>
                        {code === "en" ? "English" : "हिंदी"}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Screen Reader Access lives in the footer's Policies & Compliance column
                (policies.ts → screen-reader-access), not here. */}
          </nav>
        </div>
      </div>
    </div>
  );
}
