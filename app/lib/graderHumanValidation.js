export const GRADER_HUMAN_VALIDATION_SCHEMA="grader-human-validation-v1";
export const GRADER_HUMAN_VALIDATION_TARGET={cases:45,perSubject:15,minReviewers:2,overlapCases:9};
export const GRADER_DIAGNOSIS_CODES=[
  "correct_or_near_correct","incomplete_answer","insufficient_justification",
  "conceptual_error","conceptual_contradiction","calculation_error","result_only",
  "ambiguous_answer","off_topic","other"
];

function hashText(text){
  let h=2166136261;
  for(let i=0;i<String(text).length;i++){
    h^=String(text).charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return (h>>>0).toString(16).padStart(8,"0");
}

export function humanValidationCaseId(subject,itemId,response){
  return `ghv-${String(subject).replace(/[^a-z0-9]+/gi,"-").toLowerCase()}-${itemId}-${hashText(JSON.stringify(response))}`;
}

export function humanValidationFingerprint(row){
  return hashText([row.subject,row.item_id,row.question,row.student_response].join("|"));
}

function csvEscape(value){return `"${String(value??"").replace(/"/g,'""')}"`}
export function serializeHumanValidationCsv(rows){
  if(!rows?.length)return "";
  const headers=Object.keys(rows[0]);
  return [headers.map(csvEscape).join(";"),...rows.map(row=>headers.map(h=>csvEscape(row[h])).join(";"))].join("\n");
}

export function makeBlindValidationRow({subject,itemId,question,response,maxPoints,caseId=null}){
  const studentResponse=typeof response==="string"?response:JSON.stringify(response);
  const row={
    schema:GRADER_HUMAN_VALIDATION_SCHEMA,
    case_id:caseId||humanValidationCaseId(subject,itemId,response),
    subject,
    item_id:itemId,
    question:String(question||""),
    student_response:studentResponse,
    max_points:Number(maxPoints)||100,
    case_fingerprint:"",
    reviewer:"",
    score_percent:"",
    diagnosis:"",
    requires_review:"",
    note:""
  };
  row.case_fingerprint=humanValidationFingerprint(row);
  return row;
}

function booleanValue(value){
  const v=String(value??"").trim().toLowerCase();
  if(["sim","s","yes","y","1","true","x"].includes(v))return true;
  if(["nao","não","n","no","0","false"].includes(v))return false;
  return null;
}

export function validateHumanValidationRows(rows,packRows){
  const expected=new Map((packRows||[]).map(row=>[row.case_id,row]));
  const valid=[],invalid=[],seen=new Set();
  for(const [index,row] of (rows||[]).entries()){
    const rowNumber=index+2;
    if(row.schema!==GRADER_HUMAN_VALIDATION_SCHEMA){invalid.push({rowNumber,reason:"schema incompatível"});continue}
    const base=expected.get(row.case_id);
    if(!base){invalid.push({rowNumber,caseId:row.case_id,reason:"caso inexistente no pack"});continue}
    const reviewer=String(row.reviewer||"").trim();
    if(!reviewer){invalid.push({rowNumber,caseId:row.case_id,reason:"revisor em falta"});continue}
    const unique=`${row.case_id}::${reviewer.toLowerCase()}`;
    if(seen.has(unique)){invalid.push({rowNumber,caseId:row.case_id,reason:"avaliação duplicada pelo mesmo revisor"});continue}
    seen.add(unique);
    const expectedFingerprint=String(base.case_fingerprint||"");
    const submittedFingerprint=String(row.case_fingerprint||"");
    const recomputedFingerprint=humanValidationFingerprint(row);
    if(submittedFingerprint!==expectedFingerprint||recomputedFingerprint!==expectedFingerprint){
      invalid.push({rowNumber,caseId:row.case_id,reason:"conteúdo do caso foi alterado"});continue;
    }
    const score=Number(String(row.score_percent??"").replace(",","."));
    if(!Number.isFinite(score)||score<0||score>100){invalid.push({rowNumber,caseId:row.case_id,reason:"score_percent deve estar entre 0 e 100"});continue}
    const diagnosis=String(row.diagnosis||"").trim();
    if(!GRADER_DIAGNOSIS_CODES.includes(diagnosis)){
      invalid.push({rowNumber,caseId:row.case_id,reason:"diagnóstico inválido"});continue;
    }
    const requiresReview=booleanValue(row.requires_review);
    if(requiresReview===null){invalid.push({rowNumber,caseId:row.case_id,reason:"requires_review deve ser SIM ou NÃO"});continue}
    valid.push({...row,reviewer,scorePercent:score,diagnosis,requiresReview});
  }
  return {valid,invalid};
}

function mean(values){return values.length?values.reduce((a,b)=>a+b,0)/values.length:0}
function pct(value){return Math.round(value*1000)/10}
function round1(value){return Math.round(value*10)/10}

function subjectSummary(rows){
  const deltas=rows.map(row=>Math.abs(row.scorePercent-row.graderScorePercent));
  return {
    labels:rows.length,
    meanAbsoluteScoreDelta:round1(mean(deltas)),
    within10pp:pct(rows.filter(row=>Math.abs(row.scorePercent-row.graderScorePercent)<=10).length/Math.max(1,rows.length)),
    within20pp:pct(rows.filter(row=>Math.abs(row.scorePercent-row.graderScorePercent)<=20).length/Math.max(1,rows.length)),
    diagnosisAgreement:pct(rows.filter(row=>row.diagnosis===row.graderDiagnosis).length/Math.max(1,rows.length)),
    reviewAgreement:pct(rows.filter(row=>row.requiresReview===row.graderRequiresReview).length/Math.max(1,rows.length))
  };
}

export function summarizeHumanAgreement(validRows,graderRows,{target=GRADER_HUMAN_VALIDATION_TARGET}={}){
  const grader=new Map((graderRows||[]).map(row=>[row.caseId,row]));
  const joined=(validRows||[]).flatMap(row=>{
    const g=grader.get(row.case_id);
    return g?[{...row,graderScorePercent:g.scorePercent,graderDiagnosis:g.diagnosis,graderRequiresReview:!!g.requiresReview}]:[];
  });
  const reviewers=[...new Set(joined.map(row=>row.reviewer.toLowerCase()))];
  const uniqueCases=[...new Set(joined.map(row=>row.case_id))];
  const byCase=new Map();
  for(const row of joined){if(!byCase.has(row.case_id))byCase.set(row.case_id,[]);byCase.get(row.case_id).push(row)}
  const overlaps=[...byCase.values()].filter(rows=>new Set(rows.map(row=>row.reviewer.toLowerCase())).size>=2);
  const interRaterPairs=overlaps.map(rows=>{
    const a=rows[0],b=rows[1];
    return {scoreDelta:Math.abs(a.scorePercent-b.scorePercent),diagnosisAgreement:a.diagnosis===b.diagnosis};
  });
  const subjectCounts=Object.fromEntries(["mathematics","portuguese","physics-chemistry-a"].map(subject=>[
    subject,new Set(joined.filter(row=>row.subject===subject).map(row=>row.case_id)).size
  ]));
  const readiness={
    enoughCases:uniqueCases.length>=target.cases,
    enoughReviewers:reviewers.length>=target.minReviewers,
    enoughOverlap:overlaps.length>=target.overlapCases,
    balancedSubjects:Object.values(subjectCounts).every(count=>count>=target.perSubject)
  };
  const humanAgreementMeasured=Object.values(readiness).every(Boolean);
  const bySubject={};
  for(const subject of ["mathematics","portuguese","physics-chemistry-a"]){
    bySubject[subject]=subjectSummary(joined.filter(row=>row.subject===subject));
  }
  return {
    schema:GRADER_HUMAN_VALIDATION_SCHEMA,
    humanAgreementMeasured,
    uniqueCases:uniqueCases.length,
    labels:joined.length,
    reviewers:reviewers.length,
    overlapCases:overlaps.length,
    subjectCounts,
    readiness,
    overall:subjectSummary(joined),
    interRater:interRaterPairs.length?{
      pairs:interRaterPairs.length,
      meanAbsoluteScoreDelta:round1(mean(interRaterPairs.map(row=>row.scoreDelta))),
      diagnosisAgreement:pct(interRaterPairs.filter(row=>row.diagnosisAgreement).length/interRaterPairs.length)
    }:{pairs:0,meanAbsoluteScoreDelta:null,diagnosisAgreement:null},
    bySubject
  };
}
