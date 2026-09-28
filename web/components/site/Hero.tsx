"use client";
import { useEffect, useRef, useState } from "react";
import type { Img } from "@/lib/site";
import { Noise } from "./Noise";

/** Hero: pelny ekran pod przezroczystym paskiem, kadry zmieniane przycieciem. */

/** Ile trwa odliczanie do zmiany kadru — tyle wypelnia sie czasomierz. */
const TAKT = 4000;
/** Ile trwa przejazd krawedzi. Musi zgadzac sie z transition na .hc-stage img.on. */
const PRZEJAZD = 1800;

export function Hero({ slides }: { slides: Img[] }) {
  const kadry = slides;
  const [biezacy, setBiezacy] = useState(0);
  // Numer odliczania, nie kadru: czasomierz rusza od nowa dopiero po przejezdzie,
  // wiec nie moze byc kluczowany numerem kadru — ten zmienia sie wczesniej.
  const [odliczanie, setOdliczanie] = useState(0);
  // Dopoki pokaz nie ruszyl, nie ma „poprzedniego" kadru i nie ma czego
  // wjezdzac — pierwszy kadr ma po prostu stac, a nie wjezdzac przy wejsciu
  // na strone.
  const [ruszyl, setRuszyl] = useState(false);
  const poprzedni = ruszyl && kadry.length ? (biezacy - 1 + kadry.length) % kadry.length : -1;
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

  // Pelny cykl ma trzy takty, jak na houseofhoney.com:
  //   1. czasomierz wypelnia sie przez TAKT,
  //   2. po dobiciu do konca stoi na 100% przez caly PRZEJAZD krawedzi,
  //   3. dopiero po przejezdzie wraca do zera i odlicza od nowa.
  // Stad lancuch dwoch timeoutow zamiast jednego setInterval: interwal
  // przestawialby czasomierz w chwili startu przejazdu, czyli o 1,8 s za wczesnie.
  // Przy zwinietej karcie przegladarki cykl stoi — inaczej po powrocie strona
  // nadrabialaby wszystkie zalegle przejscia naraz.
  useEffect(() => {
    if (kadry.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let doZmiany = 0;
    let doPowrotu = 0;
    const stop = () => {
      window.clearTimeout(doZmiany);
      window.clearTimeout(doPowrotu);
      doZmiany = 0;
      doPowrotu = 0;
    };
    const cykl = () => {
      doZmiany = window.setTimeout(() => {
        setRuszyl(true);
        setBiezacy((n) => (n + 1) % kadry.length);
        doPowrotu = window.setTimeout(() => {
          setOdliczanie((n) => n + 1);
          cykl();
        }, PRZEJAZD);
      }, TAKT);
    };
    const start = () => {
      if (!doZmiany && !doPowrotu) {
        setOdliczanie((n) => n + 1);
        cykl();
      }
    };
    const widocznosc = () => (document.hidden ? stop() : start());
    cykl();
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
              /* „on" — kadr wjezdzajacy, odslania sie przycieciem.
                 „pod" — poprzedni, zostaje odslaniety, ale juz bez animacji:
                 to on jest tlem, po ktorym przejezdza krawedz nowego. */
              className={i === biezacy ? (ruszyl ? "on wjazd" : "on") : i === poprzedni ? "pod" : ""}
              fetchPriority={i === 0 ? "high" : "low"}
              key={im.src}
              src={im.src}
            />
          ))}
        </div>
        <div className="hc-shade" />
        {/* Ziarno na obrazie — odpowiednik „Noiser" z Framera. Nad kadrem
            i cieniowaniem, pod tekstem. */}
        <Noise />
        {/* Czasomierz jak na houseofhoney.com: pasek 4 px przy dolnej krawedzi
            hero, wypelniany od lewej przez caly takt. Klucz to numer kadru —
            przy kazdej zmianie React wstawia nowy element, wiec animacja
            rusza od zera i nie rozjezdza sie z licznikiem. */}
        {kadry.length > 1 && (
          <div className="hc-postep">
            <span key={odliczanie} style={{ animationDuration: `${TAKT}ms` }} />
          </div>
        )}
      </div>
      <div className="hc-ui shell">
        <div className="hc-text">
          <h1 className="hc-title">Interior design &amp; management</h1>
          <p className="hc-lede">Prowadzę realizacje wnętrz w inwestycjach mieszkaniowych i hotelowych: zakres, budżet, akceptacje materiałowe, negocjacje z dostawcami, odbiory. Dla deweloperów, którzy chcą, żeby obietnica produktu przetrwała spotkanie z budżetem.</p>
        </div>
      </div>
    </section>
  );
}
