# Conclusão só com gravação durável (branch experimental `claude/durable-completion`)

Base: `a1d187596628b91d3489f5d0f4477f8003471abd` (PR #456). Sem alterações aos 6 ficheiros congelados pelo #385, a `app/api`, `db` ou `vercel.json`.

## Problema (reproduzido em Chromium no código base)

`writeStorageFallback` (`browserStorage.js`, congelado) grava no primeiro armazenamento que aceitar — `localStorage` → `sessionStorage` → memória — e devolve sempre sucesso. Com `localStorage` cheio para valores grandes (o estado), mas não para valores pequenos (o recibo de conclusão):

1. o estado com a avaliação concluída vai para `sessionStorage` (ou só memória);
2. o recibo é confirmado em `localStorage` e o rascunho é apagado de todos os níveis;
3. a app mostra o resultado como concluído;
4. ao fechar o separador (ou recarregar, no caso da memória), a cópia **antiga** do estado em `localStorage` reaparece: a avaliação perdeu-se e o rascunho já não existe.

O mesmo padrão existia na conclusão do diagnóstico (`finish` e `recoverDiagnosticTransaction`) e nos exames de FQ A (`saveReviewAndExit`, que além disso apagava o rascunho antes de o estado ser gravado).

## Níveis de armazenamento

| Nível | Onde | Sobrevive a reload | Sobrevive a fechar o separador |
|---|---|---|---|
| `durable` | `localStorage` | sim | sim |
| `tab` | `sessionStorage` | sim | **não** — a cópia antiga em `localStorage` reaparece |
| `memory` | memória da página | **não** | **não** |

## Correção mínima

- `app/lib/stateIntegrity.js`: cada gravação normal identifica o nível efetivamente atingido (comparando os bytes por nível antes/depois) e anuncia-o (`approva:storage-tier`). `saveLocalStateDurably` exige `durable`; caso contrário **repõe exatamente** os bytes anteriores nos níveis não duráveis (a conclusão não fica a parecer feita depois de um reload) e falha.
- Conclusões que exigem gravação durável antes de confirmar o recibo e apagar o rascunho: Missão, Treino e Mini-exame (Matemática A), conclusão do diagnóstico (incluindo a recuperação na hidratação, via `saveFinalState`) e exames de FQ A. Sem gravação durável: a reserva é desfeita, o rascunho fica, e o aluno vê porquê e como voltar a entregar.
- `StorageDurabilityNotice`: aviso permanente quando o progresso está só no separador ou só em memória.
- Contrato sombra: novo grupo `durable-completion` (falha em `a1d1875`, passa aqui).

## Limitações e riscos pendentes desta correção

- **Defeito novo encontrado, pré-existente e fora deste âmbito:** com `localStorage` bloqueado (SecurityError ao aceder), a app não arranca. `typeof localStorage==="undefined"` invoca o getter e lança fora de `try` (por exemplo `app/lib/cloudReliability.js:19`; padrão também em `graderValidationDataset.js`, `portugueseWritingMemory.js`, `PersistentPortuguesePrototype.js`). Reprodução: num contexto Chromium, `Object.defineProperty(window,"localStorage",{get(){throw new DOMException("x","SecurityError")}})` antes do carregamento; a página fica na landing sem arrancar. Igual em `main`.
- O progresso intermédio de uma sessão (respostas, evidência) continua a poder ficar só no separador; o aluno é avisado, mas a cópia antiga em `localStorage` reaparece se fechar o separador. Não é apagada (seria pior: ficava sem nada).
- Português (mini-exame e sessões por disciplina) guarda o rascunho dentro do próprio estado: não há apagamento prematuro, mas a conclusão pode ser mostrada em modo `tab`/`memory` (com o aviso visível). Não alterado.
- `localStorage` em janelas privadas é durável só até a janela fechar; o browser não permite distinguir.
- A sincronização piloto (friends_beta, com consentimento) pode ser agendada para um estado depois reposto.
- O texto dos avisos é novo e visível para o aluno: requer aprovação do product owner.

## Riscos pendentes documentados à parte (não corrigidos)

### Concorrência entre abas
O estado completo é gravado por inteiro por cada aba ("último a gravar ganha"). Uma aba desatualizada pode substituir conclusões, XP e histórico de outra aba na gravação seguinte. O D3 impede apenas a dupla conclusão da mesma sessão. Proposta já registada: CAS sobre os bytes em `stateIntegrity` + evento `storage` + modo de leitura na aba desatualizada.

### Cobertura D2
Sem proteção de versão/legibilidade: reinício total (`clearLocalState`), rascunhos de sessão (`sessionDraft.js`) e de FQ A, janela entre inspeção e escrita, versões já publicadas e, na #455, a recuperação F7, hidratação/merge cloud e migração para a área por conta. Proposta: ponto único de escrita protegido + verificação no contrato sombra.
