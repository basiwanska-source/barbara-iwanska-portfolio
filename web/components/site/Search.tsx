"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { szukaj } from "@/lib/search";

/** Lupka w prawym górnym rogu: otwiera panel z polem i wynikami z całej treści. */
export function Search() {
  const [otwarte, setOtwarte] = useState(false);
  const [fraza, setFraza] = useState("");
  const pole = useRef<HTMLInputElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const wyniki = useMemo(() => szukaj(fraza), [fraza]);

  useEffect(() => {
    if (otwarte) pole.current?.focus();
  }, [otwarte]);

  useEffect(() => {
    if (!otwarte) return;
    const naKlawisz = (e: KeyboardEvent) => e.key === "Escape" && setOtwarte(false);
    const naKlik = (e: MouseEvent) => {
      if (!panel.current?.contains(e.target as Node)) setOtwarte(false);
    };
    window.addEventListener("keydown", naKlawisz);
    document.addEventListener("mousedown", naKlik);
    return () => {
      window.removeEventListener("keydown", naKlawisz);
      document.removeEventListener("mousedown", naKlik);
    };
  }, [otwarte]);

  return (
    <div className="szukaj" ref={panel}>
      <button
        aria-expanded={otwarte}
        aria-label={otwarte ? "Zamknij wyszukiwanie" : "Szukaj"}
        className="szukaj-btn"
        onClick={() => setOtwarte((v) => !v)}
        type="button"
      >
        <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 18 18" width="18">
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M12.2 12.2 16 16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
        </svg>
      </button>

      {otwarte && (
        <div className="szukaj-panel">
          <input
            aria-label="Szukaj w portfolio"
            className="szukaj-pole"
            onChange={(e) => setFraza(e.target.value)}
            placeholder="Szukaj — projekt, materiał, miasto…"
            ref={pole}
            type="search"
            value={fraza}
          />
          {fraza.trim() && (
            <div className="szukaj-wyniki">
              {wyniki.length === 0 ? (
                <p className="szukaj-pusto">Brak wyników dla „{fraza}"</p>
              ) : (
                <ul>
                  {wyniki.map((w) => (
                    <li key={w.href}>
                      <a href={w.href} onClick={() => setOtwarte(false)}>
                        <span className="szukaj-etykieta">{w.etykieta}</span>
                        <span className="szukaj-podpis">{w.podpis}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
