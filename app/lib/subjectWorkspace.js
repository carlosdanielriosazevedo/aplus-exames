const LEGACY_SUBJECT_ALIASES={
  portuguese:"portuguese",
  portugueseLab:"portuguese",
  "portuguese-lab":"portuguese",
  portuguese_lab:"portuguese",
  portuguesePilot:"portuguese",
  "portuguese-pilot":"portuguese",
  portuguese_pilot:"portuguese",
  "portuguese-639":"portuguese",
  "pt-639-pilot":"portuguese",
  pt639:"portuguese"
};

export function canonicalSubjectId(id){
  return LEGACY_SUBJECT_ALIASES[id]||id;
}

export function uniqueSubjectIds(ids=[],availableIds=[]){
  const available=new Set(availableIds);
  return [...new Set(ids.map(canonicalSubjectId))].filter(id=>available.has(id));
}

export function normalizeSubjectWorkspaceState(state,availableIds=[],defaultSubjectId="math-a"){
  const selected=uniqueSubjectIds(state?.selectedSubjectIds||[],availableIds);
  const requested=canonicalSubjectId(state?.activeSubjectId);
  if(availableIds.includes(requested)&&!selected.includes(requested))selected.push(requested);
  if(!selected.length)selected.push(defaultSubjectId);
  const active=selected.includes(requested)?requested:selected[0];
  return {...state,selectedSubjectIds:selected,activeSubjectId:active};
}

export function subjectOnboardingStep(state,currentSubjectId){
  const queue=Array.isArray(state?.onboardingSubjectIds)&&state.onboardingSubjectIds.length
    ?state.onboardingSubjectIds
    :state?.selectedSubjectIds||[];
  const ids=[...new Set(queue.map(canonicalSubjectId))];
  const current=canonicalSubjectId(currentSubjectId);
  const index=Math.max(0,ids.indexOf(current));
  return {
    ids,
    index,
    position:ids.length?index+1:0,
    total:ids.length,
    firstId:canonicalSubjectId(state?.onboardingReturnSubjectId)||ids[0]||current||null,
    nextId:ids[index+1]||null
  };
}

export function activateSubjectState(state,subjectId){
  const id=canonicalSubjectId(subjectId);
  const settings=state?.subjectSettings?.[id];
  const hasProfile=settings?.profileConfigured===true;
  return {
    ...state,
    activeSubjectId:id,
    profile:hasProfile?{
      ...(state.profile||{}),
      recentGrade:settings.recentGrade??"",
      examTiming:settings.examTiming||"unsure"
    }:state.profile
  };
}

export function finishSubjectOnboardingState(state,returnSubjectId){
  const activated=activateSubjectState(state,returnSubjectId);
  return {...activated,onboardingSubjectIds:[],onboardingReturnSubjectId:null,subjectOnboardingMode:null};
}

export const LEGACY_PORTUGUESE_SUBJECT_IDS=Object.freeze(
  Object.keys(LEGACY_SUBJECT_ALIASES).filter(id=>id!=="portuguese")
);
