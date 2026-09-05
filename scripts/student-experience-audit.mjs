import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const agents=readFileSync(new URL("../AGENTS.md",import.meta.url),"utf8");

assert.match(agents,/A A\+ pensa muito e mostra pouco/);
assert.match(agents,/Cada ecrã do aluno deve ter uma ação visualmente dominante/);
assert.match(page,/const STUDENT_NAV=\[\["home","⌂","Aprender"\],\["train","◎","Treinar"\],\["ranking","△","Ranking"\],\["progress","◫","Progresso"\]\]/);
assert.equal((page.match(/<StudentNav active=/g)||[]).length,4,"exactly four primary student surfaces need navigation");
assert.doesNotMatch(page,/STUDENT_NAV[\s\S]{0,300}(?:Exames|Pais|Conta)/);
assert.match(page,/className="adaptivePath"/);
assert.match(page,/MISSÃO DE HOJE/);
assert.match(page,/PRÓXIMO PASSO PROVÁVEL/);
assert.match(page,/function TrainHub/);
assert.match(page,/Rever matéria/);
assert.match(page,/Explicações e resumos estão a ser preparados/);
assert.match(page,/function FriendsBetaRibbon\(\{s\}\)[\s\S]*?useEffect\(\(\)=>setQueryActive\(friendsBetaRequested\(window\.location\.search\)\),\[\]\)/);
assert.match(page,/function Welcome\(\{s,setS,go\}\)\{\s*const requested=isFriendsBeta\(s\)/);
assert.match(page,/friendsBetaInfo/);
assert.match(page,/Informação do teste/);
assert.match(page,/className="progressDetails"/);
assert.match(page,/className="progressHelp"><summary>ⓘ Como interpretar o teu progresso<\/summary>[\s\S]*?Domínio ≠ Certeza da A\+[\s\S]*?Variantes não contam/);
assert.match(page,/Índice parcial — não é uma previsão da nota do exame/);
assert.match(page,/className="focusTop"/);
assert.match(page,/window\.history\.scrollRestoration="manual"/);
assert.match(page,/requestAnimationFrame\(\(\)=>window\.scrollTo\(\{top:0,left:0,behavior:"auto"\}\)\)/);
assert.equal((page.match(/<StudentNav active=/g)||[]).length,(page.match(/function StudentNav/g)||[]).length+3);
for(const name of ["DiagRun","Mission","TrainingRun","MiniExamRun"]){
  const start=page.indexOf(`function ${name}(`);
  const end=page.indexOf("\nfunction ",start+10);
  assert.ok(start>=0,`${name} must exist`);
  const sessionSource=page.slice(start,end<0?page.length:end);
  assert.doesNotMatch(sessionSource,/<StudentNav/,`${name} must remain in focus mode`);
  assert.equal((sessionSource.match(/className="focusTrack"/g)||[]).length,1,`${name} must expose one focus progress track`);
  assert.match(sessionSource,/className="questionContext"/,`${name} must expose only a short question context by default`);
  assert.match(sessionSource,/className="focusDisclosure"><summary>ⓘ Sobre esta pergunta<\/summary>/,`${name} must keep engine detail behind progressive disclosure`);
}
const diagnosticSource=page.slice(page.indexOf("function DiagRun("),page.indexOf("\nfunction DiagResult("));
const missionSource=page.slice(page.indexOf("function Mission("),page.indexOf("\nfunction MissionResult("));
const trainingSource=page.slice(page.indexOf("function TrainingRun("),page.indexOf("\nfunction Progress("));
const miniExamSource=page.slice(page.indexOf("function MiniExamRun("),page.indexOf("\nfunction MiniExamReview("));
assert.doesNotMatch(diagnosticSource,/className="(?:diagProgressWrap|activeArea)"/);
assert.doesNotMatch(missionSource,/className="missionStep"/);
assert.doesNotMatch(trainingSource,/className="(?:activeArea|validatedVariant)"/);
assert.doesNotMatch(miniExamSource,/className="examQuestionMeta"/);
for(const sessionSource of [diagnosticSource,missionSource,trainingSource,miniExamSource]){
  assert.doesNotMatch(sessionSource,/<p className="eyebrow">\{[^}]*cognitive/,"cognitive type must not remain on the default question surface");
}
assert.doesNotMatch(page.slice(page.indexOf("function MiniExamRun("),page.indexOf("\nfunction MiniExamReview(")),/className="examProgress"/);
assert.match(page,/✓ Muito bem!/);
assert.match(page,/A resposta correta é:/);
assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
assert.match(css,/\.studentNav\{[^}]*grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
assert.match(css,/\.studentNav button>b\{[^}]*font-size:12px[^}]*white-space:nowrap/);
assert.match(css,/\.pathNode\.current button\{[^}]*min-height:54px/);
assert.match(css,/\.opts button\{font-size:17px;min-height:62px\}/);
assert.match(css,/\.rankingTabs button\{[^}]*min-height:44px[^}]*font-size:13px/);
assert.match(css,/\.leaderboardRows strong\{font-size:15px\}/);
assert.match(css,/\.demoRankingWarning span\{font-size:13px\}/);
assert.match(css,/\.pausedSession button\{[^}]*min-height:48px/);
assert.match(css,/\.progressDetails \.focusMap>div>span,\.progressDetails \.focusMap>div>strong\{font-size:14px\}/);
assert.match(css,/\.progressDetails \.hypothesisRow small,[^}]*font-size:12px/);
assert.match(css,/\.resultSkill small\{font-size:13px\}/);
assert.match(css,/\.resultDetails \.missionOutcome b\{font-size:18px\}/);
assert.match(css,/\.competitionXpNote small\{font-size:12px\}\.competitionXpNote b\{font-size:16px\}\.competitionXpNote>span\{font-size:12px/,"Competitive XP notes in student results must remain legible");
assert.match(css,/\.friendsBetaDisclaimer b\{font-size:13px\}\.friendsBetaDisclaimer span,\.friendsBetaDisclaimer\.compact span\{font-size:12px/,"Friends Beta disclaimers must remain honest and legible");
assert.match(css,/\.testerSegmentTag b,\.testerSegmentTag span\{font-size:12px\}/,"Friends Beta participant metadata must remain legible");

console.log("✓ student experience: four-area navigation, adaptive path, focus sessions, progressive disclosure, feedback and reduced motion guarded");
