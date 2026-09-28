import { Marquee } from "./Marquee";

type Props = {
  /** „otwarcie" — grafit, samo zdanie o zakresie pracy.
   *  „domkniecie" — grafit, jedno zdanie na pożegnanie z dopowiedzeniem. */
  wariant?: "otwarcie" | "domkniecie";
};

/**
 * Manifest: jedno zdanie na pełnowymiarowym polu, wyśrodkowane na osi okna.
 * Rytm za houseofhoney.com/studio. Dwa warianty: otwierający sekcję po hero
 * i domykający stronę tuż nad stopką.
 */
export function Manifest({ wariant = "otwarcie" }: Props = {}) {
  if (wariant === "domkniecie") {
    return (
      <section className="manifest manifest-domkniecie" id="na-koniec">
        <Marquee
          className="bieznik bieznik-tlo bieznik-kaligrafia"
          tempo={100}
          tresc={["Interior design & management", "Interior design & management"]}
        />
        <div className="hero-text shell">
          <div className="manifest-gora">
            <p className="label manifest-etykieta">Na styku trzech światów</p>
            <h2>Płynnie poruszam się między światem inżynierów, finansów i designu.</h2>
          </div>
          <p className="manifest-zamkniecie">
            Potrafię przełożyć obietnicę produktu na zestawienie materiałowe i pilnować, żeby przetrwała
            spotkanie z budżetem.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="manifest" id="o-mnie">
      {/* Wielki bieznik w tle, kompozycja za houseofhoney.com/studio: napis
          kaligrafia przesuwa sie w dolnej czesci pola, wychodzac poza obie
          krawedzie. Dwa wpisy, bo bieznik dubluje tresc i przesuwa sie
          o polowe toru — jeden wystarczylby tylko do 1440 px. */}
      <Marquee
        className="bieznik bieznik-tlo bieznik-kaligrafia"
        tempo={90}
        tresc={["Warsaw based designer", "Warsaw based designer"]}
      />
      <div className="hero-text shell">
        {/* Etykieta i zdanie trzymaja sie razem przy gornej krawedzi pola,
            zeby space-between rozsunelo tylko te grupe i domkniecie. */}
        <div className="manifest-gora">
          <p className="label manifest-etykieta">O mnie</p>
        {/* Zdanie lamie sie samo i wyrownuje dlugosc wierszy (text-wrap: balance),
            zeby tworzylo zwarta bryle jak na houseofhoney.com/studio, a nie
            schodki. Twarda spacja po „i" pilnuje, zeby spojnik nie zostal
            na koncu wiersza. */}
          <h2>Zajmuję się projektowaniem i realizacją wnętrz. Od zakresu i budżetu, przez akceptacje materiałowe, po odbiory.</h2>
        </div>
        {/* Zdanie domykajace przy dolnej krawedzi pola — u nich ta sama rola:
            jedna mysl szeryfem, wersalikami, drobniej niz zdanie glowne. */}
        <p className="manifest-zamkniecie">Projekt kończy się na odbiorach, nie na wizualizacji.</p>
      </div>
    </section>
  );
}
