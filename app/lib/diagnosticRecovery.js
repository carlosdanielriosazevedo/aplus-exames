import {DIAGNOSTIC_BLUEPRINT} from "../data/content.js";
import {applyEvidence,diagnosticAnchor,diagnosticProbe,nextDiagnosticDifficulty} from "./engine.js";
import {contentRevisionFingerprint} from "./validationFingerprint.js";

export const DIAGNOSTIC_DRAFT_VERSION=3;
export const SUPPORTED_DIAGNOSTIC_DRAFT_VERSIONS=[2,3];
export const DIAGNOSTIC_CLOCK_SKEW_MS=1000*60*10;
const integer=(x,min=0)=>Number.isInteger(x)&&x>=min;

export function snapshotDiagnosticItem(item){
  if(!item)return null;
  return {id:item.id,themeId:item.themeId,microcompetencyId:item.microcompetencyId||null,focus:item.focus||null,
    q:item.q,o:Array.isArray(item.o)?[...item.o]:[],a:item.a,sol:item.sol||"",hyp:item.hyp||"",
    cognitive:item.cognitive,difficulty:item.difficulty,signature:item.signature,role:item.role,contexts:Array.isArray(item.contexts)?[...item.contexts]:["diagnostic"],
    fingerprint:contentRevisionFingerprint(item)};
}

export function diagnosticResponseId(sessionId,ordinal,itemId,fingerprint){
  return `${sessionId}:diagnostic:${ordinal}:${itemId}:${fingerprint}`;
}

export function createDiagnosticDraft({session,item,betaMode="internal",difficulty,blueprint=DIAGNOSTIC_BLUEPRINT,now=Date.now()}){
  return {kind:"diagnostic",version:DIAGNOSTIC_DRAFT_VERSION,betaMode,session:{...session},sessionId:session.id,
    startedAt:session.startedAt||now,phase:"active",initialDifficulty:difficulty,anchorIndex:0,difficulty,
    blueprint:[...blueprint],current:snapshotDiagnosticItem(item),anchorResults:[],probeCount:0,responses:[],pendingResponse:null,
    sel:null,fb:null,completionAt:null};
}

function draftBlueprint(draft){
  return draft?.version>=3?draft.blueprint:DIAGNOSTIC_BLUEPRINT;
}

function validBlueprint(blueprint){
  return Array.isArray(blueprint)&&blueprint.length>0
    &&blueprint.every(x=>typeof x==="string"&&x)
    &&new Set(blueprint).size===blueprint.length;
}

export function recoverLegacyDiagnosticSessions({state,saveState,now=Date.now()}){
  const open=(state?.betaSessions||[]).filter(x=>x?.kind==="diagnostic"&&!x.finishedAt);
  if(!open.length)return {ok:true,state,migrated:false};
  const openIds=new Set(open.map(x=>x.id));
  if(openIds.size!==open.length||open.some(x=>typeof x.id!=="string"||!x.id))return {ok:false,reason:"ambiguous_legacy_session",state};
  const sessions=(state.betaSessions||[]).map(session=>openIds.has(session.id)
    ?{...session,finishedAt:now,durationSeconds:Math.max(1,Math.round((now-(session.startedAt||now))/1000)),
      meta:{...(session.meta||{}),recoveryStatus:"legacy_abandoned",recoveryVersion:DIAGNOSTIC_DRAFT_VERSION,abandonedAt:now}}
    :session);
  const next={...state,betaSessions:sessions};
  if(!saveState(next))return {ok:false,reason:"legacy_session_write_failed",state};
  return {ok:true,state:next,migrated:true};
}

function validSnapshot(item){
  return !!item&&typeof item.id==="string"&&typeof item.themeId==="string"&&Array.isArray(item.o)
    &&integer(item.a)&&item.a<item.o.length&&["anchor","probe"].includes(item.role)
    &&integer(item.difficulty,1)&&item.difficulty<=4&&typeof item.signature==="string"
    &&typeof item.cognitive==="string"&&item.fingerprint===contentRevisionFingerprint(item);
}

