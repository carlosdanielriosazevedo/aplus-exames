import {readFileSync} from "node:fs";
import {describe,expect,it} from "vitest";

const css=readFileSync(new URL("../../app/desktop-shell-polish.css",import.meta.url),"utf8");
const layout=readFileSync(new URL("../../app/layout.js",import.meta.url),"utf8");
const studyModeHub=readFileSync(new URL("../../app/components/StudyModeHub.js",import.meta.url),"utf8");
const math=readFileSync(new URL("../../app/clientApp.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const physicsChemistry=readFileSync(new URL("../../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");

describe("desktop shared student-shell polish",()=>{
  it("loads the desktop polish after the existing shared style layers",()=>{
    expect(layout).toContain("import './desktop-shell-polish.css';");
    expect(layout.indexOf("desktop-shell-polish.css")).toBeGreaterThan(layout.indexOf("exam-hub-contrast.css"));
  });

  it("keeps the bottom of Shell pages and Aprender clear of the floating desktop nav",()=>{
    expect(css).toContain("@media (min-width:1100px)");
    expect(css).toMatch(/\.light:has\(\.studentNav\)\s*\{[\s\S]*?padding-bottom:118px;/u);
    expect(css).toMatch(/\.learnHome\s*\{[\s\S]*?padding-bottom:118px;/u);
    expect(css).toMatch(/\.learnHome \.studentSurface\s*\{[\s\S]*?padding-bottom:0;/u);
  });

  it("keeps Exames guidance centred and Treinar copy in its shared heading",()=>{
    expect(css).toMatch(/\.apronsoNudge:has\(\+ \.trainChoices\),[\s\S]*?\.examHub \.apronsoNudge\s*\{[\s\S]*?align-items:center;/u);
    expect(css).toMatch(/\.apronsoNudge:has\(\+ \.trainChoices\) p,[\s\S]*?\.examHub \.apronsoNudge p\s*\{[\s\S]*?align-self:center;[\s\S]*?text-align:center;/u);
    expect(studyModeHub).toContain('className="sectionIntro learnIntro trainIntro"');
    expect(studyModeHub).toContain('<span>{STUDY_MODE_COPY.nudge}</span>');
    expect(studyModeHub).not.toContain("ApronsoNudge");
    expect(studyModeHub).toContain('className="trainChoices"');
  });

  it.each([
    ["Matemática A",math],
    ["Português",portuguese],
    ["Física e Química A",physicsChemistry]
  ])("keeps shared Treinar/Exames surfaces wired for %s",(_subject,source)=>{
    expect(source).toContain("StudyModeHub");
    expect(source).toContain("examHub");
    expect(source).toContain("StudentNav");
  });
});
