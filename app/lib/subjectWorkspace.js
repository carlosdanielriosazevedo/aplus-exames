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

export const LEGACY_PORTUGUESE_SUBJECT_IDS=Object.freeze(
  Object.keys(LEGACY_SUBJECT_ALIASES).filter(id=>id!=="portuguese")
);
