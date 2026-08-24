
import assert from "node:assert/strict";
import {QUESTION_BANK} from "../app/data/content.js";
import {
  applyEditorialDecision,betaContentReadiness,contentRevisionFingerprint,isEligibleForContext
} from "../app/lib/quality.js";
import {
  machineValidationPassport,machineClosedBetaEligible,deterministicTeacherSample
} from "../app/lib/validationPolicy.js";
import {
  hybridValidationPlan,hybridValidationSummary,hybridBetaReadiness
} from "../app/lib/hybridValidation.js";
import {buildHybridTeacherBatches} from "../app/lib/hybridTeacherReview.js";
import {machineOracleCheck} from "../app/lib/machineMathOracle.js";

const plan=hybridValidationPlan({},[]);
const summary=hybridValidationSummary({},[]);
const readiness=hybridBetaReadiness({},[]);

assert.equal(plan.conservativeRoadmap.approvalsNeeded,64);
assert.equal(plan.machineCount,24);
assert.equal(plan.mandatoryHumanCount,40);
assert.equal(plan.teacherSampleCount,5);
assert.equal(plan.humanTargetCount,45);
assert.equal(summary.savedHumanReviews,19);
assert.equal(summary.savedPct,30);
assert.equal(readiness.canClosedBeta,false);
assert.equal(readiness.score,50);
assert.deepEqual(readiness.reasons,[
  "40 revisões humanas obrigatórias por concluir",
  "5 itens da amostra humana por rever"
]);

// Todas as 24 questões do lane de máquina têm oracle + fingerprint válido.
for(const q of plan.machineLane){
  const oracle=machineOracleCheck(q);
  const passport=machineValidationPassport(q);
  assert.equal(oracle.supported,true,`${q.id} sem oracle`);
  assert.equal(oracle.passed,true,`${q.id} oracle falhou`);
  assert.equal(passport.attestationMatch,true,`${q.id} fingerprint não bate`);
  assert.equal(passport.preReviewAttestedClean,true,`${q.id} sem atestação QA clean`);
  assert.equal(passport.closedBetaEligible,true,`${q.id} não elegível para beta híbrida`);
  assert.equal(passport.productionEligible,false,`${q.id} não pode ficar production machine-only`);
  assert.equal(passport.externalSecondValidator,"not_configured");
}

// Uma alteração editorial invalida imediatamente a atestação.
const source=plan.machineLane[0];
const mutated={...source,q:source.q+" alteração"};
const stale=machineValidationPassport(mutated);
assert.equal(stale.attestationMatch,false);
assert.equal(stale.closedBetaEligible,false);
assert.equal(stale.status,"stale_attestation");

// Diagnóstico nunca entra no lane machine-only.
const diagnostic=QUESTION_BANK.find(q=>q.contexts?.includes("diagnostic"));
assert.ok(diagnostic);
assert.equal(machineClosedBetaEligible(diagnostic),false);

// Lane de máquina entra em closed beta mas não em production.
const machineItem=plan.machineLane[0];
assert.equal(isEligibleForContext(machineItem,"mission",{},"closed_beta"),true);
assert.equal(isEligibleForContext(machineItem,"mission",{},"production"),false);

// Amostra de 20% é determinística e mantém representação temporal.
const sampleA=deterministicTeacherSample(plan.machineLane,{rate:0.20});
const sampleB=deterministicTeacherSample(plan.machineLane,{rate:0.20});
assert.deepEqual(sampleA.map(x=>x.id),sampleB.map(x=>x.id));
assert.equal(sampleA.length,5);
assert.ok(sampleA.some(x=>x.themeId.startsWith("10-")));
assert.ok(sampleA.some(x=>x.themeId.startsWith("11-")));
assert.ok(sampleA.some(x=>x.themeId.startsWith("12-")));

// Plano híbrido do professor: 45 questões -> 6 lotes.
const ops=buildHybridTeacherBatches({},[],{batchSize:8,reviewer:"Prof. Híbrido"});
assert.equal(ops.hybridTarget,45);
assert.equal(ops.remaining,45);
assert.equal(ops.machineLane,24);
assert.equal(ops.batches.length,6);
assert.equal(ops.batches.reduce((n,b)=>n+b.count,0),45);
assert.equal(ops.batches.reduce((n,b)=>n+b.sampleCount,0),5);
assert.equal(ops.batches.reduce((n,b)=>n+b.mandatoryCount,0),40);
assert.ok(ops.batches.flatMap(b=>b.rows).every(r=>["human_required","teacher_sample"].includes(r.hybrid_lane)));

// Simular exatamente as 45 revisões humanas previstas.
const checklist={
  math:true,clarity:true,unique:true,distractors:true,
  solution:true,taxonomy:true,difficulty:true,hypothesis:true
};
let overrides={};
for(const item of plan.humanTarget){
  const current=QUESTION_BANK.find(q=>q.id===item.id);
  overrides=applyEditorialDecision(overrides,item.id,"approve",{
    reviewer:"SIMULAÇÃO HÍBRIDA",
    checklist,
    source:"hybrid_simulation",
    contentFingerprint:contentRevisionFingerprint(current)
  });
}

const hybridAfter=hybridBetaReadiness(overrides,[]);
assert.equal(hybridAfter.canClosedBeta,true);
assert.equal(hybridAfter.score,87);
assert.deepEqual(hybridAfter.reasons,[]);

// O gate conservador continua diferente: não fingimos que as 19 questões machine-only
// foram revistas por professor.
const conservativeAfter=betaContentReadiness(overrides,[]);
assert.equal(conservativeAfter.canClosedBeta,false);
assert.ok(conservativeAfter.totalReviewed<64);

// Se um item da amostra humana não for revisto, o gate híbrido volta a fechar.
const sampleId=plan.teacherSample[0].id;
const withoutSample={...overrides};
delete withoutSample[sampleId];
const missingSample=hybridBetaReadiness(withoutSample,[]);
assert.equal(missingSample.canClosedBeta,false);
assert.ok(missingSample.reasons.some(x=>/amostra humana/i.test(x)));

console.log("✓ hybrid validation: 64 → 45 human reviews · 24 machine lane · 20% sample · fingerprint invalidation · closed-beta gate validated");
