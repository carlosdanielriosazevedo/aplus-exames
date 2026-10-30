# APProva+ — Android: contorno azul e ecrã nativo sem quadrado laranja (30/10/2026)

## Pedido

Preservar o Apronso aprovado, incluindo o gesto, o fundo laranja e o canto azul com `+` amarelo; deixar de mostrar um quadrado laranja adicional no arranque de 1–2 segundos do Xiaomi. No ícone Android, o canto azul deve chegar ao contorno da mesma cor.

## Causa

O ecrã de abertura anterior é o splash gerado **pelo Chrome/WebAPK**, não o HTML da aplicação. A combinação anterior de PNGs com margem laranja opaca e uma moldura interior arredondada deixava visível um quadrado laranja dentro do fundo azul-escuro do manifesto. O ecrã de carregamento interno da PR #436 não substitui esse ecrã nativo.

## Correção

- `public/icons/icon-{192,512}.png`: mesmo Apronso aprovado, com fundo exterior dos cantos **transparente** e máscara arredondada, sem margem quadrada laranja.
- `public/icons/maskable-{192,512}.png`: exterior dos cantos preenchido a `#08132e`, **exatamente** a mesma cor `background_color` do manifesto. Assim, mesmo quando o Chrome seleciona a variante maskable para o splash, a margem exterior funde-se no fundo e não aparece o quadrado laranja.
- O canto inferior direito mantém o azul até ao contorno e o símbolo `+` amarelo.
- `app/manifest.js`: o `name` foi abreviado para `APProva+` (o `short_name` já o era), para permitir que o nome caiba se o Android escolher apresentá-lo; nenhuma garantia de texto no splash nativo.
- URLs dos ícones recebem `?v=20261030-android-blue-outline-native-splash` para solicitar renovação do WebAPK, mantendo **exatamente** `id`, `start_url`, `scope` e `display`.
- Reforçado teste de browser para dimensões, cores dos cantos, transparência na variante `any` e azul no canto inferior direito.

## Limitações e validação

O Android/Chrome controla a geometria, duração e eventual texto do splash nativo. Não é possível colocar à força a assinatura horizontal completa nesse ecrã via PWA/Next.js. A imagem com o logótipo horizontal da PR #436 continua disponível no carregamento **interno**, quando este ocorre; não é adicionado atraso artificial.

Validar CI, build, navegação e atualização WebAPK em Xiaomi real antes de declarar a correção visual totalmente confirmada. A atualização do WebAPK pode ser diferida pelo Chrome. Não apagar dados sem necessidade. Sem alterações a diagnósticos, sessões, progresso, XP ou corretor.
