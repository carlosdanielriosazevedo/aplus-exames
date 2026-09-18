import assert from "node:assert/strict";
import {
  PORTUGUESE_WRITING_MEMORY_LIMIT,
  PORTUGUESE_WRITING_PROFILE_MIN_ATTEMPTS,
  normalizePortugueseWritingMemory,
  recordPortugueseWritingMemory,
  writingMemoryInsight,
  writingMemoryProfile,
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
assert.equal(memory.at(-1).criterionLabels.fundamentacao,"Mobiliza dois elementos pertinentes.","a memória deve conservar o rótulo editorial do critério para resumos futuros");

const insight=writingMemoryInsight(memory,item,{excludeAttemptId:"a3"});
assert.equal(insight.available,true,"duas tentativas anteriores devem permitir padrão conservador por tarefa");
assert.equal(insight.rows.length,2,"os dois critérios recorrentes devem ser analisados");
assert.match(insight.rows.find(row=>row.criterionId==="fundamentacao").message,/Parcial|Ainda não/u,"um padrão de dificuldade autoassinalada deve ser descrito sem diagnosticar");

const oneAttempt=writingMemoryInsight(memory,item,{excludeAttemptId:"a2"});
assert.equal(oneAttempt.available,false,"uma só observação anterior não deve gerar padrão por tarefa");

const otherDomain={...item,id:"PT-MEM-2",domain:"educacao-literaria"};
assert.equal(writingMemoryInsight(memory,otherDomain,{excludeAttemptId:"a3"}).available,false,"a memória por tarefa deve respeitar o domínio");

memory=recordPortugueseWritingMemory(memory,{attemptId:"a3",item:{...item,id:"PT-MEM-3"},at:4,assessment:{conteudo:{status:"partial",evidence:""},fundamentacao:{status:"not-yet",evidence:""}}});
const literatureItem={
  ...item,id:"PT-MEM-LIT",domain:"educacao-literaria",competencyId:"pt-literatura-temas",
  rubric:{criteria:[
    {id:"conteudo",label:"Explica o conflito central do excerto."},
    {id:"fundamentacao",label:"Apoia a leitura em elementos do excerto."}
  ]}
};
memory=recordPortugueseWritingMemory(memory,{attemptId:"a3",item:literatureItem,at:5,assessment:{conteudo:{status:"partial",evidence:"conflito"},fundamentacao:{status:"not-yet",evidence:""}}});

assert.equal(PORTUGUESE_WRITING_PROFILE_MIN_ATTEMPTS,3,"o perfil transversal não deve nascer com apenas uma ou duas tentativas");
const profile=writingMemoryProfile(memory);
assert.equal(profile.available,true,"três tentativas devem permitir um resumo agregado prudente");
assert.equal(profile.attempts,3,"o perfil deve contar tentativas únicas, não cliques nem itens repetidos na mesma tentativa");
assert.equal(profile.domains.length,2,"o perfil deve saber quando há evidência em mais de um domínio");
const foundationPattern=profile.patterns.find(row=>row.criterionId==="fundamentacao");
assert.ok(foundationPattern,"a fundamentação recorrente deve entrar no perfil");
assert.equal(foundationPattern.attempts,3,"duas perguntas abertas na mesma tentativa não podem valer como duas tentativas independentes");
assert.equal(foundationPattern.transversal,true,"um padrão sustentado em Leitura e Educação Literária deve ser marcado como transversal");
assert.equal(foundationPattern.kind,"attention","três autoavaliações recorrentes abaixo de Cumpri devem gerar apenas uma atenção recorrente");
assert.equal(foundationPattern.evidenceAttention,true,"a ausência recorrente de evidência deve ser sinalizada separadamente do estado do critério");
assert.match(foundationPattern.message,/marcaste|tentativas/u);
assert.match(foundationPattern.evidenceMessage,/evidência textual/u);

const insufficient=writingMemoryProfile(memory,{excludeAttemptId:"a3"});
assert.equal(insufficient.available,false,"o perfil agregado deve desaparecer se só restarem duas tentativas");

const strengthMemory=["s1","s2","s3"].reduce((rows,attemptId,index)=>recordPortugueseWritingMemory(rows,{attemptId,item:{...item,id:`S-${index}`},at:index+1,assessment:{conteudo:{status:"met",evidence:"passagem concreta"}}}),[]);
const strength=writingMemoryProfile(strengthMemory).patterns.find(row=>row.criterionId==="conteudo");
assert.equal(strength.kind,"strength","um padrão repetido de Cumpri pode ser apresentado como consistência autoassinalada, sem o converter em domínio medido");
assert.equal(strength.evidenceAttention,false);

const movement=assessmentMovement({conteudo:{status:"not-yet"},fundamentacao:{status:"met"}},{conteudo:{status:"partial"},fundamentacao:{status:"partial"}});
assert.equal(movement.find(row=>row.criterionId==="conteudo").direction,"up");
assert.equal(movement.find(row=>row.criterionId==="fundamentacao").direction,"down");

const noisy=Array.from({length:PORTUGUESE_WRITING_MEMORY_LIMIT+9},(_,index)=>({attemptId:`x${index}`,itemId:"i",domain:"leitura",assessment:{conteudo:{status:"partial"}},at:index}));
assert.equal(normalizePortugueseWritingMemory(noisy).length,PORTUGUESE_WRITING_MEMORY_LIMIT,"a memória local deve ter limite explícito");

for(const text of [
  ...insight.rows.map(row=>`${row.label} ${row.message}`),
  ...profile.patterns.flatMap(row=>[row.label,row.headline,row.message,row.evidenceMessage||""])
]){
  assert.doesNotMatch(text.toLowerCase(),/\bnota\b|classifica(?:ção|r)|pontua(?:ção|r)|diagnóstico automático|\b[0-9]+\s*(?:pts|pontos)\b/u,"a memória pedagógica não deve transformar autoavaliações em classificação");
}

console.log("✓ memória de escrita Português: memória local limitada · padrões por tarefa após 2 observações · perfil transversal só após 3 tentativas únicas · domínios e evidência distinguidos · zero nota automática");
