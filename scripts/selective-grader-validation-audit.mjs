import assert from "node:assert/strict";
import fs from "node:fs";
import {
  SELECTIVE_STATUS,preCalibrationPolicyScore,responseFamily,selectiveGradingDecision
} from "../app/lib/selectiveGrading.js";
import {
  makeGraderValidationCase,blindTeacherCase,thresholdTuningCases,datasetReadiness
} from "../app/lib/graderValidationDataset.js";
import {
  summarizeSelectiveValidation,humanValidationReleaseStatus
} from "../app/lib/selectiveValidationMetrics.js";

const strongResult={
  scorePercent:96,semanticScore:0.98,relationScore:0.97,coherenceScore:0.98,
  substanceScore:0.98,ambiguityScore:0,matchedCriteriaCount:4,totalCriteriaCount:4,
  requiresReview:false
};
assert.ok(preCalibrationPolicyScore(strongResult)>0.9,"sinais fortes devem gerar policyScore elevado");
assert.equal(responseFamily("mathematics",{responseType:"numeric"}),"math_numeric");
assert.equal(responseFamily("portuguese",{responseType:"extended-writing"}),"pt_extended");

const mathPre=selectiveGradingDecision({subject:"mathematics",question:{responseType:"numeric"},graderResult:strongResult});
assert.equal(mathPre.decision,"accept");
assert.equal(mathPre.definitive,false,"pré-calibração nunca pode ser apresentada como decisão definitiva validada");
assert.ok(mathPre.reasons.includes("NOT_HUMAN_CALIBRATED"));

const ptPre=selectiveGradingDecision({subject:"portuguese",question:{responseType:"extended-writing"},graderResult:strongResult});
assert.equal(ptPre.decision,"abstain","Português interpretativo deve abster-se antes de validação humana");
assert.ok(ptPre.reasons.includes("CLASS_REQUIRES_HUMAN_CALIBRATION"));

const ambiguous=selectiveGradingDecision({
  subject:"physics-chemistry-a",question:{responseType:"restricted-response"},
  graderResult:{...strongResult,ambiguityScore:0.7,requiresReview:true}
});
assert.equal(ambiguous.decision,"abstain");
assert.ok(ambiguous.reasons.includes("AMBIGUOUS_RESPONSE"));

const calibrationCase=makeGraderValidationCase({
  source:"closed_beta_real",split:"calibration",subject:"physics-chemistry-a",responseFamily:"fqa_conceptual",
  itemId:"fqa-demo-1",question:"Explica o fenómeno.",response:"Resposta real anonimizada.",graderSnapshot:{decision:"partial"}
});
const holdoutCase=makeGraderValidationCase({
  source:"closed_beta_real",split:"holdout",subject:"physics-chemistry-a",responseFamily:"fqa_conceptual",
  itemId:"fqa-demo-2",question:"Justifica.",response:"Outra resposta anonimizada.",graderSnapshot:{decision:"accept"}
});

const blind=blindTeacherCase(calibrationCase);
assert.equal(blind.grader_snapshot,undefined,"pack cego nunca mostra snapshot do Apronso");
assert.equal(blind.systemDecision,undefined,"pack cego nunca mostra decisão do sistema");
assert.equal(blind.student_response,"Resposta real anonimizada.");
assert.throws(()=>thresholdTuningCases([calibrationCase,holdoutCase]),/HOLDOUT_MUST_NOT_TUNE_THRESHOLDS/,"holdout não pode afinar thresholds");
assert.equal(thresholdTuningCases([calibrationCase]).length,1);

const metrics=summarizeSelectiveValidation({
  cases:[calibrationCase,holdoutCase],
  humanLabels:[
    {case_id:calibrationCase.case_id,reviewer:"prof-a",score_percent:60,decision:"partial"},
    {case_id:holdoutCase.case_id,reviewer:"prof-a",score_percent:90,decision:"accept"}
  ],
  systemDecisions:[
    {case_id:calibrationCase.case_id,scorePercent:65,decision:"partial",policyScore:0.91,responseFamily:"fqa_conceptual"},
    {case_id:holdoutCase.case_id,scorePercent:95,decision:"accept",policyScore:0.97,responseFamily:"fqa_conceptual"}
  ]
});
assert.equal(metrics.overall.decisionAgreement,100);
assert.equal(metrics.overall.catastrophicErrorRate,0);
assert.equal(metrics.holdout.coverage,100);

const readiness=datasetReadiness([calibrationCase,holdoutCase]);
const release=humanValidationReleaseStatus({metrics,datasetReadiness:readiness});
assert.equal(release.humanValidated,false,"dois casos nunca podem promover o corretor para human_validated");
assert.equal(release.status,"human_calibration_started");

const teacherUi=fs.readFileSync("app/components/GraderTeacherValidation.js","utf8");
assert.match(teacherUi,/não mostra a classificação nem a decisão do Apronso/u);
assert.match(teacherUi,/data\.cases\.some\(x=>x\.grader_snapshot\|\|x\.systemDecision/u,"UI deve rejeitar packs com leakage do sistema");

const datasetSource=fs.readFileSync("app/lib/graderValidationDataset.js","utf8");
assert.match(datasetSource,/VALIDATION_CONSENT_REQUIRED/u,"recolha real deve exigir consentimento explícito");
assert.match(datasetSource,/GRADER_VALIDATION_STORAGE_KEY/u,"respostas de validação devem usar armazenamento separado do progresso");
assert.doesNotMatch(datasetSource,/student_cloud_state/u,"dataset de validação não deve entrar na cloud normal do progresso");

const policySource=fs.readFileSync("app/lib/selectiveGrading.js","utf8");
assert.doesNotMatch(policySource,/graderResult\.confidence/u,"policyScore não deve depender da autoconfiança declarada do modelo");
assert.match(policySource,/pt_extended:\{minPolicyScore:0\.97/u,"Português extenso deve começar com política mais conservadora");

console.log("✓ selective grader: abstention, blind human review, consent, holdout protection and validation metrics verified");
console.log("ℹ Human agreement remains NOT MEASURED until independent teacher labels from real responses are imported.");
