// Offline contract test. No database, network, or secrets.
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {pathToFileURL} from "node:url";
import {resolve} from "node:path";

async function loadPureModule(path){
  const source=readFileSync(path,"utf8");
  return import("data:text/javascript;base64,"+Buffer.from(source).toString("base64"));
}
const {validateCloudWrite}=await import(pathToFileURL(resolve("app/lib/server/cloud-state-validation.js")));
const {writeCloudRow}=await loadPureModule("app/lib/server/cloud-state-store.js");
const validState={schema:"aplus-student-state-v8",xp:4,subjectProgress:{}};
const payload=(operation,expectedRevision,state=validState)=>({
  operation,expectedRevision,deviceId:"synthetic-device",state
});

for(const [name,input] of [
  ["negative revision",payload("update",-1)],
  ["fractional revision",payload("update",0.5)],
  ["overflow revision",payload("update",2_147_483_647)],
  ["invalid initial revision",payload("insert",1)],
  ["unexpected operation",payload("delete",0)],
  ["missing state",payload("update",0,null)],
  ["wrong schema",payload("update",0,{schema:"untrusted"})],
  ["forbidden response text",payload("update",0,{...validState,subjectProgress:{s:{answers:"sensitive"}}})],
  ["invalid device", {...payload("update",0),deviceId:"x\ny"}]
]){
  assert.equal(validateCloudWrite(input).ok,false,name+" must fail");
}
console.log("PASS: bad revision, operation, schema, device and private responses denied");

const prepared=validateCloudWrite(payload("update",3));
assert(prepared.ok,"Valid update was rejected");
const calls=[];
const fakeSql=async (strings,...args)=>{
  const query=strings.join("?").replace(/\s+/g," ").trim().toLowerCase();
  calls.push({query,args});
  if(query.startsWith("update public.student_cloud_state"))
    return [{updated_at:"2026-11-02T00:00:00Z",revision:4,last_device_id:"synthetic-device"}];
  throw Error("Unexpected mock query");
};
const saved=await writeCloudRow(fakeSql,"jwt-subject-a",prepared);
assert(saved.ok&&saved.data.revision===4);
assert.equal(calls.length,1,"Successful CAS must be one statement");
assert.match(calls[0].query,/where auth_user_id=\? and revision=\?/);
assert.match(calls[0].query,/revision=revision\+1/);
assert.equal(calls[0].args[2],"jwt-subject-a","Owner must be injected server-side");
assert.equal(calls[0].args[3],3,"Expected revision is required in SQL");
console.log("PASS: owner-bound SQL CAS uses atomic revision check");

let conflicted=0;
const staleSql=async(strings,...args)=>{
  const q=strings.join("?").toLowerCase();
  if(q.includes("update public.student_cloud_state"))return [];
  if(q.includes("select state_json")){conflicted++;return [{revision:8,state_json:{...validState,xp:8}}];}
  throw Error("Unexpected query");
};
const stale=await writeCloudRow(staleSql,"jwt-subject-a",prepared);
assert.equal(stale.conflict,true);
assert.equal(stale.remote.revision,8);
assert.equal(conflicted,1);
console.log("PASS: stale update reports the latest remote snapshot");

const insertPrepared=validateCloudWrite(payload("insert",0));
let seenInsert=false;
const insertSql=async(strings,...args)=>{
  const q=strings.join("?").replace(/\s+/g," ").toLowerCase();
  if(q.includes("insert into public.student_cloud_state")){
    assert.match(q,/on conflict \(auth_user_id\) do nothing/);
    assert.equal(args[0],"jwt-subject-a");
    seenInsert=true;
    return [{revision:1,updated_at:"2026-11-02T00:00:00Z"}];
  }
  throw Error("Unexpected query");
};
const created=await writeCloudRow(insertSql,"jwt-subject-a",insertPrepared);
assert(created.ok&&seenInsert&&created.data.revision===1);
console.log("PASS: initial insert never overwrites an existing state");

const browser=readFileSync("app/lib/cloud.js","utf8");
const route=readFileSync("app/api/cloud/state/route.js","utf8");
const migration=readFileSync("db/migrations/009_v5_8_neon_rls_history_hardening.sql","utf8");
assert(!browser.includes('.from("student_cloud_state")'),"Browser still writes/reads direct Data API cloud state");
assert(browser.includes('fetch("/api/cloud/state"'),"Browser not using server API");
assert(route.includes('requireSession()'),"Server session enforcement missing");
assert(!route.includes("requireCapability("),"Cloud sync must not assume a default app_user_roles row");
assert(route.includes("sameOriginRequest(request)"),"POST missing CSRF protection");
assert(route.includes("MAX_CLOUD_POST_BYTES"),"Body size limit missing");
assert(migration.includes("REVOKE ALL ON TABLE public.student_cloud_state FROM authenticated, anonymous, PUBLIC"));
assert(migration.includes("DROP POLICY IF EXISTS \"student_cloud_state_delete_own\""));
console.log("PASS: route has authenticated role, CSRF and body limits; direct grants revoked");