function deterministicSequence(draft){
  const blueprint=draftBlueprint(draft);
  let anchorIndex=0,difficulty=draft.initialDifficulty,probeCount=0,expectedProbe=null;
  const anchorResults=[];
  for(const row of draft.responses){
    const expectedTheme=blueprint[anchorIndex];
    const expectedRole=expectedProbe?"probe":"anchor";
    if(row.item.role!==expectedRole||row.item.themeId!==expectedTheme)return {ok:false,reason:"impossible_sequence"};
    if(expectedProbe&&(row.item.id!==expectedProbe.id||row.item.fingerprint!==expectedProbe.fingerprint))return {ok:false,reason:"probe_sequence_mismatch"};
    if(row.item.role==="anchor"){
      anchorResults.push({themeId:row.item.themeId,correct:row.correct,difficulty:row.item.difficulty});
      if(row.correct){anchorIndex++;difficulty=nextDiagnosticDifficulty(difficulty,true,false)}
      else{
        difficulty=nextDiagnosticDifficulty(difficulty,false,false);
        if(row.nextProbe){expectedProbe=row.nextProbe;probeCount++}else anchorIndex++;
      }
    }else{anchorIndex++;expectedProbe=null}
  }
  return {ok:true,anchorIndex,difficulty,probeCount,anchorResults,
    expectedRole:expectedProbe?"probe":"anchor",expectedTheme:blueprint[anchorIndex]||null,expectedProbe};
}

function validTransaction(row,draft,index,status,now){
  if(!row||row.ordinal!==index||row.status!==status||row.sessionId!==draft.sessionId||!validSnapshot(row.item))return false;
  if(!integer(row.sel)||row.sel>=row.item.o.length||typeof row.correct!=="boolean"||row.correct!==(row.sel===row.item.a))return false;
  if(row.nextProbe!==null&&row.nextProbe!==undefined&&(!validSnapshot(row.nextProbe)||row.nextProbe.role!=="probe"||row.nextProbe.themeId!==row.item.themeId))return false;
  if((row.item.role!=="anchor"||row.correct)&&row.nextProbe)return false;
  if(!Number.isFinite(row.processedAt)||row.processedAt<draft.startedAt-DIAGNOSTIC_CLOCK_SKEW_MS||row.processedAt>now+DIAGNOSTIC_CLOCK_SKEW_MS)return false;
  return row.responseId===diagnosticResponseId(draft.sessionId,index,row.item.id,row.item.fingerprint);
}

