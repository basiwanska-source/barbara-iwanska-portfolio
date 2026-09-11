"use client";
import { useEffect, useRef, useState } from "react";
import { animate, stagger, text } from "animejs";
import type { Project } from "@/lib/site";

/**
 * Hero sterowane scrollem (sticky 280vh): kadry projektów odsłaniają się kurtyną z góry
 * w miarę przewijania, tytuł wjeżdża znak po znaku, obraz reaguje na kursor paralaksą.
 * Bez autoslidera i strzałek — postęp = pozycja scrolla.
 */
export function Hero({ slides }: { slides: Project[] }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const [idx, setIdx] = useState(0);
  const [prog, setProg] = useState(0);
  const n = slides.length;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
        setProg(p);
        setIdx(Math.min(n - 1, Math.floor(p * n)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [n]);

  useEffect(() => {
    const h = title.current;
    if (!h || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { chars } = text.split(h, { chars: { wrap: "clip" }, words: true });
    const a = animate(chars, { y: ["1.05em", "0em"], opacity: [0, 1], duration: 1000, delay: stagger(18, { start: 200 }), ease: "outExpo" });
    return () => {
      a.revert();
    };
  }, []);

  useEffect(() => {
    const st = stage.current;
    if (!st || window.matchMedia("(hover: none)").matches) return;
    const imgs = Array.from(st.querySelectorAll<HTMLImageElement>("img"));
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      animate(imgs, { translateX: -x * 14, translateY: -y * 10, duration: 900, ease: "outQuint" });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const cur = slides[idx];
  return (
    <section className="hs" id="top" ref={root}>
      <div className="hs-sticky">
        <div className="hs-stage" ref={stage}>
          {slides.map((p, i) => (
            <div className={`hs-slide${i <= idx ? " on" : ""}`} key={p.slug} style={{ zIndex: i }}>
              <img alt={p.hero?.alt ?? p.title} src={p.hero!.src} fetchPriority={i === 0 ? "high" : "low"} />
            </div>
          ))}
          <div className="hs-shade" />
        </div>
        <div className="hs-ui shell">
          <div className="hs-top">
            <span className="hs-label">Design Management · Portfolio 2026</span>
            <span className="hs-label">Warszawa · Gdańsk · Kołobrzeg</span>
          </div>
          <h1 className="hs-title" ref={title}>Barbara Iwańska</h1>
          <div className="hs-bottom">
            <div className="hs-project" key={cur.slug}>
              <span className="hs-no">{String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
              <a href={`#${cur.slug}`} className="hs-name">{cur.title}</a>
              <span className="hs-meta">{cur.employer} · {cur.period}</span>
            </div>
            <div className="hs-right">
              <p className="hs-lede">Realizacje wnętrz w inwestycjach mieszkaniowych i hotelowych — od zakresu i budżetu po odbiory.</p>
              <div className="hs-bar" aria-hidden><span style={{ transform: `scaleX(${prog})` }} /></div>
              <span className="hs-scroll">Przewiń</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
