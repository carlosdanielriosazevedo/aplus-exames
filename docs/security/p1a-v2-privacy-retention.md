# P1-A v2 — Dados que permanecem no dispositivo após logout e retirada de consentimento (inventário + PROPOSTA)

**Estado: inventário verificado no código desta branch; limpeza só proposta, nada implementado.**

## 1. Depois de "Terminar sessão"

`AccountCloud.signout()` só termina a sessão cloud ("O progresso local continua neste dispositivo"). No dispositivo ficam:

| Dados | Chaves | Conteúdo | Quem os lê depois |
|---|---|---|---|
| Progresso v2 da conta | `a25-ws-v2:acct:<A>:*` (9 chaves) | estado, rascunhos com respostas, recibos D3, memória de escrita PT | só a área de A (testado: B e "sem conta" não leem) |
| Legado F5 da conta | `a25-account-v1:<A>:*` | cópia do estado anterior à v2 (nunca apagada pela v2) | ninguém na v2; o `main` não o lê |
| Cópias de recuperação | `a25-ws-v2:acct:<A>:~recovery:*` | conjuntos completos das 9 chaves, **sem limite de número nem prazo** | só a área de A |
| Cópias v1 (#461) | `a25-account-v1:<A>:a25-state-*-v1:*` | estado | listadas, **nunca apagáveis** |
| Cloud: filas e snapshots | `a25-cloud-pending-v2:*`, `a25-cloud-snapshot-v2:*`, `a25-cloud-recovery-v2:*` (+ v1) | estado completo, com `accountId` | filtrados por conta na leitura; bytes em claro |
| Quarentena D1 | `a25-completed-sessions-v1-quarantine-*` | recibos ilegíveis | — |
| Validação da correção | `aplus-grader-validation-local-v1` | respostas recolhidas com consentimento | área da conta |
| Mandato | IndexedDB `approva-state-writer-v2` | tab/epoch | técnico |

O isolamento lógico funciona: a conta B e o modo sem conta não leem os dados de A. Os testes estão em `p1V2NoGoRegressions` › isolamento A/B e logout.

O risco é **físico**: num computador partilhado (escola), quem abrir as ferramentas do browser lê tudo em claro. A v2 multiplica as cópias: canónico, legado, cópias e filas cloud.

## 2. Depois de retirar o consentimento do piloto

`coordinatedClearLocalPilotTelemetry` remove os campos `pilotAggregates`, `pilotItemResults`, `betaFeedback`, `betaSessions` e `betaEvents` **apenas** das chaves de estado canónicas (`a25`, `a25-friends-beta`) da área atual. Esses campos **continuam** em:

- cópias de recuperação v2 e v1 (cada uma tem o estado completo);
- chaves legadas (`a25`, `a25-account-v1:<A>:a25`);
- filas e snapshots cloud locais;
- outras áreas (contas) do mesmo dispositivo.

**Alteração introduzida nesta branch, com impacto na privacidade:** sem Web Locks, `withExclusiveStateWrite` deixou de gravar (fail-closed, fase 1). Nesses browsers, a retirada de consentimento **deixa de limpar** a telemetria local do estado (o envio para o servidor é tratado à parte). É um compromisso explícito entre integridade e privacidade e precisa de decisão; ver a proposta P4.

## 3. Limpeza seletiva proposta (compatível com a recuperação)

Princípios: nunca apagar a única cópia de progresso académico; nunca apagar o que um diário pendente referencia; tudo por decisão explícita e com exportação oferecida antes.

- **P1 · "Remover os meus dados deste dispositivo"** (por área, após logout):
  1. Exportação R2 da área (`rollbackR2.r2Export`).
  2. Confirmação explícita.
  3. Remoção do legado, das cópias v1/v2, das filas cloud da conta e das 9 chaves canónicas. Bloqueada enquanto houver diário pendente ou entradas cloud por enviar, a não ser que o aluno aceite perdê-las depois de as descarregar.
  4. Verificação por releitura.
- **P2 · Retenção das cópias:** limite por área (por exemplo, as 10 mais recentes, mais as referenciadas). As mais antigas são propostas para descarga e remoção, nunca removidas sem decisão.
- **P3 · Consentimento:** ao retirar, aplicar a mesma remoção de campos às cópias v2 e às filas cloud da área. Isto exige reescrever cópias, que hoje são imutáveis. Proposta: um marcador `telemetry-withdrawn-at`, filtrado na exportação e na restauração, em vez de reescrever bytes.
- **P4 · Sem Web Locks:** gravar um marcador de "purga pendente" não académico, aplicado pelo próximo escritor com exclusão comprovada. Nunca gravar o estado sem exclusão.
- **P5 · Cópias v1:** permitir a remoção depois de descarregadas e de existir uma cópia v2 equivalente.

Nenhuma destas propostas está implementada. Todas precisam de testes de interrupção (falha a meio da remoção) ao nível da matriz do restauro.