export function validateDiagnosticDraft(draft,{now=Date.now()}={}){
  if(!draft||draft.kind!=="diagnostic"||!SUPPORTED_DIAGNOSTIC_DRAFT_VERSIONS.includes(draft.version))return {ok:false,reason:"unsupported_version"};
  if(draft.version>=3&&!validBlueprint(draft.blueprint))return {ok:false,reason:"invalid_blueprint"};
  if(typeof draft.sessionId!=="string"||draft.session?.id!==draft.sessionId||draft.session?.kind!=="diagnostic")return {ok:false,reason:"invalid_session"};
  if(!Number.isFinite(draft.startedAt)||draft.startedAt>now+DIAGNOSTIC_CLOCK_SKEW_MS)return {ok:false,reason:"invalid_started_at"};
  if(draft.savedAt!==undefined&&(!Number.isFinite(draft.savedAt)||draft.savedAt>now+DIAGNOSTIC_CLOCK_SKEW_MS))return {ok:false,reason:"invalid_saved_at"};
  if(!integer(draft.initialDifficulty,1)||draft.initialDifficulty>3||!["active","completion_pending"].includes(draft.phase))return {ok:false,reason:"invalid_progress"};
  if(!Array.isArray(draft.responses)||!Array.isArray(draft.anchorResults)||!integer(draft.probeCount)||!validSnapshot(draft.current))return {ok:false,reason:"invalid_progress"};
  for(let i=0;i<draft.responses.length;i++)if(!validTransaction(draft.responses[i],draft,i,"processed",now))return {ok:false,reason:"invalid_response"};
  const sequence=deterministicSequence(draft);
  if(!sequence.ok)return sequence;
  if(draft.anchorIndex!==sequence.anchorIndex||draft.difficulty!==sequence.difficulty||draft.probeCount!==sequence.probeCount||JSON.stringify(draft.anchorResults)!==JSON.stringify(sequence.anchorResults))return {ok:false,reason:"derived_progress_mismatch"};
  if(draft.phase!=="completion_pending"&&sequence.expectedTheme&&draft.current.themeId!==sequence.expectedTheme)return {ok:false,reason:"wrong_theme"};
  if(draft.phase!=="completion_pending"&&draft.current.role!==sequence.expectedRole)return {ok:false,reason:"wrong_role"};
  if(draft.phase!=="completion_pending"&&sequence.expectedProbe&&(draft.current.id!==sequence.expectedProbe.id||draft.current.fingerprint!==sequence.expectedProbe.fingerprint))return {ok:false,reason:"wrong_probe"};
  if(draft.sel!==null&&(!integer(draft.sel)||draft.sel>=draft.current.o.length))return {ok:false,reason:"invalid_selection"};
  if(draft.fb!==null&&(!draft.fb||typeof draft.fb.correct!=="boolean"||draft.sel===null||draft.fb.correct!==(draft.sel===draft.current.a)))return {ok:false,reason:"invalid_feedback"};
  if(draft.pendingResponse&&(!validTransaction(draft.pendingResponse,draft,draft.responses.length,"pending",now)||draft.pendingResponse.item.id!==draft.current.id||draft.pendingResponse.item.fingerprint!==draft.current.fingerprint))return {ok:false,reason:"invalid_pending"};
  const done=draft.anchorResults.length,successRate=done?draft.anchorResults.filter(x=>x.correct).length/done:0;
  const blueprint=draftBlueprint(draft);
  const canComplete=(done>=Math.min(5,blueprint.length)&&successRate>=.80&&draft.probeCount===0)
    ||(done>=blueprint.length&&!sequence.expectedProbe);
  if(draft.phase==="completion_pending"&&(!canComplete||draft.pendingResponse))return {ok:false,reason:"invalid_completion"};
  if(draft.phase==="active"&&canComplete&&!draft.pendingResponse)return {ok:false,reason:"completion_not_marked"};
  return {ok:true,sequence};
}

function responseEvidence(state,responseId){
  const rows=[];
  Object.values(state?.scores||{}).forEach(score=>(score?.evidence||[]).forEach(e=>{if(e.responseId===responseId)rows.push(e)}));
  return rows;
}

export function applyDiagnosticTransaction(state,tx){
  const matches=responseEvidence(state,tx.responseId);
  if(matches.length){
    const same=matches.length===1&&matches[0].itemId===tx.item.id&&matches[0].contentFingerprint===tx.item.fingerprint
      &&matches[0].sessionId===tx.sessionId&&matches[0].correct===tx.correct
      &&matches[0].difficulty===tx.item.difficulty&&matches[0].signature===tx.item.signature;
    return same?{ok:true,state,alreadyApplied:true}:{ok:false,reason:"response_id_collision",state};
  }
  const next={...state,scores:{...state.scores},diagnosticAnswers:Math.max(state.diagnosticAnswers||0,tx.ordinal+1)};
  next.scores[tx.item.themeId]=applyEvidence(next.scores[tx.item.themeId],tx.item,tx.correct,"diagnostic",1,
    {responseId:tx.responseId,sessionId:tx.sessionId,contentFingerprint:tx.item.fingerprint,at:tx.processedAt});
  return {ok:true,state:next,alreadyApplied:false};
}

