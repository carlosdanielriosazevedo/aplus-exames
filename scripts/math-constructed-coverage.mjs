import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {TAXONOMY} from "../app/data/content.js";
import {VNEXT_EXAM_QUESTIONS} from "../app/data/vnextExam.js";
import {CONSTRUCTED_RESPONSE_BANK,COMPLETION_RESPONSE_BANK} from "../app/lib/constructedResponse.js";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const reportPath=path.join(root,"docs/MATH_A_CONSTRUCTED_COVERAGE.md");
const themeById=new Map(TAXONOMY.map(theme=>[theme.id,theme]));
const canonical=[...new Map(VNEXT_EXAM_QUESTIONS.map(question=>[question.subtopicId,question])).values()]
  .sort((a,b)=>a.year.localeCompare(b.year,"pt")||a.themeId.localeCompare(b.themeId)||a.subtopicId.localeCompare(b.subtopicId));

function capabilities(question){
  const steps=question.response?.steps||[];
  const effects=steps.flatMap(step=>step.errorEffects||[]);
  return {
    partial:question.response?.type==="stepwise"&&steps.length>1,
    equivalents:steps.some(step=>(step.accepted?.length||0)>1||step.type==="fraction"||Number.isFinite(step.tolerance)),
    text:steps.some(step=>step.type==="text"),
    propagation:effects.length>0,
    reducedDifficulty:effects.some(effect=>effect.difficultyReduced===true),
    incomplete:steps.some(step=>(step.incompleteAccepted?.length||0)>0),
    rounding:steps.some(step=>step.rounding)
  };
}

function mark(value){return value?"✓":"—"}

export function buildConstructedCoverage(){
  assert.equal(canonical.length,113,"A matriz canónica deve conter as 113 submatérias de Matemática A.");
  assert.equal(new Set(canonical.map(row=>row.subtopicId)).size,canonical.length,"Submatérias canónicas duplicadas.");

  const allResponses=[...CONSTRUCTED_RESPONSE_BANK,...COMPLETION_RESPONSE_BANK];
  const orphaned=allResponses.filter(question=>!canonical.some(row=>row.subtopicId===question.subtopicId));
  assert.deepEqual(orphaned.map(question=>question.id),[],"Existem respostas estruturadas fora das 113 submatérias canónicas.");

  for(const question of CONSTRUCTED_RESPONSE_BANK){
    const steps=question.response?.steps||[];
    assert.equal(question.response?.type,"stepwise",`${question.id}: formato construído inesperado.`);
    assert.ok(steps.length>=2,`${question.id}: a pontuação parcial exige pelo menos duas etapas.`);
    assert.equal(new Set(steps.map(step=>step.id)).size,steps.length,`${question.id}: IDs de etapa duplicados.`);
    assert.equal(steps.reduce((sum,step)=>sum+step.points,0),question.points,`${question.id}: a soma das etapas diverge da cotação total.`);
    const seen=new Set();
    for(const current of steps){
      assert.ok(current.expected,`${question.id}/${current.id}: falta resposta de referência.`);
      for(const effect of current.errorEffects||[]){
        assert.ok(seen.has(effect.from),`${question.id}/${current.id}: propagação aponta para uma etapa posterior ou inexistente.`);
        assert.ok(effect.reasons?.length,`${question.id}/${current.id}: propagação sem razão declarada.`);
        assert.ok(effect.accepted?.length,`${question.id}/${current.id}: propagação sem resposta aceite.`);
        assert.equal(typeof effect.difficultyReduced,"boolean",`${question.id}/${current.id}: redução de dificuldade ambígua.`);
      }
      seen.add(current.id);
    }
  }

  const rows=canonical.map(source=>{
    const theme=themeById.get(source.themeId);
    assert.ok(theme,`${source.subtopicId}: tema inexistente.`);
    const constructed=CONSTRUCTED_RESPONSE_BANK.filter(question=>question.subtopicId===source.subtopicId);
    const completion=COMPLETION_RESPONSE_BANK.filter(question=>question.subtopicId===source.subtopicId);
    const caps=constructed.reduce((result,question)=>{
      const current=capabilities(question);
      for(const key of Object.keys(result))result[key] ||= current[key];
      return result;
    },{partial:false,equivalents:false,text:false,propagation:false,reducedDifficulty:false,incomplete:false,rounding:false});
    const priority=constructed.length
      ?"aprofundar"
      :theme.relevance>=4||theme.blocking>=4
        ?"crítica"
        :"alta";
    return {
      year:source.year,themeId:source.themeId,theme:theme.short,subtopicId:source.subtopicId,
      focus:source.focus,constructed:constructed.length,completion:completion.length,
      responseTypes:[...new Set(constructed.map(question=>question.response?.type))].filter(Boolean),
      ...caps,priority
    };
  });

  const byYear=Object.fromEntries(["10.º","11.º","12.º"].map(year=>{
    const yearRows=rows.filter(row=>year==="12.º"?row.year.startsWith("12.º"):row.year===year);
    return [year,{subtopics:yearRows.length,covered:yearRows.filter(row=>row.constructed>0).length,items:yearRows.reduce((sum,row)=>sum+row.constructed,0)}];
  }));
  const covered=rows.filter(row=>row.constructed>0).length;
  const summary={
    subtopics:rows.length,covered,gaps:rows.length-covered,
    constructedItems:CONSTRUCTED_RESPONSE_BANK.length,
    completionItems:COMPLETION_RESPONSE_BANK.length,
    criticalGaps:rows.filter(row=>row.priority==="crítica").length,
    highGaps:rows.filter(row=>row.priority==="alta").length,
    capabilities:Object.fromEntries(["text","propagation","reducedDifficulty","incomplete","rounding"].map(key=>[
      key,CONSTRUCTED_RESPONSE_BANK.filter(question=>capabilities(question)[key]).length
    ])),
    byYear
  };
  return {rows,summary};
}

