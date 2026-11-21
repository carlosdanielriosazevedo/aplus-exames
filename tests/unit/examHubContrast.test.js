import {readFileSync} from "node:fs";
import {describe,expect,it} from "vitest";

const css=readFileSync(new URL("../../app/exam-hub-contrast.css",import.meta.url),"utf8");
const math=readFileSync(new URL("../../app/clientApp.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const physicsChemistry=readFileSync(new URL("../../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");

describe("exam hub Apronso contrast",()=>{
  it("forces readable navy text inside the light exam callout",()=>{
    expect(css).toContain(".examHub .apronsoNudge.dark p");
    expect(css).toContain("color:var(--app-navy)");
  });

  it.each([
    ["Matemática A",math],
    ["Português",portuguese],
    ["Física e Química A",physicsChemistry]
  ])("keeps the shared exam hub callout in %s",(_subject,source)=>{
    expect(source).toContain("examHub");
    // Pose «braços cruzados» no modo exame (sem pistas), pedido do product owner em 2026-11-21.
    expect(source).toContain('ApronsoNudge pose="crossed" tone="dark"');
  });
});
