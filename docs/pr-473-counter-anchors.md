# PR #473 — âncoras internas de streak e XP

Correção limitada à composição visual de `StudentTop`, na branch existente
`bot/approva-ui-issue-468`. A PR permanece Draft. Não modifica cálculo de XP,
streak, recompensas, progresso, autenticação, recuperação ou conteúdo pedagógico.
Não implementa a issue #469.

## Defeito e correção

O botão tinha largura fixa, mas centrava conjuntamente o emoji e o número.
Quando o texto crescia, a chama e o troféu moviam-se. Medir apenas o botão
exterior não detetava esse deslocamento.

Cada emoji passa a ter um `span` decorativo com `aria-hidden`, numa coluna de
dimensão fixa: 16 px em mobile e 20 px em desktop. Uma segunda coluna reserva
o espaço restante para o número, alinhado ao início. Mantêm-se os botões,
respetivas áreas de interação, nomes acessíveis e slots exteriores existentes.
A largura real do número pode crescer; não se trunca nem se abrevia o valor.

O JSON histórico `measurements/pr-473-counter-before.json` contém 72 medições
reais anteriores à correção: seis larguras × três disciplinas × dois menus ×
dois estados. Foi recolhido no build local pré-existente, cuja árvore `app/`
era idêntica à do HEAD auditado `a51f0260036416909c56491fb234b86ca522fae8`.
O browser local é Chromium 154, com movimento reduzido e modo interno.

| Larguras | Chama antes: 1 → 365 | Troféu antes: 1 → 123456 |
|---|---:|---:|
| 320, 360, 390, 759 px | 6,859375 px | 17,15625 px |
| 761, 1440 px | 8,578125 px | 21,453125 px |

## Contrato de testes

A matriz existente continua a ter 48 sementes: seis larguras, movimento normal
e reduzido, modo interno e beta privada, valores curtos e longos. Cada semente
percorre Aprender/Treinar nas três disciplinas por navegação real, sem reload.
Preservam-se as comparações do hero, Apronso, faixa privada, textos longos,
recuperação e ecrãs auxiliares com StudentTop/Shell e Voltar.

Além do botão exterior, a medição agora regista:

- DOMRect da célula do ícone e Range do próprio glifo;
- DOMRect do número e Range do texto numérico;
- contenção no botão e viewport, overflow local e sobreposição ícone/número.

A tolerância continua a ser 2 px. Para os ícones comparam-se posição e dimensão;
para o número comparam-se origem e altura, permitindo a largura intrínseca
diferente. A matriz compara estes dados entre menus, disciplinas, sementes
curtas/longas e beta privada, exigindo ausência do XP nesta última.

As sondas anteriores ao clique, microtask e primeiros três RAF de navegação real
também incluem os contadores. Em cada um dos 288 estados principais há ainda
um stress de apresentação no mesmo DOM: streak 365/XP 1 e streak 1/XP 123456,
incluindo XP oculto. Mede-se a mutação, microtask, primeiros três RAF e restauro
— 11 amostras por estado, 3168 amostras adicionais. Os nomes acessíveis são
atualizados durante o stress e restaurados no fim. Esta sonda não altera os
dados académicos nem simula a atribuição de XP através de uma sessão de estudo;
as sementes anteriores continuam a validar os renders reais de React.

Os unitários do contrato rejeitam deslocamento interno mesmo com botão e célula
imóveis, mudança de origem numérica, medições ausentes e overflow/sobreposição.
Verificam também que o novo contrato rejeita as 36 comparações históricas do
defeito auditado, e que uma largura numérica diferente é aceite.

## Evidência e validação

O reporter mantém os gates completos anteriores e publica no artefacto browser:

- `workspace-matrix/counter-before.json`: medições brutas históricas;
- `workspace-matrix/counter-measurements.json`: medições atuais e frames;
- `workspace-matrix/counter-comparison.json`: máximos antes/depois por largura;
- `raw-cases.json`, `cross-state-comparison.json`, `artifacts.json` e JSONs por cenário;
- PNGs comparativos de valores curtos/longos, beta privada e textos longos, nas
  seis larguras e três disciplinas.

O reporter verifica também as 11 amostras adicionais por estado. Dados ou PNGs
obrigatórios ausentes continuam a falhar o CI; não há aumento de tolerâncias,
timeouts, retries ou exclusões. A configuração e workflow do Beta CI não mudam.

Executar `npm run syntax:audit`, `npm run test:unit`, `npm run technical:gate`,
`npm run build` (inclui budgets), os cenários específicos e a suite browser
completa. A execução do Beta CI e os resultados finais do HEAD estão vinculados
na descrição da PR #473.

Validação local específica: 24/24 cenários de movimento reduzido (todas as
larguras, ambos os contextos e valores), 1584 amostras adicionais; desvio máximo
dos ícones e origens numéricas de 0 px em todas as larguras. Unitários: 876/876;
sintaxe, Technical Gate, build e budgets aprovados. A suite completa acrescenta
os cenários de movimento normal e todas as regressões anteriores.

## Limites

Os números exercitados são streak 1/365 e XP 1/123456, com as combinações
independentes adicionais de apresentação descritas acima. Não se afirma uma
verificação de inteiros de dimensão arbitrária. A navegação é real; a mutação
numérica adicional é uma sonda de layout, não um percurso de atribuição de XP.

Mantêm-se os limites da matriz anterior para ecrãs auxiliares, estados académicos,
outros browsers, fontes/zoom e dispositivos físicos. Localmente usam-se Chromium
e FFmpeg instalados no sistema, porque o download do runtime Playwright recebe
403 neste ambiente. O CI usa o runtime Playwright habitual, sem alterações.
