import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortuguesePassageMiniExam.js",import.meta.url),"utf8");
const fqaSubject=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const fqaExam=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");

assert.match(portuguese,/feedbackSummary\.errorDiagnosis/u,"Português deve mostrar o diagnóstico pedagógico no feedback de respostas abertas");
assert.match(portuguese,/errorDiagnosis\.label/u,"Português deve identificar o tipo de erro");
assert.match(portuguese,/errorDiagnosis\.message/u,"Português deve explicar o erro");

assert.match(fqaSubject,/feedbackSummary\.errorDiagnosis/u,"FQ A deve mostrar o diagnóstico pedagógico em missão/treino");
assert.match(fqaExam,/feedbackSummary\.errorDiagnosis/u,"FQ A deve mostrar o diagnóstico pedagógico na revisão de exame");
assert.match(fqaSubject,/errorDiagnosis\.label/u);
assert.match(fqaSubject,/errorDiagnosis\.message/u);

assert.match(page,/feedback\.errorDiagnosis/u,"Matemática A deve mostrar o diagnóstico pedagógico no treino");
assert.match(page,/grade\?\.errorDiagnosis/u,"Matemática A deve mostrar o diagnóstico pedagógico na revisão de mini-exame");
assert.match(page,/errorDiagnosis\.label/u);
assert.match(page,/errorDiagnosis\.message/u);

console.log("✓ diagnóstico pedagógico visível em Português, FQ A e Matemática A sem alterar a estrutura visual");
