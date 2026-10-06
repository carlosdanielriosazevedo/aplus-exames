import {physicsChemistryConstructedItemById} from "../app/data/physicsChemistryConstructed.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";
const item=physicsChemistryConstructedItemById("FQA-R-AQ-01");
const response="Primeiro assumi que equivalência era sempre pH 7. Corrigindo: corresponde à proporção estequiométrica e pode localizar-se por indicador ou curva de pH; o pH não é universal.";
const result=gradePhysicsChemistryResponse(item,response);
console.log(JSON.stringify({provisionalPoints:result.provisionalPoints,maxPoints:result.maxPoints,requiresReview:result.requiresReview,criteria:result.criteria?.map(c=>({id:c.id,status:c.status,scoreRatio:c.scoreRatio,awardedPoints:c.awardedPoints,maxPoints:c.maxPoints,observations:c.observations?.map(o=>({id:o.id,status:o.status,scoreRatio:o.scoreRatio,semanticScore:o.semanticScore,evidence:o.studentEvidence}))}))},null,2));
