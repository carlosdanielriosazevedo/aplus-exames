import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const mini=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");
const full=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const draft=readFileSync(new URL("../app/lib/physicsChemistryExamDraft.js",import.meta.url),"utf8");
const subject=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");

assert.match(mini,/answeredCount/u,"Mini-exame: deve mostrar quantas respostas foram dadas.");
assert.match(mini,/provisional/u,"Mini-exame: deve distinguir correção construída provisória.");
assert.match(mini,/openPending/u,"Mini-exame: deve contar avaliações de confiança reduzida.");
assert.match(mini,/fqa-review-/u,"Mini-exame: cada item deve manter uma âncora de revisão.");
assert.match(mini,/Avaliação automática/u,"Mini-exame: respostas construídas devem ter estado de avaliação automática.");
assert.match(mini,/confiança reduzida/u,"Mini-exame: incerteza deve ser explícita.");
assert.match(mini,/Guardar revisão e terminar/u,"Mini-exame: a revisão deve poder ser concluída explicitamente.");

assert.match(full,/filled/u,"Exame Completo: deve mostrar quantas respostas foram dadas.");
assert.match(full,/pendingOpen/u,"Exame Completo: deve contar respostas de confiança reduzida.");
assert.match(full,/hasProvisional/u,"Exame Completo: deve distinguir quando há classificação provisória.");
assert.match(full,/fqa-review-/u,"Exame Completo: cada item deve manter uma âncora de revisão.");
assert.match(full,/Provisório/u,"Exame Completo: respostas construídas devem ser identificadas como provisórias.");
assert.match(full,/confiança reduzida/u,"Exame Completo: incerteza deve ser explícita.");
assert.match(full,/Guardar revisão e terminar/u,"Exame Completo: a revisão deve poder ser concluída explicitamente.");

for(const [label,source] of [["Mini-exame",mini],["Exame Completo",full]]){
  assert.match(source,/savePhysicsChemistryExamDraft/u,label+": deve persistir o rascunho e a fase de revisão.");
  assert.match(source,/review/u,label+": deve preservar explicitamente o estado de revisão.");
  assert.doesNotMatch(source,/PhysicsChemistryReviewProgress/u,label+": não deve depender da antiga revisão manual por critérios.");
}

assert.match(draft,/review:!!review/u,"o rascunho deve persistir explicitamente a fase de revisão.");
assert.match(subject,/REVISÃO EM PAUSA/u,"a área de Exames deve tornar uma revisão guardada facilmente retomável.");
assert.match(subject,/loadPhysicsChemistryExamDraft/u,"o hub de Exames deve ler os rascunhos guardados.");

console.log("✓ FQ A review status: respondidas · provisórias · confiança reduzida · revisão persistente · retoma visível");
