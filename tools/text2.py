import re
d=open('/tmp/8D86E3CF-E1EA-400F-ABB5-C37D8BA8A3E5.indd','rb').read()
# strict UTF-16LE: chars in latin/latin-ext/punct; high byte 0x00 or 0x01 (Ą ą Ć ć Ę ę Ł ł Ń ń Ś ś Ź ź Ż ż are U+0104..U+017C) plus U+2013/2014/201C/201D/2019/2026 (high byte 0x20)
pat=re.compile(rb'(?:[\x20-\x7e\xa0-\xff]\x00|[\x00-\xff]\x01|[\x13\x14\x18\x19\x1c\x1d\x26\x22\xac]\x20|\x0d\x00|\x0a\x00|\x09\x00){6,}')
out=[]
for m in pat.finditer(d):
    s=m.group().decode('utf-16le',errors='replace')
    letters=sum(c.isalpha() for c in s)
    if letters>=4 and letters/len(s)>0.4 and not re.search(r'[^\x00-\x7f]{3,}',s):
        out.append((m.start(),s))
print(len(out))
with open('raw/text_utf16.txt','w') as f:
    for off,s in out: f.write(f'@{off}\t{s!r}\n')
