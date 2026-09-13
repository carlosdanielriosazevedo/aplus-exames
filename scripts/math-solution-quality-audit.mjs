import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import {polishVnextItem,solutionPedagogicalSignals} from "../app/lib/vnextPedagogicalPolish.js";

const ROOT=path.resolve("content/vnext/math-a");
const YEARS=["10","11","12"];
const EXPECTED_FILES=113;
const EXPECTED_QUESTIONS=5650;

const files=[];
for(const year of YEARS){
  const dir=path.join(ROOT,year);
  for(const name of fs.readdirSync(dir).filter(x=>x.endsWith(".json")).sort())files.push(path.join(dir,name));
}
assert.equal(files.length,EXPECTED_FILES,`Esperados ${EXPECTED_FILES} ficheiros`);

let total=0,strong=0,withReasoning=0,withMethod=0,withConclusion=0,explicitWhy=0;
const blockers=[];
const byTheme=new Map();
const exactSolutions=new Map();

for(const file of files){
  const data=JSON.parse(fs.readFileSync(file,"utf8"));
  for(const raw of data.questions||[]){
    total++;
    const q=polishVnextItem(raw);
    const sig=solutionPedagogicalSignals(q);
    if(sig.reasoning)withReasoning++;
    if(sig.method)withMethod++;
    if(sig.conclusion)withConclusion++;
    if(sig.explicitWhy)explicitWhy++;
    const isStrong=sig.score>=3&&sig.length>=80;
    if(isStrong)strong++;
    else blockers.push(`${q.id}: score ${sig.score}/4 · ${sig.length} caracteres · reasoning=${sig.reasoning} method=${sig.method} conclusion=${sig.conclusion} why=${sig.explicitWhy}`);
    const key=q.themeId||"?";
    const row=byTheme.get(key)||{total:0,strong:0};
    row.total++;
    if(isStrong)row.strong++;
    byTheme.set(key,row);
    const normalized=String(q.sol||"").replace(/\s+/g," ").trim().toLowerCase();
    const list=exactSolutions.get(normalized)||[];
    list.push(q.id);
    exactSolutions.set(normalized,list);
  }
}

assert.equal(total,EXPECTED_QUESTIONS,`Esperadas ${EXPECTED_QUESTIONS} perguntas`);
const repeated=[...exactSolutions.entries()].filter(([text,ids])=>text&&ids.length>=5).map(([text,ids])=>({text,count:ids.length,ids})).sort((a,b)=>b.count-a.count);

console.log("\n=== Qualidade das resoluções — Matemática A ===");
console.log(`Banco: ${files.length} submatérias · ${total} resoluções`);
console.log(`Resoluções fortes: ${strong}/${total} (${(100*strong/total).toFixed(1)}%)`);
console.log(`Com raciocínio explícito: ${withReasoning}/${total}`);
console.log(`Com ação/método matemático: ${withMethod}/${total}`);
console.log(`Com conclusão/verificação: ${withConclusion}/${total}`);
console.log(`Com explicação de porquê explícita: ${explicitWhy}/${total}`);
console.log(`Resoluções exatamente repetidas em ≥5 itens: ${repeated.length} grupos`);
console.log("Cobertura forte por tema:");
for(const [theme,row] of [...byTheme.entries()].sort())console.log(`- ${theme}: ${row.strong}/${row.total}`);
if(repeated.length){
  console.log("\nRepetições exatas bloqueantes:");
  for(const row of repeated.slice(0,10))console.log(`- ${row.count}× ${row.ids.slice(0,6).join(", ")} :: ${row.text.slice(0,120)}`);
  blockers.push(`${repeated.length} grupo(s) de resoluções exatamente repetidas em 5 ou mais itens`);
}

if(blockers.length){
  console.error(`\nSOLUTION QUALITY GATE: NO-GO — ${blockers.length} problema(s)`);
  for(const row of blockers.slice(0,40))console.error(`- ${row}`);
  process.exit(1);
}
console.log("\nSOLUTION QUALITY GATE: GO");
console.log("Cada resolução efetiva tem desenvolvimento mínimo, pelo menos três sinais pedagógicos e não existem blocos de 5+ resoluções exatamente repetidas.");
