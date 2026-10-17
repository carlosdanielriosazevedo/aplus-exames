import {STUDY_SESSION_MIN_QUESTIONS,STUDY_SESSION_MAX_QUESTIONS,DEFAULT_TRAINING_QUESTIONS,MATH_MINI_EXAM_QUESTIONS,clampStudySessionSize} from "./sessionPolicy.js";
import {
  TAXONOMY,PREREQUISITES,FOCUS_PREREQUISITES,MICRO_PREREQUISITES,
  QUESTION_BANK,microcompetencyFor,microcompetencyId,microcompetencyLabel
} from "../data/content.js";
import {generateVariants,hasGenerator} from "./generators.js";
import {isEligibleForContext,effectiveEditorialItem} from "./quality.js";
import {academicScopeThemes,isThemeInAcademicScope,isQuestionInAcademicScope,isEvidenceInAcademicScope,isSubtopicInAcademicScope,normalizeTaughtSubtopics} from "./curriculumScope.js";
import {CURRICULUM_SUBTOPIC_BY_ID,curriculumSubtopicForItem} from "../data/curriculumVnext.js";
import {VNEXT_PILOT_QUESTIONS} from "../data/vnextPilot.js";
import {VNEXT_DIAGNOSTIC_QUESTIONS} from "../data/vnextDiagnostic.js";
import {VNEXT_MISSION_QUESTIONS} from "../data/vnextMission.js";
import {VNEXT_EXAM_QUESTIONS} from "../data/vnextExam.js";
import {CONSTRUCTED_RESPONSE_BANK,COMPLETION_RESPONSE_BANK,gradeResponse,miniExamPointSummary} from "./constructedResponse.js";
import {normalizeMathVisibleItem} from "./mathVisibleCopy.js";
import {
  HYPOTHESIS_STATUS,applyHypothesisObservation,normalizeLearningHypothesis,
  refreshHypothesisLifecycle,hypothesisNeedsInvestigation,hypothesisView
} from "./pedagogicalMemory.js";

export const emptyScores=()=>TAXONOMY.reduce((acc,t)=>{
  acc[t.id]={domain:null,conf:0,evidence:[]};
  return acc;
},{});

// O runtime recebe os bancos vNext que alimentam os fluxos ativos da beta.
// Apenas campos editoriais visíveis dos bancos vNext são normalizados; IDs,
// signatures, focos e restantes chaves de seleção/matching ficam intactos.
const visibleVnext=rows=>rows.map(normalizeMathVisibleItem);
export const RUNTIME_QUESTION_BANK=[
  ...QUESTION_BANK,
  ...visibleVnext(VNEXT_PILOT_QUESTIONS),
  ...visibleVnext(VNEXT_DIAGNOSTIC_QUESTIONS),
  ...visibleVnext(VNEXT_MISSION_QUESTIONS),
  ...visibleVnext(VNEXT_EXAM_QUESTIONS),
  ...CONSTRUCTED_RESPONSE_BANK,
  ...COMPLETION_RESPONSE_BANK
];
export const questionById=id=>RUNTIME_QUESTION_BANK.find(q=>q.id===id)||null;

export const theme=id=>TAXONOMY.find(t=>t.id===id);
export const byYear=year=>TAXONOMY.filter(t=>t.year===year);

export function getQuestions(themeId,context,focus=null,s=null){
  const overrides=s?.editorialOverrides||{};
  let q=RUNTIME_QUESTION_BANK
    .map(x=>effectiveEditorialItem(x,overrides))
    .filter(x=>x.themeId===themeId && x.contexts.includes(context));
  if(focus){
    const mcId=microcompetencyId(themeId,focus);
    const exact=q.filter(x=>
      mcId
        ?(x.microcompetencyId||microcompetencyId(x.themeId,x.focus))===mcId
        :x.focus===focus
    );
    if(exact.length)q=exact;
  }
  return q;
}

export function eligibleQuestions(s,themeId,context,focus=null){
  let q=getQuestions(themeId,context,focus,s);
  if(!s)return q;
  return q.filter(item=>isQuestionInAcademicScope(item,s.profile,context)&&isEligibleForContext(item,context,s.editorialOverrides||{},s.betaMode||"internal"));
}

export function eligibleCount(s,context){
  return RUNTIME_QUESTION_BANK.filter(q=>isEligibleForContext(q,context,s?.editorialOverrides||{},s?.betaMode||"internal")).length;
}

