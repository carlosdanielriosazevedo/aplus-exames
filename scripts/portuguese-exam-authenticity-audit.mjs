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
  assert.equal(baseItems.filter(item=>item.responseType==="multiple-choice").length,4,`${name}: base deve ter quatro itens de seleção`);
  assert.equal(baseItems.filter(item=>item.responseType==="restricted-response").length,2,`${name}: base deve ter duas respostas restritas`);
  assert.ok(baseItems.filter(item=>item.cognitive==="raciocinar").length>=2,`${name}: precisa de pelo menos dois itens de raciocínio`);
  assert.ok(doc.passages.every(passage=>passage.sourceOrigin==="original"),`${name}: textos devem ser originais`);
  assert.ok(doc.passages.every(passage=>String(passage.text||"").trim().split(/\s+/u).length>=90),`${name}: textos-base demasiado curtos`);
  assert.ok(baseItems.every(item=>Number.isInteger(item.difficultyTarget)&&item.difficultyTarget>=1&&item.difficultyTarget<=4),`${name}: todos os itens precisam de difficultyTarget editorial 1–4`);
  const averageDifficulty=baseItems.reduce((sum,item)=>sum+item.difficultyTarget,0)/baseItems.length;
  assert.ok(averageDifficulty>=2.1&&averageDifficulty<=3.1,`${name}: dificuldade média fora do intervalo editorial (${averageDifficulty.toFixed(2)})`);
  assert.ok(baseItems.some(item=>item.difficultyTarget>=3),`${name}: mini-exame precisa de pelo menos um item exigente`);
  const correctPositions=baseItems.filter(item=>item.responseType==="multiple-choice").map(item=>item.answerIndex).sort((a,b)=>a-b);
  assert.deepEqual(correctPositions,[0,1,2,3],`${name}: posições corretas devem ficar equilibradas entre A/B/C/D`);
  for(const item of baseItems.filter(item=>item.responseType==="multiple-choice")){
    assert.equal(item.options?.length,4,`${name} / ${item.id}: escolha múltipla precisa de quatro opções`);
    assert.equal(new Set(item.options).size,4,`${name} / ${item.id}: opções duplicadas`);
    assert.ok(Number.isInteger(item.answerIndex)&&item.answerIndex>=0&&item.answerIndex<4,`${name} / ${item.id}: resposta correta inválida`);
  }
  for(const item of baseItems.filter(item=>item.responseType==="restricted-response")){
    assert.ok(item.wordLimit?.min>=60&&item.wordLimit?.max>=100,`${name} / ${item.id}: resposta restrita deve exigir desenvolvimento real`);
    assert.ok(item.rubric?.criteria?.length>=2,`${name} / ${item.id}: resposta restrita precisa de grelha observável`);
    assert.ok(String(item.referenceAnswer||"").trim().length>=180,`${name} / ${item.id}: resposta de referência demasiado curta`);
    assert.ok(item.rubric.criteria.every(criterion=>Array.isArray(criterion.observations)&&criterion.observations.length>=1),`${name} / ${item.id}: cada critério precisa de observações atómicas`);
    assert.ok(item.rubric.criteria.flatMap(criterion=>criterion.observations).every(observation=>String(observation.label||"").length>=25),`${name} / ${item.id}: observações demasiado vagas`);
    assert.ok(item.scoringGuidance?.strong&&item.scoringGuidance?.partial&&item.scoringGuidance?.insufficient,`${name} / ${item.id}: faltam âncoras forte/parcial/insuficiente`);
    assert.ok(item.scoringGuidance?.acceptableVariants?.length>=3,`${name} / ${item.id}: política de variantes aceitáveis insuficiente`);
    assert.ok(item.scoringGuidance?.commonPitfalls?.length>=3,`${name} / ${item.id}: faltam erros típicos para feedback`);
    assert.match(item.scoringGuidance.acceptableVariants.join(" "),/semanticamente equivalentes/iu,`${name} / ${item.id}: referência não pode funcionar como resposta única obrigatória`);
  }
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
assert.ok(fullItems.every(item=>item.sourceOrigin==="original"),"simulado deve continuar original-only");
assert.ok(fullItems.every(item=>Number.isInteger(item.difficultyTarget)&&item.difficultyTarget>=1&&item.difficultyTarget<=4),"simulado: todos os itens precisam de difficultyTarget editorial 1–4");
const fullAverageDifficulty=fullItems.reduce((sum,item)=>sum+item.difficultyTarget,0)/fullItems.length;
assert.ok(fullAverageDifficulty>=2.7&&fullAverageDifficulty<=3.3,`simulado: dificuldade média fora do intervalo editorial (${fullAverageDifficulty.toFixed(2)})`);
assert.ok(fullItems.some(item=>item.difficultyTarget===4),"simulado deve incluir pelo menos um item de dificuldade editorial 4");
const fullMc=fullItems.filter(item=>item.responseType==="multiple-choice");
const fullPositionCounts=[0,0,0,0];
for(const item of fullMc)fullPositionCounts[item.answerIndex]++;
assert.ok(Math.max(...fullPositionCounts)-Math.min(...fullPositionCounts)<=1,`simulado: posições corretas desequilibradas (${fullPositionCounts.join("/")})`);

