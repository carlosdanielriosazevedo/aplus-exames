# P1-A v2 — Correção do NO-GO da auditoria independente da PR #462

Branch local `experimental/p1a-v2-no-go-fixes`, criada a partir de `2da87fb` (cabeça da #462, que fica congelada). Sem push, sem PR, sem deployment. Dados exclusivamente sintéticos.

## Estado: o que está implementado e o que é só proposta

| Tema | Estado |
|---|---|
| Diário de restauro fail-closed, diário antigo nunca substitui progresso | **implementado** + testes |
| Cópias necessárias a um restauro pendente protegidas | **implementado** + testes |
| Consistência D3 no restauro; cópias v1 parciais bloqueadas | **implementado** + testes |
| `confirmAcademicWrite()` fail-closed; escrita exclusiva sem Web Locks recusada | **implementado** + testes |
| Cofre de cópias em retenção / só consulta / conflito (descarregar e libertar espaço) | **implementado** + teste Chromium |
| Candidata R2 de consulta e exportação | **só laboratório** (módulo + testes; sem rota, sem build R2) |
| Evolução do gate #385 e do contrato sombra | **só proposta** (`p1a-v2-gates-evolution.md`) |
| Limpeza seletiva de dados após logout / retirada de consentimento | **só proposta** (`p1a-v2-privacy-retention.md`) |

## Regras novas (fase 1)

1. **Diário** (`recoveryCopies.js`):
   - `restoreJournalState()` é fail-closed: uma leitura impossível ou um diário ilegível contam como pendente (`unknown`), nunca como ausente.
   - A resolução só conclui se a releitura provar que o diário foi apagado. Caso contrário devolve `blocked/journal_not_cleared` e o escritor fica só em consulta.
   - **Diário antigo.** Cada chave atual tem de ser igual à do alvo ou à da segurança. Qualquer outro byte é tratado como progresso mais recente: devolve `blocked/stale_journal` e nada é reescrito.
   - Antes de reescrever um conjunto misto, o conjunto encontrado é gravado como cópia durável (`journal_resolution_found`). Sem espaço para essa cópia, devolve `blocked/no_space_for_found_copy`.
2. **Nenhuma gravação académica com diário presente.** `confirmAcademicWrite()` recusa todas as 9 chaves e passa o separador a só consulta.
3. **Restauro** (`stateRecovery.js`):
   - O alvo e a segurança são cópias próprias do restauro, sem `dedupe`. A cópia escolhida pelo aluno nunca sustenta o diário.
   - `clearRestoreJournal()` é verificado nos dois percursos (sucesso e reposição). Se falhar, o separador para de gravar.
4. **Cópias referenciadas.**
   - `deleteRecoveryCopy` recusa com `copy_in_use`.
   - `writeRecoveryCopy` com `id` fixo (a cópia rotativa) recusa substituir uma cópia referenciada.
   - Com o diário ilegível, todas as cópias do âmbito contam como referenciadas.
5. **D3.**
   - O restauro é recusado (`d3_orphan_receipts`) quando um recibo `committed` não corresponde a nenhuma avaliação num dos estados do conjunto. A prova usada é a mesma da app: `recordedCompletionIds`/`stateRecordsCompletion`.
   - As cópias parciais (v1, só estado) não são restauráveis (`partial_copy`); continuam disponíveis para consulta e descarga.
6. **Fail-closed.**
   - `confirmAcademicWrite()` recusa quando a leitura falha, quando a chave está fora da linha de base do escritor (por exemplo, outra área) ou quando há diário.
   - `withExclusiveStateWrite` sem Web Locks já não executa a escrita.
7. **Decisão explícita** (`keepCurrentAndDiscardJournal`): perante um diário não resolúvel automaticamente, o aluno pode manter o progresso atual, só depois de ficar gravada uma cópia durável dele. Um restauro ainda resolúvel é recusado (`resolvable`).

## Fase 2 — Cofre de cópias

- O ecrã de cópias abre em `readonly`, `verifying` (retenção) e `conflict`: consultar, descarregar e apagar cópias já descarregadas.
- Restaurar continua a exigir o separador escritor.
- Uma cópia de recuperação não é uma chave académica: apagá-la não precisa de exclusão. Só tem de não ser necessária a um diário.
- **Texto corrigido:** a quota do `localStorage` é da origem, por isso apagar dados de outros sites não ajuda.

## Reproduções antes/depois

| Cenário | SHA `2da87fb` | Esta branch |
|---|---|---|
| r1 diário não apagável, progresso novo | progresso novo substituído (500 XP → 300) | só consulta até o diário ser apagado; depois o progresso novo fica intacto |
| r1' diário antigo residual | `completed_forward` por cima de 500 XP | `stale_journal`, nada reescrito, decisão do aluno com cópia |
| r2 cópia escolhida apagada com o diário pendente | `rolled_back` (500 XP → 100) | o alvo e a segurança não se podem apagar; a cópia escolhida pode, e o restauro conclui igual |
| r4 retenção com quota cheia (Chromium) | impasse (sem saída na UI) | descarregar e apagar uma cópia antiga, adotar, 9 chaves intactas |
| r5 `getItem` falha na confirmação | escrita aceite (999 XP perdidos) | recusada nas 9 chaves |
| r6 cópia v1 parcial | s2 "concluída" sem resultado | `partial_copy`; e `d3_orphan_receipts` para cópias completas inconsistentes |
| r3 rollback para o `main` | o `main` mostra o legado | não corrigível no `main`; R2 de laboratório mostra e exporta o v2 sem escrever |

## Testes alterados (2, fase 1)

1. `p1V2CanonicalWorkspace` "separador de versão anterior". A fixture dava recibos `committed` para missões sem `completionId`. Pela definição da própria app (`stateRecordsCompletion`), isso são recibos órfãos. Passou a ter `completionId`; as asserções e os valores ficaram iguais.
2. `p1V2CanonicalWorkspace` "cópias da #461 (v1)". O restauro de uma cópia v1 **parcial** passou a ser recusado (é a alteração pedida), com prova de que nada mudou. Foi acrescentado o restauro de uma cópia v1 **completa** com a mesma verificação de XP (66).

## Limitações

- O impasse de quota só é provado no Chromium (build de produção local, porta própria). Os outros motores não foram testados.
- Um separador que passa a só consulta a meio da sessão (diário detetado) mostra o ecrã de consulta sem resumo: o resumo só é lido no arranque.
- Num diário `stale_journal` a app não sabe qual conjunto o aluno quer. A decisão é dele e os três conjuntos ficam guardados.
- O gate de mutação corre só os testes unitários P1-A v2. O teste Chromium r4 não está no gate.
