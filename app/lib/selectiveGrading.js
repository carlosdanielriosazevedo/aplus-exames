export const SELECTIVE_GRADING_SCHEMA="aplus-selective-grading-v1";
export const SELECTIVE_DECISIONS=["accept","partial","reject","abstain"];
export const SELECTIVE_STATUS={
  PRECALIBRATION:"experimental_precalibration",
  CALIBRATING:"human_calibration_started",
  VALIDATED:"human_validated"
};

const clamp01=value=>Math.max(0,Math.min(1,Number(value)||0));
const normPercent=value=>{
  const n=Number(value);
  if(!Number.isFinite(n))return 0;
  return n>1?clamp01(n/100):clamp01(n);
};

export function responseFamily(subject,question={}){
  const explicit=String(question.responseType||question.type||question.kind||"").toLowerCase();
  if(subject==="mathematics"){
    if(/numeric|number|calculation/.test(explicit))return "math_numeric";
    if(/step|proof|open|constructed/.test(explicit))return "math_constructed";
    return "math_other";
  }
  if(subject==="physics-chemistry-a"){
    if(/numeric|number|calculation|step/.test(explicit))return "fqa_calculation";
    if(/open|constructed|short|restricted|explain|justify/.test(explicit))return "fqa_conceptual";
    return "fqa_other";
  }
  if(subject==="portuguese"){
    if(/multiple-choice|choice|grammar|short-answer/.test(explicit))return "pt_objective_short";
    if(/extended-writing|essay|extended/.test(explicit))return "pt_extended";
    if(/restricted-response|constructed|open/.test(explicit))return "pt_restricted";
    return "pt_other";
  }
  return "unknown";
}

// Thresholds PRE-CALIBRATION. They are conservative engineering defaults only.
// They must never be presented as empirically calibrated confidence thresholds.
export const PRECALIBRATION_POLICY={
  math_numeric:{minPolicyScore:0.84,boundaryMargin:0.06},
  math_constructed:{minPolicyScore:0.90,boundaryMargin:0.08},
  math_other:{minPolicyScore:0.93,boundaryMargin:0.10},
  fqa_calculation:{minPolicyScore:0.86,boundaryMargin:0.06},
  fqa_conceptual:{minPolicyScore:0.92,boundaryMargin:0.10},
  fqa_other:{minPolicyScore:0.94,boundaryMargin:0.10},
  pt_objective_short:{minPolicyScore:0.90,boundaryMargin:0.08},
  pt_restricted:{minPolicyScore:0.95,boundaryMargin:0.12},
  pt_extended:{minPolicyScore:0.97,boundaryMargin:0.15},
  pt_other:{minPolicyScore:0.96,boundaryMargin:0.12},
  unknown:{minPolicyScore:1,boundaryMargin:1}
};

function evidenceCoverage(result={}){
  const matched=Number(result.matchedCriteriaCount??result.matchedEvidenceCount??result.matchedCount);
  const total=Number(result.totalCriteriaCount??result.expectedEvidenceCount??result.totalCount);
  if(Number.isFinite(matched)&&Number.isFinite(total)&&total>0)return clamp01(matched/total);
  if(Array.isArray(result.matchedCriteria)&&Array.isArray(result.missedCriteria)){
    const count=result.matchedCriteria.length+result.missedCriteria.length;
    return count?result.matchedCriteria.length/count:0.5;
  }
  return 0.5;
}

export function preCalibrationPolicyScore(result={}){
  const semantic=normPercent(result.semanticScore??result.semantic);
  const relation=normPercent(result.relationScore??result.relation);
  const coherence=normPercent(result.coherenceScore??result.coherence??0.7);
  const ambiguity=normPercent(result.ambiguityScore??result.ambiguity);
  const coverage=evidenceCoverage(result);
  const contradiction=result.contradiction===true||result.hasContradiction===true||result.contradictionDetected===true?1:0;
  const manipulation=result.manipulationDetected===true?1:0;
  const substance=normPercent(result.substanceScore??result.substance??0.7);

  // Deliberately does not use a model-declared confidence value.
  const positive=semantic*0.30+relation*0.18+coherence*0.14+coverage*0.20+substance*0.18;
  const penalty=ambiguity*0.22+contradiction*0.08+manipulation*0.25;
  return Math.round(clamp01(positive-penalty)*1000)/1000;
}

