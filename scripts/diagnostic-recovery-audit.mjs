import assert from "node:assert/strict";
import {DIAGNOSTIC_BLUEPRINT,QUESTION_BANK} from "../app/data/content.js";
import {emptyScores,diagnosticAnchor,diagnosticProbe,applyEvidence} from "../app/lib/engine.js";
import {recordMilestone,normalizeProductAnalytics} from "../app/lib/productAnalytics.js";
import {saveSessionDraft,loadSessionDraft,loadSessionDraftStatus,clearSessionDraft,draftScreen} from "../app/lib/sessionDraft.js";
import {contentRevisionFingerprint} from "../app/lib/validationFingerprint.js";
import {loadLocalStateStatus} from "../app/lib/persistence.js";
import {
  createDiagnosticDraft,createPendingResponse,validateDiagnosticDraft,applyDiagnosticTransaction,
  advanceDiagnosticDraft,transactDiagnosticAnswer,recoverDiagnosticTransaction,snapshotDiagnosticItem,
  recoverLegacyDiagnosticSessions
} from "../app/lib/diagnosticRecovery.js";

const NOW=Date.now();
const memory=new Map();
let failGet=false,failSet=false,failRemove=false;
global.localStorage={
  getItem:key=>{if(failGet)throw Error("get");return memory.get(key)??null},
  setItem:(key,value)=>{if(failSet)throw Error("set");memory.set(key,String(value))},
  removeItem:key=>{if(failRemove)throw Error("remove");memory.delete(key)}
};

const analytics=()=>({version:1,firstSeenAt:null,firstSeenDay:null,lastSeenAt:null,activeDays:[],appOpenCount:0,milestones:{},events:[]});
const stateFor=(id="ses-wal")=>({goal:17,profile:{schoolYear:"12.º",recentGrade:"",syllabus:"most",examTiming:"thisYear"},
  betaMode:"internal",editorialOverrides:{},scores:emptyScores(),diagnosticAnswers:0,diagnosticDone:false,
  betaSessions:[{id,kind:"diagnostic",startedAt:NOW-1000,finishedAt:null,meta:{}}],betaEvents:[],productAnalytics:analytics()});
const draftFor=(state,id=state.betaSessions[0].id)=>createDiagnosticDraft({
  session:state.betaSessions.find(x=>x.id===id),item:diagnosticAnchor(DIAGNOSTIC_BLUEPRINT[0],2,state),difficulty:2,now:NOW
});
const writes=({failDraftAt=[],failStateAt=[]}={})=>{
  let dc=0,sc=0,storedDraft=null,storedState=null,clears=0;
  return {
    saveDraft:d=>{dc++;if(failDraftAt.includes(dc))return false;storedDraft=structuredClone(d);return true},
    saveState:s=>{sc++;if(failStateAt.includes(sc))return false;storedState=structuredClone(s);return true},
    clearDraft:()=>{clears++;storedDraft=null;return true},
    get draft(){return storedDraft},get state(){return storedState},get clears(){return clears}
  };
};
const startState=(state,draft)=>{
  const existing=(state.betaSessions||[]).filter(x=>x.id===draft.sessionId&&x.kind==="diagnostic");
  const other=(state.betaSessions||[]).filter(x=>x.kind==="diagnostic"&&!x.finishedAt&&x.id!==draft.sessionId);
  if(other.length||existing.length>1)return {ok:false,reason:"ambiguous_session"};
  if(existing.length)return {ok:true,state};
  let next={...state,betaSessions:[...(state.betaSessions||[]),draft.session]};
  next=recordMilestone(next,"diagnostic_started",{sessionId:draft.sessionId},{at:NOW});
  return {ok:true,state:next};
};
const completeState=(state,draft)=>{
  if(state.diagnosticDone&&state.betaSessions.some(x=>x.id===draft.sessionId&&x.finishedAt))return {ok:true,state};
  const matches=state.betaSessions.map((x,index)=>({x,index})).filter(r=>r.x.id===draft.sessionId&&r.x.kind==="diagnostic"&&!r.x.finishedAt);
  const other=state.betaSessions.filter(x=>x.kind==="diagnostic"&&!x.finishedAt&&x.id!==draft.sessionId);
  if(matches.length!==1||other.length)return {ok:false,reason:"ambiguous_session"};
  const sessions=[...state.betaSessions];sessions[matches[0].index]={...sessions[matches[0].index],finishedAt:draft.completionAt||NOW};
  return {ok:true,state:recordMilestone({...state,diagnosticDone:true,betaSessions:sessions},"diagnostic_completed",{sessionId:draft.sessionId},{at:draft.completionAt||NOW})};
};
const recover=(state,draft,w=writes())=>recoverDiagnosticTransaction({state,draft,saveState:w.saveState,saveDraft:w.saveDraft,
  clearDraft:w.clearDraft,startState,completeState,now:NOW});

