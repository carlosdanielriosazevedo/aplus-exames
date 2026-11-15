import assert from "node:assert/strict";
import {mkdtempSync,readFileSync,writeFileSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {execFileSync} from "node:child_process";
import {importFixture,gitFile,MAIN_REFERENCE,PR453_REFERENCE,clientDoubles} from "./bundle.mjs";

const storage=()=>{const data=new Map();return {get length(){return data.size},key:i=>[...data.keys()][i]??null,
  getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)}};
globalThis.localStorage=storage();globalThis.sessionStorage=storage();
globalThis.window={location:{origin:"https://isolated.example.invalid"},addEventListener(){}};
const fixture=globalThis.__f5Fixture={user:"A",headers:new Headers(),sqlCalls:[],rows:new Map(),
  adapter:{getSession:async()=>({data:{user:{id:fixture.user}}})}};
const jwt=subject=>"header."+Buffer.from(JSON.stringify({sub:subject})).toString("base64url")+".synthetic";
fixture.createClient=config=>({from:()=>{
  let row;const builder={eq:()=>builder,select:()=>builder,maybeSingle:async()=>({data:null}),
    insert:value=>{row=value;return builder},single:async()=>{
      const token=await config.dataApi.getToken();
      assert.equal(JSON.parse(Buffer.from(token.split(".")[1],"base64url")).sub,row.auth_user_id);
      fixture.rows.set(row.auth_user_id,row);return {data:row};
    }};return builder;
}});
globalThis.fetch=async url=>url==="/api/auth/token"?Response.json({token:jwt(fixture.user)}):Response.json({ok:true,user:{id:fixture.user}});
const baseline=await importFixture('export * as cloud from "fixture:app/lib/cloud.js"; export * as reliability from "fixture:app/lib/cloudReliability.js";',{
  overrides:{...clientDoubles,"app/lib/cloud.js":gitFile(MAIN_REFERENCE,"app/lib/cloud.js"),
    "app/lib/cloudReliability.js":gitFile(MAIN_REFERENCE,"app/lib/cloudReliability.js")}});
const aState={xp:42,scores:{},identity:{authUserId:"A"}};
baseline.reliability.queueCloudSave(aState);
fixture.user="B";
await baseline.cloud.saveStudentCloudState(baseline.reliability.listPendingCloudSaves()[0].state);
assert.equal(fixture.rows.get("B").state_json.xp,42);
console.log("REPRODUCED main "+MAIN_REFERENCE+": A pending XP=42 was sent to B's row (synthetic only)");

fixture.rows.clear();fixture.user="A";
fixture.sql=async(strings,...values)=>{
  const query=strings.join("?");fixture.sqlCalls.push({query,values});
  if(/select state_json/.test(query))return fixture.rows.has(values[0])?[fixture.rows.get(values[0])]:[];
  if(/insert into public.student_cloud_state/.test(query)){
    const [id,serialized,device]=values;if(fixture.rows.has(id))return [];
    const row={revision:1,state_json:JSON.parse(serialized),last_device_id:device};fixture.rows.set(id,row);return [row];
  }
  if(/update public.student_cloud_state/.test(query)){
    const [serialized,device,id,revision]=values,old=fixture.rows.get(id);
    if(!old||old.revision!==revision)return [];
    const row={revision:revision+1,state_json:JSON.parse(serialized),last_device_id:device};fixture.rows.set(id,row);return [row];
  }
  throw Error("Unexpected synthetic SQL");
};
const overrides={...clientDoubles,
  // F6 requires the actual SDK session envelope, not merely a user label.
  "app/lib/server/auth":'export const serverAuthConfigured=()=>true; export const getServerAuth=()=>({getSession:async()=>{const f=globalThis.__f5Fixture;return {data:f.authRevoked?null:{user:{id:f.user},session:{id:"synthetic-transport-session",userId:f.user,expiresAt:new Date(Date.now()+(f.authExpired?-1000:3600000)).toISOString()}}};}});',
  "app/lib/server/db":'export const databaseConfigured=()=>true; export const getSql=()=>globalThis.__f5Fixture.sql;',
  "next/headers":'export const headers=async()=>globalThis.__f5Fixture.headers;',
  "next/server":'export const NextResponse={json:(...args)=>Response.json(...args)};'
};
// Exercise the actual #453 identity hardening as well. Git merges F5's extra
// account precondition with that module without changing either branch.
const mergeDir=mkdtempSync(join(tmpdir(),"f5-identity-compat-"));
try{
  const names=["ours","base","theirs"].map(name=>join(mergeDir,name));
  writeFileSync(names[0],readFileSync("app/lib/server/identity.js"));
  writeFileSync(names[1],gitFile(MAIN_REFERENCE,"app/lib/server/identity.js"));
  writeFileSync(names[2],gitFile(PR453_REFERENCE,"app/lib/server/identity.js"));
  overrides["app/lib/server/identity.js"]=execFileSync("git",["merge-file","-p",...names],{encoding:"utf8"});
}finally{rmSync(mergeDir,{recursive:true,force:true});}
for(const file of ["app/api/cloud/state/route.js","app/lib/server/cloud-state-store.js","app/lib/server/cloud-state-validation.js"])
  overrides[file]=gitFile(PR453_REFERENCE,file);
