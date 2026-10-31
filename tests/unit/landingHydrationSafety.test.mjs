import {test,expect} from "vitest";
import {readFileSync} from "node:fs";
const layout=readFileSync(new URL("../../app/layout.js",import.meta.url),"utf8");
const source=readFileSync(new URL("../../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../../app/launch-splash.css",import.meta.url),"utf8");

test("public landing and legal links remain server rendered",()=>{
 expect(source).not.toContain('if(!ready)return <></>');
 expect(source).toContain('if(!ready)return <><LaunchScreen/><Landing onStart={null}/></>;');
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
 expect(source).toContain('if(!ready)return <><LaunchScreen/><Landing onStart={null}/></>;');
 expect(source).toContain('loading:({error})=>error?<Loading failed/>:<Loading/>');
 expect(css).toContain('background-size:contain;');
 expect(css).toContain('approva-splash-20261031.png?v=20261031-android-v2');
});

test("installed app shows one launch image that disappears by itself",()=>{
 expect(source).toContain('function LaunchScreen(){return <div className="approvaLaunch" aria-hidden="true"/>}');
 expect(source).toContain('return <><LaunchScreen/>{boot?<ClientApp/>:<Landing onStart={start}/>}</>;');
 // Hidden in a normal browser tab; only in installed-app display modes.
 expect(css).toContain('.approvaLaunch{display:none}');
 expect(css).toContain('@media (display-mode: standalone)');
 // Auto-dismiss is CSS-only (works without JS) and ends hidden (never blocks taps).
 expect(css).toContain('animation:approvaLaunchOut .35s ease-out 3.5s forwards;');
 expect(css).toMatch(/@keyframes approvaLaunchOut\{[^}]*\}\s*to\{opacity:0;visibility:hidden\}/);
 expect(css).toContain('approva-splash-20261031.webp?v=20261031-android-v2');
});
