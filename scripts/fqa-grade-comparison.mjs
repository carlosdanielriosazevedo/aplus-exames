import fs from "node:fs";
import {parseCsv} from "./fqa-blind-validation.mjs";
function read(content,required){
  const [head,...rows]=parseCsv(content.replace(/^\uFEFF/,""));
  if(!head||!rows.length)throw Error("Missing CSV rows");
  if(new Set(head).size!==head.length)throw Error("Duplicate column");
  for(const field of required)if(!head.includes(field))throw Error("Missing column "+field);
  return rows.map((row,i)=>{
    if(row.length!==head.length)throw Error("Malformed row "+(i+2));
    return Object.fromEntries(head.map((key,j)=>[key,row[j].trim()]));
  });
}
function validNumber(x,max,label){
  if(x===""||!Number.isFinite(Number(x))||Number(x)<0||Number(x)>max)throw Error("Invalid "+label);
  return Number(x);
}
function criteria(json,total,length,id){
  const parts=JSON.parse(json);
  if(!Array.isArray(parts)||!parts.length||(length!==null&&parts.length!==length)||parts.some(n=>typeof n!=="number"||!Number.isFinite(n)||n<0)||Math.abs(parts.reduce((a,b)=>a+b,0)-total)>1e-6)
    throw Error("Invalid criterion breakdown "+id);
  return parts;
}
function stats(rows){
  const graded=rows.filter(x=>x.scored),errors=graded.map(x=>Math.abs(x.error));
  return {total:rows.length,scored:graded.length,abstained:rows.length-graded.length,
    coverage:rows.length?graded.length/rows.length:null,
    mae:errors.length?errors.reduce((a,b)=>a+b,0)/errors.length:null,
    maxAbsoluteError:errors.length?Math.max(...errors):null,
    overcredit:graded.filter(x=>x.error>0).length,undercredit:graded.filter(x=>x.error<0).length,
    severeOvercredit:graded.filter(x=>x.error/x.maxPoints>=0.25).length,
    severeUndercredit:graded.filter(x=>-x.error/x.maxPoints>=0.25).length,
    criterionMAE:graded.length?graded.reduce((a,x)=>a+x.criterionAbsoluteError,0)/graded.reduce((a,x)=>a+x.criterionCount,0):null};
}
export function compareGrades(humanCsv,predictionCsv){
  const h=read(humanCsv,["blind_id","item_id","max_points","human_awarded_points","human_criterion_breakdown","human_rationale"]);
  const p=read(predictionCsv,["blind_id","item_id","points","scoring_authorized","criterion_points"]);
  const hm=new Map(),pm=new Map();
  for(const row of h){if(!row.blind_id||hm.has(row.blind_id))throw Error("Duplicate human blind_id");hm.set(row.blind_id,row);}
  for(const row of p){if(!row.blind_id||pm.has(row.blind_id))throw Error("Duplicate prediction blind_id");pm.set(row.blind_id,row);}
  if(hm.size!==pm.size||[...hm.keys()].some(id=>!pm.has(id)))throw Error("Blind-ID populations differ");
  const outcomes=[];
  for(const [id,human] of hm){
    const prediction=pm.get(id);
    if(human.item_id!==prediction.item_id)throw Error("Item mismatch "+id);
    const max=validNumber(human.max_points,Number.MAX_SAFE_INTEGER,"maximum "+id);
    const reference=validNumber(human.human_awarded_points,max,"human score "+id);
    const hc=criteria(human.human_criterion_breakdown,reference,null,id);
    if(!human.human_rationale)throw Error("Missing human rationale "+id);
    if(!["true","false"].includes(prediction.scoring_authorized))throw Error("Invalid scoring_authorized "+id);
    const scored=prediction.scoring_authorized==="true";
    if(!scored&&(prediction.points!==""||prediction.criterion_points!==""))throw Error("Abstention must have empty score "+id);
    if(scored&&prediction.points==="")throw Error("Authorized score missing "+id);
    const points=scored?validNumber(prediction.points,max,"prediction "+id):null;
    const pc=scored?criteria(prediction.criterion_points,points,hc.length,id):null;
    outcomes.push({blind_id:id,item_id:human.item_id,maxPoints:max,reference,points,scored,error:scored?points-reference:null,
      criterionCount:hc.length,criterionAbsoluteError:scored?hc.reduce((sum,n,i)=>sum+Math.abs(n-pc[i]),0):null});
  }
  return {status:"DESCRIPTIVE_ONLY_NOT_GO",overall:stats(outcomes),
    perItem:Object.fromEntries([...new Set(outcomes.map(x=>x.item_id))].sort().map(id=>[id,stats(outcomes.filter(x=>x.item_id===id))])),
    outcomes};
}
if(process.argv[1]&&import.meta.url===new URL("file://"+process.argv[1]).href){
  const [human,prediction]=process.argv.slice(2);
  if(!human||!prediction){console.error("Usage: node scripts/fqa-grade-comparison.mjs teachers.csv predictions.csv");process.exitCode=2;}
  else try{console.log(JSON.stringify(compareGrades(fs.readFileSync(human,"utf8"),fs.readFileSync(prediction,"utf8")),null,2));}
  catch(e){console.error(e.message);process.exitCode=1;}
}
