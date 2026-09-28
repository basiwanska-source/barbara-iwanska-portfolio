"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Projekty", href: "/#golden-tulip" },
  { label: "O mnie", href: "/#o-mnie" },
  { label: "Kontakt", href: "/#kontakt" },
];

/** Header: jeden wiersz, fixed. Przezroczysty nad hero (biały tekst), po zjechaniu poniżej hero — biały z kreską. Bez chowania przy scrollu. */
export function SiteHeader({ solidAlways }: { solidAlways?: boolean } = {}) {
  const [solid, setSolid] = useState(false);
  const [logoSchowane, setLogoSchowane] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("#top");
    // Logotyp chowa sie przy zjezdzaniu w dol i wraca przy jezdzie w gore.
    // Prog 6 px odsiewa drgania gladzika i odbicie sprezynujace na koncu
    // strony — bez niego napis migalby przy kazdym mikroruchu.
    let ostatniY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > (hero ? hero.offsetHeight - 72 : 80));
      const roznica = y - ostatniY;
      if (Math.abs(roznica) < 6) return;
      // Przy samej gorze napis zostaje widoczny niezaleznie od kierunku.
      setLogoSchowane(y > 120 && roznica > 0);
      ostatniY = y;
    };
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
          <nav className="hdr-nav">
            {NAV.map((n, i) => (
              <a href={n.href} key={n.href}>
                {/* Numer stoi poza roll-clip, wiec przy najechaniu zostaje
                    w miejscu, a przewija sie sama etykieta. aria-hidden,
                    bo czytnik ekranu ma czytac „Projekty", nie „1 Projekty". */}
                <span aria-hidden="true" className="nr">{i + 1}</span>
                <span className="roll-clip">
                  <span className="roll-track">
                    <span className="roll-label">{n.label}</span>
                    <span aria-hidden="true" className="roll-label-dupe">{n.label}</span>
                  </span>
                </span>
              </a>
            ))}
          </nav>
          <div className="hdr-end">
            <a className="hdr-talk" href="mailto:bas.iwanska@gmail.com">Get in touch!</a>
            <button aria-label="Menu" className="icon-btn hamburger-wrap" onClick={() => setMenuOpen((v) => !v)} type="button">
              <span className="hamburger"><span /><span /><span /></span>
            </button>
          </div>
        </div>
      </header>
      {/* Logotyp stoi poza paskiem, bo tryb mieszania „difference" dziala tylko
          wzgledem tla tego kontekstu ukladania, w ktorym element siedzi.
          .hdr jest fixed, wiec tworzy wlasny kontekst — logo w srodku
          mieszaloby sie z pustka, nie z trescia strony. Osobny element
          przypiety do body widzi cala strone pod soba i moze byc negatywem. */}
      <div className={`logo-warstwa${logoSchowane ? " schowane" : ""}`}>
        <Link className="site-logo" href="/">Barbara Iwańska</Link>
      </div>
      <nav className="nav-mobile">
        <ul>{NAV.map((n, i) => <li key={n.href}><a href={n.href} onClick={() => setMenuOpen(false)}><span aria-hidden="true" className="nr">{i + 1}</span>{n.label}</a></li>)}</ul>
      </nav>
    </>
  );
}
