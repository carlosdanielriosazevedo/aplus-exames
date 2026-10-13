const KEY="a25-active-session-v1";
const FRIENDS_KEY="a25-friends-active-session-v1";
const MAX_AGE_MS=1000*60*60*24;
const EMPTY_DIAGNOSTIC_MAX_AGE_MS=1000*60*5;

function keyForMode(mode){
  return mode==="friends_beta"?FRIENDS_KEY:KEY;
}

function browserStorage(name){
  try{return globalThis?.[name]||null}catch{return null}
}

function storageRows(key){
  const rows=[];
  let readable=false;
  for(const name of ["localStorage","sessionStorage"]){
    const store=browserStorage(name);
    if(!store)continue;
    try{
      const raw=store.getItem(key);
      readable=true;
      if(raw)rows.push({name,store,raw});
    }catch{}
  }
  return {rows,readable};
}

function removeFromStores(key,predicate=()=>true){
  let available=false,ok=true;
  for(const name of ["localStorage","sessionStorage"]){
    const store=browserStorage(name);
    if(!store)continue;
    available=true;
    try{
      const raw=store.getItem(key);
      if(!raw||predicate(raw))store.removeItem(key);
    }catch{ok=false}
  }
  return available&&ok;
}

export function saveSessionDraft(draft){
  const key=keyForMode(draft?.betaMode);
  if(!draft)return clearSessionDraft(draft?.betaMode||"internal");
  const payload=JSON.stringify({...draft,savedAt:Date.now()});
  const local=browserStorage("localStorage");
  if(local){
    try{
      local.setItem(key,payload);
      const fallback=browserStorage("sessionStorage");
      try{fallback?.removeItem(key)}catch{}
      return true;
    }catch{}
  }
  const fallback=browserStorage("sessionStorage");
  if(fallback){
    try{fallback.setItem(key,payload);return true}catch{}
  }
  return false;
}

export function loadSessionDraftStatus(mode="internal"){
  const key=keyForMode(mode);
  const {rows,readable}=storageRows(key);
  if(!readable)return {draft:null,error:true};
  if(!rows.length)return {draft:null,error:false};

  const parsed=[];
  for(const row of rows){
    try{
      const draft=JSON.parse(row.raw);
      if(draft&&typeof draft==="object")parsed.push({...row,draft});
      else row.store.removeItem(key);
    }catch{
      try{row.store.removeItem(key)}catch{}
    }
  }
  if(!parsed.length)return {draft:null,error:false};

  parsed.sort((a,b)=>(b.draft?.savedAt||0)-(a.draft?.savedAt||0));
  const draft=parsed[0].draft;
  const age=Date.now()-(draft?.savedAt||0);
  const durableDiagnostic=draft?.kind==="diagnostic"&&[2,3,4].includes(draft?.version)
    &&((draft.responses?.length||0)>0||!!draft.pendingResponse||draft.phase==="completion_pending");
  const staleEmptyDiagnostic=draft?.kind==="diagnostic"&&!durableDiagnostic&&age>EMPTY_DIAGNOSTIC_MAX_AGE_MS;
  if(!draft?.kind || !draft.savedAt || staleEmptyDiagnostic || (!durableDiagnostic&&age>MAX_AGE_MS)){
    removeFromStores(key);
    return {draft:null,error:false};
  }
  return {draft,error:false};
}

export function loadSessionDraft(mode="internal"){
  return loadSessionDraftStatus(mode).draft;
}

export function clearSessionDraft(mode="internal"){
  const key=keyForMode(mode);
  let available=false,cleared=false;
  for(const name of ["localStorage","sessionStorage"]){
    const store=browserStorage(name);
    if(!store)continue;
    available=true;
    try{store.removeItem(key);cleared=true}catch{}
  }
  return available&&cleared;
}

export function restartDiagnosticDraft(mode="internal"){
  const key=keyForMode(mode);
  const {rows,readable}=storageRows(key);
  if(!readable)return {ok:false,reason:"storage_read_failed"};
  if(!rows.length)return {ok:true,cleared:false};

  const parsed=[];
  for(const row of rows){
    try{parsed.push({...row,draft:JSON.parse(row.raw)})}
    catch{return {ok:false,reason:"draft_unreadable"}}
  }
  parsed.sort((a,b)=>(b.draft?.savedAt||0)-(a.draft?.savedAt||0));
  if(parsed[0]?.draft?.kind!=="diagnostic")return {ok:false,reason:"not_diagnostic"};

  let cleared=false;
  for(const row of parsed){
    if(row.draft?.kind!=="diagnostic")continue;
    try{row.store.removeItem(key);cleared=true}catch{return {ok:false,reason:"storage_clear_failed"}}
  }
  return {ok:true,cleared};
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
