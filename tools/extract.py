import re,io
from PIL import Image
d=open('/tmp/8D86E3CF-E1EA-400F-ABB5-C37D8BA8A3E5.indd','rb').read()
# JPEG: find SOI, and EOI
starts=[m.start() for m in re.finditer(b'\xff\xd8\xff',d)]
n=0
for i,s in enumerate(starts):
    e=d.find(b'\xff\xd9',s)
    if e<0: continue
    blob=d[s:e+2]
    try:
        im=Image.open(io.BytesIO(blob)); im.load()
    except Exception as ex:
        continue
    n+=1
    fn=f'raw/jpg_{n:03d}_{s}_{im.size[0]}x{im.size[1]}.jpg'
    open(fn,'wb').write(blob)
    print(fn, len(blob))
# UTF16 text runs
txt=re.findall(rb'(?:[\x20-\x7e\xa0-\xff\x00-\x1f]\x00|[\x00-\xff][\x01-\x04]){10,}', d)
out=[]
for t in txt:
    try: s=t.decode('utf-16le')
    except: continue
    s=''.join(ch if ch.isprintable() or ch in '\n\t' else '\n' for ch in s).strip()
    if len(s)>=8 and sum(c.isalpha() for c in s)>len(s)*0.5: out.append(s)
open('raw/utf16_strings.txt','w').write('\n----\n'.join(out))
print('utf16 runs',len(out))
