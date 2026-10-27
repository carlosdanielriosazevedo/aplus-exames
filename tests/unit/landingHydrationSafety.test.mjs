import {test,expect} from "vitest";
import {readFileSync} from "node:fs";
const source=readFileSync(new URL("../../app/page.js",import.meta.url),"utf8");
test("public HTML renders the complete landing before hydration",()=>{
 expect(source).toMatch(/if\(!ready\)return <Landing onStart=\{null\}\/>/);
 expect(source).toContain('href="/?entrada=1"');
});
test("entry link works without JavaScript and is intercepted after hydration",()=>{
 expect(source).toContain('q.get("entrada")==="1"');
 expect(source).toContain("event.preventDefault();onStart()");
});
test("onboarding resumes stored progress and private entries",()=>{
 expect(source).toContain("storedProgress()||privateEntry()");
 expect(source).toContain("q.has(\"preview\")");
});
