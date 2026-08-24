
import {hybridValidationPlan,hybridBetaReadiness} from "../app/lib/hybridValidation.js";
import {applyEditorialDecision,contentRevisionFingerprint} from "../app/lib/quality.js";
import {QUESTION_BANK} from "../app/data/content.js";

const checklist={
  math:true,clarity:true,unique:true,distractors:true,
  solution:true,taxonomy:true,difficulty:true,hypothesis:true
};
let overrides={};
const initial=hybridValidationPlan(overrides,[]);
for(const item of initial.humanTarget){
  overrides=applyEditorialDecision(overrides,item.id,"approve",{
    reviewer:"SIMULAÇÃO HÍBRIDA",
    checklist,
    contentFingerprint:contentRevisionFingerprint(QUESTION_BANK.find(q=>q.id===item.id)),
    source:"hybrid_simulation"
  });
}
const after=hybridBetaReadiness(overrides,[]);
console.log(JSON.stringify({
  target:initial.humanTargetCount,
  mandatory:initial.mandatoryHumanCount,
  sample:initial.teacherSampleCount,
  afterScore:after.score,
  afterCanClosedBeta:after.canClosedBeta,
  reasons:after.reasons,
  structural:{
    diagnostic:after.structural.diagnostic,
    missions:after.structural.missions,
    exam:after.structural.exam
  }
},null,2));
