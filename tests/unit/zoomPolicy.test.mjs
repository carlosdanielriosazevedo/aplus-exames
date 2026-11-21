import {readFileSync} from "node:fs";
import {describe,expect,it} from "vitest";
const layout=readFileSync(new URL("../../app/layout.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../../app/globals.css",import.meta.url),"utf8");

describe("zoom no telemóvel",()=>{
  it("nunca bloqueia o zoom com dois dedos (acessibilidade, WCAG 1.4.4)",()=>{
    expect(layout).not.toMatch(/maximumScale|userScalable|user-scalable|maximum-scale/);
  });
  it("evita o zoom por toque duplo e o zoom automático do iPhone nos campos",()=>{
    expect(css).toMatch(/html,body,a,button,input,select,textarea,label,summary,\[role="button"\]\{touch-action:manipulation\}/);
    expect(css).toMatch(/@media\(pointer:coarse\)\{[\s\S]*?textarea\{font-size:max\(16px,1em\)\}/);
  });
});
