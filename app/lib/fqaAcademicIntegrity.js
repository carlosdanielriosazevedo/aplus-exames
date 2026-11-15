import {recordErrorPatternEvidence} from "./recurringErrorMemory.js";
import {physicsChemistryItemById} from "../data/physicsChemistryFoundation.js";
import {canonicalSubjectId} from "./subjectWorkspace.js";
import {fqaProgressForCloud} from "./fqaCloudProjection.js";

export const FQA_SUBJECT="physics-chemistry-a";
export const FQA_ACADEMIC_POLICY=2;
const list=value=>Array.isArray(value)?value:[];
const record=value=>!!value&&typeof value==="object"&&!Array.isArray(value);
export const FQA_PRIVATE_RESPONSE_FIELDS=new Set(["answers","answer","currentAnswer","responseText","previousResponseText","studentEvidence"]);
const ADMINISTRATIVE_FIELDS=new Set(["updatedAt","lastActivityAt","_savedAt","integrityPrivacyOmissions","label","integrityOriginalLabel","domain"]);
const privateBit=field=>1<<[...FQA_PRIVATE_RESPONSE_FIELDS].indexOf(field);
const wasRedacted=(object,field)=>Number.isInteger(object?.integrityPrivacyOmissions)&&!!(object.integrityPrivacyOmissions&privateBit(field));
const unprovenPrivate=value=>Array.isArray(value)?value.some(unprovenPrivate):record(value)&&(
  [...FQA_PRIVATE_RESPONSE_FIELDS].some(field=>value[field]===undefined&&wasRedacted(value,field))||
  Object.entries(value).some(([field,nested])=>!ADMINISTRATIVE_FIELDS.has(field)&&unprovenPrivate(nested)));

function privateFields(value,legacyRead){
  if(Array.isArray(value))return value.map(row=>privateFields(row,legacyRead));
  if(!record(value))return value;
  const out={};let mask=Number.isInteger(value.integrityPrivacyOmissions)?value.integrityPrivacyOmissions:0;
  for(const field of FQA_PRIVATE_RESPONSE_FIELDS){
    if(legacyRead?value[field]===undefined:Object.hasOwn(value,field))mask|=privateBit(field);
  }
  for(const [field,nested] of Object.entries(value)){
    if(!legacyRead&&FQA_PRIVATE_RESPONSE_FIELDS.has(field))continue;
    out[field]=privateFields(nested,legacyRead);
  }
  if(mask)out.integrityPrivacyOmissions=mask;
  return out;
}
export const redactFqaProgress=fqaProgressForCloud;
export const readFqaCloudProgress=progress=>privateFields(progress,true);
export function stableAcademicValue(value){
  if(Array.isArray(value))return value.map(stableAcademicValue);
  if(value&&typeof value==="object")return Object.fromEntries(Object.keys(value).sort().filter(key=>value[key]!==undefined).map(key=>[key,stableAcademicValue(value[key])]));
  return value;
}
const key=value=>JSON.stringify(stableAcademicValue(value));
const unique=rows=>[...new Map(rows.map(row=>[key(row),row])).values()];
// Runtime observations are deliberately outside serializable state. A local
// fingerprint/flag cannot mint them. They expire on a full reload; this is not
// a server receipt, a human attestation or protection from arbitrary client code.
const engineObservations=new WeakMap();
const activeContexts=new Map();
const completedObservations=new Map();
const SESSION_KINDS=new Set(["diagnostic","mission","training","mini_exam","full_exam","practice_exam"]);
const contextKey=session=>key({sessionId:session?.sessionId,kind:session?.kind,itemIds:session?.itemIds});
const eventKey=session=>key({context:contextKey(session),startedAt:session?.startedAt,completedAt:session?.completedAt,results:list(session?.results).map(result=>record(result)?resultContract(result):null)});
const observationKey=(item,result)=>key({item:itemFingerprint(item),result:resultContract(result)});

export function observeFqaEngineResult(item,result,session,index=0){
  const position=session&&{...session,itemIds:session.itemIds||session.items?.map(row=>row.id)};
  const context=contextFor(position);
  if(context&&item&&record(result)&&position.itemIds[index]===item.id)engineObservations.set(result,{result:observationKey(item,result),identity:context.identity,startedAt:context.startedAt,index});
  return result;
}

