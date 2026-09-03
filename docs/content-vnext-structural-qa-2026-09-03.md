# vNext content bank — structural QA report

Date: 2026-09-03  
Branch: `content/math-a-curriculum-map`  
Scope: editorial prototype bank under `content/vnext/math-a/`

## Result

The first structural QA pass now covers the complete vNext bank:

- 10.º: 31 JSON batches × 50 questions = **1 550**
- 11.º: 35 JSON batches × 50 questions = **1 750**
- 12.º mandatory: 32 JSON batches × 50 questions = **1 600**
- 12.º optional: 15 JSON batches × 50 questions = **750**
- Total: **113 batches / 5 650 questions**

## Checks applied to every batch

- exactly 50 questions;
- 50 unique local question IDs;
- 50 unique local question texts;
- answer index restricted to 0–3;
- exactly four answer options;
- no duplicated option text inside a question;
- correct-answer position distribution targeted at 13 / 13 / 12 / 12.

For the 15 optional 12.º batches, the pass also explicitly checked the required metadata fields and the Mission / Training / Exam contexts.

## Structural issues found and corrected

### 10.º
- `10-ga-coordenadas-transformacoes.json`
  - answer positions were 15 / 13 / 11 / 11;
  - options were reordered without changing correct answers;
  - final distribution: 13 / 13 / 12 / 12.

### 11.º
Duplicate distractors/options were found and corrected in:
- `11-cd-derivada-ponto.json`;
- `11-cd-funcao-derivada.json`;
- `11-cd-regras.json`;
- `11-cd-tangente.json`;
- `11-cd-taxa-media.json`.

A duplicated/non-self-contained question text was corrected in:
- `11-fun-operacoes.json`.

### 12.º mandatory
- `12-cplx-forma-algebrica.json`
  - one item had five answer options; normalized to four.
- `12-prob-fenomeno-acontecimentos.json`
  - all 50 correct answers were initially in option position 0;
  - options were rebalanced to 13 / 13 / 12 / 12 without changing semantics.
- `12-prob-variaveis-discretas.json`
  - one repeated context-dependent question text was made self-contained and unique.

### 12.º optional
All 15 optional batches passed the structural checks after creation. A notation cleanup was also made in `12-mat-modelacao.json` to avoid ambiguity between Portuguese decimal commas and matrix element separators.

## Important limitation

This report is a **structural QA pass**, not final academic approval.

It does **not** certify all 5 650 questions as mathematically/pedagogically final. Before live eligibility, the bank still needs:
1. mathematical QA of answers and solutions;
2. semantic deduplication beyond exact text matching;
3. curricular alignment review against the official AE;
4. pedagogical/editorial review;
5. validation of difficulty, cognitive labels, misconceptions and evidence signatures;
6. safe integration with year scope and 12.º optional-topic selection.

Until those gates are completed, all questions remain `reviewStatus: "prototype"` and must stay disconnected from the live adaptive engine.
