# P1-A v2 — Inventário das chaves e rotas autónomas

Guarda automático: `tests/unit/p1V2KeyInventory.test.mjs`. Falha com qualquer literal de chave novo em `app/` que não esteja classificado, com qualquer exame de FQ A sem rascunho nas 9 chaves, e com qualquer ficheiro novo que escreva no `localStorage`/`sessionStorage` brutos.

## As 9 chaves canónicas (protegidas pelo escritor, vigiadas, copiadas e restauradas em conjunto)

| Chave | Conteúdo | Quem escreve |
|---|---|---|
| `a25` | estado: XP, histórico (`missionHistory`, `examHistory`), `subjectProgress` (posição e resultados por disciplina, incluindo diagnósticos de PT e FQ A), **rascunho do mini-exame de Português** (`subjectSettings.portuguese.miniExamDraft`) | `persistence` via `stateIntegrity` |
| `a25-friends-beta` | estado da beta de amigos | idem |
| `a25-active-session-v1` / `a25-friends-active-session-v1` | rascunho da sessão de Matemática (diagnóstico, missão, treino, mini-exame) | `sessionDraft` |
| `applus:fqa-exam-draft:v1:fqa-mini-1` / `fqa-mini-2` / `fqa-full-715` | rascunhos dos 3 exames de FQ A (os únicos ids existentes; verificado pelo guarda) | `physicsChemistryExamDraft` |
| `a25-completed-sessions-v1` | recibos D3 (`pending`/`committed`) | `reliability` |
| `approva.portuguese-writing-memory.v1` | memória de escrita de Português | `portugueseWritingMemory` |

## Fora das 9, com dados académicos ou relacionados

| Chave / rota | Natureza | Proteção atual | Risco |
|---|---|---|---|
| `a25-completed-sessions-v1-quarantine-*` | cópia D1 dos recibos ilegíveis | escrita pelo escritor (guardada); só acrescenta; nunca apagada pelo v2. **Não entra** nas cópias de recuperação | baixo: preserva bytes, não é restaurada |
| `a25-cloud-pending-v1/v2:*`, `a25-cloud-snapshot(s)-*`, `a25-cloud-recovery-*` | filas e cópias da sincronização cloud, com estado | `cloudReliability.persistEntry` grava no **armazenamento bruto, sem guarda de escritor**; só acrescenta (nunca sobrescreve), com id aleatório. Chamado apenas por `AccountCloud` quando uma gravação cloud falha. A cloud valida a revisão no servidor (CAS, F7) | P3: um separador sem exclusão pode acrescentar uma entrada pendente; não sobrescreve nada local. Já existia no `ee33d54` |
| `applus:portuguese-prototype-draft:v1/v2` (rota `/portugues-mini-exame`) | rascunhos do protótipo de PT | a página bloqueia todas as gravações académicas (`blockAcademicWritesOnThisPage`); os rascunhos antigos nunca são abertos (P1-B) | nenhum novo |
| `aplus-grader-validation-local-v1` / `-consent-v1` (rotas `/internal/grader-validation*`, `/participar-validacao`) | casos de validação da correção (respostas recolhidas com consentimento) | `scopedLocalStorage` (área da conta); páginas sem escritor coordenado; chaves que a app de estudo nunca escreve | fora do P1-A; nenhuma colisão com as 9 |
| `aplus-pilot-consent-active-v1` (`/piloto`, `/definicoes`) | consentimento | `scopedLocalStorage` | não académico |
| `/piloto`, `/definicoes` (limpeza de telemetria) | alteram `a25` | `withExclusiveStateWrite`: com lock e prova; no espaço canónico; sem recurso "escrever sem lock" quando há erro | coberto |
| Cópias v1 (`a25-state-conflict-v1:*`, `a25-state-tabcopy-v1:*`) | cópias da #461 | só lidas; listadas e restauráveis | — |

## Técnicas (não académicas)
`a25-device-id-v1`, `a25-cloud-auth-epoch-v1`, `a25-onboarding-entry` (separador), `a25-daily-mission-resume:*` (separador), `a25-completion-owner-v1` (separador, identifica o dono do recibo `pending`).

## Escritas diretas no armazenamento bruto (fora do guarda de escritor)
`clientApp.js` (sinalizador de separador), `page.js` (entrada do separador), `reliability.js` (dono do recibo no `sessionStorage`), `cloudAccountSession.js` (época de autenticação), `cloudReliability.js` (filas/cópias cloud só de acrescentar, e o id do dispositivo). **Nenhuma escreve uma das 9 chaves.**