const group1=full.passages.filter(passage=>passage.passageId.startsWith("PT639-FULL-G1")).flatMap(passage=>passage.items);
const group2=full.passages.find(passage=>passage.passageId==="PT639-FULL-G2-001")?.items||[];
const group3=full.passages.find(passage=>passage.passageId==="PT639-FULL-G3-001")?.items||[];

assert.equal(group1.length,7,"Grupo I deve ter 7 itens");
assert.equal(group1.filter(item=>item.responseType==="restricted-response").length,5,"Grupo I deve privilegiar construção: 5 respostas restritas");
assert.equal(group1.filter(item=>item.responseType==="multiple-choice").length,2,"Grupo I deve manter 2 itens de seleção");
assert.equal(group1.filter(item=>item.classificationMode==="mandatory").length,5,"Grupo I deve ter 5 itens obrigatórios");
assert.equal(group1.filter(item=>item.classificationMode==="best-of-five").length,2,"Grupo I deve ter 2 itens opcionais");
assert.ok(full.passages.some(passage=>passage.passageId==="PT639-FULL-G1C-001"),"Grupo I precisa de Parte C autónoma");
const literaryMobilization=group1.find(item=>item.id==="PT639-FULL-G1-Q7");
assert.equal(literaryMobilization?.responseType,"restricted-response","Parte C deve ser resposta construída");
assert.ok(literaryMobilization?.wordLimit?.min>=120,"Parte C deve exigir breve exposição desenvolvida");
assert.ok(/obra estudada/iu.test(literaryMobilization?.prompt||""),"Parte C deve mobilizar leitura de uma obra estudada");

assert.equal(group2.length,7,"Grupo II deve ter 7 itens");
assert.ok(group2.every(item=>item.responseType==="multiple-choice"),"Grupo II deve ser integralmente de seleção no modelo 2026");
assert.equal(group2.filter(item=>item.classificationMode==="mandatory").length,4,"Grupo II deve ter 4 itens obrigatórios");
assert.equal(group2.filter(item=>item.classificationMode==="best-of-five").length,3,"Grupo II deve ter 3 itens opcionais");

assert.equal(group3.length,1,"Grupo III deve ter uma única tarefa extensa");
const writing=group3[0];
assert.equal(writing.responseType,"extended-writing","Grupo III deve ser resposta extensa");
assert.equal(writing.maxPoints,44,"Escrita do simulado deve valer 44 pontos");
assert.deepEqual(writing.rubric.criteria.map(criterion=>criterion.points),[10,10,10,14],"rubrica de escrita deve refletir 30 pontos temático-discursivos + 14 de correção linguística");
assert.equal(writing.wordLimit?.min,200,"Escrita deve começar nas 200 palavras");
assert.equal(writing.wordLimit?.max,350,"Escrita deve terminar nas 350 palavras");
for(const item of fullItems.filter(item=>["restricted-response","extended-writing"].includes(item.responseType))){
  assert.ok(item.rubric?.criteria?.every(criterion=>criterion.observations?.length>=1),`${item.id}: simulado precisa de observações atómicas por critério`);
  assert.ok(item.scoringGuidance?.strong&&item.scoringGuidance?.partial&&item.scoringGuidance?.insufficient,`${item.id}: simulado precisa de âncoras de desempenho`);
  assert.ok(item.scoringGuidance?.acceptableVariants?.length>=3,`${item.id}: simulado precisa de variantes aceitáveis`);
  assert.ok(item.scoringGuidance?.commonPitfalls?.length>=3,`${item.id}: simulado precisa de erros típicos para revisão`);
}

console.log("✓ autenticidade Português 639: banco, mini-exames e simulado coerentes com a estrutura oficial de 2026 sem copiar itens");
console.log("  mini-exames: 10 itens em runtime · dificuldade editorial calibrada · respostas A/B/C/D equilibradas");
console.log("  simulado: respostas construídas com observações atómicas + âncoras forte/parcial/insuficiente");
