"""IDML → tekst per strona (ramki tekstowe posortowane wg pozycji) + wykrycie tabel. Wyjście: raw_idml_pages.txt (nie commitować)."""
import zipfile,sys
import xml.etree.ElementTree as ET
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
z=zipfile.ZipFile(ROOT/'portfolio-barbara-iwanska.idml')
NS='{http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging}'
dm=ET.fromstring(z.read('designmap.xml'))
spreads=[e.get('src') for e in dm if e.tag==NS+'Spread']
stories={}; tables={}
for n in z.namelist():
    if not n.startswith('Stories/'): continue
    st=ET.fromstring(z.read(n)); s=st.find('.//Story'); sid=s.get('Self')
    parts=[]
    for el in s.iter():
        if el.tag=='Content': parts.append(el.text or '')
        elif el.tag=='Br': parts.append('\n')
        elif el.tag=='Table':
            rows=[]
            for c in el.iter('Cell'):
                rows.append((c.get('Name'),''.join((x.text or '') if x.tag=='Content' else ('\n' if x.tag=='Br' else '') for x in c.iter())))
            tables[sid]=rows; parts.append('[TABLE]')
    stories[sid]=''.join(parts)
pageno=0; out=[]
for sp in spreads:
    spread=ET.fromstring(z.read(sp)).find('.//Spread')
    pinfo=[]
    for p in spread.findall('Page'):
        pageno+=1
        gb=[float(v) for v in p.get('GeometricBounds').split()]
        tx=float(p.get('ItemTransform').split()[4])
        pinfo.append((pageno,gb[1]+tx,gb[3]+tx))
    frames=[]
    for tf in spread.iter('TextFrame'):
        it=[float(v) for v in tf.get('ItemTransform').split()]
        pts=[]
        for pp in tf.iter('PathPointType'):
            ax,ay=[float(v) for v in pp.get('Anchor').split()]
            pts.append((it[0]*ax+it[2]*ay+it[4], it[1]*ax+it[3]*ay+it[5]))
        if not pts: continue
        cx=sum(p[0] for p in pts)/len(pts); top=min(p[1] for p in pts); left=min(p[0] for p in pts)
        pg=next((n for n,x0,x1 in pinfo if x0<=cx<=x1),pinfo[0][0])
        txt=stories.get(tf.get('ParentStory'),'').strip()
        if txt: frames.append((pg,top,left,txt,tf.get('ParentStory')))
    for pg,_,_ in pinfo:
        out.append((pg,sorted([f for f in frames if f[0]==pg],key=lambda f:(f[1],f[2]))))
with open(ROOT/'raw_idml_pages.txt','w') as f:
    for pg,fs in out:
        f.write(f'\n===== STRONA {pg} =====\n')
        for _,top,left,txt,sid in fs:
            f.write(f'--- [{top:.0f},{left:.0f}] {txt[:700]}\n')
            if sid in tables:
                for name,cell in tables[sid]: f.write(f'    cell {name}: {cell.strip()[:200]}\n')
print('pages',pageno,'stories',len(stories),'tables',list(tables))
