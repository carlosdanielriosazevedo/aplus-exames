// Offline contract checks for the gated Neon real-JWT read-only smoke.
import {spawnSync} from "node:child_process";
import assert from "node:assert/strict";

const base="https://ep-holy-term-b93irruj.apirest.c-7.eu-central-1.aws.neon.tech/neondb/rest/v1";
const token=(sub)=>"eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0."+
  Buffer.from(JSON.stringify({sub,role:"authenticated"})).toString("base64url")+".mock";
const env={
  ...process.env,
  CONFIRM_SYNTHETIC_NEON_READONLY:"YES",
  NEON_SYNTHETIC_DATA_API_URL:base,
  NEON_SYNTHETIC_JWT_A:token("synthetic-student-a"),
  NEON_SYNTHETIC_JWT_B:token("synthetic-student-b"),
  NEON_SYNTHETIC_JWT_P:token("synthetic-parent-p")
};
function run(overrides){
  const result=spawnSync(process.execPath,[
    "--import","./tests/scripts/mock-neon-jwt-fetch.mjs",
    "./scripts/neon-identity-jwt-readonly.mjs"
  ],{cwd:process.cwd(),env:{...env,...overrides},
    encoding:"utf8",timeout:15000});
  if(result.error)throw result.error;
  return result;
}

const blocked=run({SYNTHETIC_MOCK_SCHEMA_VERSION:"8"});
assert.notEqual(blocked.status,0,"JWT smoke must reject an RLS-off schema 8");
assert(blocked.stderr.includes("Refusing identity reads until reviewed migration 009 is applied"),
  "JWT smoke did not reject schema 8 before identity reads");
assert(!blocked.stderr.includes("MOCK_UNSAFE_IDENTITY_READ_BEFORE_SCHEMA_GATE"),
  "JWT smoke accessed identity rows before confirming schema 9");
console.log("PASS: schema 8 is rejected before protected-table queries");

const allowed=run({SYNTHETIC_MOCK_SCHEMA_VERSION:"9"});
assert.equal(allowed.status,0,"JWT smoke failed synthetic schema 9: "+allowed.stderr);
assert(allowed.stdout.includes("PASS: anonymous and student A/B/parent P identity isolation"),
  "JWT smoke did not verify all synthetic identity claims");
console.log("PASS: schema 9 read-only identity smoke works against offline mock");

const noConsent=run({
  SYNTHETIC_MOCK_SCHEMA_VERSION:"9",
  CONFIRM_SYNTHETIC_NEON_READONLY:""
});
assert.notEqual(noConsent.status,0,"Smoke must require opt-in");
assert(noConsent.stderr.includes("CONFIRM_SYNTHETIC_NEON_READONLY=YES"),
  "Smoke did not fail closed on missing opt-in");
console.log("PASS: no opt-in means no test requests");

const wrongHost=run({
  SYNTHETIC_MOCK_SCHEMA_VERSION:"9",
  NEON_SYNTHETIC_DATA_API_URL:"https://production.example.com/rest/v1"
});
assert.notEqual(wrongHost.status,0,"Smoke must restrict URL to isolated test host");
assert(wrongHost.stderr.includes("Only the verified synthetic Neon Data API endpoint is permitted."),
  "Smoke did not reject alternate hosts");
console.log("PASS: accidental production host rejected");
