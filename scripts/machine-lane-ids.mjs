
import {QUESTION_BANK} from "../app/data/content.js";
import {itemPreReviewQa} from "../app/lib/preReviewQa.js";
import {minimumReviewRoadmap} from "../app/lib/quality.js";
const ids=new Set(minimumReviewRoadmap({},[]).selected.map(x=>x.item.id));
const humanCognitive=new Set(["Compreensão","Interpretação","Raciocínio","Modelação","Resolução de problemas","Validação"]);
const machine=QUESTION_BANK.filter(q=>ids.has(q.id)).filter(q=>
 !q.contexts?.includes("diagnostic")
 && itemPreReviewQa(q).status==="clean"
 && !humanCognitive.has(q.cognitive)
);
console.log(JSON.stringify(machine.map(q=>({id:q.id,origin:q.origin||"legacy",cognitive:q.cognitive,q:q.q,answer:q.o[q.a]})),null,2));
console.error("count",machine.length);
