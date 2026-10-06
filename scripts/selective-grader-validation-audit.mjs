import assert from "node:assert/strict";
import fs from "node:fs";
import {
  SELECTIVE_STATUS,preCalibrationPolicyScore,responseFamily,selectiveGradingDecision
} from "../app/lib/selectiveGrading.js";
import {
  makeGraderValidationCase,blindTeacherCase,thresholdTuningCases,datasetReadiness,deterministicValidationSplit,graderValidationCaseFingerprint
} from "../app/lib/graderValidationDataset.js";
import {GRADER_VALIDATION_CONSENT_VERSION} from "../app/lib/graderValidationConsent.js";
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

function responseForSplit(target,itemId){
  for(let i=0;i<500;i++){
    const response=`Resposta real de validação ${target} ${i}.`;
    if(deterministicValidationSplit({participantId:"gvp-audit",subject:"physics-chemistry-a",itemId,response})===target)return response;
  }
  throw new Error(`não foi possível gerar split ${target}`);
}
function realCase(itemId,target,decision){
  const response=responseForSplit(target,itemId);
  const row=makeGraderValidationCase({
    source:"closed_beta_real",participantId:"gvp-audit",subject:"physics-chemistry-a",responseFamily:"fqa_conceptual",
    itemId,question:"Explica e justifica o fenómeno.",response,consentVersion:GRADER_VALIDATION_CONSENT_VERSION,
    graderSnapshot:{decision}
  });
  assert.equal(row.split,target,"split real deve ser derivado deterministicamente");
  assert.equal(row.case_fingerprint,graderValidationCaseFingerprint(row));
  return row;
}
const calibrationCase=realCase("fqa-demo-1","calibration","partial");
const holdoutCase=realCase("fqa-demo-2","holdout","accept");
const repeated=makeGraderValidationCase({
  source:"closed_beta_real",participantId:"gvp-audit",subject:calibrationCase.subject,responseFamily:calibrationCase.response_family,
  itemId:calibrationCase.item_id,question:calibrationCase.question,response:calibrationCase.student_response,
  consentVersion:GRADER_VALIDATION_CONSENT_VERSION,split:"holdout",graderSnapshot:{decision:"partial"}
});
assert.equal(repeated.split,"calibration","caller não pode forçar um caso real para outro split");
assert.equal(repeated.case_id,calibrationCase.case_id,"identidade do caso deve ser estável");

const blind=blindTeacherCase(calibrationCase);
assert.equal(blind.grader_snapshot,undefined,"pack cego nunca mostra snapshot do Apronso");
assert.equal(blind.participant_id,undefined,"pack cego não mostra pseudónimo do participante");
assert.equal(blind.systemDecision,undefined,"pack cego nunca mostra decisão do sistema");
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
assert.match(datasetSource,/deterministicValidationSplit/u,"split real deve ser determinístico");
assert.match(datasetSource,/VALIDATION_SPLIT_IMMUTABLE/u,"split guardado deve ser imutável");
assert.doesNotMatch(datasetSource,/student_cloud_state/u,"dataset de validação não deve entrar na cloud normal do progresso");

const consentSource=fs.readFileSync("app/lib/graderValidationConsent.js","utf8");
assert.match(consentSource,/granted:false/u,"consentimento deve começar desligado");
const welcome=fs.readFileSync("app/components/Welcome.js","utf8");
assert.match(welcome,/Ajudar a validar o corretor automático \(opcional\)/u,"closed beta deve mostrar opt-in explícito");
assert.match(welcome,/identificador pseudónimo/u,"copy não deve prometer anonimato absoluto");
const endpoint=fs.readFileSync("app/api/grader-validation/cases/route.js","utf8");
assert.match(endpoint,/deterministicValidationSplit/u,"servidor deve recalcular o split");
assert.match(endpoint,/graderValidationCaseFingerprint/u,"servidor deve validar fingerprint");
assert.match(endpoint,/grader_validation_case/u,"respostas devem ter canal de persistência dedicado");
const fqa=fs.readFileSync("app/lib/physicsChemistryRubric.js","utf8");
assert.match(fqa,/captureRealGraderValidationCase/u,"FQ A deve capturar respostas abertas consentidas");

const policySource=fs.readFileSync("app/lib/selectiveGrading.js","utf8");
assert.doesNotMatch(policySource,/graderResult\.confidence/u,"policyScore não deve depender da autoconfiança declarada do modelo");
assert.match(policySource,/pt_extended:\{minPolicyScore:0\.97/u,"Português extenso deve começar com política mais conservadora");

console.log("✓ selective grader: deterministic split, explicit consent, FQ A real capture, blind review and holdout protection verified");
console.log("ℹ Human agreement remains NOT MEASURED until independent teacher labels from real responses are imported.");
