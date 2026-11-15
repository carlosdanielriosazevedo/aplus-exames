# P1-A v2 — Correções residuais da auditoria independente das correções do NO-GO #462

Branch local `experimental/p1a-v2-residual-fixes`, criada sobre `48644023` (que fica congelada). Não houve push, PR nem deployment. Dados exclusivamente sintéticos.

**Âmbito limitado** aos defeitos X1, X2, X3, X4 e X7 da auditoria e aos mutantes que lhe sobreviveram. Não houve alterações à arquitetura canónica v2, aos gates #385, à API/schema nem ao R2 (continua só em laboratório).

## Correções

| Defeito | Antes (`48644023`) | Agora |
|---|---|---|
| X1: diário corrompido ou ilegível com a quota cheia | Todas as cópias contavam como "em uso" e "manter o atual" exigia uma cópia que não cabia. Impasse, reproduzido no Chromium | Só as cópias que um restauro pode referir ficam protegidas: `restore_target`, `before_restore`, cópias ilegíveis e ids citados nos bytes do diário. As outras podem ser apagadas depois de descarregadas. `exportCurrentSet` descarrega as 9 chaves em qualquer modo. Sem espaço, "manter" é aceite depois de exportados **exatamente** os bytes atuais (impressões digitais); se não coincidirem, `export_mismatch`. Nenhuma mensagem recomenda limpar os dados do site |
| X7: leitura falhada a meio da sessão | O separador parava (diário) ou continuava como escritor (chave) sem guardar a alteração. A mensagem falava de um restauro que não existiu. Não havia selo, por isso o separador seguinte entrava em retenção | `haltWriting` guarda o conjunto deste separador numa cópia: últimos bytes, memória e **a própria gravação que falhou**. Fica durável se couber; senão, fica só no separador. Depois sela e passa a só consulta (`storage_read_failed`). `unsaved.tier` = `saved` / `durable` / `tab` / `failed`, mostrado no ecrã. `exportUnsavedTabSet` descarrega a partir da memória mesmo sem cópia |
| X3: cópias `restore_target` órfãs | Um restauro sem espaço para a segurança deixava o alvo gravado, apesar da mensagem "Nada foi alterado" | O restauro que não começa não deixa cópias duráveis nem temporárias. No restauro reposto, o alvo fixado (igual à cópia escolhida) é apagado e a segurança fica, porque restaurar continua reversível |
| X4: cópias iguais em reaberturas | Cada reabertura em `unresolvable` gravava um novo `journal_resolution_found` | Deduplicação por motivo e conjunto (`dedupe:"reason"`), também em `journal_discarded_current` e `write_halted` |
| X2: apagar uma cópia temporária | Devolvia `ok` sem apagar nada | Apaga no nível onde a cópia está, confirma por releitura e devolve `temporary:true`. A UI diz que a cópia era do separador e que apagá-la não liberta espaço |
| UI: "Manter o progresso atual" com `unresolvable` | O botão aparecia, a função recusava e a mensagem mandava libertar espaço | O botão só aparece onde a função aceita (diário antigo ou corrompido). Para `unresolvable` e `no_space_for_found_copy` há uma mensagem própria |

## Testes

### `p1V2ResidualFixes` (18 testes)
- Na `48644023` falham **14**. Os 4 que passam (A4, A5, A14, A15) protegem guardas que já existiam e servem para matar mutantes.
- Algumas falhas na base são `TypeError` porque `exportCurrentSet` não existia. Nesses casos, a prova do defeito está nos testes com asserções (X1 diário ilegível, X3, X4, X2, X7, A10) e na reprodução no Chromium.
- As provas são feitas pelos bytes gravados:
  - as 9 chaves: XP, avaliações (`examHistory`), rascunho (`a25-active-session-v1`), recibos D3 e memória de escrita;
  - as cópias, nos dois níveis (durável e só no separador);
  - o diário;
  - o espaço devolvido;
  - a ausência de recompensa duplicada (`reserveSessionCompletion` → `already_completed`, sem mudança de XP).

### Teste adaptado (1)
- `p1V2NoGoRegressions` › r5 esperava que o separador continuasse escritor depois de uma leitura falhada. Esse é precisamente o comportamento silencioso corrigido no X7.
- Agora exige, nas 9 chaves, três coisas: bytes intactos, paragem `storage_read_failed`, e a gravação recusada (`"synthetic"`) presente na cópia. Abre um escritor novo para cada chave.
- A segunda parte do teste não mudou: outra área e diário presente.

### Gate de mutação
- `tests/scripts/p1-v2-mutation-gate.mjs` tem agora 39 mutantes, todos detetados:
  - os 17 originais, com os padrões M4 e N3 atualizados;
  - 10 dos mutantes que sobreviviam na auditoria (A1, A2, A4, A5, A7, A8, A10, A13, A14, A15);
  - 12 sobre as guardas novas (R1–R12).
- Novo filtro: `P1_MUTANTS=A7,R2`.

### Chromium (build de produção local, script de auditoria, fora do gate)
- X1:
  - só consulta;
  - "manter" sem exportação é recusado;
  - a descarga contém exatamente os bytes gravados;
  - "manter" depois da exportação é aceite;
  - o diário é apagado e as 9 chaves ficam intactas;
  - ao recarregar há escritor, com XP 555, rascunho e recibos iguais.
- O r4 continua a passar.

## Limitações
- **Exportação recuperável.** O ficheiro descarregado tem o formato das cópias v2 e contém os bytes exatos, mas a app não tem importação. Recuperá-lo exige suporte manual. Não foi acrescentada importação porque seria uma funcionalidade nova.
- **Prova de descarga.** "Exportado" significa que o browser recebeu o pedido de descarga com os bytes atuais. A app não pode confirmar que o ficheiro foi guardado em disco.
- **Diário ilegível** (a leitura lança erro). Sem bytes, a proteção baseia-se só no motivo das cópias. Um diário residual do SHA `2da87fb` cujo alvo seja uma cópia de outro motivo, e que fique ilegível, não seria protegido.
- **O que a paragem X7 guarda.** Guarda o conjunto que este separador conhece. Rascunhos que a app guarda só em memória (sem tentativa de gravação) não passam pelo armazenamento e não são vistos.
- **Âmbito dos testes de browser.** X7 e o ecrã de paragem não foram testados no Chromium, só em unitários; provocar a falha de leitura na build exigiria instrumentação. Também não foram testados Firefox nem Safari.
- **Órfãs antigas.** As cópias `restore_target` órfãs criadas pela `48644023` continuam a existir e o aluno pode apagá-las depois de as descarregar. A limpeza automática apagaria cópias visíveis ao aluno.
- **Fora do âmbito:** privacidade/retenção (P1-2 da auditoria), mistura de versões durante o deployment e a interação entre restauro e fusão cloud. O rollback para o `main` (r3) continua sem saída em produção.
