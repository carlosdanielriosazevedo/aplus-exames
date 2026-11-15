// Contrato comportamental de recuperação (#385) — MODO SOMBRA.
//
// Não substitui scripts/release-recovery-compatibility.mjs, que continua
// inalterado e obrigatório. Este contrato:
//   * repete, sem alterações, todas as verificações comportamentais históricas
//     do #385 (rascunhos, FQ A, Português, estado completo v29/v31);
//   * mantém INALTERADO o bloqueio de migrações API/schema;
//   * substitui apenas a exigência de bytes idênticos nos 6 ficheiros de
//     armazenamento por um relatório informativo + controlos negativos D1–D3;
//   * documenta a exceção raw-recovery-gap (exportação continua bloqueada).
//
// Uso: node scripts/release-recovery-behavioural-contract.mjs [--candidate-ref <git-ref>] [--json]
// Sem --candidate-ref, o candidato é a árvore de trabalho atual.
// Requer os objetos Git fixados abaixo. Só dados sintéticos em memória; sem rede.
import {execFileSync} from "node:child_process";
import {mkdtempSync,writeFileSync,rmSync,mkdirSync,existsSync,readFileSync} from "node:fs";
import {tmpdir} from "node:os";
import {join,resolve,dirname,posix} from "node:path";
import {pathToFileURL} from "node:url";
import assert from "node:assert/strict";

const production="98e811f8be6139f15e89de38c5b5e335dc631bdc";
const safety="94ee6db5409e213494e275e28d8da01d3a2b4623";
const combined="6098805c1eea0ddec17c596d20414713d1cae7c6"; // #390, exact merge tree of #385/#387.
const STORAGE_FILES=["sessionDraft.js","browserStorage.js","physicsChemistryExamDraft.js","portugueseMiniExamDraft.js","persistence.js","pilotConsentClient.js"];
const LOADABLE=STORAGE_FILES.filter(f=>!["browserStorage.js","pilotConsentClient.js"].includes(f));

const args=process.argv.slice(2);
const candidateRef=args.includes("--candidate-ref")?args[args.indexOf("--candidate-ref")+1]:null;
const asJson=args.includes("--json");
const git=(...a)=>execFileSync("git",a,{encoding:"utf8",maxBuffer:64*1024*1024,stdio:["ignore","pipe","pipe"]}).trim();
const dir=mkdtempSync(join(tmpdir(),"approva-recovery-shadow-"));

// Leitura de um ficheiro do candidato (ref Git ou árvore de trabalho).
function candidateFile(path){
  if(candidateRef){try{return git("show",`${candidateRef}:${path}`)}catch{return null}}
  return existsSync(path)?readFileSync(path,"utf8"):null;
}
// Copia um módulo de app/lib e o seu fecho de imports relativos.
function materialize(readFile,root,entry){
  const seen=new Set(),queue=[entry];
  while(queue.length){
    const path=queue.shift();if(seen.has(path))continue;seen.add(path);
    const source=readFile(path);if(source===null)continue;
    const target=join(root,path);mkdirSync(dirname(target),{recursive:true});writeFileSync(target,source+"\n");
    for(const match of source.matchAll(/(?:import|export)[^"']*?from\s*["'](\.{1,2}\/[^"']+)["']/g)){
      let next=posix.normalize(posix.join(posix.dirname(path),match[1]));
      if(!/\.(m?js|json)$/.test(next))next+=".js";
      queue.push(next);
    }
  }
}
function loadRef(name,readFile,files){
  const root=join(dir,name);mkdirSync(root,{recursive:true});
  writeFileSync(join(root,"package.json"),'{"type":"module"}');
  for(const f of files)materialize(readFile,root,`app/lib/${f}`);
  return root;
}
const importFrom=(root,file)=>import(pathToFileURL(join(root,"app/lib",file)));

const maps=[];
function storage(){const m=new Map();maps.push(m);return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),clear:()=>m.clear()}}
globalThis.localStorage=storage();globalThis.sessionStorage=storage();
globalThis.window={localStorage,sessionStorage,dispatchEvent(){},setTimeout,clearTimeout};
globalThis.CustomEvent??=class{constructor(type,init){this.type=type;this.detail=init?.detail}};
const reset=()=>maps.forEach(m=>m.clear());

