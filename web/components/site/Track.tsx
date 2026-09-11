"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const Chevron = ({ dir }: { dir: "l" | "r" }) => (
  <svg aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">{dir === "l" ? <path d="M15 4l-8 8 8 8" /> : <path d="M9 4l8 8-8 8" />}</svg>
);

/** Karuzela wg malki: scroll-snap track + section-head z licznikiem i strzałkami. `head` = lewa część nagłówka. */
export function Track({ id, head, children, className = "" }: { id?: string; head: ReactNode; children: ReactNode; className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState({ cur: 1, total: 1 });
  const [ends, setEnds] = useState({ start: true, end: false });
  const step = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector(".s-card");
    if (!track || !card) return 0;
    const gap = Number.parseFloat(getComputedStyle(track).gap || "24");
    return card.getBoundingClientRect().width + gap;
  }, []);
  const sync = useCallback(() => {
    const track = trackRef.current;
    const s = step();
    if (!track || !s) return;
    const total = Math.max(1, Math.round((track.scrollWidth - track.clientWidth) / s) + 1);
    const cur = Math.min(total, Math.round(track.scrollLeft / s) + 1);
    setPage({ cur, total });
    setEnds({ start: track.scrollLeft < 10, end: track.scrollLeft > track.scrollWidth - track.clientWidth - 10 });
  }, [step]);
  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);
  const scrollBy = (dir: number) => trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  return (
    <div className={className} id={id}>
      <div className="section-head">
        <div className="sh-left">{head}</div>
        <div className="carousel-nav">
          <button aria-label="Poprzednie" disabled={ends.start} onClick={() => scrollBy(-1)} type="button"><Chevron dir="l" /></button>
          <span>{page.cur} / {page.total}</span>
          <button aria-label="Następne" disabled={ends.end} onClick={() => scrollBy(1)} type="button"><Chevron dir="r" /></button>
        </div>
      </div>
      <div className="carousel">
        <div className="carousel-track" onScroll={sync} ref={trackRef}>{children}</div>
      </div>
    </div>
  );
}
