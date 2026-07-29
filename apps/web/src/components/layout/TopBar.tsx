"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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

  useEffect(() => {
    const d = document.documentElement;
    setTheme((d.getAttribute("data-theme") as "light" | "dark") || "light");
    setContrast(d.classList.contains("contrast-more"));
    setScale(parseFloat(getComputedStyle(d).getPropertyValue("--app-font-scale")) || 1);
    setLang((d.getAttribute("lang") as "en" | "hi") || "en");
  }, []);

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
  function toggleLang() {
    // MVP: visual toggle only — Hindi content ships via Bhashini + human review later.
    const next = lang === "en" ? "hi" : "en";
    document.documentElement.setAttribute("lang", next);
    setLang(next);
  }

  return (
    <div className={s.topbar}>
      <div className={`ux4g-container ${s.topbarInner}`}>
        <div className={s.gov}>
          <FlagIndia width={26} />
          <span>Government of India</span>
        </div>

        <div className={s.controls}>
          <div className={`${s.ctrlGroup} ${s.a11yFull}`} role="group" aria-label="Text size">
            <button className={s.ctrl} onClick={() => applyScale(scale - STEP)} disabled={scale <= MIN} aria-label="Decrease text size">
              A<Icon name="minus" size={12} />
            </button>
            <button className={s.ctrl} onClick={() => applyScale(1)} aria-label="Reset text size">
              A
            </button>
            <button className={s.ctrl} onClick={() => applyScale(scale + STEP)} disabled={scale >= MAX} aria-label="Increase text size">
              A<Icon name="plus" size={12} />
            </button>
          </div>
          <span className={`${s.sep} ${s.a11yFull}`} aria-hidden />
          <button className={`${s.ctrl} ${s.a11yFull}`} onClick={toggleContrast} aria-pressed={contrast} aria-label="Toggle high contrast">
            <Icon name="contrast" size={16} /> <span className={s.hideSm}>Contrast</span>
          </button>
          <button className={s.ctrl} onClick={toggleTheme} aria-pressed={theme === "dark"} aria-label="Toggle dark mode">
            <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
            <span className={s.hideSm}>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <button className={s.ctrl} onClick={toggleLang} aria-label="Switch language" title="Hindi content pending (Bhashini)">
            <Icon name="globe" size={16} /> {lang === "en" ? "EN" : "HI"}
          </button>
          <span className={`${s.sep} ${s.a11yFull}`} aria-hidden />
          <Link className={`${s.ctrl} ${s.hideSm} ${s.a11yFull}`} href="/policies/screen-reader-access">
            Screen Reader
          </Link>
        </div>
      </div>
    </div>
  );
}
