import assert from "node:assert/strict";
import fs from "node:fs";

const page=fs.readFileSync(new URL("../app/portugues-mini-exame/page.js",import.meta.url),"utf8");
const exam=fs.readFileSync(new URL("../app/components/PortuguesePassageMiniExam.js",import.meta.url),"utf8");
const engine=fs.readFileSync(new URL("../app/lib/portugueseWritingCycle.js",import.meta.url),"utf8");

assert.match(page,/portuguese-writing-cycle\.css/u,"a rota deve carregar os estilos do ciclo");
assert.match(exam,/assessmentBefore:assessmentSnapshot/u,"a revisão deve guardar o snapshot anterior");
assert.match(exam,/assessmentAfter:snapshotSelfAssessment/u,"a autoavaliação posterior deve atualizar o último snapshot");
assert.match(exam,/selfAssessmentProgress\(criteria,revision\.assessmentBefore/u,"o fluxo real deve comparar snapshots antes/depois");
assert.match(exam,/sem transformar essa evolução numa nota/u,"o fluxo deve manter o limite de não classificação");
assert.match(engine,/writingCycleSummary/u,"o novo motor deve estar disponível para a próxima camada visual");

console.log("Portuguese writing cycle integration audit: OK");