export function beginFqaRuntimeContext({sessionId,kind,itemIds,startedAt}){
  if(typeof sessionId!=="string"||!sessionId||!SESSION_KINDS.has(kind)||!Array.isArray(itemIds)||!itemIds.length||!itemIds.every(id=>!!physicsChemistryItemById(id))||!Number.isFinite(startedAt))return false;
  const existing=activeContexts.get(sessionId),identity=contextKey({sessionId,kind,itemIds});
  if(existing)return existing.identity===identity&&existing.startedAt===startedAt;
  activeContexts.set(sessionId,{identity,startedAt,results:new Map()});
  return true;
}

function contextFor(session){
  const context=activeContexts.get(session?.sessionId);
  return context&&context.identity===contextKey(session)&&(session.startedAt===undefined||session.startedAt===context.startedAt)?context:null;
}

function observedEngine(item,result,session,index){
  const context=contextFor(session),observation=engineObservations.get(result);
  return !!context&&observation?.identity===context.identity&&observation.startedAt===context.startedAt&&observation.index===index&&observation.result===observationKey(item,result);
}

export function observeFqaPendingResults(position,results){
  const context=contextFor(position);
  if(!context)return;
  list(results).forEach((result,index)=>{
    const item=physicsChemistryItemById(position.itemIds[index]);
    if(item&&record(result)&&observedEngine(item,result,position,index))context.results.set(index,observationKey(item,result));
  });
}

export function observeFqaCompletion(session,items,results){
  const context=contextFor(session);
  if(!context||!Number.isFinite(session.completedAt))return;
  const verified=new Set();
  list(results).forEach((result,index)=>{
    const item=items[index];
    if(!item||item.id!==session.itemIds[index]||!record(result))return;
    const observed=observationKey(item,result);
    if(observedEngine(item,result,session,index)||context.results.get(index)===observed)verified.add(index);
  });
  if(verified.size)completedObservations.set(eventKey(session),verified);
}

function observedResult(item,result,session,index){
  if(!record(session)||!SESSION_KINDS.has(session.kind)||session.itemIds?.[index]!==item?.id)return false;
  if(Number.isFinite(session.completedAt))return completedObservations.get(eventKey(session))?.has(index)===true;
  return observedEngine(item,result,session,index)||contextFor(session)?.results.get(index)===observationKey(item,result);
}
const history=progress=>{
  if(!record(progress))return progress===undefined?[]:[{integrityMalformedRoot:progress}];
  const {integrityHistory:_history,academicProjection:_projection,...original}=progress;
  const archives=list(progress.integrityHistory).filter(row=>row&&typeof row==="object");
  const metadata=row=>{const {sessions,missionHistory,completedSessionIds,interruptedTechnicalSessions,lastPosition,integrityPendingVariants,integrityPendingConflict,academicIntegrityPolicy,...rest}=row;return rest};
  return archives.some(row=>key(metadata(row))===key(metadata(original)))?archives:unique([...archives,original]);
};

export function compareFqaAttemptVersions(a,b){
  if(a===undefined||b===undefined)return a===b?"equal":"different";
  if(a===null||b===null||typeof a!=="object"||typeof b!=="object")return key(a)===key(b)?"equal":"different";
  if(Array.isArray(a)||Array.isArray(b)){
    if(!Array.isArray(a)||!Array.isArray(b)||a.length!==b.length)return "different";
    const comparisons=a.map((value,index)=>compareFqaAttemptVersions(value,b[index]));
    return comparisons.includes("different")?"different":comparisons.includes("unknown")?"unknown":"equal";
  }
  let unknown=unprovenPrivate(a)||unprovenPrivate(b);
  for(const field of new Set([...Object.keys(a),...Object.keys(b)])){
    if(ADMINISTRATIVE_FIELDS.has(field))continue;
    if(FQA_PRIVATE_RESPONSE_FIELDS.has(field)&&((a[field]===undefined&&wasRedacted(a,field))||(b[field]===undefined&&wasRedacted(b,field)))){unknown=true;continue}
    const comparison=compareFqaAttemptVersions(a[field],b[field]);
    if(comparison==="different")return "different";
    if(comparison==="unknown")unknown=true;
  }
  return unknown?"unknown":"equal";
}
// Unknown transport omissions are not a known contradiction between completed
// facts. They never establish equality or authorize a paused continuation.
const nonContradictory=(a,b)=>compareFqaAttemptVersions(a,b)!=="different";

