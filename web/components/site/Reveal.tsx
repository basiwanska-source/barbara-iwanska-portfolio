"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { animate, stagger } from "animejs";

type Props = { children: ReactNode; className?: string; delay?: number; y?: number; each?: boolean; as?: "div" | "section" | "li" | "figure" };

/** Wejście przy scrollu: IntersectionObserver odpala anime.js (fade + przesunięcie). `each` animuje bezpośrednie dzieci ze stagger. */
export function Reveal({ children, className, delay = 0, y = 32, each, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = each ? Array.from(el.children) : [el];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    for (const t of targets) {
      (t as HTMLElement).style.opacity = "0";
      (t as HTMLElement).style.transform = `translateY(${y}px)`;
    }
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (done || !entries.some((e) => e.isIntersecting)) return;
        done = true;
        io.disconnect();
        animate(targets, { opacity: [0, 1], translateY: [y, 0], duration: 900, delay: each ? stagger(90, { start: delay }) : delay, ease: "outExpo" });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, y, each]);
  const Tag = as as "div";
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
