import fs from "node:fs";

function replaceExact(path,from,to,label){
  const source=fs.readFileSync(path,"utf8");
  const count=source.split(from).length-1;
  if(count!==1)throw new Error(`${label}: esperado 1 match em ${path}, encontrados ${count}`);
  fs.writeFileSync(path,source.replace(from,to));
}

replaceExact(
  "app/lib/automaticEvidenceGrader.js",
  '    const ratio=Number.isFinite(criterion.scoreRatio)?criterion.scoreRatio:(criterion.status==="observed"?1:criterion.status==="partial"?.5:0);\n    points+=ratio*weight;',
  '    const ratio=criterion.status==="observed"?1:Number.isFinite(criterion.scoreRatio)?criterion.scoreRatio:(criterion.status==="partial"?.5:0);\n    points+=ratio*weight;',
  "critério observed recebe cotação integral"
);
replaceExact(
  "app/lib/automaticEvidenceGrader.js",
  '  return {\n    provisionalPoints:Math.round(provisionalPoints*10)/10,\n    maxPoints,',
  '  const criterionPoints=criteria.map(criterion=>{\n    const weight=Number(criterion.points)||1;\n    const ratio=criterion.status==="observed"?1:Number.isFinite(criterion.scoreRatio)?criterion.scoreRatio:(criterion.status==="partial"?.5:0);\n    const criterionMax=maxPoints*(weight/totalWeight);\n    return {id:criterion.id,awardedPoints:Math.round(criterionMax*ratio*10)/10,maxPoints:Math.round(criterionMax*10)/10,lostPoints:Math.round(criterionMax*(1-ratio)*10)/10};\n  });\n  return {\n    provisionalPoints:Math.round(provisionalPoints*10)/10,\n    maxPoints,\n    criterionPoints,',
  "decomposição por critério"
);

replaceExact(
  "app/lib/portugueseEngine.js",
  'import {portugueseObservationGuidance} from "./portugueseObservationGuidance.js";',
  'import {portugueseObservationGuidance} from "./portugueseObservationGuidance.js";\nimport {buildScoreExplainability} from "./scoreExplainability.js";',
  "import explainability português"
);
replaceExact(
  "app/lib/portugueseEngine.js",
  '    const summary=automaticRubricSummary(criteria,item.maxPoints||item.rubric?.maxPoints||0);\n    const feedbackSummary=automaticFeedbackForCriteria(criteria,responseText);\n    return {',
  '    const summary=automaticRubricSummary(criteria,item.maxPoints||item.rubric?.maxPoints||0);\n    const pointMap=new Map(summary.criterionPoints.map(row=>[row.id,row]));\n    const scoredCriteria=criteria.map(criterion=>({...criterion,...(pointMap.get(criterion.id)||{})}));\n    const feedbackSummary=automaticFeedbackForCriteria(scoredCriteria,responseText);\n    const scoreExplainability=buildScoreExplainability({awardedPoints:summary.provisionalPoints,maxPoints:item.maxPoints,criteria:scoredCriteria,requiresReview:summary.requiresReview});\n    return {',
  "pontuação explicável português"
);
replaceExact(
  "app/lib/portugueseEngine.js",
  '      criteria,feedbackSummary,',
  '      criteria:scoredCriteria,feedbackSummary,scoreExplainability,',
  "retorno explicabilidade português"
);

