// Local, synthetic-only compatibility contract. Requires the pinned Git objects.
import {execFileSync} from "node:child_process";
import {mkdtempSync,writeFileSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join,resolve} from "node:path";
import {pathToFileURL} from "node:url";
import assert from "node:assert/strict";
const production="98e811f8be6139f15e89de38c5b5e335dc631bdc";
const safety="94ee6db5409e213494e275e28d8da01d3a2b4623";
const git=(...args)=>execFileSync("git",args,{encoding:"utf8"}).trim();
const combined="6098805c1eea0ddec17c596d20414713d1cae7c6"; // #390, exact merge tree of #385/#387.
const dir=mkdtempSync(join(tmpdir(),"approva-recovery-synthetic-"));
const files=["sessionDraft.js","browserStorage.js","physicsChemistryExamDraft.js","portugueseMiniExamDraft.js","persistence.js","pilotConsentClient.js"];
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
  modules[name]=Object.fromEntries(await Promise.all(files.filter(f=>!["browserStorage.js","pilotConsentClient.js"].includes(f)).map(async f=>[f,await import(pathToFileURL(join(sub,f)))])));
 }
 modules.recovery=Object.fromEntries(await Promise.all(files.filter(f=>!["browserStorage.js","pilotConsentClient.js"].includes(f)).map(async f=>[f,await import(pathToFileURL(resolve("app/lib",f)))])));
 // Candidate must retain the pinned safety storage implementation.
 check(git("diff",safety,"--",...files.map(f=>`app/lib/${f}`))==="","candidate must preserve #385 storage guards");
 check(git("diff",production,"--","app/api","db")==="","no database/API migration in release");
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
 // Full saved student state: older versions, three subjects, completed and
 // unfinished diagnoses, corrections and progress must survive upgrade and
 // a safe older loader. Legacy telemetry queues are intentionally excluded.
 for(const mode of ["internal","friends_beta"]){
  for(const origin of ["production","safety","combined"]){
   for(const version of [29,31]){
    maps.forEach(m=>m.clear());
    const stateKey=mode==="internal"?"a25":"a25-friends-beta";
    const draftKey=mode==="internal"?"a25-active-session-v1":"a25-friends-active-session-v1";
    const synthetic={betaMode:mode,xp:234,diagnosticDone:true,diagnosticAnswers:8,
     diagnosticResponses:[{itemId:"synthetic-math",answer:"x=2",feedback:{correct:true,points:4}}],
     selectedSubjectIds:["math-a","portuguese","physics-chemistry-a"],activeSubjectId:"portuguese",
     profile:{schoolYear:"12.º",recentGrade:14,taughtSubtopicIds:["synthetic-scope"]},
     subjectSettings:{portuguese:{profileConfigured:true,miniExamDraft:{attemptId:"synthetic-exam",answers:{q1:"Resposta sintética"},review:{q1:{correct:true}}}}},
     subjectProgress:{portuguese:{version:4,diagnosticDone:false,lastPosition:{kind:"diagnostic",current:2,results:[{itemId:"synthetic-pt",answer:"Resposta sintética",correct:true}],sessionId:"synthetic-pt-session"}},
      "physics-chemistry-a":{version:4,diagnosticDone:true,diagnosticCompletedAt:1,sessions:[{kind:"mission",results:[{answer:"12",feedback:{points:2,maxPoints:2}}]}],competence:{synthetic:{score:.7,evidence:3}}}},
     scores:{synthetic:{score:.6,evidence:[{correct:true,at:1}]}},_stateVersion:version,_savedAt:1};
    const rawDraft=JSON.stringify({kind:"training",savedAt:1,responses:["Preservar"]});
    localStorage.setItem(draftKey,rawDraft);
    check(modules[origin]["persistence.js"].saveLocalState(synthetic,stateKey),"old writer saves full state");
    const upgraded=modules.recovery["persistence.js"].loadLocalStateStatus({},()=>({synthetic:{score:0,evidence:[]}}),stateKey);
    check(upgraded.found&&!upgraded.error,"candidate reads saved full state");
    for(const field of ["xp","diagnosticDone","diagnosticResponses","selectedSubjectIds","activeSubjectId","profile","subjectSettings","subjectProgress","scores"]){assert.deepEqual(upgraded.state[field],synthetic[field]);checks++}
    check(modules.recovery["persistence.js"].saveLocalState(upgraded.state,stateKey),"candidate writes upgraded state");
    const recovered=modules.combined["persistence.js"].loadLocalStateStatus({},()=>({synthetic:{score:0,evidence:[]}}),stateKey);
    for(const field of ["xp","diagnosticResponses","subjectProgress","subjectSettings","scores"]){assert.deepEqual(recovered.state[field],synthetic[field]);checks++}
    check(localStorage.getItem(draftKey)===rawDraft,"saving full state cannot remove pending attempt");
   }
  }
 }
 console.log(JSON.stringify({result:"PASS",checks,production,safety,combined,recoveryBase:safety,storage:"synthetic memory only",network:false}));
}finally{rmSync(dir,{recursive:true,force:true});}