// Only fill fields deliberately omitted by cloud privacy. Unknown missing fields,
// identity, position, submitted results and original clocks are not wildcards.
function restorePrivateFields(target,source){
  if(Array.isArray(target)&&Array.isArray(source))return target.map((value,i)=>restorePrivateFields(value,source[i]));
  if(!record(target)||!record(source))return target;
  const out={...target};
  for(const k of Object.keys(source)){
    if(FQA_PRIVATE_RESPONSE_FIELDS.has(k)&&out[k]===undefined){out[k]=source[k];out.integrityPrivacyOmissions=(out.integrityPrivacyOmissions||0)&~privateBit(k)}
    else if(out[k]!==undefined)out[k]=restorePrivateFields(out[k],source[k]);
  }
  return out;
}

// Legacy true flags may represent real private divergence that cloud has erased.
// Clear an old false administrative conflict only if all original private fields
// remain available. Otherwise stop for a safe manual resolution.
function completePrivatePending(position){
  return record(position)&&Object.hasOwn(position,"currentAnswer")&&
    list(position.results).every(result=>!result||result.status==="unanswered"||Object.hasOwn(result,"responseText"))&&
    (!position.currentResult||Object.hasOwn(position.currentResult,"responseText"));
}

export function fqaSessionLabel(kind){
  switch(kind){
    case "diagnostic":return "Diagnóstico";
    case "mission":return "Missão";
    case "training":return "Treino livre";
    case "mini_exam":return "Mini-exame";
    case "full_exam":return "Exame completo";
    case "practice_exam":return "Prova de treino";
    default:return "Sessão de Física e Química A";
  }
}

export function fqaPendingNotice(progress){
  if(!progress?.integrityPendingConflict)return null;
  if(progress.integrityPendingConflictKind==="privacy-unproven")return "Não foi possível confirmar esta retoma. A cópia cloud não contém as respostas privadas necessárias para demonstrar equivalência. As respostas locais foram conservadas e a tentativa não foi reiniciada. A retoma precisa de resolução segura; conserva também a cópia no dispositivo de origem, se estiver disponível.";
  return "Há versões diferentes de uma tentativa. As respostas foram conservadas; a retoma precisa de resolução segura.";
}

export function fqaRecoveryState(progress){
  const blocked=progress?.integrityRecoveryBlocked===true;
  const position=progress?.lastPosition,fields=Object.keys(record(progress?.integrityRecoveryFields)?progress.integrityRecoveryFields:{});
  // A readable frontier may be displayed even when missing earlier submissions
  // forbid continuation. Display permission never grants a write/resume permit.
  const readablePosition=blocked&&fields.length===1&&fields[0]==="lastPosition"&&record(position)&&
    SESSION_KINDS.has(position.kind)&&Array.isArray(position.itemIds)&&position.itemIds.length>0&&position.itemIds.every(id=>!!physicsChemistryItemById(id))&&
    Number.isInteger(position.current)&&position.current>=0&&position.current<position.itemIds.length&&Number.isFinite(position.startedAt);
  return {blocked,readablePosition,message:"Não foi possível recuperar o histórico de Física e Química A com segurança. Os dados originais foram conservados. Podes consultar a posição guardada e mudar de disciplina; a retoma e a conclusão estão bloqueadas até existir uma resolução segura."};
}

