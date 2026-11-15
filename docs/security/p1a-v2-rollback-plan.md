# P1-A v2 — Plano de recuperação e rollback (formatos legado e v2)

**Estado: plano. Nada disto foi implementado nem executado contra produção.** Provas: local, com dados sintéticos.

## 1. Factos demonstrados

Gate `tests/scripts/rollback-candidate-probe.mjs`. Um dispositivo v2 real fechado de forma limpa (registo IndexedDB, marcador e selo coerentes), com progresso v2 de 7777 XP e um legado mais antigo de 1234 XP:

| Build | Mostra o progresso v2 | XP, histórico e recibos v2 preservados | Grava o legado | Candidata? |
|---|---|---|---|---|
| `main` 118021d | **não** (mostra 1234) | sim (não toca em `a25-ws-v2:*`) | **sim** | **não** |
| v2 (este ramo) | sim | sim | não | sim |

O `main` não enumera nem limpa o `localStorage` (`git grep` sem `clear()` nem `key(i)` em `app/`). Por isso, com o `main`, o progresso v2 **sobrevive mas fica invisível**, e o aluno continua a estudar sobre o estado antigo, criando uma segunda história. Executar o `main` **não é** um rollback seguro.

## 2. Regra de compatibilidade

O formato de armazenamento só avança. Depois de um dispositivo ter gravado em `a25-ws-v2:*`, **qualquer** build servida a esse dispositivo tem de passar o gate acima:
1. lê e mostra o canónico v2;
2. não perde XP, histórico, rascunhos nem recibos D3 v2;
3. não grava as chaves legadas;
4. mantém o ecrã de cópias de recuperação, o diário de restauro e o marcador de importação.

## 3. Opções, por ordem de preferência

### R1 — Rollback de funcionalidades, não de armazenamento (preferida)
Build de "ponte": o código da app a reverter **mais** a camada de armazenamento v2 inalterada (`academicKeys.js`, `accountWorkspace.js`, `stateWriter.js`, `recoveryCopies.js`, `stateRecovery.js` e a deteção de progresso em `app/page.js`).
- Antes de servir: o gate de rollback, os 3 ficheiros unitários P1-A v2, `tests/browser-p1` e o contrato `p1-v2-account-isolation`.
- Não toca nos dados de nenhum dispositivo.

### R2 — Build de consulta e exportação (se o defeito estiver na própria camada v2)
Mesma camada de leitura v2, com todas as gravações académicas bloqueadas (como `blockAcademicWritesOnThisPage`).
- Mostra o progresso v2 e o legado; permite descarregar o conjunto canónico, o legado e as cópias de recuperação.
- Nenhum byte é alterado. Serve até haver uma correção que avance.

### R3 — Regresso ao formato legado (por aluno, explícito; não automático)
Só dentro de uma build de ponte, como escritor com prova:
1. comparar as impressões digitais do legado atual com as do marcador de importação; se o legado mudou desde a importação (houve uso de uma versão antiga), guardar primeiro esse legado como cópia;
2. gravar cópias de segurança de ambos os conjuntos;
3. diário + escrita do conjunto canónico nas 9 chaves legadas (mesma resolução do restauro);
4. marcar `downgraded` no espaço canónico, **sem apagar** `a25-ws-v2:*`.

Só depois disto o `main` mostraria o progresso certo. Mesmo assim, o trabalho feito no `main` volta a ser "legado alterado" no regresso ao v2, e a deteção e a cópia já existentes protegem-no.

**Proibido:** servir o `main` tal como está a dispositivos com dados v2; apagar `a25-ws-v2:*`; migração automática para o legado.

## 4. Contas
O `main` não tem áreas por conta. Num rollback para o `main`, os alunos com conta não veriam **nenhum** progresso próprio: nem o v2 (`a25-ws-v2:acct:*`) nem o F5 (`a25-account-v1:*`). Esta é mais uma razão para o `main` não ser uma candidata.

## 5. Limites
- O gate não prova ausência de defeitos noutras funcionalidades da build de ponte; prova só a compatibilidade de armazenamento.
- R3 não está implementado. Qualquer implementação precisa da mesma matriz de interrupções do restauro (9 escritas × quota/erro/fecho/reload).

## 6. Estado (NO-GO #462, branch local `experimental/p1a-v2-no-go-fixes`)
- R2: **laboratório** implementado (`app/lib/rollbackR2.js`, `tests/unit/p1V2RollbackR2Lab.test.mjs`); build R2 **não** implementada. Ver `p1a-v2-rollback-r2.md`.
- R1 e R3: continuam só plano. O `main` continua a **não** ser candidata.
