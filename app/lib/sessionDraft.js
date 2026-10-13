import {readStorageRows,removeStorageKey,writeStorageFallback} from "./browserStorage.js";

const KEY="a25-active-session-v1";
const FRIENDS_KEY="a25-friends-active-session-v1";
const MAX_AGE_MS=1000*60*60*24;
const EMPTY_DIAGNOSTIC_MAX_AGE_MS=1000*60*5;

function keyForMode(mode){return mode==="friends_beta"?FRIENDS_KEY:KEY}

export function saveSessionDraft(draft){
  const key=keyForMode(draft?.betaMode);
  if(!draft)return clearSessionDraft(draft?.betaMode||"internal");
  try{return writeStorageFallback(key,JSON.stringify({...draft,savedAt:Date.now()}))}catch{return false}
}

export function loadSessionDraftStatus(mode="internal"){
  const key=keyForMode(mode),{rows,readable}=readStorageRows(key);
  if(!readable)return {draft:null,error:true};
  const parsed=[];
  for(const [store,raw] of rows)try{
    const draft=JSON.parse(raw);
    if(draft&&typeof draft==="object")parsed.push([store,draft]);else store.removeItem(key);
  }catch{try{store.removeItem(key)}catch{}}
  if(!parsed.length)return {draft:null,error:false};
  parsed.sort((a,b)=>(b[1]?.savedAt||0)-(a[1]?.savedAt||0));
  const draft=parsed[0][1],age=Date.now()-(draft?.savedAt||0);
  const durableDiagnostic=draft?.kind==="diagnostic"&&[2,3,4].includes(draft?.version)&&((draft.responses?.length||0)>0||!!draft.pendingResponse||draft.phase==="completion_pending");
  const staleEmptyDiagnostic=draft?.kind==="diagnostic"&&!durableDiagnostic&&age>EMPTY_DIAGNOSTIC_MAX_AGE_MS;
  if(!draft?.kind||!draft.savedAt||staleEmptyDiagnostic||(!durableDiagnostic&&age>MAX_AGE_MS)){
    removeStorageKey(key);
    return {draft:null,error:false};
  }
  return {draft,error:false};
}

export function loadSessionDraft(mode="internal"){return loadSessionDraftStatus(mode).draft}
export function clearSessionDraft(mode="internal"){return removeStorageKey(keyForMode(mode))}

export function restartDiagnosticDraft(mode="internal"){
  const key=keyForMode(mode),{rows,readable}=readStorageRows(key);
  if(!readable)return {ok:false,reason:"storage_read_failed"};
  if(!rows.length)return {ok:true,cleared:false};
  const parsed=[];
  for(const [store,raw] of rows)try{parsed.push([store,JSON.parse(raw)])}catch{return {ok:false,reason:"draft_unreadable"}}
  parsed.sort((a,b)=>(b[1]?.savedAt||0)-(a[1]?.savedAt||0));
  if(parsed[0]?.[1]?.kind!=="diagnostic")return {ok:false,reason:"not_diagnostic"};
  let cleared=false;
  for(const [store,draft] of parsed){
    if(draft?.kind!=="diagnostic")continue;
    try{store.removeItem(key);cleared=true}catch{return {ok:false,reason:"storage_clear_failed"}}
  }
  return {ok:true,cleared};
}

export function draftScreen(draft){
  if(!draft)return null;
  if(draft.kind==="mission")return "mission";
  if(draft.kind==="training")return "trainingRun";
  if(draft.kind==="diagnostic")return "diagRun";
  if(draft.kind==="mini_exam")return ["miniExamIntro","miniExamRun","miniExamReview"].includes(draft.screen)?draft.screen:"miniExamRun";
  return null;
}
