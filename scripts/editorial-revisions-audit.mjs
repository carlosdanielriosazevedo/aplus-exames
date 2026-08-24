
import assert from "node:assert/strict";
import {QUESTION_BANK} from "../app/data/content.js";
import {
  contentRevisionFingerprint,effectiveEditorialItem,effectiveReviewStatus,
  applyEditorialDecision,betaContentReadiness
} from "../app/lib/quality.js";
import {
  revisionCandidateFromItem,validateRevisionCandidate,applyContentRevision,
  revertLastContentRevision,editorialRevisionSummary
} from "../app/lib/editorialRevisions.js";
import {eligibleQuestions} from "../app/lib/engine.js";

const item=QUESTION_BANK.find(q=>q.contexts?.includes("mission")&&q.contexts?.includes("training"));
assert.ok(item,"Precisa de uma questão mission+training para o audit.");

const originalFingerprint=contentRevisionFingerprint(item);
const checklist={
  math:true,clarity:true,unique:true,distractors:true,
  solution:true,taxonomy:true,difficulty:true,hypothesis:true
};

// Aprovação da versão original.
let overrides=applyEditorialDecision({},item.id,"approve",{
  reviewer:"Prof. A",
  checklist,
  contentFingerprint:originalFingerprint
});
assert.equal(effectiveReviewStatus(item,overrides),"reviewed");
assert.equal(overrides[item.id].version,1);

// Candidato parte exatamente da versão efetiva.
const candidate=revisionCandidateFromItem(effectiveEditorialItem(item,overrides));
candidate.q=`${candidate.q} (versão revista)`;
candidate.sol=`${candidate.sol} Nota editorial adicional.`;

const validation=validateRevisionCandidate(item,candidate);
assert.equal(validation.valid,true);
assert.equal(validation.diff.length,2);
assert.notEqual(validation.beforeFingerprint,validation.afterFingerprint);

// Aplicar alteração gera v2, invalida aprovação e mantém histórico.
const revised=applyContentRevision(overrides,item.id,candidate,{
  editor:"Equipa editorial",
  note:"Clarificação pedida pelo professor",
  requestedBy:"Prof. A",
  at:1000
});
assert.equal(revised.ok,true);
overrides=revised.overrides;
assert.equal(overrides[item.id].version,2);
assert.equal(overrides[item.id].status,"pending");
assert.equal(overrides[item.id].reviewedFingerprint,null);
assert.equal(overrides[item.id].revisionHistory.length,1);
assert.equal(effectiveReviewStatus(item,overrides),"pending");

const effectiveV2=effectiveEditorialItem(item,overrides);
assert.equal(effectiveV2.q,candidate.q);
assert.equal(effectiveV2.sol,candidate.sol);
assert.equal(effectiveV2.id,item.id);
assert.equal(effectiveV2.themeId,item.themeId);
assert.equal(effectiveV2.microcompetencyId,item.microcompetencyId);
assert.equal(contentRevisionFingerprint(effectiveV2),validation.afterFingerprint);

// Engine usa o patch editorial no modo interno.
const state={
  editorialOverrides:overrides,
  betaMode:"internal"
};
const fromEngine=eligibleQuestions(state,item.themeId,"mission",item.focus)
  .find(q=>q.id===item.id);
assert.ok(fromEngine);
assert.equal(fromEngine.q,candidate.q);

// Em closed beta, pending não é elegível.
const closedPending=eligibleQuestions({...state,betaMode:"closed_beta"},item.themeId,"mission",item.focus)
  .find(q=>q.id===item.id);
assert.equal(closedPending,undefined);

// Nova aprovação tem de aprovar exatamente o fingerprint v2.
overrides=applyEditorialDecision(overrides,item.id,"approve",{
  reviewer:"Prof. B",
  checklist,
  contentFingerprint:contentRevisionFingerprint(effectiveV2)
});
assert.equal(effectiveReviewStatus(item,overrides),"reviewed");
assert.equal(overrides[item.id].reviewedFingerprint,contentRevisionFingerprint(effectiveV2));

const closedReviewed=eligibleQuestions({
  editorialOverrides:overrides,betaMode:"closed_beta"
},item.themeId,"mission",item.focus).find(q=>q.id===item.id);
assert.ok(closedReviewed);
assert.equal(closedReviewed.q,candidate.q);

// Um candidato inválido nunca cria versão.
const invalid=revisionCandidateFromItem(effectiveV2);
invalid.o=["x","x","","y"];
const invalidResult=applyContentRevision(overrides,item.id,invalid,{
  editor:"Equipa"
});
assert.equal(invalidResult.ok,false);
assert.ok(invalidResult.errors.length>=1);
assert.equal(overrides[item.id].version,2);

// Rollback é uma nova versão v3 e também exige revisão.
const rolled=revertLastContentRevision(overrides,item.id,{
  editor:"Equipa editorial",
  at:2000
});
assert.equal(rolled.ok,true);
overrides=rolled.overrides;
assert.equal(overrides[item.id].version,3);
assert.equal(overrides[item.id].status,"pending");
assert.equal(overrides[item.id].revisionHistory.length,2);
assert.equal(overrides[item.id].revisionHistory.at(-1).kind,"rollback");

const effectiveV3=effectiveEditorialItem(item,overrides);
assert.equal(effectiveV3.q,item.q);
assert.equal(effectiveV3.sol,item.sol);
assert.equal(effectiveReviewStatus(item,overrides),"pending");

// IDs/taxonomia não podem ser alterados pelo contentPatch, mesmo se for injetado manualmente.
const malicious={
  ...overrides,
  [item.id]:{
    ...overrides[item.id],
    contentPatch:{
      ...overrides[item.id].contentPatch,
      id:"outro-id",
      themeId:"tema-falso",
      microcompetencyId:"mc-falsa",
      q:"Texto válido para teste"
    }
  }
};
const protectedItem=effectiveEditorialItem(item,malicious);
assert.equal(protectedItem.id,item.id);
assert.equal(protectedItem.themeId,item.themeId);
assert.equal(protectedItem.microcompetencyId,item.microcompetencyId);

// Sumário operacional conta revisões, não as confunde com aprovações.
const summary=editorialRevisionSummary(overrides);
assert.equal(summary.itemsChanged,1);
assert.equal(summary.revisions,2);
assert.equal(summary.pending,1);

// Readiness não ganha pontos por uma revisão editorial pendente.
const readiness=betaContentReadiness(overrides,[]);
assert.equal(readiness.canClosedBeta,false);

console.log("✓ editorial revisions: diff → v2 pending → re-review → rollback v3 · engine overlay · immutable IDs validated");
