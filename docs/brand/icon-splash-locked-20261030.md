# APProva+ — identidade oficial final, 30/10/2026

## Pedido definitivo
- **Ícone da app:** primeira imagem exibida na resposta imediatamente anterior do assistente (`coruja_sorridente_com_sinal_de_mais.png`, 1254×1254). É a única fonte da arte para Android/PWA, iOS e favicon.
- **Splash interno:** segunda imagem exibida naquela resposta (`ecrã_de_arranque_com_coruja_3d_approva.png`, 941×1672), incluindo a assinatura APProva+ por baixo do Apronso.
- **Não redesenhar, recolorir ou reposicionar a mascote, a assinatura nem o +.** A única manipulação permitida é exportação técnica para tamanhos e máscaras exigidos pelas plataformas.

## Ficheiros
- `public/icons/icon-{192,512}.png`: exportação reduzida, cantos pretos **externos** convertidos em transparência, sem alterar o conteúdo visível.
- `public/icons/maskable-{192,512}.png`: mesma arte, centrada com margem de segurança e fundo exterior `#08132e`, para que os launchers Android não cortem o sinal `+`.
- `public/icons/apple-touch-icon.png`, `public/icons/favicon.ico`, `public/icons/favicon-48.png`, `public/favicon.ico`: mesma origem.
- `public/brand/apronso-splash-locked-20261030.webp`: conversão WebP **sem perdas** da segunda imagem. Dimensões originais 941×1672, SHA256 do ficheiro `11ca08de8ed131f1ed402f29b4cdb483284cdec7dd68ee067e1e37f36be25dbd`.

Fontes (SHA256):
- Ícone PNG fornecido: `1dcff3328eeb79356c181702ade65790fbe93629c36b7b715dbc0a021dac0bea`.
- Splash PNG fornecido: `89899a5522accca981f3e48ef2b7f0eeb328e04eeca695f1b0ccff7ee9f17c77`.

## Comportamento na instalação
- A PWA instalada mostra o splash escolhido na primeira pintura da aplicação e durante o carregamento interno (sem acrescentar tempo artificial).
- O **splash nativo do Chrome/WebAPK** ocorre antes de qualquer código HTML. Este ecrã é gerado automaticamente pelo Android usando o ícone, nome e cores do manifesto. Não pode ser substituído na íntegra pela imagem com assinatura através de PWA. Para isso seria necessário um invólucro Android nativo, **fora deste pedido**.
- A atualização conserva `manifest.id`, `scope`, `start_url` e `display`; só versiona os URLs dos ícones para que o Chrome revalide o WebAPK.
- Testes de browser validam assets, dimensões, transparência, símbolo `+`, hashes exatos do splash, apple touch e favicon. Nenhuma alteração a progresso, missões, diagnóstico ou corretor.
