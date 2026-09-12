# Portfolio — Barbara Iwańska

Jednoplikowa strona portfolio: [`index.html`](index.html). Otwiera się bez
budowania i bez serwera — wystarczy kliknąć plik dwa razy.

## Co jest w środku

| Ścieżka | Opis |
| --- | --- |
| `index.html` | Cała strona: treść, style i przełącznik języka PL/EN w jednym pliku. |
| `cv-2026-web.pdf` | Pełne CV, podlinkowane w sekcji „Doświadczenie". |
| `chmielna 78/`, `02-form-space/`, `03-b-sides/`, `05-rotunda-dynasy/`, `kolobrzeg/` | Zdjęcia i rysunki do case studies. |
| `portfolio-barbara-iwanska.idml` | Eksport IDML katalogu — czytelne źródło układu (w odróżnieniu od binarnego `.indd`). |

## Uwagi

- Strona nie ma zależności zewnętrznych — żadnych fontów ani skryptów z sieci.
- Wybrany język zapamiętuje się w `localStorage` przeglądarki.
- Arkusz stylów zawiera wersję do druku: `Cmd+P` daje jedną sekcję na stronę.

## Aplikacja Next.js (Design Management, 33 strony z `.indd`)

- Prod: https://iwanska-portfolio.whitecontext.workers.dev (worker `iwanska-portfolio`, konto whitecontext). Wdraża CI: `.github/workflows/portfolio-iwanska.yml` na runnerze `vps-malki` po pushu na `main` (PR tylko buduje). Ręcznie z VPS-a: `pnpm cf:deploy` z tokenem z `web/.cf-token`.
- `web/` — Next 16 + Tailwind 4 + @opennextjs/cloudflare. Trasy: `/` strona www w **systemie layoutu MALKI**, kompozycja wizualna (hero-slider → ściana kadrów `.wall` 12 kolumn → manifest na zdjęciu → fazy jako kafle ze zdjęciami → projekty: pasmo feature + pasek kadrów, tekst zwinięty w `<details>`); dobór kadrów do ściany i faz w `lib/visual.ts` (CSS skopiowany z `malki-nextjs/src/styles/globals.css`, sekcja „Layout site”: header z compact nav, hero-slider, `section-head`, `carousel-track` ze scroll-snap, pasma `feature`, czarna stopka; komponenty w `components/site/` odpowiadają `malki-nextjs/src/components/site/`), `/portfolio/[slug]` — osobna strona każdego z 7 projektów (SSG: hero, zakres w 3 kolumnach, pełna galeria w siatce, credity, poprzedni/następny), `/broszura` — 33 arkusze jak w .indd, `/strona/N` — pojedyncze strony. Model strony: `lib/site.ts` (projekty wyprowadzone z `pages.json`). Deploy: `pnpm cf:deploy` z `CLOUDFLARE_API_TOKEN` z `web/.cf-token` (gitignored; wymintowany `~/projects/cf/create-cf-deploy-token.mjs --name iwanska-portfolio-deploy`).
- `web/content/pages.json` — jedyne źródło treści 33 stron. `markdown/` generuje `tools/gen_markdown.py`.
- `tools/text3.py` — dekoder tekstu z binarnego `.indd` (chunki `<len>@<cp1252>` / `<len>\x80<UTF-16LE>`); `tools/prepare_images.py` — zdjęcia z katalogów wyżej → `web/public/img/`. Zależności: `uv sync --group indd`.
- Materiały Form Space i Kołobrzeg podpięte (strony 10–11 i 24–32). Zostaje Osiedle Senza (str. 19) — brak treści i zdjęć — oraz weryfikacja układu i tabeli faz (str. 3) z `portfolio-barbara-iwanska.idml`. Szczegóły: issue w repo.

## IDML — uwaga

`portfolio-barbara-iwanska.idml` to **inna, wcześniejsza edycja** portfolio („Strategia produktu i marki”, PL/EN, 4 projekty: Chmielna 78, B Sides, Toruńska 20, Rotunda M07; 33 strony przypadkiem — Toruńska 20 została w międzyczasie wyjęta z portfolio). Nie zawiera Form Space, Kołobrzegu, Senzy ani tabeli faz, więc **nie weryfikuje układu** `.indd` „Design Management 2026”. Wykorzystane z niego: dokładne podpisy zdjęć, pełne credity B Sides, wiersze „Efekt”. Parser: `tools/idml_pages.py` → `raw_idml_pages.txt` (gitignored).
