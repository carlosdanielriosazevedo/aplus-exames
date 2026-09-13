import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import {polishVnextItem} from "../app/lib/vnextPedagogicalPolish.js";

const ROOT=path.resolve("content/vnext/math-a");
const YEARS=["10","11","12"];
const EXPECTED_FILES=113;
const EXPECTED_QUESTIONS=5650;

function norm(v){return String(v||"").normalize("NFD").replace(/\p{Diacritic}/gu,"").toLowerCase().replace(/\s+/g," ").trim();}
function pct(n,d){return d?100*n/d:0;}

const files=[];
for(const year of YEARS){
  const dir=path.join(ROOT,year);
  for(const name of fs.readdirSync(dir).filter(x=>x.endsWith(".json")).sort())files.push(path.join(dir,name));
}
assert.equal(files.length,EXPECTED_FILES,`Esperados ${EXPECTED_FILES} ficheiros`);

let total=0,strong=0;
const blockers=[];
const byTheme=new Map();
const weak=[];

for(const file of files){
  const data=JSON.parse(fs.readFileSync(file,"utf8"));
  for(const raw of data.questions||[]){
    total++;
    const q=polishVnextItem(raw);
    const prompt=String(q.q||"").trim();
    const p=norm(prompt);
    const opts=Array.isArray(q.o)?q.o.map(x=>String(x||"").trim()):[];
    const uniqueOpts=new Set(opts.map(norm));

    if(prompt.length<12)blockers.push(`${q.id}: enunciado demasiado curto (${prompt.length})`);
    if(opts.length!==4||uniqueOpts.size!==4)blockers.push(`${q.id}: opções inválidas ou repetidas`);
    if(![0,1,2,3].includes(q.a))blockers.push(`${q.id}: índice de resposta inválido`);
    if(/parabens|xp|missao diaria|app|apronso|clica|carrega no botao/.test(p))blockers.push(`${q.id}: linguagem de interface/gamificação dentro do item`);

    const interrogative=/\?|determina|calcula|resolve|indica|seleciona|identifica|qual|quais|quantos|como|compara|conclui|mostra|verifica|simplifica|escreve|estuda/.test(p);
    const mathSignal=/\d|[=<>+−×÷√π]|\bf\(|\bp\(|\bsen\b|\bcos\b|\btg\b|\blog\b|\bln\b|\bvetor\b|\bmatriz\b|\bprobabilidade\b|\bderivad/.test(p);
    const cognitiveDepth=Number(q.difficulty)>=2||!/^compreensao$/i.test(norm(q.cognitive));
    const distractorQuality=opts.length===4&&uniqueOpts.size===4&&opts.every(x=>norm(x).length>0)&&!opts.some(x=>/todas as anteriores|nenhuma das anteriores/.test(norm(x)));
    const examContext=Array.isArray(q.contexts)&&q.contexts.includes("exam");
    const sufficientContext=prompt.length>=38||mathSignal;

    const score=[interrogative,mathSignal,cognitiveDepth,distractorQuality,examContext,sufficientContext].filter(Boolean).length;
    const isStrong=score>=5;
    if(isStrong)strong++;
    else weak.push(`${q.id}: ${score}/6 · ${prompt.slice(0,120)}`);

    const theme=q.themeId||"?";
    const row=byTheme.get(theme)||{total:0,strong:0};
    row.total++;
    if(isStrong)row.strong++;
    byTheme.set(theme,row);
  }
}

assert.equal(total,EXPECTED_QUESTIONS,`Esperadas ${EXPECTED_QUESTIONS} perguntas`);
const overall=pct(strong,total);
for(const [theme,row] of byTheme){
  const rate=pct(row.strong,row.total);
  if(rate<80)blockers.push(`${theme}: apenas ${rate.toFixed(1)}% dos itens cumprem 5/6 sinais de autenticidade de exame`);
}
if(overall<90)blockers.push(`Cobertura global de autenticidade insuficiente: ${overall.toFixed(1)}% (mínimo 90%)`);

console.log("\n=== Autenticidade de exame — Matemática A ===");
console.log(`Banco: ${files.length} submatérias · ${total} perguntas`);
console.log(`Itens com ≥5/6 sinais de autenticidade: ${strong}/${total} (${overall.toFixed(1)}%)`);
console.log("Critérios: formulação de tarefa, conteúdo matemático explícito, profundidade cognitiva, distratores limpos, elegibilidade para exame e contexto suficiente.");
console.log("Cobertura por tema:");
for(const [theme,row] of [...byTheme.entries()].sort())console.log(`- ${theme}: ${row.strong}/${row.total} (${pct(row.strong,row.total).toFixed(1)}%)`);
if(weak.length){
  console.log("\nItens abaixo de 5/6 para futura afinação (amostra):");
  for(const row of weak.slice(0,25))console.log(`- ${row}`);
}

if(blockers.length){
  console.error(`\nEXAM AUTHENTICITY GATE: NO-GO — ${blockers.length} blocker(s)`);
  for(const row of blockers.slice(0,40))console.error(`- ${row}`);
  process.exit(1);
}
console.log("\nEXAM AUTHENTICITY GATE: GO");
console.log("Este gate não afirma equivalência oficial ao IAVE; garante um patamar interno consistente de formulação, profundidade, distratores e contexto exam-like.");
