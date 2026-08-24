
import {QUESTION_BANK} from "../app/data/content.js";
import {itemPreReviewQa} from "../app/lib/preReviewQa.js";
import {minimumReviewRoadmap} from "../app/lib/quality.js";
const ids=new Set(minimumReviewRoadmap({},[]).selected.map(x=>x.item.id));
const complex=new Set(["Interpretação","Raciocínio","Modelação","Resolução de problemas","Validação"]);
for(const q of QUESTION_BANK.filter(q=>ids.has(q.id))){
 const human=q.contexts.includes("diagnostic")||itemPreReviewQa(q).status==="warning"||complex.has(q.cognitive);
 const strong=q.origin==="original_v5_1"&&itemPreReviewQa(q).status==="clean"&&!complex.has(q.cognitive);
 if(!human&&!strong)console.log(JSON.stringify(q));
}
