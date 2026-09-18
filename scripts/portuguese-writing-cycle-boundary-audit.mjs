import assert from "node:assert/strict";
import {writingRevisionDelta,writingRevisionNextStep,writingCycleSummary} from "../app/lib/portugueseWritingCycle.js";

assert.deepEqual(writingRevisionDelta([],{},{}).rows,[]);
assert.equal(writingCycleSummary({criteria:[],revisionCount:-4}).revisionCount,0);

const criteria=[{id:"c",label:"Critério"}];
const reconsidered=writingRevisionDelta(criteria,{c:{status:"met",evidence:"x"}},{c:{status:"partial",evidence:"x"}});
assert.equal(reconsidered.reconsidered.length,1,"deve mostrar reconsideração sem a tratar como falha automática");
assert.equal(reconsidered.stillAttention.length,1);

const pending=writingRevisionNextStep(criteria,{},{});
assert.equal(pending.kind,"attention");
assert.equal(pending.criterionId,"c");

const evidenceOnly=writingRevisionDelta(criteria,{c:{status:"met",evidence:"frase A"}},{c:{status:"met",evidence:"frase B"}});
assert.equal(evidenceOnly.improved.length,0);
assert.equal(evidenceOnly.evidenceImproved.length,1);

console.log("Portuguese writing cycle boundary audit: OK");