export function normalizeFqaProgress(progress){
  const source=record(progress)?progress:{};
  const out={...source,subjectId:FQA_SUBJECT};
  let changed=!record(progress)||source.subjectId!==FQA_SUBJECT,blocked=source.integrityRecoveryBlocked===true||(progress!==undefined&&!record(progress));
  const recoveryFields=record(source.integrityRecoveryFields)?{...source.integrityRecoveryFields}:{};
  for(const field of ["integrityRecoveryBlocked","integrityPendingConflict"]){
    if(Object.hasOwn(source,field)&&typeof source[field]!=="boolean"){
      recoveryFields[field]=source[field];out[field]=true;blocked=true;changed=true;
    }
  }
  if(source.integrityPendingConflictKind!=null&&!["semantic-v1","legacy-unresolved","privacy-unproven"].includes(source.integrityPendingConflictKind)){
    recoveryFields.integrityPendingConflictKind=source.integrityPendingConflictKind;
    out.integrityPendingConflictKind="legacy-unresolved";blocked=true;changed=true;
  }
  if(source.subjectId!==undefined&&source.subjectId!==FQA_SUBJECT){recoveryFields.subjectId=source.subjectId;blocked=true}
  for(const field of ["sessions","missionHistory","completedSessionIds","interruptedTechnicalSessions","integrityHistory","integrityPendingVariants","integrityConflictedSessionIds"]){
    const original=source[field];
    const rows=list(original);
    const isId=field==="completedSessionIds"||field==="integrityConflictedSessionIds";
    const valid=rows.filter(value=>isId?(typeof value==="string"||typeof value==="number"):record(value));
    const malformed=original!==undefined&&(!Array.isArray(original)||valid.length!==rows.length);
    if(!Array.isArray(original)||malformed){out[field]=valid;changed=true}
    if(malformed){recoveryFields[field]=original;blocked=true}
  }
  for(const field of ["competence","errorPatterns"]){
    if(!record(source[field])){
      out[field]={};changed=true;
      if(source[field]!==undefined){recoveryFields[field]=source[field];blocked=true}
    }
  }
  const position=source.lastPosition;
  if(position!==undefined&&position!==null){
    const alreadyBlocked=source.integrityRecoveryBlocked&&Object.hasOwn(recoveryFields,"lastPosition")&&
      record(position)&&Array.isArray(position.itemIds)&&Array.isArray(position.results)&&Number.isInteger(position.current);
    const valid=record(position)&&typeof position.sessionId==="string"&&!!position.sessionId&&
      typeof position.kind==="string"&&Array.isArray(position.itemIds)&&position.itemIds.length>0&&
      position.itemIds.every(id=>typeof id==="string")&&Number.isInteger(position.current)&&
      position.current>=0&&position.current<position.itemIds.length&&Number.isFinite(position.startedAt)&&
      (position.results===undefined||(Array.isArray(position.results)&&position.results.every(r=>r===null||record(r))))&&
      (position.currentResult===undefined||position.currentResult===null||record(position.currentResult));
    if(!valid&&!alreadyBlocked){
      if(!Object.hasOwn(recoveryFields,"lastPosition"))recoveryFields.lastPosition=position;
      out.lastPosition=record(position)?{...position,itemIds:list(position.itemIds).filter(id=>typeof id==="string"),results:list(position.results).filter(r=>r===null||record(r)),currentResult:record(position.currentResult)?position.currentResult:null,current:Number.isInteger(position.current)&&position.current>=0?position.current:0}:null;
      changed=true;blocked=true;
    }
    else if(position.results===undefined){out.lastPosition={...position,results:[]};changed=true}
    if(record(out.lastPosition)&&(typeof position.label!=="string"||!position.label.trim())){
      out.lastPosition={...out.lastPosition,label:fqaSessionLabel(position.kind),
        ...(Object.hasOwn(position,"label")&&!Object.hasOwn(position,"integrityOriginalLabel")?{integrityOriginalLabel:position.label}:{})};
      changed=true;
    }
    if(valid&&!blocked&&Array.isArray(out.lastPosition.results)){
      const saved=out.lastPosition,results=saved.results;
      if(saved.current>results.length||results.length>saved.current+1||(record(saved.currentResult)&&results[saved.current]===null)){
        if(!Object.hasOwn(recoveryFields,"lastPosition"))recoveryFields.lastPosition=position;
        blocked=true;changed=true;
      }else if(record(saved.currentResult)){
        if(results.length===saved.current){
          // This exact submitted result is present; no earlier missing response
          // or grade is inferred. The original shorter array stays archived.
          out.lastPosition={...saved,results:[...results,saved.currentResult]};changed=true;
        }else{
          const comparison=compareFqaAttemptVersions(results[saved.current],saved.currentResult);
          if(comparison!=="equal"){
            const kind=comparison==="different"?"semantic-v1":out.integrityPendingConflictKind==="semantic-v1"?"semantic-v1":"privacy-unproven";
            if(out.integrityPendingConflict!==true||out.integrityPendingConflictKind!==kind)changed=true;
            out.integrityPendingConflict=true;
            out.integrityPendingConflictKind=kind;
          }
        }
      }
    }
  }else if(position===undefined){out.lastPosition=null;changed=true}
  if(record(out.lastPosition)&&unprovenPrivate(out.lastPosition)&&!out.integrityPendingConflict){
    out.integrityPendingConflict=true;out.integrityPendingConflictKind="privacy-unproven";changed=true;
  }
  if(!changed)return source;
  const {integrityHistory:_archive,...original}=source;
  out.integrityHistory=unique([...history(progress),...(record(progress)?[original]:[]),...list(out.integrityHistory)]);
  out.integrityRecoveryBlocked=blocked;
  if(Object.keys(recoveryFields).length)out.integrityRecoveryFields=recoveryFields;
  return out;
}
function sessionConflicts(sources){
  const groups=new Map();
  for(const p of sources)for(const row of [...list(p?.sessions),...list(p?.missionHistory)]){
    if(!row?.sessionId)continue;
    const variants=groups.get(row.sessionId)||[];variants.push(row);groups.set(row.sessionId,variants);
  }
  return [...new Set([...sources.flatMap(p=>list(p?.integrityConflictedSessionIds)),...[...groups].filter(([,rows])=>rows.some(a=>rows.some(b=>!nonContradictory(a,b)))).map(([id])=>id)])].sort();
}

