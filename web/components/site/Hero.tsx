"use client";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/site";

/** Hero: pełny ekran pod przezroczystym headerem. Kadr z powolnym zoomem, imię, jedna linia, pasek miniatur projektów (hover podmienia kadr, klik → sekcja). */
export function Hero({ slides }: { slides: Project[] }) {
  const [active, setActive] = useState(0);
  // Wysokość hero przypięta w px przy załadowaniu: chowanie paska przeglądarki na mobile
  // zmienia 100vh, a my nie chcemy, żeby kadr zmieniał rozmiar pod palcem. Aktualizacja
  // tylko gdy zmieni się szerokość (obrót ekranu), nie wysokość.
  useEffect(() => {
    let w = window.innerWidth;
    const pin = () => document.documentElement.style.setProperty("--hero-h", `${window.innerHeight}px`);
    pin();
    const onResize = () => {
      if (window.innerWidth !== w) {
        w = window.innerWidth;
        pin();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <section className="hc" id="top">
      <div className="hc-stage" aria-hidden>
        {slides.map((p, i) => (
          <img alt="" className={i === active ? "on" : ""} key={p.slug} src={p.hero!.src} fetchPriority={i === 0 ? "high" : "low"} />
        ))}
        <div className="hc-shade" />
      </div>
      <div className="hc-ui shell">
        <div className="hc-text">
          <span className="hc-kicker">Barbara Iwańska · Warszawa · Portfolio 2026</span>
          <h1 className="hc-title">Design Management</h1>
          <p className="hc-lede">Prowadzę realizacje wnętrz w inwestycjach mieszkaniowych i hotelowych: zakres, budżet, akceptacje materiałowe, negocjacje z dostawcami, odbiory. Dla deweloperów, którzy chcą, żeby obietnica produktu przetrwała spotkanie z budżetem.</p>
        </div>
        <div className="hc-proof"><span className="hc-kicker">Wybrane realizacje</span><ul className="hc-thumbs">
          {slides.map((p, i) => (
            <li key={p.slug} className={i === active ? "on" : ""}>
              <a href={`#${p.slug}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                <img alt="" loading="lazy" src={p.hero!.src} />
                <span><b>{String(i + 1).padStart(2, "0")}</b>{p.title.split(" · ")[0]}</span>
              </a>
            </li>
          ))}
        </ul></div>
      </div>
    </section>
  );
}
