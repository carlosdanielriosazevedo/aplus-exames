# Auditoria das alterações a testes existentes (P1-A v2, ramo `audit/p1a-v2-canonical`)

Base de comparação: `ee33d54` (PR #461). Reproduzível com `git diff ee33d54 -- tests` e com o script de contagem de `expect` descrito abaixo.

## Regra única das adaptações

O progresso da app vive agora no espaço canónico `a25-ws-v2:<âmbito>:<chave>`. Nos testes existentes:
- **Sementes anteriores ao arranque da app** (`addInitScript`, ou páginas que não arrancam a app) ficam nas chaves brutas. Representam o estado da versão anterior e são importadas pelo primeiro escritor, por isso a importação passa a ser exercitada por todos esses testes.
- **Leituras do progresso, interrupções simuladas e escritas a meio da sessão** passam às chaves canónicas.
- Nenhum valor esperado, limite ou controlo negativo foi alterado. Os únicos testes cujo cenário mudou estão descritos abaixo, com o motivo.

## Contagem mecânica das linhas `expect`

Linhas normalizadas só quanto ao nome da chave (`a25-ws-v2:global:a25` → `a25`).

| Ficheiro | +/− | `expect` originais | presentes | em falta |
|---|---|---|---|---|
| `tests/browser-p1/cross-tab-writer.pw.mjs` | +19 / −10 | 52 | 50 | 2 (formato da cópia) |
| `tests/browser/diagnostic-resume.spec.mjs` | +26 / −26 | 101 | 101 | 0 |
| `tests/browser/recovery-integrity.spec.mjs` | +14 / −10 | 35 | 33 | 2 (chave por argumento) |
| `tests/browser/review-copy-report.spec.mjs` | +1 / −1 | 5 | 5 | 0 |
| `tests/browser/storage-durability.spec.mjs` | +47 / −8 | 22 | 22 | 0 |
| `tests/browser/storage-hardening.spec.mjs` | +18 / −4 | 31 | 31 | 0 |
| `tests/unit/p1AuditCrossTabWriter.test.mjs` | +15 / −7 | 93 | 91 | 2 (formato da cópia) |
| `tests/unit/p1AuditStoragePropagation.test.mjs` | +18 / −12 | 58 | 54 | 4 (formato da cópia; legado) |
| `tests/scripts/p1-audit-account-browser-contract.mjs` | +7 / −7 | 37 (`assert`/`waitFor`) | 37 | 0 |
| `tests/scripts/recovery-authorization-browser-contract.mjs` | +1 / −1 | 46 (`assert`/`waitFor`) | 46 | 0 |

Nos contratos com contas, só mudam as leituras do progresso gravado pela app coordenada (`a25-account-v1:<c>:a25` → `a25-ws-v2:acct:<c>:a25`). As sementes pré-arranque ficam no legado. Um caso a assinalar: a asserção "perfil criado antes da escolha" (linha 187) passaria **por vacuidade** se continuasse na chave antiga, porque o v2 nunca a escreve; passou a verificar a chave canónica. O componente de recuperação local montado isoladamente (sem escritor coordenado) continua no formato antigo, por desenho.

### Cada linha "em falta" e a sua substituta (mesmo valor verificado)

| Original | Substituta | Valor |
|---|---|---|
| `copies.find(c=>c.reason==="foreign_write")?.state?.xp` (P1 Chromium) | `parse(copies.find(c=>c.reason==="foreign_write:this_tab")?.keys?.a25)?.xp` | 100 |
| `parse(copies.find(…"foreign_write:received")?.raw)?.xp` (P1 Chromium) | `parse(copies.find(…"foreign_write:received")?.keys?.a25)?.xp` | 999 |
| `localStorage.getItem("a25")` ×2 (recovery-integrity, D1) | `localStorage.getItem(key)` com `C("a25")` | `raw` |
| `JSON.parse(local.getItem(copy.key)).state.xp` (unit) | `copyState(copy.key).xp` | 160 |
| `JSON.parse(local.getItem(…conflictCopy.key)).state.xp` (unit) | `copyState(…conflictCopy.key).xp` | 170 |
| `JSON.parse(received.raw).xp` (unit) | `JSON.parse(received.keys.a25).xp` | 150 |
| `copy.academic.localStorage[key]` ×2 (unit) | `inCopy(key)` = `copy.keys[nome curto]` | bytes de cada chave |
| `expect(stored().xp).toBe(100)` (sem Web Locks) | `JSON.parse(canonical.get(LEGACY_STATE_KEY)).xp` = 100 **e** nenhuma chave `a25-ws-v2:` criada | 100 (+ asserção nova) |

## Testes cujo cenário mudou (e porquê)

1. **"escrita de um separador de versão anterior"** (unit e Chromium). No v2, uma versão anterior escreve no legado e já não toca no canónico; isso é provado pelo teste novo `v2-legacy-tab.pw.mjs` (canónico intacto, cópia restaurável pela UI, reversível) e pelo unitário correspondente. O teste antigo mantém a sua premissa (um escritor sem coordenação a gravar a **mesma** chave que o escritor usa) e as mesmas asserções: o escritor para, o canónico fica com os bytes alheios e as duas cópias guardam 100 e 999.
2. **`storage-durability` e `storage-hardening` com quota cheia simulada**. Antes, a quota enchia desde o primeiro arranque. No v2, isso impede a importação (o estado não cabe) e a app fica em consulta. Os testes passam a importar com espaço livre e só depois enchem o armazenamento, que é a falha que provam ("ao entregar"). O caso "cheio no primeiro arranque" tem um teste novo: só consulta com o motivo verdadeiro, legado intacto, e com espaço importa e conclui uma única vez.
3. **`recovery-integrity` `seed()`** apaga também a base IndexedDB v2 (antes só a v1), com o mesmo objetivo declarado: ponto de partida limpo.
4. **`fim abrupto` (P1 Chromium)**: asserção **reforçada**. Já não basta existir uma cópia; ela tem de conter a conclusão de A e os recibos. Era a lacuna do mutante U2 na auditoria.

## Mutantes (controlos negativos) sobre o código v2

`npx vitest run` nos 3 ficheiros P1-A (49 testes). Cada mutante foi aplicado e depois reposto.

| Mutante | Resultado |
|---|---|
| R1 recuperação sem cópia | detetado (7 ✗) |
| R2 escrita durante a retenção | detetado (6 ✗) |
| R3 selo com epoch errada aceite | detetado (1 ✗) |
| R4 falha de gravação no IndexedDB ignorada | detetado (1 ✗) |
| X5 registo em falta = prova | detetado |
| X6 marcador divergente ignorado | detetado |
| X7 só vigia o estado (não rascunhos/recibos/memória) | detetado (3 ✗) |
| X8 sem verificação da linha de base | detetado |
| X9 sem namespace canónico | detetado (26 ✗) |
| X10 restaurar sem cópia de segurança | detetado (depois de acrescentado o teste "sem espaço") |
| X11 restaurar sem D2 | detetado |
| X12 restaurar sem reposição | detetado |
| X13 sem cópia "recebido" | detetado (4 ✗) |
| X14 sem deduplicação | detetado |
| X15 escrita de versão antiga sem cópia | detetado |

### Mutantes no Chromium (build de produção, `tests/browser-p1`, 10 testes)

| Mutante | Resultado | Teste que o apanha |
|---|---|---|
| R1 recuperação sem cópia | detetado | "fim abrupto" (asserção reforçada sobre o conteúdo da cópia) |
| R2 escrita durante a retenção | **não observável pela UI**: durante a retenção a app não hidrata, por isso nenhuma escrita é tentada. Detetado nos unitários (6 ✗) | — |
| R3 selo com epoch errada | detetado | "selo de um mandato anterior após fim abrupto" |
| R4 falha de gravação no IndexedDB | detetado | "IndexedDB recusa gravar o registo" |
| X7 só vigia o estado | detetado | "escritor alheio no rascunho canónico" |
| X9 sem namespace | detetado (5 dos 7 P1 originais e os 23 testes antigos) | vários |
| X15 escrita de versão antiga sem cópia | detetado | "separador do main" |

Os 23 testes modificados pela #461 (`3cd901a`, `2fd5329`) continuam a **não** detetar o R1 (recuperação sem cópia), tal como na auditoria. A deteção vem dos testes P1 e unitários.

## Revisão de vacuidade (mutante de prefixo)

Método: a app passa a gravar em `a25-ws-vX:` enquanto os testes continuam a ler `a25-ws-v2:`. Um teste adaptado que **continue a passar** não depende dos bytes que a app grava, por isso cada sobrevivente foi inspecionado.

| Sobrevivente | Classificação | Ação |
|---|---|---|
| unit "observador não grava estado, rascunho nem registo" | **vazio quanto ao prefixo** (comparava só chaves v2, nulas sob o mutante) | pré-condições não nulas + comparação do armazenamento inteiro |
| unit "sem espaço para guardar o atual antes de restaurar" | **vazio quanto ao prefixo** | pré-condição + armazenamento inteiro |
| unit "sem cópia durável (localStorage sem espaço)" | **vazio quanto ao prefixo** | pré-condição + armazenamento inteiro |
| Chromium `storage-hardening` "bloqueado em duas abas" | **vazio quanto ao prefixo** (`undefined === undefined`) | pré-condições: rascunho e estado canónicos presentes |
| Chromium "IndexedDB recusa gravar" | parcial (só os prefixos conhecidos) | armazenamento inteiro |
| contrato "legado bruto e global v2 em simultâneo" | parcial (só `a25-ws-v2:acct:B2:`) | qualquer espaço (`:acct:B2:`, F5) + conteúdo |
| contrato "sem sessão" | parcial (só `a25-ws-v2:`) | armazenamento inteiro |
| 9 unitários "sem Web Locks / IndexedDB / página bloqueada", Chromium "sem Web Locks", 6 P1-B, "ilegível" | legítimos: já comparavam o armazenamento inteiro ou o legado | — |
| Chromium 111, 124, 548 (`diagnostic-resume`), 121 (`storage-hardening`), 174 (math-a), unit "reload", "escritor bloqueado" | testam UI ou máquina de estados; não leem bytes | — |

Depois dos reforços, os 4 testes que eram vazios **falham** sob o mutante. Os testes de ausência ("nada escrito", "nenhuma chave de B2") continuam a passar sob o mutante, e é esse o comportamento correto: comparam o armazenamento inteiro, e a app mutante também não escreve nada nesses cenários.
