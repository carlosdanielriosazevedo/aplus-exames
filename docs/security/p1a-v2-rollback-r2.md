# P1-A v2 — Candidata R2 (consulta e exportação): desenho e laboratório

**Estado: só laboratório.** `app/lib/rollbackR2.js` não está ligado a nenhuma rota nem ao arranque da app. Não existe build R2. Nenhum rollback foi executado.

## O que o laboratório prova (`tests/unit/p1V2RollbackR2Lab.test.mjs`)
Dispositivo sintético com:
- legado do `main` (1234 XP);
- v2 global (7777 XP, histórico, rascunhos, recibos, memória de escrita);
- v2 de conta com diário pendente;
- cópias v1 e v2;
- um id técnico.

O armazenamento está **congelado**: `setItem`, `removeItem` e `clear` falham e ficam registados. Resultados:
- a R2 mostra 7777 (v2) e não 1234 (legado); o `main` mostraria 1234 (r3);
- a exportação contém os bytes exatos das 9 chaves, do legado, das cópias e das chaves internas, com impressões digitais;
- a exportação de uma área não contém bytes de outra;
- 0 tentativas de escrita; bytes antes e depois iguais;
- verificação estática: o módulo não menciona `setItem`, `removeItem`, `indexedDB`, `navigator.locks`, `BroadcastChannel` nem `stateWriter`.

## Desenho de uma build R2 real (não implementado)
1. Build de ponte = app atual com `NEXT_PUBLIC_APLUS_R2=1`:
   - antes da hidratação, `blockAcademicWritesOnThisPage("r2_rollback")` e `startStateWriter` nunca chamado (sem IndexedDB, selo nem marcador);
   - ecrã único: `r2AreaView` da área atual e botões de descarga `r2Export`.
2. Escritas permitidas: nenhuma académica. Mesmo as técnicas (`a25-device-id-v1`, época de autenticação) ficam bloqueadas.
3. Gate antes de servir:
   - `tests/scripts/rollback-candidate-probe.mjs` adaptado ("mostra v2, não grava o legado, chaves v2 intactas");
   - comparação byte a byte de todo o `localStorage` e do IndexedDB antes e depois de abrir, recarregar e exportar.
4. Saída da R2 só para uma build que passe a regra de compatibilidade de `p1a-v2-rollback-plan.md` §2.

## Limites
- O laboratório usa um armazenamento sintético em Node e não um browser.
- A UI da R2 e a ausência de escritas técnicas não estão provadas.