// Whole source variants remain recoverable; no timestamp can discard a response.
// Archives are deliberately not capped: quota failure must keep the old storage.
export function mergeFqaHistory(left,right){
  if(left===undefined&&right===undefined)return undefined;
  if(left===undefined)return normalizeFqaProgress(right);
  if(right===undefined)return normalizeFqaProgress(left);
  left=normalizeFqaProgress(left);right=normalizeFqaProgress(right);
  const sources=unique([...history(left),...history(right)]);
  const newer=(+left.lastActivityAt||0)>=(+right.lastActivityAt||0)?left:right;
  const current=[left,right,...sources];
  const sessions=unique(current.flatMap(p=>list(p.sessions)));
  const completedIds=new Set(current.flatMap(p=>[...list(p.completedSessionIds),...list(p.sessions).filter(s=>Number.isFinite(s?.completedAt)).map(s=>s?.sessionId)]).filter(Boolean));
  const interrupted=unique(current.flatMap(p=>list(p.interruptedTechnicalSessions)));
  const blockedIds=new Set([...completedIds,...interrupted.map(s=>s?.sessionId)]);
  const positions=unique(current.flatMap(p=>[p.lastPosition,...list(p.integrityPendingVariants)]).filter(Boolean));
  const pending=unique([left,right].flatMap(p=>[p.lastPosition,...(p.integrityPendingConflict?list(p.integrityPendingVariants):[])]).filter(p=>p&&!blockedIds.has(p.sessionId)));
  const semanticConflict=pending.some(a=>pending.some(b=>compareFqaAttemptVersions(a,b)==="different"));
  const privacyUnproven=pending.some(unprovenPrivate);
  const unresolved=[left,right].some(p=>p.integrityPendingConflict&&(
    p.integrityPendingConflictKind==="semantic-v1"||p.integrityPendingConflictKind==="legacy-unresolved"||p.integrityPendingConflictKind==="privacy-unproven"||
    !list(p.integrityPendingVariants).length||!list(p.integrityPendingVariants).every(completePrivatePending)));
  const pendingConflict=semanticConflict||privacyUnproven||unresolved;
  let lastPosition=pending.find(p=>key(p)===key(newer.lastPosition))||null;
  if(lastPosition&&!pendingConflict)for(const variant of pending)lastPosition=restorePrivateFields(lastPosition,variant);
  return {...newer,subjectId:FQA_SUBJECT,integrityHistory:sources,
    integrityConflictedSessionIds:sessionConflicts(current),
    sessions,missionHistory:unique(current.flatMap(p=>list(p.missionHistory))),
    completedSessionIds:[...completedIds],interruptedTechnicalSessions:interrupted,
    diagnosticDone:sources.some(p=>p.diagnosticDone),
    integrityPendingVariants:positions,
    lastPosition,
    integrityRecoveryBlocked:left.integrityRecoveryBlocked||right.integrityRecoveryBlocked||false,
    integrityPendingConflict:pendingConflict,
    integrityPendingConflictKind:semanticConflict||[left,right].some(p=>p.integrityPendingConflict&&p.integrityPendingConflictKind==="semantic-v1")?"semantic-v1":privacyUnproven||[left,right].some(p=>p.integrityPendingConflictKind==="privacy-unproven")?"privacy-unproven":unresolved?"legacy-unresolved":null,
    lastActivityAt:Math.max(+left.lastActivityAt||0,+right.lastActivityAt||0)||null};
}