export function createPendingResponse(draft,sel,{state=null,now=Date.now()}={}){
  if(draft.pendingResponse)return draft.pendingResponse;
  const ordinal=draft.responses.length,item=draft.current;
  const correct=sel===item.a;
  const nextProbe=item.role==="anchor"&&!correct?snapshotDiagnosticItem(diagnosticProbe(item.themeId,state)):null;
  return {status:"pending",sessionId:draft.sessionId,ordinal,item,sel,correct,nextProbe,processedAt:now,
    responseId:diagnosticResponseId(draft.sessionId,ordinal,item.id,item.fingerprint)};
}

export function advanceDiagnosticDraft(draft,state,tx){
  const responses=[...draft.responses,{...tx,status:"processed"}];
  const anchorResults=[...draft.anchorResults];
  if(tx.item.role==="anchor")anchorResults.push({themeId:tx.item.themeId,correct:tx.correct,difficulty:tx.item.difficulty});
  if(tx.item.role==="anchor"&&!tx.correct){
    const item=tx.nextProbe;
    if(item)return {...draft,responses,pendingResponse:null,anchorResults,difficulty:nextDiagnosticDifficulty(draft.difficulty,false,false),probeCount:draft.probeCount+1,current:snapshotDiagnosticItem(item),sel:null,fb:null};
  }
  const done=anchorResults.length,successRate=done?anchorResults.filter(x=>x.correct).length/done:0;
  const blueprint=draftBlueprint(draft);
  const enoughEarly=done>=Math.min(5,blueprint.length)&&successRate>=.80&&draft.probeCount===0;
  const enoughNormal=done>=blueprint.length;
  if(enoughEarly||enoughNormal){
    const finalIndex=draft.anchorIndex+1;
    const finalDifficulty=tx.item.role==="anchor"?nextDiagnosticDifficulty(draft.difficulty,tx.correct,false):draft.difficulty;
    return {...draft,phase:"completion_pending",responses,pendingResponse:null,anchorResults,anchorIndex:finalIndex,difficulty:finalDifficulty,sel:null,fb:null,completionAt:tx.processedAt};
  }
  let item,anchorIndex=draft.anchorIndex,difficulty=draft.difficulty,probeCount=draft.probeCount;
  anchorIndex++;if(tx.item.role==="anchor")difficulty=nextDiagnosticDifficulty(difficulty,tx.correct,false);
  item=diagnosticAnchor(blueprint[anchorIndex],difficulty,state);
  if(!item)return {error:"missing_next_item"};
  return {...draft,responses,pendingResponse:null,anchorResults,anchorIndex,difficulty,probeCount,current:snapshotDiagnosticItem(item),sel:null,fb:null};
}

export function transactDiagnosticAnswer({state,draft,sel,saveDraft,saveState,now=Date.now()}){
  const valid=validateDiagnosticDraft(draft,{now});
  if(!valid.ok)return {ok:false,stage:"validate",reason:valid.reason,state,draft};
  if(draft.pendingResponse)return {ok:false,stage:"pending",reason:"pending_exists",state,draft};
  const tx=createPendingResponse(draft,sel,{state,now});
  const pendingDraft={...draft,pendingResponse:tx,sel:tx.sel,fb:{correct:tx.correct}};
  if(!saveDraft(pendingDraft))return {ok:false,stage:"pending",reason:"draft_write_failed",state,draft};
  const applied=applyDiagnosticTransaction(state,tx);
  if(!applied.ok)return {ok:false,stage:"apply",reason:applied.reason,state,draft:pendingDraft};
  if(!saveState(applied.state))return {ok:false,stage:"state",reason:"state_write_failed",state,draft:pendingDraft};
  const advanced=advanceDiagnosticDraft(pendingDraft,applied.state,tx);
  if(advanced.error)return {ok:false,stage:"advance",reason:advanced.error,state:applied.state,draft:pendingDraft};
  if(!saveDraft(advanced))return {ok:false,stage:"advance",reason:"draft_advance_failed",state:applied.state,draft:pendingDraft};
  return {ok:true,state:applied.state,draft:advanced,completed:advanced.phase==="completion_pending"};
}

