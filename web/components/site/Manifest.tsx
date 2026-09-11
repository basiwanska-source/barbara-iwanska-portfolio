import { Counter } from "./Counter";
import { manifestImage } from "@/lib/visual";
import { stats } from "@/lib/site";

/** Manifest: jedno zdanie i liczby na pełnym kadrze — zamiast bloku tekstu. */
export function Manifest() {
  return (
    <section className="manifest" id="o-mnie">
      <img alt={manifestImage.alt} loading="lazy" src={manifestImage.src} />
      <div className="hero-text shell">
        <p className="subtitle">Design Management</p>
        <h2>Od zakresu i budżetu, przez akceptacje materiałowe, po odbiory.</h2>
        <div className="stats">
          {stats.map((s) => (
            <div key={s.label}><Counter value={s.value} suffix={s.suffix} className="" /><span>{s.label}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
