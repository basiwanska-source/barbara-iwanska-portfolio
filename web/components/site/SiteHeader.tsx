"use client";
import Link from "next/link";
import { Search } from "./Search";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Projekty", href: "/#golden-tulip" },
  { label: "O mnie", href: "/#o-mnie" },
  { label: "Kontakt", href: "/#kontakt" },
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
          <a className="hdr-talk" href="mailto:bas.iwanska@gmail.com">Let&rsquo;s talk!</a>
          <Link className="site-logo" href="/">Barbara Iwańska</Link>
          <div className="hdr-end">
            <nav className="hdr-nav">
              {NAV.map((n) => (
                <a href={n.href} key={n.href}>
                  <span className="roll-clip">
                    <span className="roll-track">
                      <span className="roll-label">{n.label}</span>
                      <span aria-hidden="true" className="roll-label-dupe">{n.label}</span>
                    </span>
                  </span>
                </a>
              ))}
            </nav>
            <Search />
            <button aria-label="Menu" className="icon-btn hamburger-wrap" onClick={() => setMenuOpen((v) => !v)} type="button">
              <span className="hamburger"><span /><span /><span /></span>
            </button>
          </div>
        </div>
      </header>
      <nav className="nav-mobile">
        <ul>{NAV.map((n) => <li key={n.href}><a href={n.href} onClick={() => setMenuOpen(false)}>{n.label}</a></li>)}</ul>
      </nav>
    </>
  );
}
