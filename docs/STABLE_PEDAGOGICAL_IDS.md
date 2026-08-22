# IDs pedagógicos estáveis — v4.1

## Problema

Até v4.0, a app usava em vários pontos o texto visível de uma competência como parte
da identidade interna, por exemplo:

`11-cd|Monotonia e extremos`

Isto é perigoso. Alterar a copy para “Monotonia, sinal e extremos” não deveria criar
uma competência nova nem separar evidência antiga da nova.

## Modelo v4.1

Cada tema continua a ter um ID estável (`11-cd`, `12-prob`, etc.).

Cada foco passa também a ter um ID estável independente do texto:

- `mc-11-cd-derivadas`
- `mc-11-cd-monotonia-e-extremos`
- `mc-11-cd-otimizacao`
- etc.

No total atual existem 69 microcompetências estáveis.

O label continua separado e pode evoluir na interface.

## Aliases

O primeiro label de cada microcompetência fica guardado como alias legado.
Assim, estados antigos que só conheciam o texto conseguem ser migrados mesmo depois
de alterações futuras de copy, desde que o alias seja preservado.

## Questões

As 93 questões atuais recebem `microcompetencyId`.

A regra passa a ser:

- uma questão tem um tema;
- uma questão tem uma microcompetência primária estável;
- o texto do foco é apenas apresentação.

## Evidência

Nova evidência guarda simultaneamente:

- `themeId`;
- `microcompetencyId`;
- `focus` (snapshot legível do label).

O motor calcula scores por `microcompetencyId`.
O label não é necessário para recuperar a evidência.

## Pré-requisitos

Foi criado `MICRO_PREREQUISITES`, cujo grafo usa IDs estáveis.
O mapa antigo baseado em labels é mantido temporariamente apenas para compatibilidade
e não deve ser usado em novas decisões do motor.

## Memória pedagógica

Hipóteses causais passam a guardar:

- `targetMicrocompetencyId`;
- `prerequisiteMicrocompetencyId`;
- chave causal construída com IDs estáveis.

## Migração

`migratePedagogicalIds(state)` atualiza automaticamente estados antigos ao carregar:

- evidência;
- histórico de Missões;
- sinais de Treino Livre;
- última Missão;
- hipóteses causais.

A migração é backward-compatible e marca `pedagogicalIdVersion: 1`.

## Cloud

O envelope de progresso passa para `aplus-student-state-v3`.
Leitura continua compatível com v1 e v2.

## Invariante principal

> Mudar o nome que o aluno vê nunca pode mudar aquilo que o motor pensa que a competência é.
