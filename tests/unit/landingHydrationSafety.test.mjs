import {test,expect} from "vitest";
import {readFileSync} from "node:fs";
const source=readFileSync(new URL("../../app/page.js",import.meta.url),"utf8");
test("landing before hydration is a loader, not an inactive CTA",()=>{
 expect(source).toMatch(/if\(!ready\)return <Loading\/>/);
 expect(source).not.toMatch(/if\(!ready\)return <Landing onStart=\{\(\)=>\{\}\}\/>/);
});
test("loading state communicates progress to assistive technologies",()=>{
 expect(source).toMatch(/function Loading\(\).*aria-busy="true"/);
 expect(source).toMatch(/function Loading\(\).*aria-live="polite"/);
});
test("onboarding CTA has a non-submit button and real callback",()=>{
 expect(source).toMatch(/<button type="button" onClick=\{onStart\}>Descobrir o meu nível/);
 expect(source).toMatch(/function start\(\)/);
});
test("existing progress remains a boot condition",()=>{
 expect(source).toContain("storedProgress()||privateEntry()");
});
