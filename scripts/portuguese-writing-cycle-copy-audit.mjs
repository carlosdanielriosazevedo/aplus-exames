import assert from "node:assert/strict";
import fs from "node:fs";

const files=["../app/lib/portugueseWritingCycle.js","../app/components/PortugueseWritingCycleSummary.js"];
const copy=files.map(file=>fs.readFileSync(new URL(file,import.meta.url),"utf8")).join("\n");
for(const forbidden of [/está correta/iu,/está errada/iu,/nota de/iu,/classificação de \d/iu,/garante/iu]){
  assert.doesNotMatch(copy,forbidden,"a linguagem não deve transformar autoavaliação em correção automática");
}
assert.match(copy,/autoavaliação/u);
assert.match(copy,/evidência/u);
assert.match(copy,/próximo|Próximo/u);
console.log("Portuguese writing cycle copy audit: OK");
