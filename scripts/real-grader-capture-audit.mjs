import assert from "node:assert/strict";
import {
  GRADER_VALIDATION_CONSENT_KEY,
  graderValidationConsent,
  setGraderValidationConsent,
  validationSplitForRealResponse,
  capturePhysicsChemistryValidationCase
} from "../app/lib/graderValidationCapture.js";
import {GRADER_VALIDATION_STORAGE_KEY,loadLocalValidationDataset} from "../app/lib/graderValidationDataset.js";

const store=new Map();
global.localStorage={
  getItem:key=>store.has(key)?store.get(key):null,
  setItem:(key,value)=>store.set(key,String(value)),
  removeItem:key=>store.delete(key)
};

assert.equal(graderValidationConsent(),false,"consentimento deve começar desligado");
setGraderValidationConsent(true);
assert.equal(localStorage.getItem(GRADER_VALIDATION_CONSENT_KEY),"accepted");
assert.equal(graderValidationConsent(),true);

const item={id:"fqa-real-validation-audit",prompt:"Justifica cientificamente a conclusão.",responseType:"restricted-response",maxPoints:10,gradingMode:"rubric"};
const response="A conclusão resulta da relação entre as grandezas pedidas.";
const splitA=validationSplitForRealResponse({subject:"physics-chemistry-a",itemId:item.id,response});
const splitB=validationSplitForRealResponse({subject:"physics-chemistry-a",itemId:item.id,response});
assert.equal(splitA,splitB,"split deve ser determinístico");
assert.ok(["calibration","holdout"].includes(splitA));

const captured=capturePhysicsChemistryValidationCase({item,response,result:{status:"partial",points:5,maxPoints:10,reviewRequired:true,errorDiagnosis:{code:"insufficient_justification"}}});
assert.equal(captured.ok,true,"resposta aberta consentida deve ser capturada");
const rows=loadLocalValidationDataset();
assert.equal(rows.length,1);
assert.equal(rows[0].source,"closed_beta_real");
assert.equal(rows[0].subject,"physics-chemistry-a");
assert.equal(rows[0].student_response,response);
assert.equal(rows[0].grader_snapshot.points,5);
assert.ok(!("name" in rows[0])&&!('email' in rows[0])&&!('profile' in rows[0]),"dataset não deve incluir identidade/perfil");

const duplicate=capturePhysicsChemistryValidationCase({item,response,result:{status:"partial",points:5,maxPoints:10}});
assert.equal(duplicate.code,"ALREADY_CAPTURED","mesma resposta não deve duplicar");
assert.equal(loadLocalValidationDataset().length,1);

setGraderValidationConsent(false);
const denied=capturePhysicsChemistryValidationCase({item:{...item,id:"fqa-denied"},response:"Outra resposta",result:{}});
assert.equal(denied.code,"VALIDATION_CONSENT_REQUIRED");
assert.equal(loadLocalValidationDataset().length,1);

assert.ok(localStorage.getItem(GRADER_VALIDATION_STORAGE_KEY),"dataset deve ficar separado no storage próprio");
console.log("REAL GRADER CAPTURE: GO");
