// Cryptographically seals a blind evaluation dataset before predictions are visible.
// Does not contact any API or assign scores.
import fs from "node:fs";
import crypto from "node:crypto";
import {parseCsv} from "./fqa-blind-validation.mjs";
const hash=s=>crypto.createHash("sha256").update(s,"utf8").digest("hex");
export function sealBlindDataset(csv,{setName="HOLDOUT-NOVO"}={}){
  const rows=parseCsv(csv.replace(/^\uFEFF/,""));
  if(rows.length<2)throw Error("Empty dataset");
  const columns=rows[0], required=["blind_id","item_id","question","synthetic_student_response"];
  if(new Set(columns).size!==columns.length)throw Error("Duplicate CSV columns");
  for(const c of required)if(!columns.includes(c))throw Error("Missing "+c);
  const forbidden=columns.filter(c=>/^(profile|expected_profile|prediction|model_points|scoring_authorized)$/i.test(c));
  if(forbidden.length)throw Error("Leaked development/prediction labels: "+forbidden.join(","));
  const seen=new Set(),items={};
  for(let i=1;i<rows.length;i++){
    const row=rows[i];if(row.length!==columns.length)throw Error("Malformed CSV row "+(i+1));
    const obj=Object.fromEntries(columns.map((c,j)=>[c,row[j]]));
    if(!obj.blind_id||seen.has(obj.blind_id))throw Error("Duplicate/empty blind ID "+(i+1));
    if(!/^FQA-R-(ELEM|MAT|ENE|MEC|WAV|EQ|AQ)-01$/.test(obj.item_id))throw Error("Invalid item "+(i+1));
    if(!obj.question.trim()||!obj.synthetic_student_response.trim())throw Error("Missing question/response "+(i+1));
    for(const col of ["human_awarded_points","human_criterion_breakdown","human_rationale"])
      if(col in obj && obj[col].trim())throw Error("Human scores already visible at sealing stage "+(i+1));
    seen.add(obj.blind_id);items[obj.item_id]=(items[obj.item_id]||0)+1;
  }
  return {schemaVersion:1,setName,count:seen.size,perItem:Object.fromEntries(Object.entries(items).sort()),
    sha256:hash(csv),status:"SEALED_DATASET_ONLY_NOT_ADJUDICATED",algorithm:"sha256-utf8-original-bytes"};
}
export function verifySeal(csv,manifest){
  if(manifest?.algorithm!=="sha256-utf8-original-bytes"||manifest?.schemaVersion!==1||typeof manifest.sha256!=="string")
    throw Error("Invalid manifest");
  const current=sealBlindDataset(csv,{setName:manifest.setName});
  if(current.sha256!==manifest.sha256||current.count!==manifest.count||
    JSON.stringify(current.perItem)!==JSON.stringify(manifest.perItem))throw Error("Dataset changed after sealing");
  return true;
}
if(process.argv[1]&&import.meta.url===new URL("file://"+process.argv[1]).href){
 const [action,path,manifestPath]=process.argv.slice(2);
 try{
  if(action==="seal"&&path)console.log(JSON.stringify(sealBlindDataset(fs.readFileSync(path,"utf8")),null,2));
  else if(action==="verify"&&path&&manifestPath){
   verifySeal(fs.readFileSync(path,"utf8"),JSON.parse(fs.readFileSync(manifestPath,"utf8")));
   console.log("SEALED_DATASET_VERIFIED");
  }else {console.error("Usage: node scripts/fqa-seal-dataset.mjs seal data.csv | verify data.csv manifest.json");process.exitCode=2;}
 }catch(e){console.error(e.message);process.exitCode=1;}
}
