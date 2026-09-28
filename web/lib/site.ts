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

/* Form Space świadomie poza serwisem — autorka nie chce pokazywać tego
   projektu. Strony 22–30 zostają w broszurze; przywrócenie = jeden wpis. */
const GROUPS: { slug: string; match: (s: string) => boolean; employer: string; period?: string; missing?: string }[] = [
  { slug: "golden-tulip", match: (s) => s.startsWith("Golden Tulip"), employer: "Marvipol Development", period: "2023–2025" },
  { slug: "kolobrzeg", match: (s) => s.startsWith("Unique Hotel"), employer: "Marvipol Development", period: "nadzór projektowy" },
  { slug: "rotunda-m07", match: (s) => s.startsWith("Rotunda"), employer: "Marvipol Development", period: "nadzór projektowy" },
  { slug: "senza", match: (s) => s.startsWith("Osiedle Senza"), employer: "Marvipol Development", period: "nadzór projektowy" },
  { slug: "b-sides", match: (s) => s.startsWith("B Sides"), employer: "Zofia Strumiłło Studio", period: "2021–2022" },
];

/** Podpisy zdradzające kadr z zewnątrz — te lądują na końcu karuzeli. */
const ZEWNETRZE = ["elewacj", "bryl", "z lotu ptaka", "drona", "od strony plazy", "od strony morza", "dziedzinie", "zabudow", "sasiedztw", "wizualizacja inwestycji"];

const bezOgonkow = (s: string) =>
  s.toLowerCase().replaceAll("\u0142", "l").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const czyZewnetrze = (im: Img) => {
  const opis = bezOgonkow(im.alt);
  return ZEWNETRZE.some((k) => opis.includes(k));
};

/** Karuzela zaczyna się od wnętrz, ujęcia z zewnątrz idą na koniec.
 *  Kolejność wewnątrz każdej z grup zostaje taka, jak w treści. */
const wnetrzaNajpierw = (imgs: Img[]) => [...imgs.filter((im) => !czyZewnetrze(im)), ...imgs.filter(czyZewnetrze)];

const isOpener = (p: Page) => !!p.meta && p.n !== 1 && p.n !== 2 && p.n !== 33;

export const projects: Project[] = GROUPS.map((g, i) => {
  const ps = pages.filter((p) => g.match(p.section));
  const opener = ps.find(isOpener) ?? ps[0];
  const context = ps.filter((p) => /KONTEKST|OPIS/.test(p.kicker)).flatMap((p) => p.body ?? []);
  const role = ps.flatMap((p) => p.bullets ?? []);
  const result = ps.map((p) => p.result).find(Boolean);
  const credits = Array.from(new Set(ps.flatMap((p) => [p.caption, ...(p.captions ?? [])]).filter((c): c is string => !!c && /WSPÓŁPRACA|Wizualizacj|fot\.|Rzut ·/.test(c))));
  // Bez powtórzeń: ten sam kadr bywa jednocześnie otwarciem rozdziału
  // i ilustracją strony broszury — w galerii ma się pojawić raz.
  const wszystkie = ps.flatMap((p) => p.images ?? []);
  const allImgs = wszystkie.filter((im, i) => wszystkie.findIndex((x) => x.src === im.src) === i);
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
    // Cala biblioteka projektu, takze kadr uzyty jako otwarcie. Wczesniej
    // szedl tu slice(1), przez co pierwsze zdjecie — u Golden Tulip
    // wizualizacja lobby — nigdy nie trafialo do karuzeli: bylo widoczne
    // tylko jako duze tlo sekcji, ktorego nie da sie obejrzec z bliska.
    gallery: wnetrzaNajpierw(allImgs),
    chapters,
    pages: ps.map((p) => p.n),
    missing: g.missing,
  };
});

export const profile = pages.find((p) => p.n === 2)!;
export const phases = pages.find((p) => p.n === 3)!.phases!;
export const contact = pages.find((p) => p.n === 33)!;