// 1. Sincronizado e idempotente.
let state=stateFor(),draft=draftFor(state),w=writes();
let tx=transactDiagnosticAnswer({state,draft,sel:draft.current.a,saveDraft:w.saveDraft,saveState:w.saveState,now:NOW});
assert.equal(tx.ok,true);state=tx.state;draft=tx.draft;
let synced=recover(state,draft);
assert.equal(synced.ok,true);assert.equal(synced.state.scores[DIAGNOSTIC_BLUEPRINT[0]].evidence.length,1);

// 2. Draft à frente do state: respostas processed são WAL suficiente.
let behind=recover(stateFor(),draft);
assert.equal(behind.ok,true);assert.equal(behind.state.diagnosticAnswers,1);

// 3/4. State à frente do avanço do draft e crash em cada fronteira.
let base=stateFor("ses-boundaries"),initial=draftFor(base),pending=createPendingResponse(initial,0,{state:base,now:NOW});
let pendingDraft={...initial,pendingResponse:pending,sel:0,fb:{correct:pending.correct}};
let applied=applyDiagnosticTransaction(base,pending);assert.equal(applied.ok,true);
let resumed=recover(applied.state,pendingDraft);assert.equal(resumed.ok,true);assert.equal(resumed.draft.pendingResponse,null);
const conflicting={...pending,sel:pending.correct?(pending.sel+1)%pending.item.o.length:pending.item.a,correct:!pending.correct};
assert.equal(applyDiagnosticTransaction(applied.state,conflicting).reason,"response_id_collision");

let failed=transactDiagnosticAnswer({state:base,draft:initial,sel:0,saveDraft:()=>false,saveState:()=>true,now:NOW});
assert.equal(failed.stage,"pending");assert.equal(base.diagnosticAnswers,0);
w=writes({failStateAt:[1]});failed=transactDiagnosticAnswer({state:base,draft:initial,sel:0,saveDraft:w.saveDraft,saveState:w.saveState,now:NOW});
assert.equal(failed.stage,"state");assert.ok(w.draft.pendingResponse);assert.equal(base.diagnosticAnswers,0);
w=writes({failDraftAt:[2]});failed=transactDiagnosticAnswer({state:base,draft:initial,sel:0,saveDraft:w.saveDraft,saveState:w.saveState,now:NOW});
assert.equal(failed.stage,"advance");assert.ok(w.draft.pendingResponse);assert.equal(w.state.diagnosticAnswers,1);
resumed=recover(w.state,w.draft);assert.equal(resumed.ok,true);assert.equal(resumed.state.diagnosticAnswers,1);

// 5/6. Pending canónico bloqueia nova resposta e mantém percurso original.
failed=transactDiagnosticAnswer({state:applied.state,draft:pendingDraft,sel:pending.correct?1:0,saveDraft:()=>true,saveState:()=>true,now:NOW});
assert.equal(failed.reason,"pending_exists");
resumed=recover(applied.state,pendingDraft);assert.equal(resumed.draft.anchorResults[0].correct,pending.correct);

// 7-10. Percursos reais: correta -> anchor; errada -> probe; probe correta/incorreta; sequência longa.
const step=(s,d,sel)=>{const io=writes();const r=transactDiagnosticAnswer({state:s,draft:d,sel,saveDraft:io.saveDraft,saveState:io.saveState,now:NOW});assert.equal(r.ok,true);return r};
base=stateFor("ses-path");initial=draftFor(base);
let r=step(base,initial,initial.current.a);assert.equal(r.draft.current.role,"anchor");assert.equal(r.draft.anchorIndex,1);
base=stateFor("ses-probe");initial=draftFor(base);r=step(base,initial,(initial.current.a+1)%initial.current.o.length);
assert.equal(r.draft.current.role,"probe");assert.equal(r.draft.current.themeId,DIAGNOSTIC_BLUEPRINT[0]);
let probeCorrect=step(r.state,r.draft,r.draft.current.a);assert.equal(probeCorrect.draft.current.role,"anchor");assert.equal(probeCorrect.draft.anchorIndex,1);
base=stateFor("ses-probe-bad");initial=draftFor(base);r=step(base,initial,(initial.current.a+1)%initial.current.o.length);
let probeBad=step(r.state,r.draft,(r.draft.current.a+1)%r.draft.current.o.length);assert.equal(probeBad.draft.anchorIndex,1);
let chain=probeBad;for(let i=0;i<3;i++){chain=step(chain.state,chain.draft,(chain.draft.current.a+1)%chain.draft.current.o.length);if(chain.draft.current.role==="probe")chain=step(chain.state,chain.draft,chain.draft.current.a)}
assert.ok(chain.draft.responses.length>=5);

