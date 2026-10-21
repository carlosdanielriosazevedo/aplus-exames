import {readFileSync} from "node:fs";
import {expect,it} from "vitest";

const rules=JSON.parse(readFileSync(new URL("../../vercel.json",import.meta.url),"utf8")).git.deploymentEnabled;

for(const branch of ["fix/paused-diagnostic-primary-cta","fix/consistent-mobile-header-layout"]){
 it(`${branch} explicitly disables automatic Vercel deployments`,()=>{
  expect(rules[branch]).toBe(false);
  // Vercel deploys if any matching rule is true, even alongside a false rule.
  expect(Object.entries(rules).filter(([,enabled])=>enabled===true)).toEqual([["main",true]]);
 });
}

it("disables nested branch names by default without changing main's policy",()=>{
 expect(rules["**"]).toBe(false);
 expect(rules.main).toBe(true);
});
