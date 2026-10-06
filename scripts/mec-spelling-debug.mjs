import {physicsChemistryConstructedItemById} from "../app/data/physicsChemistryConstructed.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";

const item=physicsChemistryConstructedItemById("FQA-R-MEC-01");
const clean="Num gráfico v(t), o declive dá diretamente a aceleração; a área algébrica sob o gráfico entre os instantes considerados dá o deslocamento. Para obter a distância tenho de somar os módulos das áreas, não a área algébrica total quando há mudança de sentido.";
const typo=clean.replace("declive","declve").replace("algébrica","algebrca");
for(const [label,response] of [["clean",clean],["typo",typo]]){
  const result=gradePhysicsChemistryResponse(item,response);
  console.log(`\n=== ${label} ${result.provisionalPoints}/${result.maxPoints} ===`);
  for(const criterion of result.criteria||[]){
    console.log(JSON.stringify({
      criterion:criterion.id,status:criterion.status,scoreRatio:criterion.scoreRatio,semanticScore:criterion.semanticScore,relationScore:criterion.relationScore,awardedPoints:criterion.awardedPoints,maxPoints:criterion.maxPoints,
      observations:(criterion.observations||[]).map(o=>({id:o.id,status:o.status,scoreRatio:o.scoreRatio,semanticScore:o.semanticScore,relationScore:o.relationScore,matched:o.matched,studentEvidence:o.studentEvidence}))
    }));
  }
}
