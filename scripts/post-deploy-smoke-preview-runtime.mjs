import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {performance} from "node:perf_hooks";
import {createClient} from "@neondatabase/neon-js";

const stateFile=process.env.SMOKE_STATE_FILE||"/tmp/aprova-pilot-smoke-session.json";
const dataApiUrl=process.env.SMOKE_DATA_API_URL;
if(!dataApiUrl)throw new Error("SMOKE_DATA_API_URL is required");
const state=JSON.parse(readFileSync(stateFile,"utf8"));
const cookies=new Map(Object.entries(state.cookies||{}));
const cookieHeader=()=>[...cookies].map(([key,value])=>`${key}=${value}`).join("; ");

async function request(path,options={}){
  const headers=new Headers(options.headers||{});
  const cookie=cookieHeader();
  if(cookie)headers.set("cookie",cookie);
  return fetch(`${state.baseUrl}${path}`,{...options,headers,redirect:"manual"});
}
async function body(response){
  const text=await response.text();
  try{return JSON.parse(text)}catch{return {raw:text.slice(0,500)}}
}

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

const payload={
  schema:"aplus-pilot-v1",
  aggregates:[{date:new Date().toISOString().slice(0,10),type:"app_session",subject:"all",totalCount:1,totalSeconds:1}],
  itemResults:[],feedback:[]
};
const syncStart=performance.now();
const syncResponse=await request("/api/pilot/sync",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});
const syncMs=performance.now()-syncStart;
const sync=await body(syncResponse);
assert.equal(syncResponse.status,200,`pilot sync failed: ${JSON.stringify(sync)}`);
assert.equal(sync.excludedTestAccount,true,"smoke account must be excluded from metrics");

const deleteResponse=await request("/api/pilot/data",{method:"DELETE"});
const deleted=await body(deleteResponse);
assert.equal(deleteResponse.status,200,`pilot erasure failed: ${JSON.stringify(deleted)}`);

const blockedResponse=await request("/api/pilot/sync",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});
const blocked=await body(blockedResponse);
assert.equal(blockedResponse.status,403,`post-erasure sync must be 403: ${JSON.stringify(blocked)}`);
assert.equal(blocked.code,"CONSENT_REQUIRED","post-erasure sync must fail on consent");

console.log(JSON.stringify({
  ok:true,phase:"runtime",authUserId:state.authUserId,appUserId:state.appUserId,
  timingsMs:{cloudSave:Number(cloudSaveMs.toFixed(1)),pilotSync:Number(syncMs.toFixed(1))},
  testAccountExcluded:true,erasureVerified:true,consentGateVerified:true
}));
