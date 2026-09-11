import re
d=open('/tmp/8D86E3CF-E1EA-400F-ABB5-C37D8BA8A3E5.indd','rb').read()
N=len(d)
def ok_ascii(b):
    return all(0x20<=c<0x7f or c in (0x0d,0x0a,0x09) or c>=0xa0 for c in b)
stories=[]
i=0
used=set()
# find chunk starts: byte n, then '@' or 0x80, then n bytes/chars
def parse_from(p):
    out=''; q=p
    while q+2<=N:
        n=d[q]; t=d[q+1]
        if n==0: break
        if t==0x40:
            seg=d[q+2:q+2+n]
            if len(seg)<n or not ok_ascii(seg): break
            out+=seg.decode('cp1252',errors='replace'); q+=2+n
        elif t==0x80:
            seg=d[q+2:q+2+2*n]
            if len(seg)<2*n: break
            try: s=seg.decode('utf-16le')
            except: break
            if any(ord(c)<0x20 and c not in '\r\n\t' for c in s): break
            out+=s; q+=2+2*n
        else: break
    return out,q
p=0
res=[]
while True:
    m=re.compile(rb'[\x03-\xff][\x40\x80]').search(d,p)
    if not m: break
    s,q=parse_from(m.start())
    letters=sum(c.isalpha() for c in s)
    if letters>=6 and letters/len(s)>0.5 and ('@' not in s) and not re.search(r'[\x80-\x9f]',s):
        res.append((m.start(),s)); p=q
    else: p=m.start()+1
with open('raw/stories.txt','w') as f:
    for off,s in res:
        f.write(f'\n@@@ {off}\n{s}\n')
print(len(res))
