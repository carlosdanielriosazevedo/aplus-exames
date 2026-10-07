import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const component=readFileSync(new URL("../app/components/PortuguesePassageMiniExam.js",import.meta.url),"utf8");
const engine=readFileSync(new URL("../app/lib/portugueseEngine.js",import.meta.url),"utf8");
const draft=readFileSync(new URL("../app/lib/portugueseMiniExamDraft.js",import.meta.url),"utf8");

// Current product contract: the app grades, the student does not award their own points.
assert.match(component,/gradePortugueseResponse\(row,value\)/u,"Português deve usar o corretor automático nas respostas abertas");
assert.match(component,/Avaliação automática por critérios/u,"a revisão deve identificar explicitamente a avaliação automática");
assert.match(component,/ptx-criterion-levels is-locked/u,"os critérios apresentados na revisão devem estar bloqueados");
assert.match(component,/Resposta submetida e fechada/u,"a tentativa deve ficar fechada depois da entrega");
assert.match(component,/Esta tentativa não pode ser alterada depois de veres a avaliação/u,"a regra de bloqueio deve ser explicada ao aluno");
assert.match(component,/classificação mantém-se provisória/u,"incerteza do corretor deve ser comunicada como resultado provisório");

// Never restore the retired student self-scoring / post-correction rewrite UX.
for(const forbidden of [
  />Melhorar resposta</u,
  />Guardar nova versão</u,
  />Cumpri</u,
  />Não cumpri</u,
  /onClick=\{[^}]*updateCriterion/u,
  /onClick=\{[^}]*startRevision/u,
  /onClick=\{[^}]*saveRevision/u
])assert.doesNotMatch(component,forbidden,"a UI não pode devolver autoridade de classificação ou reescrita pós-correção ao aluno");

// The automatic engine must expose uncertainty/review rather than silently using confidence as a points penalty.
assert.match(engine,/requiresReview/u,"o motor deve conseguir sinalizar respostas para revisão");
assert.match(engine,/confidence/u,"o motor deve manter sinais de confiança separados da apresentação da resposta");

// Backward-compatible draft fields may remain while old attempts exist, but they cannot re-enable editing.
assert.match(draft,/answers/u,"rascunhos devem continuar a preservar as respostas originais");
assert.match(component,/answers\[row\.id\]/u,"a revisão deve mostrar a resposta submetida original");

console.log("=== PORTUGUESE AUTOMATIC GRADING CONTRACT ===");
console.log("✓ app grades open responses by criteria");
console.log("✓ criterion states are locked after submission");
console.log("✓ no student self-scoring controls");
console.log("✓ no post-correction answer rewrite controls");
console.log("✓ uncertainty remains review/provisional, not silent student self-assessment");
console.log("PORTUGUESE AUTOMATIC GRADING CONTRACT: GO");
