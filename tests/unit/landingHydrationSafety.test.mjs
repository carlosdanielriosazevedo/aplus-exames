import {test,expect} from "vitest";
import {readFileSync} from "node:fs";
const source=readFileSync(new URL("../../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../../app/launch-splash.css",import.meta.url),"utf8");

test("public landing and legal links remain server rendered",()=>{
 expect(source).toContain('if(!ready)return <>');
 expect(source).toContain('<div className="appInitialBrowser"><Landing onStart={null}/></div>');
 expect(source).toContain('<div className="appInitialStandalone"><Loading/></div>');
 expect(source).toContain('href="/privacidade"');
 expect(source).toContain('href="/termos"');
 expect(css).toContain(".appInitialBrowser{display:block}");
 expect(css).toContain(".appInitialStandalone{display:none}");
 expect(css).toContain("@media (display-mode:standalone),(display-mode:fullscreen)");
});
test("native form provides pre-hydration onboarding entry",()=>{
 expect(source).toContain('<form action="/" method="get"');
 expect(source).toContain('type="submit" name="entrada" value="1"');
 expect(source).toContain('url.searchParams.get("entrada")==="1"');
 expect(source).toContain('window.sessionStorage.setItem(ENTRY_KEY,"1")');
 expect(source).toContain('window.history.replaceState');
 expect(source).toContain("event.preventDefault();onStart()");
});
test("stored progress and private entries remain supported",()=>{
 expect(source).toContain("storedProgress()||privateEntry()");
 expect(source).toContain('url.searchParams.has("preview")');
});
