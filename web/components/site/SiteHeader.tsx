"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { label: "O mnie", href: "#o-mnie" },
  { label: "Projekty", href: "#projekty" },
  { label: "Fazy", href: "#fazy" },
  { label: "Broszura", href: "/broszura" },
  { label: "Kontakt", href: "#kontakt" },
];

/** Header wg malki-nextjs: logo z trackingiem, nav zwijany przy scrollu w dół, hamburger na mobile. */
export function SiteHeader() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      const el = ref.current;
      if (el && !el.classList.contains("compact")) document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 4);
      if (y > lastY && y > 180) setCompact(true);
      else if (y < lastY - 2 || y < 80) setCompact(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header className={["site-header", scrolled ? "scrolled" : null, compact && !menuOpen ? "compact" : null].filter(Boolean).join(" ")} ref={ref}>
        <div className="shell">
          <div className="header-top">
            <Link className="site-logo" href="/">Barbara Iwańska</Link>
            <div className="header-icons">
              <button aria-label="Menu" className="icon-btn hamburger-wrap" onClick={() => setMenuOpen((v) => !v)} type="button">
                <span className="hamburger"><span /><span /><span /></span>
              </button>
            </div>
          </div>
          <div className="nav-wrap">
            <nav className="nav-desktop">
              {NAV.map((n) => (
                <div className="nav-item" key={n.href}><a href={n.href}>{n.label}<span className="slider" /></a></div>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <nav className="nav-mobile">
        <ul>{NAV.map((n) => <li key={n.href}><a href={n.href} onClick={() => setMenuOpen(false)}>{n.label}</a></li>)}</ul>
      </nav>
    </>
  );
}
