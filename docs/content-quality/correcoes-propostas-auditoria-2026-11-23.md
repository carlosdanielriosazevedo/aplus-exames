# Correções de conteúdo propostas — auditoria externa de 2026-11-23

Estado: **propostas, não aplicadas.** Alterar uma pergunta invalida a impressão digital da revisão por IA (`content/reviews/ai/*.json`), e o teste `tests/unit/aiContentReview.test.mjs` passa a falhar. É o comportamento correto: uma pergunta alterada deixa de contar como revista. Atualizar esse registo equivale a atestar uma nova revisão, por isso essa decisão cabe ao product owner e não a quem fez a alteração.

Para aplicar: fazer as três alterações, rever cada pergunta na versão nova e atualizar as três impressões digitais no registo, com uma nota datada.

## PT639-FND-274 (Português, 12.º, coesão) — `content/vnext/portuguese/foundation/portuguese-639-wave13.json`
- **Problema:** regência incorreta no enunciado (B-03). «Retomar» é transitivo direto.
- **Atual:** «A que expressão anterior retoma «Essa mudança»?»
- **Proposta:** «Que ação é retomada pela expressão «Essa mudança»?»
- Opções, chave e explicação mantêm-se.

## PT639-FND-317 (Português, 10.º, coesão) — `content/vnext/portuguese/foundation/portuguese-639-wave16.json`
- **Problema:** a resposta-modelo afirma que, sem o pronome, a frase «ficaria incompleta» porque «rever» exige complemento direto (B-03). Em português europeu, o objeto pode ficar subentendido quando é recuperável pelo contexto, por isso a afirmação absoluta está errada.
- **Proposta de `referenceAnswer` (51 palavras, dentro do limite de 40–70):**
  > O pronome «o» retoma «o relatório». Essa substituição evita repetir o nome e liga a ação de entregar à ação anterior de rever: deixa explícito que aquilo que Marta reviu é o mesmo relatório que entregou. Assim, o pronome assegura a continuidade referencial e contribui para a coesão gramatical da frase.
- Os critérios da grelha em `app/data/portugueseRubrics.js` já não dependem da frase retirada.

## FQA-W3-C-AQ-01 (FQ A, 11.º, titulação) — `app/data/physicsChemistryAuthenticityWave3.js`
- **Problema:** com 25,00 mL, 20,40 mL e 0,1000 mol dm⁻³, o resultado tem 4 algarismos significativos, mas a referência mostra «0,0816» (B-02).
- **Proposta:** `expected:"0,08160 mol dm⁻³"` (o valor numérico e a tolerância mantêm-se).

## Nota sobre FQA-W3-C-ENE-01
O auditor apontou a tolerância de ±3 000 J (B-02). Este item não tem política de correção automática (`app/data/physicsChemistryStepwisePolicy.js` cobre apenas 7 itens), por isso qualquer resposta fica «por rever» e nunca é marcada como erro de cálculo. A regra nova dos algarismos significativos aplica-se aos 7 itens com correção automática.
