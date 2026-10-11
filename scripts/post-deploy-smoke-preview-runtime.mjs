import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {performance} from "node:perf_hooks";
import {createClient} from "@neondatabase/neon-js";

const stateFile=process.env.SMOKE_STATE_FILE||"/tmp/aprova-pilot-smoke-session.json";
const dataApiUrl=process.env.SMOKE_DATA_API_URL;
if(!dataApiUrl)throw new Error("SMOKE_DATA_API_URL is required");
const state=JSON.parse(readFileSync(stateFile,"utf8"));
const baseOrigin=new URL(state.baseUrl).origin;
const cookies=new Map(Object.entries(state.cookies||{}));
const cookieHeader=()=>[...cookies].map(([key,value])=>`${key}=${value}`).join("; ");

async function request(path,options={}){
  const headers=new Headers(options.headers||{});
  const cookie=cookieHeader();
  if(cookie)headers.set("cookie",cookie);
  const method=String(options.method||"GET").toUpperCase();
  if(!["GET","HEAD","OPTIONS"].includes(method)){
    headers.set("origin",baseOrigin);
    headers.set("sec-fetch-site","same-origin");
  }
  return fetch(`${state.baseUrl}${path}`,{...options,headers,redirect:"manual"});
}
async function hostileRequest(path,{method="POST",body:nullBody=null}={}){
  const headers=new Headers({origin:"https://example.invalid","sec-fetch-site":"cross-site"});
  const cookie=cookieHeader();
  if(cookie)headers.set("cookie",cookie);
  if(nullBody!==null)headers.set("content-type","application/json");
  return fetch(`${state.baseUrl}${path}`,{method,headers,body:nullBody===null?undefined:JSON.stringify(nullBody),redirect:"manual"});
}
async function body(response){
  const text=await response.text();
  try{return JSON.parse(text)}catch{return {raw:text.slice(0,500)}}
}

const consentResponse=await request("/api/pilot/consent",{
  method:"POST",headers:{"content-type":"application/json"},
  body:JSON.stringify({ageConfirmed:true,accepted:true})
});
const consent=await body(consentResponse);
assert.equal(consentResponse.status,200,`consent failed: ${JSON.stringify(consent)}`);
assert.equal(consent.active,true,"pilot consent must be active");
assert.ok(consent?.consent?.policyVersion,"policy_version must be recorded");
assert.ok(consent?.consent?.grantedAt,"granted_at must be recorded");

const tokenResponse=await request("/api/auth/token",{cache:"no-store"});
const tokenBody=await body(tokenResponse);
assert.equal(tokenResponse.status,200,`token failed: ${JSON.stringify(tokenBody)}`);
const jwt=tokenBody?.token||tokenBody?.data?.token||null;
assert.ok(typeof jwt==="string"&&jwt.split(".").length===3,"valid Data API JWT missing");

const client=createClient({dataApi:{url:dataApiUrl,getToken:async()=>jwt}});
const before=await client.from("student_cloud_state").select("revision").eq("auth_user_id",state.authUserId).maybeSingle();
assert.ok(!before?.error,`cloud pre-read failed: ${before?.error?.message||"unknown"}`);

const marker=`smoke-${Date.now()}`;
const currentRevision=Number(before?.data?.revision)||0;
const cloudStart=performance.now();
let write;
if(before?.data){
  write=await client.from("student_cloud_state")
    .update({state_json:{schema:"aplus-student-state-v8",smokeMarker:marker},revision:currentRevision+1,last_device_id:"post-deploy-smoke",updated_at:new Date().toISOString()})
    .eq("auth_user_id",state.authUserId).eq("revision",currentRevision).select("revision").maybeSingle();
}else{
  write=await client.from("student_cloud_state")
    .insert({auth_user_id:state.authUserId,state_json:{schema:"aplus-student-state-v8",smokeMarker:marker},revision:1,last_device_id:"post-deploy-smoke",updated_at:new Date().toISOString()})
    .select("revision").single();
}
const cloudSaveMs=performance.now()-cloudStart;
assert.ok(!write?.error&&write?.data,`cloud save failed: ${write?.error?.message||"unknown"}`);

const readBack=await client.from("student_cloud_state")
  .select("state_json,revision,last_device_id").eq("auth_user_id",state.authUserId).single();
assert.ok(!readBack?.error,`cloud read-back failed: ${readBack?.error?.message||"unknown"}`);
assert.equal(readBack.data?.state_json?.smokeMarker,marker,"cloud round-trip marker mismatch");
assert.equal(readBack.data?.last_device_id,"post-deploy-smoke","cloud device marker mismatch");

