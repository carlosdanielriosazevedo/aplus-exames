import {recordErrorPatternEvidence} from "./recurringErrorMemory.js";
import {physicsChemistryItemById} from "../data/physicsChemistryFoundation.js";
import {canonicalSubjectId} from "./subjectWorkspace.js";

export const FQA_SUBJECT="physics-chemistry-a";
export const FQA_ACADEMIC_POLICY=1;
const list=value=>Array.isArray(value)?value:[];
const record=value=>!!value&&typeof value==="object"&&!Array.isArray(value);
export const FQA_PRIVATE_RESPONSE_FIELDS=new Set(["answers","answer","currentAnswer","responseText","previousResponseText","studentEvidence"]);
const ADMINISTRATIVE_FIELDS=new Set(["updatedAt","lastActivityAt","_savedAt","integrityPrivacyOmissions"]);
const privateBit=field=>1<<[...FQA_PRIVATE_RESPONSE_FIELDS].indexOf(field);
const wasRedacted=(object,field)=>Number.isInteger(object?.integrityPrivacyOmissions)&&!!(object.integrityPrivacyOmissions&privateBit(field));

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
export const redactFqaProgress=progress=>privateFields(progress,false);
export const readFqaCloudProgress=progress=>privateFields(progress,true);
export function stableAcademicValue(value){
  if(Array.isArray(value))return value.map(stableAcademicValue);
  if(value&&typeof value==="object")return Object.fromEntries(Object.keys(value).sort().filter(key=>value[key]!==undefined).map(key=>[key,stableAcademicValue(value[key])]));
  return value;
}
const key=value=>JSON.stringify(stableAcademicValue(value));
const unique=rows=>[...new Map(rows.map(row=>[key(row),row])).values()];
const history=progress=>{
  if(!record(progress))return progress===undefined?[]:[{integrityMalformedRoot:progress}];
  const {integrityHistory:_history,academicProjection:_projection,...original}=progress;
  const archives=list(progress.integrityHistory).filter(row=>row&&typeof row==="object");
  const metadata=row=>{const {sessions,missionHistory,completedSessionIds,interruptedTechnicalSessions,lastPosition,integrityPendingVariants,integrityPendingConflict,academicIntegrityPolicy,...rest}=row;return rest};
  return archives.some(row=>key(metadata(row))===key(metadata(original)))?archives:unique([...archives,original]);
};

function compatible(a,b){
  if(a===undefined||b===undefined)return a===b;
  if(a===null||b===null||typeof a!=="object"||typeof b!=="object")return key(a)===key(b);
  if(Array.isArray(a)||Array.isArray(b))return Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((v,i)=>compatible(v,b[i]));
  return [...new Set([...Object.keys(a),...Object.keys(b)])].every(k=>
    ADMINISTRATIVE_FIELDS.has(k)||
    (FQA_PRIVATE_RESPONSE_FIELDS.has(k)&&((a[k]===undefined&&wasRedacted(a,k))||(b[k]===undefined&&wasRedacted(b,k))))||
    compatible(a[k],b[k]));
}

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

export function normalizeFqaProgress(progress){
  const source=record(progress)?progress:{};
  const out={...source,subjectId:FQA_SUBJECT};
  let changed=!record(progress)||source.subjectId!==FQA_SUBJECT,blocked=source.integrityRecoveryBlocked===true||(progress!==undefined&&!record(progress));
  const recoveryFields=record(source.integrityRecoveryFields)?{...source.integrityRecoveryFields}:{};
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
  }else if(position===undefined){out.lastPosition=null;changed=true}
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
  return [...new Set([...sources.flatMap(p=>list(p?.integrityConflictedSessionIds)),...[...groups].filter(([,rows])=>rows.some(a=>rows.some(b=>!compatible(a,b)))).map(([id])=>id)])].sort();
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
  const semanticConflict=pending.some(a=>pending.some(b=>!compatible(a,b)));
  const unresolved=[left,right].some(p=>p.integrityPendingConflict&&(
    p.integrityPendingConflictKind==="semantic-v1"||p.integrityPendingConflictKind==="legacy-unresolved"||
    !list(p.integrityPendingVariants).length||!list(p.integrityPendingVariants).every(completePrivatePending)));
  const pendingConflict=semanticConflict||unresolved;
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
    integrityPendingConflictKind:semanticConflict||[left,right].some(p=>p.integrityPendingConflict&&p.integrityPendingConflictKind==="semantic-v1")?"semantic-v1":unresolved?"legacy-unresolved":null,
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
export function verifiedFqaAcademicResult(item,result){
  return fqaResultEligibility(item,result).eligible?resultContract(result):null;
}
// Historical display/completion facts remain available, but replay never carries
// unsigned diagnostic extensions back into recommendations. An unverified saved
// assessment stays submitted and is explicitly not presented as a validated grade.
export function restoreFqaResultView(item,snapshot){
  if(!record(snapshot))return snapshot===null?null:undefined;
  const verified=fqaResultEligibility(item,snapshot).eligible;
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

export function fqaResultEligibility(item,result){
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
    if(sources.some(p=>list(p.integrityConflictedSessionIds).includes(sessionId))||variants.some(a=>variants.some(b=>!compatible(a,b)))){conflicts++;continue}
    const session=variants[0];
    if(!Number.isFinite(session.completedAt)||!Array.isArray(session.itemIds)||!Array.isArray(session.results))continue;
    if(session.itemIds.length!==session.results.length){excluded+=session.itemIds.length;continue}
    session.itemIds.forEach((itemId,index)=>{
      const result=session.results[index],item=physicsChemistryItemById(itemId),eligibility=fqaResultEligibility(item,result);
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
  return {...progress,competence,errorPatterns,academicProjection:{policyVersion:1,coverage:"retained-identifiable-events-only",excluded,conflicts,provenance,insufficient:!provenance.length}};
}

export function academicProgressFor(state,subjectId){
  if(canonicalSubjectId(subjectId)!==FQA_SUBJECT)return state?.subjectProgress?.[subjectId]||{};
  const prepared=prepareFqaAcademicState(state);
  return projectFqaAcademicProgress(prepared?.subjectProgress?.[FQA_SUBJECT]||{});
}
