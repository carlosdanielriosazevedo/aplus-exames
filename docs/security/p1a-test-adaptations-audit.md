# Auditoria das alterações a testes existentes (P1-A, branch `experimental/p1a-no-weblocks-readonly`)

Para auditoria independente posterior. A cobertura **não** está validada definitivamente.

Motivo comum: depois de um fim sem selo final do escritor (crash, processo terminado, armazenamento "morto", fecho do Chromium sem `pagehide`), não é possível provar que a nova sessão vê a última gravação. Pela regra de falha segura, a sessão seguinte mostra a retenção (`[data-state-writer='recovery-hold']`) e só continua por decisão explícita, depois de guardar uma cópia durável de todas as chaves académicas.

Verificação mecânica (reproduzível com `git diff --unified=0 <commit>~1 <commit>` e comparando as linhas `expect` antes/depois):

| Commit | Ficheiro | Linhas + / − | Linhas `expect` originais | Em falta após a alteração |
|---|---|---|---|---|
| `3cd901a` | `tests/browser/diagnostic-resume.spec.mjs` | +9 / −0 | 89 | 0 |
| `2fd5329` | `tests/browser/recovery-integrity.spec.mjs` | +15 / −1 (assinatura `page.evaluate(` → `page.evaluate(async`) | 30 | 0 |

Nenhum controlo negativo foi retirado. Nenhuma asserção foi enfraquecida (os limites, valores esperados e `toBe(1)`/`toEqual(before)` são os mesmos).

## `3cd901a` — `diagnostic-resume.spec.mjs`, 15 instâncias ("sobrevive ao encerramento completo do Chromium")

Comum a todas: o teste abre um contexto persistente, prepara uma tentativa pendente, fecha o contexto (`context.close()`) e reabre.

| # | Teste | Antes (asserções) | Depois (asserções) | Acrescentado | Retirado |
|---|---|---|---|---|---|
| 1 | math-a · diagnostic sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |
| 2 | math-a · mission sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |
| 3 | math-a · training sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |
| 4 | math-a · mini_exam sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |
| 5 | portuguese · diagnostic sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |
| 6 | portuguese · mission sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |
| 7 | portuguese · training sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |
| 8 | portuguese · mini_exam sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |
| 9 | portuguese · full_exam sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |
| 10 | physics-chemistry-a · diagnostic sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |
| 11 | physics-chemistry-a · mission sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |
| 12 | physics-chemistry-a · training sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |
| 13 | physics-chemistry-a · mini_exam sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |
| 14 | physics-chemistry-a · mini_exam_2 sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |
| 15 | physics-chemistry-a · full_exam sobrevive ao encerramento completo do Chromium | `.sessionTop`/`.studentTop` visível; `snapshot(page)` igual a `before` | igual, **depois** da recuperação explícita | retenção visível; `snapshot(page)` igual a `before` **antes** da decisão (nada gravado); cliques "Continuar neste separador" → "Guardar cópia e continuar aqui" | nada |

Pré-condição alterada: antes, a sessão reabria sem interação depois de o Chromium ser terminado; agora exige a decisão explícita (custo de experiência a confirmar em dispositivos reais: o fecho normal do Chrome/Safari pode correr `pagehide` e selar).

## `2fd5329` — `recovery-integrity.spec.mjs`, 8 instâncias ("D3 · interrupção …")

Comum a todas: a partir do ponto de interrupção o armazenamento deixa de aceitar escritas (`installCrashSwitch`) e a página navega (`page.goto("/")`). O `seed()` do ficheiro passou a apagar também o registo IndexedDB do escritor (ponto de partida limpo, como limpar os dados do site; limpar só o `localStorage` deixaria o registo a exigir um selo apagado).

