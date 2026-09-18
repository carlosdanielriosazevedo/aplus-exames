import assert from "node:assert/strict";
import {
  PORTUGUESE_WRITING_MEMORY_LIMIT,
  normalizePortugueseWritingMemory,
  recordPortugueseWritingMemory,
  writingMemoryInsight,
  assessmentMovement
} from "../app/lib/portugueseWritingMemory.js";

const item={
  id:"PT-MEM-1",domain:"leitura",competencyId:"pt-leitura-organizacao",
  rubric:{criteria:[
    {id:"conteudo",label:"Explica a progressão do texto."},
    {id:"fundamentacao",label:"Mobiliza dois elementos pertinentes."}
  ]}
};

let memory=[];
memory=recordPortugueseWritingMemory(memory,{attemptId:"a1",item,at:1,assessment:{conteudo:{status:"partial",evidence:"primeiro ponto"},fundamentacao:{status:"not-yet",evidence:""}}});
memory=recordPortugueseWritingMemory(memory,{attemptId:"a2",item,at:2,assessment:{conteudo:{status:"partial",evidence:"segundo ponto"},fundamentacao:{status:"partial",evidence:"um exemplo"}}});
assert.equal(memory.length,2,"duas tentativas distintas devem permanecer na memória");

memory=recordPortugueseWritingMemory(memory,{attemptId:"a2",item,at:3,assessment:{conteudo:{status:"met",evidence:"segundo ponto revisto"},fundamentacao:{status:"partial",evidence:"um exemplo"}}});
assert.equal(memory.length,2,"a mesma tentativa/item deve ser atualizada em vez de duplicada");
assert.equal(memory.at(-1).assessment.conteudo.status,"met");

const insight=writingMemoryInsight(memory,item,{excludeAttemptId:"a3"});
assert.equal(insight.available,true,"duas tentativas anteriores devem permitir padrão conservador");
assert.equal(insight.rows.length,2,"os dois critérios recorrentes devem ser analisados");
assert.match(insight.rows.find(row=>row.criterionId==="fundamentacao").message,/Parcial|Ainda não/u,"um padrão de dificuldade autoassinalada deve ser descrito sem diagnosticar");

const oneAttempt=writingMemoryInsight(memory,item,{excludeAttemptId:"a2"});
assert.equal(oneAttempt.available,false,"uma só observação anterior não deve gerar padrão");

const otherDomain={...item,id:"PT-MEM-2",domain:"educacao-literaria"};
assert.equal(writingMemoryInsight(memory,otherDomain,{excludeAttemptId:"a3"}).available,false,"a memória deve respeitar o domínio da tarefa");

const movement=assessmentMovement({conteudo:{status:"not-yet"},fundamentacao:{status:"met"}},{conteudo:{status:"partial"},fundamentacao:{status:"partial"}});
assert.equal(movement.find(row=>row.criterionId==="conteudo").direction,"up");
assert.equal(movement.find(row=>row.criterionId==="fundamentacao").direction,"down");

const noisy=Array.from({length:PORTUGUESE_WRITING_MEMORY_LIMIT+9},(_,index)=>({attemptId:`x${index}`,itemId:"i",domain:"leitura",assessment:{conteudo:{status:"partial"}},at:index}));
assert.equal(normalizePortugueseWritingMemory(noisy).length,PORTUGUESE_WRITING_MEMORY_LIMIT,"a memória local deve ter limite explícito");

for(const row of insight.rows){
  const text=`${row.label} ${row.message}`.toLowerCase();
  assert.doesNotMatch(text,/\bnota\b|classifica(?:ção|r)|pontua(?:ção|r)|diagnóstico automático|\b[0-9]+\s*(?:pts|pontos)\b/u,"a memória pedagógica não deve transformar autoavaliações em classificação");
}

console.log("✓ memória de escrita Português: tentativas persistentes e limitadas · padrões só após repetição · domínio respeitado · linguagem de autoavaliação sem nota automática");
