
import {QUESTION_BANK,TAXONOMY} from "../app/data/content.js";
import {itemPreReviewQa} from "../app/lib/preReviewQa.js";
import {minimumReviewRoadmap} from "../app/lib/quality.js";

const roadmap=new Set(minimumReviewRoadmap({},[]).selected.map(x=>x.item.id));
const groups={};
for(const q of QUESTION_BANK){
  const k=[
    q.origin||"legacy_original",
    q.role||"-",
    q.cognitive||"-",
    q.difficulty||"-",
    itemPreReviewQa(q).status,
    roadmap.has(q.id)?"roadmap":"other"
  ].join("|");
  groups[k]=(groups[k]||0)+1;
}
console.log("Origins",QUESTION_BANK.reduce((a,q)=>(a[q.origin||"legacy_original"]=(a[q.origin||"legacy_original"]||0)+1,a),{}));
console.log("Cognitive",QUESTION_BANK.reduce((a,q)=>(a[q.cognitive]=(a[q.cognitive]||0)+1,a),{}));
console.log("Difficulty",QUESTION_BANK.reduce((a,q)=>(a[q.difficulty]=(a[q.difficulty]||0)+1,a),{}));
console.log("Roles",QUESTION_BANK.reduce((a,q)=>(a[q.role||"-"]=(a[q.role||"-"]||0)+1,a),{}));
console.log("QA",QUESTION_BANK.reduce((a,q)=>{const k=itemPreReviewQa(q).status;a[k]=(a[k]||0)+1;return a},{}));
console.log("Roadmap",roadmap.size);
console.log("Roadmap origins",QUESTION_BANK.filter(q=>roadmap.has(q.id)).reduce((a,q)=>(a[q.origin||"legacy_original"]=(a[q.origin||"legacy_original"]||0)+1,a),{}));
console.log("Roadmap cognitive",QUESTION_BANK.filter(q=>roadmap.has(q.id)).reduce((a,q)=>(a[q.cognitive]=(a[q.cognitive]||0)+1,a),{}));
console.log("Roadmap QA",QUESTION_BANK.filter(q=>roadmap.has(q.id)).reduce((a,q)=>{const k=itemPreReviewQa(q).status;a[k]=(a[k]||0)+1;return a},{}));
console.log("Roadmap roles",QUESTION_BANK.filter(q=>roadmap.has(q.id)).reduce((a,q)=>(a[q.role||"-"]=(a[q.role||"-"]||0)+1,a),{}));

const ids=QUESTION_BANK.filter(q=>roadmap.has(q.id)).map(q=>({
 id:q.id,year:TAXONOMY.find(t=>t.id===q.themeId)?.year,role:q.role||"",cog:q.cognitive,d:q.difficulty,
 origin:q.origin||"legacy",qa:itemPreReviewQa(q).status,contexts:q.contexts.join(",")
}));
console.log(JSON.stringify(ids,null,2));
