
export const HYPOTHESIS_STATUS={
  open:"open",
  probablePrerequisite:"probable_prerequisite",
  probableTarget:"probable_target",
  ambiguous:"ambiguous",
  resolved:"resolved",
  stale:"stale"
};

export const HYPOTHESIS_STALE_AFTER_DAYS=30;

const ACTIVE_STATUSES=new Set([
  HYPOTHESIS_STATUS.open,
  HYPOTHESIS_STATUS.probablePrerequisite,
  HYPOTHESIS_STATUS.probableTarget,
  HYPOTHESIS_STATUS.ambiguous
]);

const INVESTIGATABLE_STATUSES=new Set([
  HYPOTHESIS_STATUS.open,
  HYPOTHESIS_STATUS.probablePrerequisite,
  HYPOTHESIS_STATUS.ambiguous
]);

function ageDays(ts,now=Date.now()){
  if(!ts)return 999;
  return Math.max(0,(now-ts)/(24*60*60*1000));
}

export function legacyHypothesisStatus(status){
  const map={
    "hipótese":HYPOTHESIS_STATUS.open,
    "dificuldade de base provável":HYPOTHESIS_STATUS.probablePrerequisite,
    "dificuldade específica provável":HYPOTHESIS_STATUS.probableTarget,
    "causa ainda ambígua":HYPOTHESIS_STATUS.ambiguous,
    "resolvida":HYPOTHESIS_STATUS.resolved,
    "desatualizada":HYPOTHESIS_STATUS.stale
  };
  return map[status]||(
    Object.values(HYPOTHESIS_STATUS).includes(status)
      ?status
      :HYPOTHESIS_STATUS.open
  );
}

export function hypothesisStatusLabel(status){
  const s=legacyHypothesisStatus(status);
  return {
    [HYPOTHESIS_STATUS.open]:"Em investigação",
    [HYPOTHESIS_STATUS.probablePrerequisite]:"Base provável",
    [HYPOTHESIS_STATUS.probableTarget]:"Dificuldade específica provável",
    [HYPOTHESIS_STATUS.ambiguous]:"Causa ainda ambígua",
    [HYPOTHESIS_STATUS.resolved]:"Resolvida",
    [HYPOTHESIS_STATUS.stale]:"Desatualizada"
  }[s];
}

export function hypothesisStatusIcon(status){
  const s=legacyHypothesisStatus(status);
  return {
    [HYPOTHESIS_STATUS.open]:"?",
    [HYPOTHESIS_STATUS.probablePrerequisite]:"↳",
    [HYPOTHESIS_STATUS.probableTarget]:"◎",
    [HYPOTHESIS_STATUS.ambiguous]:"≈",
    [HYPOTHESIS_STATUS.resolved]:"✓",
    [HYPOTHESIS_STATUS.stale]:"○"
  }[s];
}

export function hypothesisIsActive(h,now=Date.now()){
  return ACTIVE_STATUSES.has(effectiveHypothesisStatus(h,now));
}

export function hypothesisNeedsInvestigation(h,now=Date.now()){
  return INVESTIGATABLE_STATUSES.has(effectiveHypothesisStatus(h,now));
}

export function effectiveHypothesisStatus(h,now=Date.now()){
  const base=legacyHypothesisStatus(h?.lifecycleStatus||h?.status);
  if(
    ACTIVE_STATUSES.has(base)
    && ageDays(h?.lastAt||h?.openedAt,now)>HYPOTHESIS_STALE_AFTER_DAYS
  )return HYPOTHESIS_STATUS.stale;
  return base;
}

function transitionHistory(h,status,at,reason){
  const previous=legacyHypothesisStatus(h?.lifecycleStatus||h?.status);
  if(previous===status)return h?.history||[];
  return [
    ...(h?.history||[]),
    {from:previous,to:status,at,reason:reason||null}
  ].slice(-30);
}

function derivedStatus(recentPrerequisite,recentTarget,recentObservations){
  if(recentObservations<2)return HYPOTHESIS_STATUS.open;

  if(recentPrerequisite>=2 && recentPrerequisite>=recentTarget+1){
    return HYPOTHESIS_STATUS.probablePrerequisite;
  }
  if(recentTarget>=2 && recentTarget>=recentPrerequisite+1){
    return HYPOTHESIS_STATUS.probableTarget;
  }
  if(recentPrerequisite>=1 && recentTarget>=1){
    return HYPOTHESIS_STATUS.ambiguous;
  }
  return HYPOTHESIS_STATUS.open;
}

export function normalizeLearningHypothesis(h,now=Date.now()){
  const baseStatus=legacyHypothesisStatus(h?.lifecycleStatus||h?.status);
  const effective=effectiveHypothesisStatus(h,now);
  const staleTransition=effective===HYPOTHESIS_STATUS.stale && baseStatus!==HYPOTHESIS_STATUS.stale;

  return {
    ...h,
    lifecycleStatus:effective,
    status:effective,
    openedAt:h?.openedAt||h?.lastAt||now,
    lastTransitionAt:staleTransition?now:(h?.lastTransitionAt||h?.openedAt||h?.lastAt||now),
    resolvedAt:effective===HYPOTHESIS_STATUS.resolved?(h?.resolvedAt||h?.lastTransitionAt||h?.lastAt||now):null,
    staleAt:effective===HYPOTHESIS_STATUS.stale?(h?.staleAt||now):null,
    reopenCount:Number(h?.reopenCount)||0,
    recentPrerequisite:Number.isFinite(h?.recentPrerequisite)
      ?h.recentPrerequisite
      :(Number(h?.supportsPrerequisite)||0),
    recentTarget:Number.isFinite(h?.recentTarget)
      ?h.recentTarget
      :(Number(h?.supportsTarget)||0),
    recentObservations:Number.isFinite(h?.recentObservations)
      ?h.recentObservations
      :(Number(h?.observations)||0),
    history:staleTransition
      ?transitionHistory(h,HYPOTHESIS_STATUS.stale,now,"sem nova evidência causal durante 30 dias")
      :(h?.history||[])
  };
}

