import { ParallaxImage } from "./ParallaxImage";
import { Track } from "./Track";
import type { Img, Project } from "@/lib/site";

const isTall = (im: Img) => !!im.w && !!im.h && im.w / im.h < 0.95;

function Photo({ im, k }: { im: Img; k: number }) {
  return (
    <figure className={`s-card${isTall(im) ? " tall" : ""}`}>
      <div className="frame" style={im.w && im.h ? { aspectRatio: `${im.w} / ${im.h}` } : undefined}><img alt={im.alt} decoding="async" loading="lazy" src={im.src} /></div>
      <figcaption className="cap"><b>{k + 1}</b><span>{im.alt}</span></figcaption>
    </figure>
  );
}

/** Projekt = pasmo feature (kadr 13/20 + jedno zdanie) → pasek kadrów → szczegóły zwinięte w <details>. */
export function ProjectBlock({ p, flip }: { p: Project; flip?: boolean }) {
  // Pełny pierwszy akapit kontekstu, nie samo pierwsze zdanie — opis projektu
  // ma nieść treść, a nie tylko tytułowe zdanie.
  const lede = p.context[0] ?? "";
  return (
    <>
      {p.hero && (
        <section className={flip ? "feature flip" : "feature"} id={p.slug}>
          <div className="feature-image"><ParallaxImage im={p.hero} /></div>
          <div className="feature-text">
            <span className="label">{p.no} · {p.employer} · {p.period}</span>
            <h2 style={{ marginTop: 12 }}>{p.title}</h2>
            <p className="lede">{lede}</p>
            <a className="link-more" href={`/portfolio/${p.slug}`}>Zobacz projekt</a>
          </div>
        </section>
      )}
      <section className="shell strip" id={`${p.slug}-kadry`}>
        {p.missing && !p.hero && (
          <div className="section-head"><div className="sh-left"><h2>{p.title}</h2><span className="vr" /><span className="label">{p.missing}</span></div></div>
        )}
        {p.chapters.length > 0
          ? p.chapters.map((c) => (
              <div className="p-chapter" key={c.title} style={{ marginTop: 0, marginBottom: 40 }}>
                <Track head={<><h3>{c.title}</h3><span className="vr" /><span className="label">{c.images.length} kadrów</span></>}>
                  {c.images.map((im, k) => <Photo im={im} k={k} key={im.src} />)}
                </Track>
              </div>
            ))
          : p.gallery.length > 0 && (
              <Track head={<><h3 style={{ fontSize: 15, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.title}</h3><span className="vr" /><span className="label">{p.gallery.length} kadrów</span></>}>
                {p.gallery.map((im, k) => <Photo im={im} k={k} key={im.src} />)}
              </Track>
            )}
        <details className="p-details">
          <summary><span>Kontekst · Moja rola · Rezultat</span></summary>
          <div className="p-cols">
            <div><span className="label">Kontekst</span><div style={{ marginTop: 10 }}>{p.context.map((t) => <p key={t}>{t}</p>)}</div></div>
            <div><span className="label">Moja rola</span><ul style={{ marginTop: 10 }}>{p.role.map((b) => <li key={b}>{b}</li>)}</ul></div>
            <div><span className="label">Rezultat</span><p style={{ marginTop: 10 }}>{p.result ?? "—"}</p>{p.credits.length > 0 && <div className="p-credits">{p.credits.map((c) => <p key={c}>{c}</p>)}</div>}<p style={{ marginTop: 14 }}><a className="link-more" href={`/portfolio/${p.slug}`}>Strona projektu</a></p></div>
          </div>
        </details>
      </section>
    </>
  );
}
