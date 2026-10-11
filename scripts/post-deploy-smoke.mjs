import assert from "node:assert/strict";
import {randomBytes} from "node:crypto";
import {performance} from "node:perf_hooks";
import {neon} from "@neondatabase/serverless";
import {createClient} from "@neondatabase/neon-js";

const required=name=>{
  const value=process.env[name];
  if(!value)throw new Error(`Missing required environment variable: ${name}`);
  return value;
};
const median=values=>{
  const sorted=[...values].sort((a,b)=>a-b);
  const middle=Math.floor(sorted.length/2);
  return sorted.length%2?sorted[middle]:(sorted[middle-1]+sorted[middle])/2;
};

const baseUrl=required("SMOKE_BASE_URL").replace(/\/$/,"");
const baseOrigin=new URL(baseUrl).origin;
const ephemeral=process.env.SMOKE_EPHEMERAL_SIGNUP==="true";
const email=ephemeral?`pilot-smoke-${Date.now()}-${randomBytes(4).toString("hex")}@example.com`:required("SMOKE_TEST_EMAIL");
const password=ephemeral?`S!${randomBytes(24).toString("base64url")}`:required("SMOKE_TEST_PASSWORD");
const databaseUrl=required("SMOKE_DATABASE_URL");
const dataApiUrl=required("SMOKE_DATA_API_URL");
const protectionBypass=process.env.SMOKE_PROTECTION_BYPASS||null;
const shareToken=process.env.SMOKE_SHARE_TOKEN||null;

const cookies=new Map();
const observedSetCookies=[];
const rememberCookies=response=>{
  const values=response.headers.getSetCookie?.()||[];
  const fallback=values.length?[]:[response.headers.get("set-cookie")].filter(Boolean);
  for(const raw of [...values,...fallback]){
    observedSetCookies.push(String(raw));
    for(const part of String(raw).split(/,(?=[^;,]+=)/u)){
      const pair=part.split(";",1)[0];
      const eq=pair.indexOf("=");
      if(eq>0)cookies.set(pair.slice(0,eq).trim(),pair.slice(eq+1).trim());
    }
  }
};
const cookieHeader=()=>[...cookies].map(([key,value])=>`${key}=${value}`).join("; ");

async function appFetch(path,options={}){
  const headers=new Headers(options.headers||{});
  const cookie=cookieHeader();
  if(cookie)headers.set("cookie",cookie);
  if(protectionBypass)headers.set("x-vercel-protection-bypass",protectionBypass);
  const method=String(options.method||"GET").toUpperCase();
  if(!["GET","HEAD","OPTIONS"].includes(method)){
    headers.set("origin",baseOrigin);
    headers.set("sec-fetch-site","same-origin");
  }
  const response=await fetch(`${baseUrl}${path}`,{...options,headers,redirect:"manual"});
  rememberCookies(response);
  return response;
}
async function jsonOrText(response){
  const text=await response.text();
  try{return JSON.parse(text)}catch{return {raw:text.slice(0,500)}}
}
async function hostileMutation(path,{method="POST",body=null}={}){
  const headers=new Headers({origin:"https://example.invalid","sec-fetch-site":"cross-site"});
  if(body!==null)headers.set("content-type","application/json");
  const cookie=cookieHeader();
  if(cookie)headers.set("cookie",cookie);
  if(protectionBypass)headers.set("x-vercel-protection-bypass",protectionBypass);
  return fetch(`${baseUrl}${path}`,{method,headers,body:body===null?undefined:JSON.stringify(body),redirect:"manual"});
}

if(shareToken){
  const entrance=await appFetch(`/?_vercel_share=${encodeURIComponent(shareToken)}`);
  assert.ok(entrance.status>=200&&entrance.status<400,`Preview protection handshake failed: ${entrance.status}`);
}

