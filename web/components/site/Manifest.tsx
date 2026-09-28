import { Marquee } from "./Marquee";

/** Manifest: jedno zdanie na grafitowym polu, na pełną wysokość okna,
 *  z wielkim napisem przesuwającym się w tle. */
export function Manifest() {
  return (
    <section className="manifest" id="o-mnie">
      <Marquee className="bieznik bieznik-tlo" tempo={42} tresc={["BASED IN WARSAW"]} />
      <div className="hero-text shell">
        <h2>Od zakresu i budżetu, przez akceptacje materiałowe, po odbiory.</h2>
      </div>
    </section>
  );
}
