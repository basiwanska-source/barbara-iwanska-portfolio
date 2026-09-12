import { Counter } from "./Counter";
import { stats } from "@/lib/site";

/** Manifest: jedno zdanie i liczby na czarnym polu — zamiast bloku tekstu. */
export function Manifest() {
  return (
    <section className="manifest" id="o-mnie">
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
