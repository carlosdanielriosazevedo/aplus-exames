import {createHash} from "node:crypto";

export const REPORT_CATEGORIES=new Set(["wrong","unclear","difficulty","typo","other"]);
export const REPORT_SUBJECTS=new Set(["math-a","portuguese","physics-chemistry-a"]);
const ITEM_ID=/^[A-Za-z0-9][A-Za-z0-9._:-]{0,159}$/;
const ALLOWED_KEYS=new Set(["itemId","subjectId","category"]);

export function validateContentReport(payload){
  if(!payload||typeof payload!=="object"||Array.isArray(payload))return {ok:false,code:"INVALID_REPORT"};
  if(Object.keys(payload).some(key=>!ALLOWED_KEYS.has(key)))return {ok:false,code:"UNKNOWN_REPORT_FIELD"};
  const {itemId,subjectId=null,category}=payload;
  if(typeof itemId!=="string"||!ITEM_ID.test(itemId))return {ok:false,code:"INVALID_ITEM_ID"};
  if(!REPORT_CATEGORIES.has(category))return {ok:false,code:"INVALID_CATEGORY"};
  if(subjectId!==null&&(typeof subjectId!=="string"||!REPORT_SUBJECTS.has(subjectId)))return {ok:false,code:"INVALID_SUBJECT"};
  return {ok:true,itemId,subjectId:subjectId||"unknown",category};
}

// Limite por conta (em memória da instância): o identificador da conta é usado
// apenas como chave efémera, com hash, e nunca é guardado na base de dados.
const WINDOW_MS=60*60*1000;
const LIMIT=30;
const buckets=new Map();
export function reportRateAllowed(authUserId,now=Date.now()){
  const key=createHash("sha256").update(String(authUserId)).digest("hex").slice(0,24);
  const current=buckets.get(key);
  if(!current||now-current.startedAt>=WINDOW_MS){buckets.set(key,{startedAt:now,count:1});}
  else current.count++;
  if(buckets.size>2000)for(const [id,row] of buckets)if(now-row.startedAt>=WINDOW_MS)buckets.delete(id);
  return buckets.get(key).count<=LIMIT;
}
export function resetReportRateLimit(){buckets.clear()}

export async function insertContentReport(sql,{itemId,subjectId,category},appVersion=null){
  await sql`
    insert into public.content_reports(item_id,subject_id,category,app_version)
    values (${itemId},${subjectId},${category},${appVersion})
  `;
}
