"""Dopisuje `w`/`h` do każdego zdjęcia w web/content/pages.json (z pliku, nie z nazwy).

Układ galerii potrzebuje wiedzieć, czy kadr jest pionowy. Wzorzec po nazwie pliku
mylił się co czwarty raz, więc proporcje bierzemy z samego obrazu. Uruchom po
każdej zmianie zdjęć — zaraz po `prepare_images.py`.
"""
import json
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
p=ROOT/'web/content/pages.json'
pages=json.loads(p.read_text())
n=0
for page in pages:
    for im in page.get('images',[]):
        w,h=Image.open(ROOT/'web/public'/im['src'].lstrip('/')).size
        im['w'],im['h']=w,h; n+=1
p.write_text(json.dumps(pages,ensure_ascii=False,indent=1)+'\n')
print(f'opisano {n} zdjęć')
