"use client";
import { useEffect, useRef } from "react";

/** Bok kafla ziarna. Szum nie ma struktury, wiec powtorzenie kafla jest
 *  dla oka niewidoczne — a pozwala rysowac ulamek powierzchni hero. */
const KAFEL = 256;
/** Ile roznych klatek ziarna wygenerowac. Przy 24 kl./s osiem klatek
 *  w losowej kolejnosci nie daje sie odroznic od szumu liczonego na biezaco,
 *  a kosztuje jedno wypelnienie zamiast miliona losowan na klatke. */
const KLATEK = 8;

type Props = {
  /** Bok pojedynczego ziarna w pikselach. 1 = najdrobniejsze. */
  ziarno?: number;
  /** Ile razy na sekunde ziarno ma sie przetasowac. */
  klatki?: number;
  /** Krycie warstwy ziarna. */
  moc?: number;
};

/**
 * Ziarno na obrazie — odpowiednik komponentu „Noiser" z Framera, ktory liczy
 * szum w shaderze WebGL. Tu to samo na zwyklym plotnie: monochromatyczny szum
 * o zadanym boku ziarna, przetasowywany z zadana czestotliwoscia.
 *
 * Framerowy oryginal losuje wartosc dla kazdego piksela w kazdej klatce.
 * Przy hero 1440 x 900 to 1,3 mln losowan 24 razy na sekunde — w JavaScripcie
 * nie do udzwigniecia. Zamiast tego generujemy osiem kafli raz i cyklujemy je
 * w losowej kolejnosci, przesuwajac przy kazdej klatce punkt zaczepienia.
 * Efekt jest nieodroznialny, koszt na klatke to jedno wypelnienie prostokata.
 */
export function Noise({ ziarno = 1, klatki = 24, moc = 0.22 }: Props = {}) {
  const plotno = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = plotno.current;
    if (!el) return;
    const ctx = el.getContext("2d", { alpha: true });
    if (!ctx) return;

    const bok = Math.max(1, Math.round(ziarno));
    // Kafle powstaja raz, przy montowaniu.
    const wzory = Array.from({ length: KLATEK }, () => {
      const maly = document.createElement("canvas");
      maly.width = Math.ceil(KAFEL / bok);
      maly.height = Math.ceil(KAFEL / bok);
      const mc = maly.getContext("2d");
      if (!mc) return null;
      const dane = mc.createImageData(maly.width, maly.height);
      for (let i = 0; i < dane.data.length; i += 4) {
        // Czern o losowym kryciu — tak samo jak w ich shaderze, gdzie
        // kolor to vec4(mono.rgb, mono.a * n).
        dane.data[i + 3] = Math.random() * 255;
      }
      mc.putImageData(dane, 0, 0);
      if (bok === 1) return ctx.createPattern(maly, "repeat");
      // Przy grubszym ziarnie kafel powstaje mniejszy i jest skalowany
      // bez wygladzania, zeby piksel zostal pikselem.
      const duzy = document.createElement("canvas");
      duzy.width = KAFEL;
      duzy.height = KAFEL;
      const dc = duzy.getContext("2d");
      if (!dc) return null;
      dc.imageSmoothingEnabled = false;
      dc.drawImage(maly, 0, 0, KAFEL, KAFEL);
      return ctx.createPattern(duzy, "repeat");
    }).filter(Boolean) as CanvasPattern[];
    if (!wzory.length) return;

    // Plotno w gestosci ekranu: na ekranie Retina jedno ziarno zajmuje pol
    // piksela CSS, czyli jest dwa razy drobniejsze niz przy skali 1:1.
    // Wiecej niz 2 nie ma sensu — ziarno przestaje byc widoczne, a kosztuje.
    const gestosc = Math.min(2, window.devicePixelRatio || 1);
    const dopasuj = () => {
      const r = el.getBoundingClientRect();
      el.width = Math.max(1, Math.round(r.width * gestosc));
      el.height = Math.max(1, Math.round(r.height * gestosc));
    };
    dopasuj();

    const rysuj = () => {
      const wzor = wzory[Math.floor(Math.random() * wzory.length)];
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, el.width, el.height);
      // Przesuniecie punktu zaczepienia przy kazdej klatce zaciera szew kafla.
      ctx.setTransform(1, 0, 0, 1, -Math.random() * KAFEL, -Math.random() * KAFEL);
      ctx.fillStyle = wzor;
      ctx.fillRect(0, 0, el.width + KAFEL, el.height + KAFEL);
    };

    const spokojnie = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (spokojnie) {
      rysuj();
      window.addEventListener("resize", () => { dopasuj(); rysuj(); });
      return;
    }

    let ramka = 0;
    let ostatnia = 0;
    let widoczne = true;
    const odstep = 1000 / Math.max(1, klatki);
    const petla = (czas: number) => {
      ramka = requestAnimationFrame(petla);
      if (!widoczne || czas - ostatnia < odstep) return;
      ostatnia = czas;
      rysuj();
    };
    ramka = requestAnimationFrame(petla);

    // Poza kadrem ziarno stoi — nie ma sensu przerysowywac go 24 razy
    // na sekunde, gdy nikt na nie nie patrzy.
    const obserwator = new IntersectionObserver(([w]) => { widoczne = w.isIntersecting; });
    obserwator.observe(el);

    const naZmianie = () => { dopasuj(); ostatnia = 0; };
    window.addEventListener("resize", naZmianie);
    return () => {
      cancelAnimationFrame(ramka);
      obserwator.disconnect();
      window.removeEventListener("resize", naZmianie);
    };
  }, [ziarno, klatki, moc]);

  return <canvas aria-hidden="true" className="ziarno" ref={plotno} style={{ opacity: moc }} />;
}
