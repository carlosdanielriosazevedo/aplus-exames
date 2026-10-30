# Identidade visual final APProva+ — aprovação explícita 30/10/2026

## Fontes aprovadas SEM redesenho
- **Imagem 1 (splash):** upload original `Ecrã de lançamento APProva+(1).png`, 941×1672. Os píxeis são reproduzidos **exatamente** em `public/brand/apronso-splash-final.webp` por compressão WebP **lossless**. SHA-256 da matriz RGBA (941×1672): `7c9b6c0a705a338e5867a53a740ee758d4557186776f717b388edae4812f8fa8`; a comparação local original ↔ WebP deu ZERO píxeis diferentes.
- **Imagem 2 (ícone):** upload original `1000591842.png`, 626×647, armazenado byte a byte em `assets/brand/apronso-icon-20261030-original.png` (SHA-256 `ccbcdf6e3dfe3fc1e4fa13daa0ec852d576a50bd7b7b7b7c1eb58b37b690a843`). Esta é a referência **exata** para o ícone nos sistemas.
- Os PNG de 192×192, 512×512 e 180×180 e o ICO são **exportações técnicas** da imagem 2. É necessário recortar apenas o fundo azul do *mockup* que rodeia o quadrado arredondado e adaptar os tamanhos. Não se acrescenta, redesenha, recolore ou move nenhum elemento da arte, incluindo o símbolo `+`.
- A variante `maskable` adiciona uma margem de segurança azul-escuro (`#08132e`) com o logo inteiro centrado a 78% da largura, para evitar que o Android corte o `+`. O ícone normal preserva a arte a largura total; os cantos externos são transparentes.

## Splash PWA no Android
- O splash inicial do **Chrome/WebAPK é nativo**: deriva de `manifest.name`, `background_color` e ícones. Não é possível, usando apenas a PWA/Next.js, obrigá-lo a reproduzir a imagem 1 com assinatura horizontal. Para controlo completo desses primeiros segundos seria necessária uma aplicação Android nativa/wrapper instalada.
- Para **a primeira pintura da aplicação instalada**, `app/page.js` e `app/launch-splash.css` mostram a imagem 1 (lossless) a ecrã inteiro em `display-mode:standalone`, durante a preparação do JavaScript/app. Mantém o conteúdo público normal no navegador. A imagem não introduz atrasos artificiais.
- `background-size:cover` preserva as proporções. Em ecrãs estreitos pode cortar **apenas o fundo navy lateral**, não o Apronso ou a assinatura, nos formatos mobile de referência.
- A identidade de instalação (`id`, `start_url`, `scope`, `display`) **não muda**; URLs de ícones têm cache-busting `?v=20261030-exact-approved-final`.

## Requisitos de publicação
- Browser, unit, build e recovery gates; verificar especialmente a cor de fundo, as margens e o símbolo `+` em icon normal e maskable.
- Após publicar, renovar o WebAPK no Chrome/Android ou reinstalar se necessário. Uma imagem ilustrativa no PC não é prova de como o launcher Xiaomi recorta.
- Sem tocar em conteúdos, XP, sessões, avaliações, corretor, backend nem dados pessoais.
