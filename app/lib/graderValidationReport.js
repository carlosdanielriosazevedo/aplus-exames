import {datasetReadiness,graderValidationCaseFingerprint,importValidationExports} from "./graderValidationDataset.js";
import {SELECTIVE_STATUS,scoreDecision,selectiveGradingDecision} from "./selectiveGrading.js";
import {humanValidationReleaseStatus,summarizeSelectiveValidation} from "./selectiveValidationMetrics.js";

export const GRADER_TEACHER_LABELS_SCHEMA="aplus-grader-teacher-labels-v1";

const round1=value=>Math.round(value*10)/10;
const pct=(n,d)=>d?round1(n/d*100):null;

export function importTeacherLabelExports(payloads=[],cases=[]){
  const caseMap=new Map(cases.map(row=>[row.case_id,row]));
  const labels=[];
  const invalid=[];
  const seen=new Set();
  for(const [exportIndex,payload] of payloads.entries()){
    if(payload?.schema!==GRADER_TEACHER_LABELS_SCHEMA||!Array.isArray(payload?.reviews)){
      invalid.push({exportIndex,reason:"teacher_labels_schema_invalid"});continue;
    }
    for(const label of payload.reviews){
      const base=caseMap.get(label.case_id);
      if(!base){invalid.push({exportIndex,caseId:label?.case_id||null,reason:"teacher_case_unknown"});continue}
      if(graderValidationCaseFingerprint(base)!==base.case_fingerprint||label.case_fingerprint!==base.case_fingerprint){
        invalid.push({exportIndex,caseId:label.case_id,reason:"teacher_case_fingerprint_invalid"});continue;
      }
      const reviewer=String(label.reviewer||payload.reviewer||"").trim();
      const score=Number(label.score_percent);
      if(!reviewer||!Number.isFinite(score)||score<0||score>100||!["accept","partial","reject"].includes(label.decision)){
        invalid.push({exportIndex,caseId:label.case_id,reason:"teacher_label_invalid"});continue;
      }
      const key=`${label.case_id}::${reviewer.toLowerCase()}`;
      if(seen.has(key)){invalid.push({exportIndex,caseId:label.case_id,reason:"teacher_label_duplicate"});continue}
      seen.add(key);
      labels.push({...label,reviewer,score_percent:score});
    }
  }
  return {labels,invalid};
}

export function systemDecisionForValidationCase(row,{validationStatus=SELECTIVE_STATUS.PRECALIBRATION}={}){
  const snapshot=row?.grader_snapshot||{};
  const points=Number(snapshot.points);
  const maxPoints=Number(snapshot.maxPoints??row?.max_points);
  const scorePercent=Number.isFinite(points)&&Number.isFinite(maxPoints)&&maxPoints>0?points/maxPoints*100:null;
  return {
    case_id:row.case_id,
    ...selectiveGradingDecision({
      subject:row.subject,
      question:{responseType:row.response_family},
      graderResult:{...snapshot,scorePercent},
      validationStatus
    })
  };
}

function rawAgreement(cases=[],labels=[]){
  const caseMap=new Map(cases.map(row=>[row.case_id,row]));
  const joined=labels.flatMap(label=>{
    const row=caseMap.get(label.case_id);
    const snapshot=row?.grader_snapshot||{};
    const points=Number(snapshot.points),maxPoints=Number(snapshot.maxPoints??row?.max_points);
    if(!row||!Number.isFinite(points)||!Number.isFinite(maxPoints)||maxPoints<=0)return [];
    const systemScore=points/maxPoints*100;
    const humanScore=Number(label.score_percent);
    const delta=systemScore-humanScore;
    return [{subject:row.subject,responseFamily:row.response_family,split:row.split,systemScore,humanScore,delta,systemDecision:scoreDecision(systemScore),humanDecision:label.decision}];
  });
  const summarize=rows=>{
    const deltas=rows.map(row=>Math.abs(row.delta));
    const catastrophic=rows.filter(row=>Math.abs(row.delta)>=50||(row.systemDecision==="accept"&&row.humanDecision==="reject")||(row.systemDecision==="reject"&&row.humanDecision==="accept"));
    return {
      labels:rows.length,
      meanAbsoluteScoreDelta:deltas.length?round1(deltas.reduce((a,b)=>a+b,0)/deltas.length):null,
      within10pp:pct(rows.filter(row=>Math.abs(row.delta)<=10).length,rows.length),
      overgradingRate:pct(rows.filter(row=>row.delta>10).length,rows.length),
      undergradingRate:pct(rows.filter(row=>row.delta<-10).length,rows.length),
      catastrophicErrorRate:pct(catastrophic.length,rows.length),
      decisionAgreement:pct(rows.filter(row=>row.systemDecision===row.humanDecision).length,rows.length)
    };
  };
  const bySubject=Object.fromEntries(["mathematics","portuguese","physics-chemistry-a"].map(subject=>[subject,summarize(joined.filter(row=>row.subject===subject))]));
  return {overall:summarize(joined),calibration:summarize(joined.filter(row=>row.split==="calibration")),holdout:summarize(joined.filter(row=>row.split==="holdout")),bySubject};
}

export function buildGraderValidationReport({datasetExports=[],teacherLabelExports=[],validationStatus=SELECTIVE_STATUS.PRECALIBRATION}={}){
  const imported=importValidationExports(datasetExports);
  const cases=imported.rows;
  const teacher=importTeacherLabelExports(teacherLabelExports,cases);
  const readiness=datasetReadiness(cases);
  const systemDecisions=cases.map(row=>systemDecisionForValidationCase(row,{validationStatus}));
  const selective=summarizeSelectiveValidation({cases,humanLabels:teacher.labels,systemDecisions});
  const release=humanValidationReleaseStatus({metrics:selective,datasetReadiness:readiness});
  return {
    cases,
    labels:teacher.labels,
    invalid:[...imported.invalid,...teacher.invalid],
    readiness,
    raw:rawAgreement(cases,teacher.labels),
    selective,
    release,
    systemDecisions
  };
}
