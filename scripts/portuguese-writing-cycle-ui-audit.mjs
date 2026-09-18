import assert from "node:assert/strict";
import fs from "node:fs";

const component=fs.readFileSync(new URL("../app/components/PortugueseWritingCycleSummary.js",import.meta.url),"utf8");
const css=fs.readFileSync(new URL("../app/portuguese-writing-cycle.css",import.meta.url),"utf8");

assert.match(component,/writingCycleSummary/u,"a UI deve usar o motor pedagógico partilhado");
assert.match(component,/Ciclo de melhoria/u,"a UI deve tornar explícito o ciclo de revisão");
assert.match(component,/evidências adicionadas ou revistas/u,"a UI deve separar evidência de estado do critério");
assert.doesNotMatch(component,/nota final|classificação final automática|pontuação automática/iu,"a síntese não deve apresentar nota automática");
assert.match(css,/\.ptx-writing-cycle/u,"deve existir estilo isolado para a síntese");
assert.match(css,/@media\(max-width:640px\)/u,"a síntese deve ter comportamento mobile");

console.log("Portuguese writing cycle UI audit: OK");