// 11/12. Conclusão falhada mantém terminal; conclusão persistida limpa sem repetir milestone.
base=stateFor("ses-complete");initial=draftFor(base);chain={state:base,draft:initial};
for(let i=0;i<5;i++)chain=step(chain.state,chain.draft,chain.draft.current.a);
let terminal=chain.draft;assert.equal(terminal.phase,"completion_pending");
w=writes({failStateAt:[2]});let completion=recover(chain.state,terminal,w);assert.equal(completion.reason,"completion_state_write_failed");assert.equal(completion.draft.phase,"completion_pending");
let final=completeState(chain.state,terminal).state;completion=recover(final,terminal);assert.equal(completion.ok,true);assert.equal(completion.completed,true);
assert.equal(normalizeProductAnalytics(completion.state).events.filter(e=>e.type==="diagnostic_completed").length,1);

// 13. Sessão errada ou múltipla falha fechada.
let ambiguous={...stateFor("ses-a"),betaSessions:[...stateFor("ses-a").betaSessions,{id:"ses-b",kind:"diagnostic",startedAt:NOW,finishedAt:null}]};
assert.equal(recover(ambiguous,draftFor(stateFor("ses-a"))).reason,"ambiguous_session");

// 14. Fingerprint editorial alterado renova apenas apresentação não respondida; pending conserva snapshot.
base=stateFor("ses-content");initial=draftFor(base);const oldFp=initial.current.fingerprint;
base={...base,editorialOverrides:{[initial.current.id]:{contentPatch:{q:initial.current.q+" (revisto)"}}}};
let refreshed=recover(base,initial);assert.equal(refreshed.ok,true);assert.notEqual(refreshed.draft.current.fingerprint,oldFp);
pending=createPendingResponse(initial,initial.current.a,{state:base,now:NOW});pendingDraft={...initial,pendingResponse:pending,sel:pending.sel,fb:{correct:pending.correct}};
let canonical=recover(base,pendingDraft);assert.equal(canonical.ok,true);assert.equal(canonical.state.scores[initial.current.themeId].evidence[0].contentFingerprint,oldFp);

// 15/16. Adulteração semântica e sel/fb incoerentes são rejeitados antes dos scores.
let wrong={...initial,current:{...initial.current,themeId:DIAGNOSTIC_BLUEPRINT[1]}};wrong.current.fingerprint=contentRevisionFingerprint(wrong.current);
assert.equal(validateDiagnosticDraft(wrong,{now:NOW}).ok,false);
assert.equal(validateDiagnosticDraft({...initial,sel:0,fb:{correct:0!==initial.current.a}},{now:NOW}).reason,"invalid_feedback");

// 17/18. TTL: evidência/pending real permanece; vazio expira.
memory.clear();saveSessionDraft(pendingDraft);let key=[...memory.keys()][0],raw=JSON.parse(memory.get(key));raw.savedAt=NOW-25*60*60*1000;memory.set(key,JSON.stringify(raw));
assert.ok(loadSessionDraft("internal")?.pendingResponse);
memory.clear();saveSessionDraft(initial);key=[...memory.keys()][0];raw=JSON.parse(memory.get(key));raw.savedAt=NOW-25*60*60*1000;memory.set(key,JSON.stringify(raw));assert.equal(loadSessionDraft("internal"),null);

// 19/20. Clock skew pequeno e legacy state sem draft.
assert.equal(validateDiagnosticDraft({...initial,startedAt:NOW+5*60*1000},{now:NOW}).ok,true);
assert.equal(validateDiagnosticDraft({...initial,savedAt:NOW+5*60*1000},{now:NOW}).ok,true);
assert.equal(validateDiagnosticDraft({...initial,savedAt:NOW+60*60*1000},{now:NOW}).reason,"invalid_saved_at");
memory.clear();assert.equal(loadSessionDraft("internal"),null);assert.equal(stateFor().diagnosticAnswers,0);

// 21. Milestones idempotentes.
let pa=recordMilestone(stateFor(),"diagnostic_started",{sessionId:"x"},{at:NOW});pa=recordMilestone(pa,"diagnostic_started",{sessionId:"x"},{at:NOW+1});
pa=recordMilestone(pa,"diagnostic_completed",{sessionId:"x"},{at:NOW+2});pa=recordMilestone(pa,"diagnostic_completed",{sessionId:"x"},{at:NOW+3});
assert.equal(normalizeProductAnalytics(pa).events.filter(e=>e.type==="diagnostic_started").length,1);assert.equal(normalizeProductAnalytics(pa).events.filter(e=>e.type==="diagnostic_completed").length,1);

