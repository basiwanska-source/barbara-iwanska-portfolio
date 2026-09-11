"use client";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/site";

const Arrow = ({ dir }: { dir: "prev" | "next" }) => (
  <svg aria-hidden fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">{dir === "prev" ? <path d="M15 4l-8 8 8 8" /> : <path d="M9 4l8 8-8 8" />}</svg>
);

/** Hero-slider wg malki: biały tekst wersalikami na kadrze, strzałki po bokach, autoprzewijanie. */
export function Hero({ slides }: { slides: Project[] }) {
  const [idx, setIdx] = useState(0);
  const go = (d: number) => setIdx((i) => (i + d + slides.length) % slides.length);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hero" id="top">
      <div className="hero-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {slides.map((p) => (
          <div className="hero-slide p-hero-slide" key={p.slug}>
            <img alt={p.hero?.alt ?? p.title} src={p.hero!.src} />
            <div className="hero-text">
              <p className="subtitle">Design Management · Portfolio 2026</p>
              <h1>{p.title}</h1>
              <p className="meta">
                <span>{p.employer} · {p.period}</span>
                {p.meta[0] ? <span>{p.meta[0]}{p.meta[1] ? ` · ${p.meta[1]}` : ""}</span> : null}
              </p>
              <a className="s-btn s-btn-onimage" href={`#${p.slug}`}>Zobacz projekt</a>
            </div>
          </div>
        ))}
      </div>
      <button aria-label="Poprzedni" className="hero-arrow prev" onClick={() => go(-1)} type="button"><Arrow dir="prev" /></button>
      <button aria-label="Następny" className="hero-arrow next" onClick={() => go(1)} type="button"><Arrow dir="next" /></button>
    </section>
  );
}
