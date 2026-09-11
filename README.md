# Portfolio — Barbara Iwańska

Jednoplikowa strona portfolio: [`index.html`](index.html). Otwiera się bez
budowania i bez serwera — wystarczy kliknąć plik dwa razy.

## Co jest w środku

| Ścieżka | Opis |
| --- | --- |
| `index.html` | Cała strona: treść, style i przełącznik języka PL/EN w jednym pliku. |
| `cv-2026-web.pdf` | Pełne CV, podlinkowane w sekcji „Doświadczenie". |
| `chmielna 78/`, `02-form-space/`, `03-b-sides/`, `04-torunska-20/`, `05-rotunda-dynasy/`, `kolobrzeg/` | Zdjęcia i rysunki do case studies. |
| `portfolio-barbara-iwanska.idml` | Eksport IDML katalogu — czytelne źródło układu (w odróżnieniu od binarnego `.indd`). |

## Uwagi

- Strona nie ma zależności zewnętrznych — żadnych fontów ani skryptów z sieci.
- Wybrany język zapamiętuje się w `localStorage` przeglądarki.
- Arkusz stylów zawiera wersję do druku: `Cmd+P` daje jedną sekcję na stronę.

## Aplikacja Next.js (Design Management, 33 strony z `.indd`)

- Prod: https://iwanska-portfolio.whitecontext.workers.dev (worker `iwanska-portfolio`, konto whitecontext)
- `web/` — Next 16 + Tailwind 4 + @opennextjs/cloudflare. Deploy: `pnpm cf:deploy` z `CLOUDFLARE_API_TOKEN` z `web/.cf-token` (gitignored; wymintowany `~/projects/cf/create-cf-deploy-token.mjs --name iwanska-portfolio-deploy`).
- `web/content/pages.json` — jedyne źródło treści 33 stron. `markdown/` generuje `tools/gen_markdown.py`.
- `tools/text3.py` — dekoder tekstu z binarnego `.indd` (chunki `<len>@<cp1252>` / `<len>\x80<UTF-16LE>`); `tools/prepare_images.py` — zdjęcia z katalogów wyżej → `web/public/img/`. Zależności: `uv sync --group indd`.
- Materiały Form Space i Kołobrzeg podpięte (strony 10–11 i 24–32). Zostaje Osiedle Senza (str. 19) — brak treści i zdjęć — oraz weryfikacja układu i tabeli faz (str. 3) z `portfolio-barbara-iwanska.idml`. Szczegóły: issue w repo.
