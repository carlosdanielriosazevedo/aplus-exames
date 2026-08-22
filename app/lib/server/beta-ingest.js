import {createHash} from "crypto";
import {getSql,databaseConfigured} from "./db";

const iso=value=>{
  if(value===null || value===undefined)return null;
  const d=new Date(value);
  return Number.isNaN(d.getTime())?null:d.toISOString();
};
const json=value=>JSON.stringify(value??{});

export function validateSyncEnvelope(payload){
  if(payload?.schema!=="aplus-sync-v1")return {ok:false,code:"INVALID_SCHEMA"};
  if(!payload?.participant?.code)return {ok:false,code:"PARTICIPANT_CODE_REQUIRED"};
  if(String(payload.participant.code).length>80)return {ok:false,code:"PARTICIPANT_CODE_TOO_LONG"};
  return {ok:true};
}

export async function ingestBetaEnvelope(payload,rawText=""){
  if(!databaseConfigured()){
    return {ok:false,code:"DATABASE_NOT_CONFIGURED"};
  }
  const valid=validateSyncEnvelope(payload);
  if(!valid.ok)return valid;

  const sql=getSql();
  const participant=payload.participant;
  const rows=await sql`
    insert into beta_participants (code,cohort,school_year,goal,updated_at)
    values (${participant.code},${participant.cohort||null},${participant.schoolYear||null},${participant.goal??null},now())
    on conflict (code) do update set
      cohort=excluded.cohort,
      school_year=excluded.school_year,
      goal=excluded.goal,
      updated_at=now()
    returning id
  `;
  const participantId=rows[0].id;

  const counters={sessions:0,events:0,feedback:0,reports:0,results:0,editorial:0,batches:0};

  for(const s of payload.beta?.sessions||[]){
    if(!s?.id || !iso(s.startedAt))continue;
    await sql`
      insert into beta_sessions (external_id,participant_id,kind,started_at,finished_at,duration_seconds,meta)
      values (${s.id},${participantId},${s.kind||"unknown"},${iso(s.startedAt)},${iso(s.finishedAt)},${s.durationSeconds??null},${json(s.meta)}::jsonb)
      on conflict (external_id) do update set
        finished_at=excluded.finished_at,
        duration_seconds=excluded.duration_seconds,
        meta=excluded.meta
    `;
    counters.sessions++;
  }

  for(const e of payload.beta?.events||[]){
    if(!e?.id || !iso(e.at))continue;
    await sql`
      insert into beta_events (external_id,participant_id,event_type,occurred_at,payload)
      values (${e.id},${participantId},${e.type||"unknown"},${iso(e.at)},${json(e.payload)}::jsonb)
      on conflict (external_id) do nothing
    `;
    counters.events++;
  }

  for(const f of payload.beta?.feedback||[]){
    if(!f?.id || !iso(f.at))continue;
    await sql`
      insert into beta_feedback (external_id,participant_id,kind,occurred_at,clarity,difficulty_fit,usefulness,comment)
      values (${f.id},${participantId},${f.kind||"unknown"},${iso(f.at)},${f.clarity??null},${f.difficultyFit??null},${f.usefulness??null},${f.comment||null})
      on conflict (external_id) do nothing
    `;
    counters.feedback++;
  }

  for(const r of payload.contentReports||[]){
    if(!r?.id || !r?.itemId || !iso(r.at))continue;
    await sql`
      insert into content_reports (external_id,participant_id,item_id,template_id,theme_id,focus,category,label,generated,occurred_at)
      values (${r.id},${participantId},${r.itemId},${r.templateId||null},${r.themeId||null},${r.focus||null},${r.category||"other"},${r.label||null},${Boolean(r.generated)},${iso(r.at)})
      on conflict (external_id) do nothing
    `;
    counters.reports++;
  }

  for(const x of payload.examHistory||[]){
    const externalKey=`exam:${x.id||x.at}`;
    await sql`
      insert into beta_results (external_key,participant_id,result_kind,occurred_at,payload)
      values (${externalKey},${participantId},'mini_exam',${iso(x.at)||new Date().toISOString()},${json(x)}::jsonb)
      on conflict (external_key) do update set payload=excluded.payload
    `;
    counters.results++;
  }

  for(const x of payload.missionHistory||[]){
    const externalKey=`mission:${x.at||"na"}:${x.themeId||"na"}:${x.type||"na"}`;
    await sql`
      insert into beta_results (external_key,participant_id,result_kind,occurred_at,payload)
      values (${externalKey},${participantId},'mission',${iso(x.at)||new Date().toISOString()},${json(x)}::jsonb)
      on conflict (external_key) do update set payload=excluded.payload
    `;
    counters.results++;
  }

  const overrides=payload.editorial?.overrides||{};
  for(const [itemId,ov] of Object.entries(overrides)){
    await sql`
      insert into content_items (item_id,current_version,review_status,updated_at)
      values (${itemId},${ov.version||1},${ov.status||"prototype"},now())
      on conflict (item_id) do update set
        current_version=excluded.current_version,
        review_status=excluded.review_status,
        updated_at=now()
    `;
    for(const h of ov.history||[]){
      const key=`${itemId}|${h.at||"na"}|${h.decision||"na"}|${h.version||1}`;
      await sql`
        insert into editorial_reviews (external_key,item_id,item_version,reviewer_id,decision,resulting_status,note,created_at)
        values (${key},${itemId},${h.version||1},${h.reviewer||"Sistema"},${h.decision||"reopen"},${h.status||ov.status||"pending"},${h.note||null},${iso(h.at)||new Date().toISOString()})
        on conflict (external_key) do nothing
      `;
      counters.editorial++;
    }
  }

  for(const b of payload.editorial?.batches||[]){
    if(!b?.id)continue;
    await sql`
      insert into review_batches (external_id,reviewer_id,status,item_ids,created_at,closed_at)
      values (${b.id},${b.reviewer||null},${b.status||"open"},${json(b.itemIds||[])}::jsonb,${iso(b.createdAt)||new Date().toISOString()},${iso(b.closedAt)})
      on conflict (external_id) do update set
        reviewer_id=excluded.reviewer_id,
        status=excluded.status,
        item_ids=excluded.item_ids,
        closed_at=excluded.closed_at
    `;
    counters.batches++;
  }

  const hash=createHash("sha256").update(rawText||JSON.stringify(payload)).digest("hex");
  await sql`
    insert into beta_sync_imports (participant_id,schema_version,app_version,payload_hash,raw_summary)
    values (${participantId},${payload.schema},${payload.appVersion||null},${hash},${json(counters)}::jsonb)
  `;

  return {ok:true,participantId,counters,provider:"neon-postgres"};
}
