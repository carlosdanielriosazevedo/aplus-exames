import assert from "node:assert/strict";
import {
  GRADER_VALIDATION_CONSENT_KEY,
  GRADER_VALIDATION_SUBJECTS,
  graderValidationConsent,
  setGraderValidationConsent,
  validationSplitForRealResponse,
  capturePhysicsChemistryValidationCase,
  capturePortugueseValidationCase,
  captureMathematicsValidationCase
} from "../app/lib/graderValidationCapture.js";
import {
  GRADER_VALIDATION_STORAGE_KEY,
  loadLocalValidationDataset,
  exportValidationDataset,
  importValidationExports,
  exportBlindTeacherPack,
  datasetReadiness
} from "../app/lib/graderValidationDataset.js";

const store=new Map();
global.localStorage={
  getItem:key=>store.has(key)?store.get(key):null,
  setItem:(key,value)=>store.set(key,String(value)),
  removeItem:key=>store.delete(key)
};

assert.deepEqual(GRADER_VALIDATION_SUBJECTS,["mathematics","portuguese","physics-chemistry-a"]);
assert.equal(graderValidationConsent(),false,"consentimento deve começar desligado");
setGraderValidationConsent(true);
assert.equal(localStorage.getItem(GRADER_VALIDATION_CONSENT_KEY),"accepted");
assert.equal(graderValidationConsent(),true);

const fqaItem={id:"fqa-real-validation-audit",prompt:"Justifica cientificamente a conclusão.",responseType:"restricted-response",maxPoints:10,gradingMode:"rubric"};
const fqaResponse="A conclusão resulta da relação entre as grandezas pedidas.";
const splitA=validationSplitForRealResponse({subject:"physics-chemistry-a",itemId:fqaItem.id,response:fqaResponse});
const splitB=validationSplitForRealResponse({subject:"physics-chemistry-a",itemId:fqaItem.id,response:fqaResponse});
assert.equal(splitA,splitB,"split deve ser determinístico");
assert.ok(["calibration","holdout"].includes(splitA));

const fqaCaptured=capturePhysicsChemistryValidationCase({item:fqaItem,response:fqaResponse,result:{status:"partial",points:5,maxPoints:10,reviewRequired:true,errorDiagnosis:{code:"insufficient_justification"}}});
assert.equal(fqaCaptured.ok,true,"FQ A aberta consentida deve ser capturada");

const ptItem={id:"pt-real-validation-audit",prompt:"Explicita o efeito expressivo do recurso no excerto.",responseType:"restricted-response",maxPoints:12};
const ptResponse="O recurso reforça a oposição entre as duas atitudes da personagem.";
const ptCaptured=capturePortugueseValidationCase({item:ptItem,response:ptResponse,result:{status:"partial",provisionalPoints:8,maxPoints:12,rubricCompleted:true,autoAssessmentConfidence:78,feedbackSummary:{errorDiagnosis:{code:"incomplete_answer"}}}});
assert.equal(ptCaptured.ok,true,"Português aberto consentido deve ser capturado");

const mathItem={id:"math-real-validation-audit",q:"Determina o valor e apresenta o desenvolvimento.",points:20,response:{type:"stepwise",steps:[{id:"s1",label:"Cálculo",points:20,expected:"x=2"}]}};
const mathResponse={working:"2x=4, logo x=2",steps:{s1:"x=2"}};
const mathCaptured=captureMathematicsValidationCase({item:mathItem,response:mathResponse,result:{status:"correct",correct:true,points:20,maxPoints:20,reviewRequired:false,classificationConfidence:"high",errorDiagnosis:{code:"correct_or_near_correct"}}});
assert.equal(mathCaptured.ok,true,"Matemática construída consentida deve ser capturada");

const rows=loadLocalValidationDataset();
assert.equal(rows.length,3);
assert.deepEqual(new Set(rows.map(row=>row.subject)),new Set(GRADER_VALIDATION_SUBJECTS));
for(const row of rows){
  assert.equal(row.source,"closed_beta_real");
  assert.ok(!("name" in row)&&!("email" in row)&&!("profile" in row),"dataset não deve incluir identidade/perfil");
}
assert.equal(rows.find(row=>row.subject==="physics-chemistry-a").grader_snapshot.points,5);
assert.equal(rows.find(row=>row.subject==="portuguese").grader_snapshot.points,8);
assert.equal(rows.find(row=>row.subject==="mathematics").grader_snapshot.points,20);

const duplicate=capturePhysicsChemistryValidationCase({item:fqaItem,response:fqaResponse,result:{status:"partial",points:5,maxPoints:10}});
assert.equal(duplicate.code,"ALREADY_CAPTURED","mesma resposta não deve duplicar");
assert.equal(loadLocalValidationDataset().length,3);

assert.equal(capturePortugueseValidationCase({item:{...ptItem,id:"pt-choice",responseType:"multiple-choice"},response:0,result:{}}).code,"NOT_OPEN_RESPONSE");
assert.equal(captureMathematicsValidationCase({item:{...mathItem,id:"math-choice",response:{type:"choice"}},response:0,result:{}}).code,"NOT_OPEN_RESPONSE");

const readiness=datasetReadiness(rows);
for(const subject of GRADER_VALIDATION_SUBJECTS){
  assert.equal(readiness.bySubject[subject].calibration+readiness.bySubject[subject].holdout,1,`${subject} deve aparecer na prontidão`);
}
assert.equal(readiness.humanValidated,false,"dados reais sem labels humanas não tornam o corretor validado");

const exported=exportValidationDataset(rows);
assert.equal(exported.cases.length,3,"exportação deve incluir os três casos reais");
const merged=importValidationExports([exported,exported]);
assert.equal(merged.rows.length,3,"agregação deve deduplicar os mesmos case_id");
assert.equal(merged.invalid.length,0,"export válido não deve ser rejeitado");
const blind=exportBlindTeacherPack(merged.rows);
assert.equal(blind.blind,true);
assert.equal(blind.cases.length,3);
for(const row of blind.cases){
  assert.ok(!("grader_snapshot" in row),"pack do professor não pode conter snapshot do Apronso");
  assert.ok(!("policyScore" in row),"pack do professor não pode conter policy score");
}

const tampered=JSON.parse(JSON.stringify(exported));
tampered.cases[0].student_response="Resposta alterada depois da exportação";
const rejected=importValidationExports([tampered]);
assert.equal(rejected.rows.length,2,"apenas o caso alterado deve ser rejeitado");
assert.equal(rejected.invalid[0].reason,"case_fingerprint_invalid");

setGraderValidationConsent(false);
const denied=capturePhysicsChemistryValidationCase({item:{...fqaItem,id:"fqa-denied"},response:"Outra resposta",result:{}});
assert.equal(denied.code,"VALIDATION_CONSENT_REQUIRED");
assert.equal(loadLocalValidationDataset().length,3);

assert.ok(localStorage.getItem(GRADER_VALIDATION_STORAGE_KEY),"dataset deve ficar separado no storage próprio");
console.log("REAL GRADER CAPTURE · THREE SUBJECTS: GO");
