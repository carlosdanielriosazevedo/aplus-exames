import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {dirname,join} from "node:path";
import {portugueseDifficultyProfile} from "../app/lib/portugueseDifficulty.js";

const root=dirname(fileURLToPath(import.meta.url));
const contentDir=join(root,"../content/vnext/portuguese/foundation");
const sourceFiles=readdirSync(contentDir).filter(file=>/^portuguese-639-(?:pilot|wave\d+)\.json$/.test(file)).sort();
const items=sourceFiles.flatMap(file=>JSON.parse(readFileSync(join(contentDir,file),"utf8")).items);
const matrix=JSON.parse(readFileSync(join(contentDir,"portuguese-639-difficulty.json"),"utf8"));
const runtime=readFileSync(join(root,"../app/data/portugueseContent.js"),"utf8");
const engine=readFileSync(join(root,"../app/lib/portugueseEngine.js"),"utf8");

assert.equal(matrix.modelVersion,1);
assert.equal(matrix.status,"editorial-provisional");
assert.equal(matrix.calibrated,false,"a matriz não pode afirmar calibração sem dados de alunos");
assert.match(matrix.calibrationNote,/alunos reais/);
assert.equal(matrix.items.length,60);
assert.equal(new Set(matrix.items.map(row=>row.id)).size,60);
assert.deepEqual(new Set(matrix.items.map(row=>row.id)),new Set(items.map(item=>item.id)));

const byId=new Map(items.map(item=>[item.id,item]));
for(const row of matrix.items){
  const item=byId.get(row.id);
  const expected=portugueseDifficultyProfile(item);
  assert.deepEqual(row, {id:item.id,...expected},`${item.id}: a matriz deve ser integralmente reproduzível`);
  assert.equal(portugueseDifficultyProfile({...item,maxPoints:999}).level,row.level,`${item.id}: a cotação não pode determinar dificuldade`);
  assert.equal(row.rationale.length,4);
  assert.ok(row.level>=1&&row.level<=4);
}

const distribution=matrix.items.reduce((counts,row)=>{counts[row.level]=(counts[row.level]||0)+1;return counts;},{});
assert.deepEqual(distribution,{1:12,2:24,3:12,4:12},"os quatro patamares devem permanecer representados sem colapsar níveis");
for(const domain of ["leitura","educacao-literaria","escrita","gramatica"]){
  const domainLevels=new Set(matrix.items.filter(row=>byId.get(row.id).domain===domain).map(row=>row.level));
  assert.ok(domainLevels.size>=2,`${domain}: um domínio não pode ficar reduzido a um único nível`);
}
assert.match(runtime,/applyPortugueseDifficulty/);
assert.match(engine,/difficulty\?\.level/);
assert.match(engine,/editorial-provisional/);

console.log(`✓ dificuldade de Português: ${matrix.items.length} itens · níveis ${distribution[1]}/${distribution[2]}/${distribution[3]}/${distribution[4]} · cotação excluída · calibração real ainda bloqueada`);
