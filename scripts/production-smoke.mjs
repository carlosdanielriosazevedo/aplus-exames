import assert from "node:assert/strict";

const required=name=>{
  const value=process.env[name];
  if(!value)throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

const baseUrl=required("SMOKE_BASE_URL").replace(/\/$/,"");

async function getJson(path){
  const response=await fetch(`${baseUrl}${path}`,{cache:"no-store",redirect:"manual"});
  const text=await response.text();
  let body;
  try{body=JSON.parse(text)}catch{body={raw:text.slice(0,500)}}
  return {response,body};
}

const health=await getJson("/api/health");
assert.equal(health.response.status,200,`Production /api/health must return 200, got ${health.response.status}`);
assert.equal(health.body?.ok,true,"Production health must return ok=true");
assert.equal(health.body?.backendConfigured,true,"Production backend must be configured");
assert.equal(health.body?.backendReachable,true,"Production backend must be reachable");
assert.equal(health.body?.provider,"neon-postgres","Production must use Neon Postgres");
assert.equal(Number(health.body?.schemaVersion),8,`Expected production schemaVersion 8, got ${health.body?.schemaVersion}`);
assert.equal(health.body?.schemaMigration,"008_pilot_telemetry_consent",`Unexpected production schema migration: ${health.body?.schemaMigration}`);
assert.equal(health.body?.region,"fra1",`Expected production runtime region fra1, got ${health.body?.region}`);
assert.equal(health.body?.pilotSmokeApiVersion,null,"Preview-only smoke API must stay disabled in production");
assert.equal(health.body?.dataApiUrl,null,"Production health must not expose the Neon Data API URL");

const previewOnlySmoke=await getJson("/api/pilot/smoke");
assert.equal(previewOnlySmoke.response.status,404,"Preview-only /api/pilot/smoke must be unavailable in production");
assert.equal(previewOnlySmoke.body?.error,"NOT_FOUND","Production smoke endpoint must fail closed with NOT_FOUND");

const homeResponse=await fetch(`${baseUrl}/`,{cache:"no-store",redirect:"manual"});
assert.ok(homeResponse.status>=200&&homeResponse.status<400,`Production home route failed with ${homeResponse.status}`);

console.log(JSON.stringify({
  ok:true,
  baseUrl,
  region:health.body.region,
  schemaVersion:health.body.schemaVersion,
  schemaMigration:health.body.schemaMigration,
  backendReachable:health.body.backendReachable,
  previewOnlySmokeDisabled:true,
  homeStatus:homeResponse.status
}));
