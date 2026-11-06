# P1-A v2 — Espaço canónico próprio, prova com duas testemunhas e recuperação utilizável

Correção do NO-GO da PR #461 (SHA `ee33d54`). Ramo local `audit/p1a-v2-canonical`. A PR #461 fica intacta. Dados exclusivamente sintéticos.

## Decisão: separar o armazenamento canónico

O `main` (produção) grava o estado inteiro a partir da memória nas chaves brutas (`a25`, …) e **não verifica nada antes de gravar**. A #459/#461 grava `a25-account-v1:<conta>:*`. Na mesma chave, um separador antigo sobrescreve sempre; não há bloqueio do lado novo que o impeça. Subir `_stateVersion` trava a #461, mas não o `main`.

Por isso, as 9 chaves académicas passam a viver em `a25-ws-v2:<global|acct:conta>:<chave>` (`app/lib/academicKeys.js`). As chaves legadas ficam **só de leitura** para esta versão.

| Mecanismo | Onde | Garantia |
|---|---|---|
| Namespace canónico | `accountWorkspace.accountStorageKey/accountStorage` | Só com coordenação ativa. Sem coordenação (servidor, harness #385), o formato é o anterior. Os 6 ficheiros congelados pelo #385 não foram alterados |
| Importação única | `stateWriter.syncLegacy` (dentro de `startMandate`) | Só com o mandato provado ou depois de recuperação explícita. Byte a byte; marcador `importing→done`; nunca importa por cima de dados canónicos. O `sessionStorage` também é importado (localStorage bloqueado) |
| Escrita de versão antiga | `syncLegacy` (hidratação e evento `storage`) | O canónico não é tocado. O conjunto legado fica numa cópia restaurável ("legado mais recente", rotativa; os bytes também ficam nas próprias chaves legadas) e o aluno é avisado |
| Duas testemunhas | IndexedDB `approva-state-writer-v2` (durabilidade `strict`) + marcador `~writer-mandate` | Sem registo, mas com marcador ou dados → `register_missing`. Marcador ≠ registo com o selo visível → `register_mismatch`. Ambos levam a retenção imediata |
| Selo | `~writer-seal` | `tab` + `epoch` obrigatórios. O `pagehide` volta a gravar marcador e selo |
| Todas as chaves | `onStorage` + `confirmAcademicWrite` | Vigia as 9 chaves canónicas. Cada escrita confirma os bytes atuais face à linha de base do mandato. Diferença → para, guarda dois conjuntos ("deste separador", com o estado em memória, e "recebido") e recusa a escrita |
| IndexedDB com falha | `verifyMandate/startMandate` | Leitura ou escrita falhada → só consulta, nada escrito |
| Sem espaço para importar | `startMandate` | Só consulta, com o motivo verdadeiro. Nada é apagado. Com espaço, importa |
| Recuperação | `recoveryCopies.js`, `stateRecovery.js`, ecrã "Cópias de recuperação" | Restaurar só como escritor; valida D2; guarda o atual (`before_restore`, durável) primeiro; escreve o conjunto inteiro; confirma por releitura; desfaz chave a chave se falhar; recarrega sem gravar a memória antiga. Descarregar (JSON). Apagar só cópias v2 e só depois de descarregar. As cópias v1 da #461 são listadas e restauráveis |
| Restauro interrompido | `recoveryCopies.resolveRestoreJournal` (no início de cada mandato) | **Não é atómico** (o localStorage não tem transações). Antes da 1.ª das 9 escritas grava-se um diário com o conjunto-alvo fixado e a cópia de segurança. Na abertura seguinte, antes de hidratar: igual ao alvo ou à segurança → concluído; misto → completar para o alvo; senão → repor a segurança; senão → só consulta (`restore_incomplete`), sem gravar por cima. Provado após cada uma das 9 escritas × quota/erro/fecho abrupto/reload |
| Progresso v2 sem conta + primeira conta (P1-C) | `legacyWorkspacePresent` | `a25-ws-v2:global:*` conta como progresso sem dono: aviso, nunca atribuído |
| Aviso de versão anterior | marcador `noticePending` | Fica pendente até o aluno o ver num separador escritor (não se perde num separador bloqueado ou fechado) |
| Acumulação | `writeRecoveryCopy({dedupe})` | Um conjunto idêntico a uma cópia existente reutiliza-a |
| `withExclusiveStateWrite` | | Sem recurso "escrever sem lock" quando há erro; `write()` nunca corre duas vezes |

## O que isto NÃO resolve (riscos residuais)
1. **Rollback para o `main`**: o `main` lê o legado e não vê o progresso feito no v2. Não se perde (fica no v2 e pode ser descarregado), mas fica invisível. Bloqueante para alunos reais sem um plano de exportação/importação inversa.
2. **Sem fusão**: restaurar escolhe um conjunto inteiro; o outro fica guardado. Não há fusão por sessão (regras de XP por validar).
3. **`main` contra `main`**: dois separadores antigos continuam a sobrescrever-se no legado (é o comportamento atual de produção). A cópia rotativa só guarda o mais recente.
4. A ordem de entrega do localStorage entre chaves continua a ser um pressuposto (Chromium; não testado em Firefox/Safari).
5. Sem espaço no momento da atualização, o aluno fica em consulta até libertar espaço.
6. A confirmação por releitura do localStorage prova a cache do renderer, não a persistência em disco.

## Documentos relacionados
- `p1a-v2-rollback-plan.md`: plano de rollback e gate de candidata (`tests/scripts/rollback-candidate-probe.mjs`).
- `p1a-v2-key-inventory.md`: as 9 chaves, chaves e rotas fora delas, e escritas sem guarda.

## Testes
- Novos: `tests/unit/p1V2CanonicalWorkspace.test.mjs`, `p1V2RestoreInterruption.test.mjs` (37: 9 escritas × 4 falhas + quota persistente), `p1V2KeyInventory.test.mjs`; Chromium `tests/browser-p1/v2-legacy-tab.pw.mjs` (6) e o contrato com contas `tests/scripts/p1-v2-account-isolation-browser-contract.mjs` (5). Mais um teste em `storage-durability.spec.mjs` (armazenamento cheio no primeiro arranque).
- Adaptações aos testes existentes: `docs/security/p1a-v2-test-adaptations-audit.md`.
