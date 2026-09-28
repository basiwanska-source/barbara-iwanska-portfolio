import { runners } from "@/lib/site";

/**
 * Bieżnik: cienki pasek z nazwami realizacji przesuwający się w lewo.
 * Ruch robi jedna animacja CSS — bez nasłuchu przewijania, więc nie dokłada
 * nic do pracy przeglądarki przy scrollowaniu. Treść jest wypisana dwa razy,
 * bo pętla przesuwa tor o połowę jego szerokości: w miejscu zapętlenia stoi
 * wtedy identyczny tekst i przeskok jest niewidoczny.
 */
export function Marquee() {
  const tresc = [...runners, ...runners];
  return (
    <div aria-hidden="true" className="bieznik">
      <div className="bieznik-tor">
        {tresc.map((t, i) => (
          <span key={`${t}-${i}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}
