"use client";
import { useEffect } from "react";
import type { Project } from "@/lib/site";

/** Hero: pełny ekran pod przezroczystym headerem. Jeden kadr z powolnym zoomem, imię, jedna linia. */
export function Hero({ slides }: { slides: Project[] }) {
  const cover = slides[0];
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
        {cover && <img alt="" className="on" src={cover.hero!.src} fetchPriority="high" />}
        <div className="hc-shade" />
      </div>
      <div className="hc-ui shell">
        <div className="hc-text">
          <h1 className="hc-title">Design Management</h1>
          <p className="hc-lede">Prowadzę realizacje wnętrz w inwestycjach mieszkaniowych i hotelowych: zakres, budżet, akceptacje materiałowe, negocjacje z dostawcami, odbiory. Dla deweloperów, którzy chcą, żeby obietnica produktu przetrwała spotkanie z budżetem.</p>
        </div>
      </div>
    </section>
  );
}
