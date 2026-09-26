import { pages, type Page } from "./pages";

export type Img = { src: string; alt: string; w?: number; h?: number };
export type Chapter = { title: string; body: string[]; images: Img[] };
export type Project = {
  slug: string;
  no: string;
  title: string;
  employer: string;
  period?: string;
  meta: string[];
  context: string[];
  role: string[];
  result?: string;
  credits: string[];
  hero?: Img;
  gallery: Img[];
  chapters: Chapter[];
  pages: number[];
  missing?: string;
};

const GROUPS: { slug: string; match: (s: string) => boolean; employer: string; period?: string; missing?: string }[] = [
  { slug: "golden-tulip", match: (s) => s.startsWith("Golden Tulip"), employer: "Marvipol Development", period: "2023–2025" },
  { slug: "kolobrzeg", match: (s) => s.startsWith("Unique Hotel"), employer: "Marvipol Development", period: "nadzór projektowy" },
  { slug: "rotunda-m07", match: (s) => s.startsWith("Rotunda"), employer: "Marvipol Development", period: "nadzór projektowy" },
  { slug: "senza", match: (s) => s.startsWith("Osiedle Senza"), employer: "Marvipol Development", period: "nadzór projektowy" },
  { slug: "b-sides", match: (s) => s.startsWith("B Sides"), employer: "Zofia Strumiłło Studio", period: "2021–2022" },
  { slug: "form-space", match: (s) => s.startsWith("Form Space"), employer: "B5A", period: "2025 — obecnie" },
];

const isOpener = (p: Page) => !!p.meta && p.n !== 1 && p.n !== 2 && p.n !== 33;

export const projects: Project[] = GROUPS.map((g, i) => {
  const ps = pages.filter((p) => g.match(p.section));
  const opener = ps.find(isOpener) ?? ps[0];
  const context = ps.filter((p) => /KONTEKST|OPIS/.test(p.kicker)).flatMap((p) => p.body ?? []);
  const role = ps.flatMap((p) => p.bullets ?? []);
  const result = ps.map((p) => p.result).find(Boolean);
  const credits = Array.from(new Set(ps.flatMap((p) => [p.caption, ...(p.captions ?? [])]).filter((c): c is string => !!c && /WSPÓŁPRACA|Wizualizacj|fot\.|Rzut ·/.test(c))));
  const allImgs = ps.flatMap((p) => p.images ?? []);
  const hero = allImgs[0];
  // Form Space: chapters per sub-section; others: one gallery
  const sub = ps.filter((p) => p.section !== opener.section || /^(PROJEKT|STREFY|RZUT|REALIZACJA)/.test(p.kicker));
  const chapters: Chapter[] =
    g.slug === "form-space"
      ? Object.values(
          sub.reduce<Record<string, Chapter>>((acc, p) => {
            const key = p.section.replace(/^Form Space · /, "");
            acc[key] ??= { title: key, body: [], images: [] };
            acc[key].body.push(...(p.body ?? []));
            acc[key].images.push(...(p.images ?? []));
            return acc;
          }, {}),
        )
      : [];
  return {
    slug: g.slug,
    no: String(i + 1).padStart(2, "0"),
    title: opener.title.replace(/ · (Warszawa|Gdańsk)( · mieszkanie pokazowe)?$/, ""),
    employer: g.employer,
    period: g.period,
    meta: opener.meta ?? [],
    context: context.length ? context : (opener.body ?? []),
    role,
    result,
    credits,
    hero,
    gallery: allImgs.slice(1),
    chapters,
    pages: ps.map((p) => p.n),
    missing: g.missing,
  };
});

export const profile = pages.find((p) => p.n === 2)!;
export const phases = pages.find((p) => p.n === 3)!.phases!;
export const contact = pages.find((p) => p.n === 33)!;

export const runners = [
  "FORM SPACE • NOWOGRODZKA 44",
  "GOLDEN TULIP • CHMIELNA 78 • GDAŃSK",
  "ROTUNDA DYNASY M07 • WARSZAWA • MIESZKANIE POKAZOWE",
  "UNIQUE HOTEL KOŁOBRZEG • SUŁKOWSKIEGO 7",
  "B SIDES • MOKOTOWSKA 61",
];

export const stats = [
  { value: 5, suffix: "", label: "lat na styku dewelopmentu, wykonawstwa i projektu" },
  { value: 321, suffix: "", label: "jednostek w fit-oucie Golden Tulip" },
  { value: 227, suffix: "", label: "apartamentów pod nadzorem w Kołobrzegu" },
  { value: 6, suffix: "", label: "projektów w portfolio" },
];
