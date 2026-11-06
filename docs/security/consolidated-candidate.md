# Candidata experimental consolidada: #455 (Codex, F1–F7 + P1) + #458 (Claude, persistência)

Branch local `claude/consolidated-candidate`. Base: #455 `02d6c42`. Integrado: #458 `5f0eb74` (inclui #456 e #457). Sem push, merge, deployment ou SQL Neon.

## Resolução de conflitos

| Ficheiro | Decisão |
|---|---|
| `app/definicoes/page.js`, `app/piloto/page.js` | Imports de conta da #455 + limpeza de telemetria protegida (`stateIntegrity`). |
| `app/lib/graderValidationCapture.js`, `graderValidationDataset.js`, `portugueseWritingMemory.js` | Mantida a semântica da #455 (área por conta, `VALIDATION_ORIGIN_UNPROVEN`). A versão de #458 lia a chave global e reabriria uma fuga A→B. Acrescentados só `try/catch` em leituras/escritas sem proteção. |
| `app/lib/cloudReliability.js` | Mantida a implementação F7/P1 (entradas imutáveis por chave e por conta). `getOrCreateDeviceId` com acesso protegido (a #455 ainda tinha `typeof localStorage`). |
| `app/lib/reliability.js` | Protocolo D1/D3 da #458 com o registo na área da conta (`scopedLocalStorage`). |
| `app/clientApp.js` | Versão futura/inválida → aviso D2 sem escrita. JSON ilegível → percurso F7 (`LocalSnapshotRecovery`). Completions, diagnóstico e Português com gravação durável. |

Testes adaptados à base sem enfraquecer: o carregador da #455 já não apaga ilegíveis (em `main` apagava); `removePendingCloudSave` exige conta verificada e não pode lançar `SecurityError`; no ecrã de estado ilegível espera-se o percurso F7. Novos testes A/B: recibos D1/D3 e gravação durável por conta.

## Lacunas encontradas na integração (não corrigidas)

- **Restauro F7** (`LocalSnapshotRecovery.js:59`) grava com `persistence.saveLocalState` direto: sem verificação D2 nem gravação durável. Os originais são preservados antes (`preserveCloudOriginals`) e o ecrã só abre para JSON ilegível; mesmo assim deve passar pelo ponto único de escrita.
- **Reinício total** (`clearLocalState`) e **rascunhos** (`sessionDraft.js`, FQ A) sem verificação de versão.
- **Tempo do Chromium**: localmente a suite completa nesta base atingiu o `globalTimeout` de 10 min da configuração (20 testes não correram e foram executados à parte). O Beta CI remoto pode exceder o limite; não foi alterado.

## Concorrência entre abas — desenho proposto

Problema: cada aba guarda o estado completo e grava-o inteiro. `localStorage` não oferece escrita condicional atómica entre abas (abas podem estar em processos diferentes); "ler, comparar bytes, escrever" tem uma janela de corrida que só um mecanismo de exclusão fecha.

1. **Uma única aba escritora por conta** com `navigator.locks.request("approva-writer:<conta>",{mode:"exclusive"})`, mantido durante a vida da aba. Com o bloqueio adquirido, as escritas síncronas da aba são exclusivas. As outras abas ficam em modo leitura ("A APProva+ está aberta noutro separador") com "Usar nesta aba" (`steal:true` + recarregar o estado). A aba que perde o bloqueio (o pedido original rejeita com `AbortError`) passa imediatamente a leitura e não grava mais.
2. **Revisão como segunda defesa**: contador `_localRevision` numa chave própria por conta (não no estado, que a #455 filtra por allowlist). Antes de gravar, a revisão lida no arranque/última escrita tem de ser a atual; se não for, a aba pára de gravar e recarrega.
3. **Sem Web Locks** (browsers antigos): `BroadcastChannel` com pedido/anúncio de dono + evento `storage` + revisão. É deteção, não exclusão: documentado como garantia mais fraca; a resposta a conflito é sempre parar de gravar e recarregar, nunca combinar automaticamente.
4. **Sem combinação automática de estados entre abas**: `safeCloudMerge` usa `max(xp)` e perderia esforço feito em paralelo.
5. Todas as escritas sob o mesmo bloqueio: estado, recibos D3, rascunhos, recuperação F7, quarentena P1.

Testes negativos a escrever (devem falhar na candidata atual):
- aba B desatualizada grava depois de A concluir uma Missão → a conclusão/XP de A tem de permanecer;
- "Duplicar separador" (copia `sessionStorage` e o dono do recibo D3) → só uma aba escreve;
- três abas; aba em segundo plano com o bloqueio; tomada do bloqueio a meio de uma conclusão;
- browser sem `navigator.locks` (removido no init script) → conflito detetado, sem perda;
- contas A e B em abas diferentes → bloqueios independentes, sem interferência.

## Cobertura D2 — desenho proposto

Um único módulo de escrita (`stateIntegrity`) para todas as chaves académicas, que em cada escrita: confirma o dono (F5), classifica a versão/legibilidade dos bytes existentes, exige o bloqueio de escritor, grava e verifica a durabilidade.

Caminhos a encaminhar: gravação normal (feito), conclusões (feito), diagnóstico (feito), limpeza de telemetria (feito), **reinício total**, **rascunhos de sessão** (invólucro, porque `sessionDraft.js` está congelado), **rascunhos de FQ A**, **restauro F7**, **merge/hidratação cloud**, **quarentena P1**.

Testes negativos:
- reinício com versão futura gravada noutra aba → bytes intactos;
- rascunho com versão desconhecida → não carregado, não substituído, não apagado;
- restauro F7 quando entretanto apareceu versão futura → recusado;
- grupo do contrato sombra que falha se qualquer ficheiro escrever nas chaves académicas sem passar pelo módulo protegido.
