import {getSql,databaseConfigured} from "./db";

const MAX_AGGREGATES=200;
const MAX_ITEM_RESULTS=500;
const MAX_FEEDBACK=50;
const MAX_COMMENT=2000;
const ALLOWED_EVENTS=new Set([
  "app_session","diagnostic_completed","practice_completed","mission_completed",
  "mini_exam_completed","full_exam_completed","review_opened",
  "onboarding_started","onboarding_completed","onboarding_abandoned"
]);
const ALLOWED_OUTCOMES=new Set(["correct","partial","incorrect","skipped"]);

const asDate=value=>/^\d{4}-\d{2}-\d{2}$/.test(String(value||""))?String(value):null;
const cleanSubject=value=>String(value||"all").slice(0,40)||"all";
const cleanText=(value,max)=>value===null||value===undefined?null:String(value).slice(0,max);

export function pilotRetentionUntil(){
  const raw=process.env.PILOT_RETENTION_UNTIL||"";
  const date=new Date(raw);
  return raw&&!Number.isNaN(date.getTime())?date.toISOString():null;
}

export function validatePilotEnvelope(payload){
  if(payload?.schema!=="aplus-pilot-v1")return {ok:false,code:"INVALID_SCHEMA"};
  const aggregates=payload?.aggregates??[];
  const itemResults=payload?.itemResults??[];
  const feedback=payload?.feedback??[];
  if(!Array.isArray(aggregates)||!Array.isArray(itemResults)||!Array.isArray(feedback))return {ok:false,code:"INVALID_COLLECTION"};
  if(aggregates.length>MAX_AGGREGATES)return {ok:false,code:"TOO_MANY_AGGREGATES",limit:MAX_AGGREGATES};
  if(itemResults.length>MAX_ITEM_RESULTS)return {ok:false,code:"TOO_MANY_ITEM_RESULTS",limit:MAX_ITEM_RESULTS};
  if(feedback.length>MAX_FEEDBACK)return {ok:false,code:"TOO_MANY_FEEDBACK",limit:MAX_FEEDBACK};

  for(const row of aggregates){
    if(!asDate(row?.date)||!ALLOWED_EVENTS.has(row?.type))return {ok:false,code:"INVALID_AGGREGATE"};
    if(!Number.isInteger(row?.totalCount)||row.totalCount<0)return {ok:false,code:"INVALID_AGGREGATE_COUNT"};
    if(!Number.isInteger(row?.totalSeconds)||row.totalSeconds<0)return {ok:false,code:"INVALID_AGGREGATE_SECONDS"};
  }
  for(const row of itemResults){
    if(!row?.id||!row?.itemId||!asDate(row?.date)||!ALLOWED_OUTCOMES.has(row?.outcome))return {ok:false,code:"INVALID_ITEM_RESULT"};
    if(!Number.isInteger(row?.seconds)||row.seconds<0)return {ok:false,code:"INVALID_ITEM_SECONDS"};
  }
  for(const row of feedback){
    if(!row?.id||!row?.type||!row?.at)return {ok:false,code:"INVALID_FEEDBACK"};
    if(row.rating!==null&&row.rating!==undefined&&(!Number.isInteger(row.rating)||row.rating<1||row.rating>5))return {ok:false,code:"INVALID_FEEDBACK_RATING"};
    if(row.comment!==null&&row.comment!==undefined&&String(row.comment).length>MAX_COMMENT)return {ok:false,code:"FEEDBACK_TOO_LONG",limit:MAX_COMMENT};
    if(Number.isNaN(new Date(row.at).getTime()))return {ok:false,code:"INVALID_FEEDBACK_DATE"};
  }
  return {ok:true};
}

export async function resolvePilotUser(authUserId){
  if(!databaseConfigured())return null;
  const sql=getSql();
  const rows=await sql`
    select
      u.id,
      u.auth_user_id,
      exists(
        select 1 from pilot_test_accounts t where t.student_user_id=u.id
      ) as is_test_account
    from app_users u
    where u.auth_user_id=${authUserId}
    limit 1
  `;
  return rows[0]||null;
}

export async function activePilotConsent(studentUserId){
  const sql=getSql();
  const rows=await sql`
    select id,consent_type,guardian_user_id,policy_version,granted_at,retention_until
    from consent_records
    where student_user_id=${studentUserId}
      and revoked_at is null
      and retention_until>now()
    order by granted_at desc
    limit 1
  `;
  return rows[0]||null;
}

export async function ingestPilotEnvelope({authUserId,payload}){
  if(!databaseConfigured())return {ok:false,code:"DATABASE_NOT_CONFIGURED"};
  const retentionUntil=pilotRetentionUntil();
  if(!retentionUntil)return {ok:false,code:"PILOT_RETENTION_NOT_CONFIGURED"};
  const valid=validatePilotEnvelope(payload);
  if(!valid.ok)return valid;

  const user=await resolvePilotUser(authUserId);
  if(!user)return {ok:false,code:"APP_USER_REQUIRED"};
  const consent=await activePilotConsent(user.id);
  if(!consent)return {ok:false,code:"CONSENT_REQUIRED"};

  // Contas de smoke/teste exercitam autenticação, consentimento e endpoint,
  // mas são deliberadamente excluídas de todas as métricas do piloto.
  if(user.is_test_account)return {ok:true,excludedTestAccount:true,counters:{aggregates:0,itemResults:0,feedback:0}};

  const sql=getSql();
  const counters={aggregates:0,itemResults:0,feedback:0};

  for(const row of payload.aggregates){
    await sql`
      insert into pilot_event_aggregates
        (student_user_id,period_date,event_type,subject,total_count,total_seconds,retention_until,updated_at)
      values
        (${user.id},${row.date},${row.type},${cleanSubject(row.subject)},${row.totalCount},${row.totalSeconds},${retentionUntil},now())
      on conflict (student_user_id,period_date,event_type,subject) do update set
        total_count=greatest(pilot_event_aggregates.total_count,excluded.total_count),
        total_seconds=greatest(pilot_event_aggregates.total_seconds,excluded.total_seconds),
        retention_until=greatest(pilot_event_aggregates.retention_until,excluded.retention_until),
        updated_at=now()
    `;
    counters.aggregates++;
  }

  for(const row of payload.itemResults){
    await sql`
      insert into pilot_item_results
        (student_user_id,external_id,item_id,outcome,seconds,occurred_on,subject,retention_until)
      values
        (${user.id},${cleanText(row.id,120)},${cleanText(row.itemId,160)},${row.outcome},${row.seconds},${row.date},${cleanSubject(row.subject)},${retentionUntil})
      on conflict (student_user_id,external_id) do nothing
    `;
    counters.itemResults++;
  }

  for(const row of payload.feedback){
    await sql`
      insert into pilot_feedback
        (student_user_id,external_id,feedback_type,subject,rating,comment,occurred_at,retention_until)
      values
        (${user.id},${cleanText(row.id,120)},${cleanText(row.type,80)},${cleanSubject(row.subject)},${row.rating??null},${cleanText(row.comment,MAX_COMMENT)},${new Date(row.at).toISOString()},${retentionUntil})
      on conflict (student_user_id,external_id) do nothing
    `;
    counters.feedback++;
  }

  return {ok:true,excludedTestAccount:false,counters,consentType:consent.consent_type};
}
