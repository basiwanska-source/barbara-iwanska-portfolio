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

  // Przeciąganie kursorem: karuzela nie przyjmuje gestu przewijania (oddaje go
  // stronie), więc kadry przesuwa się chwytając zdjęcie. Ustawiamy pozycję
  // wprost, co działa nawet przy zablokowanym przewijaniu poziomym.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let ciagne = false;
    let odX = 0;
    let odScroll = 0;
    let klatka = 0;

    const wdol = (e: PointerEvent) => {
      if (e.button !== 0) return;
      ciagne = true;
      odX = e.clientX;
      odScroll = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
      track.classList.add("ciagnie");
    };
    const wruchu = (e: PointerEvent) => {
      if (!ciagne) return;
      track.scrollLeft = odScroll - (e.clientX - odX);
      if (!klatka) klatka = requestAnimationFrame(() => { klatka = 0; sync(); });
    };
    const koniec = (e: PointerEvent) => {
      if (!ciagne) return;
      ciagne = false;
      if (track.hasPointerCapture?.(e.pointerId)) track.releasePointerCapture(e.pointerId);
      track.classList.remove("ciagnie");
      sync();
    };

    track.addEventListener("pointerdown", wdol);
    track.addEventListener("pointermove", wruchu);
    track.addEventListener("pointerup", koniec);
    track.addEventListener("pointercancel", koniec);
    return () => {
      track.removeEventListener("pointerdown", wdol);
      track.removeEventListener("pointermove", wruchu);
      track.removeEventListener("pointerup", koniec);
      track.removeEventListener("pointercancel", koniec);
      if (klatka) cancelAnimationFrame(klatka);
    };
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