// 22. applyEvidence continua compatível sem meta para Mission/Mini-exame/Treino.
const sample=QUESTION_BANK[0];for(const source of ["mission","exam","training"]){const score=applyEvidence(emptyScores()[sample.themeId],sample,true,source);assert.equal(score.evidence.length,1);assert.equal(score.evidence[0].source,source);assert.equal(score.evidence[0].responseId,undefined)}

// 23. Falhas individuais de localStorage são fechadas e explicáveis.
memory.clear();failSet=true;assert.equal(saveSessionDraft(initial),false);failSet=false;
const noSession={...stateFor("unused"),betaSessions:[]};w=writes({failStateAt:[1]});assert.equal(recover(noSession,initial,w).reason,"start_state_write_failed");
saveSessionDraft(initial);const retainedKey=[...memory.keys()][0];failGet=true;assert.equal(loadSessionDraft("internal"),null);failGet=false;assert.ok(memory.has(retainedKey));
failGet=true;assert.equal(loadLocalStateStatus({},()=>({})).error,true);failGet=false;
saveSessionDraft(initial);failRemove=true;assert.equal(clearSessionDraft("internal"),false);failRemove=false;assert.equal(clearSessionDraft("internal"),true);

assert.equal(draftScreen(initial),"diagRun");

// 24. Sessão legacy sem WAL é abandonada explicitamente sem tocar na evidência académica.
const legacyItem=QUESTION_BANK.find(q=>q.contexts.includes("diagnostic"));
const legacyBase=stateFor("ses-legacy-open");
const legacyScore=applyEvidence(legacyBase.scores[legacyItem.themeId],legacyItem,false,"diagnostic",1,{at:NOW-500});
const legacyState={...legacyBase,scores:{...legacyBase.scores,[legacyItem.themeId]:legacyScore},diagnosticAnswers:1};
const legacyScores=structuredClone(legacyState.scores);
w=writes();let legacy=recoverLegacyDiagnosticSessions({state:legacyState,saveState:w.saveState,now:NOW});
assert.equal(legacy.ok,true);assert.equal(legacy.migrated,true);
assert.equal(legacy.state.betaSessions.filter(x=>x.kind==="diagnostic"&&!x.finishedAt).length,0);
assert.equal(legacy.state.betaSessions[0].meta.recoveryStatus,"legacy_abandoned");
assert.deepEqual(legacy.state.scores,legacyScores);assert.equal(legacy.state.diagnosticAnswers,1);
legacy=recoverLegacyDiagnosticSessions({state:legacy.state,saveState:()=>{throw Error("must not write")},now:NOW+1});
assert.equal(legacy.ok,true);assert.equal(legacy.migrated,false);assert.deepEqual(legacy.state.scores,legacyScores);
failGet=true;const failedDraftRead=loadSessionDraftStatus("internal");failGet=false;
assert.equal(failedDraftRead.error,true);assert.equal(failedDraftRead.draft,null);

// 25. Probe atribuído conserva snapshot/fingerprint congelado após alteração editorial.
base=stateFor("ses-frozen-probe");initial=draftFor(base);
let assigned=step(base,initial,(initial.current.a+1)%initial.current.o.length);
const frozenProbe=structuredClone(assigned.draft.current);
const changedProbeState={...assigned.state,editorialOverrides:{
  ...(assigned.state.editorialOverrides||{}),
  [frozenProbe.id]:{contentPatch:{q:frozenProbe.q+" (nova versão editorial)"}}
}};
assert.notEqual(snapshotDiagnosticItem(diagnosticProbe(frozenProbe.themeId,changedProbeState)).fingerprint,frozenProbe.fingerprint);
let frozenRecovery=recover(changedProbeState,assigned.draft);
assert.equal(frozenRecovery.ok,true);assert.equal(frozenRecovery.draft.current.fingerprint,frozenProbe.fingerprint);
assert.equal(frozenRecovery.draft.current.q,frozenProbe.q);
const answeredFrozen=step(frozenRecovery.state,frozenRecovery.draft,frozenRecovery.draft.current.a);
const frozenEvidence=answeredFrozen.state.scores[frozenProbe.themeId].evidence.filter(e=>e.itemId===frozenProbe.id).at(-1);
assert.equal(frozenEvidence.contentFingerprint,frozenProbe.fingerprint);
assert.equal(validateDiagnosticDraft(answeredFrozen.draft,{now:NOW}).ok,true);

console.log("✓ diagnostic recovery WAL audit: 25 recovery/fault-injection groups passed");