function scorePercent(result={}){
  const raw=Number(result.scorePercent??result.score_percent??result.score);
  if(!Number.isFinite(raw))return null;
  return raw<=1?raw*100:raw;
}

export function scoreDecision(score){
  if(score===null||!Number.isFinite(score))return "abstain";
  if(score>=85)return "accept";
  if(score>=35)return "partial";
  return "reject";
}

function nearDecisionBoundary(score,margin){
  if(score===null)return true;
  const distance=Math.min(Math.abs(score-85),Math.abs(score-35))/100;
  return distance<margin;
}

export function selectiveGradingDecision({subject,question={},graderResult={},validationStatus=SELECTIVE_STATUS.PRECALIBRATION}={}){
  const family=responseFamily(subject,question);
  const policy=PRECALIBRATION_POLICY[family]||PRECALIBRATION_POLICY.unknown;
  const policyScore=preCalibrationPolicyScore(graderResult);
  const score=scorePercent(graderResult);
  const reasons=[];
  const contradictionDetected=graderResult.contradiction===true||graderResult.hasContradiction===true||graderResult.contradictionDetected===true;
  const ambiguityDetected=graderResult.ambiguityDetected===true||normPercent(graderResult.ambiguityScore??graderResult.ambiguity)>=0.45;
  const manipulationDetected=graderResult.manipulationDetected===true;

  if(validationStatus!==SELECTIVE_STATUS.VALIDATED)reasons.push("NOT_HUMAN_CALIBRATED");
  if(family==="unknown")reasons.push("UNVALIDATED_RESPONSE_CLASS");
  if(graderResult.requiresReview===true)reasons.push("GRADER_REQUIRES_REVIEW");
  if(contradictionDetected)reasons.push("CONTRADICTORY_RESPONSE");
  if(ambiguityDetected)reasons.push("AMBIGUOUS_RESPONSE");
  if(manipulationDetected)reasons.push("MANIPULATION_DETECTED");
  if(policyScore<policy.minPolicyScore)reasons.push("LOW_EVIDENCE_STRENGTH");
  if(nearDecisionBoundary(score,policy.boundaryMargin))reasons.push("DECISION_BOUNDARY");

  // Until human calibration exists, open/interpretative classes must abstain from a definitive grade.
  const humanValidationRequired=validationStatus!==SELECTIVE_STATUS.VALIDATED&&[
    "math_constructed","math_other","fqa_conceptual","fqa_other","pt_restricted","pt_extended","pt_other"
  ].includes(family);
  if(humanValidationRequired)reasons.push("CLASS_REQUIRES_HUMAN_CALIBRATION");

  const shouldAbstain=reasons.some(code=>code!=="NOT_HUMAN_CALIBRATED");
  const decision=shouldAbstain?"abstain":scoreDecision(score);

  return {
    schema:SELECTIVE_GRADING_SCHEMA,
    status:validationStatus,
    subject,
    responseFamily:family,
    decision,
    scorePercent:score,
    policyScore,
    threshold:policy.minPolicyScore,
    reasons:[...new Set(reasons)],
    definitive:decision!=="abstain"&&validationStatus===SELECTIVE_STATUS.VALIDATED,
    note:validationStatus===SELECTIVE_STATUS.VALIDATED
      ?"Decisão sujeita aos limites da validação humana desta classe de resposta."
      :"Policy score pré-calibração: não representa probabilidade de correção nem confiança humana validada."
  };
}
