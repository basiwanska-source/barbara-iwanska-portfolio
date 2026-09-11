"""web/content/pages.json → markdown/1-33.md + markdown/README.md (indeks)."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
pages=json.load(open(ROOT/'web/content/pages.json'))
assert len(pages)==33
md=ROOT/'markdown'; md.mkdir(exist_ok=True)
idx=['# Portfolio · Design Management — indeks 33 stron','',
 'Źródło: `8D86E3CF-E1EA-400F-ABB5-C37D8BA8A3E5.indd` (Adobe InDesign 20.1, 33 strony). Tekst wydobyty bezpośrednio z binarnego .indd (`tools/text3.py`); podział na strony odtworzony ze spisu treści, stopek `[ SEKCJA ]  NN` i kolejności treści. Zdjęcia z `portfolio/barbara-iwanska/<projekt>/` (Chmielna 78, Rotunda M07, Toruńska 20, B Sides, Form Space, Kołobrzeg); Osiedle Senza czeka na materiały. Jedyne źródło treści: `web/content/pages.json` — ten katalog generuje `tools/gen_markdown.py`.','',
 '| Nr | Sekcja | Tytuł | Zdjęcia | Opis |','|---|---|---|---|---|']
for p in pages:
    n=p['n']; fn=f'{n}.md'
    L=[f'# {n}. {p["title"]}','',f'**Sekcja:** {p["section"]}  ',f'**Nagłówek:** {p["kicker"]}','']
    if p.get('meta'): L+=['**Metryka:** '+' · '.join(p['meta']),'']
    for b in p.get('body',[]): L+=[b,'']
    if p.get('bullets'): L+=['## Moja rola','']+[f'- {b}' for b in p['bullets']]+['']
    if p.get('result'): L+=['## Rezultat','',p['result'],'']
    if p.get('phases'): L+=['| Faza | Mój udział |','|---|---|']+[f'| {x["name"]} | {x["role"]} |' for x in p['phases']]+['']
    for g in p.get('toc',[]):
        L+=[f'## {g["employer"]}','']+[f'- {i["label"]} → [str. {i["page"]}]({i["page"]}.md)' for i in g['items']]+['']
    for im in p.get('images',[]): L+=[f'![{im["alt"]}](../web/public{im["src"]})','']
    for c in p.get('captions',[]): L+=[f'*{c}*','']
    if p.get('caption'): L+=[f'*{p["caption"]}*','']
    L+=['---',f'Opis strony: {p["desc"]}']
    (md/fn).write_text('\n'.join(L)+'\n')
    idx.append(f'| {n} | {p["section"]} | [{p["title"]}]({fn}) | {len(p.get("images",[]))} | {p["desc"]} |')
(md/'README.md').write_text('\n'.join(idx)+'\n')
print('ok')
