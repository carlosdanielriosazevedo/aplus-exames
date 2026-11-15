// Pure preservation proof shared by local review and the authenticated API.
import {snapshotError,CLOUD_FIELDS,validateCloudSnapshot} from "./cloudSnapshotValidation.js";
import {stableSnapshotJson} from "./cloudStateMerge.js";
const PRIVATE=new Set(["answers","answer","currentAnswer","responseText","previousResponseText","studentEvidence"]);
function stripPrivate(value){
  if(Array.isArray(value))return value.map(stripPrivate);
  if(value&&typeof value==="object")return Object.fromEntries(Object.entries(value).filter(([key])=>!PRIVATE.has(key)).map(([key,item])=>[key,stripPrivate(item)]));
  return value;
}
function containsOriginal(original,copy){
  if(Array.isArray(original)){
    if(!Array.isArray(copy))return false;
    const remaining=new Map();for(const item of copy){const key=stableSnapshotJson(item);remaining.set(key,(remaining.get(key)||0)+1);}
    return original.every(item=>{const key=stableSnapshotJson(item),count=remaining.get(key)||0;if(!count)return false;remaining.set(key,count-1);return true;});
  }
  if(original&&typeof original==="object")return !!copy&&typeof copy==="object"&&!Array.isArray(copy)&&Object.entries(original).every(([key,value])=>containsOriginal(value,copy[key]));
  return original===copy;
}
// Local repair is deliberately conservative: a reviewed file may correct an
// empty malformed container, but cannot discard readable grades/evidence/XP.
export function assertLocalRecoveryCopy(original,copy,{wire=false}={}){
  if(wire)original=stripPrivate(original);
  for(const [key,value] of Object.entries(original)){
    const checked=CLOUD_FIELDS.has(key)?validateCloudSnapshot({schema:"aplus-student-state-v8",[key]:value},{legacy:true,privateFields:false}):{ok:true};
    if(key==="schema"&&/^aplus-student-state-v[1-8]$/.test(value)&&/^aplus-student-state-v[1-8]$/.test(copy.schema)&&Number(copy.schema.at(-1))>=Number(value.at(-1)))continue;
    if(checked.ok){
      if(key==="xp"&&typeof value==="number"&&copy.xp>=value)continue;
      if(!containsOriginal(value,copy[key]))throw snapshotError("CLOUD_RECOVERY_REVIEW_REQUIRED");
    }else if(value!==null&&!(typeof value==="object"&&Object.keys(value).length===0)){
      throw snapshotError("CLOUD_RECOVERY_REVIEW_REQUIRED");
    }
  }
  return copy;
}