replaceExact(
  "app/lib/physicsChemistryRubric.js",
  'import {assessEvidence,aggregateCriterionAssessment,automaticRubricSummary,automaticFeedbackForCriteria} from "./automaticEvidenceGrader.js";',
  'import {assessEvidence,aggregateCriterionAssessment,automaticRubricSummary,automaticFeedbackForCriteria} from "./automaticEvidenceGrader.js";\nimport {buildScoreExplainability} from "./scoreExplainability.js";',
  "import explainability fqa"
);
replaceExact(
  "app/lib/physicsChemistryRubric.js",
  '  const summary=automaticRubricSummary(criteria,item.maxPoints||10);\n  const feedbackSummary=automaticFeedbackForCriteria(criteria,text);\n  return {',
  '  const summary=automaticRubricSummary(criteria,item.maxPoints||10);\n  const pointMap=new Map(summary.criterionPoints.map(row=>[row.id,row]));\n  const scoredCriteria=criteria.map(criterion=>({...criterion,...(pointMap.get(criterion.id)||{})}));\n  const feedbackSummary=automaticFeedbackForCriteria(scoredCriteria,text);\n  const scoreExplainability=buildScoreExplainability({awardedPoints:summary.provisionalPoints,maxPoints:item.maxPoints||10,criteria:scoredCriteria,requiresReview:summary.requiresReview});\n  return {',
  "pontuação explicável fqa"
);
replaceExact(
  "app/lib/physicsChemistryRubric.js",
  '    requiresReview:summary.requiresReview,autoAssessmentConfidence:summary.confidence,criteria,feedbackSummary,',
  '    requiresReview:summary.requiresReview,autoAssessmentConfidence:summary.confidence,criteria:scoredCriteria,feedbackSummary,scoreExplainability,',
  "retorno explicabilidade fqa"
);

replaceExact(
  "app/lib/constructedResponse.js",
  'import {scoreIaveStep,iaveSituationLabel,dependentStepCap,applyIaveGlobalPenalties,iaveGlobalPenalty} from "./iaveScoring.js";',
  'import {scoreIaveStep,iaveSituationLabel,dependentStepCap,applyIaveGlobalPenalties,iaveGlobalPenalty} from "./iaveScoring.js";\nimport {buildScoreExplainability} from "./scoreExplainability.js";',
  "import explainability matemática"
);
replaceExact(
  "app/lib/constructedResponse.js",
  'export function gradeResponse(question,answer){',
  'function withMathExplainability(result){\n  if(!result||!Number.isFinite(result.maxPoints))return result;\n  const awarded=Number.isFinite(result.points)?result.points:null;\n  if(awarded===null)return result;\n  const scoreExplainability=buildScoreExplainability({awardedPoints:awarded,maxPoints:result.maxPoints,steps:result.stepResults||[],globalPenalty:result.globalPenalty||0,requiresReview:result.reviewRequired});\n  return {...result,scoreExplainability,reviewRequired:result.reviewRequired||!!scoreExplainability.consistencyError};\n}\n\nexport function gradeResponse(question,answer){',
  "wrapper explainability matemática"
);
replaceExact(
  "app/lib/constructedResponse.js",
  '    return {status:correct?"correct":points>0?"partial":"incorrect",correct,points,maxPoints,stepResults:[],blankResults};',
  '    return withMathExplainability({status:correct?"correct":points>0?"partial":"incorrect",correct,points,maxPoints,stepResults:[],blankResults});',
  "completion matemática"
);
replaceExact(
  "app/lib/constructedResponse.js",
  '    return {status:pendingPoints?"needs_review":correct?"correct":points>0?"partial":"incorrect",correct,points,maxPoints,stepResults,pendingPoints,reviewRequired:pendingPoints>0,globalPenalty,globalPenalties,reason,errorDiagnosis};',
  '    return withMathExplainability({status:pendingPoints?"needs_review":correct?"correct":points>0?"partial":"incorrect",correct,points,maxPoints,stepResults,pendingPoints,reviewRequired:pendingPoints>0,globalPenalty,globalPenalties,reason,errorDiagnosis});',
  "stepwise matemática"
);
replaceExact(
  "app/lib/constructedResponse.js",
  '  return {status:correct?"correct":"incorrect",correct,points:correct?maxPoints:0,maxPoints,stepResults:[],reason:correct?null:reason};\n}',
  '  return withMathExplainability({status:correct?"correct":"incorrect",correct,points:correct?maxPoints:0,maxPoints,stepResults:[],reason:correct?null:reason});\n}',
  "retorno simples matemática"
);

