import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PORTUGUESE_COMPETENCIES} from "../app/data/portugueseFoundation.js";

const pack=JSON.parse(readFileSync(new URL("../content/vnext/portuguese/foundation/portuguese-639-wave11.json",import.meta.url),"utf8"));
assert.equal(pack.wave,11);
assert.equal(pack.bankSizeAfterWave,225);
assert.equal(pack.items.length,25);
assert.equal(pack.sourcePolicy,"original-only");
assert.equal(pack.editorialStatus,"prototype");
assert.equal(pack.productionEligible,false);

const ids=new Set();
const stimuli=new Set();
for(const item of pack.items){
  assert.match(item.id,/^PT639-FND-2(0|1|2)\d$/u);
  assert.equal(ids.has(item.id),false,item.id+": ID duplicado.");
  ids.add(item.id);
  assert.equal(stimuli.has(item.stimulus),false,item.id+": estímulo duplicado.");
  stimuli.add(item.stimulus);
  assert.ok(["10.º","11.º","12.º"].includes(item.year));
  const competency=PORTUGUESE_COMPETENCIES.find(row=>row.id===item.competencyId);
  assert.ok(competency?.writtenExam,item.id+": competência inválida para exame escrito.");
  assert.equal(competency.domain,item.domain);
  assert.equal(item.sourceOrigin,"original");
  assert.equal(item.reviewStatus,"prototype");
  assert.ok(item.prompt.length>=20);
  if(item.responseType==="multiple-choice"){
    assert.equal(item.options.length,4);
    assert.ok([0,1,2,3].includes(item.answerIndex));
  }
  if(item.responseType==="short-answer"){
    assert.ok(item.acceptedAnswers.length>=2);
    assert.equal(item.gradingMode,"deterministic-with-equivalents");
  }
}

const byYear=Object.fromEntries(["10.º","11.º","12.º"].map(year=>[year,pack.items.filter(item=>item.year===year).length]));
const byDomain=Object.fromEntries(["leitura","educacao-literaria","escrita","gramatica"].map(domain=>[domain,pack.items.filter(item=>item.domain===domain).length]));
const nonMc=pack.items.filter(item=>item.responseType!=="multiple-choice").length;
assert.ok(Object.values(byYear).every(count=>count>=7));
assert.ok(Object.values(byDomain).every(count=>count>=5));
assert.ok(nonMc>=8,"A wave 11 deve aumentar a diversidade para além de escolha múltipla.");
console.log("✓ Portuguese wave 11: 25 itens · "+JSON.stringify(byYear)+" · "+JSON.stringify(byDomain)+" · "+nonMc+" respostas não-MC");
