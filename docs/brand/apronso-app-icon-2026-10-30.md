# APProva+ — ícone oficial aprovado (30/10/2026)

Ícone de marca aprovado para a aplicação: Apronso em grande plano (coruja com óculos e camisola escura), fundo laranja e painel azul-escuro no canto inferior direito com o símbolo **+** ligeiramente mais baixo e centrado nesse canto. Manter a composição sem redesenhos não aprovados.

## Fonte e variantes

- `assets/brand/apronso-app-icon-source.webp`: ficheiro fonte comprimido do desenho aprovado.
- `public/icons/icon-192.png` e `public/icons/icon-512.png`: ícones normais do manifesto PWA (`purpose: any`).
- `public/icons/maskable-192.png` e `public/icons/maskable-512.png`: variantes com margem de segurança para máscaras do Android (`purpose: maskable`).
- `public/icons/apple-touch-icon.png`: ícone 180×180 para iOS.
- `public/icons/favicon.ico` e `public/favicon.ico`: favicon multirresolução (16/32/48/64/128/256); `/favicon.ico` é um ficheiro estático e não redireciona, evitando o aviso de cache de prerenderização do Next.js.
- `public/icons/favicon-48.png`: alternativa PNG para usos que a exijam.

O manifesto (`app/manifest.js`) e os metadados (`app/layout.js`) receberam URLs versionadas com `?v=20261030` para invalidar a cache antiga e apresentar o ícone aprovado.

## Critérios de validação

1. Os PNG têm assinatura PNG e dimensões exatas (192, 512 e 180); favicon ICO válido com várias resoluções.
2. Visualmente, o Apronso e o símbolo `+` mantêm-se reconhecíveis a 192/48/32 px, com a versão maskable protegida contra o recorte por formas do launcher.
3. O teste `tests/browser/public-metadata.spec.mjs` continua a verificar os recursos instaláveis e agora também verifica `/favicon.ico`.
4. Build, tests browser/mobile, preview, cache e comportamento de instalação devem ser validados antes de qualquer merge.

Esta PR altera apenas os recursos de identidade, as referências versionadas e o teste do favicon. Não altera persistência, conteúdos pedagógicos, correções, XP nem fluxos de avaliação. **Sem merge, deployment ou rollback de produção sem evidências de validação.**

## Renovação de cache

A versão de 30/10/2026 inclui `?v=20261030` nos endereços do manifesto, favicon anunciado no HTML e ícone Apple. Isto evita que navegadores com cache antiga de `/favicon.ico` (anteriormente servido com cache immutable de um ano) continuem a mostrar o ícone anterior. A rota pública `/favicon.ico` continua disponível, agora servida diretamente como ficheiro estático (HTTP 200, sem redirecionamento).

## Segunda versão aprovada — fundo laranja uniforme

Aprovada em 30/10/2026 nova versão do desenho: fundo laranja uniforme sem pormenores brancos nos cantos, Apronso em grande plano, painel azul-escuro inferior direito e `+` amarelo alinhado. O desenho aprovado é o ficheiro `assets/brand/apronso-app-icon-source.webp` e as variantes são geradas diretamente dele. Versão dos URLs de ícones atualizada para `?v=20261030-orange2`, necessária para atualizar instalações WebAPK existentes. A versão maskable contém margem de segurança, preenchida a laranja. Não alterar a identidade de manifesto (`id`) nem o `start_url` para não criar uma segunda app no Android.


## Revisão sem contorno (30/10/2026)
- Os ícones anteriores foram exportados de uma imagem com cantos brancos ou com um quadrado arredondado embutido num fundo adicional; isto criava uma moldura visível na instalação Android.
- A imagem-base agora é **full bleed** (quadrada, sem cantos arredondados e sem moldura pré-desenhada). Apenas o launcher do Android deve aplicar o recorte final.
- As variantes **maskable** usam fundo laranja/azul até às extremidades; a mascote e o `+` são dimensionados para continuarem visíveis em recorte circular. Não há um quadrado arredondado dentro de outro quadrado.
- Ícone de iOS e favicon receberam o mesmo desenho atualizado.
- Manifesto e metadados têm cache-bust `?v=20261030-fullbleed1`, mantendo id, start_url, scope, manifest e comportamento da aplicação inalterados.
- O teste em `public-metadata.spec.mjs` valida, além das dimensões, os pixels dos cantos (laranja em cima, azul no inferior direito) para prevenir regressão de margens brancas.
- Revisão visual: `preview.png` local com ícone quadrado, máscara circular e redução a 48px. Revisão num dispositivo real após publicar continua obrigatória para confirmar o launcher Xiaomi.
- Esta alteração não toca em sessões, progresso, notas, XP, dados, corretor ou layout funcional.
