# P1-A v2 — Evolução necessária do gate #385 e do contrato sombra (PROPOSTA)

**Nada neste documento foi aplicado.** Os workflows `.github/workflows/beta-ci.yml` e `recovery-contract-shadow.yml` estão inalterados nesta branch. Qualquer mudança aqui descrita precisa de decisão explícita do product owner.

## 1. Factos (verificados localmente na auditoria da #462)

| Gate | Natureza | Resultado no `2da87fb` | Porquê |
|---|---|---|---|
| Beta CI · "Synthetic recovery compatibility" (`scripts/release-recovery-compatibility.mjs`) | **obrigatório** | **FAIL** (exit 1) | exige que os ficheiros de armazenamento sejam iguais byte a byte aos do #385 (`94ee6db`) e que `app/api` e `db` não mudem face a `98e811f`. A #462 altera ambos **por desenho** |
| Workflow "Recovery contract (shadow)" (`release-recovery-behavioural-contract.mjs --json`) | informativo | resultado interno **FAIL** (`api-schema-freeze`), check **verde** | `continue-on-error: true` no job **e** `node … \| tee` sob `bash -e` sem `pipefail`: o estado do passo é o do `tee` |

Os resultados remotos (Beta CI do #385, execução do sombra no GitHub) **não foram confirmados**: esta sessão não tem acesso à API do GitHub.

## 2. O gate #385: o que tem de evoluir (não enfraquecer)

O gate atual protege uma propriedade correta: um release não pode quebrar a recuperação dos rascunhos e estados históricos. A forma de a proteger (igualdade byte a byte dos ficheiros) torna-se impossível quando o formato de armazenamento avança.

Proposta: substituir a igualdade de bytes por **equivalência comportamental, com mais casos, nunca menos**.

1. Manter todos os grupos históricos atuais (474 + 54 + 24 + 216 verificações) e os controlos negativos D1–D3. Têm de passar com a candidata.
2. Acrescentar os grupos v2:
   - importação legado → v2 byte a byte;
   - o legado nunca é escrito;
   - diário de restauro (matriz 9 × falha e r1/r2);
   - D3 no restauro;
   - R2 sem escritas.
3. Substituir `git diff safety -- storage files === ""` por uma **lista fechada de ficheiros autorizados a mudar**, assinada por revisão (hash do diff aprovado). Qualquer outro diff continua a falhar.
4. `app/api` e `db`: manter a proibição para releases de UI. Um release com migração passa por um gate próprio (RLS sintético, já existente em `neon-rls-synthetic.yml`), nunca por isenção silenciosa.
5. Até haver decisão, a #462 (e esta branch) **continuam a falhar o Beta CI**. Isto é o comportamento correto e não deve ser contornado.

## 3. O falso verde do contrato sombra

Princípio: **uma observação informativa nunca pode aparecer como aprovação.** Um check verde só deve significar PASS.

Correção proposta (diff não aplicado):

```diff
 jobs:
   shadow:
     runs-on: ubuntu-latest
     timeout-minutes: 10
-    continue-on-error: true
+    # Informativo = não obrigatório na proteção de ramo; NÃO = verde em falha.
     steps:
@@
       - name: Behavioural recovery contract (shadow)
-        run: node scripts/release-recovery-behavioural-contract.mjs --json | tee recovery-shadow.json
+        shell: bash
+        run: |
+          set -o pipefail
+          node scripts/release-recovery-behavioural-contract.mjs --json | tee recovery-shadow.json
+          echo "### Contrato sombra: $(node -e 'console.log(require("./recovery-shadow.json").result)')" >> "$GITHUB_STEP_SUMMARY"
```

Consequências:

- Com FAIL, o check fica **vermelho**. Como não é obrigatório na proteção de ramo, não bloqueia o merge, mas também não mente.
- Separar formalmente: "obrigatório" = listado em *required status checks*; "informativo" = não listado. Nunca usar `continue-on-error` para tornar algo informativo.
- O nome do workflow deve conter "(informativo)" para quem só vê o ícone.

## 4. Testes desta branch que devem entrar nos gates (proposta)

- `node tests/scripts/p1-v2-mutation-gate.mjs` (17 mutantes, todos detetados nesta branch).
- `tests/browser-p1/v2-quota-hold.pw.mjs` no workflow `p1-audit-fixes.yml`. Os `paths` desse workflow ainda não incluem `app/lib/recoveryCopies.js`, `stateRecovery.js` nem `academicKeys.js`: proposta de acrescentar.
