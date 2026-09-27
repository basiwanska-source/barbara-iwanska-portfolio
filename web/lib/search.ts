import { pages } from "./pages";
import { projects } from "./site";

export type Wynik = {
  rodzaj: "projekt" | "strona";
  etykieta: string;
  podpis: string;
  href: string;
  tresc: string;
};

/** Bez znaków diakrytycznych i małymi literami — żeby „kolobrzeg" znalazło „Kołobrzeg". */
export const uprosc = (s: string) =>
  s
    .toLowerCase()
    .replaceAll("ł", "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const zlacz = (...cz: (string | string[] | undefined)[]) =>
  cz.flatMap((c) => (Array.isArray(c) ? c : c ? [c] : [])).join(" ");

export const indeks: Wynik[] = [
  ...projects.map((p) => ({
    rodzaj: "projekt" as const,
    etykieta: p.title,
    podpis: [p.employer, p.period].filter(Boolean).join(" · "),
    href: `/portfolio/${p.slug}`,
    tresc: zlacz(p.title, p.employer, p.meta, p.context, p.role, p.result, p.credits, p.gallery.map((i) => i.alt)),
  })),
  ...pages.map((p) => ({
    rodzaj: "strona" as const,
    etykieta: p.title,
    podpis: `${p.section} · strona ${p.n}`,
    href: `/strona/${p.n}`,
    tresc: zlacz(p.title, p.section, p.kicker, p.body, p.bullets, p.result, p.meta, p.desc, p.images?.map((i) => i.alt)),
  })),
];

const uproszczony = indeks.map((w) => ({ w, klucz: uprosc(`${w.etykieta} ${w.podpis} ${w.tresc}`) }));

/** Wszystkie słowa zapytania muszą wystąpić. Projekty przed pojedynczymi stronami. */
export function szukaj(zapytanie: string, limit = 12): Wynik[] {
  const slowa = uprosc(zapytanie).split(/\s+/).filter(Boolean);
  if (!slowa.length) return [];
  return uproszczony
    .filter(({ klucz }) => slowa.every((s) => klucz.includes(s)))
    .sort((a, b) => {
      const waga = (x: typeof a) => {
        const tytul = uprosc(x.w.etykieta);
        return (slowa.every((s) => tytul.includes(s)) ? 0 : 2) + (x.w.rodzaj === "projekt" ? 0 : 1);
      };
      return waga(a) - waga(b);
    })
    .slice(0, limit)
    .map(({ w }) => w);
}
