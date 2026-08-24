
import {QUESTION_BANK} from "../app/data/content.js";

const sig=new Map();
for(const q of QUESTION_BANK){
  const k=q.signature||"";
  if(!sig.has(k))sig.set(k,[]);
  sig.get(k).push(q.id);
}
console.log("Duplicate signatures:");
for(const [k,ids] of sig)if(k&&ids.length>1)console.log(k,ids.join(","));

const answers=[0,0,0,0];
QUESTION_BANK.forEach(q=>answers[q.a]++);
console.log("Answer distribution A-D",answers);

const shortSol=QUESTION_BANK.filter(q=>String(q.sol||"").trim().length<20);
console.log("Solutions <20 chars",shortSol.length,shortSol.slice(0,20).map(q=>[q.id,q.sol]));

const shortHyp=QUESTION_BANK.filter(q=>String(q.hyp||"").trim().length<20);
console.log("Hyp <20 chars",shortHyp.length,shortHyp.slice(0,20).map(q=>[q.id,q.hyp]));

const correctLongest=QUESTION_BANK.filter(q=>{
  const lens=q.o.map(x=>String(x).length);
  const max=Math.max(...lens), min=Math.min(...lens);
  return lens[q.a]===max && max>=min*2.2 && max-min>=12;
});
console.log("Correct-option length leakage candidates",correctLongest.length);
console.log(correctLongest.slice(0,30).map(q=>[q.id,q.o[q.a],q.o.map(x=>x.length)]));
