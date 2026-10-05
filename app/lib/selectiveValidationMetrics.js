export const SELECTIVE_VALIDATION_METRICS_SCHEMA="aplus-selective-validation-metrics-v1";

const round1=value=>Math.round(value*10)/10;
const pct=(n,d)=>d?round1(n/d*100):null;
const mean=values=>values.length?values.reduce((a,b)=>a+b,0)/values.length:null;

function humanDecisionFromScore(score){
  const n=Number(score);
  if(!Number.isFinite(n))return null;
  if(n>=85)return "accept";
  if(n>=35)return "partial";
  return "reject";
}

function summarizeRows(rows=[]){
  const decided=rows.filter(row=>row.systemDecision!=="abstain");
  const abstained=rows.filter(row=>row.systemDecision==="abstain");
  const exact=decided.filter(row=>row.systemDecision===row.humanDecision);
  const deltas=decided.map(row=>Math.abs(row.systemScorePercent-row.humanScorePercent)).filter(Number.isFinite);
  const overgraded=decided.filter(row=>row.systemScorePercent-row.humanScorePercent>10);
  const undergraded=decided.filter(row=>row.humanScorePercent-row.systemScorePercent>10);
  const catastrophic=decided.filter(row=>{
    const delta=Math.abs(row.systemScorePercent-row.humanScorePercent);
    const opposite=(row.systemDecision==="accept"&&row.humanDecision==="reject")||(row.systemDecision==="reject"&&row.humanDecision==="accept");
    return delta>=50||opposite;
  });
  return {
    cases:rows.length,
    decided:decided.length,
    abstained:abstained.length,
    coverage:pct(decided.length,rows.length),
    abstentionRate:pct(abstained.length,rows.length),
    decisionAgreement:pct(exact.length,decided.length),
    meanAbsoluteScoreDelta:deltas.length?round1(mean(deltas)):null,
    within10pp:pct(deltas.filter(delta=>delta<=10).length,deltas.length),
    overgradingRate:pct(overgraded.length,decided.length),
    undergradingRate:pct(undergraded.length,decided.length),
    catastrophicErrorRate:pct(catastrophic.length,decided.length)
  };
}

export function joinHumanAndSystemLabels({cases=[],humanLabels=[],systemDecisions=[]}={}){
  const caseMap=new Map(cases.map(row=>[row.case_id,row]));
  const systems=new Map(systemDecisions.map(row=>[row.case_id||row.caseId,row]));
  return humanLabels.flatMap(label=>{
    const base=caseMap.get(label.case_id||label.caseId);
    const system=systems.get(label.case_id||label.caseId);
    if(!base||!system)return [];
    const humanScorePercent=Number(label.score_percent??label.scorePercent);
    const systemScorePercent=Number(system.scorePercent);
    if(!Number.isFinite(humanScorePercent)||!Number.isFinite(systemScorePercent))return [];
    const humanDecision=label.decision||humanDecisionFromScore(humanScorePercent);
    return [{
      caseId:base.case_id,
      subject:base.subject,
      responseFamily:base.response_family||system.responseFamily||"unknown",
      split:base.split,
      reviewer:String(label.reviewer||"unknown"),
      humanDecision,
      humanScorePercent,
      systemDecision:system.decision,
      systemScorePercent,
      policyScore:Number(system.policyScore),
      reasons:system.reasons||[]
    }];
  });
}

export function summarizeSelectiveValidation(input={}){
  const joined=joinHumanAndSystemLabels(input);
  const bySubject={};
  const byResponseFamily={};
  for(const key of [...new Set(joined.map(row=>row.subject))])bySubject[key]=summarizeRows(joined.filter(row=>row.subject===key));
  for(const key of [...new Set(joined.map(row=>row.responseFamily))])byResponseFamily[key]=summarizeRows(joined.filter(row=>row.responseFamily===key));

  const buckets=[
    [0,0.7],[0.7,0.8],[0.8,0.9],[0.9,0.95],[0.95,1.01]
  ].map(([from,to])=>{
    const rows=joined.filter(row=>Number.isFinite(row.policyScore)&&row.policyScore>=from&&row.policyScore<to);
    return {from,to:Math.min(to,1),...summarizeRows(rows)};
  });

  return {
    schema:SELECTIVE_VALIDATION_METRICS_SCHEMA,
    labels:joined.length,
    calibration:summarizeRows(joined.filter(row=>row.split==="calibration")),
    holdout:summarizeRows(joined.filter(row=>row.split==="holdout")),
    overall:summarizeRows(joined),
    bySubject,
    byResponseFamily,
    policyScoreBuckets:buckets
  };
}

export function humanValidationReleaseStatus({metrics,datasetReadiness,minHoldoutPerSubject=30,minAgreement=95,maxCatastrophicErrorRate=1}={}){
  const holdout=metrics?.holdout||{};
  const bySubject=datasetReadiness?.bySubject||{};
  const enoughHoldout=["mathematics","portuguese","physics-chemistry-a"].every(subject=>(bySubject[subject]?.holdout||0)>=minHoldoutPerSubject);
  const agreementGood=Number(holdout.decisionAgreement)>=minAgreement;
  const catastrophicGood=Number(holdout.catastrophicErrorRate)<=maxCatastrophicErrorRate;
  const enoughLabels=(holdout.cases||0)>0&&enoughHoldout;
  const humanValidated=!!(enoughLabels&&agreementGood&&catastrophicGood);
  return {
    status:humanValidated?"human_validated":(metrics?.labels?"human_calibration_started":"infrastructure_ready"),
    humanValidated,
    checks:{enoughHoldout,agreementGood,catastrophicGood},
    warning:humanValidated?null:"Não apresentar o corretor como humanamente validado enquanto estes critérios não forem cumpridos em holdout independente."
  };
}
