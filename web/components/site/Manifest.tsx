import { Marquee } from "./Marquee";

/** Zdania wyprowadzone z tekstów portfolio — nie nowe deklaracje,
 *  tylko to, co już mówisz o swojej pracy, ujęte w jedną linię. */
const PRZEKONANIA = [
  "Obietnica produktu musi przetrwać spotkanie z budżetem.",
  "Optymalizacja materiałowa zamiast obniżania klasy wykończenia.",
  "Projekt kończy się na odbiorach, nie na wizualizacji.",
];

type Props = {
  /** „otwarcie" — grafit, zdanie o zakresie i lista zasad.
   *  „domkniecie" — brąz z palety ziemi, jedno zdanie na pożegnanie. */
  wariant?: "otwarcie" | "domkniecie";
};

/**
 * Manifest: zdanie główne na pełnowymiarowym polu, z wielkim napisem
 * przesuwanym w tle. Rytm za houseofhoney.com/studio — duże zdanie,
 * mikroetykieta, krótkie myśli. Dwa warianty: otwierający sekcję
 * po hero i domykający stronę tuż nad stopką.
 */
export function Manifest({ wariant = "otwarcie" }: Props = {}) {
  if (wariant === "domkniecie") {
    return (
      <section className="manifest manifest-domkniecie" id="na-koniec">
        <Marquee className="bieznik bieznik-tlo" tempo={54} tresc={["DESIGN MANAGEMENT"]} />
        <div className="hero-text shell">
          <p className="label">Na styku trzech światów</p>
          <h2>Płynnie poruszam się między światem inżynierów, finansów i designu.</h2>
          <p className="manifest-dopowiedzenie">
            Potrafię przełożyć obietnicę produktu na zestawienie materiałowe i pilnować, żeby przetrwała
            spotkanie z budżetem.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="manifest" id="o-mnie">
      <Marquee className="bieznik bieznik-tlo" tempo={42} tresc={["BASED IN WARSAW"]} />
      <div className="hero-text shell">
        {/* Podzial na wersy jest tresciowy, nie przypadkowy: kazdy wers to
            jeden etap procesu. Na waskim ekranie spany wracaja do jednego
            ciagu i zdanie lamie sie samo. */}
        <h2>
          <span className="wers">Od zakresu i budżetu, </span>
          <span className="wers">przez akceptacje materiałowe, </span>
          <span className="wers">po odbiory.</span>
        </h2>

        <div className="manifest-perspektywa">
          <p className="label">Jak pracuję</p>
          <ul>
            {PRZEKONANIA.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