// Additive policy marker only. Cached projections from any device are never trusted.
export function prepareFqaAcademicState(state){
  if(!state||typeof state!=="object")return state;
  const entries=Object.entries(state.subjectProgress||{}).filter(([id])=>canonicalSubjectId(id)===FQA_SUBJECT);
  if(!entries.length)return state;
  let progress;
  for(const [,row] of entries)progress=mergeFqaHistory(progress,row);
  const conflicted=sessionConflicts([progress,...history(progress)]);
  if(progress?.academicIntegrityPolicy===FQA_ACADEMIC_POLICY&&entries.length===1&&entries[0][0]===FQA_SUBJECT&&progress===entries[0][1]&&key(progress.integrityConflictedSessionIds)===key(conflicted))return state;
  return {...state,subjectProgress:{...state.subjectProgress,[FQA_SUBJECT]:{...progress,integrityHistory:history(progress),integrityConflictedSessionIds:conflicted,academicIntegrityPolicy:FQA_ACADEMIC_POLICY}}};
}

// Integrity provenance binds the retained result contract to this catalog revision.
// This is reproducible source attribution, NOT a signature or human attestation.
function fingerprint(value){
  const text=key(value);let hash=2166136261;
  for(let i=0;i<text.length;i++){hash^=text.charCodeAt(i);hash=Math.imul(hash,16777619)}
  return `fqa1-${(hash>>>0).toString(16)}`;
}
function itemFingerprint(item){
  const {examPoints:_points,examSection:_section,examOrder:_order,...catalogItem}=item;
  return fingerprint(catalogItem);
}
function resultContract(result){
  return {status:result.status,final:!!result.final,correct:result.correct??null,points:Number.isFinite(result.points)?result.points:null,
    maxPoints:result.maxPoints,provisionalPoints:Number.isFinite(result.provisionalPoints)?result.provisionalPoints:null,
    gradingMode:result.gradingMode,requiresReview:!!result.requiresReview,penalty:result.penalty||0,
    steps:list(result.steps).map(s=>({id:s?.id,status:s?.status,points:s?.points,maxPoints:s?.maxPoints,errorType:s?.errorType||null}))};
}
export function verifiedFqaAcademicResult(item,result,session,index=0){
  return fqaResultEligibility(item,result,session,index).eligible?resultContract(result):null;
}
// Historical display/completion facts remain available, but replay never carries
// unsigned diagnostic extensions back into recommendations. An unverified saved
// assessment stays submitted and is explicitly not presented as a validated grade.
export function restoreFqaResultView(item,snapshot,session,index=0){
  if(!record(snapshot))return snapshot===null?null:undefined;
  const verified=fqaResultEligibility(item,snapshot,session,index).eligible;
  const contract=resultContract(snapshot);
  return {...contract,
    steps:contract.steps.map(step=>({...step,...(verified?{expected:list(item.steps).find(row=>row.id===step.id)?.expected}:{} )})),
    ...(snapshot.academicProvenance?{academicProvenance:snapshot.academicProvenance}:{}),
    responseText:typeof snapshot.responseText==="string"?snapshot.responseText:"",
    historicalAssessmentUnverified:!verified};
}
export function stampFqaResult(item,result){
  if(!["multiple-choice","stepwise"].includes(item?.responseType))return result;
  return {...result,academicProvenance:{policyVersion:1,source:"fqa-recorded-engine-v1",itemFingerprint:itemFingerprint(item),resultFingerprint:fingerprint(resultContract(result))}};
}

