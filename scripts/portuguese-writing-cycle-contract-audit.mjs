import assert from "node:assert/strict";
import fs from "node:fs";

const engine=fs.readFileSync(new URL("../app/lib/portugueseWritingCycle.js",import.meta.url),"utf8");
const component=fs.readFileSync(new URL("../app/components/PortugueseWritingCycleSummary.js",import.meta.url),"utf8");

for(const forbidden of ["score","grade","percentage","percentagem","nota:"]){
  assert.equal(engine.toLowerCase().includes(forbidden),false,`o motor não deve criar ${forbidden}`);
}
assert.match(engine,/stillAttention/u,"o motor deve preservar atenções ainda ativas");
assert.match(engine,/evidenceImproved/u,"o motor deve distinguir evolução da evidência");
assert.match(engine,/não atribui classificação/u,"o motor deve explicitar o limite pedagógico");
assert.match(component,/summary\.nextStep/u,"a UI deve expor um próximo passo concreto");

console.log("Portuguese writing cycle contract audit: OK");
