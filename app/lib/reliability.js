
const COMPLETED_KEY="a25-completed-sessions-v1";
const MAX_COMPLETED=120;

function readCompleted(){
  try{
    const raw=localStorage.getItem(COMPLETED_KEY);
    const rows=raw?JSON.parse(raw):[];
    return Array.isArray(rows)?rows:[];
  }catch{return []}
}

function writeCompleted(rows){
  try{
    localStorage.setItem(COMPLETED_KEY,JSON.stringify(rows.slice(-MAX_COMPLETED)));
    return true;
  }catch{return false}
}

export function claimSessionCompletion(sessionId){
  // Sem ID não tentamos inventar idempotência: mantemos compatibilidade com sessões antigas.
  if(!sessionId)return true;
  const rows=readCompleted();
  if(rows.some(x=>x.id===sessionId))return false;
  rows.push({id:sessionId,at:Date.now()});
  writeCompleted(rows);
  return true;
}

export function releaseSessionCompletion(sessionId){
  if(!sessionId)return;
  writeCompleted(readCompleted().filter(x=>x.id!==sessionId));
}

export function wasSessionCompleted(sessionId){
  if(!sessionId)return false;
  return readCompleted().some(x=>x.id===sessionId);
}

export function clearCompletionRegistry(){
  try{localStorage.removeItem(COMPLETED_KEY)}catch{}
}

export function latestOpenSessionId(state,kind){
  const rows=[...(state?.betaSessions||[])];
  for(let i=rows.length-1;i>=0;i--){
    if(rows[i]?.kind===kind && !rows[i]?.finishedAt)return rows[i].id||null;
  }
  return null;
}

function duplicateValues(rows,getKey){
  const seen=new Set(),dups=new Set();
  rows.forEach(x=>{
    const k=getKey(x);
    if(!k)return;
    if(seen.has(k))dups.add(k);
    seen.add(k);
  });
  return [...dups];
}

export function dataIntegrityAudit(state){
  const sessions=state?.betaSessions||[];
  const events=state?.betaEvents||[];
  const missions=state?.missionHistory||[];
  const exams=state?.examHistory||[];

  const duplicateSessionIds=duplicateValues(sessions,x=>x.id);
  const duplicateEventIds=duplicateValues(events,x=>x.id);
  const duplicateMissionCompletionIds=duplicateValues(missions,x=>x.completionId);
  const duplicateExamCompletionIds=duplicateValues(exams,x=>x.completionId);

  const openByKind=sessions.filter(x=>!x.finishedAt).reduce((a,x)=>{
    a[x.kind]=(a[x.kind]||0)+1;return a;
  },{});
  const multipleOpen=Object.entries(openByKind).filter(([,n])=>n>1);

  const finishEvents=events.filter(e=>e.type?.endsWith("_finished"));
  const startEvents=events.filter(e=>e.type?.endsWith("_started"));
  const impossibleCompletionRate=finishEvents.length>startEvents.length;

  const issues=[];
  if(duplicateSessionIds.length)issues.push({code:"duplicate_sessions",severity:"high",title:"IDs de sessão duplicados",detail:`${duplicateSessionIds.length} IDs repetidos.`});
  if(duplicateEventIds.length)issues.push({code:"duplicate_events",severity:"high",title:"Eventos duplicados",detail:`${duplicateEventIds.length} IDs repetidos.`});
  if(duplicateMissionCompletionIds.length)issues.push({code:"duplicate_mission_completion",severity:"high",title:"Missões contabilizadas mais do que uma vez",detail:`${duplicateMissionCompletionIds.length} conclusões repetidas.`});
  if(duplicateExamCompletionIds.length)issues.push({code:"duplicate_exam_completion",severity:"high",title:"Mini-exames contabilizados mais do que uma vez",detail:`${duplicateExamCompletionIds.length} conclusões repetidas.`});
  if(multipleOpen.length)issues.push({code:"multiple_open",severity:"medium",title:"Sessões abertas em paralelo",detail:multipleOpen.map(([k,n])=>`${k}: ${n}`).join(" · ")});
  if(impossibleCompletionRate)issues.push({code:"finish_without_start",severity:"medium",title:"Mais conclusões do que inícios",detail:"A telemetria tem mais eventos de fim do que de início."});

  return {
    status:issues.some(x=>x.severity==="high")?"attention":issues.length?"watch":"healthy",
    duplicateSessionIds:duplicateSessionIds.length,
    duplicateEventIds:duplicateEventIds.length,
    duplicateCompletions:duplicateMissionCompletionIds.length+duplicateExamCompletionIds.length,
    openSessions:sessions.filter(x=>!x.finishedAt).length,
    issues
  };
}
