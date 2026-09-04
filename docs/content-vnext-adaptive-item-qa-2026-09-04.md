# vNext content bank — adaptive item independence QA

Date: 2026-09-04  
Branch: `content/math-a-curriculum-map`  
Scope: `content/vnext/math-a/`

## Why this QA exists

The adaptive engine may select any eligible question for a Mission, Training session or Mini-exam. Therefore a question cannot rely on the student having seen the immediately previous item.

Wording such as:

- "no item anterior";
- "na função anterior";
- "no mesmo caso";
- "na mesma distribuição";
- "na mesma matriz";
- "para o mesmo P";
- "na sucessão anterior";

is unsafe unless all required data is repeated inside the question itself.

## Result

A full pass was made over the complete vNext bank:

- **10.º: 31 files / 1 550 questions**
- **11.º: 35 files / 1 750 questions**
- **12.º: 47 files / 2 350 questions**
- **Total: 113 files / 5 650 questions**

All contextual dependencies detected by the adaptive-item blocker rules were rewritten so that the affected questions now carry the data required to solve them independently.

After the rewrites, the complete bank was rechecked in chunks against the same blocker patterns and the result was:

- **context-dependency blockers: 0**
- **structural blockers in the same pass: 0**

The structural checks preserved after the rewrites were:

- exactly 50 questions per JSON batch;
- local question IDs unique;
- local question texts unique;
- exactly four unique options per question;
- answer index in 0–3;
- correct-answer position distribution 13 / 13 / 12 / 12 per batch.

## Reusable guard added

A repository audit was added:

`scripts/vnext-content-audit.mjs`

and exposed through:

`npm run vnext-content:audit`

The audit checks:

- expected 113 batches and 5 650 questions;
- expected year totals;
- required metadata;
- local/global ID integrity;
- four unique options;
- answer-position balance;
- Mission / Training / Exam contexts;
- prototype/origin metadata;
- theme/subtopic/year consistency;
- known contextual-dependency phrases that are unsafe for adaptive selection;
- exact duplicate question text across the global bank as a warning.

## Important limitation

This pass certifies **structural/adaptive independence only**.

It does not turn the bank into reviewed production content. All items remain:

`reviewStatus: "prototype"`

The next gate is mathematical and pedagogical QA: recomputing answers/solutions, checking curricular depth, semantic duplication, difficulty/cognitive labels, misconceptions and evidence signatures before any item becomes live-eligible.