const healthResponse=await appFetch("/api/health",{cache:"no-store"});
const health=await jsonOrText(healthResponse);
assert.equal(healthResponse.status,200,"/api/health must return 200");
assert.equal(health.backendReachable,true,"Smoke deployment must reach its Neon branch");
assert.equal(Number(health.schemaVersion),8,`Expected schemaVersion 8, got ${health.schemaVersion}`);
assert.equal(health.region,"fra1",`Expected runtime region fra1, got ${health.region}`);

if(ephemeral){
  const signupResponse=await appFetch("/api/auth/sign-up/email",{
    method:"POST",headers:{"content-type":"application/json"},
    body:JSON.stringify({name:"Pilot Smoke",email,password})
  });
  const signupBody=await jsonOrText(signupResponse);
  assert.ok(signupResponse.ok,`Ephemeral smoke signup failed (${signupResponse.status}): ${JSON.stringify(signupBody)}`);
  cookies.clear();
  if(shareToken){
    const entrance=await appFetch(`/?_vercel_share=${encodeURIComponent(shareToken)}`);
    assert.ok(entrance.status>=200&&entrance.status<400,`Preview protection re-handshake failed: ${entrance.status}`);
  }
}

const loginTimings=[];
for(let i=0;i<5;i++){
  const loginStart=performance.now();
  const loginResponse=await appFetch("/api/auth/sign-in/email",{
    method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email,password})
  });
  loginTimings.push(performance.now()-loginStart);
  const loginBody=await jsonOrText(loginResponse);
  assert.ok(loginResponse.ok,`Login #${i+1} failed (${loginResponse.status}): ${JSON.stringify(loginBody)}`);
}

const sessionResponse=await appFetch("/api/auth/session",{cache:"no-store"});
const session=await jsonOrText(sessionResponse);
assert.equal(sessionResponse.status,200,`Authenticated session failed: ${JSON.stringify(session)}`);
assert.ok(session?.user?.id,"Authenticated smoke user id missing");
assert.ok(session?.appUserId,"App user was not provisioned");

const sql=neon(databaseUrl);
await sql`
  insert into pilot_test_accounts(student_user_id,label)
  values (${session.appUserId},'post-deploy-smoke')
  on conflict (student_user_id) do update set label=excluded.label
`;

const consentResponse=await appFetch("/api/pilot/consent",{
  method:"POST",headers:{"content-type":"application/json"},
  body:JSON.stringify({ageConfirmed:true,accepted:true})
});
const consent=await jsonOrText(consentResponse);
assert.equal(consentResponse.status,200,`Pilot consent failed: ${JSON.stringify(consent)}`);
assert.equal(consent.active,true,"Pilot consent must be active before collection");
assert.ok(consent?.consent?.policyVersion,"Pilot consent must record policy_version");
assert.ok(consent?.consent?.grantedAt,"Pilot consent must record granted_at");

const tokenResponse=await appFetch("/api/auth/token",{cache:"no-store"});
const tokenBody=await jsonOrText(tokenResponse);
assert.equal(tokenResponse.status,200,`Data API token failed: ${JSON.stringify(tokenBody)}`);
const jwt=tokenBody?.token||tokenBody?.data?.token||null;
assert.ok(typeof jwt==="string"&&jwt.split(".").length===3,"Valid Data API JWT missing");
const dataClient=createClient({dataApi:{url:dataApiUrl,getToken:async()=>jwt}});

