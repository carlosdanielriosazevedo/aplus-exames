# APProva+ — hotfix do ícone no launcher Xiaomi (30/10/2026)

## Evidência
A captura real enviada pelo utilizador exibe um contorno azul-escuro muito grosso e o Apronso reduzido. O PWA manifest oferece uma variante maskable com a arte reduzida para 78% da largura sobre um fundo navy; este inset provoca o aspeto que foi rejeitado.

## Solução limitada, sem redesenho
- Reutilizar byte a byte o mesmo PNG aprovado (icon-192/icon-512) como maskable-192/maskable-512. Sem escala de 78%, moldura nova, recoloração, reposicionamento do Apronso ou do sinal +.
- Preservar ícones iOS/favicon, assinatura e segunda imagem do ecrã interno de abertura.
- Versionar apenas os 4 URLs de ícones do manifest para solicitar ao WebAPK atualização sem alterar id, scope, start_url ou display.
- Reforçar testes Playwright de cantos para detectar novamente a margem navy de maskable.

## Limitações
- Em launchers Android com máscara circular, uma variante full-bleed pode perder pormenores próximos dos cantos; no Xiaomi de referência a captura é quadrada arredondada. Uma variante com margem segura de 78% tem maior compatibilidade com círculos, mas provoca o contorno navy espesso rejeitado. Este hotfix privilegia correspondência ao ícone aprovado no dispositivo de referência e requer teste visual real.
- O Android/Chrome pode adiar a atualização do ícone instalado. O splash nativo do WebAPK continua controlado pelo sistema; o splash interno escolhido permanece inalterado.
- Não há alterações a sessões, XP, diagnóstico, dados, corretor ou outras áreas de produto.
