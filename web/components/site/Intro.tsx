import { Counter } from "./Counter";
import { Reveal } from "./Reveal";
import { phases, profile, stats } from "@/lib/site";

export function Intro() {
  return (
    <>
      <section className="shell" id="o-mnie">
        <div className="section-head"><div className="sh-left"><h2>O mnie</h2><span className="vr" /><span className="label">Design Management</span></div></div>
        <Reveal className="p-intro">
          <h2>Między światem inżynierów, finansów i designu.</h2>
          <div>{profile.body?.map((t) => <p key={t}>{t}</p>)}</div>
        </Reveal>
        <div className="p-stats">
          {stats.map((s) => (
            <div className="p-stat" key={s.label}><Counter value={s.value} suffix={s.suffix} className="" /><span>{s.label}</span></div>
          ))}
        </div>
      </section>
      <section className="shell" id="fazy">
        <div className="section-head"><div className="sh-left"><h2>Mój udział w fazach</h2></div></div>
        <Reveal each as="div">
          <ul className="p-phases">
            {phases.map((f, i) => (
              <li key={f.name}><span className="label">{String(i + 1).padStart(2, "0")}</span><b>{f.name}</b><span>{f.role}</span></li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  );
}