const before=await dataClient.from("student_cloud_state").select("revision").eq("auth_user_id",session.user.id).maybeSingle();
assert.ok(!before?.error,`Cloud pre-read failed: ${before?.error?.message||"unknown"}`);
const marker=`smoke-${Date.now()}`;
const currentRevision=Number(before?.data?.revision)||0;
const cloudStart=performance.now();
let write;
if(before?.data){
  write=await dataClient.from("student_cloud_state")
    .update({state_json:{schema:"aplus-student-state-v8",smokeMarker:marker},revision:currentRevision+1,last_device_id:"post-deploy-smoke",updated_at:new Date().toISOString()})
    .eq("auth_user_id",session.user.id).eq("revision",currentRevision).select("revision").maybeSingle();
}else{
  write=await dataClient.from("student_cloud_state")
    .insert({auth_user_id:session.user.id,state_json:{schema:"aplus-student-state-v8",smokeMarker:marker},revision:1,last_device_id:"post-deploy-smoke",updated_at:new Date().toISOString()})
    .select("revision").single();
}
const cloudSaveMs=performance.now()-cloudStart;
assert.ok(!write?.error&&write?.data,`Cloud save failed: ${write?.error?.message||"unknown"}`);
const readBack=await dataClient.from("student_cloud_state").select("state_json,revision,last_device_id").eq("auth_user_id",session.user.id).single();
assert.ok(!readBack?.error,`Cloud read-back failed: ${readBack?.error?.message||"unknown"}`);
assert.equal(readBack.data?.state_json?.smokeMarker,marker,"Cloud round-trip marker mismatch");
assert.equal(readBack.data?.last_device_id,"post-deploy-smoke","Cloud device marker mismatch");

const today=new Date().toISOString().slice(0,10);
const itemExternalId=`smoke-item-${Date.now()}`;
const feedbackExternalId=`smoke-feedback-${Date.now()}`;
const firstSyncPayload={
  schema:"aplus-pilot-v1",
  aggregates:[{date:today,type:"app_session",subject:"all",totalCount:5,totalSeconds:100}],
  itemResults:[{id:itemExternalId,itemId:"smoke:math-a:item-001",outcome:"correct",seconds:12,date:today,subject:"math-a"}],
  feedback:[{id:feedbackExternalId,type:"general",subject:"math-a",rating:5,comment:"smoke feedback",at:new Date().toISOString()}]
};
const lowerSyncPayload={schema:"aplus-pilot-v1",aggregates:[{date:today,type:"app_session",subject:"all",totalCount:3,totalSeconds:80}],itemResults:[],feedback:[]};
const syncPayloads=[firstSyncPayload,lowerSyncPayload,lowerSyncPayload,lowerSyncPayload,lowerSyncPayload];
const syncTimings=[];
for(let i=0;i<syncPayloads.length;i++){
  const start=performance.now();
  const response=await appFetch("/api/pilot/sync",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(syncPayloads[i])});
  syncTimings.push(performance.now()-start);
  const result=await jsonOrText(response);
  assert.equal(response.status,200,`Pilot sync #${i+1} failed: ${JSON.stringify(result)}`);
  assert.equal(result.isTest,true,"Smoke account must write with is_test=true");
}

const stored=await sql`
  select total_count,total_seconds,is_test
  from pilot_event_aggregates
  where student_user_id=${session.appUserId} and period_date=${today} and event_type='app_session' and subject='all'
`;
assert.equal(Number(stored[0]?.total_count),5,"GREATEST idempotence failed: total_count fell below 5");
assert.equal(Number(stored[0]?.total_seconds),100,"GREATEST idempotence failed: total_seconds fell below 100");
assert.equal(stored[0]?.is_test,true,"Smoke aggregate must be marked is_test=true");

const written=await sql`
  select
    (select count(*)::int from pilot_event_aggregates where student_user_id=${session.appUserId} and is_test=true) as aggregates,
    (select count(*)::int from pilot_item_results where student_user_id=${session.appUserId} and is_test=true) as item_results,
    (select count(*)::int from pilot_feedback where student_user_id=${session.appUserId} and is_test=true) as feedback,
    (select count(*)::int from pilot_event_aggregates where student_user_id=${session.appUserId} and is_test=false) as metric_aggregates,
    (select count(*)::int from pilot_item_results where student_user_id=${session.appUserId} and is_test=false) as metric_item_results,
    (select count(*)::int from pilot_feedback where student_user_id=${session.appUserId} and is_test=false) as metric_feedback,
    exists(select 1 from pilot_test_accounts where student_user_id=${session.appUserId}) as marked_test_account
`;
assert.equal(written[0]?.marked_test_account,true,"Smoke user lost server-only test marker");
assert.ok(Number(written[0]?.aggregates)>=1,"Smoke must INSERT/UPSERT an aggregate row");
assert.ok(Number(written[0]?.item_results)>=1,"Smoke must INSERT an item-result row");
assert.ok(Number(written[0]?.feedback)>=1,"Smoke must INSERT a feedback row");
assert.deepEqual(
  {aggregates:Number(written[0]?.metric_aggregates),itemResults:Number(written[0]?.metric_item_results),feedback:Number(written[0]?.metric_feedback)},
  {aggregates:0,itemResults:0,feedback:0},
  "Metrics filtered with is_test=false must exclude the smoke account rows"
);

