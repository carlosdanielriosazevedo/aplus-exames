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

const baseUrl=required("SMOKE_BASE_URL").replace(/\/$/,"");
const ephemeral=process.env.SMOKE_EPHEMERAL_SIGNUP==="true";
const email=ephemeral
  ? `pilot-smoke-${Date.now()}-${randomBytes(4).toString("hex")}@example.com`
  : required("SMOKE_TEST_EMAIL");
const password=ephemeral
  ? `S!${randomBytes(24).toString("base64url")}`
  : required("SMOKE_TEST_PASSWORD");
const databaseUrl=required("SMOKE_DATABASE_URL");
const dataApiUrl=required("SMOKE_DATA_API_URL");
const retentionUntil=required("SMOKE_RETENTION_UNTIL");
const protectionBypass=process.env.SMOKE_PROTECTION_BYPASS||null;
const shareToken=process.env.SMOKE_SHARE_TOKEN||null;

const cookies=new Map();
const rememberCookies=response=>{
  const values=response.headers.getSetCookie?.()||[];
  const fallback=values.length?[]:[response.headers.get("set-cookie")].filter(Boolean);
  for(const raw of [...values,...fallback]){
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
  const response=await fetch(`${baseUrl}${path}`,{...options,headers,redirect:"manual"});
  rememberCookies(response);
  return response;
}

async function jsonOrText(response){
  const text=await response.text();
  try{return JSON.parse(text)}catch{return {raw:text.slice(0,500)}}
}

if(shareToken){
  const entrance=await appFetch(`/?_vercel_share=${encodeURIComponent(shareToken)}`);
  assert.ok(entrance.status>=200&&entrance.status<400,`Preview protection handshake failed: ${entrance.status}`);
}

const healthResponse=await appFetch("/api/health",{cache:"no-store"});
const health=await jsonOrText(healthResponse);
assert.equal(healthResponse.status,200,"/api/health must return 200");
assert.equal(health.backendReachable,true,"Smoke deployment must reach its Neon branch");
assert.ok(Number(health.schemaVersion)>=8,`Expected schemaVersion >= 8, got ${health.schemaVersion}`);

if(ephemeral){
  const signupResponse=await appFetch("/api/auth/sign-up/email",{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify({name:"Pilot Smoke",email,password})
  });
  const signupBody=await jsonOrText(signupResponse);
  assert.ok(signupResponse.ok,`Ephemeral smoke signup failed (${signupResponse.status}): ${JSON.stringify(signupBody)}`);
  // Force the next operation to prove password login rather than reusing the signup session.
  cookies.clear();
  if(shareToken){
    const entrance=await appFetch(`/?_vercel_share=${encodeURIComponent(shareToken)}`);
    assert.ok(entrance.status>=200&&entrance.status<400,`Preview protection re-handshake failed: ${entrance.status}`);
  }
}

const loginStart=performance.now();
const loginResponse=await appFetch("/api/auth/sign-in/email",{
  method:"POST",
  headers:{"content-type":"application/json"},
  body:JSON.stringify({email,password})
});
const loginMs=performance.now()-loginStart;
const loginBody=await jsonOrText(loginResponse);
assert.ok(loginResponse.ok,`Login failed (${loginResponse.status}): ${JSON.stringify(loginBody)}`);

const sessionResponse=await appFetch("/api/auth/session",{cache:"no-store"});
const session=await jsonOrText(sessionResponse);
assert.equal(sessionResponse.status,200,`Authenticated session failed: ${JSON.stringify(session)}`);
assert.ok(session?.user?.id,"Authenticated smoke user id missing");
assert.ok(session?.appUserId,"App user was not provisioned");

// Setup is deliberately done with a server-only database secret. There is no public endpoint
// that can turn a normal account into a smoke/test account.
const sql=neon(databaseUrl);
await sql`
  insert into pilot_test_accounts(student_user_id,label)
  values (${session.appUserId},'post-deploy-smoke')
  on conflict (student_user_id) do update set label=excluded.label
`;
await sql`
  insert into consent_records(student_user_id,consent_type,policy_version,retention_until)
  values (${session.appUserId},'pilot_self','smoke-v1',${retentionUntil})
  on conflict (student_user_id,consent_type) where revoked_at is null do update set
    policy_version=excluded.policy_version,
    retention_until=excluded.retention_until
`;

const tokenResponse=await appFetch("/api/auth/token",{cache:"no-store"});
const tokenBody=await jsonOrText(tokenResponse);
assert.equal(tokenResponse.status,200,`Data API token failed: ${JSON.stringify(tokenBody)}`);
const jwt=tokenBody?.token||tokenBody?.data?.token||null;
assert.ok(typeof jwt==="string"&&jwt.split(".").length===3,"Valid Data API JWT missing");

const dataClient=createClient({dataApi:{url:dataApiUrl,getToken:async()=>jwt}});
const before=await dataClient
  .from("student_cloud_state")
  .select("revision")
  .eq("auth_user_id",session.user.id)
  .maybeSingle();
assert.ok(!before?.error,`Cloud pre-read failed: ${before?.error?.message||"unknown"}`);

const marker=`smoke-${Date.now()}`;
const currentRevision=Number(before?.data?.revision)||0;
const nextRevision=currentRevision+1;
const cloudStart=performance.now();
let write;
if(before?.data){
  write=await dataClient
    .from("student_cloud_state")
    .update({
      state_json:{schema:"aplus-student-state-v8",smokeMarker:marker},
      revision:nextRevision,
      last_device_id:"post-deploy-smoke",
      updated_at:new Date().toISOString()
    })
    .eq("auth_user_id",session.user.id)
    .eq("revision",currentRevision)
    .select("revision")
    .maybeSingle();
}else{
  write=await dataClient
    .from("student_cloud_state")
    .insert({
      auth_user_id:session.user.id,
      state_json:{schema:"aplus-student-state-v8",smokeMarker:marker},
      revision:1,
      last_device_id:"post-deploy-smoke",
      updated_at:new Date().toISOString()
    })
    .select("revision")
    .single();
}
const cloudSaveMs=performance.now()-cloudStart;
assert.ok(!write?.error&&write?.data,`Cloud save failed: ${write?.error?.message||"unknown"}`);

const readBack=await dataClient
  .from("student_cloud_state")
  .select("state_json,revision,last_device_id")
  .eq("auth_user_id",session.user.id)
  .single();
assert.ok(!readBack?.error,`Cloud read-back failed: ${readBack?.error?.message||"unknown"}`);
assert.equal(readBack.data?.state_json?.smokeMarker,marker,"Cloud round-trip marker mismatch");
assert.equal(readBack.data?.last_device_id,"post-deploy-smoke","Cloud device marker mismatch");

const today=new Date().toISOString().slice(0,10);
const syncPayload={
  schema:"aplus-pilot-v1",
  aggregates:[{date:today,type:"app_session",subject:"all",totalCount:1,totalSeconds:1}],
  itemResults:[],
  feedback:[]
};
const syncStart=performance.now();
const syncResponse=await appFetch("/api/pilot/sync",{
  method:"POST",
  headers:{"content-type":"application/json"},
  body:JSON.stringify(syncPayload)
});
const syncMs=performance.now()-syncStart;
const sync=await jsonOrText(syncResponse);
assert.equal(syncResponse.status,200,`Pilot sync failed: ${JSON.stringify(sync)}`);
assert.equal(sync.excludedTestAccount,true,"Smoke account must be excluded from pilot metrics");

const metricCounts=await sql`
  select
    (select count(*)::int from pilot_event_aggregates where student_user_id=${session.appUserId}) as aggregates,
    (select count(*)::int from pilot_item_results where student_user_id=${session.appUserId}) as item_results,
    (select count(*)::int from pilot_feedback where student_user_id=${session.appUserId}) as feedback,
    exists(select 1 from pilot_test_accounts where student_user_id=${session.appUserId}) as marked_test_account
`;
assert.equal(metricCounts[0]?.marked_test_account,true,"Smoke user lost server-only test marker");
assert.deepEqual(
  {aggregates:metricCounts[0]?.aggregates,itemResults:metricCounts[0]?.item_results,feedback:metricCounts[0]?.feedback},
  {aggregates:0,itemResults:0,feedback:0},
  "Smoke account contaminated pilot metrics"
);

// Exercise the erasure endpoint and prove revocation/apagamento blocks the next sync.
const deleteResponse=await appFetch("/api/pilot/data",{method:"DELETE"});
const deleted=await jsonOrText(deleteResponse);
assert.equal(deleteResponse.status,200,`Pilot erasure failed: ${JSON.stringify(deleted)}`);
const blockedResponse=await appFetch("/api/pilot/sync",{
  method:"POST",
  headers:{"content-type":"application/json"},
  body:JSON.stringify(syncPayload)
});
const blocked=await jsonOrText(blockedResponse);
assert.equal(blockedResponse.status,403,`Sync without consent must be blocked: ${JSON.stringify(blocked)}`);
assert.equal(blocked.code,"CONSENT_REQUIRED","Post-erasure sync must fail specifically on consent");

console.log(JSON.stringify({
  ok:true,
  schemaVersion:health.schemaVersion,
  schemaMigration:health.schemaMigration,
  timingsMs:{login:Number(loginMs.toFixed(1)),cloudSave:Number(cloudSaveMs.toFixed(1)),pilotSync:Number(syncMs.toFixed(1))},
  testAccountExcluded:true,
  erasureVerified:true,
  consentGateVerified:true,
  ephemeralAuthUserId:ephemeral?session.user.id:null
}));
