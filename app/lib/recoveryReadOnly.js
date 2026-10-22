// Isolated, opt-in recovery inventory. Does not import app loaders, mutate stores,
// transmit drafts, or automatically run inside the application.
const EXACT_KEYS=Object.freeze(["a25-active-session-v1","a25-friends-active-session-v1"]);
const FQA_IDS=Object.freeze(["fqa-mini-1","fqa-mini-2","fqa-full-715"]);
export const RECOVERY_KEYS=Object.freeze([...EXACT_KEYS,...FQA_IDS.map(id=>"applus:fqa-exam-draft:v1:"+id)]);

// Inject stores instead of reading global browser storage: prevents accidental execution
// during hydration, SSR, application startup or a production request.
export function inspectRecoveryEntries(stores){
  if(!Array.isArray(stores))throw new TypeError("Expected explicit storage sources");
  const entries=[],failures=[];
  for(const source of stores){
    if(!source||typeof source.label!=="string"||typeof source.getItem!=="function")throw new TypeError("Invalid storage source");
    for(const key of RECOVERY_KEYS){
      try{
        const raw=source.getItem(key);
        if(raw!==null&&raw!==undefined)entries.push({source:source.label,key,raw:String(raw)});
      }catch{failures.push({source:source.label,key,reason:"unreadable"});}
    }
  }
  return {entries,failures,complete:failures.length===0};
}
// This inventory deliberately has NO restore/write/delete or network implementation.
// Callers must not export raw values to telemetry or send them to support.
