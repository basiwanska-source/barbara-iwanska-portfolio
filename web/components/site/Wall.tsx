import { wall } from "@/lib/visual";

/** Ściana kadrów: pełnoekranowa siatka 12 kolumn, kafle 3/6 kolumn, podpis projektu na hover. */
export function Wall() {
  return (
    <section className="tight" id="kadry">
      <div className="wall">
        {wall.map((t) => (
          <a href={`/portfolio/${t.slug}`} key={t.src} style={{ ["--c" as string]: t.c, ["--r" as string]: t.r }}>
            <img alt={t.project} loading="lazy" src={t.src} />
            <span className="tag">{t.project}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
