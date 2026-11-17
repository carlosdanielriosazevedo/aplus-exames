# Segunda revisão por IA: resultado (2026-11-17)

**Revisor:** ChatGPT, numa conversa sem histórico.
**Amostra:** 154 perguntas (`segunda-revisao-ia-amostra.md`).
**Veredito do revisor:** aprovação condicionada. Nenhuma chave errada, nenhum erro de cálculo.

Antes de corrigir, cada problema foi confirmado no código e no conteúdo.

## Graves (confirmados e corrigidos)

| Pergunta | Problema | Confirmação | Correção |
|---|---|---|---|
| `FQA-AUTH-EQ-D1` | O diagrama mostrava a resposta («favorecer sentido endotérmico»). | `PhysicsChemistryStimulus` mostra `node.note` ao aluno. | Nó substituído por «Resposta do sistema?». |
| `FQA-AUTH-ENE-D1` | As notas do diagrama diziam «em série» e «aos terminais do resistor». | Igual. | O diagrama mostra os aparelhos sem a ligação. Revistos também os outros 5 diagramas: nenhum revela a resposta. |
| `PT639-PASSAGE-LEITURA-003-Q2` | Dois distratores defensáveis. | Confirmado. | Substituídos por opções contrariadas pelo texto. |

## Médios (corrigidos)

- **`PT639-FND-298`, `PT639-FND-248` e `PT639-FND-224` (discurso indireto):** faltava o contexto temporal do relato e uma delas aceitava «amanhã». O contexto ficou explícito e só se aceita o deítico ajustado. A FND-224 não estava na amostra, mas tinha o mesmo defeito.
- **`PT639-FND-263`:** o enunciado listava as etapas já pela ordem pedida. Passaram a estar baralhadas.
- **`FQA-V2-PERIOD-V5`:** a formulação dava a entender que o halogéneo ganha sempre um eletrão. Ficou «Na formação de um ião monoatómico…».
- **`PT639-PASSAGE-11-LEITURA-001-Q1`:** a chave falava em «definição inicial», mas o texto começa por corrigir uma ideia comum. Chave reformulada.
- **`PT639-PASSAGE-LIT-003-Q2`:** dois distratores simbolicamente defensáveis. Substituídos.

## Transversais

- **Corretor das respostas curtas:** comparava só o texto exato. Passou a ignorar enquadramentos como «é», «o/a» ou «desempenha a função de», retirados dos dois lados (`shortAnswerCore`). Continua por resolver um problema maior: 47 das 79 respostas curtas são interpretativas, e uma lista fechada de respostas aceites rejeita formulações corretas. Isto exige uma decisão de produto.
- **Distratores absurdos e perguntas quase repetidas em FQ:** ficam para a próxima vaga editorial.
- **Literatura sem excerto:** já identificado na primeira revisão. É candidata a reescrita.

## Leitura da taxa de erro

A amostra continha 17 perguntas de Português já corrigidas na primeira revisão, para verificar essas correções. Duas das perguntas de texto já tinham sido mexidas e mesmo assim falharam: LEITURA-003-Q2 e LIT-003-Q2. Há ainda 1 problema grave em 33 perguntas de texto, uma taxa demasiado alta para as perguntas de unicidade. As perguntas de texto dos mini-exames (57) devem ter uma terceira leitura focada só na unicidade da chave.