export function fqaResultContractEligibility(item,result){
  const excluded=reason=>({eligible:false,policyVersion:FQA_ACADEMIC_POLICY,reason});
  if(!item||!result)return excluded("missing_source");
  // No human attestation verifier exists in this release. Flags and free-form
  // provenance claims cannot promote scientific prose to validated evidence.
  if(item.responseType==="restricted-response")return excluded("unvalidated_scientific_response");
  if(result.status==="unanswered")return excluded("unanswered");
  const source=result.academicProvenance;
  if(source?.policyVersion!==1||source.source!=="fqa-recorded-engine-v1"||source.itemFingerprint!==itemFingerprint(item)||source.resultFingerprint!==fingerprint(resultContract(result)))return excluded("missing_or_changed_provenance");
  if(item.responseType==="multiple-choice"&&result.final===true&&result.gradingMode==="deterministic"&&typeof result.correct==="boolean"&&result.maxPoints===(item.maxPoints||10)&&result.points===(result.correct?result.maxPoints:0))return {eligible:true,policyVersion:1,lane:"recorded-objective",itemId:item.id,reason:"catalog_and_result_contract"};
  if(item.responseType==="stepwise"&&result.gradingMode==="structured-provisional"&&!result.requiresReview&&Number.isFinite(result.provisionalPoints)&&result.maxPoints===item.maxPoints&&result.provisionalPoints>=0&&result.provisionalPoints<=result.maxPoints&&list(result.steps).every(record)&&list(result.steps).length>0&&list(result.steps).length===list(item.steps).length&&new Set(result.steps.map(s=>s.id)).size===result.steps.length&&Math.abs(result.steps.reduce((sum,s)=>sum+(s.points||0),0)-(result.penalty||0)-result.provisionalPoints)<0.11&&item.steps.every(step=>list(result.steps).some(row=>row?.id===step.id&&row.maxPoints===step.points&&Number.isFinite(row.points)&&row.points>=0&&row.points<=row.maxPoints)))return {eligible:true,policyVersion:1,lane:"recorded-structured",itemId:item.id,reason:"catalog_and_result_contract"};
  return excluded("unverifiable_result_contract");
}

export function fqaResultEligibility(item,result,session,index=0){
  const contract=fqaResultContractEligibility(item,result);
  if(!contract.eligible)return contract;
  if(!observedResult(item,result,session,index))return {eligible:false,policyVersion:FQA_ACADEMIC_POLICY,reason:"unverified_session_context"};
  return {...contract,policyVersion:FQA_ACADEMIC_POLICY,context:"current-runtime-observation",kind:session.kind};
}

export function fqaExamResultPresentation(item,result,session,index=0){
  const unanswered=!result||result.status==="unanswered";
  const eligibility=fqaResultEligibility(item,result,session,index);
  if(!eligibility.eligible)return {eligible:false,points:null,provisional:false,pending:!unanswered,label:unanswered?"Sem resposta":"Sem avaliação verificável"};
  const maximum=Number.isFinite(item.examPoints)?item.examPoints:result.maxPoints;
  if(eligibility.lane==="recorded-objective")return {eligible:true,points:result.correct?maximum:0,provisional:false,pending:false,label:result.correct?"Correto":"A rever"};
  return {eligible:true,points:Math.round(result.provisionalPoints/result.maxPoints*maximum*10)/10,provisional:true,pending:false,label:"Provisório"};
}