export function hasTrainingContent(themeId,focus=null,s=null){
  const curated=s?eligibleQuestions(s,themeId,"training",focus):getQuestions(themeId,"training",focus);
  const generatedAllowed=!s || (s.betaMode||"internal")==="internal";
  return curated.length>0 || (generatedAllowed && hasGenerator(themeId,focus));
}

function diagnosticCandidates(ref,s=null){
  const subtopic=CURRICULUM_SUBTOPIC_BY_ID.get(ref);
  const themeId=subtopic?.themeId||ref;
  const candidates=s
    ?eligibleQuestions(s,themeId,"diagnostic")
    :getQuestions(themeId,"diagnostic");
  return subtopic?candidates.filter(q=>curriculumSubtopicForItem(q)===ref):candidates;
}

export function diagnosticAnchor(ref,startDifficulty=2,s=null){
  const candidates=diagnosticCandidates(ref,s).filter(q=>q.role==="anchor");
  if(!candidates.length)return null;
  return [...candidates].sort((a,b)=>Math.abs(a.difficulty-startDifficulty)-Math.abs(b.difficulty-startDifficulty))[0];
}

export function diagnosticProbe(ref,failedItem,s=null){
  const candidates=diagnosticCandidates(ref,s).filter(q=>q.role==="probe"&&q.id!==failedItem?.id);
  if(!candidates.length)return null;
  const target=Math.max(1,(failedItem?.difficulty||2)-1);
  return [...candidates].sort((a,b)=>Math.abs(a.difficulty-target)-Math.abs(b.difficulty-target))[0];
}

export function nextDiagnosticDifficulty(current,correct,isProbe=false){
  if(isProbe)return Math.max(1,current);
  return Math.max(1,Math.min(3,current+(correct?1:-1)));
}

export function certaintyLabel(conf=0,evidenceCount=0){
  if(evidenceCount===0)return "Ainda sem evidência";
  if(conf<35)return "Baixa";
  if(conf<70)return "Média";
  return "Alta";
}
export function certaintyHelp(conf=0,evidenceCount=0){
  if(evidenceCount===0)return "Ainda não existem respostas suficientes para estimar esta área.";
  if(conf<35)return "Ainda há pouca evidência independente. Novas respostas podem alterar bastante esta estimativa.";
  if(conf<70)return "Já existe evidência útil, mas a app ainda quer confirmar este padrão em perguntas diferentes.";
  return "A estimativa é sustentada por várias observações. Continuará a ser atualizada com novas respostas.";
}

export function summarizeEvidence(evidence=[],now=Date.now()){
  if(!evidence.length)return {domain:null,conf:0,evidence:[],diagnostics:{count:0,independent:0,cognitive:0,difficulty:0,ageDays:null}};
  const rows=evidence.map(e=>{
    const ageDays=Math.max(0,(now-(e.at||now))/86400000);
    const freshness=Math.max(.55,1-ageDays/240);
    const difficulty=.78+(e.difficulty||2)*.08;
    const signal=e.correct?72+Math.min(20,(e.difficulty||2)*5):Math.max(8,42-(e.difficulty||2)*7);
    return {...e,ageDays,w:(e.strength||1)*freshness*difficulty,signal:e.signal??signal};
  });
  const total=rows.reduce((a,e)=>a+e.w,0)||1;
  const domain=Math.round(rows.reduce((a,e)=>a+e.signal*e.w,0)/total);
  const independent=new Set(rows.map(e=>e.signature||e.itemId)).size;
  const cognitive=new Set(rows.map(e=>e.cognitive).filter(Boolean)).size;
  const difficulty=new Set(rows.map(e=>e.difficulty).filter(Boolean)).size;
  const ageDays=Math.min(...rows.map(e=>e.ageDays));
  const conf=Math.round(Math.min(100,independent*17+cognitive*9+difficulty*6+Math.min(20,rows.length*2)));
  return {domain,conf,evidence,diagnostics:{count:rows.length,independent,cognitive,difficulty,ageDays:Math.round(ageDays)}};
}

export function recalibrateScore(score,now=Date.now()){
  return summarizeEvidence(score?.evidence||[],now);
}

export function recalibrateAllScores(scores={},now=Date.now()){
  return TAXONOMY.reduce((acc,t)=>{
    acc[t.id]=recalibrateScore(scores?.[t.id],now);
    return acc;
  },{});
}

