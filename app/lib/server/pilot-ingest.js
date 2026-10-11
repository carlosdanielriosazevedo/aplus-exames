import {getSql,databaseConfigured} from "./db";

const MAX_AGGREGATES=200;
const MAX_ITEM_RESULTS=500;
const MAX_FEEDBACK=50;
const MAX_COMMENT=2000;
const MAX_SECONDS_PER_DAY=86_400;
const RATE_LIMIT_REQUESTS=30;
const ITEM_ID_RE=/^[A-Za-z0-9][A-Za-z0-9:_./-]{0,159}$/u;
const ALLOWED_SUBJECTS=new Set(["all","math-a","portuguese","physics-chemistry-a"]);
const EVENT_COUNT_LIMITS=new Map([
  ["app_session",200],
  ["diagnostic_completed",20],
  ["practice_completed",500],
  ["mission_completed",200],
  ["mini_exam_completed",50],
  ["full_exam_completed",20],
  ["review_opened",500],
  ["onboarding_started",20],
  ["onboarding_completed",20],
  ["onboarding_abandoned",20]
]);
const ALLOWED_EVENTS=new Set(EVENT_COUNT_LIMITS.keys());
const ALLOWED_OUTCOMES=new Set(["correct","partial","incorrect","skipped"]);
const ALLOWED_FEEDBACK_TYPES=new Set(["general","clarity","difficulty","usefulness","bug","other"]);

