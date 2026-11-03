import {test,expect} from "vitest";
import {readFileSync,mkdtempSync,writeFileSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {spawnSync} from "node:child_process";

const workflow=readFileSync(new URL("../../.github/workflows/neon-rls-synthetic.yml",import.meta.url),"utf8");
function job(id){
  const marker=`  ${id}:\n`,start=workflow.indexOf(marker);
  if(start<0)throw Error(`Missing ${id}`);
  const rest=workflow.slice(start+marker.length),end=rest.search(/^  [\w-]+:/m);
  return end<0?rest:rest.slice(0,end);
}
function inline(block,command){
  const marker=`          ${command} <<'JS'\n`,start=block.indexOf(marker);
  if(start<0)throw Error("Missing executable verdict");
  return block.slice(start+marker.length).split("          JS")[0].replace(/^          /gm,"");
}
const p1=job("p1-recovery-security"),gate=job("recovery-browser-validation");
test("P1 runs independently of F7 and always verifies actual completed evidence",()=>{
  expect(p1).not.toMatch(/^    needs:/m);
  expect(p1).not.toContain("snapshot-recovery-security");
  expect(p1).not.toContain("continue-on-error");
  expect(p1).toContain("node tests/scripts/recovery-authorization-browser-contract.mjs");
  expect(p1).toMatch(/id: p1-verdict\n        if: always\(\)/);
  expect(gate).toContain("needs: [snapshot-recovery-security, p1-recovery-security]");
  expect(gate).toContain("if: always()");
});
test.each([
  ["success","success","true",0],
  ["failure","success","true",1],
  ["success","failure","true",1],
  ["success","skipped","",1],
  ["success","cancelled","",1],
  ["success","success","",1],
  ["skipped","success","true",1]
])("global browser verdict F7=%s P1=%s completed=%s",(f7,p1Result,completed,status)=>{
  const result=spawnSync(process.execPath,["-e",inline(gate,"node -")],{env:{F7_RESULT:f7,P1_RESULT:p1Result,P1_COMPLETED:completed},encoding:"utf8"});
  expect(result.error).toBeUndefined();expect(result.status).toBe(status);
});
const fields=['foreignReadsDenied','foreignDownloadDenied','forgedIdentifierDenied','legacyQuarantined','unavailableExpiredRevokedDenied','lateResponseDenied','silentCookieChangeDenied','networkAbortDenied','legitimateARecovery','originalAUnchanged','accountBUnchanged','localRepairPassed','cloudRepairPassed'];
const report=()=>({result:"P1_FIXED_BROWSER_CONTRACT_PASS",...Object.fromEntries(fields.map(field=>[field,true])),pageErrors:[]});
test.each(["passed","not-run","broken-json","foreign-leak","recovery-failed","page-error"])("P1 verdict requires evidence: %s",kind=>{
  const dir=mkdtempSync(join(tmpdir(),"p1-ci-verdict-")),path=join(dir,"report.json"),output=join(dir,"output");
  try{
    const value=report();
    if(kind==="foreign-leak")value.foreignDownloadDenied=false;
    if(kind==="recovery-failed")value.legitimateARecovery=false;
    if(kind==="page-error")value.pageErrors=[{message:"synthetic error"}];
    if(kind!=="not-run")writeFileSync(path,kind==="broken-json"?"{broken":JSON.stringify(value));
    const result=spawnSync(process.execPath,["--input-type=module","-e",inline(p1,"node --input-type=module -")],{env:{P1_REPORT:path,GITHUB_OUTPUT:output},encoding:"utf8"});
    expect(result.error).toBeUndefined();
    if(kind==="passed"){expect(result.status).toBe(0);expect(readFileSync(output,"utf8")).toBe("completed=true\n");}
    else expect(result.status).not.toBe(0);
  }finally{rmSync(dir,{recursive:true,force:true});}
});
