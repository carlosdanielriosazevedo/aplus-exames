# APProva+ — identidade do arranque (30/10/2026)

## Objetivo

Mostrar o visual aprovado do Apronso com o logótipo horizontal sobre fundo azul-escuro durante o carregamento interno da aplicação, preservando a experiência atual e sem provocar um atraso artificial.

## Implementação

- `public/brand/apronso-splash-approved.webp` (941 × 1672, compressão WebP, ~66 KB): arte aprovada sem redesenhar o Apronso e o respetivo símbolo `+`.
- `app/page.js`: substitui apenas o ecrã `Loading` do carregamento dinâmico `ClientApp`. Não altera o landing público, o fluxo de entrada, as sessões ou a navegação.
- `app/launch-splash.css`: ecrã adaptativo com fundo azul-escuro e imagem responsiva; texto acessível para tecnologias de apoio.
- `tests/browser/public-metadata.spec.mjs`: novo teste do recurso WebP.

## Limitação importante do Android

O **ecrã de arranque nativo do Chrome/WebAPK** é gerado pelo sistema a partir do ícone e da cor de fundo do manifesto. Não pode ser substituído diretamente por uma imagem com o texto APProva+ apenas com código Next.js/PWA. Esta alteração melhora o **ecrã de carregamento controlado pelo site** depois do lançamento nativo e antes de o módulo principal estar pronto. O utilizador poderá não o observar se a app carregar imediatamente. A imagem não é mantida no ecrã por um tempo artificial.

Os ícones PWA e o manifesto ficam **inalterados** neste trabalho. Não alterar o ícone Android de preferência restaurada na PR #435 sem validação visual específica do proprietário. O ícone visualmente melhorado no mockup aprovado deve ser tratado como referência para um trabalho independente.

## Validação necessária

- Beta CI e renderização do fluxo inicial (público com JS, público sem JS, aluno com sessão em curso).
- Carregamento da imagem e ausência de mudança no manifest / install identity.
- Observação num Android real, distinguindo ecrã nativo do Chrome do ecrã de carregamento da aplicação.
- Sem publicar antes de validação e aprovação do release gate.
