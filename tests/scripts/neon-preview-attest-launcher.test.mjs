import assert from "node:assert/strict";
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,existsSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join,resolve,delimiter} from "node:path";
import {spawnSync} from "node:child_process";

const launcher=resolve("scripts/neon-isolated-preview-attest-local.mjs");
const temp=mkdtempSync(join(tmpdir(),"isolated-attest-"));
const bin=join(temp,"bin");
const scripts=join(temp,"scripts");
const projectDir=join(temp,".vercel");
const marker=join(temp,"cli-invoked.txt");
mkdirSync(bin);mkdirSync(scripts);mkdirSync(projectDir);
writeFileSync(join(scripts,"neon-isolated-server-role-attestation.mjs"),"// offline stub, not executed\n");
const executable=join(bin,"vercel");
writeFileSync(executable,`#!/bin/sh
printf '%s\\n' "$@" > "$MOCK_ARGS_FILE"
echo "MOCK CLI: no network or secrets"
exit 0
`,{mode:0o755});

const cleanEnv={...process.env,PATH:bin+delimiter+process.env.PATH,MOCK_ARGS_FILE:marker};
delete cleanEnv.DATABASE_URL;
delete cleanEnv.VERCEL_ENV;
delete cleanEnv.VERCEL_PROJECT_ID;
const project=(projectId)=>writeFileSync(join(projectDir,"project.json"),
 JSON.stringify({projectId,orgId:"team-test-only"}));
function run(override={}){
  if(existsSync(marker))rmSync(marker);
  return spawnSync(process.execPath,[launcher],{cwd:temp,
   env:{...cleanEnv,...override},encoding:"utf8",timeout:15000});
}
try{
  let r=run();
  assert.notEqual(r.status,0,"Missing link should fail");
  assert(!existsSync(marker),"CLI must not run without project link");
  console.log("PASS: absent linked project blocked");

  project("prj_wrong");
  r=run();
  assert.notEqual(r.status,0,"Wrong Vercel project should fail");
  assert(!existsSync(marker),"CLI must not run for wrong Vercel project");
  console.log("PASS: wrong project blocked");

  project("prj_8n5XwTMF651SAfsykIDji93oZp3r");
  r=run({DATABASE_URL:"postgres://unsafe.example.invalid/db"});
  assert.notEqual(r.status,0,"Stale local DB URL should fail");
  assert(!existsSync(marker),"CLI must not run with stale local DB URL");
  console.log("PASS: pre-existing DB URL blocked");

  r=run({VERCEL_ENV:"production"});
  assert.notEqual(r.status,0,"Existing production scope should fail");
  assert(!existsSync(marker),"CLI must not run with production scope");
  console.log("PASS: production scope blocked");

  r=run();
  assert.equal(r.status,0,"Allowed link should launch mocked Vercel CLI: "+r.stderr);
  const args=readFileSync(marker,"utf8").trim().split("\n");
  assert.deepEqual(args,["env","run","-e","preview","--","node",
    "scripts/neon-isolated-server-role-attestation.mjs"]);
  console.log("PASS: approved link executes only Preview env-run command (offline mock)");
}finally{
  rmSync(temp,{recursive:true,force:true});
}
