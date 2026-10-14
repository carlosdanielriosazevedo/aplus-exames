import assert from "node:assert/strict";
import fs from "node:fs";

const read=path=>fs.readFileSync(path,"utf8");
const math=read("app/clientApp.js");
const portuguese=read("app/components/PortugueseSubject.js");
const fqa=read("app/components/PhysicsChemistrySubject.js");
const secondary=read("app/components/SecondaryScreens.js");
const chrome=read("app/components/chrome.js");
const picker=read("app/components/SchoolPicker.js");
const examContrast=read("app/exam-hub-contrast.css");
const pkg=JSON.parse(read("package.json"));
const versionTuple=value=>String(value||"").replace(/^[^0-9]*/u,"").split(".").slice(0,3).map(Number);
const atLeast=(value,min)=>{const a=versionTuple(value),b=versionTuple(min);for(let i=0;i<3;i+=1){if((a[i]||0)>(b[i]||0))return true;if((a[i]||0)<(b[i]||0))return false}return true};

assert.doesNotMatch(math,/Uma aplicação, várias disciplinas|subjectCatalogDate/u,"O onboarding não deve recuperar copy editorial redundante.");
const diagResult=math.slice(math.indexOf("function DiagResult("),math.indexOf("function Home("));
assert.doesNotMatch(diagResult,/Domínio ≠ Certeza da app|<DailyCompletionNote|<CompetitionXpNote/u,"O fim do diagnóstico deve manter foco no resultado e próximo passo.");
assert.doesNotMatch(secondary,/No ranking real|Em produção, cada liga|a experiência deverá/u,"A UI pública não deve falar como um protótipo ou promessa futura.");
assert.match(secondary,/Modo de demonstração · participantes simulados/u,"Enquanto existirem participantes simulados, essa natureza deve continuar transparente.");
assert.doesNotMatch(secondary,/<ApronsoNudge/u,"O Ranking não deve repetir a mesma explicação com o Apronso.");
assert.doesNotMatch([math,portuguese,fqa,secondary].join("\n"),/Voltar à Home/u,"A navegação pública deve usar a nomenclatura comum.");
assert.match(chrome,/export function StudentNav/u,"A navegação principal deve continuar centralizada.");
assert.match(picker,/aria-autocomplete="list"/u);
assert.match(picker,/ArrowDown/u);
assert.match(picker,/ArrowUp/u);
assert.match(picker,/Enter/u,"O seletor de escola deve poder ser concluído sem rato/toque.");
assert.match(examContrast,/examHub/u,"O contraste do hub de exames deve continuar protegido.");
assert.ok(atLeast(pkg.dependencies?.next,"15.5.27"),"Next.js deve manter o patch de segurança >=15.5.27.");
assert.ok(atLeast(pkg.devDependencies?.vitest,"4.1.11"),"Vitest deve manter a versão sem as vulnerabilidades conhecidas do runner anterior.");

for(const source of [portuguese,fqa]){
  assert.match(source,/StudentTop/u,"Português e FQ A devem usar o shell comum do aluno.");
  assert.match(source,/StudentNav/u,"Português e FQ A devem usar a navegação comum do aluno.");
}

console.log("✓ Final GO audit: densidade editorial, paridade, ranking, navegação, teclado e regressões públicas protegidos");
