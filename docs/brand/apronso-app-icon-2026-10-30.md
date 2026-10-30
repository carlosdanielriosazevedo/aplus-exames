# APProva+ — ícone oficial aprovado (30/10/2026)

Ícone de marca aprovado para a aplicação: Apronso em grande plano (coruja com óculos e camisola escura), fundo laranja e painel azul-escuro no canto inferior direito com o símbolo **+** ligeiramente mais baixo e centrado nesse canto. Manter a composição sem redesenhos não aprovados.

## Fonte e variantes

- `assets/brand/apronso-app-icon-source.webp`: ficheiro fonte comprimido do desenho aprovado.
- `public/icons/icon-192.png` e `public/icons/icon-512.png`: ícones normais do manifesto PWA (`purpose: any`).
- `public/icons/maskable-192.png` e `public/icons/maskable-512.png`: variantes com margem de segurança para máscaras do Android (`purpose: maskable`).
- `public/icons/apple-touch-icon.png`: ícone 180×180 para iOS.
- `public/icons/favicon.ico`: favicon multirresolução (16/32/48/64/128/256) servido em `/favicon.ico` por redirecionamento relativo.
- `public/icons/favicon-48.png`: alternativa PNG para usos que a exijam.

O manifesto e os metadados existentes já referenciam os mesmos percursos de ícones, por isso não é necessário alterar `app/manifest.js` nem `app/layout.js`.

## Critérios de validação

1. Os PNG têm assinatura PNG e dimensões exatas (192, 512 e 180); favicon ICO válido com várias resoluções.
2. Visualmente, o Apronso e o símbolo `+` mantêm-se reconhecíveis a 192/48/32 px, com a versão maskable protegida contra o recorte por formas do launcher.
3. O teste `tests/browser/public-metadata.spec.mjs` continua a verificar os recursos instaláveis e agora também verifica `/favicon.ico`.
4. Build, tests browser/mobile, preview, cache e comportamento de instalação devem ser validados antes de qualquer merge.

Esta PR altera apenas recursos de identidade e o redirecionamento do favicon. Não altera persistência, conteúdos pedagógicos, correções, XP nem fluxos de avaliação. **Sem merge, deployment ou rollback de produção sem evidências de validação.**

## Renovação de cache

A versão de 30/10/2026 inclui `?v=20261030` nos endereços do manifesto, favicon anunciado no HTML e ícone Apple. Isto evita que navegadores com cache antiga de `/favicon.ico` (anteriormente servido com cache immutable de um ano) continuem a mostrar o ícone anterior. A rota pública antiga continua disponível por redirecionamento para `/icons/favicon.ico`.
