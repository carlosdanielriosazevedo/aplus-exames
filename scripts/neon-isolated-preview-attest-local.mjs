#!/usr/bin/env node
// Run the existing read-only Neon role attestation with the exact Vercel Preview
// environment attached to a locally verified project. No env file is created.
// This launcher does NOT deploy, migrate, or print secrets.
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {resolve} from "node:path";
import {spawnSync} from "node:child_process";

const PROJECT_ID="prj_8n5XwTMF651SAfsykIDji93oZp3r";
const cwd=process.cwd();
const linked=resolve(cwd,".vercel","project.json");
const diagnostic=resolve(cwd,"scripts","neon-isolated-server-role-attestation.mjs");

function refuse(reason){
  console.error("BLOCKED: "+reason);
  process.exitCode=2;
}
function main(){
  if(!existsSync(linked))return refuse("No .vercel/project.json. Link this directory to the isolated project with Vercel CLI first.");
  if(!existsSync(diagnostic))return refuse("Run from the PR #453 repository root.");
  if(process.env.DATABASE_URL)return refuse("Pre-existing DATABASE_URL detected; unset it before fetching only the isolated Preview secret.");
  if(process.env.VERCEL_ENV && process.env.VERCEL_ENV!=="preview")
    return refuse("An existing non-Preview VERCEL_ENV was detected.");
  if(process.env.VERCEL_PROJECT_ID && process.env.VERCEL_PROJECT_ID!==PROJECT_ID)
    return refuse("Existing VERCEL_PROJECT_ID points outside the isolated project.");
  let project;
  try{project=JSON.parse(readFileSync(linked,"utf8"));}
  catch{return refuse("Invalid local Vercel link metadata.");}
  if(project.projectId!==PROJECT_ID || !project.orgId)
    return refuse("Local Vercel project link does not match the approved isolated project.");
  assert.equal(project.projectId,PROJECT_ID);

  // The explicit -e preview option chooses the remote environment; the two
  // VERCEL_* values below are local assertions, not independently issued
  // Vercel runtime attestation. The child additionally validates DB hostname.
  const env={...process.env,
    VERCEL_PROJECT_ID:PROJECT_ID,
    VERCEL_ENV:"preview",
    CONFIRM_SYNTHETIC_NEON_READONLY:"YES"
  };
  const args=["env","run","-e","preview","--","node","scripts/neon-isolated-server-role-attestation.mjs"];
  console.log("Verifying isolated Vercel Preview DB role; credentials never printed or written to a file.");
  // cmd.exe is needed for locally installed vercel.cmd on Windows. All command
  // tokens are constants; no shell interpolation of user input or secrets.
  const result=process.platform==="win32"
    ? spawnSync("cmd.exe",["/d","/s","/c","vercel env run -e preview -- node scripts/neon-isolated-server-role-attestation.mjs"],{cwd,env,stdio:"inherit"})
    : spawnSync("vercel",args,{cwd,env,stdio:"inherit"});
  if(result.error)return refuse("Vercel CLI command unavailable or failed to start.");
  if(result.status!==0)return refuse("Preview role attestation did not complete; no migration was attempted.");
  console.log("DONE: Only the attestation query was requested. Verify the output before any subsequent action.");
}
main();
