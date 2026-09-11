import re,sys,collections
d=open('/tmp/8D86E3CF-E1EA-400F-ABB5-C37D8BA8A3E5.indd','rb').read()
print('size',len(d))
for name,sig in [('JPEG',b'\xff\xd8\xff'),('PNG',b'\x89PNG'),('PDF',b'%PDF'),('TIFF_II',b'II*\x00'),('TIFF_MM',b'MM\x00*'),('8BPS',b'8BPS'),('XMP',b'<x:xmpmeta'),('EPS',b'%!PS')]:
    print(name, len([m.start() for m in re.finditer(re.escape(sig),d)]))
# utf16 strings sample
s=re.findall(rb'(?:[\x20-\x7e\xa0-\xff]\x00){8,}', d)
print('utf16le strings',len(s))
s8=re.findall(rb'[\x20-\x7e]{12,}', d)
print('ascii strings',len(s8))
c=collections.Counter(x for x in s8 if b'.' in x and (b'.jpg' in x.lower() or b'.png' in x.lower() or b'.psd' in x.lower() or b'.ai' in x.lower() or b'.tif' in x.lower() or b'.pdf' in x.lower()))
for k,v in c.most_common(60): print(v,k[:150])