export function scopedThemeScore(s,themeId,now=Date.now()){
  const t=theme(themeId);
  if(!t||!isThemeInAcademicScope(t,s?.profile))return summarizeEvidence([],now);
  return summarizeEvidence((s?.scores?.[themeId]?.evidence||[]).filter(e=>isEvidenceInAcademicScope(e,t,s?.profile)),now);
}

export function evidenceHealth(score,now=Date.now()){
  return summarizeEvidence(score?.evidence||[],now).diagnostics;
}

export function applyEvidence(score,item,correct,source="diagnostic",strength=1,meta={}){
  const previous=score?.evidence || [];
  const duplicateSignature=previous.some(e=>(e.signature||e.itemId)===(item.signature||item.id));
  const effectiveStrength=strength*(duplicateSignature?.55:1);

  const newEvidence={
    itemId:item.id,
    themeId:item.themeId,
    focus:item.focus || microcompetencyLabel(item.microcompetencyId) || null,
    microcompetencyId:item.microcompetencyId||microcompetencyId(item.themeId,item.focus)||null,
    subtopicId:curriculumSubtopicForItem(item),
    correct,
    difficulty:item.difficulty,
    cognitive:item.cognitive,
    signature:item.signature,
    source,
    at:meta.at??Date.now(),
    signal:signalFor(item,correct),
    strength:effectiveStrength,
    ...(meta.responseId?{responseId:meta.responseId}:{}),
    ...(meta.sessionId?{sessionId:meta.sessionId}:{}),
    ...(meta.contentFingerprint?{contentFingerprint:meta.contentFingerprint}:{})
  };

  return summarizeEvidence([...previous,newEvidence]);
}

export function measuredThemes(s){
  return academicScopeThemes(s?.profile).filter(t=>scopedThemeScore(s,t.id).domain!==null);
}

export function prepIndex(s){
  const measured=measuredThemes(s);
  if(!measured.length)return null;
  const rows=measured.map(t=>{
    const v=scopedThemeScore(s,t.id);
    const certaintyWeight=Math.max(.35,v.conf/100);
    const relevanceWeight=.75+t.relevance*.08;
    return {value:v.domain,w:certaintyWeight*relevanceWeight};
  });
  return Math.round(rows.reduce((a,r)=>a+r.value*r.w,0)/rows.reduce((a,r)=>a+r.w,0));
}

export function priorityScore(t,s){
  const v=scopedThemeScore(s,t.id);
  if(v?.domain===null || v?.domain===undefined)return -Infinity;
  return nextBestActionBreakdown(t,s).total;
}

export function selectMissionTheme(s){
  const assessed=academicScopeThemes(s?.profile)
    .filter(t=>scopedThemeScore(s,t.id).domain!==null && eligibleQuestions(s,t.id,"mission").length)
    .map(t=>({t,p:priorityScore(t,s)}))
    .sort((a,b)=>b.p-a.p);
  return assessed[0]?.t || null;
}

export function desiredDifficulty(score,goal=16){
  const d=score?.domain;
  let target=d===null||d===undefined?2:d<45?1:d<65?2:d<80?3:4;
  if(goal>=18 && d!==null && d>=55)target=Math.min(4,target+1);
  return target;
}

export function selectMissionQuestion(s,themeId,usedIds=[],usedSignatures=[]){
  const candidates=eligibleQuestions(s,themeId,"mission")
    .filter(q=>isUsefulMissionInteraction(q,usedIds,usedSignatures));
  if(!candidates.length)return null;
  const target=desiredDifficulty(s.scores[themeId],s.goal);
  const usedCogs=new Set(
    usedIds.map(id=>{
      const src=RUNTIME_QUESTION_BANK.find(q=>q.id===id);
      return effectiveEditorialItem(src,s?.editorialOverrides||{})?.cognitive;
    }).filter(Boolean)
  );

  return [...candidates].sort((a,b)=>{
    const score=q=>{
      const diff=Math.abs(q.difficulty-target)*3;
      const signature=usedSignatures.includes(q.signature)?5:0;
      const cognitive=usedCogs.has(q.cognitive)?1.5:0;
      return diff+signature+cognitive;
    };
    return score(a)-score(b);
  })[0];
}

