
import {QUESTION_BANK,TAXONOMY} from "../app/data/content.js";
import {itemPreReviewQa} from "../app/lib/preReviewQa.js";
import {minimumReviewRoadmap} from "../app/lib/quality.js";
const roadmap=new Set(minimumReviewRoadmap({},[]).selected.map(x=>x.item.id));
const complex=new Set(["Interpretação","Raciocínio","Modelação","Resolução de problemas","Validação"]);
const rows=QUESTION_BANK.filter(q=>roadmap.has(q.id)).map(q=>{
 const qa=itemPreReviewQa(q);
 const diagnostic=q.contexts?.includes("diagnostic");
 const human=diagnostic || qa.status==="warning" || complex.has(q.cognitive);
 const strongMachine=q.origin==="original_v5_1" && qa.status==="clean" && !complex.has(q.cognitive);
 return {...q,diagnostic,qa:qa.status,human,strongMachine};
});
console.log("human strict",rows.filter(x=>x.human).length);
console.log("strong machine",rows.filter(x=>x.strongMachine).length);
console.log("other sample",rows.filter(x=>!x.human&&!x.strongMachine).length);
console.log(rows.filter(x=>x.human).map(x=>[x.id,x.cognitive,x.qa,x.diagnostic,x.origin||"legacy"]));
