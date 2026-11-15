import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import {readFileSync,existsSync,mkdtempSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {resolve,join} from "node:path";
import {syntheticPostgresUrl} from "../helpers/syntheticPostgresUrl.mjs";

const root=resolve("audits/neon-preview-attestation");
const source=readFileSync(join(root,"attest.mjs"),"utf8");
const config=JSON.parse(readFileSync(join(root,"vercel.json"),"utf8"));
const pkg=JSON.parse(readFileSync(join(root,"package.json"),"utf8"));
assert.equal(config.framework,null);
assert.equal(config.outputDirectory,"public");
assert.equal(config.public,false);
assert.equal(config.buildCommand,"npm run build");
assert.match(config.installCommand,/--ignore-scripts/);
assert.equal(pkg.scripts.build,"node attest.mjs");
assert.equal(pkg.dependencies["@neondatabase/serverless"],"1.2.0");
assert(!/\/api\/|export\s+(default\s+)?(function|async\s+function)\s+(GET|POST)/.test(source),
  "Never deploy an HTTP endpoint or route");
assert.match(source,/FROM pg_catalog\.pg_roles AS r/);
assert.match(source,/has_table_privilege/);
assert(!/\b(INSERT INTO|UPDATE\s+public\.|DELETE FROM|ALTER TABLE|DROP TABLE|CREATE TABLE)\b/i.test(source),
  "Diagnostic source must not contain data-changing SQL");
const temp=mkdtempSync(join(tmpdir(),"neon-preview-build-audit-"));
const baseline={...process.env};
delete baseline.DATABASE_URL;
baseline.VERCEL_ENV="preview";
delete baseline.VERCEL_TARGET_ENV;
delete baseline.VERCEL_PROJECT_ID;
function run(env){
  const r=spawnSync(process.execPath,[join(root,"attest.mjs")],{
    cwd:temp,env:{...baseline,...env},encoding:"utf8",timeout:10000
  });
  if(r.error)throw r.error;
  assert.notEqual(r.status,0,"A failed preflight must be fatal");
  assert(!existsSync(join(temp,"public","index.html")),"No public deployment output on failure");
  assert(!r.stdout.includes("ATTESTATION_RESULT"),"Never claim success in blocked preflight");
  return r.stderr;
}
try{
  assert(run({VERCEL_ENV:"production"}).includes("NOT_PREVIEW"));
  assert(run({VERCEL_ENV:"preview",VERCEL_TARGET_ENV:"production"}).includes("WRONG_TARGET"));
  assert(run({VERCEL_PROJECT_ID:"prj_wrong"}).includes("WRONG_PROJECT"));
  assert(run({}).includes("PREVIEW_SECRET_UNAVAILABLE"));
  const unrelated=syntheticPostgresUrl("postgresql://unrelated.example.invalid/neondb");
  const log=run({DATABASE_URL:unrelated});
  assert(log.includes("WRONG_DATABASE_TARGET"));
  assert(!log.includes(unrelated),"Database URL was exposed");
  const wrongDb=syntheticPostgresUrl("postgresql://ep-holy-term-b93irruj.c-7.eu-central-1.aws.neon.tech/wrong-database");
  assert(run({DATABASE_URL:wrongDb}).includes("WRONG_DATABASE_TARGET"));
  const malformed="not-a-database-url";
  assert(run({DATABASE_URL:malformed}).includes("MALFORMED_SECRET"));
  console.log("PASS: isolated Preview identity, exact Neon allowlist, no-secret logging, no SQL writes or HTTP endpoint");
}finally{
  rmSync(temp,{recursive:true,force:true});
}