export function selectPrereqQuestion(s,targetThemeId,usedIds=[],usedSignatures=[]){
  const preId=PREREQUISITES[targetThemeId];
  if(!preId || !isThemeInAcademicScope(theme(preId),s?.profile))return null;
  const candidates=eligibleQuestions(s,preId,"mission")
    .filter(q=>isUsefulMissionInteraction(q,usedIds,usedSignatures));
  if(!candidates.length)return null;
  const target=Math.max(1,desiredDifficulty(s.scores[preId],s.goal)-1);
  return [...candidates].sort((a,b)=>Math.abs(a.difficulty-target)-Math.abs(b.difficulty-target))[0];
}

export function missionStopDecision({
  missionType="priority",
  targetCount,
  totalCount,
  beforeConf=0,
  currentScore,
  sessionTargetItems=[],
  beforeFocusConf=null,
  currentFocusScore=null,
  estimatedSeconds=0
}){
  const relevantBefore=beforeFocusConf??beforeConf??0;
  const relevantNow=currentFocusScore?.conf??currentScore?.conf??0;
  const confGain=relevantNow-relevantBefore;

  const independent=new Set(
    sessionTargetItems.map(x=>x.signature||x.id).filter(Boolean)
  ).size;
  const cognitiveVariety=new Set(
    sessionTargetItems.map(x=>x.cognitive).filter(Boolean)
  ).size;
  const difficultyVariety=new Set(
    sessionTargetItems.map(x=>x.difficulty).filter(x=>x!==undefined)
  ).size;

  // Sete perguntas é o mínimo absoluto. Depois disso, a sessão termina por
  // valor pedagógico ou por orçamento temporal, nunca apenas por contagem fixa.
  if(totalCount>=DAILY_MISSION_MAX_INTERACTIONS){
    return {
      stop:true,code:"session_cap",
      title:"Sessão curta concluída",
      detail:"A Missão atingiu o seu limite útil. A app prefere distribuir novas observações por dias diferentes."
    };
  }
  if(totalCount<DAILY_MISSION_MIN_INTERACTIONS)return {stop:false,code:"minimum_not_reached"};
  if(estimatedSeconds<DAILY_MISSION_MIN_SECONDS)return {stop:false,code:"time_budget_not_reached"};
  if(estimatedSeconds>=DAILY_MISSION_MAX_SECONDS){
    return {
      stop:true,code:"time_budget_reached",
      title:"Sessão curta concluída",
      detail:null
    };
  }

  if(missionType==="calibration"){
    return {
      stop:true,code:"calibration_session_complete",
      title:"Primeira sessão de calibração concluída",
      detail:"Já existem observações úteis para começar o mapa. A app voltará a esta área noutras Missões."
    };
  }

  // Confirmações de Treino Livre precisam de pelo menos duas evidências independentes.
  if(missionType==="confirmation"){
    if(targetCount>=2 && independent>=2){
      return {
        stop:true,code:"confirmation_sufficient",
        title:"Confirmação concluída",
        detail:"A app já tem duas observações independentes desta dificuldade."
      };
    }
    return {stop:false,code:"confirmation_needs_independent_evidence"};
  }

  if(targetCount>=3 && independent>=3 && (cognitiveVariety>=2||difficultyVariety>=2) && confGain>=8){
    return {stop:true,code:"evidence_sufficient",title:"Já temos evidência suficiente",detail:null};
  }
  return {stop:false,code:"continue_collecting_evidence"};
}

export function shouldEndMission(targetCount,totalCount,beforeConf,currentScore,sessionTargetItems=[]){
  return missionStopDecision({targetCount,totalCount,beforeConf,currentScore,sessionTargetItems,estimatedSeconds:DAILY_MISSION_MIN_SECONDS}).stop;
}

export function trainingQuestions(s,themeId,focus=null,limit=DEFAULT_TRAINING_QUESTIONS){
  const candidates=eligibleQuestions(s,themeId,"training",focus);
  const generatedAllowed=(s?.betaMode||"internal")==="internal";
  const source=candidates.length?candidates:(generatedAllowed?generateVariants(themeId,focus):[]);
  return source.slice(0,clampStudySessionSize(limit));
}

export function missionPracticeQuestion(s,themeId,focus=null){
  const candidates=eligibleQuestions(s,themeId,"mission",focus);
  return candidates[0]||null;
}

