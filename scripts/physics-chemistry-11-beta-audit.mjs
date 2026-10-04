import assert from "node:assert/strict";
import {PHYSICS_CHEMISTRY_A_ITEMS} from "../app/data/physicsChemistryFoundation.js";
import {PHYSICS_CHEMISTRY_A_SUBTOPICS,physicsChemistrySubtopicIdForItem} from "../app/data/physicsChemistryTaxonomy.js";

const year11=PHYSICS_CHEMISTRY_A_SUBTOPICS.filter(row=>/^(f11|q11)-/u.test(row.id));
const expectedDomains=["f11-mechanics","f11-waves","q11-equilibrium","q11-aqueous"];

assert.equal(year11.length,25,"O percurso beta do 11.º ano deve manter 25 submatérias modeladas.");
assert.deepEqual([...new Set(year11.map(row=>row.domain))].sort(),expectedDomains.sort(),"O 11.º ano deve cobrir Mecânica, Ondas/Eletromagnetismo, Equilíbrio Químico e Sistemas Aquosos.");

const rowsBySubtopic=new Map(year11.map(row=>[row.id,[]]));
for(const item of PHYSICS_CHEMISTRY_A_ITEMS){
  const subtopicId=physicsChemistrySubtopicIdForItem(item);
  if(rowsBySubtopic.has(subtopicId))rowsBySubtopic.get(subtopicId).push(item);
}

for(const subtopic of year11){
  const rows=rowsBySubtopic.get(subtopic.id)||[];
  assert.ok(rows.length>=49,`${subtopic.id}: o beta do 11.º ano exige pelo menos 49 itens por submatéria.`);
}

for(const domain of expectedDomains){
  const domainSubtopics=new Set(year11.filter(row=>row.domain===domain).map(row=>row.id));
  const rows=PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>domainSubtopics.has(physicsChemistrySubtopicIdForItem(item)));
  assert.ok(rows.some(item=>item.responseType==="multiple-choice"),`${domain}: falta escolha múltipla no percurso de 11.º ano.`);
  assert.ok(rows.some(item=>item.responseType==="stepwise"),`${domain}: falta problema por etapas no percurso de 11.º ano.`);
  assert.ok(rows.some(item=>item.responseType==="restricted-response"),`${domain}: falta resposta científica aberta no percurso de 11.º ano.`);
}

const total=year11.reduce((sum,row)=>sum+(rowsBySubtopic.get(row.id)?.length||0),0);
assert.ok(total>=1225,"O 11.º ano deve manter pelo menos 1225 itens elegíveis (25 × 49)." );

console.log(`✓ FQ A 11.º beta readiness: ${year11.length} submatérias · ${total}+ itens · 4 domínios · MC + etapas + resposta científica aberta`);
