"use client";
import { useEffect, useRef, useState } from "react";
import type { Img } from "@/lib/site";

/** Hero: pełny ekran pod przezroczystym headerem. Jeden kadr z powolnym zoomem, imię, jedna linia. */
/** Co ile kadr ustepuje nastepnemu. */
const TAKT = 4000;

export function Hero({ slides }: { slides: Img[] }) {
  const kadry = slides;
  const [biezacy, setBiezacy] = useState(0);
  // Wysokość hero przypięta w px przy załadowaniu: chowanie paska przeglądarki na mobile
  // zmienia 100vh, a my nie chcemy, żeby kadr zmieniał rozmiar pod palcem. Aktualizacja
  // tylko gdy zmieni się szerokość (obrót ekranu), nie wysokość.
  // Paralaksa: kadr przesuwa się wolniej niż strona. Ruch trzyma osobna warstwa,
  // bo samo zdjęcie ma już animację przybliżenia i transformacje by się gryzły.
  const warstwa = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = warstwa.current;
    if (!el) return;
    let klatka = 0;
    const przesun = () => {
      klatka = 0;
      const wysokosc = el.parentElement?.offsetHeight ?? window.innerHeight;
      const y = Math.min(Math.max(window.scrollY, 0), wysokosc) * 0.15;
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };
    const naScroll = () => {
      if (!klatka) klatka = requestAnimationFrame(przesun);
    };
    przesun();
    window.addEventListener("scroll", naScroll, { passive: true });
    window.addEventListener("resize", naScroll);
    return () => {
      window.removeEventListener("scroll", naScroll);
      window.removeEventListener("resize", naScroll);
      if (klatka) cancelAnimationFrame(klatka);
    };
  }, []);

  // Pokaz kadrow: co TAKT nastepny przejmuje miejsce, przenikajac przez
  // poprzedni. Przy zwinietej karcie przegladarki licznik stoi — inaczej po
  // powrocie strona nadrabialaby wszystkie zalegle przejscia naraz.
  useEffect(() => {
    if (kadry.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let zegar = 0;
    const start = () => {
      if (!zegar) zegar = window.setInterval(() => setBiezacy((n) => (n + 1) % kadry.length), TAKT);
    };
    const stop = () => {
      if (zegar) window.clearInterval(zegar);
      zegar = 0;
    };
    const widocznosc = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener("visibilitychange", widocznosc);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", widocznosc);
    };
  }, [kadry.length]);

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
        <div className="hc-parallax" ref={warstwa}>
          {kadry.map((im, i) => (
            <img
              alt=""
              className={i === biezacy ? "on" : ""}
              fetchPriority={i === 0 ? "high" : "low"}
              key={im.src}
              src={im.src}
            />
          ))}
        </div>
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
