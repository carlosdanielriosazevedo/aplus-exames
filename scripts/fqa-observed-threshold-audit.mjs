import assert from "node:assert/strict";
import {assessEvidence} from "../app/lib/automaticEvidenceGrader.js";

const related="Os eletrões ocupam níveis de energia quantizados nos átomos.";
const transition=assessEvidence(
  related,
  "Relaciona cada risca com uma transição eletrónica entre níveis de energia.",
  "Explica a origem das riscas espectrais",
  "Relaciona as riscas espectrais com transições entre níveis de energia eletrónicos."
);
assert.notEqual(transition.status,"observed","verdade científica relacionada mas que não explica as riscas não pode ser critério plenamente observado");

const complete="Cada risca resulta de uma transição eletrónica entre níveis de energia, com emissão de um fotão de energia definida.";
const completeAssessment=assessEvidence(
  complete,
  "Relaciona cada risca com uma transição eletrónica entre níveis de energia.",
  "Explica a origem das riscas espectrais",
  "Relaciona as riscas espectrais com transições entre níveis de energia eletrónicos."
);
assert.equal(completeAssessment.status,"observed","explicação científica completa deve continuar plenamente observada");

console.log("FQA OBSERVED THRESHOLD: GO");
