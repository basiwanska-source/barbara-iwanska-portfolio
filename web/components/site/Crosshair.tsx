"use client";
import { useEffect, useRef } from "react";

/**
 * Celownik za abhishekjha.me: dwie cienkie linie przez cały ekran, spotykające
 * się w miejscu kursora, ze znakiem + na przecięciu. Systemowy kursor zostaje
 * widoczny — dzięki temu nie znikają podpowiedzi w rodzaju „łapki" nad karuzelą.
 */
export function Crosshair() {
  const pion = useRef<HTMLDivElement>(null);
  const poziom = useRef<HTMLDivElement>(null);
  const plus = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    // Linie trzymają się kursora natychmiast, plusik dogania je z opóźnieniem:
    // przy każdej klatce pokonuje ułamek dzielącej go odległości. Stąd wrażenie
    // miękkiego ciągnięcia zamiast sztywnego skoku.
    const DOGANIANIE = 0.14;
    let celX = -100;
    let celY = -100;
    let plusX = -100;
    let plusY = -100;
    let klatka = 0;

    const rysuj = () => {
      if (pion.current) pion.current.style.transform = `translate3d(${celX}px, 0, 0)`;
      if (poziom.current) poziom.current.style.transform = `translate3d(0, ${celY}px, 0)`;

      plusX += (celX - plusX) * DOGANIANIE;
      plusY += (celY - plusY) * DOGANIANIE;
      if (plus.current) {
        plus.current.style.transform = `translate3d(${plusX}px, ${plusY}px, 0) translate(-50%, -50%)`;
      }

      // Kręcimy pętlę, dopóki plusik nie dojdzie na miejsce; potem zatrzymujemy,
      // żeby nie zajmować przeglądarki bez potrzeby.
      if (Math.abs(celX - plusX) > 0.3 || Math.abs(celY - plusY) > 0.3) {
        klatka = requestAnimationFrame(rysuj);
      } else {
        klatka = 0;
      }
    };
    const ruch = (e: PointerEvent) => {
      celX = e.clientX;
      celY = e.clientY;
      if (!klatka) klatka = requestAnimationFrame(rysuj);
    };

    window.addEventListener("pointermove", ruch, { passive: true });
    return () => {
      window.removeEventListener("pointermove", ruch);
      if (klatka) cancelAnimationFrame(klatka);
    };
  }, []);

  return (
    <div aria-hidden="true" className="celownik">
      <div className="celownik-pion" ref={pion} />
      <div className="celownik-poziom" ref={poziom} />
      <div className="celownik-plus" ref={plus} />
    </div>
  );
}
