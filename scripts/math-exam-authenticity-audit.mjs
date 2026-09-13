import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import {polishVnextItem} from "../app/lib/vnextPedagogicalPolish.js";
import {VNEXT_EXAM_QUESTIONS} from "../app/data/vnextExam.js";

const ROOT=path.resolve("content/vnext/math-a");
const YEARS=["10","11","12"];
const EXPECTED_FILES=113;
const EXPECTED_QUESTIONS=5650;
const EXPECTED_EXAM=339;

function norm(v){return String(v||"").normalize("NFD").replace(/[\u0300\u0301\u0302\u0303\u0308\u0327]/g,"").toLowerCase().replace(/\s+/g," ").trim();}
function pct(n,d){return d?100*n/d:0;}
function signals(q){
  const prompt=String(q.q||"").trim();
  const p=norm(prompt);
  const opts=Array.isArray(q.o)?q.o.map(x=>String(x||"").trim()):[];
  const uniqueOpts=new Set(opts.map(norm));
  const completionStem=/\.\.\.$/.test(prompt);
  const task=completionStem||/\?|determina|calcula|resolve|indica|seleciona|identifica|qual|quais|quantos|como|compara|conclui|mostra|verifica|simplifica|escreve|estuda|analisa/.test(p);
  const focusMath=norm(q.focus).length>=4;
  const explicitMath=/\d|[=<>+−×÷√π≠]|\bf\(|\bp\(|\bsen\b|\bcos\b|\btg\b|\blog\b|\bln\b|\bvetor\b|\bmatriz\b|\bprobabilidade\b|\bderivad|\bfuncao\b|\bsucessao\b|\bcomplex|\btriangulo\b|\breta\b|\bintegral\b|\bprimitiv/.test(p);
  const math=explicitMath||focusMath;
  const depth=Number(q.difficulty)>=2||!/^compreensao$/i.test(norm(q.cognitive));
  const distractors=opts.length===4&&uniqueOpts.size===4&&opts.every(x=>norm(x).length>0)&&!opts.some(x=>/todas as anteriores|nenhuma das anteriores/.test(norm(x)));
  const examContext=Array.isArray(q.contexts)&&q.contexts.includes("exam");
  const context=prompt.length>=38||explicitMath||focusMath;
  return {prompt,p,opts,uniqueOpts,task,math,depth,distractors,examContext,context,score:[task,math,depth,distractors,examContext,context].filter(Boolean).length};
}

const files=[];
let corpusTotal=0,corpusStrong=0;
for(const year of YEARS){
  const dir=path.join(ROOT,year);
  for(const name of fs.readdirSync(dir).filter(x=>x.endsWith(".json")).sort()){
    const file=path.join(dir,name);
    files.push(file);
    const data=JSON.parse(fs.readFileSync(file,"utf8"));
    for(const raw of data.questions||[]){
      corpusTotal++;
      if(signals(polishVnextItem(raw)).score>=5)corpusStrong++;
    }
  }
}
assert.equal(files.length,EXPECTED_FILES,`Esperados ${EXPECTED_FILES} ficheiros`);
assert.equal(corpusTotal,EXPECTED_QUESTIONS,`Esperadas ${EXPECTED_QUESTIONS} perguntas`);
assert.equal(VNEXT_EXAM_QUESTIONS.length,EXPECTED_EXAM,`Esperados ${EXPECTED_EXAM} itens no banco de Mini-exame`);

let strong=0;
const blockers=[];
const weak=[];
const byTheme=new Map();
const bySubtopic=new Map();

for(const raw of VNEXT_EXAM_QUESTIONS){
  const q=polishVnextItem(raw);
  const s=signals(q);
  if(s.prompt.length<12)blockers.push(`${q.id}: enunciado demasiado curto (${s.prompt.length})`);
  if(s.opts.length!==4||s.uniqueOpts.size!==4)blockers.push(`${q.id}: opções inválidas ou repetidas`);
  if(![0,1,2,3].includes(q.a))blockers.push(`${q.id}: índice de resposta inválido`);
  if(/\bparabens\b|\bxp\b|\bmissao diaria\b|\bapp\b|\bapronso\b|\bclica\b|\bcarrega no botao\b/.test(s.p))blockers.push(`${q.id}: linguagem de interface/gamificação dentro do item de exame`);

  const isStrong=s.score>=5;
  if(isStrong)strong++;
  else weak.push(`${q.id}: ${s.score}/6 · ${s.prompt.slice(0,120)}`);

  const theme=q.themeId||"?";
  const tr=byTheme.get(theme)||{total:0,strong:0};
  tr.total++; if(isStrong)tr.strong++; byTheme.set(theme,tr);
  const sub=q.subtopicId||"?";
  const sr=bySubtopic.get(sub)||{total:0,strong:0};
  sr.total++; if(isStrong)sr.strong++; bySubtopic.set(sub,sr);
}

const overall=pct(strong,EXPECTED_EXAM);
for(const [sub,row] of bySubtopic){
  if(row.strong<2)blockers.push(`${sub}: apenas ${row.strong}/${row.total} itens de Mini-exame cumprem 5/6 sinais de autenticidade`);
}
for(const [theme,row] of byTheme){
  const rate=pct(row.strong,row.total);
  if(rate<80)blockers.push(`${theme}: apenas ${rate.toFixed(1)}% do banco de Mini-exame cumpre 5/6 sinais de autenticidade`);
}
if(overall<90)blockers.push(`Banco de Mini-exame com autenticidade insuficiente: ${overall.toFixed(1)}% (mínimo 90%)`);

console.log("\n=== Autenticidade de exame — Matemática A ===");
console.log(`Corpus geral (diagnóstico, treino e exame): ${corpusStrong}/${corpusTotal} (${pct(corpusStrong,corpusTotal).toFixed(1)}%) com ≥5/6 sinais — métrica informativa, não gate.`);
console.log(`Banco específico de Mini-exame: ${strong}/${EXPECTED_EXAM} (${overall.toFixed(1)}%) com ≥5/6 sinais.`);
console.log("Critérios: formulação de tarefa, conteúdo matemático explícito, profundidade cognitiva, distratores limpos, contexto de exame e contexto suficiente.");
console.log("Cobertura do banco de Mini-exame por tema:");
for(const [theme,row] of [...byTheme.entries()].sort())console.log(`- ${theme}: ${row.strong}/${row.total} (${pct(row.strong,row.total).toFixed(1)}%)`);
if(weak.length){
  console.log("\nItens de Mini-exame abaixo de 5/6 (amostra):");
  for(const row of weak.slice(0,25))console.log(`- ${row}`);
}

if(blockers.length){
  console.error(`\nEXAM AUTHENTICITY GATE: NO-GO — ${blockers.length} blocker(s)`);
  for(const row of blockers.slice(0,40))console.error(`- ${row}`);
  process.exit(1);
}
console.log("\nEXAM AUTHENTICITY GATE: GO");
console.log("O gate é aplicado ao banco efetivamente reservado aos Mini-exames. Não afirma equivalência oficial ao IAVE; garante um patamar interno consistente de formulação, profundidade, distratores e contexto exam-like.");
