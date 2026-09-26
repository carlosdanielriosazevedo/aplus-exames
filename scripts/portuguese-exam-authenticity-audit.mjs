import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";

const foundationDir=new URL("../content/vnext/portuguese/foundation/",import.meta.url);
const foundationFiles=readdirSync(foundationDir).filter(name=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(name));
const items=foundationFiles.flatMap(name=>JSON.parse(readFileSync(new URL(name,foundationDir),"utf8")).items);

assert.equal(items.length,334,"o banco de Português deve manter os 334 itens atuais");
assert.ok(items.every(item=>item.sourceOrigin==="original"),"o banco deve continuar original-only");
assert.ok(items.every(item=>item.reviewStatus==="prototype"),"Português continua em protótipo editorial");

const byDomain=domain=>items.filter(item=>item.domain===domain);
const byType=(domain,type)=>byDomain(domain).filter(item=>item.responseType===type);
const constructionTypes=new Set(["short-answer","restricted-response","extended-writing"]);

for(const domain of ["leitura","educacao-literaria","escrita","gramatica"]){
  assert.ok(byDomain(domain).length>=70,`${domain}: o banco deve manter massa crítica suficiente`);
}

assert.ok(byType("leitura","multiple-choice").length>=20,"Leitura precisa de massa crítica de seleção");
assert.ok(byDomain("leitura").some(item=>constructionTypes.has(item.responseType)),"Leitura deve incluir construção");
assert.ok(byType("educacao-literaria","restricted-response").length>=8,"Educação Literária deve ter resposta restrita material");
assert.ok(byType("escrita","restricted-response").length>=8,"Escrita deve ter resposta restrita material");

const extended=byType("escrita","extended-writing");
assert.equal(extended.length,9,"o banco deve manter 9 tarefas extensas de Escrita");
assert.ok(extended.every(item=>item.wordLimit?.min===200&&item.wordLimit?.max>=300&&item.wordLimit.max<=350),"Escrita extensa deve ficar dentro do intervalo 200–350");
assert.ok(extended.every(item=>item.maxPoints===44),"as tarefas extensas devem preservar 44 pontos internos");
assert.ok(extended.every(item=>/200\s+a\s+\d+\s+palavras/iu.test(item.prompt)),"a extensão deve estar explícita");

assert.ok(byType("gramatica","multiple-choice").length>=20,"Gramática precisa de massa crítica de seleção");
assert.ok(byDomain("gramatica").some(item=>constructionTypes.has(item.responseType)),"Gramática deve incluir construção");

const restricted=items.filter(item=>item.responseType==="restricted-response");
assert.ok(restricted.length>=47,"o banco deve manter pelo menos 47 respostas restritas");
for(const item of restricted){
  assert.ok(item.rubric?.criteria?.length>=2,`${item.id}: resposta restrita precisa de grelha observável`);
  assert.ok(item.wordLimit?.min>=25&&item.wordLimit?.max>item.wordLimit.min,`${item.id}: intervalo de extensão inválido`);
  assert.ok(item.referenceAnswer?.trim().length>=80,`${item.id}: referência demasiado curta`);
}
for(const item of items.filter(item=>["restricted-response","extended-writing"].includes(item.responseType))){
  assert.match(item.gradingMode,/provisional/u,`${item.id}: resposta aberta não pode ter classificação final automática`);
}

const miniFiles=[
  "portuguese-639-mini-10-1.json","portuguese-639-mini-10-2.json",
  "portuguese-639-mini-11-1.json","portuguese-639-mini-11-2.json",
  "portuguese-639-passage-prototypes.json","portuguese-639-passage-prototypes-2.json","portuguese-639-passage-prototypes-3.json"
];
const miniDir=new URL("../content/vnext/portuguese/",import.meta.url);
for(const name of miniFiles){
  const doc=JSON.parse(readFileSync(new URL(name,miniDir),"utf8"));
  const baseItems=doc.passages.flatMap(passage=>passage.items);
  assert.equal(doc.passages.length,2,`${name}: base deve ter dois textos partilhados`);
  assert.equal(baseItems.length,6,`${name}: base textual deve manter seis itens antes da expansão integrada`);
  assert.ok(baseItems.some(item=>item.responseType==="multiple-choice"),`${name}: precisa de seleção`);
  assert.ok(baseItems.some(item=>item.responseType==="restricted-response"),`${name}: precisa de resposta restrita`);
  assert.ok(doc.passages.every(passage=>passage.sourceOrigin==="original"),`${name}: textos devem ser originais`);
}

const prototypeSource=readFileSync(new URL("../app/data/portuguesePassagePrototype.js",import.meta.url),"utf8");
assert.match(prototypeSource,/PORTUGUESE_MINI_EXAM_QUESTIONS/u,"runtime deve usar política central de 10 itens");
assert.match(prototypeSource,/const domains=\["gramatica","escrita"\]/u,"mini-exame deve acrescentar Gramática e Escrita");
assert.match(prototypeSource,/durationMinutes:45/u,"mini-exame deve usar 45 minutos");
assert.equal((prototypeSource.match(/\{id:"mini-/gu)||[]).length,7,"catálogo deve manter sete mini-exames");

const full=JSON.parse(readFileSync(new URL("portuguese-639-full-exam-supplement.json",miniDir),"utf8"));
const fullItems=full.passages.flatMap(passage=>passage.items);
assert.equal(fullItems.length,15,"simulado completo deve ter 15 itens");
assert.equal(fullItems.filter(item=>item.classificationMode==="mandatory").length,10,"simulado deve ter 10 itens obrigatórios");
assert.equal(fullItems.filter(item=>item.classificationMode==="best-of-five").length,5,"simulado deve ter 5 itens opcionais");
assert.equal(fullItems.filter(item=>item.responseType==="extended-writing").length,1,"simulado deve ter uma tarefa extensa");
assert.equal(fullItems.find(item=>item.responseType==="extended-writing")?.maxPoints,44,"Escrita do simulado deve valer 44 pontos");
assert.ok(fullItems.every(item=>item.sourceOrigin==="original"),"simulado deve continuar original-only");

console.log("✓ autenticidade Português 639: banco, mini-exames e simulado coerentes com a estrutura oficial de 2026 sem copiar itens");
console.log("  mini-exames: 10 itens em runtime · 2 textos + Gramática + Escrita · 45 min");
console.log("  simulado: 15 itens · 10 obrigatórios + 5 opcionais (contam 3) · escrita 44 pontos");
