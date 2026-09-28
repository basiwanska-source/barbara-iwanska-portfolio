import { phaseImages } from "@/lib/visual";
import { phases } from "@/lib/site";

/** Fazy projektu jako pięć kafli 3:4 ze zdjęciem — zamiast tabeli. */
export function Phases() {
  return (
    <section id="fazy">
      <div className="phases">
        {phases.map((f, i) => (
          <div className="phase" key={f.name}>
            <img alt="" loading="lazy" src={phaseImages[i]} />
            <div className="txt"><span className="no">{i + 1}</span><div><b>{f.name}</b><span>{f.role}</span></div></div>
          </div>
        ))}
      </div>
    </section>
  );
}
