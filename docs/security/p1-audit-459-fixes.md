# Correção dos P1 da auditoria independente da #459

Branch local `experimental/p1-audit-459-fixes`, criada a partir do SHA exato da #459
(`e4dfab04cced1f8382fc46d79e42a4b7cff2cf40`). Sem push, merge, deployment nem SQL Neon.
A PR #459 e as PRs #453–#458 não foram alteradas. Dados de teste exclusivamente sintéticos.

## P1-A — Perda de progresso entre separadores

**Defeito (reproduzido no SHA original):** duas abas hidratam o mesmo estado; A conclui
uma avaliação e grava de forma durável; B, desatualizada, volta a ficar ativa
(`recordAppOpen`) e grava o estado completo por cima. Chromium real:
`conclusão de A apagada por B — Expected 1, Received 0`.

**Correção — `app/lib/stateWriter.js`:** um único escritor por área (conta F5 ou global).

| Mecanismo | Garantia |
|---|---|
| Web Locks `approva-state-writer-v1:<área>` (exclusivo, mantido toda a vida da aba) | Exclusão real entre processos. Libertado pelo browser em fecho, falha ou reload. Nunca `steal`. |
| Separador sem lock = observador | Não hidrata, não lê nem grava estado, rascunhos ou registo D3. A escrita é recusada em `accountWorkspace.accountStorage` (falha como armazenamento bloqueado; os chamadores já falham fechados). |
| Passagem de controlo cooperativa | O observador pede ("Continuar neste separador"); o escritor grava o estado atual, desmonta o estudo, liberta e recarrega como observador. Se não responder em 8 s, nada é forçado. Pedidos antigos (> 6 s) são ignorados. |
| Reload | O novo documento espera até 1,5 s pelo lock libertado pelo anterior. |
| `pageshow` com `persisted` (bfcache) | Recarrega para voltar a arbitrar. |
| Sem Web Locks | Concessão em `localStorage` (TTL 30 s, batimento 5 s, assentamento 600 ms, ping de presença 400 ms, libertada em `pagehide`). **Não é exclusão**: o `localStorage` do Chromium propaga entre processos de forma assíncrona e dois separadores podem ficar escritores. Garantia efetiva (falha segura): cada gravação do estado guarda também os bytes exatos em `a25-state-tabcopy-v1:<aba>`; se essa cópia falhar, o separador deixa de escrever. Na hidratação seguinte, cópias iguais ao estado guardado são removidas; cópias diferentes passam a cópias de conflito e o aluno vê um aviso. Nenhuma sobrescrita apaga progresso sem cópia nem sem aviso — mas a recuperação dessa cópia ainda não existe (P2). |
| Sem `localStorage` gravável | Cada aba só grava no seu `sessionStorage`/memória: não há partilha, logo não há sobrescrita. |
| Defesa em profundidade (todos os modos) | Bytes do estado que este separador não leu nem escreveu (evento `storage` ou verificação antes de gravar em `stateIntegrity.rawGuardedSave`) → bloqueio + cópia `a25-state-conflict-v1:<aba>:<instante>` na área da conta. Cobre separadores de versões anteriores sem lock. Esta verificação é comparação-depois-escrita e por isso **nunca é o mecanismo principal**. |
| `/piloto`, `/definicoes` | A limpeza local de telemetria só reescreve o estado se nenhum separador da app for escritor; caso contrário pede-lhe que volte a gravar (sem telemetria, porque o consentimento já foi retirado). |

Ecrãs novos para alunos (texto provisório, a aprovar): "A APProva+ está aberta noutro
separador" (ação dominante "Continuar neste separador"); "Este separador deixou de
guardar progresso" (conflito; "Recarregar o progresso"); estado de passagem.

## P1-B — Divulgação entre contas no protótipo `/portugues-mini-exame`

**Defeito (reproduzido):** `PersistentPortuguesePrototype` gravava e lia as respostas
na chave global `applus:portuguese-prototype-draft:v1`; B, no mesmo dispositivo, via as
respostas de A (`resposta de A visível para B`).

