
import {hybridValidationPlan,hybridValidationSummary,hybridBetaReadiness} from "../app/lib/hybridValidation.js";
const p=hybridValidationPlan({},[]);
const s=hybridValidationSummary({},[]);
const r=hybridBetaReadiness({},[]);
console.log(JSON.stringify({
 summary:s,
 machine:p.machineLane.map(x=>x.id),
 mandatory:p.mandatoryHuman.map(x=>x.id),
 sample:p.teacherSample.map(x=>x.id),
 humanTarget:p.humanTarget.map(x=>x.id),
 reasons:r.reasons
},null,2));
