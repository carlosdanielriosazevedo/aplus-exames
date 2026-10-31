#!/usr/bin/env python3
"""Technical image exports from user-approved exact APProva+ artwork.
Never redraw or recolor. Run on original 1024 RGBA icon only.
"""
from pathlib import Path
from PIL import Image
from hashlib import sha256
import sys

root=Path(__file__).resolve().parents[1]
source=root/'assets/brand/icon_1024_transparente-20261030.png'
splash=root/'public/brand/approva-splash-20261031.png'
fullbleed=root/'assets/brand/icon_1024_fullbleed-20261031.png'
assert sha256(source.read_bytes()).hexdigest()=='4633bc702311f8c3b9fc21ab02aad686ffff05537487407b8205681a5ee8fb97'
assert sha256(splash.read_bytes()).hexdigest()=='a5edd39c367659eaa47604a3d376ef4fd28033ee112d8c7e0bf294eb6fee07de'
assert sha256(fullbleed.read_bytes()).hexdigest()=='695d5f7def99da1d379c5cb8f67540f2124b6b04185e7a8680c03fc7a91c3916'
src=Image.open(source).convert('RGBA')
assert src.size==(1024,1024)
assert Image.open(splash).size==(941,1672)
out=root/'public/icons'
out.mkdir(parents=True,exist_ok=True)
expected={
 'icon-192.png':'0def2b1481f8f79d134b6d95c7812ee12c5c14d7ad17be607435335dff81b8a8',
 'icon-512.png':'3c873a2363f9ec09b09ac2eb798cde54aa5965dc51b8bc8efc7bce5572be5c51',
 'maskable-192.png':'bf44e0546eb9090ef4b47fe635b07403f9e0cdd0094c15e352b0cf4741820a7e',
 'maskable-512.png':'70d4408de0d80ac41ac6a9821261c0596b01879cc37ad8cb744d1710d36ba65d',
 'apple-touch-icon.png':'c8892dd366321244b41d289917d976b3e9be06b0c473174d84a1cb3cec30480b',
 'favicon-48.png':'e016e48817b064119ecb4eef9c5ef09cf5d10600d88305bc694a9d191a5976ae',
}
for sz in [192,512]:
 im=src.resize((sz,sz),Image.Resampling.LANCZOS)
 im.save(out/f'icon-{sz}.png',optimize=True)
 # Maskable: arte em quadrado completo; o launcher Android aplica a forma.
 Image.open(fullbleed).convert('RGB').resize((sz,sz),Image.Resampling.LANCZOS).save(out/f'maskable-{sz}.png',optimize=True)
src.resize((180,180),Image.Resampling.LANCZOS).save(out/'apple-touch-icon.png',optimize=True)
src.resize((48,48),Image.Resampling.LANCZOS).save(out/'favicon-48.png',optimize=True)
src.save(root/'public/favicon.ico',format='ICO',sizes=[(16,16),(32,32),(48,48),(64,64)])
(out/'favicon.ico').write_bytes((root/'public/favicon.ico').read_bytes())
for name,hash_ in expected.items():
 p=out/name
 actual=sha256(p.read_bytes()).hexdigest()
 print(name,actual)
 assert actual==hash_, f'{name}: wrong bytes'
assert sha256((root/'public/favicon.ico').read_bytes()).hexdigest()=='e9d21a7b6a8c3a795125a392dbae3e6d9dcdd12a13e954a0e9100bdf36b68bd5'
print('USER ARTWORK EXACT - EXPORTS VERIFIED')
