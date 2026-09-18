import assert from "node:assert/strict";
import {writingRevisionDelta,writingRevisionNextStep,writingCycleSummary} from "../app/lib/portugueseWritingCycle.js";

const criteria=[
  {id:"conteudo",label:"Conteúdo e desenvolvimento"},
  {id:"fundamentacao",label:"Fundamentação e evidência"}
];

const before={
  conteudo:{status:"partial",evidence:"Identifiquei a ideia principal."},
  fundamentacao:{status:"not-yet",evidence:""}
};
const after={
  conteudo:{status:"met",evidence:"Identifiquei e desenvolvi a ideia principal no segundo parágrafo."},
  fundamentacao:{status:"partial",evidence:"Usei a passagem final do texto como apoio."}
};

const delta=writingRevisionDelta(criteria,before,after);
assert.equal(delta.improved.length,2,"deve reconhecer melhorias autoassinaladas sem as converter em nota");
assert.equal(delta.evidenceImproved.length,2,"deve reconhecer evidência adicionada ou revista");
assert.equal(delta.stillAttention.length,1,"deve manter visível o critério que continua parcial");

const next=writingRevisionNextStep(criteria,before,after);
assert.equal(next.kind,"attention");
assert.equal(next.criterionId,"fundamentacao");
assert.match(next.message,/passagem concreta/u);

const summary=writingCycleSummary({criteria,before,after,revisionCount:1});
assert.equal(summary.revisionCount,1);
assert.equal(summary.attentionCount,1);
assert.match(summary.message,/não atribui classificação/u);

const complete={
  conteudo:{status:"met",evidence:"Parágrafo 2."},
  fundamentacao:{status:"met",evidence:"Citação explicada no parágrafo 3."}
};
assert.equal(writingRevisionNextStep(criteria,after,complete).kind,"consolidate");

console.log("Portuguese writing cycle audit: OK");
