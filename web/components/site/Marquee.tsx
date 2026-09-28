import { runners } from "@/lib/site";

/**
 * Bieżnik: tekst przesuwający się w lewo. Ruch robi jedna animacja CSS —
 * bez nasłuchu przewijania, więc nie dokłada nic do pracy przeglądarki.
 * Treść jest wypisana dwa razy, bo pętla przesuwa tor o połowę jego
 * szerokości: w miejscu zapętlenia stoi wtedy identyczny tekst i przeskok
 * jest niewidoczny.
 */
export function Marquee({
  tresc = runners,
  className = "bieznik",
  tempo = 60,
}: {
  tresc?: string[];
  className?: string;
  tempo?: number;
}) {
  const pozycje = [...tresc, ...tresc];
  return (
    <div aria-hidden="true" className={className}>
      <div className="bieznik-tor" style={{ animationDuration: `${tempo}s` }}>
        {pozycje.map((t, i) => (
          <span key={`${t}-${i}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}
