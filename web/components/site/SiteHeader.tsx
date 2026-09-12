"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Kadry", href: "/#kadry" },
  { label: "Projekty", href: "/#golden-tulip" },
  { label: "O mnie", href: "/#o-mnie" },
  { label: "Fazy", href: "/#fazy" },
  { label: "Kontakt", href: "#kontakt" },
];

/** Header: jeden wiersz, fixed. Przezroczysty nad hero (biały tekst), po zjechaniu poniżej hero — biały z kreską. Bez chowania przy scrollu. */
export function SiteHeader({ solidAlways }: { solidAlways?: boolean } = {}) {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("#top");
    const onScroll = () => setSolid(window.scrollY > (hero ? hero.offsetHeight - 72 : 80));
    onScroll();
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
      <header className={`hdr${solid || menuOpen || solidAlways ? " solid" : ""}`}>
        <div className="shell hdr-row">
          <Link className="site-logo" href="/">Barbara Iwańska</Link>
          <nav className="hdr-nav">
            {NAV.map((n) => <a href={n.href} key={n.href}>{n.label}<span className="slider" /></a>)}
          </nav>
          <button aria-label="Menu" className="icon-btn hamburger-wrap" onClick={() => setMenuOpen((v) => !v)} type="button">
            <span className="hamburger"><span /><span /><span /></span>
          </button>
        </div>
      </header>
      <nav className="nav-mobile">
        <ul>{NAV.map((n) => <li key={n.href}><a href={n.href} onClick={() => setMenuOpen(false)}>{n.label}</a></li>)}</ul>
      </nav>
    </>
  );
}