const groups=[];
async function group(name,kind,fn){
  let checks=0;const check=(c,m)=>{assert.ok(c,m);checks++};const equal=(a,b)=>{assert.deepEqual(a,b);checks++};
  try{const note=await fn({check,equal});groups.push({name,kind,status:note?.status||"pass",checks,...(note?.detail?{detail:note.detail}:{})})}
  catch(error){groups.push({name,kind,status:"fail",checks,error:String(error?.message||error).slice(0,300)})}
}

try{
  const modules={};
  for(const [name,ref] of Object.entries({production,safety,combined})){
    const root=loadRef(name,p=>{try{return git("show",`${ref}:${p}`)}catch{return null}},STORAGE_FILES);
    modules[name]=Object.fromEntries(await Promise.all(LOADABLE.map(async f=>[f,await importFrom(root,f)])));
  }
  const candidateRoot=loadRef("candidate",candidateFile,[...STORAGE_FILES,"reliability.js","stateIntegrity.js"]);
  modules.recovery=Object.fromEntries(await Promise.all(LOADABLE.map(async f=>[f,await importFrom(candidateRoot,f)])));
  const has=file=>existsSync(join(candidateRoot,"app/lib",file));

  // ---- Bloqueios mantidos -------------------------------------------------
  await group("api-schema-freeze","gate",({check})=>{
    const diff=candidateRef?git("diff",production,candidateRef,"--","app/api","db"):git("diff",production,"--","app/api","db");
    check(diff==="","no database/API migration in release");
  });
  await group("storage-files-byte-report","report",()=>{
    const changed=STORAGE_FILES.filter(f=>{
      const a=git("show",`${safety}:app/lib/${f}`),b=candidateFile(`app/lib/${f}`);
      return b===null||a.trim()!==b.trim();
    });
    return {status:changed.length?"changed":"identical",detail:{changed}};
  });

  // ---- Verificações históricas do #385 (inalteradas) ----------------------
  await group("historical-session-drafts","historical",({check,equal})=>{
    for(const mode of ["internal","friends_beta"]){
      const key=mode==="internal"?"a25-active-session-v1":"a25-friends-active-session-v1";
      for(const kind of ["training","mission","mini_exam","diagnostic"]){
        for(const origin of ["production","safety","combined"]){
          for(const phase of ["in_progress","completion_pending"]){
            reset();
            const initial={kind,betaMode:mode,version:4,sessionId:"synthetic-original",i:2,phase,questions:[{id:"q1"},{id:"q2"}],responses:[{id:"q1",answer:"synthetic"}],pendingResponse:{answer:"unfinished"},startedAt:1};
            check(modules[origin]["sessionDraft.js"].saveSessionDraft(initial),"writer accepts fixture");
            const payload={...JSON.parse(localStorage.getItem(key)),savedAt:Date.now()-90*86400000};
            localStorage.setItem(key,JSON.stringify(payload));
            for(const target of ["combined","recovery"]){
              const mod=modules[target]["sessionDraft.js"];
              equal(mod.loadSessionDraftStatus(mode).draft,payload);
              check(mod.saveSessionDraft({...payload,sessionId:"attacker",responses:[]})===false,"reject concurrent attempt");
              check(mod.restartDiagnosticDraft(mode).ok===false,"reject destructive restart");
              equal(JSON.parse(localStorage.getItem(key)),payload);
            }
          }
        }
        reset();
        const raw=JSON.stringify({kind,betaMode:mode,version:4,sessionId:"old-empty",responses:[],savedAt:Date.now()-90*86400000});
        localStorage.setItem(key,raw);
        check(!!modules.recovery["sessionDraft.js"].loadSessionDraftStatus(mode).draft,"preserve old empty attempt");
        check(modules.production["sessionDraft.js"].loadSessionDraftStatus(mode).draft===null,"unsafe old loader control");
        check(localStorage.getItem(key)===null,"old loader deletion reproduced only in memory");
      }
      for(const raw of ['{broken','null','{}']){
        reset();localStorage.setItem(key,raw);
        check(modules.recovery["sessionDraft.js"].loadSessionDraftStatus(mode).error,"corrupt data fails closed");
        check(!modules.recovery["sessionDraft.js"].saveSessionDraft({kind:"mission",betaMode:mode}),"cannot overwrite corruption");
        check(localStorage.getItem(key)===raw,"raw corruption retained");
      }
    }
  });
  await group("historical-fqa-drafts","historical",({check})=>{
    for(const origin of ["production","safety","combined"]){
      for(const examId of ["fqa-mini-1","fqa-mini-2","fqa-full-715"]){
        reset();
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
    }
  });
  await group("historical-portuguese-drafts","historical",({check,equal})=>{
    for(const origin of ["production","safety","combined"]){
      for(const version of [1,2]){
        const mod=modules[origin]["portugueseMiniExamDraft.js"];
        const opts={examId:"pt-mini",itemIds:["q1","q2"]};
        const raw={...opts,version,attemptId:"synthetic-pt",index:1,answers:{q1:"synthetic"},startedAt:1,updatedAt:1};
        const written=mod.normalizePortugueseMiniExamDraft(raw,opts);
        for(const target of ["combined","recovery"]){
          const targetMod=modules[target]["portugueseMiniExamDraft.js"];
          const read=targetMod.normalizePortugueseMiniExamDraft(written,opts);
          equal(read,written);
          const state=targetMod.savePortugueseMiniExamDraft({},read);
          check(targetMod.savePortugueseMiniExamDraft(state,{...read,attemptId:"replacement"})===state,"PT pending attempt guarded");
        }
      }
    }
  });
  await group("historical-full-state","historical",({check,equal})=>{
    for(const mode of ["internal","friends_beta"]){
      for(const origin of ["production","safety","combined"]){
        for(const version of [29,31]){
          reset();
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
          for(const field of ["xp","diagnosticDone","diagnosticResponses","selectedSubjectIds","activeSubjectId","profile","subjectSettings","subjectProgress","scores"])equal(upgraded.state[field],synthetic[field]);
          check(modules.recovery["persistence.js"].saveLocalState(upgraded.state,stateKey),"candidate writes upgraded state");
          const recovered=modules.combined["persistence.js"].loadLocalStateStatus({},()=>({synthetic:{score:0,evidence:[]}}),stateKey);
          for(const field of ["xp","diagnosticResponses","subjectProgress","subjectSettings","scores"])equal(recovered.state[field],synthetic[field]);
          check(localStorage.getItem(draftKey)===rawDraft,"saving full state cannot remove pending attempt");
        }
      }
    }
  });

  // ---- Controlos negativos novos (D1–D3) ----------------------------------
  const reliability=has("reliability.js")?await importFrom(candidateRoot,"reliability.js"):null;
  const integrity=has("stateIntegrity.js")?await importFrom(candidateRoot,"stateIntegrity.js").catch(()=>null):null;
  const REGISTRY="a25-completed-sessions-v1";

  await group("d1-corrupt-completion-registry","negative-control",({check})=>{
    check(!!reliability,"candidate exposes reliability.js");
    for(const raw of ['{"truncated',"null","{}",'[{"id":""}]',"[1]"]){
      reset();localStorage.setItem(REGISTRY,raw);
      check(reliability.claimSessionCompletion("synthetic-a")===false,"corrupt registry never grants a completion");
      reliability.releaseSessionCompletion?.("synthetic-a");
      check(localStorage.getItem(REGISTRY)===raw,"corrupt registry bytes preserved");
    }
    reset();localStorage.setItem(REGISTRY,JSON.stringify([{id:"done",at:1}]));
    check(reliability.claimSessionCompletion("done")===false,"valid registry blocks duplicate");
    check(reliability.claimSessionCompletion("fresh")===true,"valid registry still works");
  });

  await group("d2-future-or-unreadable-state","negative-control",({check})=>{
    check(!!integrity?.guardedLoadLocalStateStatus&&!!integrity?.guardedSaveLocalState&&!!integrity?.guardedClearLocalPilotTelemetry,"candidate exposes guarded persistence");
    const clientApp=candidateFile("app/clientApp.js")||"";
    check(/guardedLoadLocalStateStatus as loadLocalStateStatus/.test(clientApp)&&/guardedSaveLocalState as saveLocalState/.test(clientApp),"app loads and saves through the guard");
    for(const page of ["app/definicoes/page.js","app/piloto/page.js"]){
      const source=candidateFile(page)||"";
      check(!/from "\.\.\/lib\/persistence"/.test(source)||!/clearLocalPilotTelemetry/.test(source.split("from \"../lib/persistence\"")[0].split("\n").pop()),`${page} does not bypass the guard`);
    }
    for(const raw of [JSON.stringify({xp:9,future:true,_stateVersion:999}),JSON.stringify({xp:9,_stateVersion:"31"}),'{"xp":9,',"[1]"]){
      reset();integrity.resetStateIntegrityCache?.();
      localStorage.setItem("a25",raw);
      const loaded=integrity.guardedLoadLocalStateStatus({},()=>({}),"a25");
      check(loaded.error===true&&loaded.state===null,"blocked state is not loaded");
      check(integrity.guardedSaveLocalState({xp:1})===false,"blocked state is not overwritten");
      integrity.guardedClearLocalPilotTelemetry();
      check(localStorage.getItem("a25")===raw,"blocked state bytes preserved");
    }
  });

  await group("d3-two-phase-completion","negative-control",({check})=>{
    check(typeof reliability?.reserveSessionCompletion==="function"&&typeof reliability?.commitSessionCompletion==="function","candidate exposes two-phase receipts");
    reset();
    check(reliability.reserveSessionCompletion("s1").status==="reserved","reserve");
    check(reliability.reserveSessionCompletion("s1",{isRecorded:()=>false}).status==="reserved","interrupted before save: resumable");
    check(reliability.reserveSessionCompletion("s1",{isRecorded:()=>true}).status==="already_completed","interrupted after save: never reapplied");
    reset();localStorage.setItem(REGISTRY,JSON.stringify([{id:"legacy",at:1}]));
    check(reliability.reserveSessionCompletion("legacy",{isRecorded:()=>false}).status==="reserved","legacy receipt without evaluation recoverable");
    reset();localStorage.setItem(REGISTRY,JSON.stringify([{id:"other",at:Date.now(),status:"pending",owner:"tab-other-synthetic"}]));
    check(reliability.reserveSessionCompletion("other",{isRecorded:()=>false}).status==="blocked","live reservation of another tab respected");
    const clientApp=candidateFile("app/clientApp.js")||"";
    check(!/claimSessionCompletion\(/.test(clientApp),"app no longer uses one-phase claims");
    for(const [start,end] of [["function closeMission(","function next()"],["function TrainingRun(","if(done){"],["function MiniExamReview(","return <Shell><Back go={go} to=\"miniExamRun\"/>"]]){
      const a=clientApp.indexOf(start),b=clientApp.indexOf(end,a+1);
      check(a>=0&&b>a,`completion block found: ${start}`);
      const body=clientApp.slice(a,b);
      const reserve=body.indexOf("reserveSessionCompletion("),save=Math.max(body.lastIndexOf("saveLocalState("),body.lastIndexOf("saveLocalStateDurably(")),commit=body.indexOf("commitSessionCompletion("),clear=body.lastIndexOf("clearSessionDraft(");
      check(reserve>=0&&reserve<save&&save<commit&&commit<clear,`order reserve → save → commit → clear draft: ${start}`);
    }
  });

  await group("durable-completion","negative-control",({check})=>{
    check(typeof integrity?.saveLocalStateDurably==="function","candidate exposes durable save");
    reset();integrity.resetStateIntegrityCache?.();
    const big=extra=>({xp:1,betaMode:"internal",pad:"x".repeat(500),...extra});
    check(integrity.saveLocalStateDurably(big()).ok===true,"durable save with working localStorage");
    const realSet=localStorage.setItem;
    localStorage.setItem=(k,v)=>{if(String(v).length>200)throw Object.assign(Error("quota"),{name:"QuotaExceededError"});return realSet(k,v)};
    try{
      const beforeLocal=localStorage.getItem("a25"),beforeSession=sessionStorage.getItem("a25");
      const result=integrity.saveLocalStateDurably(big({completed:true}));
      check(result.ok===false&&result.tier==="tab","tab-only save is not accepted as durable");
      check(localStorage.getItem("a25")===beforeLocal&&sessionStorage.getItem("a25")===beforeSession,"non-durable completion rolled back exactly");
    }finally{localStorage.setItem=realSet}
    const clientApp=candidateFile("app/clientApp.js")||"";
    for(const [start,end] of [["function closeMission(","function next()"],["function TrainingRun(","if(done){"],["function MiniExamReview(","return <Shell><Back go={go} to=\"miniExamRun\"/>"],["function finish(nextState,nextDraft){","function next(){"]]){
      const a=clientApp.indexOf(start),b=clientApp.indexOf(end,a+1);
      const body=a>=0&&b>a?clientApp.slice(a,b):"";
      const durable=body.indexOf("saveLocalStateDurably("),clear=body.lastIndexOf("clearSessionDraft(");
      check(durable>=0&&durable<clear,`durable save before clearing the draft: ${start}`);
    }
    check(/saveFinalState:state=>saveLocalStateDurably\(state\)\.ok/.test(clientApp),"diagnostic recovery completion requires durable save");
    for(const file of ["app/components/PhysicsChemistryExam.js","app/components/PhysicsChemistryMiniExam.js"]){
      const source=candidateFile(file)||"";
      const durable=source.indexOf("saveLocalStateDurably("),clear=source.indexOf("clearPhysicsChemistryExamDraft(",source.indexOf("function saveReviewAndExit"));
      check(durable>=0&&durable<clear,`${file}: durable save before clearing the exam draft`);
    }
  });

  await group("storage-blocked-startup","negative-control",async({check})=>{
    const sources=["app/lib/cloudReliability.js","app/lib/graderValidationDataset.js","app/lib/graderValidationCapture.js","app/lib/portugueseWritingMemory.js"];
    for(const file of sources){
      const source=candidateFile(file)||"";
      check(!/typeof\s+(localStorage|sessionStorage)\b/.test(source),`${file}: no typeof localStorage (throws when storage is blocked)`);
      check(!/=\s*typeof window!=="undefined"\?window\.localStorage/.test(source),`${file}: no unsafe default storage parameter`);
    }
    const app=candidateFile("app/clientApp.js")||"";
    check(!/\n\s*if\(sessionStorage\.getItem\(resumeKey\)\)/.test(app),"clientApp: daily mission resume key access is protected");
  });

  await group("portuguese-durable-completion","negative-control",({check})=>{
    const route=candidateFile("app/components/PortuguesePassageMiniExamRoute.js")||"";
    const exam=candidateFile("app/components/PortuguesePassageMiniExam.js")||"";
    const subject=candidateFile("app/components/PortugueseSubject.js")||"";
    check(/saveLocalStateDurably\(next\)/.test(route),"Portuguese mini-exam completion requires durable save");
    check(/onComplete\?\.\([^)]*\)\)===false/.test(exam)||/===false\)\{\s*completedRef\.current=false/.test(exam),"mini-exam keeps the attempt when completion is not durable");
    const a=subject.indexOf("if(session.current===session.items.length-1){"),b=subject.indexOf("setSession(current=>({...current,finished:true}))",a);
    const body=a>=0&&b>a?subject.slice(a,b):"";
    check(/saveLocalStateDurably\(completed\)/.test(body),"Portuguese session completion requires durable save before finishing");
  });

  // ---- Exceção documentada -----------------------------------------------
  await group("raw-recovery-gap","documented-exception",async({check})=>{
    const source=candidateFile("app/lib/cloudRecovery.js");
    if(source===null)return {status:"not_applicable",detail:"sem percurso de exportação cloud neste candidato"};
    check(/CLOUD_RECOVERY_ORIGIN_UNPROVEN/.test(source),"unproven-origin export remains refused");
    check(/JSON\.parse\(record\.raw\)[\s\S]{0,120}CLOUD_RECOVERY_ORIGIN_UNPROVEN/.test(source),"unreadable JSON without proven owner is refused");
    return {status:"exception_blocked",detail:"exportação de JSON ilegível sem dono comprovado continua bloqueada; recuperação assistida proposta em docs/security/raw-recovery-gap.md"};
  });

  const failed=groups.filter(g=>g.status==="fail");
  const summary={result:failed.length?"FAIL":"PASS",mode:"shadow",candidate:candidateRef||"working-tree",groups,production,safety,combined,storage:"synthetic memory only",network:false};
  if(asJson)console.log(JSON.stringify(summary,null,1));
  else{
    for(const g of groups)console.log(`${g.status==="fail"?"✗":g.status==="pass"?"✓":"•"} [${g.kind}] ${g.name}: ${g.status} (${g.checks} checks)${g.error?" — "+g.error:""}${g.detail?" — "+JSON.stringify(g.detail):""}`);
    console.log(`SHADOW CONTRACT: ${summary.result} (${groups.length-failed.length}/${groups.length} groups without failure)`);
  }
  process.exitCode=failed.length?1:0;
}finally{rmSync(dir,{recursive:true,force:true});}