replaceExact(
  "app/components/PortugueseSubject.js",
  'import {isFriendsBeta} from "../lib/friendsBeta";',
  'import {isFriendsBeta} from "../lib/friendsBeta";\nimport ScoreLossExplanation from "./ScoreLossExplanation";',
  "import UI português"
);
replaceExact(
  "app/components/PortugueseSubject.js",
  '{Number.isFinite(feedback.provisionalPoints)&&<div className="autoAssessmentScore"><b>{String(feedback.provisionalPoints).replace(".",",")} / {feedback.maxPoints} pontos</b><small>estimativa provisória · confiança {feedback.autoAssessmentConfidence??"—"}%</small></div>}',
  '{Number.isFinite(feedback.provisionalPoints)&&<><div className="autoAssessmentScore"><b>{String(feedback.provisionalPoints).replace(".",",")} / {feedback.maxPoints} pontos</b><small>estimativa provisória · confiança {feedback.autoAssessmentConfidence??"—"}%</small></div><ScoreLossExplanation result={feedback}/></>}',
  "UI perda português"
);

replaceExact(
  "app/components/PhysicsChemistrySubject.js",
  'import {answerOptionState} from "../lib/feedbackCopy";',
  'import {answerOptionState} from "../lib/feedbackCopy";\nimport ScoreLossExplanation from "./ScoreLossExplanation";',
  "import UI fqa"
);
replaceExact(
  "app/components/PhysicsChemistrySubject.js",
  '{Number.isFinite(feedback.provisionalPoints)&&<div className="autoAssessmentScore"><b>{String(feedback.provisionalPoints).replace(".",",")} / {feedback.maxPoints} pontos</b><small>estimativa provisória · confiança {feedback.autoAssessmentConfidence??"—"}%</small></div>}',
  '{Number.isFinite(feedback.provisionalPoints)&&<><div className="autoAssessmentScore"><b>{String(feedback.provisionalPoints).replace(".",",")} / {feedback.maxPoints} pontos</b><small>estimativa provisória · confiança {feedback.autoAssessmentConfidence??"—"}%</small></div><ScoreLossExplanation result={feedback}/></>}',
  "UI perda fqa restricted"
);
replaceExact(
  "app/components/PhysicsChemistrySubject.js",
  '{item.responseType==="stepwise"&&<PhysicsChemistryStepwiseReview item={item} result={feedback}/>} ',
  '{item.responseType==="stepwise"&&<><PhysicsChemistryStepwiseReview item={item} result={feedback}/><ScoreLossExplanation result={feedback}/></>} ',
  "UI perda fqa stepwise"
);

replaceExact(
  "app/page.js",
  'import {Welcome} from "./components/Welcome";',
  'import {Welcome} from "./components/Welcome";\nimport ScoreLossExplanation from "./components/ScoreLossExplanation";',
  "import UI matemática"
);
replaceExact(
  "app/page.js",
  '      <p>{feedback.points}/{feedback.maxPoints} pontos{feedback.reviewRequired?" confirmados":""}</p>\n      {feedback.errorDiagnosis',
  '      <p>{feedback.points}/{feedback.maxPoints} pontos{feedback.reviewRequired?" confirmados":""}</p>\n      <ScoreLossExplanation result={feedback}/>\n      {feedback.errorDiagnosis',
  "UI perda matemática sessão"
);
replaceExact(
  "app/page.js",
  '        {grade?.errorDiagnosis&&grade.errorDiagnosis.code!=="correct_or_near_correct"&&<div className="notice"><b>{grade.errorDiagnosis.label}</b><span>{grade.errorDiagnosis.message}</span></div>}\n        {grade?.stepResults?.length',
  '        {grade?.errorDiagnosis&&grade.errorDiagnosis.code!=="correct_or_near_correct"&&<div className="notice"><b>{grade.errorDiagnosis.label}</b><span>{grade.errorDiagnosis.message}</span></div>}\n        <ScoreLossExplanation result={grade}/>\n        {grade?.stepResults?.length',
  "UI perda matemática revisão"
);

console.log("SCORE EXPLAINABILITY PATCH: GO");