const asDate=value=>/^\d{4}-\d{2}-\d{2}$/.test(String(value||""))?String(value):null;
const cleanText=(value,max)=>value===null||value===undefined?null:String(value).slice(0,max);
const utcDay=value=>{
  const date=asDate(value);
  return date?Date.parse(`${date}T00:00:00.000Z`):NaN;
};
const serverUtcDay=()=>Date.parse(`${new Date().toISOString().slice(0,10)}T00:00:00.000Z`);
const dateNearServer=value=>{
  const time=utcDay(value);
  return Number.isFinite(time)&&Math.abs(time-serverUtcDay())<=86_400_000;
};
const feedbackDate=value=>{
  const date=new Date(value);
  return Number.isNaN(date.getTime())?null:date.toISOString().slice(0,10);
};

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

  const secondsByDate=new Map();
  for(const row of aggregates){
    const date=asDate(row?.date);
    const subject=String(row?.subject||"all");
    if(!date||!dateNearServer(date)||!ALLOWED_EVENTS.has(row?.type)||!ALLOWED_SUBJECTS.has(subject))return {ok:false,code:"INVALID_AGGREGATE"};
    if(!Number.isInteger(row?.totalCount)||row.totalCount<0)return {ok:false,code:"INVALID_AGGREGATE_COUNT"};
    const eventLimit=EVENT_COUNT_LIMITS.get(row.type);
    if(row.totalCount>eventLimit)return {ok:false,code:"AGGREGATE_COUNT_TOO_LARGE",eventType:row.type,limit:eventLimit};
    if(!Number.isInteger(row?.totalSeconds)||row.totalSeconds<0||row.totalSeconds>MAX_SECONDS_PER_DAY)return {ok:false,code:"INVALID_AGGREGATE_SECONDS",limit:MAX_SECONDS_PER_DAY};
    secondsByDate.set(date,(secondsByDate.get(date)||0)+row.totalSeconds);
    if(secondsByDate.get(date)>MAX_SECONDS_PER_DAY)return {ok:false,code:"DAILY_SECONDS_TOO_LARGE",date,limit:MAX_SECONDS_PER_DAY};
  }

  for(const row of itemResults){
    const date=asDate(row?.date);
    const subject=String(row?.subject||"all");
    if(!row?.id||!ITEM_ID_RE.test(String(row?.itemId||""))||!date||!dateNearServer(date)||!ALLOWED_OUTCOMES.has(row?.outcome)||!ALLOWED_SUBJECTS.has(subject))return {ok:false,code:"INVALID_ITEM_RESULT"};
    if(!Number.isInteger(row?.seconds)||row.seconds<0||row.seconds>MAX_SECONDS_PER_DAY)return {ok:false,code:"INVALID_ITEM_SECONDS",limit:MAX_SECONDS_PER_DAY};
  }

  for(const row of feedback){
    const date=feedbackDate(row?.at);
    const subject=String(row?.subject||"all");
    if(!row?.id||!ALLOWED_FEEDBACK_TYPES.has(row?.type)||!date||!dateNearServer(date)||!ALLOWED_SUBJECTS.has(subject))return {ok:false,code:"INVALID_FEEDBACK"};
    if(row.rating!==null&&row.rating!==undefined&&(!Number.isInteger(row.rating)||row.rating<1||row.rating>5))return {ok:false,code:"INVALID_FEEDBACK_RATING"};
    if(row.comment!==null&&row.comment!==undefined&&String(row.comment).length>MAX_COMMENT)return {ok:false,code:"FEEDBACK_TOO_LONG",limit:MAX_COMMENT};
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
    select id,consent_type,guardian_user_id,policy_version,granted_at,retention_until,is_test
    from consent_records
    where student_user_id=${studentUserId}
      and consent_type='pilot_self'
      and revoked_at is null
      and retention_until>now()
    order by granted_at desc
    limit 1
  `;
  return rows[0]||null;
}

export async function enforcePilotRateLimit(studentUserId){
  const sql=getSql();
  const rows=await sql`
    insert into pilot_sync_rate_limits (student_user_id,window_started_at,request_count,updated_at)
    values (${studentUserId},now(),1,now())
    on conflict (student_user_id) do update set
      window_started_at=case
        when pilot_sync_rate_limits.window_started_at<=now()-interval '60 seconds' then now()
        else pilot_sync_rate_limits.window_started_at
      end,
      request_count=case
        when pilot_sync_rate_limits.window_started_at<=now()-interval '60 seconds' then 1
        else pilot_sync_rate_limits.request_count+1
      end,
      updated_at=now()
    returning request_count,window_started_at
  `;
  const count=Number(rows[0]?.request_count)||0;
  return {ok:count<=RATE_LIMIT_REQUESTS,count,limit:RATE_LIMIT_REQUESTS};
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
  const rate=await enforcePilotRateLimit(user.id);
  if(!rate.ok)return {ok:false,code:"RATE_LIMITED",limit:rate.limit};

  const sql=getSql();
  const isTest=Boolean(user.is_test_account);
  const counters={aggregates:0,itemResults:0,feedback:0};

  for(const row of payload.aggregates){
    await sql`
      insert into pilot_event_aggregates
        (student_user_id,period_date,event_type,subject,total_count,total_seconds,retention_until,is_test,updated_at)
      values
        (${user.id},${row.date},${row.type},${row.subject||"all"},${row.totalCount},${row.totalSeconds},${retentionUntil},${isTest},now())
      on conflict (student_user_id,period_date,event_type,subject) do update set
        total_count=greatest(pilot_event_aggregates.total_count,excluded.total_count),
        total_seconds=greatest(pilot_event_aggregates.total_seconds,excluded.total_seconds),
        retention_until=greatest(pilot_event_aggregates.retention_until,excluded.retention_until),
        is_test=excluded.is_test,
        updated_at=now()
    `;
    counters.aggregates++;
  }

  for(const row of payload.itemResults){
    await sql`
      insert into pilot_item_results
        (student_user_id,external_id,item_id,outcome,seconds,occurred_on,subject,retention_until,is_test)
      values
        (${user.id},${cleanText(row.id,120)},${String(row.itemId)},${row.outcome},${row.seconds},${row.date},${row.subject||"all"},${retentionUntil},${isTest})
      on conflict (student_user_id,external_id) do nothing
    `;
    counters.itemResults++;
  }

  for(const row of payload.feedback){
    await sql`
      insert into pilot_feedback
        (student_user_id,external_id,feedback_type,subject,rating,comment,occurred_at,retention_until,is_test)
      values
        (${user.id},${cleanText(row.id,120)},${row.type},${row.subject||"all"},${row.rating??null},${cleanText(row.comment,MAX_COMMENT)},${new Date(row.at).toISOString()},${retentionUntil},${isTest})
      on conflict (student_user_id,external_id) do nothing
    `;
    counters.feedback++;
  }

  return {ok:true,isTest,counters,consentType:consent.consent_type};
}
