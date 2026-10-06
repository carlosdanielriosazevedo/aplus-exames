import {portugueseCalibrationItemById} from "../app/data/openResponseCalibrationBank.js";
import {physicsChemistryConstructedItemById} from "../app/data/physicsChemistryConstructed.js";
import {gradePortugueseResponse} from "../app/lib/portugueseEngine.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";

function dump(label,result){
  console.log(`\n=== ${label} ${result.provisionalPoints}/${result.maxPoints} ===`);
  console.log("diagnosis",result.feedbackSummary?.errorDiagnosis);
  for(const c of result.criteria||[]){
    console.log(JSON.stringify({id:c.id,label:c.label,status:c.status,scoreRatio:c.scoreRatio,awarded:c.awardedPoints,max:c.maxPoints,lost:c.lostPoints,confidence:c.confidence,observations:(c.observations||[]).map(o=>({id:o.id,label:o.label,status:o.status,scoreRatio:o.scoreRatio,semantic:o.semanticScore,relation:o.relationScore,evidence:o.studentEvidence}))}));
  }
}

const aq=physicsChemistryConstructedItemById("FQA-R-AQ-01");
const aqText="Primeiro assumi que equivalência era sempre pH 7. Corrigindo: corresponde à proporção estequiométrica e pode localizar-se por indicador ou curva de pH; o pH não é universal.";
dump("AQ self-corrected",gradePhysicsChemistryResponse(aq,aqText));

const pt=portugueseCalibrationItemById("PT639-FND-313");
const base="As razoes dão beneficios concretos e por isso justificam/sustentam a tese.";
const noisy=base+" Além disso, este tema faz parte da disciplina e pode aparecer numa prova.";
dump("PT313 base",gradePortugueseResponse(pt,base));
dump("PT313 noisy",gradePortugueseResponse(pt,noisy));
