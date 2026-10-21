import {execFileSync} from "node:child_process";
import {expect,it} from "vitest";
it("production → release → recovery preserves synthetic pending assessments",()=>{
 const result=JSON.parse(execFileSync(process.execPath,["scripts/recovery-compatibility.mjs"],{encoding:"utf8"}));
 expect(result.result).toBe("PASS");
 expect(result.checks).toBeGreaterThan(400);
 expect(result.network).toBe(false);
},30_000);