export function applyHypothesisObservation(h,eventCode,at=Date.now()){
  const prev=normalizeLearningHypothesis(h,at);
  const wasClosed=[
    HYPOTHESIS_STATUS.resolved,
    HYPOTHESIS_STATUS.stale
  ].includes(prev.lifecycleStatus);

  const prereq=eventCode==="prerequisite_suspected";
  const target=eventCode==="target_more_likely";

  const recentPrerequisite=(wasClosed?0:prev.recentPrerequisite||0)+(prereq?1:0);
  const recentTarget=(wasClosed?0:prev.recentTarget||0)+(target?1:0);
  const recentObservations=(wasClosed?0:prev.recentObservations||0)+1;
  const nextStatus=derivedStatus(recentPrerequisite,recentTarget,recentObservations);

  const next={
    ...prev,
    lifecycleStatus:nextStatus,
    status:nextStatus,
    supportsPrerequisite:(prev.supportsPrerequisite||0)+(prereq?1:0),
    supportsTarget:(prev.supportsTarget||0)+(target?1:0),
    observations:(prev.observations||0)+1,
    recentPrerequisite,
    recentTarget,
    recentObservations,
    lastAt:at,
    lastVerdict:eventCode,
    lastTransitionAt:nextStatus!==prev.lifecycleStatus?at:prev.lastTransitionAt,
    resolvedAt:null,
    staleAt:null,
    reopenCount:(prev.reopenCount||0)+(wasClosed?1:0),
    reopenedAt:wasClosed?at:prev.reopenedAt||null,
    history:transitionHistory(
      prev,
      nextStatus,
      at,
      wasClosed?"nova evidência contraditória/relevante reabriu a hipótese":"nova observação causal"
    )
  };
  return next;
}

function scoreReady(score,{domain=70,conf=55,minEvidence=2}={}){
  return !!score
    &&score.domain!==null
    &&score.domain>=domain
    &&(score.conf||0)>=conf
    &&(score.evidence?.length||0)>=minEvidence;
}

export function resolveHypothesisByMastery(h,{
  targetScore=null,
  prerequisiteScore=null,
  at=Date.now()
}={}){
  const prev=normalizeLearningHypothesis(h,at);
  if(!ACTIVE_STATUSES.has(prev.lifecycleStatus))return prev;

  let resolved=false;
  let reason=null;

  if(prev.lifecycleStatus===HYPOTHESIS_STATUS.probablePrerequisite){
    resolved=scoreReady(prerequisiteScore,{domain:68,conf:55,minEvidence:2})
      &&scoreReady(targetScore,{domain:60,conf:45,minEvidence:2});
    reason=resolved
      ?"A base e a competência-alvo apresentam agora evidência suficiente de recuperação."
      :null;
  }else if(prev.lifecycleStatus===HYPOTHESIS_STATUS.probableTarget){
    resolved=scoreReady(targetScore,{domain:72,conf:55,minEvidence:2});
    reason=resolved
      ?"A competência-alvo apresenta agora evidência suficiente de recuperação."
      :null;
  }else{
    resolved=scoreReady(targetScore,{domain:76,conf:60,minEvidence:2})
      &&scoreReady(prerequisiteScore,{domain:70,conf:55,minEvidence:2});
    reason=resolved
      ?"Alvo e pré-requisito estão suficientemente consolidados para fechar esta hipótese."
      :null;
  }

  if(!resolved)return prev;

  return {
    ...prev,
    lifecycleStatus:HYPOTHESIS_STATUS.resolved,
    status:HYPOTHESIS_STATUS.resolved,
    resolvedAt:at,
    resolutionReason:reason,
    lastTransitionAt:at,
    history:transitionHistory(prev,HYPOTHESIS_STATUS.resolved,at,reason)
  };
}

export function refreshHypothesisLifecycle(h,{
  targetScore=null,
  prerequisiteScore=null,
  at=Date.now()
}={}){
  const normalized=normalizeLearningHypothesis(h,at);
  if(normalized.lifecycleStatus===HYPOTHESIS_STATUS.stale)return normalized;
  return resolveHypothesisByMastery(normalized,{targetScore,prerequisiteScore,at});
}

export function hypothesisView(h,now=Date.now()){
  const x=normalizeLearningHypothesis(h,now);
  return {
    ...x,
    label:hypothesisStatusLabel(x.lifecycleStatus),
    icon:hypothesisStatusIcon(x.lifecycleStatus),
    active:hypothesisIsActive(x,now),
    investigatable:hypothesisNeedsInvestigation(x,now),
    ageDays:Math.round(ageDays(x.lastAt||x.openedAt,now)*10)/10
  };
}
