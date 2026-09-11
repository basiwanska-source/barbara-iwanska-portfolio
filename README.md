# Portfolio — Barbara Iwańska

Jednoplikowa strona portfolio: [`index.html`](index.html). Otwiera się bez
budowania i bez serwera — wystarczy kliknąć plik dwa razy.

## Co jest w środku

| Ścieżka | Opis |
| --- | --- |
| `index.html` | Cała strona: treść, style i przełącznik języka PL/EN w jednym pliku. |
| `cv-2026-web.pdf` | Pełne CV, podlinkowane w sekcji „Doświadczenie". |
| `chmielna 78/`, `03-b-sides/`, `04-torunska-20/`, `05-rotunda-dynasy/` | Zdjęcia i rysunki do czterech case studies. |

## Uwagi

- Strona nie ma zależności zewnętrznych — żadnych fontów ani skryptów z sieci.
- Wybrany język zapamiętuje się w `localStorage` przeglądarki.
- Arkusz stylów zawiera wersję do druku: `Cmd+P` daje jedną sekcję na stronę.

## Aplikacja Next.js (Design Management, 33 strony z `.indd`)

- Prod: https://iwanska-portfolio.whitecontext.workers.dev (worker `iwanska-portfolio`, konto whitecontext). Wdraża CI: `.github/workflows/portfolio-iwanska.yml` na runnerze `vps-malki` po pushu na `main` (PR tylko buduje). Ręcznie z VPS-a: `pnpm cf:deploy` z tokenem z `web/.cf-token`.
- `web/` — Next 16 + Tailwind 4 + @opennextjs/cloudflare. Deploy: `pnpm cf:deploy` z `CLOUDFLARE_API_TOKEN` z `web/.cf-token` (gitignored; wymintowany `~/projects/cf/create-cf-deploy-token.mjs --name iwanska-portfolio-deploy`).
- `web/content/pages.json` — jedyne źródło treści 33 stron. `markdown/` generuje `tools/gen_markdown.py`.
- `tools/text3.py` — dekoder tekstu z binarnego `.indd` (chunki `<len>@<cp1252>` / `<len>\x80<UTF-16LE>`); `tools/prepare_images.py` — zdjęcia z katalogów wyżej → `web/public/img/`. Zależności: `uv sync --group indd`.
- Braki (Form Space, Kołobrzeg, Senza, weryfikacja układu z IDML): issue w repo.
