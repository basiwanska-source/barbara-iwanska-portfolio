"use client";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import type { Project } from "@/lib/site";

/**
 * Hero: pełny ekran, jeden kadr. Lista projektów po lewej — najechanie (na dotyku: tap)
 * podmienia tło z crossfade i lekkim zoomem, klik prowadzi do sekcji. Zwykły scroll.
 */
export function Hero({ slides }: { slides: Project[] }) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const el = list.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = animate(el.children, { opacity: [0, 1], translateY: [18, 0], duration: 800, delay: stagger(70, { start: 250 }), ease: "outExpo" });
    return () => {
      a.revert();
    };
  }, []);
  const cur = slides[active];
  return (
    <section className="hv" id="top">
      <div className="hv-stage" aria-hidden>
        {slides.map((p, i) => (
          <img alt="" className={i === active ? "on" : ""} key={p.slug} src={p.hero!.src} fetchPriority={i === 0 ? "high" : "low"} />
        ))}
        <div className="hv-shade" />
      </div>
      <div className="hv-ui shell">
        <div className="hv-head">
          <span className="hv-label">Barbara Iwańska · Design Management</span>
          <span className="hv-label">Portfolio 2026</span>
        </div>
        <div className="hv-body">
          <ul className="hv-list" ref={list} onMouseLeave={() => undefined}>
            {slides.map((p, i) => (
              <li key={p.slug} className={i === active ? "on" : ""}>
                <a href={`#${p.slug}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onTouchStart={() => setActive(i)}>
                  <span className="hv-no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="hv-name">{p.title.split(" · ")[0]}</span>
                  <span className="hv-sub">{p.title.split(" · ")[1] ?? p.employer}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="hv-side" key={cur.slug}>
            <span className="hv-label">{cur.employer} · {cur.period}</span>
            <p className="hv-caption">{cur.hero?.alt}</p>
            {cur.meta[0] ? <p className="hv-meta">{cur.meta.slice(0, 2).join(" · ")}</p> : null}
          </div>
        </div>
        <div className="hv-foot">
          <p className="hv-lede">Realizacje wnętrz w inwestycjach mieszkaniowych i hotelowych — od zakresu i budżetu, przez akceptacje materiałowe, po odbiory.</p>
          <a className="s-btn s-btn-onimage" href="#kadry">Kadry</a>
        </div>
      </div>
    </section>
  );
}
