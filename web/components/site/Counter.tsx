"use client";
import { useEffect, useRef } from "react";
import { animate, utils } from "animejs";

export function Counter({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { v: 0 };
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      animate(obj, { v: value, duration: 1600, ease: "outExpo", modifier: utils.round(0), onUpdate: () => { el.textContent = `${obj.v}${suffix}`; } });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix]);
  return <b ref={ref} className={className}>0{suffix}</b>;
}
