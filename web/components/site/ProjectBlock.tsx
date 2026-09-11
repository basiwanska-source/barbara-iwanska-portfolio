import { Reveal } from "./Reveal";
import { Track } from "./Track";
import type { Img, Project } from "@/lib/site";

function Photo({ im, k }: { im: Img; k: number }) {
  return (
    <figure className="s-card">
      <div className="frame"><img alt={im.alt} loading="lazy" src={im.src} /></div>
      <figcaption className="cap"><b>{String(k + 1).padStart(2, "0")}</b>{im.alt}</figcaption>
    </figure>
  );
}

/** Projekt = pasmo feature (kadr + kontekst, naprzemiennie) + sekcja w boxie: metryka, trzy kolumny, karuzele kadrów, credity. */
export function ProjectBlock({ p, flip }: { p: Project; flip?: boolean }) {
  const excerpt = p.context[0] ?? "";
  return (
    <>
      {p.hero && (
        <section className={flip ? "feature flip" : "feature"} id={p.slug}>
          <div className="feature-image"><img alt={p.hero.alt} loading="lazy" src={p.hero.src} /></div>
          <Reveal className="feature-text">
            <span className="label">{p.no} · {p.employer} · {p.period}</span>
            <h2 style={{ marginTop: 12 }}>{p.title}</h2>
            <p>{excerpt}</p>
            <a className="link-more" href={`#${p.slug}-szczegoly`}>Zakres i kadry</a>
          </Reveal>
        </section>
      )}
      <section className="shell" id={`${p.slug}-szczegoly`}>
        <div className="section-head">
          <div className="sh-left">
            <h2>{p.title}</h2>
            <span className="vr" />
            <a className="link-more" href={`/strona/${p.pages[0]}`}>Strony {p.pages[0]}–{p.pages[p.pages.length - 1]} broszury</a>
          </div>
        </div>
        {p.meta.length > 0 && <div className="p-meta">{p.meta.map((m) => <span key={m}>{m}</span>)}</div>}
        {p.missing && <p className="p-note" style={{ marginTop: 18 }}>{p.missing}</p>}
        <Reveal each className="p-cols">
          <div><span className="label">Kontekst</span><div style={{ marginTop: 10 }}>{p.context.slice(p.hero ? 1 : 0).map((t) => <p key={t}>{t}</p>)}{p.context.length <= 1 && p.hero ? <p>{excerpt}</p> : null}</div></div>
          <div><span className="label">Moja rola</span><ul style={{ marginTop: 10 }}>{p.role.map((b) => <li key={b}>{b}</li>)}</ul></div>
          <div><span className="label">Rezultat</span><p style={{ marginTop: 10 }}>{p.result ?? "—"}</p></div>
        </Reveal>
        {p.chapters.length > 0
          ? p.chapters.map((c) => (
              <div className="p-chapter" key={c.title}>
                <Track head={<><h3>{c.title}</h3><span className="vr" /><span className="label">{c.images.length} kadrów</span></>}>
                  {c.images.map((im, k) => <Photo im={im} k={k} key={im.src} />)}
                </Track>
                {c.body[0] ? <p className="lead" style={{ margin: "18px 0 0" }}>{c.body[0]}</p> : null}
              </div>
            ))
          : p.gallery.length > 0 && (
              <div className="p-chapter">
                <Track head={<><h3>Kadry</h3><span className="vr" /><span className="label">{p.gallery.length} zdjęć</span></>}>
                  {p.gallery.map((im, k) => <Photo im={im} k={k} key={im.src} />)}
                </Track>
              </div>
            )}
        {p.credits.length > 0 && <div className="p-credits">{p.credits.map((c) => <p key={c}>{c}</p>)}</div>}
      </section>
    </>
  );
}
