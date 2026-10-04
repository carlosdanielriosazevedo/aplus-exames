import assert from "node:assert/strict";
import {PHYSICS_CHEMISTRY_A_ITEMS} from "../app/data/physicsChemistryFoundation.js";
import {PHYSICS_CHEMISTRY_A_SUBTOPICS} from "../app/data/physicsChemistryTaxonomy.js";
import {physicsChemistryCoverage} from "../app/lib/physicsChemistryEngine.js";

const year11=PHYSICS_CHEMISTRY_A_SUBTOPICS.filter(row=>/^(f11|q11)-/u.test(row.id));
const expectedDomains=["f11-mechanics","f11-waves","q11-equilibrium","q11-aqueous"];
const coverage=physicsChemistryCoverage(PHYSICS_CHEMISTRY_A_ITEMS);

assert.equal(year11.length,25,"O percurso beta do 11.º ano deve manter 25 submatérias modeladas.");
assert.deepEqual([...new Set(year11.map(row=>row.domain))].sort(),[...expectedDomains].sort(),"O 11.º ano deve cobrir Mecânica, Ondas/Eletromagnetismo, Equilíbrio Químico e Sistemas Aquosos.");

for(const subtopic of year11){
  assert.ok((coverage.bySubtopic[subtopic.id]||0)>=49,`${subtopic.id}: o beta do 11.º ano exige pelo menos 49 itens por submatéria.`);
}

for(const domain of expectedDomains){
  const rows=PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.domain===domain);
  assert.ok(rows.some(item=>item.responseType==="multiple-choice"),`${domain}: falta escolha múltipla no percurso de 11.º ano.`);
  assert.ok(rows.some(item=>item.responseType==="stepwise"),`${domain}: falta problema por etapas no percurso de 11.º ano.`);
  assert.ok(rows.some(item=>item.responseType==="restricted-response"),`${domain}: falta resposta científica aberta no percurso de 11.º ano.`);
}

const total=year11.reduce((sum,row)=>sum+(coverage.bySubtopic[row.id]||0),0);
assert.ok(total>=1225,"O 11.º ano deve manter pelo menos 1225 itens elegíveis (25 × 49)." );

console.log(`✓ FQ A 11.º beta readiness: ${year11.length} submatérias · ${total}+ itens · 4 domínios · MC + etapas + resposta científica aberta`);