**Correção:** com contas ativas, a rota prova a sessão (`openVerifiedAccount`), escolhe a
área da conta e grava só em `a25-account-v1:<conta>:applus:portuguese-prototype-draft:v2`.
A chave global antiga nunca é lida nem escrita (aviso sem conteúdo: "Há uma tentativa
antiga … Não a abrimos nesta conta e não a apagámos"). Sem sessão comprovada: modalidade
sem persistência (nada é lido nem gravado). Troca de conta noutro separador: o
protótipo bloqueia (`useAccountWorkspaceGuard`) e esconde as respostas. Sem contas
configuradas, o comportamento ao nível do dispositivo mantém-se (igual à app principal).

## P1-C — Progresso legado invisível

**Defeito (reproduzido):** com contas ativas, progresso gravado antes da F5 nas chaves
globais nunca era lido e a app apresentava silenciosamente um perfil vazio.

**Correção:** se a conta comprovada não tem área própria e existe qualquer chave
académica global (`LEGACY_WORKSPACE_KEYS`, só existência; o conteúdo nunca é lido),
a hidratação para no ecrã "Encontrámos progresso de uma versão anterior neste
dispositivo". Nada é mostrado, migrado ou atribuído — nem quando o rótulo antigo
`identity.authUserId` coincide com a conta, porque antes da F5 o estado académico
sobrevivia a trocas de sessão e o rótulo não prova titularidade. Ações: "Começar nesta
conta sem esse progresso" (escolha explícita; os bytes antigos ficam intactos) e "O
progresso antigo é meu" (orientação para recuperação autorizada). Uma conta com área
própria abre normalmente, sem aviso.

**Decisão pendente do product owner:** o processo de recuperação autorizada (como se
prova a titularidade do progresso antigo) não existe ainda; a interface apenas
preserva e encaminha.

## Revisão antes da publicação — defeito encontrado e corrigido

Modelo com propagação assíncrona entre processos (`tests/unit/p1AuditLeasePropagation.test.mjs`)
mostrou, em `fb23746`, que sem Web Locks dois separadores podiam ficar escritores e que,
se A concluísse e fechasse antes de a escrita chegar a B, a gravação de B apagava o
progresso de A sem cópia (`finalXp 100`, nenhuma cópia com 150). Corrigido com as cópias
por separador e a reconciliação na hidratação; o ping de presença reduz a janela.
Limites que continuam: uma falha do processo entre a gravação do estado e a da cópia
(mesma tarefa síncrona) não é coberta; o modo concessão grava o estado duas vezes (quota).

## Provas

- Unitários: `tests/unit/p1AuditCrossTabWriter.test.mjs` (15 cenários: duas e três abas,
  passagem, fecho abrupto, reload, separador duplicado, suspensão, escrita alheia com e
  sem evento, sem Web Locks, arranque simultâneo, sem armazenamento, páginas piloto).
- Chromium (build de produção): `tests/browser-p1/cross-tab-writer.pw.mjs`
  (`playwright.p1-audit.config.mjs`, fora da suite principal para não aproximar o
  `globalTimeout` da Beta CI).
- Chromium com contas: `tests/scripts/p1-audit-account-browser-contract.mjs`
  (`P1_SOURCE_ROOT=<árvore>` permite correr a mesma prova contra o SHA original).

### Testes existentes adaptados (commit separado `test(P1-A)`)

`recovery-integrity.spec.mjs` e `storage-durability.spec.mjs` ("duas abas a entregar a
mesma sessão", 390 e 1366 px) partiam de duas abas ativas a entregar em simultâneo —
o cenário que a P1-A elimina. As asserções de invariante ficam iguais (uma conclusão,
sem duplicação, sem confirmação falsa); acrescenta-se a pré-condição "a segunda aba é
observadora e não pode entregar" e, em recovery-integrity, a verificação depois da
passagem de controlo. A corrida D3 com dois donos (que ainda pode ocorrer com um
separador de versão anterior ou sem Web Locks) continua coberta em
`tests/unit/recoveryIntegrity.test.mjs`. Revisão independente recomendada.

## Trabalho P2 ainda necessário

- Restauro F7 (`LocalSnapshotRecovery.js`) continua a gravar com `persistence.saveLocalState`
  direto: sem verificação D2 nem gravação durável (agora pelo menos só no separador escritor).
- Filas `a25-cloud-pending-v2:*` / `a25-cloud-snapshot-v2:*`: globais, sem limite, entradas
  sem conta nunca removíveis → risco de quota.
- Cópias de conflito `a25-state-conflict-v1:*`: preservadas, mas sem ecrã de revisão/restauro.
- Processo de recuperação autorizada do progresso legado (P1-C).
- Sem Web Locks a proteção é deteção com preservação, não exclusão.
