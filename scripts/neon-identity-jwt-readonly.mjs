#!/usr/bin/env node
// Neon Data API read-only RLS boundary smoke for an APPROVED synthetic-only target.
// NOT part of automated CI: needs 3 real, distinct Neon Auth JWTs supplied at runtime.
// No secrets, JWTs, IDs, emails or response bodies are printed.
// Requires a separately reviewed/applicable RLS migration (schema version 9).
import assert from "node:assert/strict";

const url=process.env.NEON_SYNTHETIC_DATA_API_URL?.replace(/\/+$/,"");
const roles={
  "student A":process.env.NEON_SYNTHETIC_JWT_A,
  "student B":process.env.NEON_SYNTHETIC_JWT_B,
  "parent P":process.env.NEON_SYNTHETIC_JWT_P
};
const allow=process.env.CONFIRM_SYNTHETIC_NEON_READONLY==="YES";

function requireConfigured(){
  if(!allow)throw new Error("Set CONFIRM_SYNTHETIC_NEON_READONLY=YES only after verifying data provenance.");
  // Exact-host allowlist prevents this script from accidentally querying production.
  const expectedHost="ep-holy-term-b93irruj.apirest.c-7.eu-central-1.aws.neon.tech";
  let parsed;
  try{parsed=new URL(url);}catch{throw new Error("Invalid Neon Data API URL");}
  if(parsed.protocol!=="https:" || parsed.hostname!==expectedHost ||
      parsed.pathname!=="/neondb/rest/v1" || parsed.search || parsed.hash)
    throw new Error("Only the verified synthetic Neon Data API endpoint is permitted.");
  for(const [name,jwt] of Object.entries(roles)){
    if(typeof jwt!=="string" || jwt.split(".").length!==3)
      throw new Error("Missing/invalid-format test token for "+name+" (token not printed)");
  }
}

function subject(jwt){
  let payload;
  try{payload=JSON.parse(Buffer.from(jwt.split(".")[1],"base64url").toString("utf8"));}
  catch{throw new Error("Cannot decode synthetic JWT subject");}
  if(typeof payload.sub!=="string" || !payload.sub)throw new Error("Synthetic JWT has no subject");
  return payload.sub;
}
async function query(path,token=null){
  const headers={"accept":"application/json"};
  if(token)headers.authorization="Bearer "+token;
  const r=await fetch(url+path,{
    method:"GET",headers,cache:"no-store",redirect:"error",
    signal:AbortSignal.timeout(12000)
  });
  // Never log response bodies, headers or credentials.
  if(r.status!==200)throw new Error("Read-only Data API request returned HTTP "+r.status);
  const data=await r.json();
  assert(Array.isArray(data),"Unexpected Data API response format");
  return data;
}

async function main(){
  requireConfigured();
  const subjects=Object.values(roles).map(subject);
  assert.equal(new Set(subjects).size,3,"Synthetic actor JWTs must be distinct");
  // Fail closed: never request identity/parental rows against unpatched schema 8.
  // Query only the public schema marker using a real signed test-account JWT.
  // The marker has a SELECT-true policy for authenticated in migration 008.
  const marker=await query("/app_schema_meta?select=schema_version&singleton=eq.true",roles["student A"]);
  assert.equal(marker.length,1,"Missing or inaccessible migration schema marker");
  assert.equal(Number(marker[0]?.schema_version),9,
    "Refusing identity reads until reviewed migration 009 is applied");

  console.log("Starting synthetic Neon Data API JWT read-only checks");
  // A denied response (401/403) and a successful empty list are both secure.
  const anonResponse=await fetch(url+"/app_users?select=id",{
    method:"GET",headers:{"accept":"application/json"},cache:"no-store",
    redirect:"error",signal:AbortSignal.timeout(12000)
  });
  if(anonResponse.status===200){
    const anonRows=await anonResponse.json();
    assert(Array.isArray(anonRows) && anonRows.length===0,
      "Anonymous access exposed identity rows");
  }else{
    assert([401,403].includes(anonResponse.status),
      "Unexpected anonymous response HTTP "+anonResponse.status);
  }
  const ids=[];
  for(const [name,token] of Object.entries(roles)){
    const expected=subject(token);
    const users=await query("/app_users?select=id,auth_user_id",token);
    assert.equal(users.length,1,name+": wrong identity row count (possible cross-user exposure)");
    assert.equal(users[0].auth_user_id,expected,name+": observed JWT-sub/RLS mismatch");
    ids.push(users[0].id);
    const rolesRows=await query("/app_user_roles?select=user_id,role",token);
    assert(rolesRows.every(x=>x.user_id===users[0].id),name+": other user's roles leaked");
  }
  assert.equal(new Set(ids).size,3,"Unexpected shared app_user IDs");
  console.log("PASS: anonymous and student A/B/parent P identity isolation via live signed JWT requests");
  console.log("NOTE: this smoke is GET-only; it does NOT prove writes are blocked, parental consent, CAS, or trigger behavior");
}
main().catch(err=>{
  console.error("FAIL: "+String(err.message||err));
  process.exitCode=1;
});
