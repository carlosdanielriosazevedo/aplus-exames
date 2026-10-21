// Local, synthetic-only compatibility contract. Requires the pinned Git objects.
import {execFileSync} from "node:child_process";
import {mkdtempSync,writeFileSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join,resolve} from "node:path";
import {pathToFileURL} from "node:url";
import assert from "node:assert/strict";
const production="98e811f8be6139f15e89de38c5b5e335dc631bdc";
const safety="94ee6db5409e213494e275e28d8da01d3a2b4623";
const visual="d3765d7acc5e490f66e8f97a94a726ab51826285";
const git=(...args)=>execFileSync("git",args,{encoding:"utf8"}).trim();
const combined=git("merge-tree","--write-tree",safety,visual).split("\n")[0];
const dir=mkdtempSync(join(tmpdir(),"approva-recovery-synthetic-"));
const files=["sessionDraft.js","browserStorage.js","physicsChemistryExamDraft.js","portugueseMiniExamDraft.js"];
const maps=[];
function storage(){const m=new Map();maps.push(m);return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}}
globalThis.localStorage=storage();globalThis.sessionStorage=storage();
globalThis.window={localStorage,sessionStorage};
let checks=0;
const check=(condition,message)=>{assert.ok(condition,message);checks++};
try{
 const modules={};
 for(const [name,ref] of Object.entries({production,safety,combined})){
  const sub=join(dir,name);execFileSync("mkdir",["-p",sub]);
  writeFileSync(join(sub,"package.json"),'{"type":"module"}');
  for(const file of files)writeFileSync(join(sub,file),git("show",`${ref}:app/lib/${file}`)+"\n");
  modules[name]=Object.fromEntries(await Promise.all(files.filter(f=>f!=="browserStorage.js").map(async f=>[f,await import(pathToFileURL(join(sub,f)))])));
 }
 modules.recovery=Object.fromEntries(await Promise.all(files.filter(f=>f!=="browserStorage.js").map(async f=>[f,await import(pathToFileURL(resolve("app/lib",f)))])));
 // Recovery deliberately retains the exact safety runtime, including reset callback/UI.
 check(git("diff",safety,"--","app","db")==="","recovery must preserve all #385 runtime guards");
 check(git("diff",production,combined,"--","app/api","db")==="","no database/API migration in release");
 for(const mode of ["internal","friends_beta"]){
  const key=mode==="internal"?"a25-active-session-v1":"a25-friends-active-session-v1";
  for(const kind of ["training","mission","mini_exam","diagnostic"]){
   for(const origin of ["production","safety","combined"]){
    for(const phase of ["in_progress","completion_pending"]){
     maps.forEach(m=>m.clear());
     const initial={kind,betaMode:mode,version:4,sessionId:"synthetic-original",i:2,phase,questions:[{id:"q1"},{id:"q2"}],responses:[{id:"q1",answer:"synthetic"}],pendingResponse:{answer:"unfinished"},startedAt:1};
     check(modules[origin]["sessionDraft.js"].saveSessionDraft(initial),"writer accepts fixture");
     const payload={...JSON.parse(localStorage.getItem(key)),savedAt:Date.now()-90*86400000};
     localStorage.setItem(key,JSON.stringify(payload));
     for(const target of ["combined","recovery"]){
      const mod=modules[target]["sessionDraft.js"];
      assert.deepEqual(mod.loadSessionDraftStatus(mode).draft,payload);checks++;
      check(mod.saveSessionDraft({...payload,sessionId:"attacker",responses:[]})===false,"reject concurrent attempt");
      check(mod.restartDiagnosticDraft(mode).ok===false,"reject destructive restart");
      assert.deepEqual(JSON.parse(localStorage.getItem(key)),payload);checks++;
     }
    }
   }
   // Negative control: old deployment really is unsafe, including empty diagnostic.
   maps.forEach(m=>m.clear());
   const raw=JSON.stringify({kind,betaMode:mode,version:4,sessionId:"old-empty",responses:[],savedAt:Date.now()-90*86400000});
   localStorage.setItem(key,raw);
   check(!!modules.recovery["sessionDraft.js"].loadSessionDraftStatus(mode).draft,"preserve old empty attempt");
   check(modules.production["sessionDraft.js"].loadSessionDraftStatus(mode).draft===null,"unsafe old loader control");
   check(localStorage.getItem(key)===null,"old loader deletion reproduced only in memory");
  }
  for(const raw of ['{broken','null','{}']){
   maps.forEach(m=>m.clear());localStorage.setItem(key,raw);
   check(modules.recovery["sessionDraft.js"].loadSessionDraftStatus(mode).error,"corrupt data fails closed");
   check(!modules.recovery["sessionDraft.js"].saveSessionDraft({kind:"mission",betaMode:mode}),"cannot overwrite corruption");
   check(localStorage.getItem(key)===raw,"raw corruption retained");
  }
 }
 for(const origin of ["production","safety","combined"]){
  for(const examId of ["fqa-mini-1","fqa-mini-2","fqa-full-715"]){
   maps.forEach(m=>m.clear());
   const draft={itemIds:["q1","q2"],index:1,answers:{q1:"synthetic"},startedAt:1,markedForReview:["q2"]};
   modules[origin]["physicsChemistryExamDraft.js"].savePhysicsChemistryExamDraft(examId,draft);
   for(const target of ["combined","recovery"]){
    const mod=modules[target]["physicsChemistryExamDraft.js"];
    check(mod.savePhysicsChemistryExamDraft(examId,{...draft,startedAt:999})===true,"resume FQA");
    const loaded=mod.loadPhysicsChemistryExamDraft(examId,draft.itemIds);
    check(loaded.startedAt===1&&loaded.answers.q1==="synthetic"&&loaded.index===1,"FQA timer/answer/position");
    check(mod.savePhysicsChemistryExamDraft(examId,{...draft,itemIds:["replacement"]})===false,"FQA content mismatch refused");
   }
  }
  for(const version of [1,2]){
   const mod=modules[origin]["portugueseMiniExamDraft.js"];
   const opts={examId:"pt-mini",itemIds:["q1","q2"]};
   const raw={...opts,version,attemptId:"synthetic-pt",index:1,answers:{q1:"synthetic"},startedAt:1,updatedAt:1};
   const written=mod.normalizePortugueseMiniExamDraft(raw,opts);
   for(const target of ["combined","recovery"]){
    const targetMod=modules[target]["portugueseMiniExamDraft.js"];
    const read=targetMod.normalizePortugueseMiniExamDraft(written,opts);
    assert.deepEqual(read,written);checks++;
    const state=targetMod.savePortugueseMiniExamDraft({},read);
    check(targetMod.savePortugueseMiniExamDraft(state,{...read,attemptId:"replacement"})===state,"PT pending attempt guarded");
   }
  }
 }
 console.log(JSON.stringify({result:"PASS",checks,production,safety,combined,recoveryBase:safety,storage:"synthetic memory only",network:false}));
}finally{rmSync(dir,{recursive:true,force:true});}