// Every academic presentation uses the same eligibility boundary as indicators.
// Submitted/answered is a historical fact; correct/incorrect/completed grading
// is never inferred from untrusted flags on that historical record.
export function fqaAssessmentPresentation(session,progress){
  const results=list(session?.results),ids=list(session?.itemIds);
  const unsafe=progress?.integrityRecoveryBlocked||list(progress?.integrityConflictedSessionIds).includes(session?.sessionId);
  let answered=0,unanswered=0,objective=0,correct=0,provisional=0,excluded=0;
  results.forEach((result,index)=>{
    if(!record(result))return;
    if(result.status==="unanswered"){unanswered++;return}
    answered++;
    const item=physicsChemistryItemById(ids[index]),eligibility=fqaResultEligibility(item,result,session,index);
    if(unsafe||!eligibility.eligible){excluded++;return}
    if(eligibility.lane==="recorded-objective"){objective++;if(result.correct===true)correct++}
    else provisional++;
  });
  const total=results.length;
  const summary=!total?"Sessão concluída":excluded?`${answered}/${total} respostas registadas · ${excluded} sem avaliação verificável`:
    provisional?`${answered}/${total} respostas registadas · ${provisional} com avaliação automática provisória`:
    objective?`${objective}/${total} respostas com avaliação verificável`:`${answered}/${total} respostas registadas`;
  return {total,answered,unanswered,objective,correct,provisional,excluded,objectiveCorrectLabel:objective?`${correct}/${objective}`:"—",summary};
}

// This is a read-only projection, never a replacement for persisted history.
// Only identifiable retained events are replayed. Opaque lifetime totals are not.
export function projectFqaAcademicProgress(progress={}){
  progress=normalizeFqaProgress(progress);
  const sources=[progress,...history(progress)],sessions=unique(sources.flatMap(p=>[...list(p.sessions),...list(p.missionHistory)]));
  const groups=new Map();
  for(const session of sessions){
    if(!session?.sessionId)continue;
    const rows=groups.get(session.sessionId)||[];rows.push(session);groups.set(session.sessionId,rows);
  }
  const competence={},provenance=[];
  let errorPatterns={};
  let excluded=0,conflicts=0;
  for(const [sessionId,variants] of [...groups].sort(([a,ar],[b,br])=>(+ar[0]?.completedAt||0)-(+br[0]?.completedAt||0)||String(a).localeCompare(String(b)))){
    // Missing private text in a cloud copy is not a divergent answer. Conflicting
    // present values, marks, identities or event metadata do block all variants.
    if(sources.some(p=>list(p.integrityConflictedSessionIds).includes(sessionId))||variants.some(a=>variants.some(b=>!nonContradictory(a,b)))){conflicts++;continue}
    const session=variants[0];
    if(!Number.isFinite(session.completedAt)||!Array.isArray(session.itemIds)||!Array.isArray(session.results))continue;
    if(session.itemIds.length!==session.results.length){excluded+=session.itemIds.length;continue}
    session.itemIds.forEach((itemId,index)=>{
      const result=session.results[index],item=physicsChemistryItemById(itemId),eligibility=fqaResultEligibility(item,result,session,index);
      if(!eligibility.eligible){if(result?.status!=="unanswered")excluded++;return}
      const verified=resultContract(result);
      errorPatterns=recordErrorPatternEvidence(errorPatterns,item,verified,session.completedAt);
      if(session.kind==="training")return;
      const id=item.competencyId||`${item.domain}:general`;
      const previous=competence[id]||{domainId:item.domain,label:item.competencyLabel||null,attempts:0,correct:0,deterministicAttempts:0,structuredScoredAttempts:0,structuredNormalizedEarned:0,rubricObserved:0,rubricNeedsReview:0,rubricReviews:0};
      const row={...previous,attempts:previous.attempts+1};
      if(eligibility.lane==="recorded-objective"){row.deterministicAttempts++;row.correct+=verified.correct?1:0}
      else{row.structuredScoredAttempts++;row.structuredNormalizedEarned+=verified.provisionalPoints/verified.maxPoints}
      competence[id]=row;
      provenance.push({sessionId,itemId,index,completedAt:session.completedAt,...eligibility});
    });
  }
  return {...progress,competence,errorPatterns,academicProjection:{policyVersion:FQA_ACADEMIC_POLICY,coverage:"current-runtime-verified-contexts-only",excluded,conflicts,provenance,insufficient:!provenance.length}};
}

export function academicProgressFor(state,subjectId){
  if(canonicalSubjectId(subjectId)!==FQA_SUBJECT)return state?.subjectProgress?.[subjectId]||{};
  const prepared=prepareFqaAcademicState(state);
  return projectFqaAcademicProgress(prepared?.subjectProgress?.[FQA_SUBJECT]||{});
}
