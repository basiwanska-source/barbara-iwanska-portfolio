"""Zdjęcia z portfolio/barbara-iwanska/<projekt>/ → web/public/img/<slug>/, max 1800 px, JPEG q82 (rzuty PNG zostają PNG)."""
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
SRC={'chmielna 78':'chmielna-78','02-form-space':'form-space','03-b-sides':'b-sides','04-torunska-20':'torunska-20','05-rotunda-dynasy':'rotunda-m07','kolobrzeg':'kolobrzeg'}
out=ROOT/'web/public/img'
for src,slug in SRC.items():
    for f in sorted((ROOT/src).rglob('*')):
        if f.suffix.lower() not in ('.jpg','.jpeg','.png'): continue
        im=Image.open(f); im.thumbnail((1800,1800))
        sub=f.parent.name if f.parent.name!=src else ''
        name=(sub.split('-',1)[-1]+'-' if sub else '')+f.stem
        dst=out/slug/(name+('.png' if f.suffix.lower()=='.png' else '.jpg'))
        dst.parent.mkdir(parents=True,exist_ok=True)
        if dst.suffix=='.png': im.save(dst,optimize=True)
        else: im.convert('RGB').save(dst,quality=82,optimize=True,progressive=True)
        print(dst.relative_to(out), im.size, dst.stat().st_size//1024,'KB')
