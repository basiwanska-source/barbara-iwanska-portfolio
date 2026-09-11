import Link from "next/link";
import { Carousel } from "./Carousel";
import { Reveal } from "./Reveal";
import type { Project } from "@/lib/site";

export function ProjectSection({ p, flip }: { p: Project; flip?: boolean }) {
  return (
    <section id={p.slug} className="border-t border-line">
      {p.hero && (
        <div className="relative h-[70svh] overflow-hidden">
          <img src={p.hero.src} alt={p.hero.alt} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-8 sm:px-8">
            <Reveal>
              <p className="kicker mb-3"><span className="text-accent">{p.no}</span> · {p.employer} · {p.period}</p>
              <h2 className="display text-5xl sm:text-7xl lg:text-8xl">{p.title}</h2>
            </Reveal>
          </div>
        </div>
      )}
      {!p.hero && (
        <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
          <Reveal>
            <p className="kicker mb-3"><span className="text-accent">{p.no}</span> · {p.employer} · {p.period}</p>
            <h2 className="display text-5xl sm:text-7xl">{p.title}</h2>
          </Reveal>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        {p.meta.length > 0 && (
          <Reveal each className="mb-14 flex flex-wrap gap-x-8 gap-y-3 text-sm sm:text-base">
            {p.meta.map((m) => <span key={m} className="border-l border-accent pl-3">{m}</span>)}
          </Reveal>
        )}
        <div className={`grid gap-12 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <Reveal>
            <p className="kicker mb-4">Kontekst</p>
            {p.context.map((t) => <p key={t} className="mb-4 text-lg leading-relaxed">{t}</p>)}
            {p.missing && <p className="runner mt-4 text-accent">{p.missing}</p>}
          </Reveal>
          <div>
            {p.role.length > 0 && (
              <Reveal each>
                <p className="kicker mb-4">Moja rola</p>
                {p.role.map((b) => (
                  <p key={b} className="mb-3 flex gap-4"><span className="mt-3 h-px w-6 shrink-0 bg-accent" />{b}</p>
                ))}
              </Reveal>
            )}
            {p.result && (
              <Reveal className="mt-8 border-t border-line pt-6">
                <p className="kicker mb-2">Rezultat</p>
                <p className="text-lg">{p.result}</p>
              </Reveal>
            )}
          </div>
        </div>

        {p.chapters.length > 0
          ? p.chapters.map((c) => (
              <Reveal key={c.title} className="mt-20">
                <div className="mb-6 flex items-baseline justify-between gap-6">
                  <h3 className="display text-3xl sm:text-4xl">{c.title}</h3>
                  <span className="runner">{c.images.length} kadrów</span>
                </div>
                {c.body.map((t) => <p key={t} className="mb-5 max-w-3xl text-muted">{t}</p>)}
                <Carousel images={c.images} id={`${p.slug}-${c.title}`} />
              </Reveal>
            ))
          : p.gallery.length > 0 && (
              <Reveal className="mt-20">
                <Carousel images={p.gallery} id={`${p.slug}-galeria`} />
              </Reveal>
            )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
          <div className="max-w-3xl">{p.credits.map((c) => <p key={c}>{c}</p>)}</div>
          <Link href={`/strona/${p.pages[0]}`} className="runner hover:text-accent">Strony {p.pages[0]}–{p.pages[p.pages.length - 1]} broszury →</Link>
        </div>
      </div>
    </section>
  );
}
