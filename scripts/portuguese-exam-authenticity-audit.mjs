import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";

const dir=new URL("../content/vnext/portuguese/foundation/",import.meta.url);
const files=readdirSync(dir).filter(name=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(name));
const items=files.flatMap(name=>JSON.parse(readFileSync(new URL(name,dir),"utf8")).items);

assert.equal(items.length,310,"o banco de Português deve manter os 310 itens atuais");
assert.ok(items.every(item=>item.sourceOrigin==="original"),"o banco deve continuar original-only; este audit não autoriza cópia de itens IAVE");
assert.ok(items.every(item=>item.reviewStatus==="prototype"),"Português continua em protótipo");

const byDomain=domain=>items.filter(item=>item.domain===domain);
const byType=(domain,type)=>byDomain(domain).filter(item=>item.responseType===type);
const constructionTypes=new Set(["short-answer","restricted-response","extended-writing"]);

for(const domain of ["leitura","educacao-literaria","escrita","gramatica"]){
  assert.ok(byDomain(domain).length>=40,`${domain}: o banco deve manter massa crítica suficiente`);
}

// Informação‑Prova 639/2026: Leitura pode usar seleção e construção; exigimos ambos no banco.
assert.ok(byType("leitura","multiple-choice").length>=8,"Leitura precisa de massa crítica de seleção");
assert.ok(byDomain("leitura").some(item=>constructionTypes.has(item.responseType)),"Leitura deve incluir itens de construção");

// Educação Literária é preferencialmente avaliada por resposta restrita; no banco de treino
// deve existir presença material desse formato, sem transformar esta regra num espelho rígido de uma prova concreta.
assert.ok(byType("educacao-literaria","restricted-response").length>=4,"Educação Literária deve manter respostas restritas suficientes");

// Escrita: resposta restrita + uma resposta extensa de 200–350 palavras.
assert.ok(byType("escrita","restricted-response").length>=4,"Escrita deve manter treino de resposta restrita");
const extended=byType("escrita","extended-writing");
assert.ok(extended.length>=2,"o banco atual deve manter pelo menos duas tarefas extensas de Escrita");
assert.ok(extended.every(item=>item.wordLimit?.min===200&&item.wordLimit?.max>=300),"as tarefas extensas devem respeitar uma extensão mínima de 200 palavras");
assert.ok(extended.every(item=>/200\s+a\s+\d+\s+palavras/iu.test(item.prompt)),"o enunciado das tarefas extensas deve explicitar a extensão ao aluno");
assert.equal(extended[0].maxPoints,44,"a tarefa extensa atual deve preservar a sua ponderação interna");

// Gramática pode usar seleção e construção e pode apoiar-se em suporte textual.
assert.ok(byType("gramatica","multiple-choice").length>=8,"Gramática precisa de massa crítica de seleção");
assert.ok(byDomain("gramatica").some(item=>constructionTypes.has(item.responseType)),"Gramática deve incluir itens de construção");

// Autenticidade de tarefa: respostas restritas devem obrigar a produzir linguagem, não apenas escolher rótulos.
const restricted=items.filter(item=>item.responseType==="restricted-response");
assert.equal(restricted.length,31,"a composição atual deve manter 31 respostas restritas");
for(const item of restricted){
  assert.ok(item.rubric?.criteria?.length>=2,`${item.id}: resposta restrita precisa de grelha observável`);
  assert.ok(item.wordLimit?.min>=25&&item.wordLimit?.max>item.wordLimit.min,`${item.id}: resposta restrita precisa de intervalo de extensão coerente`);
  assert.ok(item.referenceAnswer?.trim().length>=80,`${item.id}: resposta restrita precisa de referência suficientemente desenvolvida`);
}

// A prova real não exige formulações literais dos critérios. O nosso banco também não deve tratar
// texto aberto como correção determinística automática.
for(const item of items.filter(item=>["restricted-response","extended-writing"].includes(item.responseType))){
  assert.match(item.gradingMode,/provisional/u,`${item.id}: resposta aberta não pode ficar marcada como classificação final automática`);
}

const counts=Object.fromEntries(["leitura","educacao-literaria","escrita","gramatica"].map(domain=>[
  domain,
  Object.fromEntries(["multiple-choice","short-answer","restricted-response","extended-writing"].map(type=>[type,byType(domain,type).length]))
]));

console.log("✓ autenticidade Português 639: alinhamento estrutural com Informação‑Prova 2026 sem copiar itens oficiais");
console.log(JSON.stringify(counts));
console.log("  escrita extensa: 2 itens · classificação automática final bloqueada");