const fixed=await importFixture('export * as route from "fixture:app/api/cloud/state/route.js"; export * as identity from "fixture:app/lib/server/identity.js"; export * as cloud from "fixture:app/lib/cloud.js"; export * as accounts from "fixture:app/lib/cloudAccountSession.js";', {overrides});
let switchAtPost=false;
globalThis.fetch=async(url,options={})=>{
  fixture.headers=new Headers(options.headers);
  if(url==="/api/auth/session"){
    try{const auth=await fixed.identity.requireSession();return Response.json({ok:true,user:{id:auth.authUserId}})}
    catch(error){return Response.json({ok:false},{status:error.status})}
  }
  assert.equal(url,"/api/cloud/state","CAS must never fall back to Data API");
  if(options.method!=="POST")return fixed.route.GET();
  if(switchAtPost)fixture.user="B";
  const headers=new Headers(options.headers);headers.set("origin",window.location.origin);
  return fixed.route.POST(new Request(window.location.origin+url,{...options,headers}));
};
const context=await fixed.accounts.openVerifiedAccount();
const state=fixed.accounts.newAccountState({xp:17,scores:{},subjectProgress:{}},context);
assert.equal((await fixed.cloud.saveStudentCloudState(state,{accountContext:context})).ok,true);
assert.equal((await fixed.cloud.loadStudentCloudState({accountContext:context})).state_json.xp,17);
fixture.rows.set("B",{revision:8,state_json:{xp:900}});
const writesBefore=fixture.sqlCalls.filter(x=>/insert into|update public/.test(x.query)).length;
switchAtPost=true;
await assert.rejects(fixed.cloud.saveStudentCloudState({...state,xp:999},{expectedRevision:1,knownRemote:true,accountContext:context}));
assert.equal(fixture.sqlCalls.filter(x=>/insert into|update public/.test(x.query)).length,writesBefore);
assert.deepEqual(fixture.rows.get("B"),{revision:8,state_json:{xp:900}});
assert.equal(fixture.rows.get("A").state_json.xp,17);
fixture.headers=new Headers();
await assert.rejects(fixed.identity.requireSession({accountBound:true}),{status:403});
fixture.headers=new Headers({"x-approva-account":"A"});
await assert.rejects(fixed.identity.requireSession(),{status:403});
fixture.headers=new Headers();fixture.authExpired=true;
await assert.rejects(fixed.identity.requireSession(),{status:401});
fixture.authExpired=false;fixture.authRevoked=true;
await assert.rejects(fixed.identity.requireSession(),{status:401});
assert.equal(fixture.sqlCalls.filter(x=>/insert into|update public/.test(x.query)).length,writesBefore);
console.log("PASS F5 client + actual #453 route/store/validation and three-way-merged identity at "+PR453_REFERENCE+": same-account save/read; stale A->B POST rejected before SQL; B XP=900 unchanged; missing required header rejected");
