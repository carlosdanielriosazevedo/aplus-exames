import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {dirname,join} from "node:path";
import {portugueseDifficultyProfile} from "../app/lib/portugueseDifficulty.js";

const root=dirname(fileURLToPath(import.meta.url));
const contentDir=join(root,"../content/vnext/portuguese/foundation");
const sourceFiles=readdirSync(contentDir)
  .filter(file=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(file))
  .sort((a,b)=>{
    if(a.includes("pilot"))return -1;
    if(b.includes("pilot"))return 1;
    return Number(a.match(/wave(\d+)/u)?.[1]||0)-Number(b.match(/wave(\d+)/u)?.[1]||0);
  });
const packs=sourceFiles.map(file=>JSON.parse(readFileSync(join(contentDir,file),"utf8")));
const items=packs.flatMap(pack=>pack.items);
const expectedTotal=[...packs].reverse().find(pack=>Number.isInteger(pack.bankSizeAfterWave))?.bankSizeAfterWave||items.length;
const matrix=JSON.parse(readFileSync(join(contentDir,"portuguese-639-difficulty.json"),"utf8"));
const runtime=readFileSync(join(root,"../app/data/portugueseContent.js"),"utf8");
const engine=readFileSync(join(root,"../app/lib/portugueseEngine.js"),"utf8");

assert.equal(items.length,expectedTotal,"a dificuldade deve cobrir o tamanho declarado pela vaga mais recente");
assert.equal(matrix.modelVersion,1);
assert.equal(matrix.status,"editorial-provisional");
assert.equal(matrix.calibrated,false,"a matriz não pode afirmar calibração sem dados de alunos");
assert.match(matrix.calibrationNote,/alunos reais/);
assert.equal(matrix.items.length,items.length,`a matriz de dificuldade deve acompanhar os ${items.length} itens atuais`);
assert.equal(new Set(matrix.items.map(row=>row.id)).size,items.length);
assert.deepEqual(new Set(matrix.items.map(row=>row.id)),new Set(items.map(item=>item.id)));

const byId=new Map(items.map(item=>[item.id,item]));
for(const row of matrix.items){
  const item=byId.get(row.id);
  const expected=portugueseDifficultyProfile(item);
  assert.deepEqual(row,{id:item.id,...expected},`${item.id}: a matriz deve ser integralmente reproduzível`);
  assert.equal(portugueseDifficultyProfile({...item,maxPoints:999}).level,row.level,`${item.id}: a cotação não pode determinar dificuldade`);
  assert.equal(row.rationale.length,4);
  assert.ok(row.level>=1&&row.level<=4);
}

const distribution=matrix.items.reduce((counts,row)=>{counts[row.level]=(counts[row.level]||0)+1;return counts;},{});
assert.equal(Object.values(distribution).reduce((sum,count)=>sum+count,0),items.length,`a distribuição deve contabilizar os ${items.length} itens`);
assert.deepEqual(Object.keys(distribution).map(Number).sort((a,b)=>a-b),[1,2,3,4],"os quatro patamares devem permanecer representados sem colapsar níveis");
for(const level of [1,2,3,4])assert.ok((distribution[level]||0)/items.length>=0.10,`nível ${level}: representação inferior a 10% no banco atual`);
for(const domain of ["leitura","educacao-literaria","escrita","gramatica"]){
  const domainLevels=new Set(matrix.items.filter(row=>byId.get(row.id).domain===domain).map(row=>row.level));
  assert.ok(domainLevels.size>=2,`${domain}: um domínio não pode ficar reduzido a um único nível`);
}
assert.match(runtime,/applyPortugueseDifficulty/);
assert.match(engine,/difficulty\?\.level/);
assert.match(engine,/editorial-provisional/);

console.log(`✓ dificuldade de Português: ${matrix.items.length} itens · níveis ${distribution[1]||0}/${distribution[2]||0}/${distribution[3]||0}/${distribution[4]||0} · cotação excluída · calibração real ainda bloqueada`);
