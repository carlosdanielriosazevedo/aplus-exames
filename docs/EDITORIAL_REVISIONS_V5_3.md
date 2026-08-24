# Revisões Editoriais Versionadas — v5.3

## Problema resolvido

A v5.2 tornou o fluxo de aprovação por professor operacional, mas ainda existia um
buraco importante no caminho real:

1. professor revê uma questão;
2. escolhe ALTERAR;
3. a equipa precisa de modificar a questão;
4. é necessário preservar a versão anterior;
5. a nova versão não pode herdar a aprovação antiga;
6. o motor tem de passar a usar a nova versão;
7. a questão tem de voltar à revisão.

A v5.3 fecha este ciclo.

## Editor antes/depois

No painel interno de revisão, cada questão passa a ter:

**Preparar alteração editorial desta questão**

O editor permite alterar:

- enunciado;
- quatro opções;
- resposta correta;
- resolução;
- hipótese de erro;
- tipo cognitivo;
- dificuldade D1–D5.

IDs pedagógicos, tema, microcompetência, origem e identificadores técnicos não podem
ser modificados por este fluxo.

Se a alteração mudar pedagogicamente a identidade da questão, deve ser criada uma
nova questão em vez de reutilizar o mesmo ID.

## Diff explícito

Antes de aplicar a revisão, a app mostra:

- campo alterado;
- valor ANTES;
- valor DEPOIS;
- fingerprint anterior;
- fingerprint novo.

A proposta só pode ser aplicada quando a estrutura é válida.

Exemplos de bloqueios automáticos:

- opção vazia;
- opções duplicadas;
- resposta correta fora de A–D;
- resolução vazia;
- hipótese de erro vazia;
- dificuldade fora de D1–D5;
- proposta sem qualquer alteração.

## Nova versão

Quando uma alteração é aplicada:

`v1 reviewed → v2 pending`

ou, de forma geral:

`vN → vN+1`

A nova versão:

- guarda o patch editorial;
- perde a aprovação anterior;
- perde o checklist anterior;
- volta a `A rever`;
- recebe novo fingerprint;
- mantém histórico completo da versão anterior.

## Uso pelo motor

A versão efetiva da questão é construída por overlay:

`QUESTION_BANK original + contentPatch editorial`

Isto significa que a equipa não precisa de duplicar IDs nem criar uma segunda
questão temporária apenas para testar uma correção.

### Modos internos

No modo de desenvolvimento / beta de experiência, o motor pode usar o patch
editorial para permitir testar a nova redação.

### Beta pedagógica e produção

Uma nova versão `pending` não é elegível para Missões/Diagnóstico/Exame de uma beta
pedagógica fechada nem para produção.

Só volta a ser elegível depois de um professor aprovar exatamente o fingerprint da
nova versão.

## Reversão

Uma revisão pode ser revertida.

Mas reverter não ressuscita automaticamente uma aprovação antiga.

Exemplo:

- v1 aprovada;
- v2 altera enunciado;
- equipa decide voltar ao texto de v1;
- é criada v3 com o conteúdo restaurado;
- v3 continua `pending`.

Isto é deliberado: o estado editorial é versionado, e uma nova versão exige nova
decisão consciente.

## Proteção dos IDs estáveis

Mesmo que um patch seja manipulado manualmente e tente alterar:

- `id`;
- `themeId`;
- `microcompetencyId`;

`effectiveEditorialItem()` preserva sempre os valores estruturais originais.

Assim uma edição de texto não consegue, por acidente, mover evidência histórica
para outra competência.

## Histórico

Cada questão passa a poder guardar `revisionHistory`, incluindo:

- revision ID;
- editor;
- professor que pediu alteração;
- nota;
- versão anterior e nova;
- fingerprint anterior e novo;
- patch anterior;
- patch novo;
- campos alterados;
- rollback, quando aplicável.

O painel apresenta este histórico separadamente das decisões de revisão.

## Integração com o roadmap do professor

Depois de ALTERAR/BLOQUEAR ou de aplicar uma nova versão:

- o item deixa de contar como aprovado;
- readiness é recalculado;
- o roadmap mínimo é recalculado;
- os lotes seguintes podem mudar.

Portanto, o processo operacional recomendado continua a ser:

1. enviar um lote;
2. importar as decisões;
3. corrigir alterações pedidas;
4. reexportar/recalcular;
5. só depois enviar o lote seguinte.

## Estado

A v5.3 não aumenta artificialmente o readiness.

Sem aprovações reais de professor:

- readiness: 10%;
- beta pedagógica fechada: NO-GO;
- Technical Gate: GO.
