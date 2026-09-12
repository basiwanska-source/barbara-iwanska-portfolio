import raw from "@/content/pages.json";

export type TocGroup = { employer: string; items: { label: string; page: number }[] };
export type Phase = { name: string; role: string };
export type Page = {
  n: number;
  section: string;
  kicker: string;
  title: string;
  body?: string[];
  bullets?: string[];
  result?: string;
  meta?: string[];
  caption?: string;
  captions?: string[];
  phases?: Phase[];
  toc?: TocGroup[];
  images?: { src: string; alt: string; w?: number; h?: number }[];
  desc: string;
};

export const pages = raw as Page[];
export const TOTAL = pages.length;
export const getPage = (n: number) => pages.find((p) => p.n === n);

export const sections = pages.reduce<{ name: string; first: number }[]>((acc, p) => {
  if (!acc.length || acc[acc.length - 1].name !== p.section) acc.push({ name: p.section, first: p.n });
  return acc;
}, []);

export const pad = (n: number) => String(n).padStart(2, "0");
