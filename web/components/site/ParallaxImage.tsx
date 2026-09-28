"use client";
import { useEffect, useRef } from "react";
import type { Img } from "@/lib/site";

/**
 * Kadr z paralaksą: zdjęcie przesuwa się wolniej niż strona.
 * Ramka trzyma proporcje oryginału, więc wysokość bloku się nie zmienia,
 * a zdjęcie jest od niej wyższe o 9% z góry i z dołu — tyle wynosi zapas
 * na ruch. Maksymalne przesunięcie to 8% wysokości, więc krawędź nigdy
 * się nie odsłania.
 */
export function ParallaxImage({ im, sila = 0.08 }: { im: Img; sila?: number }) {
  const ramka = useRef<HTMLDivElement>(null);
  const obraz = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ramka.current;
    const o = obraz.current;
    if (!r || !o) return;

    let widoczny = false;
    let klatka = 0;

    const przesun = () => {
      klatka = 0;
      const box = r.getBoundingClientRect();
      const zakres = (window.innerHeight + box.height) / 2;
      const postep = (box.top + box.height / 2 - window.innerHeight / 2) / zakres;
      const y = -Math.max(-1, Math.min(1, postep)) * sila * box.height;
      o.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };
    const naScroll = () => {
      if (widoczny && !klatka) klatka = requestAnimationFrame(przesun);
    };

    const io = new IntersectionObserver(
      ([w]) => {
        widoczny = w.isIntersecting;
        if (widoczny) przesun();
      },
      { rootMargin: "120px 0px" },
    );
    io.observe(r);
    window.addEventListener("scroll", naScroll, { passive: true });
    window.addEventListener("resize", naScroll);
    przesun();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", naScroll);
      window.removeEventListener("resize", naScroll);
      if (klatka) cancelAnimationFrame(klatka);
    };
  }, [sila]);

  return (
    <div className="paralaksa" ref={ramka} style={im.w && im.h ? { aspectRatio: `${im.w} / ${im.h}` } : undefined}>
      <img alt={im.alt} decoding="async" loading="lazy" ref={obraz} src={im.src} />
    </div>
  );
}