export function startingDifficulty(profile,goal=17){
  const recent=Number(profile?.recentGrade);
  if(Number.isFinite(recent)&&recent>0)return recent>=16?3:recent>=11?2:1;
  return goal>=18?3:goal>=13?2:1;
}

export function missionContentExhaustedDecision({targetCount=0,totalCount=0}){
  if(totalCount>=DAILY_MISSION_MIN_INTERACTIONS)return {stop:true,code:"content_exhausted_after_minimum"};
  if(targetCount>0)return {stop:false,code:"content_exhausted_try_detour"};
  return {stop:true,code:"content_unavailable"};
}

export function canStartMissionDetour({detour=null,totalCount=0}){
  return !detour&&totalCount<DAILY_MISSION_MAX_INTERACTIONS;
}

export function estimateMissionSeconds(items=[]){
  return items.reduce((total,item)=>total+(item?.estimatedSeconds||45),0);
}

export function dailyMissionPlan(s){
  const t=selectMissionTheme(s);
  if(!t)return {type:"blocked",themeId:null,focus:null,reason:"Ainda não há evidência suficiente para escolher uma Missão."};
  return {type:"priority",themeId:t.id,focus:null,reason:`Esta área combina prioridade, relevância para o exame e evidência disponível.`};
}

export function missionCandidateQueue(s,plan){
  return eligibleQuestions(s,plan.themeId,"mission",plan.focus);
}

export function markTrainingSignalConfirmed(state){return state}

export function selectQuestionForPlan(s,plan,usedIds=[],usedSignatures=[]){
  return selectMissionQuestion(s,plan.themeId,usedIds,usedSignatures);
}

export function buildMiniExam(s,count=MATH_MINI_EXAM_QUESTIONS){
  const scoped=academicScopeThemes(s?.profile);
  const candidates=scoped.flatMap(t=>eligibleQuestions(s,t.id,"exam"));
  return candidates.slice(0,typeof count==="number"?count:MATH_MINI_EXAM_QUESTIONS);
}

export function applyMiniExam(s){return s}

export function rankedStudyPriorities(s,limit=4){
  return academicScopeThemes(s?.profile)
    .map(t=>({theme:t,score:scopedThemeScore(s,t.id)}))
    .filter(row=>row.score.domain!==null)
    .sort((a,b)=>(a.score.domain??100)-(b.score.domain??100))
    .slice(0,limit);
}

export function focusScore(s,themeId,focus){
  const rows=(s?.scores?.[themeId]?.evidence||[]).filter(e=>e.focus===focus||e.microcompetencyId===microcompetencyId(themeId,focus));
  return summarizeEvidence(rows);
}

export function focusRows(s,themeId){
  return (theme(themeId)?.focus||[]).map(focus=>({focus,score:focusScore(s,themeId,focus)}));
}

export function competenceMap(s){
  return academicScopeThemes(s?.profile).map(t=>({theme:t,score:scopedThemeScore(s,t.id)}));
}

export function selectCausalProbe(){return null}
export function causalVerdict(){return null}
export function recordLearningHypothesis(state){return state}
export function activeLearningHypotheses(state){return (state?.learningHypotheses||[]).filter(x=>x.status===HYPOTHESIS_STATUS?.ACTIVE)}
export function allLearningHypotheses(state){return state?.learningHypotheses||[]}
export function refreshLearningHypotheses(state){return state}
export function migratePedagogicalIds(state){return state}

function signalFor(item,correct){
  const base=correct?72:30;
  return Math.max(0,Math.min(100,base+(item.difficulty||2)*(correct?4:-4)));
}

function isUsefulMissionInteraction(q,usedIds=[],usedSignatures=[]){
  return !usedIds.includes(q.id)&&!usedSignatures.includes(q.signature);
}

function nextBestActionBreakdown(t,s){
  const v=scopedThemeScore(s,t.id);
  const need=100-(v.domain??50);
  const uncertainty=100-(v.conf||0);
  return {total:need*.6+uncertainty*.2+(t.relevance||1)*4+(t.blocking||1)*3};
}

const DAILY_MISSION_MIN_INTERACTIONS=STUDY_SESSION_MIN_QUESTIONS;
const DAILY_MISSION_MAX_INTERACTIONS=Math.max(STUDY_SESSION_MAX_QUESTIONS,STUDY_SESSION_MIN_QUESTIONS);
const DAILY_MISSION_MIN_SECONDS=120;
const DAILY_MISSION_MAX_SECONDS=360;
