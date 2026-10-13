export function reconcileDiagnosticRuntimeSessions(state,activeSessionId=null){
  let keptCurrent=false,changed=false;
  const sessions=(state?.betaSessions||[]).filter(session=>{
    if(session?.kind!=="diagnostic"||session.finishedAt)return true;
    if(activeSessionId&&session.id===activeSessionId&&!keptCurrent){keptCurrent=true;return true}
    changed=true;
    return false;
  });
  return changed?{...state,betaSessions:sessions}:state;
}
