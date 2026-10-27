// Offline CSV validator for independently adjudicated FQ A responses.
// No scoring engine imports, no network, no student records.
// Usage: node scripts/fqa-blind-validation.mjs teacher.csv [--expected-count=105]
import fs from "node:fs";

export function parseCsv(text) {
  const rows=[]; let row=[], field="", quoted=false, closed=false;
  for(let i=0;i<text.length;i++){
    const c=text[i];
    if(quoted){
      if(c==='"' && text[i+1]==='"'){field+='"';i++;}
      else if(c==='"'){quoted=false;closed=true;}
      else field+=c;
    }else if(c==='"' && !field && !closed){quoted=true;}
    else if(c===','){row.push(field);field="";closed=false;}
    else if(c==='\n' || c==='\r'){
      if(c==='\r' && text[i+1]==='\n')i++;
      row.push(field);rows.push(row);row=[];field="";closed=false;
    }else if(c==='"'){throw new Error("Unexpected quote at offset "+i);}
    else {if(closed && c.trim())throw new Error("Characters after quote at offset "+i);field+=c;}
  }
  if(quoted)throw new Error("Unterminated CSV quoted field");
  if(field!==""||row.length){row.push(field);rows.push(row);}
  return rows.filter(r=>!(r.length===1&&r[0]===""));
}
const REQUIRED=["blind_id","item_id","max_points","human_awarded_points","human_criterion_breakdown","human_rationale"];
const ID=/^FQA-R-(ELEM|MAT|ENE|MEC|WAV|EQ|AQ)-01$/;
export function validateCsv(text,{expectedCount=105,requireComplete=true}={}){
  const raw=parseCsv(text.replace(/^\uFEFF/,""));
  if(raw.length<2)throw new Error("CSV without rows");
  const header=raw[0],errors=[],ids=new Set(),byItem=new Map();
  if(new Set(header).size!==header.length)errors.push("Duplicate column names");
  for(const key of REQUIRED)if(!header.includes(key))errors.push("Missing column "+key);
  if(errors.length) return {ok:false,errors,rows:0,completed:0};
  let completed=0;
  const rows=raw.slice(1);
  if(expectedCount!==null&&rows.length!==expectedCount)errors.push(`Expected ${expectedCount} responses, found ${rows.length}`);
  for(let i=0;i<rows.length;i++){
    const line=i+2, cells=rows[i];
    if(cells.length!==header.length){errors.push(`Row ${line}: expected ${header.length} fields, got ${cells.length}`);continue;}
    const rec=Object.fromEntries(header.map((k,j)=>[k,cells[j].trim()]));
    if(!rec.blind_id||ids.has(rec.blind_id))errors.push(`Row ${line}: empty/duplicate blind_id`);
    ids.add(rec.blind_id);
    if(!ID.test(rec.item_id))errors.push(`Row ${line}: unexpected item_id`);
    byItem.set(rec.item_id,(byItem.get(rec.item_id)||0)+1);
    const max=Number(rec.max_points);
    if(!rec.max_points||!Number.isFinite(max)||max<=0)errors.push(`Row ${line}: invalid max_points`);
    const fields=["human_awarded_points","human_criterion_breakdown","human_rationale"];
    const filled=fields.filter(k=>rec[k]!=="").length;
    if(filled>0&&filled<fields.length)errors.push(`Row ${line}: incomplete human adjudication`);
    if(filled===0){if(requireComplete)errors.push(`Row ${line}: missing human adjudication`);continue;}
    completed++;
    const score=Number(rec.human_awarded_points);
    if(!Number.isFinite(score)||score<0||score>max)errors.push(`Row ${line}: award outside [0,max_points]`);
    // Require machine-readable criterion points: JSON array of nonnegative numbers.
    try{
      const parts=JSON.parse(rec.human_criterion_breakdown);
      if(!Array.isArray(parts)||parts.length===0||parts.some(n=>typeof n!=="number"||!Number.isFinite(n)||n<0))
        throw new Error("expected JSON array of nonnegative numbers");
      const sum=parts.reduce((a,b)=>a+b,0);
      if(Math.abs(sum-score)>1e-6)errors.push(`Row ${line}: criterion sum ${sum} != awarded ${score}`);
    }catch(e){if(!errors.some(x=>x.startsWith(`Row ${line}: criterion sum`)))errors.push(`Row ${line}: invalid criterion breakdown (${e.message})`);}
  }
  if(expectedCount===105){
    if(byItem.size!==7)errors.push("Expected seven distinct item IDs");
    for(const [id,count] of byItem)if(count!==15)errors.push(`${id}: expected 15, got ${count}`);
  }
  return {ok:errors.length===0,rows:rows.length,completed,byItem:Object.fromEntries([...byItem].sort()),errors};
}
if(process.argv[1]&&import.meta.url===new URL("file://"+process.argv[1]).href){
  const file=process.argv[2],opt=process.argv.find(x=>x.startsWith("--expected-count="));
  if(!file){console.error("Usage: node scripts/fqa-blind-validation.mjs teacher.csv [--expected-count=N]");process.exitCode=2;}
  else {
    const n=opt?Number(opt.split("=")[1]):105;
    if(!Number.isSafeInteger(n)||n<=0){console.error("Invalid expected count");process.exitCode=2;}
    else{
      try{
        const report=validateCsv(fs.readFileSync(file,"utf8"),{expectedCount:n});
        console.log(JSON.stringify(report,null,2));if(!report.ok)process.exitCode=1;
      }catch(e){console.error(e.message);process.exitCode=2;}
    }
  }
}
