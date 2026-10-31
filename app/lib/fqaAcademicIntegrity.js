import {recordErrorPatternEvidence} from "./recurringErrorMemory.js";
import {physicsChemistryItemById} from "../data/physicsChemistryFoundation.js";
import {canonicalSubjectId} from "./subjectWorkspace.js";

export const FQA_SUBJECT="physics-chemistry-a";
export const FQA_ACADEMIC_POLICY=1;
const list=value=>Array.isArray(value)?value:[];
export function stableAcademicValue(value){
  if(Array.isArray(value))return value.map(stableAcademicValue);
  if(value&&typeof value==="object")return Object.fromEntries(Object.keys(value).sort().filter(key=>value[key]!==undefined).map(key=>[key,stableAcademicValue(value[key])]));
  return value;
}
const key=value=>JSON.stringify(stableAcademicValue(value));
const unique=rows=>[...new Map(rows.map(row=>[key(row),row])).values()];
const history=progress=>{
  if(!progress||typeof progress!=="object")return [];
  const {integrityHistory:_history,academicProjection:_projection,...original}=progress;
  const archives=list(progress.integrityHistory).filter(row=>row&&typeof row==="object");
  const metadata=row=>{const {sessions,missionHistory,completedSessionIds,interruptedTechnicalSessions,lastPosition,integrityPendingVariants,integrityPendingConflict,academicIntegrityPolicy,...rest}=row;return rest};
  return archives.some(row=>key(metadata(row))===key(metadata(original)))?archives:unique([...archives,original]);
};

function compatible(a,b){
  if(a===undefined||b===undefined)return true;
  if(a===null||b===null||typeof a!=="object"||typeof b!=="object")return key(a)===key(b);
  if(Array.isArray(a)||Array.isArray(b))return Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((v,i)=>compatible(v,b[i]));
  return Object.keys(a).every(k=>compatible(a[k],b[k]))&&Object.keys(b).every(k=>compatible(a[k],b[k]));
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
  if(!left)return right;
  if(!right)return left;
  const sources=unique([...history(left),...history(right)]);
  const newer=(+left.lastActivityAt||0)>=(+right.lastActivityAt||0)?left:right;
  const current=[left,right,...sources];
  const sessions=unique(current.flatMap(p=>list(p.sessions)));
  const completedIds=new Set(current.flatMap(p=>[...list(p.completedSessionIds),...list(p.sessions).filter(s=>Number.isFinite(s?.completedAt)).map(s=>s?.sessionId)]).filter(Boolean));
  const interrupted=unique(current.flatMap(p=>list(p.interruptedTechnicalSessions)));
  const blockedIds=new Set([...completedIds,...interrupted.map(s=>s?.sessionId)]);
  const positions=unique(current.flatMap(p=>[p.lastPosition,...list(p.integrityPendingVariants)]).filter(Boolean));
  const pending=unique([left,right].flatMap(p=>[p.lastPosition,...(p.integrityPendingConflict?list(p.integrityPendingVariants):[])]).filter(p=>p&&!blockedIds.has(p.sessionId)));
  return {...newer,subjectId:FQA_SUBJECT,integrityHistory:sources,
    integrityConflictedSessionIds:sessionConflicts(current),
    sessions,missionHistory:unique(current.flatMap(p=>list(p.missionHistory))),
    completedSessionIds:[...completedIds],interruptedTechnicalSessions:interrupted,
    diagnosticDone:sources.some(p=>p.diagnosticDone),
    integrityPendingVariants:positions,
    lastPosition:pending.find(p=>key(p)===key(newer.lastPosition))||null,
    integrityPendingConflict:unique(pending.map(p=>p.sessionId)).length>1||pending.some(p=>p.sessionId===pending[0]?.sessionId&&key(p)!==key(pending[0])),
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
  if(progress?.academicIntegrityPolicy===FQA_ACADEMIC_POLICY&&entries.length===1&&entries[0][0]===FQA_SUBJECT&&key(progress.integrityConflictedSessionIds)===key(conflicted))return state;
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
  if(item.responseType==="stepwise"&&result.gradingMode==="structured-provisional"&&!result.requiresReview&&Number.isFinite(result.provisionalPoints)&&result.maxPoints===item.maxPoints&&result.provisionalPoints>=0&&result.provisionalPoints<=result.maxPoints&&list(result.steps).length>0&&list(result.steps).length===list(item.steps).length&&new Set(result.steps.map(s=>s.id)).size===result.steps.length&&Math.abs(result.steps.reduce((sum,s)=>sum+(s.points||0),0)-(result.penalty||0)-result.provisionalPoints)<0.11&&item.steps.every(step=>list(result.steps).some(row=>row?.id===step.id&&row.maxPoints===step.points&&Number.isFinite(row.points)&&row.points>=0&&row.points<=row.maxPoints)))return {eligible:true,policyVersion:1,lane:"recorded-structured",itemId:item.id,reason:"catalog_and_result_contract"};
  return excluded("unverifiable_result_contract");
}

// This is a read-only projection, never a replacement for persisted history.
// Only identifiable retained events are replayed. Opaque lifetime totals are not.
export function projectFqaAcademicProgress(progress={}){
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
      errorPatterns=recordErrorPatternEvidence(errorPatterns,item,result,session.completedAt);
      if(session.kind==="training")return;
      const id=item.competencyId||`${item.domain}:general`;
      const previous=competence[id]||{domainId:item.domain,label:item.competencyLabel||null,attempts:0,correct:0,deterministicAttempts:0,structuredScoredAttempts:0,structuredNormalizedEarned:0,rubricObserved:0,rubricNeedsReview:0,rubricReviews:0};
      const row={...previous,attempts:previous.attempts+1};
      if(eligibility.lane==="recorded-objective"){row.deterministicAttempts++;row.correct+=result.correct?1:0}
      else{row.structuredScoredAttempts++;row.structuredNormalizedEarned+=result.provisionalPoints/result.maxPoints}
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