| # | Teste | Antes (asserções) | Depois (asserções) | Acrescentado | Retirado |
|---|---|---|---|---|---|
| 1 | recuperação de conclusões · 390×844 › D3 · interrupção antes de qualquer escrita: retoma sem perda nem XP duplicado | `entries===1`; rascunho apagado; `xp===expectedXp`; recibo `committed`; sem reaplicar após reload | todas iguais | retenção visível; `raw`/rascunho/registo iguais aos do momento da interrupção **antes** da decisão; cliques de recuperação explícita; retenção desaparece | nada (só a assinatura do `evaluate` no `seed`) |
| 2 | recuperação de conclusões · 390×844 › D3 · interrupção depois da reserva do recibo: retoma sem perda nem XP duplicado | `entries===1`; rascunho apagado; `xp===expectedXp`; recibo `committed`; sem reaplicar após reload | todas iguais | retenção visível; `raw`/rascunho/registo iguais aos do momento da interrupção **antes** da decisão; cliques de recuperação explícita; retenção desaparece | nada (só a assinatura do `evaluate` no `seed`) |
| 3 | recuperação de conclusões · 390×844 › D3 · interrupção depois de gravar a avaliação: retoma sem perda nem XP duplicado | `entries===1`; rascunho apagado; `xp===expectedXp`; recibo `committed`; sem reaplicar após reload | todas iguais | retenção visível; `raw`/rascunho/registo iguais aos do momento da interrupção **antes** da decisão; cliques de recuperação explícita; retenção desaparece | nada (só a assinatura do `evaluate` no `seed`) |
| 4 | recuperação de conclusões · 390×844 › D3 · interrupção depois de confirmar o recibo: retoma sem perda nem XP duplicado | `entries===1`; rascunho apagado; `xp===expectedXp`; recibo `committed`; sem reaplicar após reload | todas iguais | retenção visível; `raw`/rascunho/registo iguais aos do momento da interrupção **antes** da decisão; cliques de recuperação explícita; retenção desaparece | nada (só a assinatura do `evaluate` no `seed`) |
| 5 | recuperação de conclusões · 1366×768 › D3 · interrupção antes de qualquer escrita: retoma sem perda nem XP duplicado | `entries===1`; rascunho apagado; `xp===expectedXp`; recibo `committed`; sem reaplicar após reload | todas iguais | retenção visível; `raw`/rascunho/registo iguais aos do momento da interrupção **antes** da decisão; cliques de recuperação explícita; retenção desaparece | nada (só a assinatura do `evaluate` no `seed`) |
| 6 | recuperação de conclusões · 1366×768 › D3 · interrupção depois da reserva do recibo: retoma sem perda nem XP duplicado | `entries===1`; rascunho apagado; `xp===expectedXp`; recibo `committed`; sem reaplicar após reload | todas iguais | retenção visível; `raw`/rascunho/registo iguais aos do momento da interrupção **antes** da decisão; cliques de recuperação explícita; retenção desaparece | nada (só a assinatura do `evaluate` no `seed`) |
| 7 | recuperação de conclusões · 1366×768 › D3 · interrupção depois de gravar a avaliação: retoma sem perda nem XP duplicado | `entries===1`; rascunho apagado; `xp===expectedXp`; recibo `committed`; sem reaplicar após reload | todas iguais | retenção visível; `raw`/rascunho/registo iguais aos do momento da interrupção **antes** da decisão; cliques de recuperação explícita; retenção desaparece | nada (só a assinatura do `evaluate` no `seed`) |
| 8 | recuperação de conclusões · 1366×768 › D3 · interrupção depois de confirmar o recibo: retoma sem perda nem XP duplicado | `entries===1`; rascunho apagado; `xp===expectedXp`; recibo `committed`; sem reaplicar após reload | todas iguais | retenção visível; `raw`/rascunho/registo iguais aos do momento da interrupção **antes** da decisão; cliques de recuperação explícita; retenção desaparece | nada (só a assinatura do `evaluate` no `seed`) |

## Também relevante (já na PR #460, `03189dc`)

4 instâncias de "duas abas a entregar a mesma sessão" (`recovery-integrity` e `storage-durability`, 390/1366 px): pré-condição "segunda aba observadora"; asserções de invariante mantidas. Documentadas em `docs/security/p1-audit-459-fixes.md`.

## O que a auditoria independente deve verificar

- Que "retenção + recuperação explícita" é o comportamento pretendido após cada um destes fins sem selo.
- Que a igualdade `before`/`snapshot` e as asserções D3 continuam a cobrir perda e duplicação (mutação do D3 em `9f18020`: apanhada pelos testes de separador único e unitários).
- Que o `seed()` a apagar o registo IndexedDB não mascara um cenário real (só o `localStorage` limpo sem limpar o IndexedDB não acontece ao limpar dados do site).
