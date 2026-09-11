import Link from "next/link";
import type { Page } from "@/lib/pages";
import { pad } from "@/lib/pages";
import { Runner } from "./Runner";

function Placeholder({ label, tall }: { label: string; tall?: boolean }) {
  return (
    <div className={`ph flex items-end p-3 ${tall ? "aspect-[3/4]" : "aspect-[3/2]"}`}>
      <span className="runner normal-case tracking-normal text-[0.65rem]">{label}</span>
    </div>
  );
}

export function Sheet({ p, standalone }: { p: Page; standalone?: boolean }) {
  const isCover = p.n === 1;
  const isContact = p.n === 33;
  const imgs = p.images ?? [];
  const hasMedia = imgs.length > 0 || !!(p.caption || p.captions?.length);
  const heroLayout = imgs.length === 1 && !p.body?.length && !p.bullets;

  return (
    <article
      id={`strona-${p.n}`}
      className={`page-sheet mx-auto flex w-full max-w-5xl flex-col justify-between gap-10 p-6 sm:p-10 lg:p-14 ${standalone ? "min-h-[80vh]" : "min-h-[92vh]"} scroll-mt-16`}
    >
      <header className="flex items-start justify-between gap-6">
        <span className="kicker">{p.kicker}</span>
        {!isCover && <span className="runner">{pad(p.n)} / 33</span>}
      </header>

      <div className={`grid gap-10 ${hasMedia ? (heroLayout ? "lg:grid-cols-[1fr_1.4fr]" : "lg:grid-cols-[1.1fr_1fr]") : ""}`}>
        <div className="flex flex-col gap-6">
          <h1 className={`display ${isCover ? "text-5xl sm:text-7xl lg:text-8xl" : "text-3xl sm:text-4xl lg:text-5xl"}`}>{p.title}</h1>

          {p.meta && (
            <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${isCover || isContact ? "text-base" : "text-sm"} text-muted`}>
              {p.meta.map((m) => (
                <li key={m} className="border-l border-accent pl-3">{m}</li>
              ))}
            </ul>
          )}

          {p.body?.map((t) => (
            <p key={t} className="max-w-2xl text-base leading-relaxed sm:text-lg">{t}</p>
          ))}

          {p.bullets && (
            <ul className="max-w-2xl space-y-3 text-base sm:text-lg">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-4"><span className="mt-3 h-px w-6 shrink-0 bg-accent" />{b}</li>
              ))}
            </ul>
          )}

          {p.result && (
            <div className="max-w-2xl border-t border-line pt-5">
              <span className="kicker">Rezultat</span>
              <p className="mt-2 text-base sm:text-lg">{p.result}</p>
            </div>
          )}

          {p.phases && (
            <table className="max-w-2xl text-sm sm:text-base">
              <tbody>
                {p.phases.map((f) => (
                  <tr key={f.name} className="border-t border-line align-top">
                    <th className="w-1/3 py-3 pr-4 text-left font-medium">{f.name}</th>
                    <td className="py-3 text-muted">{f.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {p.toc && (
            <div className="grid gap-8 sm:grid-cols-3">
              {p.toc.map((g) => (
                <div key={g.employer}>
                  <div className="kicker mb-3 text-fg">{g.employer}</div>
                  <ul className="space-y-2 text-sm">
                    {g.items.map((i) => (
                      <li key={i.label}>
                        <Link href={standalone ? `/strona/${i.page}` : `#strona-${i.page}`} className="group flex gap-3 hover:text-accent">
                          <span className="runner pt-1 text-accent">{pad(i.page)}</span>
                          <span>{i.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {hasMedia && (
          <div className="flex flex-col gap-4">
            {imgs.length > 0 ? (
              <div className={`grid gap-3 ${imgs.length > 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                {imgs.map((im, i) => (
                  <figure key={im.src} className={imgs.length > 2 && i === 0 ? "col-span-2" : ""}>
                    <img src={im.src} alt={im.alt} loading={p.n <= 5 ? "eager" : "lazy"} className="w-full border border-line object-cover" />
                    <figcaption className="mt-1 text-[0.65rem] text-muted">{im.alt}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              (p.captions ?? [p.caption!]).map((c, i) => <Placeholder key={c} label={c} tall={i % 2 === 1} />)
            )}
            {imgs.length > 0 && p.captions?.map((c) => <p key={c} className="text-xs text-muted">{c}</p>)}
            {p.caption && (imgs.length > 0 || p.captions) && <p className="text-xs text-muted">{p.caption}</p>}
          </div>
        )}
      </div>

      <Runner section={p.section} n={p.n} />
    </article>
  );
}
