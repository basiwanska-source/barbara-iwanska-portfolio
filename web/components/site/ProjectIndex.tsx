import { Reveal } from "./Reveal";
import { projects } from "@/lib/site";

export function ProjectIndex() {
  return (
    <section id="projekty" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal><p className="kicker mb-8">Projekty · 2021–2026</p></Reveal>
      <Reveal each className="divide-y divide-line border-y border-line">
        {projects.map((p) => (
          <a key={p.slug} href={`#${p.slug}`} className="group grid items-center gap-4 py-6 sm:grid-cols-[4rem_1fr_1fr_8rem] transition-colors hover:text-accent">
            <span className="runner text-accent">{p.no}</span>
            <span className="display text-3xl sm:text-4xl">{p.title}</span>
            <span className="text-sm text-muted">{p.employer} · {p.period}</span>
            <span className="hidden sm:block">
              {p.hero ? <img src={p.hero.src} alt="" className="h-16 w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" /> : <span className="runner">{p.missing}</span>}
            </span>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
