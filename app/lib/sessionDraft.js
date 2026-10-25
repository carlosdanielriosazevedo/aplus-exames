import {readStorageRows,removeStorageKey,writeStorageFallback} from "./browserStorage.js";

const KEY="a25-active-session-v1";
const FRIENDS_KEY="a25-friends-active-session-v1";

function keyForMode(mode){return mode==="friends_beta"?FRIENDS_KEY:KEY}

export function saveSessionDraft(draft){
  const key=keyForMode(draft?.betaMode);
  if(!draft)return clearSessionDraft(draft?.betaMode||"internal");
  const pending=loadSessionDraftStatus(draft.betaMode);
  if(pending.error)return false;
  if(pending.draft){
    const old=pending.draft;
    if(old.kind!==draft.kind||(old.sessionId||old.session?.sessionId)!==(draft.sessionId||draft.session?.sessionId))return false;
  }
  try{return writeStorageFallback(key,JSON.stringify({...draft,savedAt:Date.now()}))}catch{return false}
}

export function loadSessionDraftStatus(mode="internal"){
  const key=keyForMode(mode),{rows,readable}=readStorageRows(key);
  if(!readable)return {draft:null,error:true};
  const parsed=[];
  for(const [,raw] of rows)try{
    const draft=JSON.parse(raw);
    if(!draft||typeof draft!=="object"||!draft.kind)return {draft:null,error:true};
    parsed.push(draft);
  }catch{return {draft:null,error:true}}
  if(!parsed.length)return {draft:null,error:false};
  parsed.sort((a,b)=>(b.savedAt||0)-(a.savedAt||0));
  const draft=parsed[0];
  return {draft,error:false};
}

export function loadSessionDraft(mode="internal"){return loadSessionDraftStatus(mode).draft}
export function clearSessionDraft(mode="internal"){return removeStorageKey(keyForMode(mode))}

// Kept as a fail-closed compatibility API; recovery never discards an attempt.
export function restartDiagnosticDraft(){return {ok:false,reason:"pending_attempt_preserved"}}

export function draftScreen(draft){
  if(!draft)return null;
  if(draft.kind==="mission")return "mission";
  if(draft.kind==="training")return "trainingRun";
  if(draft.kind==="diagnostic")return "diagRun";
  if(draft.kind==="mini_exam")return ["miniExamIntro","miniExamRun","miniExamReview"].includes(draft.screen)?draft.screen:"miniExamRun";
  return null;
}