const hostileSync=await hostileMutation("/api/pilot/sync",{body:lowerSyncPayload});
assert.equal(hostileSync.status,403,"Cross-origin pilot sync must be rejected by CSRF protection");
const hostileDelete=await hostileMutation("/api/pilot/data",{method:"DELETE"});
assert.equal(hostileDelete.status,403,"Cross-origin pilot delete must be rejected by CSRF protection");

const deleteResponse=await appFetch("/api/pilot/data",{method:"DELETE"});
const deleted=await jsonOrText(deleteResponse);
assert.equal(deleteResponse.status,200,`Pilot erasure failed: ${JSON.stringify(deleted)}`);
const afterDelete=await sql`
  select
    (select count(*)::int from pilot_event_aggregates where student_user_id=${session.appUserId}) as aggregates,
    (select count(*)::int from pilot_item_results where student_user_id=${session.appUserId}) as item_results,
    (select count(*)::int from pilot_feedback where student_user_id=${session.appUserId}) as feedback,
    (select count(*)::int from consent_records where student_user_id=${session.appUserId} and consent_type='pilot_self' and revoked_at is not null) as revoked_consents
`;
assert.deepEqual(
  {aggregates:Number(afterDelete[0]?.aggregates),itemResults:Number(afterDelete[0]?.item_results),feedback:Number(afterDelete[0]?.feedback)},
  {aggregates:0,itemResults:0,feedback:0},
  "DELETE /api/pilot/data must remove all pilot telemetry/results/feedback"
);
assert.ok(Number(afterDelete[0]?.revoked_consents)>=1,"Pilot consent record must remain marked revoked");

const blockedResponse=await appFetch("/api/pilot/sync",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(lowerSyncPayload)});
const blocked=await jsonOrText(blockedResponse);
assert.equal(blockedResponse.status,403,`Sync without consent must be blocked: ${JSON.stringify(blocked)}`);
assert.equal(blocked.code,"CONSENT_REQUIRED","Post-erasure sync must fail specifically on consent");

const sameSiteValues=observedSetCookies.map(raw=>raw.match(/;\s*SameSite=([^;]+)/iu)?.[1]?.toLowerCase()||null).filter(Boolean);
assert.ok(sameSiteValues.length>0,"Authenticated smoke must observe a SameSite attribute on session cookies");

console.log(JSON.stringify({
  ok:true,region:health.region,schemaVersion:health.schemaVersion,schemaMigration:health.schemaMigration,
  timingsMs:{
    login:loginTimings.map(value=>Number(value.toFixed(1))),loginMedian:Number(median(loginTimings).toFixed(1)),
    cloudSave:Number(cloudSaveMs.toFixed(1)),
    pilotSync:syncTimings.map(value=>Number(value.toFixed(1))),pilotSyncMedian:Number(median(syncTimings).toFixed(1))
  },
  idempotenceVerified:{sentFirst:{count:5,seconds:100},sentSecond:{count:3,seconds:80},stored:{count:Number(stored[0]?.total_count),seconds:Number(stored[0]?.total_seconds)}},
  testWritesVerified:true,testRowsExcludedByFilter:true,csrfVerified:{sync:true,delete:true},
  cookieSameSite:[...new Set(sameSiteValues)],erasureVerified:true,consentRevocationVerified:true,consentGateVerified:true,
  ephemeralAuthUserId:ephemeral?session.user.id:null
}));