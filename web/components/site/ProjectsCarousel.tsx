import { Track } from "./Track";
import { projects } from "@/lib/site";

/** Karty projektów wg malki (`card-ex`): kadr, tytuł wersalikami, pracodawca, okres, miejsce. */
export function ProjectsCarousel() {
  return (
    <section className="shell" id="projekty">
      <Track head={<><h2>Projekty</h2><span className="vr" /><a className="link-more" href="/broszura">Cała broszura</a></>}>
        {projects.map((p) => (
          <a className="s-card card-ex" href={`#${p.slug}`} key={p.slug}>
            <div className="frame">{p.hero ? <img alt={p.hero.alt} loading="lazy" src={p.hero.src} /> : null}</div>
            <p className="artist">{p.no} · {p.title}</p>
            <p className="title">{p.employer}</p>
            <p className="date">{p.period}</p>
            {p.meta[1] ? <p className="loc">{p.meta[1]}</p> : p.missing ? <p className="loc">{p.missing}</p> : null}
          </a>
        ))}
      </Track>
    </section>
  );
}
