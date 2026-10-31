import {test,expect} from "vitest";
import {readFileSync} from "node:fs";
const layout=readFileSync(new URL("../../app/layout.js",import.meta.url),"utf8");
const source=readFileSync(new URL("../../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../../app/launch-splash.css",import.meta.url),"utf8");

test("public landing and legal links remain server rendered",()=>{
 expect(source).toContain('if(!ready)return <>');
 expect(source).toContain('if(!ready)return <Landing onStart={null}/>;');
 expect(source).toContain('function Loading({failed=false})');
 expect(source).toContain('name="recuperar" value="inicio"');
 expect(source).toContain('url.searchParams.get("recuperar")!=="inicio"');
 expect(source).toContain('href="/privacidade"');
 expect(source).toContain('href="/termos"');
 expect(css).toContain(".apronsoStartupRecovery{");
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

test("Android startup never has a fixed blocking overlay",()=>{
 expect(layout).not.toContain('apronsoLaunchOverlay');
 expect(css).not.toContain('apronsoLaunchOverlay');
 expect(css).not.toContain('apronsoLaunchDismiss');
 expect(source).toContain('if(!ready)return <Landing onStart={null}/>;');
 expect(source).toContain('loading:({error})=>error?<Loading failed/>:<Loading/>');
 expect(css).toContain('background-size:contain;');
 expect(css).toContain('approva-splash-user-exact-20261030.png?v=20261030-user-originals-v1');
});
