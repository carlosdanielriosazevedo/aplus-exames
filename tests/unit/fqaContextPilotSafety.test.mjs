import {test,expect} from "vitest";
import {spawnSync} from "node:child_process";
const script=new URL("../../scripts/fqa-context-pilot.mjs",import.meta.url).pathname;
const run=(args)=>spawnSync(process.execPath,[script,...args],{
 encoding:"utf8",timeout:10000,env:{PATH:process.env.PATH}
});
test("default pilot uses exactly seven development samples without payment",()=>{
 const result=run([]);
 expect(result.status).toBe(0);
 const report=JSON.parse(result.stdout);
 expect(report.status).toBe("DRY_RUN");
 expect(report.results).toHaveLength(7);
 expect(report.localReservedEstimatedUsd).toBe(0);
 expect(report.results.every(x=>x.status==="DRY_RUN_NOT_EVALUATED")).toBe(true);
});
test("live mode is denied without explicit approval and dedicated gateway access",()=>{
 const result=run(["--live"]);
 expect(result.status).not.toBe(0);
 expect(result.stderr).toMatch(/Live pilot requires approval/);
});
test("explicit dry run cannot consume model output budget",()=>{
 const result=run(["--dry-run"]);
 expect(result.status).toBe(0);
 const report=JSON.parse(result.stdout);
 expect(report.model).toBeNull();
 expect(report.results.every(x=>x.requestSize>1000)).toBe(true);
});
