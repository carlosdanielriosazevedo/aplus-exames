# D1–D3 — integridade da recuperação local (branch experimental `claude/recovery-integrity`)

Base: `main` `118021d48ae354ec28b029c132d943d5a20b1c4f`. Sem merge, deployment, SQL, migrações ou alterações a API/schema. Os 6 ficheiros congelados pelo contrato #385 (`sessionDraft.js`, `browserStorage.js`, `physicsChemistryExamDraft.js`, `portugueseMiniExamDraft.js`, `persistence.js`, `pilotConsentClient.js`) **não foram alterados**; o contrato original continua a passar.

## Defeitos (reproduzidos no código original com dados sintéticos)

| | Defeito | Consequência |
|---|---|---|
| D1 | `readCompleted` tratava um registo de conclusões ilegível como `[]` e a reclamação seguinte reescrevia-o. | Perda silenciosa dos IDs concluídos; sessões já concluídas podiam voltar a dar XP. |
| D2 | O carregador aceitava `_stateVersion` superior ao da app e regravava-o como 31; `clearLocalPilotTelemetry` reescrevia qualquer estado; JSON ilegível era removido pelo carregador. | Downgrade/sobrescrita de dados de uma versão mais recente; perda de bytes ilegíveis. |
| D3 | `claim` era gravado antes da avaliação; o rascunho era apagado antes de o estado ser persistido. Ao retomar, `claim=false` apagava o rascunho sem gravar a avaliação. | Perda de respostas e da avaliação após uma interrupção. |

## Correções

**D1 (`app/lib/reliability.js`)** — leitura estrita do registo (`registry_corrupt`/`registry_unavailable`). Nunca grava sobre bytes ilegíveis; todas as operações (reservar, confirmar, libertar, consultar) falham fechadas. A conclusão é bloqueada com um ecrã de recuperação que conserva o rascunho. A reparação é explícita (“Guardar cópia e reparar”): cópia exata para `a25-completed-sessions-v1-quarantine-<ts>`, confirmada por releitura; só depois o registo é reconstruído com as conclusões **comprovadas pelo estado académico**. Se a cópia falhar, nada é alterado. O reinício total pedido pelo aluno também copia primeiro um registo ilegível.

**D2 (`app/lib/stateIntegrity.js`, novo)** — envolve `persistence.js` sem o alterar. Antes de carregar, gravar ou limpar telemetria, classifica os bytes: `state_unreadable`, `state_version_invalid`, `state_version_future`. Em qualquer destes casos não carrega (o carregador original nem é chamado, porque remove ilegíveis), não grava, não limpa; mostra o estado de recuperação com mensagem específica para versão futura. Se outro separador gravar uma versão futura depois do arranque, a gravação seguinte é recusada e a app pára de gravar. A limpeza de telemetria após retirada de consentimento limpa apenas as chaves íntegras e deixa a bloqueada intacta (a sincronização continua impedida pela verificação de consentimento).

**D3 (`app/lib/reliability.js` + `app/clientApp.js`)** — conclusão em duas fases nas três rotas (Missão, Treino, Mini-exame de Matemática A):

1. `reserveSessionCompletion` → recibo `pending` com dono (separador, em `sessionStorage`) e prazo de 15 s;
2. a avaliação é gravada **sincronamente** (`saveLocalState`); se falhar, a reserva é desfeita e o rascunho fica;
3. `commitSessionCompletion` → `committed`;
4. só então o rascunho é apagado.

A prova de que a avaliação foi gravada é o próprio estado (`missionHistory`/`examHistory`/`lastExam` `completionId`, `subjectProgress`, `engagement`/`competition` `activityIds`). Regras de reserva: prova no estado → `already_completed` (nunca reaplica); recibo confirmado → `already_completed`; recibo pendente vivo de outro separador → bloqueado sem apagar nada; recibo pendente expirado ou do próprio separador → retoma; recibo antigo (formato anterior) **só** é retomável quando o chamador fornece a prova do estado e esta mostra que a avaliação nunca foi gravada (no código anterior, um rascunho só sobrevivia a um `claim` se o estado ainda não tivesse sido gravado). A API antiga de uma fase (`claimSessionCompletion`) mantém-se para compatibilidade e trata recibos antigos como concluídos.

## Contrato #385 em modo sombra

`scripts/release-recovery-behavioural-contract.mjs` — não substitui `scripts/release-recovery-compatibility.mjs` (inalterado e obrigatório). Repete todas as verificações comportamentais históricas, mantém inalterado o bloqueio de migrações API/schema, transforma a exigência de bytes idênticos num relatório e acrescenta controlos negativos D1–D3 e a exceção `raw-recovery-gap`. Aceita `--candidate-ref <ref>` para correr contra qualquer commit.

## Riscos residuais conhecidos

- Separadores duplicados (“Duplicar separador”) copiam o `sessionStorage` e partilham o dono do recibo; a prova pelo estado continua a impedir reaplicação depois de um deles gravar, mas uma corrida exatamente simultânea não é serializável com `localStorage`.
- O estado completo continua a ser “último a gravar ganha” entre separadores (pré-existente, fora do âmbito D3).
- `engagement.days[].activityIds` está limitado a 50 por dia: com mais de 50 atividades num dia, a prova de um Treino antigo pode sair da janela (a Missão e o Mini-exame têm prova em histórico não truncado).
- Versões antigas da app já publicadas não têm esta proteção; a garantia D2 só vale a partir desta versão.
