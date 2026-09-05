const KEY="a25-active-session-v1";
const FRIENDS_KEY="a25-friends-active-session-v1";
const MAX_AGE_MS=1000*60*60*24;

function keyForMode(mode){
  return mode==="friends_beta"?FRIENDS_KEY:KEY;
}

export function saveSessionDraft(draft){
  try{
    const key=keyForMode(draft?.betaMode);
    if(!draft){localStorage.removeItem(key);return true}
    localStorage.setItem(key,JSON.stringify({...draft,savedAt:Date.now()}));
    return true;
  }catch{return false}
}

export function loadSessionDraftStatus(mode="internal"){
  const key=keyForMode(mode);
  let raw;
  try{
    raw=localStorage.getItem(key);
  }catch{return {draft:null,error:true}}
  if(!raw)return {draft:null,error:false};
  try{
    const draft=JSON.parse(raw);
    const durableDiagnostic=draft?.kind==="diagnostic"&&[2,3].includes(draft?.version)
      &&((draft.responses?.length||0)>0||!!draft.pendingResponse||draft.phase==="completion_pending");
    if(!draft?.kind || !draft.savedAt || (!durableDiagnostic&&Date.now()-draft.savedAt>MAX_AGE_MS)){
      localStorage.removeItem(key);
      return {draft:null,error:false};
    }
    return {draft,error:false};
  }catch{
    try{localStorage.removeItem(key)}catch{}
    return {draft:null,error:false};
  }
}

export function loadSessionDraft(mode="internal"){
  return loadSessionDraftStatus(mode).draft;
}

export function clearSessionDraft(mode="internal"){
  try{localStorage.removeItem(keyForMode(mode));return true}catch{return false}
}

export function draftScreen(draft){
  if(!draft)return null;
  if(draft.kind==="mission")return "mission";
  if(draft.kind==="training")return "trainingRun";
  if(draft.kind==="diagnostic")return "diagRun";
  if(draft.kind==="mini_exam"){
    return ["miniExamIntro","miniExamRun","miniExamReview"].includes(draft.screen)
      ?draft.screen
      :"miniExamRun";
  }
  return null;
}
