# Extrai o logótipo «APProva+» com o traço do splash aprovado pelo product owner
# (public/brand/approva-splash-user-exact-20261030.png), com fundo transparente.
# Gera logo-dark-full.png (original, «APP» branco, para fundos escuros) e
# logo-light-full.png («APP» azul-marinho, para fundos claros) na pasta indicada.
# Uso: python3 -I scripts/extract-brand-logo.py <splash.png> <pasta-de-saída>
# Depois: WebP q90 → public/brand/approva-logo-light.webp (decisão 2026-11-22).
import sys, numpy as np
from PIL import Image
SRC, OUT = sys.argv[1], sys.argv[2]
im = np.array(Image.open(SRC).convert('RGB')).astype(float)
y0, y1, x0, x1 = 975, 1195, 140, 815
reg = im[y0:y1, x0:x1]
H, W, _ = reg.shape
# 1) Fundo: superfície quadrática ajustada aos píxeis claramente de fundo (azul dominante e escuros).
R, G, B = reg[..., 0], reg[..., 1], reg[..., 2]
isbg = (B - R > 35) & (reg.max(axis=2) < 110)
# afastar halos: só píxeis cujo 5x5 é todo fundo
pad = np.pad(isbg, 2, constant_values=False)
ok = np.ones_like(isbg)
for dy in range(5):
    for dx in range(5):
        ok &= pad[dy:dy+H, dx:dx+W]
yy, xx = np.mgrid[0:H, 0:W]
X = np.stack([np.ones(H*W), xx.ravel()/W, yy.ravel()/H, (xx.ravel()/W)**2, (yy.ravel()/H)**2, xx.ravel()*yy.ravel()/(W*H)], 1)
sel = ok.ravel()
bg = np.zeros_like(reg)
for c in range(3):
    coef, *_ = np.linalg.lstsq(X[sel], reg[..., c].ravel()[sel], rcond=None)
    bg[..., c] = (X @ coef).reshape(H, W)
print('fundo médio', bg.mean(axis=(0, 1)).round(1), 'resíduo', np.abs(reg[ok] - bg[ok]).mean().round(2))
# 2) Cor-para-transparência (só o que é mais claro do que o fundo).
up = np.clip(reg - bg, 0, None) / np.clip(255 - bg, 1, None)
alpha = up.max(axis=2)
alpha = np.clip((alpha - 0.035) / (1 - 0.035), 0, 1)
a = np.where(alpha > 0, alpha, 1)[..., None]
fg = np.clip((reg - (1 - alpha[..., None]) * bg) / a, 0, 255)
rgba = np.dstack([fg, alpha * 255]).astype(np.uint8)
img = Image.fromarray(rgba, 'RGBA')
bbox = Image.fromarray((alpha > 0.02).astype(np.uint8) * 255).getbbox()
padpx = 6
bbox = (max(0, bbox[0]-padpx), max(0, bbox[1]-padpx), min(W, bbox[2]+padpx), min(H, bbox[3]+padpx))
img = img.crop(bbox)
print('tamanho', img.size, 'bbox na região', bbox)
img.save(OUT + '/logo-dark-full.png')
# 3) Versão para fundos claros: «APP» (branco) passa a azul-marinho, mantendo o relevo.
arr = np.array(img).astype(float)
h, w = arr.shape[:2]
rgb = arr[..., :3]; al = arr[..., 3]
sat = rgb.max(axis=2) - rgb.min(axis=2)
lum = rgb.mean(axis=2) / 255
# onde acaba o «APP»: primeira coluna, depois do 1.º terço, onde aparece laranja saturado
letters = int(h * 0.58)  # só as letras (o traço por baixo também é laranja)
orange_cols = np.nonzero(((sat[:letters] > 120) & (al[:letters] > 200)).sum(axis=0) > 3)[0]
split = int(orange_cols[orange_cols > w * 0.3].min()) - 2
print('APP termina em x =', split, 'de', w)
navy_light = np.array([26, 58, 120.])   # topo das letras (mais claro, como o brilho do branco)
navy_dark = np.array([4, 24, 66.])      # base das letras
mask = np.zeros((h, w), bool); mask[:letters, :split] = True
mask &= (sat < 60)
L = lum[mask]
t = np.clip((L - 0.70) / 0.30, 0, 1)[:, None]
rgb2 = rgb.copy()
rgb2[mask] = navy_dark + (navy_light - navy_dark) * t
light = np.dstack([rgb2, al]).astype(np.uint8)
Image.fromarray(light, 'RGBA').save(OUT + '/logo-light-full.png')
