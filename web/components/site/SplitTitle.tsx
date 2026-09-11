"use client";
import { useEffect, useRef } from "react";
import { animate, stagger, text } from "animejs";

/** Tytuł hero: podział na słowa/znaki i wjazd znak po znaku (anime.js text.split). */
export function SplitTitle({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { chars } = text.split(el, { chars: { wrap: "clip" }, words: true });
    const anim = animate(chars, {
      y: ["1.1em", "0em"],
      opacity: [0, 1],
      duration: 1100,
      delay: stagger(22, { start: 150 }),
      ease: "outExpo",
    });
    return () => {
      anim.revert();
    };
  }, []);
  return (
    <h1 ref={ref} className={className}>
      {children}
    </h1>
  );
}