const today=new Date().toISOString().slice(0,10);
const itemExternalId=`smoke-item-${Date.now()}`;
const feedbackExternalId=`smoke-feedback-${Date.now()}`;
const firstPayload={
  schema:"aplus-pilot-v1",
  aggregates:[{date:today,type:"app_session",subject:"all",totalCount:5,totalSeconds:100}],
  itemResults:[{id:itemExternalId,itemId:"smoke:math-a:item-001",outcome:"correct",seconds:12,date:today,subject:"math-a"}],
  feedback:[{id:feedbackExternalId,type:"general",subject:"math-a",rating:5,comment:"smoke feedback",at:new Date().toISOString()}]
};
const lowerPayload={schema:"aplus-pilot-v1",aggregates:[{date:today,type:"app_session",subject:"all",totalCount:3,totalSeconds:80}],itemResults:[],feedback:[]};
const syncTimings=[];
for(const payload of [firstPayload,lowerPayload]){
  const start=performance.now();
  const response=await request("/api/pilot/sync",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});
  syncTimings.push(performance.now()-start);
  const result=await body(response);
  assert.equal(response.status,200,`pilot sync failed: ${JSON.stringify(result)}`);
  assert.equal(result.isTest,true,"smoke account must write with is_test=true");
}

const aggregates=await client.from("pilot_event_aggregates")
  .select("total_count,total_seconds,is_test")
  .eq("period_date",today).eq("event_type","app_session").eq("subject","all").maybeSingle();
assert.ok(!aggregates?.error&&aggregates?.data,`aggregate read failed: ${aggregates?.error?.message||"unknown"}`);
assert.equal(Number(aggregates.data.total_count),5,"GREATEST idempotence failed for total_count");
assert.equal(Number(aggregates.data.total_seconds),100,"GREATEST idempotence failed for total_seconds");
assert.equal(aggregates.data.is_test,true,"test aggregate must be marked is_test=true");

const itemResult=await client.from("pilot_item_results").select("external_id,is_test").eq("external_id",itemExternalId).maybeSingle();
const feedback=await client.from("pilot_feedback").select("external_id,is_test").eq("external_id",feedbackExternalId).maybeSingle();
assert.ok(!itemResult?.error&&itemResult?.data,"smoke item result must be inserted");
assert.ok(!feedback?.error&&feedback?.data,"smoke feedback must be inserted");
assert.equal(itemResult.data.is_test,true,"item result must be marked test");
assert.equal(feedback.data.is_test,true,"feedback must be marked test");

const metricAggregates=await client.from("pilot_event_aggregates").select("student_user_id").eq("is_test",false);
const metricItems=await client.from("pilot_item_results").select("student_user_id").eq("is_test",false);
const metricFeedback=await client.from("pilot_feedback").select("student_user_id").eq("is_test",false);
assert.ok(!metricAggregates?.error&&!metricItems?.error&&!metricFeedback?.error,"metric exclusion reads must succeed");
assert.equal((metricAggregates.data||[]).length,0,"test aggregate must be excluded by is_test=false filter");
assert.equal((metricItems.data||[]).length,0,"test item result must be excluded by is_test=false filter");
assert.equal((metricFeedback.data||[]).length,0,"test feedback must be excluded by is_test=false filter");

const hostileSync=await hostileRequest("/api/pilot/sync",{body:lowerPayload});
assert.equal(hostileSync.status,403,"cross-origin pilot sync must be rejected");
const hostileDelete=await hostileRequest("/api/pilot/data",{method:"DELETE"});
assert.equal(hostileDelete.status,403,"cross-origin pilot delete must be rejected");

const deleteResponse=await request("/api/pilot/data",{method:"DELETE"});
const deleted=await body(deleteResponse);
assert.equal(deleteResponse.status,200,`pilot erasure failed: ${JSON.stringify(deleted)}`);

for(const [table,label] of [["pilot_event_aggregates","aggregates"],["pilot_item_results","item results"],["pilot_feedback","feedback"]]){
  const remaining=await client.from(table).select("student_user_id");
  assert.ok(!remaining?.error,`${label} post-delete read failed`);
  assert.equal((remaining.data||[]).length,0,`DELETE must remove ${label}`);
}
const consentRows=await client.from("consent_records").select("revoked_at,consent_type").eq("consent_type","pilot_self");
assert.ok(!consentRows?.error,"consent post-delete read failed");
assert.ok((consentRows.data||[]).some(row=>row.revoked_at),"consent must remain as revoked record");

const blockedResponse=await request("/api/pilot/sync",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(lowerPayload)});
const blocked=await body(blockedResponse);
assert.equal(blockedResponse.status,403,`post-erasure sync must be 403: ${JSON.stringify(blocked)}`);
assert.equal(blocked.code,"CONSENT_REQUIRED","post-erasure sync must fail on consent");

console.log(JSON.stringify({
  ok:true,phase:"runtime",authUserId:state.authUserId,appUserId:state.appUserId,
  timingsMs:{cloudSave:Number(cloudSaveMs.toFixed(1)),pilotSync:syncTimings.map(value=>Number(value.toFixed(1)))},
  idempotenceVerified:{sentFirst:{count:5,seconds:100},sentSecond:{count:3,seconds:80},stored:{count:Number(aggregates.data.total_count),seconds:Number(aggregates.data.total_seconds)}},
  testWritesVerified:true,testRowsExcludedByFilter:true,csrfVerified:true,erasureVerified:true,consentRevocationVerified:true,consentGateVerified:true
}));
