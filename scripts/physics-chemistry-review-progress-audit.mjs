import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const mini=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");
const full=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const draft=readFileSync(new URL("../app/lib/physicsChemistryExamDraft.js",import.meta.url),"utf8");
const subject=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const safeRestore=readFileSync(new URL("../app/lib/physicsChemistrySubmittedRecovery.js",import.meta.url),"utf8");

assert.match(mini,/answeredCount/u,"Mini-exame: deve mostrar quantas respostas foram dadas.");
assert.match(mini,/ungraded/u,"Mini-exame: deve contar respostas sem classificação automática.");
assert.match(mini,/openPending/u,"Mini-exame: deve contar respostas que exigem validação.");
assert.match(mini,/fqa-review-/u,"Mini-exame: cada item deve manter uma âncora de revisão.");
assert.match(mini,/Sem nota automática/u,"Mini-exame: respostas abertas devem ser identificadas como não classificadas.");
assert.match(mini,/respostas científicas abertas não têm nota automática/u,"Mini-exame: deve explicar ausência de pontuação automática.");
assert.match(mini,/Guardar revisão e terminar/u,"Mini-exame: a revisão deve poder ser concluída explicitamente.");

assert.match(full,/filled/u,"Exame Completo: deve mostrar quantas respostas foram dadas.");
assert.match(full,/pendingOpen/u,"Exame Completo: deve contar respostas ainda não validadas.");
assert.match(full,/hasProvisional/u,"Exame Completo: deve distinguir quando há classificação provisória.");
assert.match(full,/fqa-review-/u,"Exame Completo: cada item deve manter uma âncora de revisão.");
assert.match(full,/Sem nota automática/u,"Exame Completo: distinguir resposta científica sem nota.");
assert.match(full,/não é nota final/u,"Exame Completo: não apresentar subtotal como classificação final.");
assert.match(full,/Guardar revisão e terminar/u,"Exame Completo: a revisão deve poder ser concluída explicitamente.");

for(const [label,source] of [["Mini-exame",mini],["Exame Completo",full]]){
  assert.match(source,/savePhysicsChemistryExamDraft/u,label+": deve persistir o rascunho e a fase de revisão.");
  assert.match(source,/review/u,label+": deve preservar explicitamente o estado de revisão.");
  assert.doesNotMatch(source,/PhysicsChemistryReviewProgress/u,label+": não deve depender da antiga revisão manual por critérios.");
}

assert.match(draft,/review:!!review/u,"o rascunho deve persistir explicitamente a fase de revisão.");
assert.match(subject,/REVISÃO EM PAUSA/u,"a área de Exames deve tornar uma revisão guardada facilmente retomável.");
assert.match(subject,/loadPhysicsChemistryExamDraft/u,"o hub de Exames deve ler os rascunhos guardados.");
assert.match(subject,/restorePhysicsChemistrySubmittedResponse/u,"retomar uma sessão não pode ressuscitar pontuação científica antiga.");
assert.match(safeRestore,/automaticScoringSuspended:true/u,"submissões antigas sem texto devem continuar bloqueadas, sem nota.");
assert.match(safeRestore,/provisionalPoints:null/u,"a retoma deve deixar qualquer nota científica não validada em null.");

console.log("✓ FQ A review status: respondidas · sem falsas notas · validação pendente · revisão persistente · retoma visível");
