import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PORTUGUESE_COMPETENCIES} from "../app/data/portugueseFoundation.js";
const pack=JSON.parse(readFileSync(new URL("../content/vnext/portuguese/foundation/portuguese-639-wave14.json",import.meta.url),"utf8"));
assert.equal(pack.wave,14); assert.equal(pack.bankSizeAfterWave,300); assert.equal(pack.items.length,25);
assert.equal(pack.sourcePolicy,"original-only"); assert.equal(pack.editorialStatus,"prototype"); assert.equal(pack.productionEligible,false);
const ids=new Set(),stimuli=new Set();
for(const item of pack.items){
 assert.match(item.id,/^PT639-FND-3dd$/u); assert.equal(ids.has(item.id),false,item.id+": ID duplicado."); ids.add(item.id);
 assert.equal(stimuli.has(item.stimulus),false,item.id+": estímulo duplicado."); stimuli.add(item.stimulus);
 assert.ok(["10.º","11.º","12.º"].includes(item.year));
 const c=PORTUGUESE_COMPETENCIES.find(row=>row.id===item.competencyId); assert.ok(c?.writtenExam,item.id+": competência inválida."); assert.equal(c.domain,item.domain);
 assert.equal(item.sourceOrigin,"original"); assert.equal(item.reviewStatus,"prototype"); assert.ok(item.prompt?.length>=20); assert.ok(item.explanation?.length>=30);
 if(item.responseType==="multiple-choice"){assert.equal(item.options.length,4);assert.ok([0,1,2,3].includes(item.answerIndex));}
 if(item.responseType==="short-answer"){assert.ok(item.acceptedAnswers.length>=2);assert.equal(item.gradingMode,"deterministic-with-equivalents");}
}
const years=Object.fromEntries(["10.º","11.º","12.º"].map(y=>[y,pack.items.filter(i=>i.year===y).length]));
const domains=Object.fromEntries(["leitura","educacao-literaria","escrita","gramatica"].map(d=>[d,pack.items.filter(i=>i.domain===d).length]));
assert.ok(Object.values(years).every(n=>n>=7)); assert.ok(Object.values(domains).every(n=>n>=5)); assert.ok(pack.items.filter(i=>i.responseType!=="multiple-choice").length>=8);
console.log("✓ Portuguese wave 14: 25 itens · "+JSON.stringify(years)+" · "+JSON.stringify(domains));
