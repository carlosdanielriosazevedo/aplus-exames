import {describe,it,expect} from "vitest";
import {readFileSync} from "node:fs";

const read=path=>readFileSync(new URL("../../"+path,import.meta.url),"utf8");
const math=read("app/clientApp.js"),pt=read("app/components/PortugueseSubject.js"),fqa=read("app/components/PhysicsChemistrySubject.js"),eyebrow=read("app/components/PausedActivityEyebrow.js");
function learningHome(source,start,end){const a=source.indexOf(start);expect(a).toBeGreaterThan(-1);const b=source.indexOf(end,a);expect(b).toBeGreaterThan(a);return source.slice(a,b)}
describe("single paused-assessment CTA on Aprender",()=>{
 it("shows activity type alongside paused state with no new action",()=>{
  expect(eyebrow).toContain("MISSÃO DE HOJE");
  expect(eyebrow).toContain("DIAGNÓSTICO");
  expect(eyebrow).toContain("TREINO LIVRE");
  expect(eyebrow).toContain("MINI-EXAME");
  expect(eyebrow).toContain("SESSÃO EM PAUSA");
  expect(eyebrow).not.toContain("<button");
 });
 it("Português replaces duplicated banner for missions with existing primary card",()=>{
  const home=learningHome(pt,'if(!session)return sharedShell(<>','if(session.finished){');
  expect(home).not.toContain('className="pausedSession"');
  expect(home).toContain('className="sessionPausedMeta"');
  expect(home).toContain("<PausedActivityEyebrow kind=");
  expect(home).toContain('progress.lastPosition?resume');
  expect(home).toContain('miniExamDraft.examId');
  expect(home).toContain('"Continuar sessão"');
 });
 it("Física e Química A uses single paused card and keeps exam route",()=>{
  const home=learningHome(fqa,'return <main className="learnHome">','{sharedNav}</section></main>');
  expect(home).not.toContain('className="pausedSession"');
  expect(home).toContain("<PausedActivityEyebrow kind=");
  expect(home).toContain('go(examDrafts[0].route)');
  expect(home).toContain('progress.lastPosition?resume');
  expect(home).toContain('"Continuar sessão"');
 });
 it("Matemática A routes paused mission, training, diagnostic and mini-exam",()=>{
  const home=learningHome(math,'function Home({s,setS,go,reset})','function Mission({s,setS,go,');
  expect(home).not.toContain('className="pausedSession"');
  for(const kind of ["mini_exam","training","diagnostic","mission"])expect(home).toContain(`kind==="${kind}"`);
  expect(home).toContain("<PausedActivityEyebrow kind=");
  expect(home).toContain('>Continuar sessão</button>');
 });
});