export function recoverDiagnosticTransaction({state,draft,saveState,saveDraft,clearDraft,startState,completeState,now=Date.now()}){
  if(state?.diagnosticDone&&(state.betaSessions||[]).some(x=>x.id===draft?.sessionId&&x.kind==="diagnostic"&&x.finishedAt)){
    clearDraft();return {ok:true,state,draft:null,completed:true};
  }
  const valid=validateDiagnosticDraft(draft,{now});
  if(!valid.ok)return {ok:false,reason:valid.reason,state,draft};
  const matching=(state.betaSessions||[]).filter(x=>x.id===draft.sessionId&&x.kind==="diagnostic"&&!x.finishedAt);
  const other=(state.betaSessions||[]).filter(x=>x.kind==="diagnostic"&&!x.finishedAt&&x.id!==draft.sessionId);
  let nextState=state;
  if(!matching.length&&!other.length){
    const started=startState(state,draft);
    if(!started.ok)return {ok:false,reason:started.reason,state,draft};
    nextState=started.state;
    if(!saveState(nextState))return {ok:false,reason:"start_state_write_failed",state,draft};
  }else if(matching.length!==1||other.length)return {ok:false,reason:"ambiguous_session",state,draft};
  if(!draft.pendingResponse&&draft.phase==="active"&&!valid.sequence.expectedProbe){
    const live=draft.current.role==="probe"?diagnosticProbe(draft.current.themeId,nextState):diagnosticAnchor(draft.current.themeId,draft.difficulty,nextState);
    if(!live)return {ok:false,reason:"current_item_unavailable",state:nextState,draft};
    const liveSnapshot=snapshotDiagnosticItem(live);
    if(liveSnapshot.fingerprint!==draft.current.fingerprint){
      draft={...draft,current:liveSnapshot,sel:null,fb:null};
      if(!saveDraft(draft))return {ok:false,reason:"presentation_refresh_write_failed",state:nextState,draft};
    }
  }
  for(const tx of draft.responses){const a=applyDiagnosticTransaction(nextState,tx);if(!a.ok)return {ok:false,reason:a.reason,state:nextState,draft};nextState=a.state}
  const known=new Set([...draft.responses,...(draft.pendingResponse?[draft.pendingResponse]:[])].map(x=>x.responseId));
  const unknown=[];
  Object.values(nextState.scores||{}).forEach(score=>(score?.evidence||[]).forEach(e=>{if(e.sessionId===draft.sessionId&&e.responseId&&!known.has(e.responseId))unknown.push(e.responseId)}));
  if(unknown.length)return {ok:false,reason:"state_ahead_without_wal",state:nextState,draft};
  if(draft.pendingResponse){
    const a=applyDiagnosticTransaction(nextState,draft.pendingResponse);if(!a.ok)return {ok:false,reason:a.reason,state:nextState,draft};
    nextState=a.state;if(!saveState(nextState))return {ok:false,reason:"pending_state_write_failed",state,draft};
    const advanced=advanceDiagnosticDraft(draft,nextState,draft.pendingResponse);
    if(advanced.error||!saveDraft(advanced))return {ok:false,reason:advanced.error||"pending_advance_failed",state:nextState,draft};
    draft=advanced;
  }else if(!saveState(nextState))return {ok:false,reason:"reconciled_state_write_failed",state,draft};
  if(draft.phase==="completion_pending"){
    const final=completeState(nextState,draft);if(!final.ok)return {ok:false,reason:final.reason,state:nextState,draft};
    if(!saveState(final.state))return {ok:false,reason:"completion_state_write_failed",state:nextState,draft};
    clearDraft();return {ok:true,state:final.state,draft:null,completed:true};
  }
  return {ok:true,state:nextState,draft,completed:false};
}