function renderReport({rows,summary}){
  const lines=[
    "# Cobertura de resposta construída — Matemática A",
    "",
    "> Relatório gerado por `npm run math-constructed:coverage`. Não representa revisão humana nem calibração com alunos reais.",
    "",
    "## Estado geral",
    "",
    `- **${summary.constructedItems}** itens de resposta construída em **${summary.covered}/113** submatérias.`,
    `- **${summary.gaps}** submatérias ainda sem resposta construída: **${summary.criticalGaps} críticas** e **${summary.highGaps} de prioridade alta**.`,
    `- **${summary.completionItems}** item de completamento estruturado, contabilizado separadamente.`,
    `- Cobertura por ano: 10.º **${summary.byYear["10.º"].covered}/${summary.byYear["10.º"].subtopics}** · 11.º **${summary.byYear["11.º"].covered}/${summary.byYear["11.º"].subtopics}** · 12.º **${summary.byYear["12.º"].covered}/${summary.byYear["12.º"].subtopics}**.`,
    `- Capacidades materializadas em itens reais: texto/justificação **${summary.capabilities.text}** · propagação de erro **${summary.capabilities.propagation}** · redução de dificuldade **${summary.capabilities.reducedDifficulty}** · resolução incompleta **${summary.capabilities.incomplete}** · arredondamento explícito **${summary.capabilities.rounding}**.`,
    "",
    "A prioridade **crítica** significa apenas: submatéria sem resposta construída dentro de um tema com relevância ou poder de bloqueio elevados. Não significa que todas precisem imediatamente de propagação de erro, arredondamento ou outro critério que não se aplique matematicamente.",
    "",
    "## Matriz das 113 submatérias",
    "",
    "| Ano | Tema | Submatéria | Foco | Itens | Parcial | Equiv. | Texto | Propag. | Redução | Incompl. | Arred. | Prioridade |",
    "|---|---|---|---|---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|"
  ];
  for(const row of rows){
    lines.push(`| ${row.year} | ${row.theme} | \`${row.subtopicId}\` | ${row.focus} | ${row.constructed} | ${mark(row.partial)} | ${mark(row.equivalents)} | ${mark(row.text)} | ${mark(row.propagation)} | ${mark(row.reducedDifficulty)} | ${mark(row.incomplete)} | ${mark(row.rounding)} | ${row.priority} |`);
  }
  lines.push("","## Próxima vaga recomendada","",
    "A expansão deve começar pelas lacunas críticas, agrupadas por família matemática, e não pela ordem alfabética. Cada novo item deve acrescentar um tipo de raciocínio ou critério de correção que ainda não esteja representado na respetiva família.","");
  return `${lines.join("\n")}\n`;
}

const coverage=buildConstructedCoverage();
const report=renderReport(coverage);
if(process.argv.includes("--write")){
  fs.writeFileSync(reportPath,report);
  console.log(`✓ matriz escrita em ${path.relative(root,reportPath)}`);
}else if(process.argv.includes("--check")){
  assert.equal(fs.readFileSync(reportPath,"utf8"),report,"A matriz está desatualizada; executa npm run math-constructed:coverage.");
  console.log("✓ matriz de resposta construída atualizada e coerente com as 113 submatérias");
}else{
  console.log(JSON.stringify(coverage,null,2));
}
