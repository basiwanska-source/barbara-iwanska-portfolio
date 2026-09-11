"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { projects } from "@/lib/site";

export function SiteNav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav className={`fixed inset-x-0 top-0 z-30 transition-colors duration-500 ${solid ? "bg-bg/85 backdrop-blur border-b border-line" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 text-xs sm:px-8">
        <a href="#top" className="kicker text-fg">B. J. Iwańska</a>
        <div className="hidden gap-6 md:flex">
          <a href="#o-mnie" className="text-muted hover:text-accent">O mnie</a>
          <a href="#projekty" className="text-muted hover:text-accent">Projekty</a>
          <span className="hidden gap-3 lg:flex">
            {projects.filter((p) => !p.missing).map((p) => (
              <a key={p.slug} href={`#${p.slug}`} title={p.title} className="runner text-muted hover:text-accent">{p.no}</a>
            ))}
          </span>
          <a href="#kontakt" className="text-muted hover:text-accent">Kontakt</a>
        </div>
        <Link href="/broszura" className="runner border border-line px-3 py-2 hover:border-accent hover:text-accent">Broszura</Link>
      </div>
    </nav>
  );
}
